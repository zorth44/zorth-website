"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  className?: string
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    // 从 DOM 中提取标题
    const extractHeadingsFromDOM = () => {
      const article = document.querySelector('article.prose-content')
      if (!article) return

      const headingElements = article.querySelectorAll('h2, h3')
      const items: TOCItem[] = []
      const seen = new Set<string>()

      headingElements.forEach((el) => {
        const level = el.tagName === 'H2' ? 2 : 3
        const text = el.textContent?.trim() || ''
        let id = el.id

        // 如果没有 id，尝试从子元素获取
        if (!id) {
          const anchor = el.querySelector('a[id]')
          if (anchor) {
            id = anchor.id
          }
        }

        if (!id || !text) return

        // 处理重复 id
        let uniqueId = id
        let counter = 1
        while (seen.has(uniqueId)) {
          uniqueId = `${id}-${counter}`
          counter++
        }
        seen.add(uniqueId)

        items.push({ id: uniqueId, text, level })
      })

      setHeadings(items)
    }

    // 延迟执行，确保 DOM 已渲染
    const timer = setTimeout(extractHeadingsFromDOM, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-100px 0px -60% 0px" }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  if (headings.length < 2) return null

  return (
    <nav className={cn("toc", className)}>
      <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
        目录
      </h3>
      <ul className="space-y-1">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn(
              "text-sm transition-colors",
              heading.level === 3 && "ml-3"
            )}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={cn(
                "block py-1.5 px-2 rounded-md transition-all duration-200 hover:bg-accent hover:text-accent-foreground",
                activeId === heading.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
