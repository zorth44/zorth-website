"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2, Twitter, Link2, Check } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ShareButtonsProps {
  title: string
  url: string
  className?: string
}

export function ShareButtons({ title, url, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : url

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleShareTwitter = () => {
    const text = encodeURIComponent(title)
    const shareUrl = encodeURIComponent(fullUrl)
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`,
      "_blank",
      "width=550,height=420"
    )
  }

  const handleShareWeibo = () => {
    const text = encodeURIComponent(title)
    const shareUrl = encodeURIComponent(fullUrl)
    window.open(
      `https://service.weibo.com/share/share.php?title=${text}&url=${shareUrl}`,
      "_blank"
    )
  }

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              分享
            </Button>
          }
        />
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleShareTwitter}>
            <Twitter className="h-4 w-4 mr-2" />
            分享到 Twitter
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleShareWeibo}>
            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.737 5.439l-.002.004zM9.05 17.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.991-.406-1.593.379-.595 1.176-.861 1.793-.601.622.263.82.972.442 1.592zm1.27-1.627c-.141.237-.449.353-.689.253-.236-.09-.313-.361-.177-.586.138-.227.436-.346.672-.24.239.09.315.36.18.573h.014zm.176-2.719c-1.893-.493-4.033.45-4.857 2.118-.836 1.704-.026 3.591 1.886 4.21 1.983.64 4.318-.341 5.132-2.179.8-1.793-.201-3.642-2.161-4.149zm7.563-1.224c-.346-.105-.579-.18-.405-.649.389-1.061.428-1.979.008-2.635-.789-1.187-2.924-1.109-5.382-.031 0 0-.768.334-.571-.271.383-1.217.324-2.229-.268-2.816-1.344-1.336-4.918.045-7.985 3.088C2.013 10.878.784 13.447.784 15.658c0 4.226 5.407 6.804 10.695 6.804 6.936 0 11.551-4.021 11.551-7.21 0-1.925-1.628-3.013-2.971-3.403z"/>
            </svg>
            分享到微博
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyLink}>
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2 text-green-500" />
                已复制
              </>
            ) : (
              <>
                <Link2 className="h-4 w-4 mr-2" />
                复制链接
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
