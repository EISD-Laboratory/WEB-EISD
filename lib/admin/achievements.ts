import { db, setStoreAchievements } from './store'

export type AchievementCategory =
  | 'Essay'
  | 'UI/UX Competition'
  | 'Software Engineering'
  | 'Hackathon'
  | 'Other'

export type AchievementLevel = 'International' | 'National'

export type AchievementResult = '1st Place' | '2nd Place' | '3rd Place' | 'Finalist'

/** One member and their own unique 4-letter assistant code. */
export interface AchievementMember {
  name: string
  assistantCode: string
}

export interface Achievement {
  id: string
  members: AchievementMember[]
  category: string
  customCategory: string | null
  level: string
  result: string
  competitionName: string
  competitionYearMonth: string
  createdAt: string
  updatedAt: string
}

/** Effective category shown in the UI — custom text when `Other`. */
export function effectiveCategory(a: Pick<Achievement, 'category' | 'customCategory'>): string {
  return a.category === 'Other' && a.customCategory ? a.customCategory : a.category
}

export function memberNames(a: Pick<Achievement, 'members'>): string[] {
  return a.members.map((m) => m.name)
}

/** Podium finish (a competition won). Finalist is tracked separately. */
export function isChampion(a: Pick<Achievement, 'result'>): boolean {
  return a.result === '1st Place' || a.result === '2nd Place' || a.result === '3rd Place'
}

export interface AchievementFilters {
  category?: AchievementCategory
  level?: AchievementLevel
  result?: AchievementResult
  /** Exact month match, `YYYY-MM`. */
  yearMonth?: string
  /** Year prefix match, `YYYY` (matches any month of that year). */
  year?: string
  /** Matches competition name, member name, or assistant code. */
  search?: string
}

export interface CreateAchievementInput {
  members: AchievementMember[]
  category: AchievementCategory
  customCategory?: string
  level: AchievementLevel
  result: AchievementResult
  competitionName: string
  competitionYearMonth: string
}

export type UpdateAchievementInput = Partial<CreateAchievementInput>

function matchesFilters(a: Achievement, filters: AchievementFilters): boolean {
  if (filters.category && a.category !== filters.category) return false
  if (filters.level && a.level !== filters.level) return false
  if (filters.result && a.result !== filters.result) return false
  if (filters.yearMonth && a.competitionYearMonth !== filters.yearMonth) return false
  if (filters.year && !a.competitionYearMonth.startsWith(filters.year)) return false
  if (filters.search?.trim()) {
    const q = filters.search.trim().toLowerCase()
    const hay = [
      a.competitionName,
      a.category,
      a.customCategory ?? '',
      ...a.members.flatMap((m) => [m.name, m.assistantCode]),
    ]
      .join(' ')
      .toLowerCase()
    if (!hay.includes(q)) return false
  }
  return true
}

function byNewest(a: Achievement, b: Achievement): number {
  if (a.competitionYearMonth !== b.competitionYearMonth)
    return a.competitionYearMonth < b.competitionYearMonth ? 1 : -1
  return a.updatedAt < b.updatedAt ? 1 : -1
}

/** List achievements, newest year-month first — fixture store (DB-backed in Fase 5). */
export async function fetchAchievements(
  filters: AchievementFilters = {},
): Promise<Achievement[]> {
  return db.achievements.filter((a) => matchesFilters(a, filters)).sort(byNewest)
}

export async function fetchAchievement(id: string): Promise<Achievement> {
  const found = db.achievements.find((a) => a.id === id)
  if (!found) throw new Error(`Achievement not found: ${id}`)
  return found
}

export async function createAchievement(input: CreateAchievementInput): Promise<Achievement> {
  const now = new Date().toISOString()
  const entry: Achievement = {
    id: `ach-mock-${Date.now()}`,
    members: input.members,
    category: input.category,
    customCategory: input.customCategory ?? null,
    level: input.level,
    result: input.result,
    competitionName: input.competitionName,
    competitionYearMonth: input.competitionYearMonth,
    createdAt: now,
    updatedAt: now,
  }
  setStoreAchievements([entry, ...db.achievements])
  return entry
}

export async function updateAchievement(
  id: string,
  input: UpdateAchievementInput,
): Promise<Achievement> {
  const current = await fetchAchievement(id)
  const next: Achievement = {
    ...current,
    ...input,
    members: input.members ?? current.members,
    customCategory:
      input.customCategory !== undefined ? (input.customCategory ?? null) : current.customCategory,
    updatedAt: new Date().toISOString(),
  }
  setStoreAchievements(db.achievements.map((a) => (a.id === id ? next : a)))
  return next
}

export async function deleteAchievement(id: string): Promise<void> {
  setStoreAchievements(db.achievements.filter((a) => a.id !== id))
}
