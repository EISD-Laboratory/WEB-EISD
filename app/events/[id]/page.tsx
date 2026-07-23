import { notFound } from 'next/navigation'
import NextImage from 'next/image'
import ImageWithFallback from '@/components/ImageWithFallback'
import Link from 'next/link'

const Image = (props: any) => {
    if (typeof props.src === 'string' && props.src.endsWith('.avif')) {
        return <ImageWithFallback {...props} />
    }
    return <NextImage {...props} />
}
import FadeIn from '@/components/FadeIn'
import styles from './EventDetail.module.css'

type EventStatus = 'upcoming' | 'completed'

type Event = {
    id: number
    title: string
    category: string
    date: string
    location: string
    description: string
    image: string
    heroBanner?: string
    heroPosition?: 'top' | 'center'
    status: EventStatus
    gradient: string
    gallery: string[]
}

const events: Event[] = [
    {
        id: 1,
        title: 'Webinar No-Code vs Pro-Code',
        category: 'Webinar',
        date: 'April 2026',
        location: 'Online',
        description: [
            'A webinar discussing the comparison between No-Code and Pro-Code approaches in developing and integrating enterprise systems in the age of digital transformation. This event serves as a space for students to understand how modern companies choose the right technology to build systems that are fast, scalable, and still easy to develop.',
            'Participants get to know the characteristics, strengths, and challenges of both approaches — from how No-Code platforms can speed up development and business automation, to how Pro-Code offers greater flexibility, control, and customization for large-scale system needs. Because apparently the tech world is never satisfied with a simple choice. There always have to be two camps convinced they\'re the right one.',
            'The material is delivered by speakers with hands-on experience in system development and the tech industry, so participants can gain practical insight into real-world No-Code and Pro-Code implementation. Through this webinar, EISD Laboratory hopes participants can understand current tech trends and determine the most relevant approach for future business needs and system development.',
        ].join('\n\n'),
        image: '/images/events/webinar/Webinar No-Code vs Pro-Code/webinar_nocode_sampul.webp',
        heroBanner: '/images/events/webinar/Webinar No-Code vs Pro-Code/webinar_nocode_sampul.webp',
        heroPosition: 'top',
        status: 'completed' as const,
        gradient: 'from-emerald-500 to-teal-500',
        gallery: [
            '/images/events/webinar/Webinar No-Code vs Pro-Code/webinar_nocode_1.webp',
            '/images/events/webinar/Webinar No-Code vs Pro-Code/webinar_nocode_2.webp',
            '/images/events/webinar/Webinar No-Code vs Pro-Code/webinar_nocode_3.webp',
            '/images/events/webinar/Webinar No-Code vs Pro-Code/webinar_nocode_4.webp',
        ],
    },
    {
        id: 2,
        title: 'Public Lecture on Information Systems Project Management',
        category: 'Seminar',
        date: 'May 2026',
        location: 'Auditorium Gedung Damar Telkom University',
        description: [
            'A public lecture discussing the importance of effective communication between IT teams and business stakeholders in developing and managing information systems projects. This event helps students understand how differing perspectives between the technical and business sides are often a major challenge in a digital project.',
            'Participants learn how to translate business needs into the right technology solutions, while also understanding how IT teams can convey technical aspects in a way non-technical stakeholders can easily grasp. The material also covers the importance of collaboration, expectation management, and communication strategies that keep a project running effectively, on time, and aligned with business goals. Because in the real world of work, the biggest errors often don\'t come from the system, but from miscommunication between people who think they already understand each other.',
            'Through this session, participants are expected to gain a real picture of communication\'s role in the success of an information systems project, as well as understand the skills needed to become an effective bridge between business needs and technology implementation in the industry.',
        ].join('\n\n'),
        image: '/images/events/seminar/Kuliah Umum MANPROSI/kulum_manprosi_sampul.webp',
        heroBanner: '/images/events/seminar/Kuliah Umum MANPROSI/kulum_manprosi_sampul.webp',
        heroPosition: 'top',
        status: 'completed' as const,
        gradient: 'from-blue-500 to-indigo-500',
        gallery: [
            '/images/events/seminar/Kuliah Umum MANPROSI/kulum_manprosi (1).webp',
            '/images/events/seminar/Kuliah Umum MANPROSI/kulum_manprosi (2).webp',
            '/images/events/seminar/Kuliah Umum MANPROSI/kulum_manprosi (3).webp',
            '/images/events/seminar/Kuliah Umum MANPROSI/kulum_manprosi (4).webp',
            '/images/events/seminar/Kuliah Umum MANPROSI/kulum_manprosi (5).webp',
            '/images/events/seminar/Kuliah Umum MANPROSI/kulum_manprosi (6).webp',
            '/images/events/seminar/Kuliah Umum MANPROSI/kulum_manprosi (7).webp',
        ],
    },
    {
        id: 3,
        title: 'Company Visit AWS',
        category: 'Seminar',
        date: 'May 2026',
        location: 'AWS Indonesia, Jakarta',
        description: [
            'A company visit to experience the working world firsthand, understand industry culture, and see real-world technology implementation. This event gives EISD Laboratory members an exclusive opportunity to set foot inside the AWS Indonesia office, one of the largest and most influential cloud platforms in the world.',
            'During the visit, participants got a real picture of how AWS builds global-scale cloud infrastructure — from the culture of innovation applied in the workplace, to the system architecture used by millions of companies, to how teams at AWS collaborate cross-functionally to create solutions with major impact on the tech industry. A sharing session with AWS Indonesia professionals also opened up new insight into career paths in cloud computing and information technology.',
            'Through this Company Visit, EISD Laboratory wants to broaden its members\' perspective that the world of work in technology is full of exciting opportunities. Seeing AWS\'s work ecosystem firsthand became strong motivation for members to keep growing, innovating, and preparing themselves to become top digital talent.',
        ].join('\n\n'),
        image: '/images/events/seminar/Company Visit AWS/comvis_AWS_sampul.webp',
        heroBanner: '/images/events/seminar/Company Visit AWS/comvis_AWS_sampul.webp',
        heroPosition: 'top',
        status: 'completed' as const,
        gradient: 'from-red-500 to-orange-500',
        gallery: [
            '/images/events/seminar/Company Visit AWS/comvis_AWS_1.webp',
            '/images/events/seminar/Company Visit AWS/comvis_AWS_2.webp',
            '/images/events/seminar/Company Visit AWS/comvis_AWS_3.webp',
            '/images/events/seminar/Company Visit AWS/comvis_AWS_4.webp',
            '/images/events/seminar/Company Visit AWS/comvis_AWS_5.webp',
        ],
    },
    {
        id: 4,
        title: 'Unity Nights Study Group EISD',
        category: 'Study Group',
        date: 'May 2026',
        location: 'Auditorium TULT Lantai 16',
        description: [
            'Unity Nights Study Group EISD is a togetherness event designed to strengthen the bond between Study Group participants and EISD Laboratory assistants through a relaxed, warm, and interactive atmosphere. This event gives all participants a space to get to know each other better, share experiences, and build connections that are useful not only during the Study Group program, but also for their academic journey and personal growth ahead.',
            'Beyond being a togetherness event, Unity Nights is also an important moment for introducing the Final Project that all Study Group participants will work on. During the event, participants are introduced to the project overview, cross-division team assignments, and the workflow they\'ll follow throughout the program. Through this face-to-face meeting, every team member is expected to start building chemistry, understanding each other\'s character, and establishing effective communication before work on the project begins.',
            'Throughout the event, participants also take part in various engaging activities, from casual chats and consultations with the Liaison Officers (LOs) and EISD Laboratory assistants, to a range of interactive games designed to build teamwork, communication, and camaraderie among participants. Because learning together isn\'t just about understanding the material, but also about building a supportive, enjoyable environment full of spirit to grow together.',
            'Through Unity Nights Study Group EISD, EISD Laboratory hopes all participants can build closer relationships, feel more comfortable discussing and collaborating, and lay a solid foundation for teamwork. With this spirit of togetherness, the event is expected to be the first step in forming Final Project teams that can work effectively, support one another, and produce their best work throughout the Study Group program.',
        ].join('\n\n'),
        image: '/images/events/studygroup/unity_night/unity_night_cover.webp',
        heroBanner: '/images/events/studygroup/unity_night/unity_night_cover.webp',
        heroPosition: 'top',
        status: 'completed' as const,
        gradient: 'from-emerald-500 to-teal-500',
        gallery: [
            '/images/events/studygroup/unity_night/unity_nights_1.webp',
            '/images/events/studygroup/unity_night/unity_nights_2.webp',
            '/images/events/studygroup/unity_night/unity_nights_3.webp',
            '/images/events/studygroup/unity_night/unity_nights_4.webp'
        ],
    },
    {
        id: 5,
        title: 'Pitching Day Study Group EISD',
        category: 'Study Group',
        date: 'June 2026',
        location: 'TULT 0810, Telkom University',
        description: [
            'Pitching Day Study Group EISD is the Final Project presentation event that serves as the culmination of the entire Study Group program. In this event, each participating team presents the ideas, concepts, and development results of the project they\'ve worked on throughout the program. Pitching Day is not only a chance to showcase participants\' technical skills and creativity, but also an opportunity to sharpen communication skills, idea delivery, and discussion skills through a Q&A session with the audience.',
            'Each team is given time to present their project clearly and engagingly, covering the background of the problem, the proposed solution, the development process, and a demonstration of the prototype or final result. Through this session, participants are expected to receive constructive feedback and evaluation to refine their project, as well as gain learning experience in presenting their work.',
            'Beyond being a presentation event, Pitching Day is also a space for participants to exchange ideas, share experiences, and strengthen collaboration among Study Group members. Interaction throughout the event is expected to broaden participants\' insight into various approaches to project development, while encouraging active and inspiring discussion.',
            'Through Pitching Day Study Group EISD, EISD Laboratory hopes all participants can showcase the results of their hard work with confidence, receive valuable feedback, and become more motivated to keep developing the skills and quality of the projects they\'ve built.',
        ].join('\n\n'),
        image: '/images/events/studygroup/pitching_day/pitching-day-cover.webp',
        heroBanner: '/images/events/studygroup/pitching_day/pitching-day-cover.webp',
        heroPosition: 'top',
        status: 'completed' as const,
        gradient: 'from-purple-500 to-pink-500',
        gallery: [
            '/images/events/studygroup/pitching_day/pitching-day(1).webp',
            '/images/events/studygroup/pitching_day/pitching-day(2).webp',
            '/images/events/studygroup/pitching_day/pitching-day(3).webp',
            '/images/events/studygroup/pitching_day/pitching-day(4).webp',
            '/images/events/studygroup/pitching_day/pitching-day(5).webp',
            '/images/events/studygroup/pitching_day/pitching-day(6).webp',
            '/images/events/studygroup/pitching_day/pitching-day(7).webp',
            '/images/events/studygroup/pitching_day/pitching-day(8).webp',
            '/images/events/studygroup/pitching_day/pitching-day(9).webp',
        ],
    },
    {
        id: 6, 
        title: 'Awarding Night',
        category: 'Study Group',
        date: 'June 2026',
        location: 'Online',
        description: [
            'Awarding Night Study Group EISD is a closing event designed to celebrate participants\' achievements throughout the program. This event is a special moment for all participants to receive recognition for the hard work, dedication, and achievements they\'ve reached in developing their Final Project.',
            'At Awarding Night, winners are announced across several predetermined award categories, including Best Software Development Team, Best UI/UX Design Team, Best Intelligence System Team, and Best Technopreneur Team. Alongside the team awards, each category also includes an individual award for the member with the best contribution. As the highlight of the event, the Best Team of the Year award is announced as the highest recognition for the team with the best overall performance.',
            'Beyond that, Awarding Night is also an opportunity to strengthen the bond between participants and EISD Laboratory staff through a warm, appreciative, and interactive atmosphere. This event is expected to give all participants a memorable experience, while motivating them to keep developing their skills in technology and digital innovation.',
        ].join('\n\n'),
        image: '/images/events/studygroup/awarding_night/awarding-night-cover.webp',
        heroBanner: '/images/events/studygroup/awarding_night/awarding-night-cover.webp',
        heroPosition: 'top',
        status: 'completed' as const,
        gradient: 'from-yellow-500 to-orange-500',
        gallery: [
            '/images/events/studygroup/awarding_night/awarding-night(1).webp',
            '/images/events/studygroup/awarding_night/awarding-night(2).webp',
            '/images/events/studygroup/awarding_night/awarding-night(3).webp',
            '/images/events/studygroup/awarding_night/awarding-night(4).webp',
            '/images/events/studygroup/awarding_night/awarding-night(5).webp',
            '/images/events/studygroup/awarding_night/awarding-night(6).webp',
        ],
    },
    {
        id: 7,
        title: 'EISD Competition 2026',
        category: 'Competition',
        date: 'September 2026',
        location: 'Online',
        description: [
            'EISD Competition 2026 is a technology innovation competition held for students across Indonesia. This competition aims to encourage students\' creativity and technology skills in developing innovative solutions that can have a positive impact on society.',
        ].join('\n\n'),
        image: '/images/events/competition/eisd_compe_2026/eisd-compe-2026-cover.webp',
        heroBanner: '/images/events/competition/eisd_compe_2026/eisd-compe-2026-cover.webp',
        heroPosition: 'top',
        status: 'upcoming' as const,
        gradient: 'from-yellow-500 to-orange-500',
        gallery: [
            '/images/events/competition/eisd_compe_2025/eisd-compe-2025(1).webp',
            '/images/events/competition/eisd_compe_2025/eisd-compe-2025(2).webp',
            '/images/events/competition/eisd_compe_2025/eisd-compe-2025(3).webp',
            '/images/events/competition/eisd_compe_2025/eisd-compe-2025(4).webp',
            '/images/events/competition/eisd_compe_2025/eisd-compe-2025(5).webp',
            '/images/events/competition/eisd_compe_2025/eisd-compe-2025(6).webp',
        ],
    },
    {
        id: 8,
        title: 'Company Visit Google',
        category: 'Seminar',
        date: 'May 2025',
        location: 'Google Indonesia, Jakarta',
        description: [
            'Company Visit Google is a unique opportunity for participants to visit Google\'s office in Jakarta and gain firsthand insight into company culture, the latest technology, and career opportunities in information technology.',
            'During the visit, participants explored Google\'s facilities and work environment, and attended presentation sessions from professionals across various divisions. This event also gave participants the chance to interact directly with Google employees and exchange ideas about innovation, product development, and challenges in the tech world.',
            'Company Visit Google is expected to broaden participants\' insight into the tech industry and inspire them to develop their careers in the field they\'re passionate about.',
        ].join('\n\n'),
        image: '/images/events/seminar/Company Visit Google/comvis-google-cover.webp',
        heroBanner: '/images/events/seminar/Company Visit Google/comvis-google-cover.webp',
        heroPosition: 'top',
        status: 'completed' as const,
        gradient: 'from-indigo-500 to-purple-500',
        gallery: [
            '/images/events/seminar/Company Visit Google/comvis_google(1).webp',
            '/images/events/seminar/Company Visit Google/comvis_google(2).webp',
            '/images/events/seminar/Company Visit Google/comvis_google(3).webp',
            '/images/events/seminar/Company Visit Google/comvis_google(4).webp',
            '/images/events/seminar/Company Visit Google/comvis_google(5).webp',
            '/images/events/seminar/Company Visit Google/comvis_google(6).webp',
        ],
    },
    {
        id: 9,
        title: 'EISD Competition 2025',
        category: 'Competition',
        date: 'November 2025',
        location: 'TULT 16th Floor, Telkom University',
        description: [
            'This hackathon is designed to provide university students with an opportunity to develop innovative digital solutions using low-code and no-code platforms. Working in teams, participants will tackle real-world challenges by identifying problems, designing practical solutions, and building functional applications within a limited timeframe. The event encourages creativity, critical thinking, and collaboration while introducing participants to modern approaches in application development.',
            'Throughout the competition, participants will experience the complete innovation process, from brainstorming ideas and validating concepts to creating prototypes and presenting their solutions before a panel of judges. With guidance from mentors and industry-inspired case studies, students will strengthen their technical, analytical, communication, and presentation skills while learning how to work effectively under time constraints.',
            'Beyond the competition itself, the hackathon serves as a platform for students to connect with peers who share similar interests in technology and innovation. It promotes knowledge sharing, teamwork, and the exchange of ideas in a collaborative environment, empowering participants to transform creative concepts into impactful digital solutions while preparing them for future academic and professional challenges.',
        ].join('\n\n'),
        image: '/images/events/competition/eisd_compe_2025/eisd-compe-2025-cover.webp',
        heroBanner: '/images/events/competition/eisd_compe_2025/eisd-compe-2025-cover.webp',
        heroPosition: 'top',
        status: 'completed' as const,
        gradient: 'from-yellow-500 to-orange-500',
        gallery: [
            '/images/events/competition/eisd_compe_2025/eisd-compe-2025(1).webp',
            '/images/events/competition/eisd_compe_2025/eisd-compe-2025(2).webp',
            '/images/events/competition/eisd_compe_2025/eisd-compe-2025(3).webp',
            '/images/events/competition/eisd_compe_2025/eisd-compe-2025(4).webp',
            '/images/events/competition/eisd_compe_2025/eisd-compe-2025(5).webp',
            '/images/events/competition/eisd_compe_2025/eisd-compe-2025(6).webp',
        ],
    }
]

