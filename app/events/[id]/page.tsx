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
            'Webinar yang membahas perbandingan pendekatan No-Code dan Pro-Code dalam pengembangan serta integrasi sistem enterprise di era transformasi digital. Kegiatan ini hadir sebagai wadah bagi mahasiswa untuk memahami bagaimana perusahaan modern memilih teknologi yang tepat dalam membangun sistem yang cepat, scalable, dan tetap mudah dikembangkan. ',
            ' Peserta akan diajak mengenal karakteristik, kelebihan, serta tantangan dari kedua pendekatan tersebut. Mulai dari bagaimana platform No-Code mampu mempercepat proses development dan automasi bisnis, hingga bagaimana Pro-Code memberikan fleksibilitas, kontrol, dan kemampuan kustomisasi yang lebih mendalam untuk kebutuhan sistem berskala besar. Karena ternyata dunia teknologi tidak pernah puas bikin pilihan sederhana. Selalu harus ada dua kubu yang saling merasa paling benar. ',
            ' Materi akan disampaikan oleh narasumber yang memiliki pengalaman langsung di bidang pengembangan sistem dan industri teknologi, sehingga peserta dapat memperoleh wawasan praktis mengenai implementasi nyata No-Code maupun Pro-Code dalam dunia kerja. Melalui webinar ini, EISD Laboratory berharap peserta dapat memahami tren teknologi terkini serta menentukan pendekatan yang paling relevan sesuai kebutuhan bisnis dan pengembangan sistem di masa depan..',
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
        title: 'Kuliah Umum Manajemen Proyek Sistem Informasi',
        category: 'Seminar',
        date: 'Mei 2026',
        location: 'Auditorium Gedung Damar Telkom University',
        description: [
            'Kuliah umum yang membahas pentingnya komunikasi efektif antara tim IT dan stakeholder bisnis dalam proses pengembangan serta pengelolaan proyek sistem informasi. Kegiatan ini hadir untuk membantu mahasiswa memahami bagaimana perbedaan perspektif antara sisi teknis dan bisnis sering kali menjadi tantangan utama dalam sebuah proyek digital. ',
            ' Peserta akan diajak mempelajari cara menyampaikan kebutuhan bisnis ke dalam solusi teknologi yang tepat, sekaligus memahami bagaimana tim IT dapat menerjemahkan aspek teknis agar lebih mudah dipahami oleh stakeholder non-teknis. Materi juga akan membahas pentingnya kolaborasi, manajemen ekspektasi, serta strategi komunikasi yang mampu menjaga proyek tetap berjalan secara efektif, tepat waktu, dan sesuai tujuan bisnis. Karena dalam dunia kerja nyata, error terbesar sering kali bukan berasal dari sistem, tapi dari miskomunikasi antar manusia yang merasa sudah saling paham. ',
            ' Melalui sesi ini, peserta diharapkan dapat memperoleh gambaran nyata mengenai peran komunikasi dalam keberhasilan proyek sistem informasi, sekaligus memahami keterampilan yang dibutuhkan untuk menjadi penghubung yang efektif antara kebutuhan bisnis dan implementasi teknologi di dunia industri.',
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
        title: 'Company Visit',
        category: 'Seminar',
        date: 'Mei 2026',
        location: 'AWS Indonesia, Jakarta',
        description: [
            'Kunjungan ke perusahaan untuk mengenal dunia kerja secara langsung, memahami budaya industri, serta melihat penerapan teknologi di dunia nyata. Kegiatan ini memberikan kesempatan eksklusif bagi anggota EISD Laboratory untuk menginjakkan kaki langsung di kantor AWS Indonesia salah satu platform cloud terbesar dan paling berpengaruh di dunia.',
            'Selama kunjungan, peserta mendapatkan gambaran nyata tentang bagaimana AWS membangun infrastruktur cloud berskala global, mulai dari culture of innovation yang diterapkan di lingkungan kerja, arsitektur sistem yang digunakan oleh jutaan perusahaan, hingga bagaimana tim-tim di AWS berkolaborasi lintas fungsi untuk menciptakan solusi yang berdampak besar bagi industri teknologi. Sesi sharing dengan profesional AWS Indonesia juga membuka wawasan baru tentang jalur karier di bidang cloud computing dan teknologi informasi.',
            'Melalui Company Visit ini, EISD Laboratory ingin memperluas perspektif anggotanya bahwa dunia kerja di bidang teknologi penuh dengan peluang yang menarik. Pengalaman melihat langsung ekosistem kerja AWS menjadi motivasi kuat bagi para anggota untuk terus berkembang, berinovasi, dan mempersiapkan diri menjadi talenta digital terbaik.',
        ].join('\n\n'),
        image: '/images/events/seminar/Company Visit/comvis_AWS_sampul.webp',
        heroBanner: '/images/events/seminar/Company Visit/comvis_AWS_sampul.webp',
        heroPosition: 'top',
        status: 'completed' as const,
        gradient: 'from-red-500 to-orange-500',
        gallery: [
            '/images/events/seminar/Company Visit/comvis_AWS_1.webp',
            '/images/events/seminar/Company Visit/comvis_AWS_2.webp',
            '/images/events/seminar/Company Visit/comvis_AWS_3.webp',
            '/images/events/seminar/Company Visit/comvis_AWS_4.webp',
            '/images/events/seminar/Company Visit/comvis_AWS_5.webp',
        ],
    },
    {
        id: 4,
        title: 'Unity Nights Study Group EISD',
        category: 'Study Group',
        date: 'Mei 2026',
        location: 'Auditorium TULT Lantai 16',
        description: [
            'Unity Nights Study Group EISD merupakan kegiatan kebersamaan yang dirancang untuk mempererat hubungan antara peserta Study Group dengan para asisten EISD Laboratory melalui suasana yang santai, hangat, dan penuh interaksi. Acara ini menjadi ruang bagi seluruh peserta untuk saling mengenal lebih dekat, berbagi pengalaman, serta membangun koneksi yang tidak hanya bermanfaat selama kegiatan Study Group berlangsung, tetapi juga untuk perjalanan akademik dan pengembangan diri ke depannya. ',
            ' Selain menjadi ajang kebersamaan, Unity Nights juga menjadi momen penting untuk pemaparan Final Project yang akan dikerjakan oleh seluruh peserta Study Group. Dalam kegiatan ini, peserta akan diperkenalkan pada gambaran proyek, pembagian tim lintas divisi, serta alur pelaksanaan yang akan dijalani selama program berlangsung. Dengan adanya pertemuan secara langsung, diharapkan setiap anggota tim dapat mulai membangun chemistry, memahami karakter satu sama lain, serta menjalin komunikasi yang efektif sebelum proses pengerjaan proyek dimulai. ',
            ' Selama kegiatan berlangsung, peserta juga akan diajak mengikuti berbagai aktivitas menarik, mulai dari sesi ngobrol santai dan konsultasi bersama para Liaison Officer (LO) serta asisten EISD Laboratory, hingga beragam games interaktif yang dirancang untuk membangun kerja sama, komunikasi, dan kekompakan antar peserta. Karena belajar bersama bukan hanya tentang memahami materi, tetapi juga tentang membangun lingkungan yang suportif, menyenangkan, dan penuh semangat untuk bertumbuh bersama. ',
            ' Melalui Unity Nights Study Group EISD, EISD Laboratory berharap seluruh peserta dapat menjalin hubungan yang lebih erat, merasa lebih nyaman untuk berdiskusi maupun berkolaborasi, serta membangun fondasi kerja tim yang solid. Dengan semangat kebersamaan, acara ini diharapkan menjadi langkah awal dalam membentuk tim Final Project yang mampu bekerja secara efektif, saling mendukung, dan menghasilkan karya terbaik selama Study Group berlangsung.',
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
        date: 'Juni 2026',
        location: 'TULT 0810, Telkom University',
        description: [
            'Pitching Day Study Group EISD merupakan kegiatan presentasi Final Project yang menjadi puncak dari seluruh rangkaian program Study Group. Dalam kegiatan ini, setiap tim peserta akan mempresentasikan ide, konsep, serta hasil pengembangan proyek yang telah mereka kerjakan selama program berlangsung. Pitching Day tidak hanya menjadi ajang untuk menunjukkan kemampuan teknis dan kreativitas peserta, tetapi juga menjadi kesempatan bagi mereka untuk mengasah keterampilan komunikasi, penyampaian ide, serta kemampuan berdiskusi melalui sesi tanya jawab dengan audiens.',
            'Setiap tim akan diberikan waktu untuk memaparkan proyek mereka secara jelas dan menarik, mulai dari latar belakang permasalahan, solusi yang diusulkan, proses pengembangan, hingga demonstrasi prototipe atau hasil akhir proyek. Melalui sesi ini, peserta diharapkan dapat memperoleh masukan dan evaluasi yang membangun sebagai bahan penyempurnaan proyek serta pengalaman belajar dalam mempresentasikan hasil karya mereka.',
            'Selain menjadi ajang presentasi, Pitching Day juga menjadi wadah bagi peserta untuk saling bertukar ide, berbagi pengalaman, dan mempererat kolaborasi antaranggota Study Group. Interaksi selama kegiatan diharapkan dapat memperluas wawasan peserta terhadap berbagai pendekatan dalam pengembangan proyek sekaligus mendorong terciptanya diskusi yang aktif dan inspiratif.',
            'Melalui Pitching Day Study Group EISD, EISD Laboratory berharap seluruh peserta dapat menunjukkan hasil kerja keras mereka dengan percaya diri, memperoleh umpan balik yang bermanfaat, serta semakin termotivasi untuk terus mengembangkan kemampuan dan kualitas proyek yang telah mereka bangun.',
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
        date: 'Juni 2026',
        location: 'Online',
        description: [
            'Awarding Night Study Group EISD merupakan kegiatan penutupan yang dirancang untuk merayakan pencapaian peserta selama program berlangsung. Acara ini menjadi momen spesial bagi seluruh peserta untuk menerima penghargaan atas kerja keras, dedikasi, dan prestasi yang telah mereka raih dalam mengembangkan Final Project. ',
            'Dalam Awarding Night, ada pengumuman pemenang dari berbagai kategori penghargaan yang telah ditentukan sebelumnya, mencakup kategori Best Software Development Team, Best UI/UX Design Team, Best Intelligence System Team, dan Best Technopreneur Team. Selain penghargaan tim, setiap kategori tersebut juga memiliki penghargaan individu bagi anggota dengan kontribusi terbaik. Sebagai puncak acara, akan diumumkan pula penghargaan Best Team of the Year sebagai apresiasi tertinggi bagi tim dengan performa terbaik secara keseluruhan.',
            'Selain itu, Awarding Night juga menjadi ajang untuk mempererat hubungan antar peserta dan staff EISD Laboratory melalui suasana yang hangat, penuh apresiasi, dan interaktif. Kegiatan ini diharapkan dapat memberikan pengalaman yang berkesan bagi seluruh peserta, sekaligus menjadi motivasi untuk terus mengembangkan kemampuan mereka di bidang teknologi dan inovasi digital.',
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
    }
]

// Helper function untuk warna kategori text
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
