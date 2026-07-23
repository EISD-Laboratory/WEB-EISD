import Image from 'next/image'
import Link from 'next/link'
import { getMediumArticles, type Article } from '@/lib/articles'
import SectionHeading from './SectionHeading'

export default async function ArticlesPreview() {
  const [featured, ...sideArticles] = await getMediumArticles()

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Blog"
          title="Latest Articles"
          subtitle="Insight and tech tutorials from the EISD Laboratory team."
        />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-5">
          <FeaturedArticle article={featured} />

          <div className="lg:col-span-5 flex flex-col gap-3">
            {sideArticles.map((article) => (
              <SideArticle key={article.link} article={article} />
            ))}

            <Link
              href="/articles"
              className="group flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl py-3.5 px-5 text-sm font-semibold transition-colors duration-200 mt-auto"
            >
              <span>All Articles</span>
              <ArrowIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturedArticle({ article }: { article: Article }) {
  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="lg:col-span-7 group block relative rounded-2xl overflow-hidden min-h-[320px] md:min-h-[400px]"
    >
      <Image
        src={article.image}
        alt={article.title}
        fill
        className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <ArticleMeta article={article} featured />
        <h3 className="text-xl md:text-2xl font-bold text-white leading-tight mb-2 group-hover:text-accent-green transition-colors duration-300">
          {article.title}
        </h3>
        <div className="flex items-center gap-1.5 text-sm font-medium text-white/70 group-hover:text-white transition-colors">
          <span>Read on Medium</span>
          <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </a>
  )
}

function SideArticle({ article }: { article: Article }) {
  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-4 bg-white rounded-xl p-4 border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all duration-300"
    >
      <div className="w-1 self-stretch rounded-full flex-shrink-0 bg-primary" />

      <div className="flex-1 min-w-0">
        <ArticleMeta article={article} />
        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200 leading-snug line-clamp-2">
          {article.title}
        </h4>
      </div>

      <svg className="w-4 h-4 text-gray-300 group-hover:text-primary flex-shrink-0 mt-1 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </a>
  )
}

function ArticleMeta({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <div className={`flex items-center ${featured ? 'gap-2 mb-3' : 'gap-1.5 mb-1.5'} ${featured ? 'text-xs text-white/60' : 'text-[11px] text-gray-400'}`}>
      {featured && (
        <span className="bg-white/20 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
          Featured
        </span>
      )}
      <span>{article.date}</span>
      <span className={featured ? 'text-white/40' : ''} aria-hidden="true">&middot;</span>
      <span>{article.readTime}</span>
    </div>
  )
}

function ArrowIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}
