export const divisions = [
  {
    id: 1,
    title: "Core Division",
    description: "Managing core operations and administrative functions of the laboratory.",
    image: "/images/division/Core.webp",
  },
  {
    id: 2,
    title: "Enabler Division",
    description: "Managing human resources, internal development, and member coordination to support all laboratory divisions.",
    image: "/images/division/Enabler.webp",
  },
  {
    id: 3,
    title: "Competition Division",
    description: "Preparing and competing in national and international tech competitions.",
    image: "/images/division/Competition.webp",
  },
  {
    id: 4,
    title: "Research & Community Division",
    description: "Conducting research projects and community outreach programs.",
    image: "/images/division/RNC.webp",
  },
  {
    id: 5,
    title: "Event Division",
    description: "Organizing tech events, webinar, and seminar for students.",
    image: "/images/division/Event.webp",
  },
  {
    id: 6,
    title: "Study Group Division",
    description: "Facilitating peer learning and knowledge sharing sessions.",
    image: "/images/division/StudyGroup.webp",
  },
  {
    id: 7,
    title: "Content Division",
    description: "Creating engaging content for social media and documentation.",
    image: "/images/division/Content.webp",
  },
]

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Structure", href: "/structure" },
  { label: "Achievements", href: "/achievements" },
  { label: "Articles", href: "/articles" },
  { label: 'Study Group', href: 'https://web-sg.vercel.app/' }
]

export const announcementConfig = {
  message: 'Join us and level up your skills!',
  highlightText: '✦ Study Group EISD',
  ctaLabel: 'Join Now →',
  ctaHref: 'https://web-sg.vercel.app/',
  storageKey: 'eisd-announcement-dismissed',
};

// Toggle `enabled` off to disable the popup site-wide. Bump `storageKey` (e.g. add
// `-v2`) when swapping image/link for a new promo, so it reappears for people who
// already dismissed the old one.
export const welcomePopupConfig = {
  enabled: true,
  image: '/images/welcome-popup.webp',
  imageAlt: 'EISD Laboratory welcome banner',
  ctaLabel: 'Learn More',
  ctaHref: 'https://linktr.ee/eisdcompetition',
  storageKey: 'eisd-welcome-popup-dismissed',
  activeUntil: '2026-08-30',
};
