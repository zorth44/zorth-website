import { allPosts, type Post } from "contentlayer/generated"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { BlogList } from "../../blog-list"
import { Pagination } from "@/components/pagination"

interface BlogPageProps {
  params: Promise<{ page: string }>
}

const POSTS_PER_PAGE = 9

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { page } = await params
  return {
    title: `博客 - 第 ${page} 页`,
    description: "探索技术文章、生活感悟和更多有趣的内容",
  }
}

export async function generateStaticParams() {
  const allPublishedPosts = allPosts.filter((post: Post) => post.published)
  const totalPages = Math.ceil(allPublishedPosts.length / POSTS_PER_PAGE)

  // 生成第 2 页及以后的静态参数（第 1 页是 /blog）
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }))
}

export default async function BlogPageNumber({ params }: BlogPageProps) {
  const { page } = await params
  const pageNumber = parseInt(page, 10)

  // 获取已发布的文章
  const allPublishedPosts = allPosts
    .filter((post: Post) => post.published)
    .sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const totalPages = Math.ceil(allPublishedPosts.length / POSTS_PER_PAGE)

  // 验证页码
  if (
    isNaN(pageNumber) ||
    pageNumber < 2 ||
    pageNumber > totalPages ||
    allPublishedPosts.length === 0
  ) {
    notFound()
  }

  // 计算当前页的文章
  const startIndex = (pageNumber - 1) * POSTS_PER_PAGE
  const posts = allPublishedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  // 提取所有标签
  const allTags = Array.from(
    new Set(allPublishedPosts.flatMap((post: Post) => post.tags || []))
  ).sort()

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">博客</h1>
        <p className="text-muted-foreground text-lg">
          探索技术文章、生活感悟和更多有趣的内容
        </p>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Badge variant="secondary" className="px-3 py-1">
          共 {allPublishedPosts.length} 篇文章
        </Badge>
        {allTags.length > 0 && (
          <Badge variant="secondary" className="px-3 py-1">
            {allTags.length} 个标签
          </Badge>
        )}
        <Badge variant="outline" className="px-3 py-1">
          第 {pageNumber} / {totalPages} 页
        </Badge>
      </div>

      {/* Tags */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="cursor-pointer hover:bg-primary/10 transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Posts Grid */}
      <BlogList posts={posts} />
      <Pagination currentPage={pageNumber} totalPages={totalPages} />
    </div>
  )
}
