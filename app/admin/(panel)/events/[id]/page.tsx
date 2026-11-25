import { EventForm } from '@/components/admin/EventForm'

// Session-gated fixture UI — opt out of instant-navigation prefetch validation.
export const instant = false

export default function AdminEventEditPage() {
  return <EventForm mode="edit" />
}
