import { NotPassedParticipant, PassedParticipant } from './types'

// Lab assistant recruitment selection results for CAAS EISD Ganjil 2026/2027,
// sourced from REKAPITULASI SELEKSI CAAS EISD GANJIL 2026_2027.xlsx (STATUS ASPRAK
// sheet). A participant may pass as Practicum Assistant for one or two courses
// (`courses` is length 1 or 2), or as a general Lab Assistant not tied to any
// course (`courses: []`). There is a single WhatsApp group shared by every
// passed participant regardless of role/courses - see ALL_PASSED_WHATSAPP_LINK
// below.
export const PASSED_PARTICIPANTS: PassedParticipant[] = [
  {
    nim: '102022300015',
    name: 'Farras Ikhsanul Rafi',
    courses: ['PPL'],
  },
  {
    nim: '102022300027',
    name: 'Viki Firmansyah',
    courses: ['PPL'],
  },
  {
    nim: '102022300038',
    name: 'Clarissa Tompunu',
    courses: ['APSI'],
  },
  {
    nim: '102022300078',
    name: 'Reza Dwi Saputro',
    courses: ['WAD', 'PPL'],
  },
  {
    nim: '102022300106',
    name: 'Kirei Najwa Shafira',
    courses: ['PPL'],
  },
  {
    nim: '102022300118',
    name: 'Deazard Muhammad Arrayyan',
    courses: ['PPL'],
  },
  {
    nim: '102022300126',
    name: 'Fiyola Nur Alamanda',
    courses: ['APSI', 'PPL'],
  },
  {
    nim: '102022300133',
    name: 'Muhammad Luthfi Tukhfattur Romadhoni',
    courses: ['PPL'],
  },
  {
    nim: '102022300147',
    name: 'Fairuzia Meyla Fatinah',
    courses: ['APSI'],
  },
  {
    nim: '102022300176',
    name: 'Muhammad Mufid Taqiyuddin',
    courses: ['PPL'],
  },
  {
    nim: '102022300186',
    name: 'Raffi Akbar Firdaus',
    courses: ['WAD', 'PPL'],
  },
  {
    nim: '102022300193',
    name: 'Muhammad Alvin Zufar Saputra',
    courses: ['PPL'],
  },
  {
    nim: '102022300235',
    name: 'Farid',
    courses: ['WAD', 'PPL'],
  },
  {
    nim: '102022300272',
    name: 'Elsa Ainun Yusniar',
    courses: ['APSI'],
  },
  {
    nim: '102022300276',
    name: 'Albiyan Dikha Chandra',
    courses: ['PPL'],
  },
  {
    nim: '102022300290',
    name: 'Renasya Cahya Handayani',
    courses: ['PPL'],
  },
  {
    nim: '102022300380',
    name: 'Muhammad Zaky Ryan Ardhiansyah',
    courses: ['PPL'],
  },
  {
    nim: '102022300416',
    name: 'Jehezkiel Agna Saputra',
    courses: ['PPL'],
  },
  {
    nim: '102022300437',
    name: 'Zhafran Ahmad Zaidan',
    courses: ['PPL'],
  },
  {
    nim: '102022330315',
    name: 'Topas Akbar',
    courses: ['WAD', 'PPL'],
  },
  {
    nim: '102022330336',
    name: 'Hilmi Zikri',
    courses: ['PPL'],
  },
  {
    nim: '102022340031',
    name: 'Muhammad Iqbal Abhipraya',
    courses: ['PPL'],
  },
  {
    nim: '102022340119',
    name: 'Maurithania Joleesha Maria Tjakra',
    courses: ['PPL'],
  },
  {
    nim: '102022340397',
    name: 'Rasya Akbar Lazuardi',
    courses: ['WAD', 'PPL'],
  },
  {
    nim: '102022340400',
    name: 'Refaya Azzam Maheswara',
    courses: ['WAD'],
  },
  {
    nim: '102022400004',
    name: 'Ahmad Rizky Ivanzya',
    courses: ['WAD'],
  },
  {
    nim: '102022400029',
    name: 'Faris Yahya Ayyash Alfatih',
    courses: ['APSI'],
  },
  {
    nim: '102022400038',
    name: 'Rizky Ananda Herly',
    courses: ['WAD'],
  },
  {
    nim: '102022400050',
    name: 'Aisya Devina',
    courses: ['WAD'],
  },
  {
    nim: '102022400053',
    name: 'Ali Rahman Bayanaka',
    courses: ['APSI', 'WAD'],
  },
  {
    nim: '102022400066',
    name: 'Didit Aditya Rahman',
    courses: ['APSI'],
  },
  {
    nim: '102022400103',
    name: 'Suci Oktaviani',
    courses: ['APSI'],
  },
  {
    nim: '102022400105',
    name: 'Inaya Keisha Sukmawardy',
    courses: ['WAD'],
  },
  {
    nim: '102022400126',
    name: 'Hadid Hamar',
    courses: ['APSI'],
  },
  {
    nim: '102022400133',
    name: 'Djaudza Djiyya Muhammad',
    courses: ['APSI'],
  },
  {
    nim: '102022400141',
    name: 'Rifqi Lazuardi Apriansyah',
    courses: ['APSI', 'WAD'],
  },
  {
    nim: '102022400171',
    name: 'Devi Fitria Rahmawati',
    courses: ['WAD'],
  },
  {
    nim: '102022400172',
    name: 'Dhiny Setya Nurkhafidin',
    courses: ['WAD'],
  },
  {
    nim: '102022400184',
    name: 'Nazila Syifa Amelia',
    courses: ['APSI'],
  },
  {
    nim: '102022400194',
    name: 'Karina Nurbani Fadhilah',
    courses: ['APSI', 'WAD'],
  },
  {
    nim: '102022400205',
    name: 'Fasya Arinal Hudha',
    courses: ['APSI', 'WAD'],
  },
  {
    nim: '102022400216',
    name: 'Ayya Fitriana Nafik',
    courses: ['APSI'],
  },
  {
    nim: '102022400244',
    name: 'Muhammad Nizam Abiyyu Wardhana',
    courses: ['WAD'],
  },
  {
    nim: '102022400258',
    name: 'Rafania Chindy Lamria Siahaan',
    courses: ['APSI'],
  },
  {
    nim: '102022400263',
    name: 'Nugraha Ade Mulyana',
    courses: ['APSI'],
  },
  {
    nim: '102022400278',
    name: 'Muhammad Zuhdi Robbani',
    courses: ['APSI'],
  },
  {
    nim: '102022430003',
    name: 'Rizky Saputra Al Amir',
    courses: ['APSI', 'WAD'],
  },
  {
    nim: '102022430014',
    name: 'Nabil FIkry Khaidar',
    courses: ['WAD'],
  },
  {
    nim: '102022430020',
    name: 'Faiza Cahya Pradani',
    courses: ['WAD'],
  },
  {
    nim: '102022430029',
    name: 'Widia Mesra Nainggolan Mahulae',
    courses: ['APSI'],
  },
  {
    nim: '102022430037',
    name: 'M. Faizul Kamal',
    courses: ['APSI'],
  },
  {
    nim: '102022430049',
    name: 'Muhammad Fadly Abdira Ramadhan',
    courses: ['WAD'],
  },
  {
    nim: '102022430050',
    name: 'Rosita Jian Syahiirah',
    courses: ['APSI'],
  },
  {
    nim: '102022430060',
    name: 'Alif Muslim Abdurrahman',
    courses: ['WAD'],
  },
  {
    nim: '103012300333',
    name: 'Dinar Muhammad Akbar',
    courses: ['PPL'],
  },
  {
    nim: '102022300333',
    name: 'Fadia Rizqa Yunanto',
    courses: [],
  },
]

