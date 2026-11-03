# Private configuration and live-test prerequisites

The default configuration disables Meta and suppliers, has no database URL/key, no shared KV ID, no browser binding and no scheduled jobs. The original deployment name/configuration is not reused. Never deploy this review runtime over the existing SortTrip Worker.

Only the operator may supply credentials. Never commit environment files or paste secret values into issues/README. Do not put the service-role key or Meta key in frontend `VITE_` variables. Preparation never reads an existing environment file and never copies it into the runtime.

## Frontend authentication

Privately create `.runtime/platform/.env.local` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` for the authorized foundation database, then restart Vite/build. The publishable key must be appropriate for the project; service-role/secret keys must never be used here. Use normal sign-in; do not transfer sessions between users.

## Worker

Privately create `.runtime/platform/.dev.vars` with the server-only values required by the normal foundation:

- `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
- `META_MODEL_API_KEY` for an authorized Meta Model API project.
- Explicitly approved `META_ASSISTANT_ENABLED=true`, `META_BILLING_CONFIRMED=true`. `AI_PROVIDER=meta`, `OPENAI_DISABLED=true`, `META_SPEND_GUARD_ENABLED=true` remain required.
- For a fresh reviewer-owned project, `META_LEDGER_ORIGIN` must exactly match `SUPABASE_URL` (HTTPS Supabase project origin). Do not point it at historical SortTrip QA.

Do not enable those flags until the operator verifies billing, ledger and entitlement readiness. Do not duplicate real secrets here in examples. API-key aliases must be normalized by the operator's existing setup; the exported adapter expects `META_MODEL_API_KEY`.

## Required external contracts

The baseline dependency's own `supabase/` scripts document the existing trip/auth/Trip Pass schema. They are dependencies—not copied event schema. **Do not blindly replay them on an existing database.** Only its authorized operator can compare/apply compatible schema or assign legitimate access. This package performs no SQL operations.

The new spend guard requires server-only RPCs `meta_ai_safety_status()`, `reserve_meta_ai_request(uuid,uuid)` and `settle_meta_ai_request(uuid,numeric,bigint,bigint)` with v3/global-exclusive/reservationUSD0.10/max-capUSD100 contracts and accurate pending/settled accounting. Production ledger readiness was historically verified in the submitted app; it is not a guarantee for another database today. The submission-only origin option requires explicit exact matching for a fresh operator-owned project. Original production cannot be redirected and historical QA is rejected. No bypass or automatically active alternative ledger is supplied.

For a judge-run deployment on a different database, follow [database/README.md](database/README.md), including the external foundation schema, fresh-only proposed ledger setup and separate explicit budget activation. These SQL files have not been executed/rehearsed in this task. Configuration-only portability is offline-tested; independent live database setup remains unverified until its owner applies and validates it. Do not set the guard flag false to work around missing readiness. The recorded production normal flow remains separate evidence.

## Suppliers

Default review setup leaves hotel/browser/checkout/Routes/recommendations/Viator disabled. Their original API credentials are neither copied nor required for offline tests/build. Missing prices must remain unavailable. Optional live suppliers need their own existing authorization and billing review. Read-only model tools cannot buy, book, save or pay.

## Safety limits retained

Authentication and owned trips; Trip Pass reservation/finalization; shared global spending guard; bounded input/output/call/tool counts; per-request timeout and cancellation; no automatic model retry or paid provider fallback. Never reset a blocked ledger, historical requests, budget or entitlements just to make a demo run.
