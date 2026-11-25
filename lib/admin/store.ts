import type { MockEvent } from './mocks/events.fixtures'
import type { MockArticle } from './mocks/articles.fixtures'
import type { Achievement } from './achievements'
import { MOCK_EVENTS } from './mocks/events.fixtures'
import { MOCK_ARTICLES } from './mocks/articles.fixtures'
import { MOCK_ACHIEVEMENTS } from './mocks/achievements.fixtures'

// Fixture-only port (Fase 1–5 pending): a shared in-memory store so
// mutations on one admin page are visible on the others (e.g. deleting an
// achievement decreases the dashboard totals). No backend, no persistence —
// state resets on reload/navigation away. Replaced by Prisma services later.
export const db: {
  events: MockEvent[]
  articles: MockArticle[]
  achievements: Achievement[]
} = {
  events: [...MOCK_EVENTS],
  articles: [...MOCK_ARTICLES],
  achievements: [...MOCK_ACHIEVEMENTS],
}