export const NOT_PASSED_PARTICIPANTS: NotPassedParticipant[] = [
  { nim: '102022300302', name: 'Muhammad Fatih' },
  { nim: '102022300370', name: 'Dhydo Aryo Jayanata' },
  { nim: '102022330335', name: 'Nawfaldo Fazli Ariyanto' },
  { nim: '102022400102', name: 'Rayula Samina' },
  { nim: '102022400120', name: 'RENALDI' },
  { nim: '102022400243', name: "Ahmad 'Afif Afsaruddin Al 'Arofie" },
  { nim: '102022400268', name: 'MOCHAMAD LUTFIE ALFIANSYAH' },
  { nim: '102022400293', name: 'Ridho Muhammad Zahran' },
  { nim: '102022400304', name: 'Muhammad Reyhan Armadani' },
  { nim: '102022400336', name: 'Queen Naomi Liklikwatil' },
  { nim: '102022400341', name: 'Lunaria' },
  { nim: '102022440002', name: 'Muhammad Akmal Hidayat DW' },
  { nim: '102022500176', name: 'Raihan Indra Pratama' },
  { nim: '607012400008', name: 'Siti Amany Fakhirah Riby' },
]

// Every passed participant is directed to this single group, no matter how
// many courses they were assigned as lab assistant for.
export const ALL_PASSED_WHATSAPP_LINK = 'https://chat.whatsapp.com/GerKWUosxlY5ctS6qENBBp?s=hd&p=i&mlu=0&ilr=4'

export type { NotPassedParticipant, PassedParticipant } from './types'
