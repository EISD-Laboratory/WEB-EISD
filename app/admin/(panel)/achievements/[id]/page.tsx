import { AchievementForm } from '@/components/admin/AchievementForm'

// Session-gated fixture UI — opt out of instant-navigation prefetch validation.
export const instant = false

export default function AdminAchievementEditPage() {
  return <AchievementForm mode="edit" />
}