// Helper function for category text color
const getCategoryColor = (category: string) => {
    switch (category) {
        case 'Study Group': return 'text-purple-600'
        case 'webinar': return 'text-teal-500'
        case 'Seminar': return 'text-pink-500'
        case 'Competition': return 'text-amber-500'
        default: return 'text-primary'
    }
}

export async function generateStaticParams() {
    return events
        .filter((event) => event.status !== 'upcoming')
        .map((event) => ({
            id: event.id.toString(),
        }))
}

export default function EventDetail({ params }: { params: { id: string } }) {
    const event = events.find((e) => e.id.toString() === params.id)

    if (!event || event.status === 'upcoming') {
        notFound()
    }

    const availableOtherEvents = events.filter((e) => e.id !== event.id && e.status !== 'upcoming')
    const randomOtherEvent = availableOtherEvents[Math.floor(Math.random() * availableOtherEvents.length)]
    const otherEvents = randomOtherEvent ? [randomOtherEvent] : []

    return (
        <main className="min-h-screen">

            {/* Banner/Hero Image Section*/}
            <section className="w-full pt-16 md:pt-16">
                <div className="relative h-64 md:h-[400px] bg-gray-900 w-full overflow-hidden">
                    <Image
                        src={event.heroBanner ?? event.image}
                        alt={event.title}
                        fill
                        sizes="100vw"
                        className={`object-cover z-10 ${
                            event.heroPosition === 'top'
                                ? 'object-top'
                                : 'object-center'
                        }`}
                        priority
                    />
                    <div className="absolute inset-0 bg-black/30 z-20" />
                    <div className="absolute inset-0 shadow-inner pointer-events-none z-30" />
                </div>
            </section>

            {/* Back Button Section */}
            <section className="pt-8 px-4 md:px-8 bg-white max-w-[1440px] mx-auto">
                <FadeIn direction="up" delay={0.15}>
                    <Link 
                        href="/events" 
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-semibold text-sm group"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="18" 
                            height="18" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            className="group-hover:-translate-x-1 transition-transform"
                        >
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Back to Previous Page
                    </Link>
                </FadeIn>
            </section>

            {/* Content Section */}
            <section className="py-8 px-4 md:px-8 bg-white max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
                    
                    {/* Left Column - Detail & Description */}
                    <div className="lg:col-span-2">
                        <FadeIn direction="up" delay={0.2}>
                            {/* Header Info (Badge, Date, Category, Title, Location) */}
                            <div className="mb-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-emerald-500 text-white">
                                        Completed
                                    </span>
                                    <span className="text-sm text-gray-400 font-medium">
                                        {event.date}
                                    </span>
                                </div>

                                <p className={`text-lg font-bold mb-2 ${getCategoryColor(event.category)}`}>
                                    {event.category}
                                </p>
                                
                                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                                    {event.title}
                                </h1>

                                <div className="flex items-center text-gray-400 text-sm font-medium">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0Z"/>
                                        <circle cx="12" cy="10" r="3"/>
                                    </svg>
                                    {event.location}
                                </div>
                            </div>

                            {/* Description Paragraphs */}
                            <div className="prose prose-gray max-w-none mb-12">
                                {event.description.split('\n\n').map((paragraph, idx) => (
                                    <p key={idx} className="text-gray-600 leading-relaxed text-[15px] mb-4">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            {/* Bottom Gallery - Horizontal Scroll */}
                            {event.gallery && event.gallery.length > 0 && (
                                <div className="relative w-full overflow-hidden">
                                    <div className={`${styles.galleryScroll} flex gap-4 w-full`}>
                                        {/* First set */}
                                        {event.gallery.map((src, idx) => (
                                            <div
                                                key={`img-${idx}`}
                                                className={`${styles.galleryItem} rounded-xl overflow-hidden relative flex-shrink-0`}
                                            >
                                                <Image
                                                    src={src}
                                                    alt={`${event.title} photo ${idx + 1}`}
                                                    fill
                                                    sizes="(max-width: 768px) 50vw, 33vw"
                                                    className="object-cover"
                                                />
                                            </div>
                                        ))}
                                        {/* Duplicate set for seamless infinite scroll */}
                                        {event.gallery.map((src, idx) => (
                                            <div
                                                key={`img-dup-${idx}`}
                                                className={`${styles.galleryItem} rounded-xl overflow-hidden relative flex-shrink-0`}
                                            >
                                                <Image
                                                    src={src}
                                                    alt={`${event.title} photo ${idx + 1}`}
                                                    fill
                                                    sizes="(max-width: 768px) 50vw, 33vw"
                                                    className="object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </FadeIn>
                    </div>

                    {/* Right Column - Other Events */}
                    <div className="lg:col-span-1">
                        <FadeIn direction="up" delay={0.3}>
                            <div className="sticky top-28">
                                <h2 className="text-xl font-extrabold text-gray-900 mb-6">Other Event</h2>
                                
                                <div className="space-y-6">
                                    {otherEvents.map((otherEvent) => (
                                        <Link 
                                            key={otherEvent.id} 
                                            href={`/events/${otherEvent.id}`}
                                            className="group block"
                                        >
                                            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                                                {/* Card Image */}
                                                <div className="relative h-48 bg-gray-50 w-full flex items-center justify-center overflow-hidden">
                                                    <Image
                                                        src={otherEvent.image}
                                                        alt={otherEvent.title}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, 33vw"
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    {/* Gradient Line di bawah gambar */}
                                                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${otherEvent.gradient}`} />
                                                </div>

                                                {/* Card Content */}
                                                <div className="p-5">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                                                            otherEvent.status === 'upcoming'
                                                                ? 'bg-accent-green text-white'
                                                                : 'bg-emerald-500 text-white'
                                                        }`}>
                                                            {otherEvent.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                                                        </span>
                                                        <span className="text-[11px] text-gray-400 font-medium">
                                                            {otherEvent.date}
                                                        </span>
                                                    </div>

                                                    <p className={`text-xs font-bold mb-1 ${getCategoryColor(otherEvent.category)}`}>
                                                        {otherEvent.category}
                                                    </p>

                                                    <h3 className="font-extrabold text-gray-900 text-[15px] group-hover:text-primary transition-colors leading-tight mb-3">
                                                        {otherEvent.title}
                                                    </h3>

                                                    <div className="flex items-center text-[11px] text-gray-400 font-medium">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                                                            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0Z"/>
                                                            <circle cx="12" cy="10" r="3"/>
                                                        </svg>
                                                        {otherEvent.location}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                </div>
            </section>

        </main>
    )
}
