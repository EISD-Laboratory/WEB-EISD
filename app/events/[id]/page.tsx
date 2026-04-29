import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import styles from './EventDetail.module.css'

const events = [
    {
        id: 1,
        title: 'Webinar AIoT',
        category: 'Workshop',
        date: 'Maret 2025',
        location: 'Online',
        description: 'Workshop yang menggabungkan Artificial Intelligence dan Internet of Things (AIoT), membahas bagaimana perangkat pintar dapat saling terhubung dan memproses data secara cerdas. Kegiatan ini hadir sebagai wadah bagi mahasiswa untuk mendalami konsep-konsep terkini di bidang teknologi kecerdasan buatan yang dipadukan dengan ekosistem perangkat IoT.\n\nPeserta diajak untuk memahami arsitektur sistem AIoT secara menyeluruh — mulai dari cara kerja sensor dan aktuator, alur pengiriman data melalui jaringan, hingga bagaimana model machine learning diterapkan langsung pada perangkat edge. Materi disampaikan oleh para praktisi dan akademisi yang berpengalaman di bidangnya, sehingga peserta mendapatkan wawasan yang seimbang antara teori dan praktik nyata di industri.\n\nMelalui sesi ini, EISD Laboratory berharap dapat menginspirasi lebih banyak mahasiswa untuk mengeksplorasi dan berkontribusi dalam pengembangan solusi berbasis AIoT yang inovatif — khususnya untuk menjawab tantangan-tantangan nyata di masyarakat dan industri Indonesia.',
        image: '/images/events/workshop/Webinar AIoT/cover card Webinar AIoT.png',
        heroBanner: '/images/events/workshop/Webinar AIoT/Webinar AIoT_2.jpeg',
        status: 'completed' as const,
        gradient: 'from-emerald-500 to-teal-500',
        gallery: [
            '/images/events/workshop/Webinar AIoT/Webinar AIoT_1.jpeg',
            '/images/events/workshop/Webinar AIoT/Webinar AIoT_2.jpeg',
            '/images/events/workshop/Webinar AIoT/Webinar AIoT_3.jpeg',
            '/images/events/workshop/Webinar AIoT/Webinar AIoT_4.jpeg',
            '/images/events/workshop/Webinar AIoT/Webinar AIoT_5.jpeg',
        ],
    },
    {
        id: 2,
        title: 'Webinar Android Development',
        category: 'Workshop',
        date: 'Mei 2025',
        location: 'Online',
        description: 'Workshop yang membahas dasar hingga pengembangan aplikasi Android, mulai dari konsep UI, logika aplikasi, hingga implementasi sederhana menggunakan tools modern. Kegiatan ini dirancang untuk memberikan pemahaman komprehensif bagi mahasiswa yang ingin memulai perjalanan mereka di dunia pengembangan aplikasi mobile berbasis Android.\n\nPeserta diajak untuk mengeksplorasi ekosistem pengembangan Android secara langsung — mulai dari perancangan antarmuka pengguna (UI) yang intuitif, penerapan logika aplikasi yang terstruktur, hingga penggunaan tools dan framework modern seperti Android Studio dan Jetpack Compose. Materi disampaikan secara interaktif dengan pendekatan hands-on sehingga peserta dapat langsung mempraktikkan konsep yang dipelajari.\n\nMelalui workshop ini, EISD Laboratory mendorong mahasiswa untuk tidak sekadar belajar teori, tetapi juga membangun portofolio nyata berupa aplikasi Android sederhana yang siap dikembangkan lebih lanjut. Sebuah langkah awal yang kuat untuk menjadi mobile developer yang kompeten.',
        image: '/images/events/workshop/Webinar Android Development/Webinar Android_5.jpeg',
        heroBanner: '/images/events/workshop/Webinar Android Development/Webinar Android_1.jpeg',
        status: 'completed' as const,
        gradient: 'from-blue-500 to-indigo-500',
        gallery: [
            '/images/events/workshop/Webinar Android Development/Webinar Android_1.jpeg',
            '/images/events/workshop/Webinar Android Development/Webinar Android_2.jpeg',
            '/images/events/workshop/Webinar Android Development/Webinar Android_3.jpeg',
            '/images/events/workshop/Webinar Android Development/Webinar Android_4.jpeg',
            '/images/events/workshop/Webinar Android Development/Webinar Android_5.jpeg',
        ],
    },
    {
        id: 3,
        title: 'Company Visit',
        category: 'Seminar',
        date: 'Mei 2025',
        location: 'Google Indonesia, Jakarta',
        description: 'Kunjungan ke perusahaan untuk mengenal dunia kerja secara langsung, memahami budaya industri, serta melihat penerapan teknologi di dunia nyata. Kegiatan ini memberikan kesempatan eksklusif bagi anggota EISD Laboratory untuk menginjakkan kaki langsung di kantor Google Indonesia — salah satu perusahaan teknologi terbesar dan paling berpengaruh di dunia.\n\nSelama kunjungan, peserta mendapatkan gambaran nyata tentang bagaimana Google membangun produk berskala global, mulai dari culture of innovation yang diterapkan di lingkungan kerja, proses pengembangan software yang agile, hingga bagaimana tim-tim di Google berkolaborasi lintas fungsi untuk menciptakan solusi yang berdampak bagi miliaran pengguna. Sesi sharing dengan profesional Google Indonesia juga membuka wawasan baru tentang jalur karier di industri teknologi.\n\nMelalui Company Visit ini, EISD Laboratory ingin memperluas perspektif anggotanya bahwa dunia kerja di bidang teknologi penuh dengan peluang yang menarik. Pengalaman melihat langsung ekosistem kerja Google menjadi motivasi kuat bagi para anggota untuk terus berkembang, berinovasi, dan mempersiapkan diri menjadi talenta digital terbaik.',
        image: '/images/events/seminar/Company Visit/banner card.JPG',
        heroBanner: '/images/events/seminar/Company Visit/IMG_7697.JPG',
        status: 'completed' as const,
        gradient: 'from-red-500 to-orange-500',
        gallery: [
            '/images/events/seminar/Company Visit/IMG_7611.JPG',
            '/images/events/seminar/Company Visit/IMG_7612.JPG',
            '/images/events/seminar/Company Visit/IMG_7615.JPG',
            '/images/events/seminar/Company Visit/IMG_7697.JPG',
            '/images/events/seminar/Company Visit/IMG_7698.JPG',
        ],
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

    const availableOtherEvents = events.filter((e) => e.id !== event.id)
    const randomOtherEvent = availableOtherEvents[Math.floor(Math.random() * availableOtherEvents.length)]
    const otherEvents = randomOtherEvent ? [randomOtherEvent] : []

    return (
        <main className="min-h-screen">

            {/* Banner/Hero Image Section*/}
            <FadeIn direction="down" delay={0.1}>
                <section className="w-full pt-16 md:pt-16">
                    <div className="relative h-64 md:h-[400px] bg-gray-900 w-full overflow-hidden">
                        <Image
                            src={event.heroBanner ?? event.image}
                            alt={event.title}
                            fill
                            className="object-cover z-10"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/30 z-20" />
                        <div className="absolute inset-0 shadow-inner pointer-events-none z-30" />
                    </div>
                </section>
            </FadeIn>

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
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide ${
                                        event.status === 'upcoming'
                                            ? 'bg-accent-green text-white'
                                            : 'bg-emerald-500 text-white'
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