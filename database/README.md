# Optional self-hosted review database — manual owner setup

No SQL in this package was executed against any database. Proposals intentionally fail until an authorized operator reviews them and attests a **fresh** project. Do not use either existing SortTrip production or historical QA. Neither file automatically proves the dashboard project identity; manual identity verification is mandatory.

## Foundation dependency

For a NEW reviewer-owned Supabase project, inspect the separately fetched baseline's existing scripts:

1. `.runtime/platform/supabase/schema.sql` — existing trips table, owned-row policies and timestamp trigger.
2. `.runtime/platform/supabase/ai-access.sql` — existing Trip Pass/membership contract.
3. `.runtime/platform/supabase/ai-quota-v2.sql` — existing reserve/finalize RPCs and duplicate/pending protections; apply only after ai-access.

These are not newly authored hackathon schema and are not copied into this repository. The project's authorized administrator must review their table/function privileges and execute them ONLY in an empty project. Do not run every old migration, payment or supplier script for an AI review. Never replay these over an existing production database.

The pre-existing quota policy permits a limited basic allowance before requiring an eligible Trip Pass. That policy is unchanged: no pass row, payment, user identity or custom entitlement is fabricated by the submission. Inspect `reserve_ai_request` in the pinned dependency for the exact policy. The server still authenticates the user, checks owned trip revisions and calls normal reservation/finalization RPCs. A missing/exhausted allowance remains a blocker.

## Event spending ledger

Review `PROPOSED_FRESH_LEDGER.sql`, verify a new project reference in the dashboard, and only then set its manual attestation placeholders. The transaction refuses existing ledger tables or same-signature RPCs, creates an empty RLS-protected ledger at **allocated0 / limit0 / blocked=true**, and exposes only the fixed SECURITY DEFINER v3 RPCs to service_role. No direct table access is granted to clients or service_role. Functions use empty search_path and are created by postgres. No records/balances/entitlements are imported.

The v3 function bodies are the event implementation, including NOWAIT global lock, duplicate UUID/global-pending rejection, non-refunded USD0.10 allocation, bounded usage checks, replay equality and unknown-usage fail-closed settlement. Fresh-table DDL is a new packaging proposal and has not received a real PostgreSQL rehearsal in this task; do not claim otherwise.

After private Meta billing approval, review the separate `PROPOSED_ACTIVATE_FRESH_LEDGER.sql`. Its approved limit defaults to0 and its attestation tofalse; it cannot execute as shipped. Only the authorized operator may choose a limit within their actual approved balance and maximum100. Activation requires the exact unused0/0/blocked/zero-history snapshot. It does not create entitlement or reset existing history. Never use it on SortTrip production/QA or to recover a used ledger.

Set server-only `META_LEDGER_ORIGIN` to the exact HTTPS origin of that fresh project, matching `SUPABASE_URL`. Origin mismatch, original QA, missing/old v3 status, blocked/empty budget or global pending must stop inference. The original production target cannot be redirected by this new setting.

Then configure Supabase auth redirect URLs for the local frontend and sign in normally. Keep secrets server-side and use an owned test itinerary. Make each live inference an explicit action, watch its cost, and do not retry automatically. No paid inference is part of package preparation.
