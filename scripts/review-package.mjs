import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {sha,canonical} from './contributions.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const banned=/(^|\/)(\.env(?:\.|$)|\.dev\.vars(?:\.|$)|node_modules|dist|\.wrangler|\.sorttrip-agent)|\.(?:mp4|mp3|png|jpg|jpeg|webp|har|sqlite|zip|log)$/i;
const rules=[/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,/eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}/,/(?:sk-proj-|sk_live_|Mid-server-)[A-Za-z0-9_-]{20,}/,/sb_secret_[A-Za-z0-9_-]{20,}/];
let total=0,bytes=0;const issues=[];
async function walk(dir,rel=''){
 for(const e of await fs.readdir(dir,{withFileTypes:true})){
  if(!rel&&['.runtime','.git'].includes(e.name))continue;
  const name=rel?rel+'/'+e.name:e.name;
  if(e.isSymbolicLink()){issues.push({path:name,issue:'symlink'});continue;}
  if(banned.test(name)){issues.push({path:name,issue:'forbidden filename (content not read)'});continue;}
  if(e.isDirectory()){await walk(path.join(dir,e.name),name);continue;}
  const data=await fs.readFile(path.join(dir,e.name));total++;bytes+=data.length;
  if(rules.some(re=>re.test(data.toString('utf8'))))issues.push({path:name,issue:'potential credential pattern; values withheld'});
 }
}
await walk(root);
const m=JSON.parse(await fs.readFile(path.join(root,'contributions.json'),'utf8'));
for(const f of m.files.filter(f=>f.kind==='new-event-module')){
  const content=canonical(await fs.readFile(path.join(root,'event-src',f.path),'utf8'));if(sha(content)!==f.sha256)issues.push({path:f.path,issue:'module hash drift'});
}
console.log(JSON.stringify({status:issues.length?'FAIL':'PASS',files:total,bytes,newModules:m.files.filter(f=>f.kind==='new-event-module').length,integrationFiles:m.files.filter(f=>f.kind==='integration-edits').length,oldGitHistoryIncluded:false,patterns:'Static scan only; not a guarantee that no sensitive data exists. Runtime and .git excluded.',issues},null,2));
if(issues.length)process.exitCode=1;
