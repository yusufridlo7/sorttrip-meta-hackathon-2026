import {createHash} from 'node:crypto';
import path from 'node:path';
export const canonical=s=>s.replace(/\r\n/g,'\n');
export const sha=s=>createHash('sha256').update(s).digest('hex');
export function safePath(root,name){
 if(typeof name!=='string'||!name||name.includes('\\')||name.split('/').some(x=>!x||x==='.'||x==='..')||! /^[a-zA-Z0-9_./-]+$/.test(name))throw Error('Unsafe contribution path');
 const result=path.resolve(root,name);if(!result.startsWith(path.resolve(root)+path.sep))throw Error('Unsafe contribution path');return result;
}
export function applyEdits(before,file){
 const text=canonical(before);if(sha(text)!==file.baseSHA256)throw Error('Base drift: '+file.path);
 const lines=text.match(/[^\n]*\n|[^\n]+$/g)||[];let cursor=0,result='';
 for(const op of file.operations){
  if(!Number.isSafeInteger(op.line)||!Number.isSafeInteger(op.delete)||op.line<cursor||op.delete<0||op.line+op.delete>lines.length||typeof op.insert!=='string')throw Error('Invalid integration operation');
  result+=lines.slice(cursor,op.line).join('')+op.insert;cursor=op.line+op.delete;
 }
 result+=lines.slice(cursor).join('');if(sha(result)!==file.sha256)throw Error('Result drift: '+file.path);return result;
}
