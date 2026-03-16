"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"

// 动态导入 Giscus 组件，避免 SSR 问题
const GiscusComments = dynamic(
  () => import("./giscus-comments").then((mod) => mod.GiscusComments),
  {
    ssr: false,
    loading: () => (
      <div className="mt-12 pt-8 border-t">
        <h3 className="text-lg font-semibold mb-4">评论</h3>
        <div className="h-32 bg-muted/50 rounded-lg animate-pulse" />
      </div>
    ),
  }
)

interface CommentsSectionProps {
  repo: string
  repoId: string
  category: string
  categoryId: string
}

export function CommentsSection(props: CommentsSectionProps) {
  return (
    <Suspense
      fallback={
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-lg font-semibold mb-4">评论</h3>
          <div className="h-32 bg-muted/50 rounded-lg animate-pulse" />
        </div>
      }
    >
      <GiscusComments {...props} />
    </Suspense>
  )
}
