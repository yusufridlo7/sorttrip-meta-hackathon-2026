-- PROPOSED SETUP FOR A NEW REVIEWER-OWNED SUPABASE PROJECT ONLY.
-- NOT EXECUTED OR APPROVED FOR ANY EXISTING SORTTRIP ENVIRONMENT.
-- Manually verify the dashboard project identity. Do not use original production or QA.
-- Leave both attestation placeholders unchanged until the authorized project owner reviews.
-- SQL cannot independently attest the Supabase dashboard identity; the owner must do so.
BEGIN;
SET LOCAL lock_timeout='3s';
SET LOCAL statement_timeout='15s';
DO $$
DECLARE expected_ref text := 'REPLACE_WITH_NEW_PROJECT_REF';
BEGIN
 IF NOT false THEN RAISE EXCEPTION 'Owner must review and attest a NEW project before running'; END IF;
 IF current_user<>'postgres' OR expected_ref !~ '^[a-z0-9]{20}$'
 OR expected_ref IN ('tznxfgosmjcmwoszvkdk','aytrcvfncsklhqozreyk') THEN RAISE EXCEPTION 'Wrong project/owner attestation; STOP'; END IF;
 IF to_regclass('public.meta_ai_budget') IS NOT NULL OR to_regclass('public.meta_ai_requests') IS NOT NULL
 OR to_regprocedure('public.meta_ai_safety_status()') IS NOT NULL
 OR to_regprocedure('public.reserve_meta_ai_request(uuid,uuid)') IS NOT NULL
 OR to_regprocedure('public.settle_meta_ai_request(uuid,numeric,bigint,bigint)') IS NOT NULL
 THEN RAISE EXCEPTION 'Existing ledger or RPC found; do not overwrite or reset'; END IF;
END $$;
CREATE TABLE public.meta_ai_budget (
 id boolean PRIMARY KEY DEFAULT true CHECK(id),
 allocated_usd numeric(12,6) NOT NULL DEFAULT 0 CHECK(allocated_usd>=0),
 total_limit_usd numeric(12,6) NOT NULL DEFAULT 0 CHECK(total_limit_usd>=0 AND total_limit_usd<=100),
 blocked boolean NOT NULL DEFAULT true,
 CHECK(allocated_usd<=total_limit_usd)
);
CREATE TABLE public.meta_ai_requests (
 id uuid PRIMARY KEY,
 user_id uuid NOT NULL REFERENCES auth.users(id),
 created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
 settled_at timestamptz,
 estimated_usd numeric,
 input_tokens bigint CHECK(input_tokens>=0),
 output_tokens bigint CHECK(output_tokens>=0)
);
ALTER TABLE public.meta_ai_budget ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meta_ai_requests ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.meta_ai_budget,public.meta_ai_requests FROM PUBLIC,anon,authenticated,service_role;
-- Zero allocation, zero budget, blocked. No existing records or balances are imported.
INSERT INTO public.meta_ai_budget(id,allocated_usd,total_limit_usd,blocked) VALUES(true,0,0,true);
CREATE FUNCTION public.meta_ai_safety_status() RETURNS jsonb
LANGUAGE sql SECURITY DEFINER SET search_path='' AS $$
 SELECT jsonb_build_object('version',3,'globalExclusive',true,'reservedUSD',0.10,'maxLimitUSD',100,
  'allocatedUSD',b.allocated_usd,'totalLimitUSD',b.total_limit_usd,'blocked',b.blocked,
  'pending',EXISTS(SELECT 1 FROM public.meta_ai_requests WHERE settled_at IS NULL))
 FROM public.meta_ai_budget b WHERE id=true
$$;
CREATE FUNCTION public.reserve_meta_ai_request(p_request uuid,p_user uuid) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE b public.meta_ai_budget;
BEGIN
 IF p_request IS NULL OR p_user IS NULL THEN RETURN jsonb_build_object('allowed',false,'reason','invalid'); END IF;
 SELECT * INTO STRICT b FROM public.meta_ai_budget WHERE id=true FOR UPDATE NOWAIT;
 IF b.blocked OR b.total_limit_usd<0 OR b.total_limit_usd>100 OR b.allocated_usd+0.10>b.total_limit_usd THEN
  RETURN jsonb_build_object('allowed',false,'reason','exhausted'); END IF;
 IF EXISTS(SELECT 1 FROM public.meta_ai_requests WHERE id=p_request OR settled_at IS NULL) THEN
  RETURN jsonb_build_object('allowed',false,'reason','busy'); END IF;
 INSERT INTO public.meta_ai_requests(id,user_id) VALUES(p_request,p_user);
 UPDATE public.meta_ai_budget SET allocated_usd=allocated_usd+0.10 WHERE id=true;
 RETURN jsonb_build_object('allowed',true,'id',p_request,'reservedUSD',0.10,'totalLimitUSD',b.total_limit_usd,'globalExclusive',true);
