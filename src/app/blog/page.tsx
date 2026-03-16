import { allPosts, type Post } from "contentlayer/generated"
import { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { BlogList } from "./blog-list"

export const metadata: Metadata = {
  title: "博客",
  description: "探索技术文章、生活感悟和更多有趣的内容",
  openGraph: {
    title: "博客 | Zorth",
    description: "探索技术文章、生活感悟和更多有趣的内容",
  },
}

export default function BlogPage() {
  // 获取已发布的文章，按日期降序排列
  const posts = allPosts
    .filter((post: Post) => post.published)
    .sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // 提取所有标签
  const allTags = Array.from(
    new Set(posts.flatMap((post: Post) => post.tags || []))
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
          共 {posts.length} 篇文章
        </Badge>
        {allTags.length > 0 && (
          <Badge variant="secondary" className="px-3 py-1">
            {allTags.length} 个标签
          </Badge>
        )}
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
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-2">暂无文章</p>
          <p className="text-sm text-muted-foreground">
            稍后再来看看吧
          </p>
        </div>
      ) : (
        <BlogList posts={posts} />
      )}
    </div>
  )
}
