import { NotPassedParticipant, PassedParticipant } from './types'

// Placeholder data for the lab assistant recruitment selection results.
// Every NIM/name/course below is a stand-in to be replaced once real
// recruitment results exist. A participant may pass for one or two courses
// (`courses` is length 1 or 2). There is a single WhatsApp group shared by
// every passed participant regardless of which/how many courses they were
// assigned — see ALL_PASSED_WHATSAPP_LINK below.
export const PASSED_PARTICIPANTS: PassedParticipant[] = [
  {
    nim: '102022300333',
    name: 'Fadia Rizqa Yunanto',
    courses: ['WAD'],
  },
  {
    nim: '1301223457',
    name: 'Siti Nurhaliza Putri',
    courses: ['Pemrograman Web'],
  },
  {
    nim: '1301223458',
    name: 'Muhammad Rizky Pratama',
    courses: ['Struktur Data', 'Basis Data'],
  },
  {
    nim: '1301223459',
    name: 'Nadia Salsabila',
    courses: ['Sistem Basis Data'],
  },
  {
    nim: '1301223463',
    name: 'Fajar Hidayat',
    courses: ['Pemrograman Web', 'Sistem Basis Data'],
  },
]

export const NOT_PASSED_PARTICIPANTS: NotPassedParticipant[] = [
  { nim: '1301223460', name: 'Budi Santoso' },
  { nim: '1301223461', name: 'Dewi Anggraini' },
  { nim: '1301223462', name: 'Reza Firmansyah' },
]

// Every passed participant is directed to this single group, no matter how
// many courses they were assigned as lab assistant for.
export const ALL_PASSED_WHATSAPP_LINK = 'https://chat.whatsapp.com/GerKWUosxlY5ctS6qENBBp?s=hd&p=i&mlu=0&ilr=4'

export type { NotPassedParticipant, PassedParticipant } from './types'
