# Publication — owner-approved release

Published NEW repository: https://github.com/yusufridlo7/sorttrip-meta-hackathon-2026 . Owner explicitly approved public/MIT publication, commit and push on 3 November 2026. The owner created an empty remote; the initial source commit is `6684bde9732c9dde76797ac79c9a65a9cc0bf065`.

This repository has no old SortTrip commits or copied base source/history. It now tracks its own new public remote. The ignored `.runtime/` is not publishable. The MIT license, contribution inventory, static scan and staged files were reviewed before the authorized push. A static scan cannot guarantee all sensitive data is absent. The SQL proposals and any paid live test still require their separate operator approval.

After owner approval and owner-controlled GitHub authentication, the intended sequence is:

```sh
npm test
npm run review:package
git diff --cached --stat
git commit -m "Add SortTrip Meta hackathon contributions and reproducible setup"
gh repo create yusufridlo7/sorttrip-meta-hackathon-2026 --public --source . --remote origin
git push -u origin main
```

This is a reference publication sequence: actual publication used local Git commit, an empty remote created by the owner, then Git push; GitHub CLI was unavailable and was not installed. No force-push or original-repository change was performed. Public metadata verified creation on 3 November 2026, public visibility, MIT, main branch and 75 files with no forbidden runtime/media/environment paths. Fresh public clone packaging tests/source scan/dependency reconstruction passed. Replace the pending video URL only with the actual accessible YouTube link.

The local package's staged list must contain only source/docs/tests/integration metadata. It must exclude `.runtime`, `.git` from another repo, node_modules, environment files, logs, database dumps and personal video/audio. No deployment, database change, entitlement grant or paid inference is included in publication approval.
