// Client-side lookup for the static-encrypted selection dataset.
//
// Public file `selection-data.json` (see scripts/build-selection-blobs.mjs)
// contains ONLY { sha256(nim) -> { salt, iv, data } }. Names, courses and the
// WhatsApp link exist solely as AES-GCM ciphertext, decryptable with the NIM.
//
// Normalization MUST match the build script exactly.
//
// NOTE: NIM-only lookup. The NIM space is sequential, so a determined
// attacker can brute-force records offline (one blob download + PBKDF2 per
// guess). This stops bulk `curl | grep` dumps, not targeted scraping.
export type SelectionResult =
  | { nim: string; name: string; passed: true; courses: string[]; wa: string }
  | { nim: string; name: string; passed: false }

export const SELECTION_GENERIC_ERROR =
  'No selection result found for this NIM. Please double-check your NIM and try again.'

export function normalizeNim(nim: string): string {
  return nim.trim().replace(/\D/g, '')
}

function hex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function fromB64(b64: string): Uint8Array<ArrayBuffer> {
  const bin = atob(b64)
  const out = new Uint8Array(new ArrayBuffer(bin.length))
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
  return out
}

export async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return hex(digest)
}

interface BlobEntry {
  salt: string
  iv: string
  data: string
}

interface BlobFile {
  version: number
  iterations: number
  records: Record<string, BlobEntry>
}

let cached: Promise<BlobFile> | null = null

function loadBlobs(): Promise<BlobFile> {
  if (!cached) {
    cached = fetch('/selection-data.json', { cache: 'force-cache' }).then((res) => {
      if (!res.ok) throw new Error('unavailable')
      return res.json() as Promise<BlobFile>
    })
  }
  return cached
}

async function decryptEntry(entry: BlobEntry, iterations: number, nimNorm: string): Promise<SelectionResult> {
  const baseKey = await crypto.subtle.importKey('raw', new TextEncoder().encode(nimNorm), 'PBKDF2', false, [
    'deriveKey',
  ])
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: fromB64(entry.salt), iterations, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt'],
  )
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromB64(entry.iv) }, key, fromB64(entry.data))
  const obj = JSON.parse(new TextDecoder().decode(plain))
  if (obj?.passed === true) {
    if (typeof obj.nim !== 'string' || typeof obj.name !== 'string' || !Array.isArray(obj.courses)) {
      throw new Error('bad payload')
    }
    return {
      nim: obj.nim,
      name: obj.name,
      passed: true,
      courses: obj.courses,
      wa: typeof obj.wa === 'string' ? obj.wa : '',
    }
  }
  if (obj?.passed === false && typeof obj.nim === 'string' && typeof obj.name === 'string') {
    return { nim: obj.nim, name: obj.name, passed: false }
  }
  throw new Error('bad payload')
}

/** Fetch the static blob, locate by hashed NIM, decrypt with the NIM. Throws generic error on any miss. */
export async function lookupSelectionResult(nimInput: string): Promise<SelectionResult> {
  const nimNorm = normalizeNim(nimInput)
  if (!nimNorm) throw new Error(SELECTION_GENERIC_ERROR)
  let blobs: BlobFile
  try {
    blobs = await loadBlobs()
  } catch {
    throw new Error(SELECTION_GENERIC_ERROR)
  }
  const id = await sha256Hex(nimNorm)
  const entry = blobs.records[id]
  if (!entry) throw new Error(SELECTION_GENERIC_ERROR)
  try {
    return await decryptEntry(entry, blobs.iterations, nimNorm)
  } catch {
    throw new Error(SELECTION_GENERIC_ERROR)
  }
}
