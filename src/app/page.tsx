"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Github,
  Mail,
  Twitter,
  Calendar,
  ChevronDown,
} from "lucide-react"
import {
  FadeIn,
  SlideUp,
  StaggerContainer,
  StaggerItem,
  ScaleIn,
  Floating,
  TypewriterText,
} from "@/components/animations"
import { useEffect, useState } from "react"
import Image from "next/image"
import { allPosts, type Post } from "contentlayer/generated"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"

function formatDate(dateStr: string) {
  return format(new Date(dateStr), "yyyy年M月d日", { locale: zhCN })
}

// 粒子背景组件
function ParticleBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, -20, 20],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

export default function HomePage() {
  // 获取已发布的文章，按日期降序排列
  const posts = allPosts
    .filter((post: Post) => post.published)
    .sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col"
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <ParticleBackground />

        {/* Floating Shapes */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/5 blur-xl"
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-32 h-32 rounded-full bg-primary/5 blur-xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container relative px-4 md:px-6">
          <div className="flex flex-col items-center gap-8 text-center">
            {/* Avatar with Pulse */}
            <Floating duration={4}>
              <div className="relative group">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary to-primary/60 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.7, 0.5],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden shadow-2xl cursor-pointer ring-4 ring-primary/20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Image
                    src="/zorth.jpg"
                    alt="Zorth"
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </div>
            </Floating>

            {/* Name & Title with Typewriter */}
            <div className="space-y-3">
              <motion.h1
                className="text-4xl md:text-6xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <TypewriterText text="Zorth" delay={0.5} />
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-muted-foreground font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                后端开发者
              </motion.p>
            </div>

            {/* Bio */}
            <motion.p
              className="max-w-[600px] text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              热爱编程与写作，专注于数据治理领域架构设计。
              <br className="hidden md:block" />
              在这里记录学习心得、项目经验和技术思考。
            </motion.p>

            {/* Social Links */}
            <motion.div
              className="flex items-center gap-3 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <SocialLink href="https://github.com/zorth44" icon={<Github className="h-5 w-5" />} delay={1.5} />
              <SocialLink href="https://x.com/ZorthNicolas" icon={<Twitter className="h-5 w-5" />} delay={1.6} />
              <SocialLink href="mailto:nicolaszorth@gmail.com" icon={<Mail className="h-5 w-5" />} delay={1.7} />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 2, duration: 0.5 },
            y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <SlideUp>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">最新文章</h2>
                <p className="text-muted-foreground">分享最新的技术心得</p>
              </div>
              <Link href="/blog" className="hidden md:block">
                <motion.div whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Button variant="ghost">
                    查看全部
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </Link>
            </div>
          </SlideUp>

          {posts.length === 0 ? (
            <FadeIn>
              <div className="text-center py-12">
                <p className="text-muted-foreground">暂无文章，敬请期待</p>
              </div>
            </FadeIn>
          ) : (
            <>
              <StaggerContainer
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                staggerDelay={0.1}
              >
                {posts.map((post) => (
                  <StaggerItem key={post.slug}>
                    <Link href={`/blog/${post.slug}`}>
                      <motion.div
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <Card className="h-full overflow-hidden group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/50">
                          <motion.div
                            className="h-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            style={{ originX: 0 }}
                          />
                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 flex-wrap mb-4">
                              {(post.tags || []).slice(0, 2).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {(post.tags || []).length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{(post.tags || []).length - 2}
                                </Badge>
                              )}
                            </div>

                            <h3 className="text-lg font-semibold line-clamp-2 mb-3 group-hover:text-primary transition-colors">
                              {post.title}
                            </h3>

                            {post.excerpt && (
                              <p className="text-muted-foreground line-clamp-2 mb-4 text-sm">
                                {post.excerpt}
                              </p>
                            )}

                            <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/50">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                {formatDate(post.date)}
                              </div>
                              <div className="flex items-center gap-1">
                                <span>{post.readingTime} 分钟阅读</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <FadeIn delay={0.4}>
                <div className="mt-8 text-center md:hidden">
                  <Link href="/blog">
                    <Button variant="outline">
                      查看全部文章
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </FadeIn>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <ScaleIn>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 md:p-12 text-center">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30" />

              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              <div className="relative">
                <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                  开始阅读
                </h2>
                <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
                  探索更多技术文章，一起学习成长
                </p>
                <Link href="/blog">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    <Button
                      size="lg"
                      variant="secondary"
                      className="bg-background/90 hover:bg-background text-foreground"
                    >
                      浏览博客
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>
    </motion.div>
  )
}

function SocialLink({
  href,
  icon,
  delay = 0,
}: {
  href: string
  icon: React.ReactNode
  delay?: number
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-xl border bg-card hover:bg-muted transition-colors"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3, type: "spring", stiffness: 400 }}
      whileHover={{ scale: 1.15, y: -3 }}
      whileTap={{ scale: 0.9 }}
    >
      {icon}
    </motion.a>
  )
}
