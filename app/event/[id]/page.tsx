import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import FadeIn from '@/components/FadeIn'
import styles from '../EventDetail.module.css'

const events = [
    {
        id: 1,
        title: 'Study Group 2025',
        category: 'Study Group',
        date: 'Maret - September 2025',
        location: 'Telkom University',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique sollicitudin orci aliquam nec dictum orci phasellus lectus molestie. Tristique diam in phasellus tristique et. Ac non id dictum tellus rhoncus praesent scelerisque. Eu purus nunc mattis bibendum. Ut est a tellus vitae.\n\nNetus erat vulputate placerat nulla viverra ut eget. Semper pulvinar cras molestie sit tempus. Condimentum pharetra et platea ultricies blandit id mauris. Sit neque lacus morbi aliquam ante nulla tristique ut eu. Accumsan volutpat ac cum eget sed.\n\nSed non eu nullam morbi. Ullamcorper libero in lacus et lorem eros vulputate. Facilisis semper quis mattis a urna sed. Sed nibh tincidunt adipiscing pellentesque venenatis a morbi ac. Massa scelerisque fusce urna et scelerisque volutpat mauris a posuere. Nibh proin eleifend eu a viverra. Vitae venenatis euismod dictumst enim pharetra duis id. Arcu est aliquet dolor diam consequat cursus.',
        image: '/images/logo.png',
        status: 'upcoming' as const,
        gradient: 'from-purple-500 to-blue-500',
    },
    {
        id: 2,
        title: 'Belajar Blender',
        category: 'Workshop',
        date: '22 Februari 2025',
        location: 'Lab EISD, Telkom University',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
        image: '/images/logo.png',
        status: 'upcoming' as const,
        gradient: 'from-emerald-500 to-teal-500',
    },
    {
        id: 3,
        title: 'Quality Assurance Workshop',
        category: 'Seminar',
        date: '10 November 2025',
        location: 'Auditorium Telkom University',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
        image: '/images/logo.png',
        status: 'completed' as const,
        gradient: 'from-pink-500 to-rose-500',
    },
    {
        id: 4,
        title: 'Hackathon EISD 2025',
        category: 'Competition',
        date: 'Desember 2025',
        location: 'Telkom University',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
        image: '/images/logo.png',
        status: 'completed' as const,
        gradient: 'from-amber-500 to-orange-500',
    },
]

// Helper function untuk warna kategori text
const getCategoryColor = (category: string) => {
    switch (category) {
        case 'Study Group': return 'text-purple-600'
        case 'Workshop': return 'text-teal-500'
        case 'Seminar': return 'text-pink-500'
        case 'Competition': return 'text-amber-500'
        default: return 'text-primary'
    }
}

export async function generateStaticParams() {
    return events.map((event) => ({
        id: event.id.toString(),
    }))
}

export default function EventDetail({ params }: { params: { id: string } }) {
    const event = events.find((e) => e.id.toString() === params.id)

    if (!event) {
        notFound()
    }

    const otherEvents = events.filter((e) => e.id !== event.id && e.status === 'upcoming')

    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Banner/Hero Image Section*/}
            <FadeIn direction="down" delay={0.1}>
                <section className="w-full pt-16 md:pt-16">
                    <div className="relative h-64 md:h-[400px] bg-gray-200 w-full overflow-hidden">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] mix-blend-overlay"></div>
                        <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-contain p-6 md:p-12 z-10"
                            priority
                        />
                        <div className="absolute inset-0 shadow-inner pointer-events-none z-20" />
                    </div>
                </section>
            </FadeIn>

            {/* Back Button Section */}
            <section className="pt-8 px-4 md:px-8 bg-white max-w-[1440px] mx-auto">
                <FadeIn direction="up" delay={0.15}>
                    <Link 
                        href="/event" 
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
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide ${
                                        event.status === 'upcoming'
                                            ? 'bg-accent-green text-white'
                                            : 'bg-gray-200 text-gray-600'
                                    }`}>
                                        {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
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

                            {/* Bottom Gallery - Infinite Horizontal Scroll */}
                            <div className="relative w-full overflow-hidden">
                                <div className={`${styles.galleryScroll} flex gap-6 w-full`}>
                                    {/* First set of items */}
                                    {[1, 2, 3].map((item) => (
                                        <div 
                                            key={`item-${item}`}
                                            className={`${styles.galleryItem} bg-gray-50 rounded-xl p-8 flex items-center justify-center relative`}
                                        >
                                            <Image
                                                src={event.image}
                                                alt={`Gallery ${item}`}
                                                fill
                                                className="object-contain p-6"
                                            />
                                        </div>
                                    ))}
                                    {/* Duplicate set for seamless infinite scroll */}
                                    {[1, 2, 3].map((item) => (
                                        <div 
                                            key={`item-duplicate-${item}`}
                                            className={`${styles.galleryItem} bg-gray-50 rounded-xl p-8 flex items-center justify-center relative`}
                                        >
                                            <Image
                                                src={event.image}
                                                alt={`Gallery ${item}`}
                                                fill
                                                className="object-contain p-6"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
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
                                            href={`/event/${otherEvent.id}`}
                                            className="group block"
                                        >
                                            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                                                {/* Card Image */}
                                                <div className="relative h-48 bg-gray-50 w-full p-8 flex items-center justify-center">
                                                    <Image
                                                        src={otherEvent.image}
                                                        alt={otherEvent.title}
                                                        fill
                                                        className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    {/* Gradient Line di bawah gambar */}
                                                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${otherEvent.gradient}`} />
                                                </div>

                                                {/* Card Content */}
                                                <div className="p-5">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                                                            otherEvent.status === 'upcoming'
                                                                ? 'bg-accent-green text-white'
                                                                : 'bg-gray-200 text-gray-600'
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

            <Footer />
            <BackToTop />
        </main>
    )
}