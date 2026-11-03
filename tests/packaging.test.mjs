import {test} from 'node:test';
import assert from 'node:assert/strict';
import {applyEdits,sha,safePath} from '../scripts/contributions.mjs';
test('integration additions apply to exact base and verify final content',()=>{const b='old\nkeep\n';const expected='new\nkeep\n';assert.equal(applyEdits(b,{path:'example',baseSHA256:sha(b),sha256:sha(expected),operations:[{line:0,delete:1,insert:'new\n'}]}),expected)});
test('base drift fails closed',()=>assert.throws(()=>applyEdits('changed',{path:'example',baseSHA256:sha('old'),operations:[]})));
test('result drift fails closed',()=>assert.throws(()=>applyEdits('old',{path:'example',baseSHA256:sha('old'),sha256:sha('wrong'),operations:[]})));
test('overlapping edits rejected',()=>assert.throws(()=>applyEdits('a\nb\n',{path:'x',baseSHA256:sha('a\nb\n'),operations:[{line:1,delete:1,insert:''},{line:0,delete:1,insert:''}]})));
test('unsafe paths rejected',()=>{for(const name of ['../secret','/abs','a/../b','a\\b','a//b'])assert.throws(()=>safePath(process.cwd(),name))});
test('CRLF dependency normalizes without changing logical source',()=>{const b='a\nb\n';assert.equal(applyEdits('a\r\nb\r\n',{path:'x',baseSHA256:sha(b),sha256:sha(b),operations:[]}),b)});
