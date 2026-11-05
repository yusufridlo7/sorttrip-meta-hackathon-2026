# Event contribution inventory

Baseline dependency: `737fbc5636145fc27a0bf4ac41be831835dfbd44` (pre-event; source/history excluded).

This inventory describes packaged changes, not independent proof of creation date. The owner must confirm provenance before publication. No commit dates have been rewritten. New modules existed outside the pinned baseline; integrated old files are represented only by inserted text and deletion counts.

## Added event modules and regression fixture

| Path | SHA256 |
|---|---|
| `event-src/app/assistant-media-client.d.mts` | `593982e929ba3461eeeeade81177e5da902f06217c2b0bb14c55aa9bad237828` |
| `event-src/app/assistant-media-client.mjs` | `5dab61a01721efb776467154958ba4ddef94d89af8bce3ce324bd272c26b215d` |
| `event-src/app/assistant-media.css` | `91127670d21cd796d8fe64309c36dafa6b33a6bc94e495256720ab3f3a78cabf` |
| `event-src/app/assistant-media.tsx` | `c64d7a559df2a15b13207c0cd2a85a038926762b68026157f9b60f66e1c9e21d` |
| `event-src/app/guide-checkpoint-trail.tsx` | `c083871801bb6c317b200481da9fd52f83ec01bce22a682d212ed14b486f1161` |
| `event-src/app/guide-page.css` | `5b60e2c94b7714194aa28d94571f342dff69ee8929362e243a10a44bcf619f47` |
| `event-src/app/itinerary-evidence-status.tsx` | `1eaf3397f634320514f414f722f93e798f9e1790a985606da16c11e9e95a4fc5` |
| `event-src/app/sorttrip-guide.css` | `b1cfe5a5adf0a665a456eb8d692e0a9fe8b5c5af02f6c7f8211261960641482d` |
| `event-src/app/sorttrip-guide.tsx` | `e982a5351dc9296d9b5b8613efb0cff8664514eeac73aeae7cd8950fdbe31276` |
| `event-src/app/ui-alignment/account-support.css` | `41328487c5b09f697a0938ffd701b0d370534d71912c8f32c6ba6da784986fda` |
| `event-src/app/ui-alignment/checkout.css` | `0621d1a89f4b381403607ea98b68b5f8e3bcf6ca369cc70a0fbe190d4fe139ea` |
| `event-src/app/ui-alignment/discovery.css` | `d44b68500700d7bb7f496e0f75b33cd38d5229c4ecca2db5e8ae569455535c6c` |
| `event-src/app/ui-alignment/flights.css` | `032a94f4698398e115b0f0f3b355e1295ba22fb8d25e87ddbd0a48a86f1cc8c6` |
| `event-src/app/ui-alignment/guide.css` | `05b8c14ccec415d4f9de80bd5540b03e0b14cb1454a13278d4c5e48b5bcf94b5` |
| `event-src/app/ui-alignment/index.js` | `41fcc76679c1f149b064c418a3f389bcdb768e52f6c5a2852fd4b9cd026251b7` |
| `event-src/app/ui-alignment/palette-type.css` | `ac8025a8c700fce033ee865250e3cefdd65fb3083dfb07deea95178530a5819b` |
| `event-src/app/ui-alignment/partners.css` | `9b0bc1d2619eb92a2dc86d0571756543693f0d2af215fc49968d1bae5cbd59ff` |
| `event-src/app/ui-alignment/planner.css` | `a913b683bd3fb86937c4145e727be497ac18b320b1afef6406ad4647622af634` |
| `event-src/app/ui-alignment/shell.css` | `37751e24bf82ba9caa7db67406d71563f7f16e1f844dbc890ae00da2c98bdd5c` |
| `event-src/checks/guide-api.test.mjs` | `f6767b2fa738c60c5496134c532022c5e54c8c4add6e043f22d9c6e48e96ef31` |
| `event-src/checks/guide-core.test.mjs` | `c23b67c9cbe1fe317412e8d290c01327997b925152b52e8f41b2ae015c36fe55` |
| `event-src/checks/guide-design-03.test.mjs` | `41ea6fcb4e326187c283549314fcb339e1220d3bdb94a95a818814c4c6a1e037` |
| `event-src/checks/guide-location.test.mjs` | `2d13b37d3a0b0bb190a1f76492ff9b050a713f6f8d1ed770d30aeb3e80e4da64` |
| `event-src/checks/guide-view.test.mjs` | `a58ea84bcdf853f48f5f147ae6014cb6e17443611ebdae134e41a35e793aca81` |
| `event-src/checks/itinerary-evidence.test.mjs` | `863e62fc7b0329e2acdbf020637d8bf7c4ea435efb8047102effaf3a45dcef99` |
| `event-src/checks/meta-spend.test.mjs` | `e240f56e524ea8891cde67062099d00609cb3b061315a8a7ae2b1a27bc5f4da2` |
| `event-src/checks/meta-wire.test.mjs` | `f5f73b7f44acd064d93d086840088a2dcd72261115f192b2e596a7eb1a052e66` |
| `event-src/checks/muse-adapter.test.mjs` | `c2c6b9c4feff9fc279e9021dac5fe687cd5886933f086d7f81bdf3cd8a4c04d4` |
| `event-src/checks/platform-context.test.mjs` | `23a048a209c19777735d25b075ac9eb433c781918a50adcb742efa7fd7147d71` |
| `event-src/checks/privacy-current.test.mjs` | `03cca0b56ccde2ea5eedc29513f71a22d8619d2c4e8c6667d3b1f4508ba19629` |
| `event-src/checks/submission-portability.test.mjs` | `3dcbf229d0a55f465864fbf0931891971268de4ccc613d108bee0a564cd89418` |
| `event-src/checks/transport-research-hints.test.mjs` | `ae1060c9fa0e649f1a13e146ec2e1a7aeefd4d31587bd63208b5029ed1ecd8e4` |
| `event-src/checks/visual-palette.test.mjs` | `8b1e8864622fe00b3386f371349e518d51270669431212ecc49e6205aa0429a2` |
| `event-src/qa-reports/guide-design-03-2026-11-02/source-baseline/sorttrip-guide.tsx` | `5f101c1a3791c7e401959b488761c1b633ae020fee9b9e71919653823b7906ef` |
| `event-src/review-start.html` | `7273528abca26ee51619a8a79b9c721b2ff9377891d1c9ff0ac2d9e79db035a2` |
| `event-src/review/itinerary-input.json` | `482e6e60e5f675837c14a2ccefadffe519e42828723f8b8dcc2d6cb21c983f8a` |
| `event-src/shared/guide-core.d.mts` | `ff8dc23425ac99285b88066d1c66f651f66a9ee1e1ef376514d957ad08944fea` |
| `event-src/shared/guide-core.mjs` | `5925454176b2727a6c85e9e742b889d303e78ebc320bdd5779205d03ffe6bec5` |
| `event-src/shared/guide-location.d.mts` | `624a22c8ef4be8d3875cbcb441ce84ec3fc1871d28153c1b0294ec6290c6b22d` |
| `event-src/shared/guide-location.mjs` | `56740c7005b06c811b30d6d24dcc4814facddbdf2c8930b21b22ea007ac5dd3e` |
| `event-src/shared/guide-view.d.mts` | `21603cf40cf13b1923a4e16fc38e38cda1a2d6b8be35e2529da82f1e2f1117cf` |
| `event-src/shared/guide-view.mjs` | `8540ea723d39075e5ab0546ac6e9506c18104b00ade8fe3eb10a7b9ec1163333` |
| `event-src/worker/activity-search-location.d.mts` | `32b204978e7fc38dd478977c574e1d7c5ec2e8b84532eb339d8f4ebcdb85851e` |
| `event-src/worker/activity-search-location.mjs` | `610cdfba14f95b4ac0fdd95e99dd445c71f74488937e32d31303cf6b2f1e8a9a` |
| `event-src/worker/ai-observability.js` | `b670f8290ca717c7d75ed18096f76412a8885ed1c08eb4791f8f5be34bd2e2a1` |
| `event-src/worker/ai-provider.js` | `d33b1ef4c11954837253f716dd37dba83cd436ce2d35771d1084acaa6b7677c3` |
| `event-src/worker/assistant-media.d.mts` | `5d16204e98bfc35ce7a4f4b4fdb6eb7ca50aa8d989dc14c3b2e0481f165341ec` |
| `event-src/worker/assistant-media.mjs` | `a5b9791e1cb544b51816db9909b5d4ad4b724e1f4610d7b6aabd2306916a266a` |
| `event-src/worker/assistant-search-tools.js` | `1f46520ac65f7ddef70e3a706012af29d7b441e6e6243ae83ad451fd7a74c1d9` |
| `event-src/worker/guide.js` | `9ea293149a6cf7450b16f446f144b2984dad6634ce2b7a5b9fe4eb839240d098` |
| `event-src/worker/itinerary-evidence.d.mts` | `506ae12f87e5b0d28749efd0e39e258a543130251021b39f148525cb4c045806` |
| `event-src/worker/itinerary-evidence.mjs` | `9917f4ad4f00135ff0d966bcfb792baab64694f121d21771dc730d7b0e670309` |
| `event-src/worker/itinerary-order.d.mts` | `63a07f2749e4c6ccb00e1835176c2e461b0ec5c571107d2fd58d7304d79dfd92` |
| `event-src/worker/meta-spend.js` | `c3a9556e2618ac7d6d1e6186839c52489a45ea9e5d5b6abdb6f47374072cbb28` |
| `event-src/worker/meta-wire.js` | `f5dc67b80e5ef5ffcbae78c84b54399d88ed51cf687d9880313ad4efbec1249f` |
| `event-src/worker/platform-context.js` | `1fc1e13591dd466c3288e04f274bbd0935b862929f067b99de5e14818a17aa4d` |
| `event-src/worker/route-location.d.mts` | `058c11232ecfe8cd411e4cda6758713353cf07862265de49a1db62e2d6eba02f` |
| `event-src/worker/route-location.mjs` | `d6eba7b112dfca770b27f50122ae730fd6727fb47346f90c6598efe05407ff93` |
| `event-src/worker/transport-research-hints.mjs` | `e5a3075b8b93aa7ada05b596f4d363c867f88215601b311b7028b34130b0cd5e` |

