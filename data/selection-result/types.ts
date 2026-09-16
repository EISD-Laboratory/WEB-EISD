export interface PassedParticipant {
  nim: string
  name: string
  // One or two courses => selected as Practicum Assistant for those courses.
  // Empty array => selected as a general Lab Assistant, not tied to a course.
  courses: string[]
}

export interface NotPassedParticipant {
  nim: string
  name: string
}
