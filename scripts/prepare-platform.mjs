import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {canonical,sha,safePath,applyEdits} from './contributions.mjs';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const runtime=path.join(ROOT,'.runtime'),target=path.join(runtime,'platform');
const manifest=JSON.parse(await fs.readFile(path.join(ROOT,'contributions.json'),'utf8'));
function run(cmd,args,cwd=ROOT){
 const r=spawnSync(cmd,args,{cwd,stdio:['ignore','pipe','pipe'],encoding:'utf8',env:{...process.env,GIT_TERMINAL_PROMPT:'0'},timeout:180000,maxBuffer:4000000});
 if(r.status!==0)throw Error(`${cmd} failed (${r.status??r.error?.code}); no credentials requested. Check dependency access and retry in a new clean package directory.`);
 return r.stdout.trim();
}
await fs.mkdir(runtime,{recursive:true});
try{await fs.access(target);throw Error('Runtime already exists. Refusing to overwrite files or credentials. Use a fresh package copy.');}catch(e){if(e.code!=='ENOENT')throw e;}
let repository;
const supplied=process.argv.indexOf('--base-repo');
if(supplied!==-1){repository=path.resolve(process.argv[supplied+1]||'');}
else{
 repository=path.join(runtime,'dependency.git');
 try{await fs.access(repository);throw Error('Dependency cache exists; use a clean package copy.');}catch(e){if(e.code!=='ENOENT')throw e;}
 run('git',['init','--bare',repository]);
 run('git',['-C',repository,'fetch','--depth=1',manifest.base.repository,manifest.base.commit]);
}
if(run('git',['-C',repository,'rev-parse',manifest.base.commit+'^{commit}'])!==manifest.base.commit)throw Error('Base identity mismatch');
// Reject symlinks/submodules/path traversal before extraction. No existing environment files are read.
const listing=run('git',['-C',repository,'ls-tree','-r',manifest.base.commit]);
for(const line of listing.split('\n')){
 const [meta,name]=line.split('\t');if(!name)continue;
 if(!meta.startsWith('100644 blob ')&&!meta.startsWith('100755 blob '))throw Error('Unsupported dependency entry');
 safePath(target,name);
 if(/(^|\/)(\.env(?:\.|$)|\.dev\.vars(?:\.|$))/i.test(name))throw Error('Dependency unexpectedly tracks environment files');
}
await fs.mkdir(target,{recursive:false});
const archive=path.join(runtime,'base.tar');
run('git',['-C',repository,'archive','--format=tar','--output',archive,manifest.base.commit]);
run('tar',['-xf',archive,'-C',target]);await fs.unlink(archive);
// Preflight the entire overlay before writing any event module or edit.
const writes=[];
for(const file of manifest.files){
 const dest=safePath(target,file.path);
 if(file.kind==='new-event-module'){
  try{await fs.access(dest);throw Error('Unexpected pre-existing module: '+file.path);}catch(e){if(e.code!=='ENOENT')throw e;}
  const content=canonical(await fs.readFile(safePath(path.join(ROOT,'event-src'),file.path),'utf8'));
  if(sha(content)!==file.sha256)throw Error('Event module drift: '+file.path);writes.push([dest,content]);
 }else if(file.kind==='integration-edits')writes.push([dest,applyEdits(await fs.readFile(dest,'utf8'),file)]);
 else throw Error('Unsupported contribution kind');
}
for(const [dest,content] of writes){await fs.mkdir(path.dirname(dest),{recursive:true});await fs.writeFile(dest,content,'utf8');}
// Discard deployment configuration from the dependency. This local config cannot deploy to SortTrip production.
const config={name:'sorttrip-hackathon-local',main:'worker/index.js',compatibility_date:'2026-09-28',compatibility_flags:['nodejs_compat'],vars:{AI_PROVIDER:'meta',OPENAI_DISABLED:'true',META_ASSISTANT_ENABLED:'false',META_BILLING_CONFIRMED:'false',META_SPEND_GUARD_ENABLED:'true',LITEAPI_ENABLED:'false',LITEAPI_CHECKOUT_ENABLED:'false',HOTEL_BROWSER_ENABLED:'false',GOOGLE_ROUTES_ENABLED:'false',RECOMMENDATIONS_REFRESH_ENABLED:'false',VIATOR_ENVIRONMENT:'disabled'},assets:{directory:'./dist',binding:'ASSETS',not_found_handling:'404-page',run_worker_first:['/api/*','/hotel-checkout']},ratelimits:[{name:'AI_LIMITER',namespace_id:'90101',simple:{limit:2,period:60}},{name:'VIATOR_LIMITER',namespace_id:'90102',simple:{limit:5,period:60}}]};
await fs.writeFile(path.join(target,'wrangler.jsonc'),JSON.stringify(config,null,2)+'\n');
await fs.writeFile(path.join(runtime,'prepared.json'),JSON.stringify({base:manifest.base.commit,manifestSHA256:sha(JSON.stringify(manifest)),files:writes.length,liveInferenceExecuted:false},null,2));
console.log(`Prepared ${writes.length} event modules/integrations on pinned external dependency. Runtime is ignored; Meta and suppliers disabled. No SQL or live request executed.`);
