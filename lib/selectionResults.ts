import {
  ALL_PASSED_WHATSAPP_LINK,
  NOT_PASSED_PARTICIPANTS,
  PASSED_PARTICIPANTS,
} from '@/data/selection-result'

export const allPassedWhatsappLink = ALL_PASSED_WHATSAPP_LINK

export type SelectionResult =
  // `courses` has one or two entries — a participant may be selected as
  // lab assistant for up to two courses, but everyone joins the same
  // single WhatsApp group (allPassedWhatsappLink).
  | { nim: string; name: string; passed: true; courses: string[] }
  | { nim: string; name: string; passed: false }

export function findSelectionResult(nim: string): SelectionResult | undefined {
  const passed = PASSED_PARTICIPANTS.find((p) => p.nim === nim)
  if (passed) {
    return { nim: passed.nim, name: passed.name, passed: true, courses: passed.courses }
  }

  const failed = NOT_PASSED_PARTICIPANTS.find((p) => p.nim === nim)
  if (failed) {
    return { nim: failed.nim, name: failed.name, passed: false }
  }

  return undefined
}
