import Image from 'next/image'
import FadeIn from '@/components/FadeIn'
import { MEDIUM_PROFILE_URL, getMediumArticles, type Article } from '@/lib/articles'

function ExternalArrowIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}

function ArticleMeta({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <div className={`flex items-center ${featured ? 'gap-2 text-xs' : 'gap-1.5 text-[11px]'} text-gray-400 ${featured ? 'mb-3' : 'mb-2'}`}>
      {featured && (
        <span className="bg-primary/10 text-primary font-semibold px-2.5 py-0.5 rounded-full">
          Featured
        </span>
      )}
      <span>{article.date}</span>
      <span aria-hidden="true">&middot;</span>
      <span>{article.readTime}</span>
    </div>
  )
}

function ArticlesHero() {
  return (
    <section className="pb-8 px-4 hero-offset-sm">
      <div className="max-w-5xl mx-auto text-center">
        <FadeIn direction="up" delay={0.2}>
          <div className="inline-flex items-center gap-2 glass-card px-5 py-2 rounded-full shadow-soft mb-6 shimmer-enhanced">
            <div className="w-1.5 h-1.5 bg-accent-green rounded-full" />
            <span className="text-sm font-semibold text-primary tracking-wide uppercase">Blog</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            <span className="text-gray-900">Our </span>
            <span className="text-primary">Articles</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto">
            Insight, tutorials, and opinions on technology from the EISD Laboratory team.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

function FeaturedArticle({ article }: { article: Article }) {
  return (
    <section className="px-4 pb-8">
      <div className="max-w-5xl mx-auto">
        <FadeIn direction="up" delay={0.15}>
          <a href={article.link} target="_blank" rel="noopener noreferrer" className="group block">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="relative h-56 md:h-72">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <ArticleMeta article={article} featured />
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-200 mb-3 leading-tight">
                  {article.title}
                </h2>
                <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
                  <span>Read on Medium</span>
                  <ExternalArrowIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </a>
        </FadeIn>
      </div>
    </section>
  )
}

function ArticleCard({ article, index }: { article: Article; index: number }) {
  const isLogo = article.image === '/images/logo.png'

  return (
    <FadeIn direction="up" delay={0.05 * (index + 1)}>
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group block bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full"
      >
        <div className={`relative h-40 ${isLogo ? 'bg-gray-50' : ''}`}>
          <Image
            src={article.image}
            alt={article.title}
            fill
            className={`group-hover:scale-[1.03] transition-transform duration-500 ${
              isLogo ? 'object-contain p-6' : 'object-cover'
            }`}
            unoptimized={article.image.endsWith('.gif')}
          />
        </div>

        <div className="p-4">
          <ArticleMeta article={article} />
          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200 leading-snug line-clamp-3">
            {article.title}
          </h3>
          <div className="flex items-center gap-1 mt-3 text-xs font-medium text-primary">
            <span>Read more</span>
            <ExternalArrowIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </a>
    </FadeIn>
  )
}

function ArticleGrid({ articles }: { articles: Article[] }) {
  return (
    <section className="px-4 pb-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article, index) => (
            <ArticleCard key={article.link} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function MoreOnMediumCta() {
  return (
    <section className="px-4 pb-16">
      <div className="max-w-5xl mx-auto text-center">
        <FadeIn direction="up" delay={0.2}>
          <p className="text-gray-400 text-sm mb-4">See all our articles on Medium</p>
          <a
            href={MEDIUM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
            </svg>
            Follow on Medium
          </a>
        </FadeIn>
      </div>
    </section>
  )
}

export default async function Articles() {
  const [featuredArticle, ...otherArticles] = await getMediumArticles()

  return (
    <main className="min-h-screen">
      <ArticlesHero />
      <FeaturedArticle article={featuredArticle} />
      <ArticleGrid articles={otherArticles} />
      <MoreOnMediumCta />
    </main>
  )
}
