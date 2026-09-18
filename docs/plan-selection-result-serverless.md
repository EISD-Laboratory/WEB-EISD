# Plan: Serverless Selection Result (NIM-only + Expiry)

> Goal: replace the static-encrypted blob (`public/selection-data.json` + client decrypt)
> with a Vercel Function so the roster is never shipped to the browser.
>
> **Constraints: Hobby free plan, custom domain (`eisd.site`, not `vercel.app`), NIM-only
> input, hard expiry, roster stored in repo but `gitignore`d.**
>
> **Decision: `POST /api/selection { nim }`** — server checks expiry + rate-limit,
> then returns a single record. No bulk download possible.

## 1. Why the current build leaks

* `next.config.js:2` → `output: 'export'`: everything is static files, no `/api/*` possible.
* `data/selection-result/index.ts` is **tracked in git** (verified via `git ls-files`) — plaintext
  `PASSED_PARTICIPANTS[{nim,name,courses}]`, `NOT_PASSED_PARTICIPANTS`, `ALL_PASSED_WHATSAPP_LINK`.
* `scripts/build-selection-blobs.mjs` emits `public/selection-data.json` (`{sha256(nim) -> {salt,iv,data}}`,
  AES-GCM with NIM as PBKDF2 password, 100k iterations). File is `gitignore`d (`.gitignore:46`)
  but still publicly fetchable at runtime.
* `lib/selectionCrypto.ts:54` does `fetch('/selection-data.json', {cache:'force-cache'})` + WebCrypto
  decrypt in browser. `components/SelectionCheck.tsx:32` and
  `app/selection-result/SelectionResultView.tsx:78` call `lookupSelectionResult(nim)`.
* As noted in-code: NIM space is sequential → one blob download + PBKDF2 per guess dumps all
  records offline. No rate-limit is possible pure-static.

## 2. Proposed design (Route Handler + gitignored roster)

Keep Next.js App Router. Ship **single record per request**:

```text
authoring (local, private, gitignored):
  data/selection-result/roster.json   # real data, NEVER committed
  data/selection-result/roster.example.json  # template, committed
  SELECTION_ROSTER_B64 = base64(gzip(roster.json))  # set once via `vercel env add`

runtime (Vercel Function, Node.js):
  POST /api/selection { nim }
    1. Cache-Control: no-store, generic errors only
    2. if now > SELECTION_DEADLINE_ISO → 410 Gone (closed)
    3. rate-limit by IP (in-memory LRU, 5/min) → 429
    4. nimNorm = nim.trim(), digits only → Map lookup from roster
    5. 200 { nim, name, passed, courses?, wa? } OR generic 404 (same message/timing)

runtime (browser):
  SelectionCheck form (NIM-only)
    → fetch POST → on 200 store result JSON in sessionStorage
    → router.push('/selection-result') with NO query string
  SelectionResultView reads sessionStorage only, no second API call
```

Crypto/auth choices: no client crypto anymore. Roster plaintext lives only in
`process.env.SELECTION_ROSTER_B64` (prod) or gitignored file (dev).

Vercel notes: `app/api/selection/route.ts` with `export async function POST()` auto-deploys
as Function on Hobby + custom domain identically to `vercel.app`. No `maxDuration` tuning
needed (lookup <100ms, Hobby 10s limit is plenty). Org repo works the same once the
`Vercel for GitHub` App is installed by an Owner/Member — `Outside Collaborator` cannot import.

## 3. Tradeoffs (read before approving)

* **Fixes:** no bulk `curl | grep` on chunks or JSON — file no longer exists publicly.
  Rate-limit slows NIM enumeration. `wa` link only returned for passed NIMs.
  Roster removed from git history going forward.
* **Does NOT fix:** targeted enumeration (someone scripts sequential NIMs → gets one record
  per request). NIM-only is inherently guessable with no CAPTCHA per decision; rate-limit
  (5/min/IP) only slows, not stops, distributed guessing. No second factor per decision.
* **Hobby + gitignore tension:** gitignored file won't exist on Vercel Git deploy — hence the
  `SELECTION_ROSTER_B64` Env var bridge. Ops cost: re-run sync script + redeploy on every
  data change. Alternative (commit encrypted roster) rejected per constraint.
* **UX cost:** none vs before — NIM-only form, plus hard-closed state after deadline.
  Form hidden when expired (reuse `welcomePopupConfig.activeUntil` date or new `SELECTION_DEADLINE_ISO`).
* **Perf cost:** one extra RTT (~50-150ms). No PBKDF2 on mobile anymore.
* **Ops still required:** `git rm --cached data/selection-result/index.ts`, scrub history if repo
  is/was public, rotate WhatsApp invite (already leaked in old blob/chunks), purge CDN +
  delete old Vercel deployments, time-box removal after window.

## 4. Task checklist

### A. Untrack roster + Env bridge — DONE

- [x] `git rm --cached data/selection-result/index.ts`; add to `.gitignore`:
  `data/selection-result/index.ts`, `data/selection-result/roster.json` (`.env.local`
  already covered by `.env*`).
