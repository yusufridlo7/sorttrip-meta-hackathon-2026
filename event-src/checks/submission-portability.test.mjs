import {test} from 'node:test';
import assert from 'node:assert/strict';
import {configuredLedgerOrigin,metaSpendGuard} from '../worker/meta-spend.js';
const origin='https://abcdefghijklmnopqrst.supabase.co',production='https://tznxfgosmjcmwoszvkdk.supabase.co',qa='https://aytrcvfncsklhqozreyk.supabase.co';
test('portable ledger requires exact explicit HTTPS Supabase origin',()=>{
 assert.equal(configuredLedgerOrigin({SUPABASE_URL:origin,META_LEDGER_ORIGIN:origin}),origin);
 for(const value of [undefined,'http://localhost','https://evil.example','https://u:p@abcdefghijklmnopqrst.supabase.co',origin+'/rest/v1',origin+'?x=1',qa])assert.equal(configuredLedgerOrigin({SUPABASE_URL:origin,META_LEDGER_ORIGIN:value}),null);
 assert.equal(configuredLedgerOrigin({SUPABASE_URL:production,META_LEDGER_ORIGIN:origin}),production);
 assert.equal(configuredLedgerOrigin({SUPABASE_URL:origin,META_LEDGER_ORIGIN:production}),null);
});
test('explicit portable origin cannot opt out of guard using flag false',async()=>{
 let calls=0;const guard=metaSpendGuard({SUPABASE_URL:origin,META_LEDGER_ORIGIN:origin,META_SPEND_GUARD_ENABLED:'false',SUPABASE_SERVICE_ROLE_KEY:'synthetic'},{actorId:'11111111-1111-4111-8111-111111111111',fetcher:async url=>{calls++;assert.ok(url.startsWith(origin+'/rest/v1/rpc/'));return Response.json({version:3,globalExclusive:true,reservedUSD:.1,maxLimitUSD:100,allocatedUSD:0,totalLimitUSD:1,blocked:false,pending:false});}});
 assert.ok(guard);await guard.ready();assert.equal(calls,1);
});
test('mismatched origin and historical QA fail before any RPC',async()=>{
 for(const env of [{SUPABASE_URL:origin,META_LEDGER_ORIGIN:'https://zyxwvutsrqponmlkjihg.supabase.co'},{SUPABASE_URL:qa,META_LEDGER_ORIGIN:qa}]){
  const g=metaSpendGuard({...env,META_SPEND_GUARD_ENABLED:'true',SUPABASE_SERVICE_ROLE_KEY:'synthetic'},{actorId:'11111111-1111-4111-8111-111111111111',fetcher:async()=>assert.fail('unexpected network')});await assert.rejects(g.ready(),/AI_BUDGET_UNAVAILABLE/);
 }
});
test('portable ledger retains busy, exhausted and old-version fail-closed behavior',async()=>{
 for(const state of [{pending:true},{blocked:true},{totalLimitUSD:0},{version:2}]){
  const g=metaSpendGuard({SUPABASE_URL:origin,META_LEDGER_ORIGIN:origin,SUPABASE_SERVICE_ROLE_KEY:'synthetic'},{actorId:'11111111-1111-4111-8111-111111111111',fetcher:async()=>Response.json({version:3,globalExclusive:true,reservedUSD:.1,maxLimitUSD:100,allocatedUSD:0,totalLimitUSD:1,blocked:false,pending:false,...state})});await assert.rejects(g.ready(),/AI_BUDGET_/);
 }
});
