export type Article = {
  title: string
  readTime: string
  date: string
  link: string
  image: string
}

export const MEDIUM_PROFILE_URL = 'https://medium.com/@eisdlaboratory'

const MEDIUM_FEED_URL = 'https://medium.com/feed/@eisdlaboratory'
const WORDS_PER_MINUTE = 200

const MEDIUM_ARTICLE_LINKS = [
  'https://medium.com/@eisdlaboratory/hemat-98-token-saat-search-kode-dalam-waktu-kurang-dari-1-detik-642aa2490f96',
  'https://medium.com/@eisdlaboratory/scrapling-adaptive-web-scraping-tanpa-bergantung-pada-selector-e173724f31d1',
  'https://medium.com/@eisdlaboratory/cv-kamu-bahkan-gak-dibaca-manusia-ca294154dbdf',
  'https://medium.com/@eisdlaboratory/tailwind-bikin-pusing-bootstrap-bikin-nyaman-tapi-mana-yang-sebenarnya-lebih-worth-it-e0f0d543c970',
]

const FALLBACK_ARTICLES: Article[] = [
  {
    title: 'Hemat 98% Token Saat Search Kode dalam Waktu kurang dari 1 Detik.',
    readTime: '5 min read',
    date: 'Jun 25, 2026',
    link: MEDIUM_ARTICLE_LINKS[0],
    image: 'https://cdn-images-1.medium.com/max/1024/1*C22EEAC6hoHRKAchjJ_9BA.png',
  },
  {
    title: 'Scrapling: Adaptive Web Scraping Tanpa Bergantung pada Selector',
    readTime: '3 min read',
    date: 'Apr 27, 2026',
    link: MEDIUM_ARTICLE_LINKS[1],
    image: 'https://cdn-images-1.medium.com/max/1024/1*uiMDlECsLrdmOijs4VRXmw.jpeg',
  },
  {
    title: 'CV Kamu Bahkan Gak Dibaca Manusia.',
    readTime: '6 min read',
    date: 'May 5, 2026',
    link: MEDIUM_ARTICLE_LINKS[2],
    image: 'https://cdn-images-1.medium.com/max/1024/1*RicjsK0XkOfuhtUqhdKaug.png',
  },

  {
    title: 'Tailwind Bikin Pusing, Bootstrap Bikin Nyaman — Tapi Mana yang Sebenarnya Lebih Worth It?',
    readTime: '5 min read',
    date: 'Jun, 2026',
    link: MEDIUM_ARTICLE_LINKS[3],
    image: '/images/logo.png',
  },
]

const getPostId = (url: string) => {
  const cleanUrl = url.split('?')[0]
  return cleanUrl.match(/-([a-f0-9]{12})$/i)?.[1] ?? cleanUrl.match(/\/p\/([a-f0-9]{12})/i)?.[1] ?? cleanUrl
}

const getXmlTagValue = (xml: string, tag: string) => {
  const escapedTag = tag.replace(':', '\\:')
  const match = xml.match(new RegExp(`<${escapedTag}>([\\s\\S]*?)<\\/${escapedTag}>`))
  return match?.[1]?.trim() ?? ''
}

const unwrapCdata = (value: string) => value.replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim()

const getCdataTagValue = (xml: string, tag: string) => unwrapCdata(getXmlTagValue(xml, tag))

const decodeHtml = (value: string) =>
  value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')

const formatArticleDate = (value: string) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value))

const stripHtml = (html: string) => decodeHtml(html.replace(/<[^>]*>/g, ' '))

const estimateReadTime = (html: string) => {
  const wordCount = stripHtml(html).split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
  return `${minutes} min read`
}

const getFirstImage = (html: string) => {
  const match = html.match(/<img[^>]+src="([^"]+)"/)
  const src = match?.[1]
  return src && /^https:\/\//.test(src) ? src : '/images/logo.png'
}

const parseMediumFeed = (feed: string): Article[] =>
  Array.from(feed.matchAll(/<item>([\s\S]*?)<\/item>/g)).map((match) => {
    const itemXml = match[1]
    const content = getCdataTagValue(itemXml, 'content:encoded')

    return {
      title: decodeHtml(getCdataTagValue(itemXml, 'title')),
      readTime: estimateReadTime(content),
      date: formatArticleDate(getXmlTagValue(itemXml, 'pubDate')),
      link: getXmlTagValue(itemXml, 'link').split('?')[0],
      image: getFirstImage(content),
    }
  })

export async function getMediumArticles(): Promise<Article[]> {
  try {
    const response = await fetch(MEDIUM_FEED_URL, { cache: 'force-cache' })

    if (!response.ok) {
      throw new Error(`Failed to fetch Medium RSS: ${response.status}`)
    }

    const feed = await response.text()
    const articlesById = new Map(parseMediumFeed(feed).map((article) => [getPostId(article.link), article]))

    return MEDIUM_ARTICLE_LINKS.map((link, index) => ({
      ...(articlesById.get(getPostId(link)) ?? FALLBACK_ARTICLES[index]),
      link,
    }))
  } catch {
    return FALLBACK_ARTICLES
  }
}
