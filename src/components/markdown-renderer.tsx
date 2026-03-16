"use client"

import { useState, useRef } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import { slugify } from "@/lib/content"
import { Copy, Check, ZoomIn, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import "highlight.js/styles/github-dark.css"

interface MarkdownRendererProps {
  content: string
  className?: string
}

// 代码块组件
function CodeBlock({
  children,
  language = "text",
}: {
  children: React.ReactNode
  language?: string
}) {
  const [copied, setCopied] = useState(false)
  const codeRef = useRef<HTMLDivElement>(null)

  const handleCopy = async () => {
    if (codeRef.current) {
      const text = codeRef.current.textContent || ""
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Failed to copy:", err)
      }
    }
  }

  // 获取显示的语言名称
  const displayLanguage = language === "text" ? "纯文本" : language.toUpperCase()

  return (
    <div className="relative group rounded-lg overflow-hidden my-4 bg-[#0d1117] min-w-0">
      {/* 代码块头部 */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
        <span className="text-xs text-[#8b949e] font-mono uppercase">
          {displayLanguage}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 px-2 text-[#8b949e] hover:text-white hover:bg-[#30363d]"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 mr-1.5 text-green-500" />
              已复制
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 mr-1.5" />
              复制
            </>
          )}
        </Button>
      </div>
      {/* 代码内容 */}
      <div
        ref={codeRef}
        className="p-4 overflow-x-auto code-scrollbar"
      >
        <pre className="!bg-transparent !p-0 !m-0">
          {children}
        </pre>
      </div>
    </div>
  )
}

// 图片组件
function MarkdownImage({ src, alt }: { src?: string | Blob; alt?: string }) {
  const imageSrc = typeof src === 'string' ? src : undefined
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <figure className="my-6">
        <div
          className="relative rounded-lg overflow-hidden cursor-zoom-in group"
          onClick={() => setIsOpen(true)}
        >
          <img
            src={imageSrc}
            alt={alt}
            className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/50 text-white p-1.5 rounded">
              <ZoomIn className="h-4 w-4" />
            </div>
          </div>
        </div>
        {alt && (
          <figcaption className="text-center text-sm text-muted-foreground mt-2">
            {alt}
          </figcaption>
        )}
      </figure>

      {/* 图片放大弹窗 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
          <img
            src={imageSrc}
            alt={alt}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-slate dark:prose-invert max-w-none ${className || ""}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeHighlight,
        ]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mt-8 mb-4 scroll-mt-24">{children}</h1>
          ),
          h2: ({ children }) => {
            const text = String(children || '')
            const id = slugify(text)
            return (
              <h2 id={id} className="text-2xl font-semibold mt-8 mb-4 scroll-mt-24 border-b pb-2">{children}</h2>
            )
          },
          h3: ({ children }) => {
            const text = String(children || '')
            const id = slugify(text)
            return (
              <h3 id={id} className="text-xl font-semibold mt-6 mb-3 scroll-mt-24">{children}</h3>
            )
          },
          p: ({ children }) => <p className="mb-4 leading-7">{children}</p>,
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-7">{children}</li>,
          pre: ({ children, ...props }) => {
            // 提取代码块的语言信息
            const codeElement = children as React.ReactElement<{ className?: string }>
            const className = codeElement?.props?.className || ""
            const match = /language-(\w+)/.exec(className)
            const language = match ? match[1] : "text"

            return (
              <CodeBlock language={language} {...props}>
                {children}
              </CodeBlock>
            )
          },
          code: ({ className, children }) => {
            const match = /language-(\w+)/.exec(className || "")
            const isInline = !match && !className?.includes("language-")

            if (isInline) {
              return (
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary">
                  {children}
                </code>
              )
            }

            // 代码块由 pre 组件处理，这里直接返回
            return <code className={className}>{children}</code>
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary bg-muted/50 pl-4 pr-4 py-3 my-6 rounded-r-lg not-italic">
              <div className="text-muted-foreground">{children}</div>
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary hover:underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          img: ({ src, alt }) => <MarkdownImage src={src} alt={alt} />,
          hr: () => <hr className="my-8 border-border" />,
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 rounded-lg border">
              <table className="w-full border-collapse">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
          th: ({ children }) => (
            <th className="border-b px-4 py-3 text-left font-semibold text-sm">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b px-4 py-3 text-sm">{children}</td>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-muted/50 transition-colors">{children}</tr>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-foreground/90">{children}</em>
          ),
          del: ({ children }) => (
            <del className="line-through text-muted-foreground">{children}</del>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
