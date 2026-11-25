import { db } from './store'
import { eventStatus as dashboardEventStatus, type EventStatus } from './dashboard'
import type { MockEvent } from './mocks/events.fixtures'

export type AdminEvent = MockEvent
export type { EventStatus }

export function getEventStatus(
  e: Pick<AdminEvent, 'startDate' | 'endDate'>,
): EventStatus {
  return dashboardEventStatus(e)
}

/**
 * Pure flip of the publish state (no backend).
 * Publish stamps `publishedAt` with now; unpublish returns to Draft (null).
 */
export function togglePublishState(e: AdminEvent, now = new Date()): AdminEvent {
  const published = e.publishedAt !== null
  return {
    ...e,
    publishedAt: published ? null : now.toISOString(),
    updatedAt: now.toISOString(),
  }
}

/** Admin list — fixture store (DB-backed in Fase 3). */
export async function fetchAdminEvents(): Promise<AdminEvent[]> {
  return db.events
}

export function formatShort(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
