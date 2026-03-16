"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { Post } from "contentlayer/generated"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"

interface BlogListProps {
  posts: Post[]
}

function formatDate(dateStr: string): string {
  return format(new Date(dateStr), "yyyy年M月d日", { locale: zhCN })
}

export function BlogList({ posts }: BlogListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post: Post, index: number) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <Link href={post.url}>
            <Card className="h-full overflow-hidden group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/50">
              <div className="h-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60 group-hover:h-3 transition-all duration-300" />
              <CardContent className="p-6">
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  {(post.tags || []).slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {(post.tags || []).length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{(post.tags || []).length - 3}
                    </Badge>
                  )}
                </div>

                <h2 className="text-xl font-semibold line-clamp-2 mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>

                <p className="text-muted-foreground line-clamp-3 mb-4 text-sm leading-relaxed">
                  {post.excerpt || "暂无摘要"}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/50">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(post.date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readingTime} 分钟阅读
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
