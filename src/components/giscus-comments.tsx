"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface GiscusCommentsProps {
  repo: string
  repoId: string
  category: string
  categoryId: string
}

export function GiscusComments({
  repo,
  repoId,
  category,
  categoryId,
}: GiscusCommentsProps) {
  const { resolvedTheme } = useTheme()
  const ref = useRef<HTMLDivElement>(null)

  // 主题映射
  const theme = resolvedTheme === "dark" ? "dark" : "light"

  useEffect(() => {
    if (!ref.current) return

    // 清空容器
    ref.current.innerHTML = ""

    // 创建 giscus 元素
    const script = document.createElement("script")
    script.src = "https://giscus.app/client.js"
    script.setAttribute("data-repo", repo)
    script.setAttribute("data-repo-id", repoId)
    script.setAttribute("data-category", category)
    script.setAttribute("data-category-id", categoryId)
    script.setAttribute("data-mapping", "pathname")
    script.setAttribute("data-strict", "0")
    script.setAttribute("data-reactions-enabled", "1")
    script.setAttribute("data-emit-metadata", "0")
    script.setAttribute("data-input-position", "bottom")
    script.setAttribute("data-theme", theme)
    script.setAttribute("data-lang", "zh-CN")
    script.setAttribute("crossorigin", "anonymous")
    script.async = true

    ref.current.appendChild(script)

    return () => {
      if (ref.current) {
        ref.current.innerHTML = ""
      }
    }
  }, [repo, repoId, category, categoryId, theme])

  return (
    <div className="mt-12 pt-8 border-t">
      <h3 className="text-lg font-semibold mb-4">评论</h3>
      <div ref={ref} className="giscus" />
    </div>
  )
}
