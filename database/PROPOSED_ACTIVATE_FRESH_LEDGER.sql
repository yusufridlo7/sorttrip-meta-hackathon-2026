-- NOT APPROVED / NOT EXECUTED. For a NEW reviewer-owned project only.
-- This is NOT a reset, recovery, or migration of any existing SortTrip ledger.
-- Check the dashboard project identity manually before changing the placeholders.
BEGIN;
SET LOCAL lock_timeout='3s';
SET LOCAL statement_timeout='10s';
DO $$
DECLARE expected_ref text:='REPLACE_WITH_NEW_PROJECT_REF'; approved_limit numeric:=0; b public.meta_ai_budget;
BEGIN
 IF NOT false THEN RAISE EXCEPTION 'Owner project/billing/budget attestation required'; END IF;
 IF current_user<>'postgres' OR expected_ref !~ '^[a-z0-9]{20}$'
 OR expected_ref IN ('tznxfgosmjcmwoszvkdk','aytrcvfncsklhqozreyk')
 OR approved_limit<=0 OR approved_limit>100 THEN RAISE EXCEPTION 'Invalid NEW project or approved limit'; END IF;
 SELECT * INTO STRICT b FROM public.meta_ai_budget WHERE id=true FOR UPDATE NOWAIT;
 IF b.allocated_usd<>0 OR b.total_limit_usd<>0 OR NOT b.blocked
 OR EXISTS(SELECT 1 FROM public.meta_ai_requests)
 OR public.meta_ai_safety_status()->>'version'<>'3'
 THEN RAISE EXCEPTION 'Not an unused fresh ledger; STOP without reset'; END IF;
 UPDATE public.meta_ai_budget SET total_limit_usd=approved_limit,blocked=false WHERE id=true;
END $$;
COMMIT;
SELECT public.meta_ai_safety_status();
-- Failure before COMMIT => rollback; keep Meta disabled. No entitlement is created.
-- Never reuse this to reopen a blocked/used ledger or raise an existing limit.
