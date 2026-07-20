# THE ANTHROPIC EXPERIENCE — Review Application

This package is the strict-TypeScript product foundation for the public-safe,
evidence-backed review experience. It separates frontstage interpretation from a
typed content boundary and keeps requested, substituted, and verified states
distinct.

## Start here

From this directory, run:

   ```bash
   npm install
   npm run dev
   ```

## Verification

```bash
npm test
npm run typecheck
npm run lint
npm run privacy
npm run build
npm run test:e2e
```

The production build automatically scans built text assets for prohibited
private identifiers, local paths, raw transcript payloads, and base64 blobs.

The canonical build uses `BrowserRouter`. `vercel.json` rewrites application
routes to `index.html` while leaving assets, local evidence, supplied imagery,
and captured references directly addressable. Equivalent static hosts must
provide the same fallback. The self-contained Artifact build uses relative
assets and does not require a host rewrite.

## Current slice

- Opening hero and public premise
- Typed release-fact status rail
- Phase Zero and GitHub-access review scenes
- URL-addressable Roast, Receipts, and Transcript modes
- URL-restored, keyboard-trapped evidence drawer
- Accessible output pile with semantic-list equivalence
- Local responsive hero derivative with a provenance manifest

The review page is intentionally marked `noindex, nofollow`.
