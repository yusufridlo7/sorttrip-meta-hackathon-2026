# Reproduction and verification — 3 November 2026 WIB

## Latest maintenance candidate — 5 November 2026

The grace-period candidate was independently reconstructed in a new directory outside the original application's ancestor path from the unchanged pinned Git dependency. All **100** module/integration hashes applied successfully. Installation used the locked dependency versions with lifecycle scripts disabled; npm reported zero vulnerabilities. An initial offline install lacked one cache entry; registry installation then succeeded.

| Check | Result |
|---|---|
| Packaging | 6 PASS, 0 FAIL |
| Feature and focused regression tests | 171 PASS, 0 FAIL |
| TypeScript and Vite build | PASS |
| Worker dry-run | PASS, no deployment |
| Static package scan | PASS |

Total: **177 offline checks PASS, 0 FAIL, none skipped**. The Vite large-chunk warning remains. Tests cover airport label normalization, no invented transit time, same-city/overnight/retained stay behavior, actual hotel connector rebinding, protected items, exact day interpolation, Viator scope, privacy disclosure and existing Guide/Muse/ledger protections. No new live inference, supplier request, SQL, payment or deployment was performed. See GRACE_PERIOD_FIXES.md for remaining live-verification limits. Publication is a separate owner-controlled step.

The following sections describe historical 3 November verification and do not supersede this candidate result.

## Reproduced, not merely copied

The package was copied to a separate clean directory outside the original application's ancestor directories, without `.runtime`, `.git`, dependencies, configuration or credentials. The documented `npm run prepare:platform` fetched the pinned dependency commit from the public GitHub repository and reconstructed all event changes using hash-checked edits. After owner-approved publication, initial source commit `6684bde9732c9dde76797ac79c9a65a9cc0bf065` was also cloned from the actual public submission repository: packaging tests 6 PASS, source scan PASS and dependency reconstruction PASS, with a clean Git working tree. Full 86 feature tests/build/Worker dry-run were already verified on the identical event source in the clean candidate; no paid inference or SQL was repeated for publication.

| Check | Result | Scope |
|---|---|---|
| Packaging unit tests | 6 PASS,0FAIL | Hash drift, final result, operation overlap, unsafe paths, CRLF |
| Actual event feature tests | 86 PASS,0FAIL | Muse/media/tool loop, Guide/auth/protected changes, location, evidence, ledger failure/concurrency and4submission-origin checks |
| TypeScript + Vite | PASS | Full application composed with the separately fetched dependency |
| Worker bundling | PASS | Wrangler `deploy --dry-run`, no upload/deployment |
| Submission static scan | PASS | No banned filenames, credential-pattern match, or module hash drift in allowlisted package files |
| Parent application changes | NONE | Packaging work does not rewrite the existing production source/configuration |
| New Meta/supplier calls or SQL | NONE | Feature tests use deterministic synthetic responses |

Total final deterministic checks: **92 PASS,0FAIL**. The final candidate was reconstructed with the exact public dependency commit previously fetched; the setup path was tested both with direct public fetching and with its local immutable Git cache. Wrangler4.157.0 was pinned only in the submission's generated dependency package/lock edits.

The optional development-only `review-start.html` was opened in a real Codex browser from the clean candidate at temporary localhost5197. Its synthetic-input disclaimer, date field and normal-app sign-in link rendered. Clicking Save with no Supabase configuration returned "Configure your own authorized Supabase connection first. No request made." No account/database was configured, no real save was claimed, and no SQL was executed. The temporary preview server was stopped afterward; existing local servers were not stopped.

An initial feature test run failed because the event-period before-layout Guide snapshot was missing. That fixture was confirmed absent from the pre-event baseline, included as event test data, and the unchanged test passed. No failing test was removed or skipped.

Initial cached dependency installation could not find one package. Installation from the npm registry succeeded with lifecycle scripts disabled. The old pinned Wrangler dependency chain had3 advisories (2moderate,1high); an isolated submission-only update to Wrangler4.157.0 resulted in npm reporting0 vulnerabilities. Production dependencies were not updated. The Vite build retains its warning about a large application chunk; no unrelated refactor was performed.

## What this does not prove

These results do not constitute a fresh paid inference, browser acceptance run, payment, supplier quote, or deployment of the package. Prior actual production inference and Save/reload are shown in the separately prepared demo and recorded in the owner's source project. Fixtures are not presented as those live results.

Live reproduction requires the legitimate foundation authentication/database/quota resources and approved Meta configuration. Missing or incompatible ledger readiness must stop inference. A submission-only origin option and fresh-only SQL proposals support a separately configured reviewer project; original production remains non-redirectable and historical QA is rejected. See CONFIGURATION.md. No SQL has been executed/rehearsed in this packaging task and no new independent live database journey is claimed. No credentials, production entitlements or ledger balances are bundled.

## Publication checks still needed

- Owner confirms contribution dates, ownership and MIT publication of these event modules.
- Confirm organizer accepts this dependency-plus-integration-edits layout; the old source/history is excluded, and the base dependency is expressly documented.
- Decide judge live-access arrangements without sharing owner credentials or weakening entitlement/RLS.
- Create a NEW public repository with only the package files; do not import old Git history or `.runtime`.
- Insert the actual YouTube URL after owner upload; verify signed-out playback and final remote source contents.

Static pattern scanning is not a guarantee that no sensitive data exists; owner review remains necessary before public publication.