EXCEPTION WHEN lock_not_available THEN RETURN jsonb_build_object('allowed',false,'reason','busy');
END $$;
CREATE FUNCTION public.settle_meta_ai_request(p_request uuid,p_estimated_usd numeric,p_input_tokens bigint,p_output_tokens bigint) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE r public.meta_ai_requests; valid boolean; minimum_usd numeric;
BEGIN
 PERFORM 1 FROM public.meta_ai_budget WHERE id=true FOR UPDATE NOWAIT;
 SELECT * INTO r FROM public.meta_ai_requests WHERE id=p_request FOR UPDATE;
 IF NOT FOUND THEN RETURN jsonb_build_object('ok',false); END IF;
 -- Replay cannot change records, allocate again, or newly block on a different replay payload.
 IF r.settled_at IS NOT NULL THEN RETURN jsonb_build_object('ok',
  r.estimated_usd IS NOT DISTINCT FROM p_estimated_usd AND r.input_tokens IS NOT DISTINCT FROM p_input_tokens AND r.output_tokens IS NOT DISTINCT FROM p_output_tokens); END IF;
 minimum_usd=(p_input_tokens*1.25+p_output_tokens*4.25)/1000000;
 valid=p_estimated_usd IS NOT NULL AND p_input_tokens IS NOT NULL AND p_output_tokens IS NOT NULL
  AND p_input_tokens BETWEEN 0 AND 24000 AND p_output_tokens BETWEEN 0 AND 8000
  AND p_estimated_usd>=minimum_usd AND p_estimated_usd<=0.10;
 IF NOT coalesce(valid,false) THEN
  UPDATE public.meta_ai_budget SET blocked=true WHERE id=true;
  -- Preserve known token usage. Unknown cost stays pending; manual reconciliation required.
  UPDATE public.meta_ai_requests SET estimated_usd=CASE WHEN p_estimated_usd>=0 THEN p_estimated_usd END,
   input_tokens=CASE WHEN p_input_tokens>=0 THEN p_input_tokens END,
   output_tokens=CASE WHEN p_output_tokens>=0 THEN p_output_tokens END WHERE id=p_request;
  RETURN jsonb_build_object('ok',false);
 END IF;
 UPDATE public.meta_ai_requests SET settled_at=clock_timestamp(),estimated_usd=p_estimated_usd,input_tokens=p_input_tokens,output_tokens=p_output_tokens WHERE id=p_request;
 -- Allocation is never refunded, even for valid zero usage. No auto release of stale pending.
 RETURN jsonb_build_object('ok',true);
END $$;

REVOKE ALL ON FUNCTION public.meta_ai_safety_status() FROM PUBLIC,anon,authenticated;
REVOKE ALL ON FUNCTION public.reserve_meta_ai_request(uuid,uuid) FROM PUBLIC,anon,authenticated;
REVOKE ALL ON FUNCTION public.settle_meta_ai_request(uuid,numeric,bigint,bigint) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.meta_ai_safety_status(),public.reserve_meta_ai_request(uuid,uuid),public.settle_meta_ai_request(uuid,numeric,bigint,bigint) TO service_role;
DO $$ BEGIN
 IF public.meta_ai_safety_status()->>'version'<>'3'
 OR EXISTS(SELECT 1 FROM public.meta_ai_budget WHERE allocated_usd<>0 OR total_limit_usd<>0 OR NOT blocked)
 OR EXISTS(SELECT 1 FROM public.meta_ai_requests) THEN RAISE EXCEPTION 'Fresh postflight failed'; END IF;
END $$;
COMMIT;
-- Read-only owner postflight. API clients cannot invoke this as anon/authenticated.
SELECT public.meta_ai_safety_status();
-- Fresh table DDL has not been executed in this packaging task. Function bodies reuse event v3 logic.
-- Budget activation is a separate owner action: no activation or entitlement SQL is run here.
-- Any error => transaction rolls back. Do not adapt this to replace an existing ledger.
