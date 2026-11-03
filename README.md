# SortTrip — Meta Hackathon Contributions

**SortTrip existed before this hackathon. During the event we built the Meta Muse Spark adapter, multimodal inputs and itinerary-aware SortTrip Guide.**

This submission contains event modules and event integration edits only. It is **not** a repackaged copy of the pre-existing travel platform. No old Git history, database dumps, credentials, customer trips or demo recordings are included.

**Published repository:** https://github.com/yusufridlo7/sorttrip-meta-hackathon-2026 · public/MIT · created 3 November 2026 at 16:40 UTC (23:40 WIB). Initial event-only source commit: `6684bde9732c9dde76797ac79c9a65a9cc0bf065`. A fresh clone of that public commit passed packaging tests, source scanning and hash-checked dependency reconstruction. See VERIFICATION.md for the distinction between offline tests and historical live evidence.

## What is new

| Contribution | Source |
|---|---|
| Muse adapter, bounded tool loop, usage checks and shared platform context | `event-src/worker/ai-provider.js`, `platform-context.js`, `meta-wire.js`, `meta-spend.js` |
| JPEG/image and short MP4 validation and browser preparation | `event-src/app/assistant-media*`, `event-src/worker/assistant-media*` |
| Itinerary-aware Guide, confirmed checkpoint trail and proposals requiring approval | `event-src/app/sorttrip-guide.tsx`, `guide-checkpoint-trail.tsx`, `event-src/shared/guide-*.mjs`, `event-src/worker/guide.js` |
| Research evidence and transport-connection validation | `event-src/worker/itinerary-evidence.mjs`, `route-location.mjs`, `transport-research-hints.mjs` |
| Connections to the existing planner, editor, Save and navigation | `contributions.json` → `integration-edits` |

Integration edits store **only inserted event text, line positions, deletion counts and hashes**. They do not embed unchanged base files or removed old source. This is necessary because the new features plug into an existing editor/authentication flow. Each base file and reconstructed result is hash-checked; drift fails closed.

Additional event-period UI styling is included to reproduce the demonstrated UI, but is not presented as the core AI contribution. Packaging scripts and their tests were added during final submission preparation.

## Pre-existing dependency — explicitly separate

SortTrip foundation: https://github.com/yusufridlo7/sortTrip

Pinned **pre-event** commit: `737fbc5636145fc27a0bf4ac41be831835dfbd44` (24 October 2026 baseline).

That dependency supplies the pre-existing React/Vite application, Worker routing, authentication, trip schema, editor, My Trips, flight/hotel/transport integrations and booking/affiliate/payment foundations. These are **not claimed as event work**. They are fetched separately into ignored `.runtime/`, never copied into the submitted Git repository. The dependency retains its own rights and notices; the license in this repository does not relicense it.

## Reproduce from a fresh checkout

Prerequisites: Node.js >=22.13, npm, Git and `tar` on PATH. Windows PowerShell: use `npm.cmd` if execution policy blocks `npm.ps1`; do not weaken the policy. Git must be able to fetch the pinned public dependency. No Docker is required for code tests or a frontend build.

```sh
npm run prepare:platform
npm run install:platform
npm test
npm run test:features
npm run build
npm run check:worker
```

The first command fetches the exact dependency commit, validates file types/paths, applies all event changes, and replaces the old deployment configuration with a **local-only, inference-disabled configuration**. It refuses to overwrite an existing runtime. Installation uses `npm ci --ignore-scripts` and the pinned lockfile plus event tooling edits. The submission pins Wrangler4.157.0 to address advisories in the foundation's older development tooling; it does not modify the hosted application's dependencies. The build is written to `.runtime/platform/dist`.

For an offline review where the original dependency is already available as a local Git repository:

```sh
npm run prepare:platform -- --base-repo /absolute/path/to/existing-sortTrip-checkout
```

Only the pinned Git commit is read—not that checkout's current files, environment, uncommitted work or credentials. Do not substitute a later baseline to make hashes pass.

Start the UI and local Worker in two terminals after building:

```sh
npm run dev:worker
npm run dev
```

