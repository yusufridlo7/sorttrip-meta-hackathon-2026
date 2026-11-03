# Publication — owner approval required

Proposed NEW repository: `yusufridlo7/sorttrip-meta-hackathon-2026`.

This repository has no old commits, no remote and no copied base source/history. The ignored `.runtime/` is not publishable. Review the MIT license, contribution inventory, privacy scan, setup instructions, manual SQL proposals and video claims before authorizing publication. A static scan cannot guarantee all sensitive data is absent.

After owner approval and owner-controlled GitHub authentication, the intended sequence is:

```sh
npm test
npm run review:package
git diff --cached --stat
git commit -m "Add SortTrip Meta hackathon contributions and reproducible setup"
gh repo create yusufridlo7/sorttrip-meta-hackathon-2026 --public --source . --remote origin
git push -u origin main
```

These commands are documented, not executed by preparation. If the name already exists, STOP rather than repurpose it or push old history. Never force-push or change the original repository. If GitHub authentication is missing, the owner must sign in; do not read or retrieve credentials. After publication, verify the new repository's creation date, visibility, license, tree and fresh-clone setup; replace the pending video URL only with the actual accessible YouTube link.

The local package's staged list must contain only source/docs/tests/integration metadata. It must exclude `.runtime`, `.git` from another repo, node_modules, environment files, logs, database dumps and personal video/audio. No deployment, database change, entitlement grant or paid inference is included in publication approval.
