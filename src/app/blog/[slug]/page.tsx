import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { TableOfContents } from "@/components/table-of-contents"
import { ShareButtons } from "@/components/share-buttons"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ReadingProgress } from "@/components/reading-progress"
import { CommentsSection } from "@/components/comments-section"
import { ArrowLeft, Calendar, User, Tag, Clock } from "lucide-react"
import { allPosts, Post } from "contentlayer/generated"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"

interface PostPageProps {
  params: Promise<{ slug: string }>
}

function formatDate(dateStr: string): string {
  return format(new Date(dateStr), "yyyy年M月d日", { locale: zhCN })
}

function getAdjacentPosts(currentSlug: string): {
  prev: Post | null
  next: Post | null
} {
  const posts = allPosts
    .filter((post: Post) => post.published)
    .sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const currentIndex = posts.findIndex((p: Post) => p.slug === currentSlug)

  return {
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
  }
}

function getRelatedPosts(currentSlug: string, tags: string[]): Post[] {
  if (tags.length === 0) return []

  return allPosts
    .filter(
      (post: Post) =>
        post.published &&
        post.slug !== currentSlug &&
        (post.tags || []).some((tag) => tags.includes(tag))
    )
    .slice(0, 3)
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = allPosts.find((p: Post) => p.slug === slug)

  if (!post || !post.published) {
    return {
      title: "文章未找到",
    }
  }

  return {
    title: post.title,
    description: post.excerpt || `${post.title} - 阅读时间约 ${post.readingTime} 分钟`,
    authors: post.author ? [{ name: post.author }] : undefined,
    keywords: post.tags || [],
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags || [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || undefined,
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  }
}

export async function generateStaticParams() {
  return allPosts
    .filter((post: Post) => post.published)
    .map((post: Post) => ({
      slug: post.slug,
    }))
}

function generateArticleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || undefined,
    url: `https://zorth-website.com/blog/${post.slug}`,
    datePublished: new Date(post.date).toISOString(),
    dateModified: post.updatedAt
      ? new Date(post.updatedAt).toISOString()
      : new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name: post.author || "匿名作者",
    },
    publisher: {
      "@type": "Organization",
      name: "Zorth",
      logo: {
        "@type": "ImageObject",
        url: "https://zorth-website.com/logo.png",
      },
    },
    keywords: (post.tags || []).join(","),
    wordCount: post.body.raw.replace(/\s/g, "").length,
    timeRequired: `PT${post.readingTime}M`,
    articleSection: (post.tags || [])[0] || "博客",
    inLanguage: "zh-CN",
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = allPosts.find((p: Post) => p.slug === slug)

  if (!post || !post.published) {
    notFound()
  }

  const [{ prev, next }, relatedPosts] = await Promise.all([
    Promise.resolve(getAdjacentPosts(slug)),
    Promise.resolve(getRelatedPosts(slug, post.tags || [])),
  ])

  const jsonLd = generateArticleSchema(post)
  const contentRaw = post.body.raw

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />
      <div className="container px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
            {/* Main Content */}
            <div className="min-w-0">
              {/* Back Button */}
              <Link href="/blog">
                <Button variant="ghost" className="mb-6 pl-0 hover:pl-2 transition-all">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  返回博客列表
                </Button>
              </Link>

              {/* Article Card */}
              <Card className="overflow-hidden border-0 shadow-lg">
                {/* Gradient Header */}
                <div className="h-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />

                <CardContent className="p-6 md:p-10">
                  {/* Header */}
                  <div className="space-y-6 mb-8">
                    {/* Tags */}
                    {(post.tags || []).length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        {(post.tags || []).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="cursor-pointer hover:bg-primary/20 transition-colors"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight">{post.title}</h1>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <User className="h-4 w-4" />
                        {post.author || "匿名作者"}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {formatDate(post.date)}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {post.readingTime} 分钟阅读
                      </div>
                    </div>

                    {/* Share */}
                    <div className="flex items-center gap-2 pt-2">
                      <ShareButtons title={post.title} url={`/blog/${post.slug}`} />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t mb-8" />

                  {/* Content */}
                  <article className="prose-content">
                    <MarkdownRenderer content={contentRaw} />
                  </article>

                  {/* Footer */}
                  {post.updatedAt && (
                    <div className="border-t mt-8 pt-6">
                      <p className="text-sm text-muted-foreground">
                        最后更新于 {formatDate(post.updatedAt)}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {prev ? (
                  <Link href={prev.url}>
                    <Button variant="outline" className="w-full justify-start h-auto py-4 px-4">
                      <div className="flex flex-col items-start text-left">
                        <span className="text-xs text-muted-foreground mb-1">← 上一篇</span>
                        <span className="text-sm font-medium line-clamp-1">{prev.title}</span>
                      </div>
                    </Button>
                  </Link>
                ) : (
                  <div />
                )}
                {next ? (
                  <Link href={next.url}>
                    <Button variant="outline" className="w-full justify-end h-auto py-4 px-4">
                      <div className="flex flex-col items-end text-right">
                        <span className="text-xs text-muted-foreground mb-1">下一篇 →</span>
                        <span className="text-sm font-medium line-clamp-1">{next.title}</span>
                      </div>
                    </Button>
                  </Link>
                ) : (
                  <div />
                )}
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-lg font-semibold mb-4">相关文章</h3>
                  <div className="grid gap-4">
                    {relatedPosts.map((related) => (
                      <Link key={related.slug} href={related.url}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardContent className="p-4">
                            <h4 className="font-medium line-clamp-1 mb-1">{related.title}</h4>
                            {related.excerpt && (
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {related.excerpt}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments */}
              <CommentsSection
                repo={process.env.NEXT_PUBLIC_GISCUS_REPO || "zorth44/zorth-website"}
                repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID || ""}
                category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY || "Comments"}
                categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || ""}
              />
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Table of Contents */}
                <Card className="p-4">
                  <TableOfContents />
                </Card>

                {/* Quick Actions */}
                <Card className="p-4">
                  <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
                    快速操作
                  </h3>
                  <div className="space-y-2">
                    <ShareButtons
                      title={post.title}
                      url={`/blog/${post.slug}`}
                      className="w-full"
                    />
                  </div>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </>
  )
}
