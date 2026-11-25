import { db, setStoreArticles } from './store'
import type { MockArticle } from './mocks/articles.fixtures'

export type AdminArticle = MockArticle

/** Admin list — fixture store (DB-backed in Fase 4). */
export async function fetchAdminArticles(): Promise<AdminArticle[]> {
  return db.articles
}

/** Deletes an article from the fixture store. */
export async function deleteArticle(id: string): Promise<void> {
  setStoreArticles(db.articles.filter((a) => a.id !== id))
}

/**
 * Pure flip of the publish state (no backend).
 * Publish stamps `publishedAt` with now; unpublish returns to Draft (null).
 */
export function togglePublishState(a: AdminArticle, now = new Date()): AdminArticle {
  const published = a.publishedAt !== null
  return {
    ...a,
    publishedAt: published ? null : now.toISOString(),
    updatedAt: now.toISOString(),
  }
}

/** Toggles publish state on the fixture store entry. */
export async function toggleArticlePublish(a: AdminArticle, now = new Date()): Promise<AdminArticle> {
  const next = togglePublishState(a, now)
  setStoreArticles(db.articles.map((x) => (x.id === a.id ? next : x)))
  return next
}

export function formatLong(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/** Returns an error message for an invalid URL, or null when the URL looks usable. */
export function validateArticleUrl(raw: string): string | null {
  const url = raw.trim()
  if (!url) return 'URL is required — paste the Medium article link.'
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return 'That does not look like a valid URL — include https:// at the start.'
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:')
    return 'URL must start with http:// or https://.'
  if (!parsed.hostname.includes('.'))
    return 'That URL has no valid domain — check for typos (e.g. https://medium.com/@user/article).'
  return null
}

export type ArticleSubmitErrorKind = 'invalid' | 'unreachable' | 'metadata' | 'server'

/** Classified failure — kept for the Fase 4 backend contract. */
export class ArticleSubmitError extends Error {
  kind: ArticleSubmitErrorKind
  constructor(kind: ArticleSubmitErrorKind, message: string) {
    super(message)
    this.name = 'ArticleSubmitError'
    this.kind = kind
  }
}

/**
 * Maps a backend 400 message to a stable kind (Fase 4 contract; unused while
 * fixture-only since no fetch happens).
 */
export function classifyArticleError(serverMessage: string): ArticleSubmitErrorKind {
  const m = serverMessage.toLowerCase()
  if (m.includes('must be a url') || m.includes('must be an url') || m.includes('invalid url'))
    return 'invalid'
  if (m.includes('unreachable') || m.includes('no content') || m.includes('timed out'))
    return 'unreachable'
  if (m.includes('metadata') || m.includes('open graph') || m.includes('og title'))
    return 'metadata'
  return 'server'
}

export function submitErrorCopy(kind: ArticleSubmitErrorKind): { title: string; hint: string } {
  switch (kind) {
    case 'invalid':
      return {
        title: 'Invalid URL',
        hint: 'Check the link for typos and make sure it starts with https://.',
      }
    case 'unreachable':
      return {
        title: 'URL is unreachable',
        hint: 'The page did not respond — check the link is public and try again in a moment.',
      }
    case 'metadata':
      return {
        title: 'Could not fetch article metadata',
        hint: 'The page loaded but has no readable title — it may block scrapers or require login.',
      }
    case 'server':
      return {
        title: 'Could not save the article',
        hint: 'Something went wrong on the server — try again, and report it if it persists.',
      }
  }
}

/**
 * Creates an article from a URL only (fixture-only: synthesizes a Draft entry
 * locally; the backend OG fetch lands in Fase 4).
 */
export async function createArticle(rawUrl: string): Promise<AdminArticle> {
  const url = rawUrl.trim()
  const now = new Date().toISOString()
  const entry: AdminArticle = {
    id: `art-mock-${Date.now()}`,
    url,
    title: 'Untitled — metadata fetches on the backend',
    description: 'The backend will fill in title, description, and cover image from the URL.',
    coverImage: '',
    publishedDate: now,
    publishedAt: null,
    updatedAt: now,
  }
  setStoreArticles([entry, ...db.articles])
  return entry
}
