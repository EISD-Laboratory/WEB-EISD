'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import BackToTop from '@/components/BackToTop'
import FadeIn from '@/components/FadeIn'
import { useState } from 'react'

const articleCategories = ['All','Research']

const articles = [
  {
    id: 1,
    title: 'Membangun REST API dengan Node.js dan Express',
    category: 'Research',
    author: 'siapa yh',
    date: '28 Januari 2025',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.\n\nNeque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
    image: '/images/logo.png',
    gradient: 'from-purple-500 to-blue-500',
    featured: false,
  },
  {
    id: 2,
    title: 'Pengenalan Machine Learning untuk Pemula',
    category: 'Research',
    author: 'siapa yh',
    date: '20 Januari 2025',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
    image: '/images/logo.png',
    gradient: 'from-emerald-500 to-teal-500',
    featured: false,
  },
  {
    id: 3,
    title: 'Tren UI/UX Design di Tahun 2025',
    category: 'Research',
    author: 'siapa yh',
    date: '15 Januari 2025',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nAt vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.\n\nSimilique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.',
    image: '/images/logo.png',
    gradient: 'from-pink-500 to-rose-500',
    featured: false,
  },
  {
    id: 4,
    title: 'IoT dan Smart Campus: Studi Kasus di Telkom University',
    category: 'Research',
    author: 'siapa yh',
    date: '8 Januari 2025',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.\n\nNeque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.\n\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.',
    image: '/images/logo.png',
    gradient: 'from-amber-500 to-orange-500',
    featured: false,
  },
  {
    id: 5,
    title: '5 Tips Produktif untuk Developer Mahasiswa',
    category: 'Research',
    author: 'siapa yh',
    date: '2 Januari 2025',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.\n\nSimilique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.\n\nNam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.',
    image: '/images/logo.png',
    gradient: 'from-cyan-500 to-blue-500',
    featured: false,
  },
  {
    id: 6,
    title: 'Mengenal Design System dan Implementasinya',
    category: 'Research',
    author: 'siapa yh',
    date: '25 Desember 2024',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.\n\nNeque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
    image: '/images/logo.png',
    gradient: 'from-indigo-500 to-purple-500',
    featured: false,
  },
]

export default function Articles() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null)

  const filteredArticles = activeCategory === 'All'
    ? articles
    : articles.filter(a => a.category === activeCategory)

  const featuredArticle = articles.find(a => a.featured)
  const regularArticles = filteredArticles.filter(a => !a.featured)

  return (
    <main className="min-h-screen">
      <ScrollProgressBar />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 relative glow-blue-top-right overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <FadeIn direction="up" delay={0.2}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 glass-card px-5 py-2.5 rounded-full shadow-soft mb-6 shimmer-enhanced"
            >
              <div className="w-2 h-2 bg-primary rounded-full pulse-subtle" />
              <span className="text-sm text-gray-700 font-medium">Articles</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Our Articles</span>
            </h1>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Insight, tutorial, dan riset dari anggota EISD Laboratory. 
              Belajar bersama melalui tulisan yang bermanfaat.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && activeCategory === 'All' && (
        <section className="px-4 pb-8">
          <div className="max-w-6xl mx-auto">
            <FadeIn direction="up" delay={0.3}>
              <div
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/60 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedArticle(featuredArticle)}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="relative h-64 md:h-auto md:w-2/5 bg-gray-50 overflow-hidden">
                    <Image
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      fill
                      className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className={`absolute bottom-0 left-0 right-0 h-1 md:h-full md:w-1 md:right-0 md:left-auto md:top-0 bg-gradient-to-r md:bg-gradient-to-b ${featuredArticle.gradient}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">Featured</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${featuredArticle.gradient} text-white`}>
                        {featuredArticle.category}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {featuredArticle.title}
                    </h2>

                    <p className="text-gray-600 leading-relaxed mb-6">
                      {featuredArticle.description}
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 overflow-hidden relative">
                          <Image src="/images/logo.png" alt={featuredArticle.author} fill className="object-contain p-1" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{featuredArticle.author}</span>
                      </div>
                      <span className="text-xs text-gray-400">{featuredArticle.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Filter */}
      <section className="px-4 pb-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn direction="up" delay={0.35}>
            <div className="flex flex-wrap justify-center gap-3">
              {articleCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-primary text-white shadow-lg shadow-primary/25'
                      : 'bg-white/80 text-gray-600 border border-gray-200 hover:border-primary/30 hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 px-4 relative glow-pink-left overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeCategory === 'All' ? regularArticles : filteredArticles).map((article, index) => (
              <FadeIn key={article.id} direction="up" delay={0.1 * (index + 1)}>
                <div
                  className="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg border border-white/60 hover:shadow-2xl transition-all duration-300 h-full flex flex-col cursor-pointer"
                  onClick={() => setSelectedArticle(article)}
                >
                  {/* Image */}
                  <div className="relative h-44 bg-gray-50 border-b border-gray-100 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${article.gradient}`} />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${article.gradient} text-white`}>
                        {article.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow line-clamp-3">
                      {article.description}
                    </p>

                    {/* Author & Date */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200 overflow-hidden relative">
                          <Image src="/images/logo.png" alt={article.author} fill className="object-contain p-0.5" />
                        </div>
                        <span className="text-xs font-medium text-gray-700">{article.author}</span>
                      </div>
                      <span className="text-xs text-gray-400">{article.date}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">Belum ada artikel di kategori ini.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn direction="up" delay={0.2}>
            <div className="relative bg-gradient-to-br from-primary to-purple-700 rounded-3xl p-10 text-center text-white overflow-hidden">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Ingin Berkontribusi Menulis?</h2>
                <p className="text-white/80 mb-6 max-w-xl mx-auto">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bagikan pengetahuan 
                  dan pengalamanmu bersama komunitas EISD.
                </p>
                <button className="bg-white text-primary font-semibold px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Submit Your Article
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-20 md:pt-24 overflow-y-auto"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl mb-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Image */}
              <div className="relative h-56 md:h-72 bg-gray-50 overflow-hidden">
                <Image
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  fill
                  className="object-contain p-10"
                />
                <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${selectedArticle.gradient}`} />

                {/* Close button */}
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 border border-gray-200 shadow-md flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Article Content */}
              <div className="p-8 md:p-10">
                {/* Category badge */}
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${selectedArticle.gradient} text-white`}>
                    {selectedArticle.category}
                  </span>
                  <span className="text-xs text-gray-400">{selectedArticle.date}</span>
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  {selectedArticle.title}
                </h2>

                {/* Author info */}
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 overflow-hidden relative">
                    <Image src="/images/logo.png" alt={selectedArticle.author} fill className="object-contain p-1" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{selectedArticle.author}</p>
                    <p className="text-xs text-gray-400">EISD Laboratory Member</p>
                  </div>
                </div>

                {/* Full Content */}
                <div className="prose prose-gray max-w-none">
                  {selectedArticle.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-gray-600 leading-relaxed mb-4 text-[15px]">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Bottom actions */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {selectedArticle.date}
                  </div>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="text-sm font-medium text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali ke daftar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <BackToTop />
    </main>
  )
}
