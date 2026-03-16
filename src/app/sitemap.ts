import { MetadataRoute } from "next"
import { allPosts, Post } from "contentlayer/generated"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://zorth-website.com"

  // 静态页面
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ]

  // 博客文章页面
  const posts = allPosts.filter((post: Post) => post.published)

  const postPages: MetadataRoute.Sitemap = posts.map((post: Post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.date),
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  return [...staticPages, ...postPages]
}