Frontend: http://127.0.0.1:5173 · Worker: http://127.0.0.1:8787. Ensure these ports are free; do not stop unrelated services. Both bind locally. `check:worker` bundles with Wrangler `--dry-run`; it does not deploy. There is no live deployment or payment command in this package.

For a fresh account with no saved trips and no supplier keys, sign in normally, then open **http://127.0.0.1:5173/review-start.html** while the Vite development server is running. This explicitly labeled development helper saves a synthetic starting itinerary through the existing authenticated Save/RLS code, only when you click its button. Return to My Trips to open it. It creates no entitlement and calls no model/supplier. Its placeholder prices are unavailable, not verified zero-cost offers. This helper is for development, not a new production route or live-result proof.

### Offline versus live behavior

Without configuration, the application loads but authentication/AI is unavailable. `npm run test:features` runs deterministic mocked-provider tests of the **actual exported modules and integrated handlers**, including image/video, the tool loop, Guide protection and ledger failures. These are explicitly **offline tests**, not live inference proof.

For the real authenticated UI journey, the external SortTrip foundation requires its normal Supabase schema, valid user login and a legitimate Trip Pass/AI entitlement. The owner must configure these privately. This package does not create a test entitlement, disable RLS, accept fake identities, copy user data, or execute SQL.

See [CONFIGURATION.md](CONFIGURATION.md) before enabling any paid request. A Meta API key alone is insufficient: billing approval, entitlements, ledger readiness, source validation and request limits must all pass. A submission-only option supports a reviewer-owned fresh Supabase ledger through an exact matching `META_LEDGER_ORIGIN`; it does not redirect the original production ledger or reuse historical QA. [Manual database proposals](database/README.md) are provided for review, not automatically executed. Keep AI disabled if any prerequisite is missing.

Verified hosted application: https://sorttrip.yusufridlo7.workers.dev/ . The recording demonstrates authenticated production video-assisted revision, editor/Save/My Trips/reload, and a separate actual Guide proposal/approval flow. Hosted evidence does not replace fresh-checkout tests.

## Suggested review journey

1. Inspect the contribution boundary and run offline tests/build above. For a new account, use the optional labeled sample input helper after normal sign-in; it does not require flight/hotel supplier credentials.
2. With authorized, privately configured infrastructure, sign in normally and open a saved itinerary.
3. Attach an owned/authorized image or short MP4 with travel instructions; submit one explicit generation. No model calls occur from merely opening the page or attaching media.
4. Review the validated result, prices and sources; manually edit, save, open My Trips and reload.
5. Confirm the itinerary and activate Guide. Ask for a schedule change. Review the proposal, approve explicitly, then verify the checkpoint update. Paid/locked items remain protected.

No bookings or payments are needed for review. Do not accept supplier terms or enter card details merely to test the AI features.

## Evidence and limits

- See [VERIFICATION.md](VERIFICATION.md) for fresh-checkout results and their exact scope.
- Video URL: pending owner upload of `SortTrip_Meta_Hackathon_INDIE_FINAL_EN_1080p.mp4` (2:58.6).
- Visual identification is uncertain: the demonstrated MP4 did not identify a reliable location; the user supplied Kuala Lumpur.
- Detailed KL–Genting prices in the video were manually reviewed after a subsequent AI revision. Indicative prices, official tariff references, planning allowances and on-site-only purchases are distinguished. Not all transport sources or dated inventory are verified.
- Guide is an assistive web feature; no guaranteed background GPS monitoring, push alarm or transport disruption feed is claimed. Model proposals require confirmation.
- No automatic booking, payment or OpenAI fallback is part of the submitted Meta workflow.

## Publishing

This **new** public repository was created after 26 October 2026 and published with explicit owner approval. Only this package was pushed, never `.runtime/`, the existing checkout, logs, media, environment files or old `.git` history. Run `npm run review:package` and inspect the staged file list before any future update. Publication does not authorize a deployment, database change or paid inference.

MIT applies to the event work in this package with the owner's publication approval. Existing dependency and third-party assets retain their original licenses. No destination photos, third-party logos or personal video/audio are bundled in this package.
