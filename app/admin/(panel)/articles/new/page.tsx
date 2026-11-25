import { ArticleForm } from '@/components/admin/ArticleForm'

// Session-gated fixture UI — opt out of instant-navigation prefetch validation.
export const instant = false

export default function AdminArticleNewPage() {
  return <ArticleForm />
}
