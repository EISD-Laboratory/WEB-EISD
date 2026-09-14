export interface PassedParticipant {
  nim: string
  name: string
  // A participant can be selected as lab assistant for one or two courses.
  courses: string[]
}

export interface NotPassedParticipant {
  nim: string
  name: string
}