- [x] Create `data/selection-result/roster.json` (real, gitignored) migrated from `index.ts`:
  `{ deadline, wa, passed[{nim,name,courses}], failed[{nim,name}] }` — 55 passed + 14 failed.
- [x] Commit `data/selection-result/roster.example.json` (2 dummy records) + keep `types.ts` tracked.
- [x] Create `scripts/sync-roster-to-env.mjs`: gzip+base64 `roster.json` → prints
  `SELECTION_ROSTER_B64`; run once locally then `vercel env add SELECTION_ROSTER_B64 production`.
- [x] Verify: `git ls-files data/selection-result/` shows only `types.ts` (+ new example file);
  `git grep "chat.whatsapp.com/CcjFGCVoVXgBfG246BfkYp\|102022300015"` → no hit
  outside gitignored files.

### B. API route (server-only lookup) — DONE

- [x] Created `app/api/selection/route.ts` (`runtime='nodejs'`, `POST` only, `no-store`):
  parses `{nim}`, `normalizeNim` digits-only (byte-identical to old client),
  expiry check (`SELECTION_DEADLINE_ISO`, default `2026-09-21T23:59:59+07:00`) → `410`,
  in-memory IP LRU (5/min) → `429` (+ `Retry-After`),
  `Map` lookup → `200` single record or generic `404 SELECTION_GENERIC_ERROR`.
  Non-POST → `405` automatically. Note: throttle runs before body parse so malformed
  floods also burn quota (superset of plan order).
- [x] Load roster via new `lib/selectionRoster.ts` (`import 'server-only'`):
  `SELECTION_ROSTER_B64` (prod, gunzip+parse at cold start, cached in module scope)
  with dev fallback to gitignored `roster.json` only when env missing.
  Added `server-only` dependency. Env override wins for deadline.
- [x] No `@/data/selection-result` / `selectionRoster` import from client — only
  `lib/selectionRoster.ts` (comments) + `app/api/selection/route.ts` reference it.
- [x] Verified on `next dev`: empty body → `400`; unknown NIM → generic `404`;
  valid NIM → `200` single record (`{nim,name,passed,courses,wa}`, `no-store`);
  `GET` → `405`; 6th POST/min/IP → `429`; past `SELECTION_DEADLINE_ISO` → `410`;
  env-only mode (roster file removed) → `200`. `tsc --noEmit` 0, `eslint` clean.

### C. Rewire UI — TODO

- [ ] `components/SelectionCheck.tsx`: keep NIM-only input (`replace(/\D/g,'')`),
  `POST /api/selection` on submit; on `200` store **result JSON**
  (not just NIM) in `sessionStorage` (`SELECTION_NIM_STORAGE_KEY` + `SELECTION_RESULT_KEY`),
  `router.push('/selection-result')`; on `410` show closed state + hide form.
- [ ] `app/selection-result/SelectionResultView.tsx`: drop `lookupSelectionResult` import;
  read result from `sessionStorage` in `useEffect`, render loading / no-params / not-found /
  passed (link from `result.wa`) / failed. No second API call.
- [ ] Delete `lib/selectionCrypto.ts`, `scripts/build-selection-blobs.mjs`; remove `prebuild` /
  `build:selection-data` from `package.json`.
- [ ] Verify: `tsc --noEmit` exit 0, `eslint .` clean, `npm run build` succeeds with no
  `out/` static-export + no `selection-data.json`; client chunks contain no roster NIMs/names/WA.

### D. Config + publish + verify — TODO

- [ ] `next.config.js`: remove `output:'export'` (required for Functions).
- [ ] `vercel.json`: add `/api/(.*)` → `Cache-Control: no-store`. Keep CSP/HSTS/X-Frame rest.
- [ ] `.env.example`: add `SELECTION_ROSTER_B64=`, `SELECTION_DEADLINE_ISO=`;
  copy to `.env.local` + Vercel Env.
- [ ] Deploy (Hobby, org repo OK via Owner/Member-approved GitHub App): check Dashboard
  `Functions` tab shows `/api/selection`; test on custom domain; purge CDN + delete old
  deployments; rotate WA invite; scrub git history if public.
- [ ] Attacker replay: no `/selection-data.json`; chunks `grep <known name>` → empty;
  bulk POST throttled → `429`.
- [ ] Functional: valid NIM → result; wrong/unknown NIM → identical generic
  error; expired → `410` + hidden form; `npm run build && npm run lint` clean.

## 5. Open decisions

* Result handoff: `sessionStorage` result JSON (simplest, per-tab, matches existing
  `SELECTION_NIM_STORAGE_KEY` pattern) vs HttpOnly cookie set by route (safer vs XSS copy)?
  Default: `sessionStorage`.
* Deadline source: reuse `welcomePopupConfig.activeUntil` vs new `SELECTION_DEADLINE_ISO` Env?
  Default: Env (server-enforced), client mirrors it.
* Rate-limit store: in-memory LRU (Hobby-safe, resets on cold start) vs Upstash Redis
  (persistent, extra account)? Default: in-memory for announcement window.
