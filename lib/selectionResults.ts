// Types only — this module MUST NOT import `@/data/selection-result`.
// The plaintext roster used to be bundled into client chunks via
// `findSelectionResult` (bulk NIM/name/courses leak). Lookup now lives in
// `lib/selectionCrypto.ts` (static-encrypted blob + WebCrypto decrypt).

export type SelectionResult =
  // `courses` has one or two entries — a participant may be selected as
  // lab assistant for up to two courses, but everyone joins the same
  // single WhatsApp group (returned as `wa` on passed results only).
  | { nim: string; name: string; passed: true; courses: string[]; wa: string }
  | { nim: string; name: string; passed: false }
