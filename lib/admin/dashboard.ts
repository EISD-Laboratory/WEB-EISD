import { db } from './store'
import { getEventStatus } from './events'
import { isChampion } from './achievements'

// Shapes mirror GET /api/dashboard (admin only) — computed from the fixture
// store here, from Neon in Fase 1+.
export interface DashboardEvent {
  id: string
  slug: string
  title: string
  location: string
  startDate: string
  endDate: string
  publishedAt: string | null
  updatedAt: string
}

export interface DashboardArticle {
  id: string
  title: string
  url: string
  publishedAt: string | null
  updatedAt: string
}

export interface DashboardResponse {
  totalEvents: number
  publishedEvents: number
  draftEvents: number
  totalArticles: number
  publishedArticles: number
  draftArticles: number
  upcomingEvents: number
  upcomingEventsList: DashboardEvent[]
  latestEvents: DashboardEvent[]
  latestArticles: DashboardArticle[]
  totalAchievements: number
  finalistAchievements: number
  championAchievements: number
  achievementsByYear: Record<string, number>
}

export async function fetchDashboard(): Promise<DashboardResponse> {
  const events = db.events
  const articles = db.articles
  const achievements = db.achievements

  const publishedEvents = events.filter((e) => e.publishedAt !== null)
  const publishedArticles = articles.filter((a) => a.publishedAt !== null)
  const upcomingEventsList: DashboardEvent[] = events
    .filter((e) => getEventStatus(e) === 'Incoming')
    .sort((a, b) => (a.startDate < b.startDate ? -1 : 1))
    .map(({ id, slug, title, location, startDate, endDate, publishedAt, updatedAt }) => ({
      id,
      slug,
      title,
      location,
      startDate,
      endDate,
      publishedAt,
      updatedAt,
    }))
  const latestEvents: DashboardEvent[] = [...events]
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .slice(0, 5)
    .map(({ id, slug, title, location, startDate, endDate, publishedAt, updatedAt }) => ({
      id,
      slug,
      title,
      location,
      startDate,
      endDate,
      publishedAt,
      updatedAt,
    }))
  const latestArticles: DashboardArticle[] = [...articles]
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .slice(0, 5)
    .map(({ id, title, url, publishedAt, updatedAt }) => ({
      id,
      title,
      url,
      publishedAt,
      updatedAt,
    }))
  const achievementsByYear: Record<string, number> = {}
  for (const a of achievements) {
    const year = a.competitionYearMonth.slice(0, 4)
    achievementsByYear[year] = (achievementsByYear[year] ?? 0) + 1
  }

  return {
    totalEvents: events.length,
    publishedEvents: publishedEvents.length,
    draftEvents: events.length - publishedEvents.length,
    totalArticles: articles.length,
    publishedArticles: publishedArticles.length,
    draftArticles: articles.length - publishedArticles.length,
    upcomingEvents: upcomingEventsList.length,
    upcomingEventsList,
    latestEvents,
    latestArticles,
    totalAchievements: achievements.length,
    finalistAchievements: achievements.filter((a) => a.result === 'Finalist').length,
    championAchievements: achievements.filter(isChampion).length,
    achievementsByYear,
  }
}

export type EventStatus = 'Incoming' | 'On Going' | 'Finished'

export function eventStatus(
  e: Pick<DashboardEvent, 'startDate' | 'endDate'>,
  now = new Date(),
): EventStatus {
  const start = new Date(e.startDate).getTime()
  const end = new Date(e.endDate).getTime()
  const t = now.getTime()
  if (t < start) return 'Incoming'
  if (t > end) return 'Finished'
  return 'On Going'
}
