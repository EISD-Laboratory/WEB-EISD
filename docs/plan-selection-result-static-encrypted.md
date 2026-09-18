# Plan: Static-Encrypted Selection Result (keep `output: 'export'`)

> Goal: kill the one-shot bulk dump (`curl .../_next/static/chunks/*.js | grep nim/name`) while staying
> fully static (no server, no `/api/*`). Accept honestly: targeted guessing cannot be eliminated,
> only made expensive.

## 1. Why the current build leaks

* `next.config.js:2` → `output: 'export'`: everything is static files.
* `data/selection-result/index.ts:9,287` holds all `PASSED_PARTICIPANTS[{nim,name,courses}]`,
  `NOT_PASSED_PARTICIPANTS`, and `ALL_PASSED_WHATSAPP_LINK:306` in plaintext.
* `lib/selectionResults.ts:1-5` imports them; `components/SelectionCheck.tsx:8,25` and
  `app/selection-result/SelectionResultView.tsx:9,65` are `'use client'` → the whole roster is
  bundled into the client chunk. `sessionStorage` only hides one NIM from the URL, not from the bundle.

## 2. Proposed design (hashed index + per-record AES-GCM)

Keep static hosting. Ship **ciphertext only**:

```text
build time (Node, private):
  source = data/selection-result/index.ts   # never imported by client afterwards
  for each participant:
    nimNorm  = nim.trim(), digits only
    nameNorm = name.trim().toLowerCase(), inner whitespace → single space
    password = nimNorm + "|" + nameNorm      # UTF-8, MUST match client exactly
    salt = random(16B), iv = random(12B)
    key  = PBKDF2-SHA256(password, salt, 100_000 iter, 256-bit)
    plain = { v:1, nim, name, passed, courses?, wa? }  # wa ONLY inside passed records
    cipher = AES-GCM(key, iv, plain)
    id = SHA256-hex(nimNorm)
  write public/selection-data.json = { version:1, iterations, records: { [id]: {salt, iv, data} } }

runtime (browser, WebCrypto):
  user enters NIM + Full Name → normalize identically
  → fetch /selection-data.json → id = sha256(nimNorm) → find entry
  → PBKDF2 derive → AES-GCM decrypt → render
  → missing id AND decrypt-failure show the SAME generic error (no oracle)
```

Crypto choices: PBKDF2-SHA256/100k (~200–500ms on mobile, slows offline brute force) + AES-GCM-256.
Index is a hash so plaintext NIMs are absent from both chunks and JSON. The WhatsApp link moves
inside passed payloads; no `allPassedWhatsappLink` client export remains.

## 3. Tradeoffs (read before approving)

* **Fixes:** bulk `grep` on chunks and on `selection-data.json` returns only hashes/base64. NIM-only
  brute force fails (name is part of the key). No server, no cost, `output: 'export'` stays.
* **Does NOT fix:** targeted guessing by anyone knowing an exact `NIM + Name` pair (classmates,
  leaked roster) — unlimited offline tries, no rate-limit is possible pure-static. Hash-index
  existence itself reveals "NIM is in the set" (passed-or-failed, not which). This is inherent:
  any secret shipped in JS is public.
* **UX cost:** form must ask **Full Name** in addition to NIM, exact-match required → needs
  normalization + help text ("sesuai data pendaftaran, capitalization ignored"). Typos/diaveraged
  names cause support load. One known-hard record exists today:
  `102022400243 / "Ahmad 'Afif Afsaruddin Al 'Arofie"` (double-quoted in source) — parser and
  normalization must cover both quote styles.
* **Perf cost:** ~100k PBKDF2 per lookup; cache `selection-data.json` (`force-cache`).
* **Ops still required:** redeploy + CDN/old-deployment purge, rotate WhatsApp invite (already leaked),
  scrub git history if repo is public, re-run generator on every data change, time-box removal after
  announcement window.

## 4. Task checklist

### A. Generator (build-time, Node only) — DONE

- [x] Create `scripts/build-selection-blobs.mjs`: parse `data/selection-result/index.ts` (handle
  `name: '...'` AND `name: "..."`), extract WA link, PBKDF2+AES-GCM per record, write
  `public/selection-data.json` (`{version, iterations, records}`). Verified: 55 passed + 14 failed = 69 records.
- [x] Add npm scripts: `build:selection-data` + `prebuild` hook so `next build` never ships stale blobs.
- [x] Verify output contains no plaintext: `grep -c "Farras Ikhsanul\|102022300015\|chat.whatsapp" public/selection-data.json` → `0`.
  Round-trip verified: correct NIM+Name decrypts (incl. case/space-insensitive and the apostrophe
  record `102022400243`); wrong name rejected via GCM auth tag.

### B. Client lookup lib (no plaintext imports) — DONE

- [x] Create `lib/selectionCrypto.ts` (WebCrypto): `normalizeNim/normalizeName` (byte-identical to
  generator), `sha256Hex`, `lookupSelectionResult(nim, name)` with cached fetch + generic error
  `SELECTION_GENERIC_ERROR` for all failure modes. `tsc --noEmit` clean for this file.
- [x] Rewrite `lib/selectionResults.ts` to types-only (delete `PASSED/NOT_PASSED` imports and
  `findSelectionResult`); enforce "no client imports `@/data/selection-result`" — verified by grep:
  only the Node build script (reads source as text, never bundled) and comments reference it.
  Note: `SelectionCheck.tsx` / `SelectionResultView.tsx` still import the removed exports —
  rewired in Task C.

### C. Rewire UI

- [ ] `lib/selectionSession.ts`: add name storage key alongside `SELECTION_NIM_STORAGE_KEY`.
- [ ] `components/SelectionCheck.tsx`: add Full Name field, loading state, async lookup; store
  NIM+Name in sessionStorage only on success; generic error otherwise.
- [ ] `app/selection-result/SelectionResultView.tsx`: drop dataset/WA imports; re-fetch + decrypt
  from sessionStorage credentials; render loading / no-params / not-found / passed (link from
  decrypted `wa`) / failed.

### D. Publish + verify

- [ ] Run generator, commit `public/selection-data.json`, deploy, purge CDN + delete old deployments.
- [ ] Attacker replay: chunks `grep nim/name` → empty; JSON `grep <known name>` → empty.
- [ ] Functional: correct NIM+Name decrypts; wrong name / unknown NIM → identical generic error.
- [ ] `npm run build && npm run lint` clean.

## 5. Open decisions

* PBKDF2 iterations: 100k (default) vs lower (faster mobile) vs higher (slower brute force)?
* Fail-list: keep decryptable "not selected" records, or collapse misses+failures into one message?
* Keep `sessionStorage` credential passing, or decrypt once and cache result in memory only?
