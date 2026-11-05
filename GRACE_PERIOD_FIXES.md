# QA fixes prepared during the owner-reported grace period — 5 November 2026

Maintenance of the submitted event work; not a new feature set or a replacement demo video. The pinned pre-event dependency is unchanged. Only new event modules and hash-checked integration additions are packaged. Old source/history, runtime configuration and secrets remain excluded.

## Fixes

- Resolve `KUL, Kuala Lumpur` to Kuala Lumpur International Airport in the Worker and external Maps link. Preserve an explicitly supplied terminal; never invent one.
- Require a deliberate transit departure date/time instead of silently using 09:00. Driving/walking and the external directions link remain available.
- Group consecutive same-city lodging areas into a continuous stay unless the user requests different hotels, the city changes, or the final-night airport constraint applies. Respect protected/retained nights. Overnight arrival can require the preceding hotel night.
- Rebind stay-area connectors to the supplier-selected hotel. Invalidate old endpoint-dependent fares and durations. Do not replace a sightseeing stop merely because it shares a neighbourhood name.
- Leave unsupported early check-in or check-in before its arrival transfer unconfirmed. Paid/pending/locked hotels remain protected.
- Default Genting activity search to the editable Kuala Lumpur departure-city scope. Explain that gondola admission and transfer-inclusive tours are different products. Do not change the attraction location.
- Correct literal day placeholders. Explain that an exhausted Trip Pass can reveal another existing valid pass, without adding quota or changing authorization.
- Update ID/EN privacy disclosure for Meta, image/video input and optional foreground Guide location. Reject airport-transfer articles as attraction-admission references.

Shared context: `2026-11-05.1-submission`. Submission-only ledger-origin portability, limits, entitlements, RLS, billing and database proposals are unchanged.

## Verification boundaries

Fresh reconstruction: 100 event module/integration files over the same pinned dependency. Packaging: **6 PASS, 0 FAIL**. Offline feature/regression checks: **171 PASS, 0 FAIL**. Build and Worker dry-run results are recorded in VERIFICATION.md when complete.

No new Meta inference, supplier request, SQL, database mutation, entitlement grant, billing change or deployment was used to validate these fixes. Earlier live browser QA motivated the changes. Offline checks do not prove all future AI itineraries or supplier inventory are correct. Missing prices, schedules and disputed sources remain explicitly unverified.

The owner supplied a grace-period close of 5 November 03:10 AM ET (15:10 WIB / 08:10 UTC). Publication must occur before that cutoff to be proposed as judged work. After close, further work belongs on a separate branch. Do not rewrite dates or history.