## Integration edits to the external foundation

| External dependency file | Operations | Added text lines | Deleted line count |
|---|---:|---:|---:|
| `app/activity-tickets.tsx` | 3 | 4 | 2 |
| `app/ai-item-details.tsx` | 3 | 6 | 3 |
| `app/ai-planner.tsx` | 12 | 17 | 8 |
| `app/apply-ai-plan.ts` | 11 | 30 | 11 |
| `app/brand-theme.css` | 1 | 370 | 0 |
| `app/flight-search.tsx` | 7 | 13 | 9 |
| `app/google-route-check.tsx` | 6 | 8 | 6 |
| `app/hotel-checkout.css` | 1 | 27 | 0 |
| `app/i18n/locales/en.json` | 3 | 17 | 3 |
| `app/i18n/locales/id.json` | 3 | 17 | 3 |
| `app/item-booking.tsx` | 3 | 3 | 1 |
| `app/price-watch.tsx` | 1 | 1 | 1 |
| `app/route-map.tsx` | 1 | 1 | 1 |
| `app/transport-search.tsx` | 1 | 1 | 1 |
| `app/travel-app.tsx` | 10 | 19 | 9 |
| `app/travel-data.ts` | 3 | 3 | 3 |
| `app/trip-save.ts` | 2 | 2 | 1 |
| `checks/ai-itinerary.test.mjs` | 2 | 23 | 1 |
| `checks/apply-ai-plan.test.mjs` | 6 | 80 | 0 |
| `checks/bilingual.test.mjs` | 2 | 2 | 1 |
| `checks/flight-itinerary.test.mjs` | 2 | 10 | 0 |
| `checks/google-route-ui.test.mjs` | 2 | 9 | 0 |
| `checks/google-routes.test.mjs` | 1 | 10 | 0 |
| `checks/itinerary-edit-completeness.test.mjs` | 2 | 3 | 1 |
| `checks/lite-hotel.test.mjs` | 3 | 31 | 1 |
| `checks/price-research.test.mjs` | 1 | 1 | 1 |
| `checks/trip-access.test.mjs` | 1 | 6 | 0 |
| `checks/viator-api.test.mjs` | 1 | 5 | 0 |
| `main.jsx` | 1 | 1 | 0 |
| `package-lock.json` | 16 | 39 | 38 |
| `package.json` | 2 | 4 | 3 |
| `public/privacy.html` | 4 | 6 | 4 |
| `worker/ai-draft.js` | 4 | 4 | 3 |
| `worker/google-routes.js` | 2 | 2 | 1 |
| `worker/index.js` | 3 | 6 | 1 |
| `worker/itinerary-intent.d.mts` | 1 | 1 | 0 |
| `worker/itinerary-intent.mjs` | 2 | 7 | 1 |
| `worker/itinerary-order.mjs` | 1 | 1 | 1 |
| `worker/itinerary.js` | 22 | 60 | 17 |
| `worker/lite-hotel.js` | 5 | 50 | 5 |
| `worker/narrative-translation.js` | 4 | 4 | 2 |

## Reconstruct and inspect

`npm run prepare:platform` reconstructs these files under ignored `.runtime/platform`. Both base and output hashes must match. Compare the reconstructed source to the separately fetched baseline for review. No old unchanged file or old Git history is included in the submitted source inventory.

Submission-only tooling changes pin Wrangler4.157.0; the source production dependencies remain untouched.
