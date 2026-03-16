# Zorth 个人博客

一个基于 Next.js 15 构建的现代化静态个人博客，支持暗黑模式、Markdown 渲染、代码高亮和 Giscus 评论系统。

**在线预览**: https://zorth-website.com

## 技术栈

- **框架**: [Next.js 15](https://nextjs.org/) (App Router + Static Export)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **内容管理**: [Contentlayer](https://contentlayer.dev/) + MDX
- **动画**: [Framer Motion](https://www.framer.com/motion/)
- **主题**: [next-themes](https://github.com/pacocoursey/next-themes)
- **评论**: [Giscus](https://giscus.app/) (基于 GitHub Discussions)
- **图标**: [Lucide React](https://lucide.dev/)

## 功能特性

- 🌓 **暗黑/亮色模式** - 自动跟随系统或手动切换
- 📝 **MDX 博客** - 支持 Markdown + JSX，代码高亮、表格、任务列表
- 🎨 **精美动画** - Framer Motion 实现的页面过渡和滚动动画
- 📑 **文章目录** - 自动生成目录，支持点击跳转
- 📖 **阅读进度** - 顶部进度条显示阅读进度
- 💬 **Giscus 评论** - 基于 GitHub Discussions 的无后端评论系统
- 🔗 **社交分享** - 支持 Twitter、微博分享
- 🔍 **SEO 优化** - 自动生成 sitemap、robots、JSON-LD 结构化数据
- 📱 **响应式设计** - 完美适配桌面端和移动端
- ⚡ **静态导出** - 纯静态网站，部署简单，加载极速

## 快速开始

### 1. 克隆仓库

```bash
git clone git@github.com:zorth44/zorth-website.git
cd zorth-website
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `.env.local.example` 为 `.env.local` 并配置：

```bash
# Giscus 评论系统配置（可选）
# 访问 https://giscus.app/zh-CN 获取以下配置值
NEXT_PUBLIC_GISCUS_REPO=zorth44/zorth-website
NEXT_PUBLIC_GISCUS_REPO_ID=YOUR_REPO_ID
NEXT_PUBLIC_GISCUS_CATEGORY=Comments
NEXT_PUBLIC_GISCUS_CATEGORY_ID=YOUR_CATEGORY_ID
```

### 4. 运行开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 5. 构建生产版本

```bash
npm run build
```

构建输出在 `dist/` 目录，可直接部署到任何静态托管服务。

## 项目结构

```
my-app/
├── content/
│   └── posts/              # 博客文章（MDX 格式）
│       ├── hello-world.mdx
│       └── why-static-blog.mdx
├── public/                 # 静态资源
│   ├── favicon.svg
│   └── zorth.jpg
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── blog/
│   │   │   ├── [slug]/    # 文章详情页
│   │   │   ├── blog-list.tsx
│   │   │   └── page.tsx   # 博客列表页
│   │   ├── globals.css    # 全局样式
│   │   ├── layout.tsx     # 根布局
│   │   ├── page.tsx       # 主页
│   │   ├── robots.ts      # robots.txt 生成
│   │   └── sitemap.ts     # sitemap.xml 生成
│   ├── components/        # 组件
│   │   ├── ui/           # shadcn/ui 组件
│   │   ├── animations.tsx # 动画组件
│   │   ├── giscus-comments.tsx  # Giscus 评论
│   │   ├── markdown-renderer.tsx
│   │   ├── navbar.tsx
│   │   ├── reading-progress.tsx
│   │   ├── share-buttons.tsx
│   │   ├── table-of-contents.tsx
│   │   └── theme-provider.tsx
│   └── lib/
│       ├── content.ts     # 内容处理工具
│       └── utils.ts       # 通用工具函数
├── contentlayer.config.ts # Contentlayer 配置
├── next.config.ts         # Next.js 配置
└── package.json
```

## 写作指南

在 `content/posts/` 目录下创建 `.mdx` 文件：

```mdx
---
title: "文章标题"
slug: "article-slug"
excerpt: "文章摘要，会显示在列表页"
date: "2026-03-16"
tags: ["nextjs", "react", "blog"]
author: "Zorth"
published: true
---

# 正文内容

支持 Markdown 语法：

- **粗体**、*斜体*、~~删除线~~
- [链接](https://example.com)
- 代码：`inline code`

## 代码块

```typescript
function hello(name: string): string {
  return `Hello, ${name}!`
}
```

## 表格

| 特性 | 状态 |
|------|------|
| 暗黑模式 | ✅ |
| 响应式 | ✅ |
```

## 部署

### Vercel（推荐）

1. 在 [Vercel](https://vercel.com/) 创建新项目
2. 导入 GitHub 仓库
3. 无需额外配置，直接部署

### GitHub Pages

```bash
# 构建并推送到 gh-pages 分支
npm run build
# 将 dist/ 目录内容部署到 GitHub Pages
```

### 其他静态托管

构建后的 `dist/` 目录可部署到：
- [Cloudflare Pages](https://pages.cloudflare.com/)
- [Netlify](https://www.netlify.com/)
- [AWS S3](https://aws.amazon.com/s3/)
- 任何支持静态文件的 CDN

## 配置 Giscus 评论

1. 确保仓库为 **Public**
2. 进入仓库 Settings → Features → 开启 **Discussions**
3. 访问 [giscus.app/zh-CN](https://giscus.app/zh-CN)
4. 填写仓库信息，获取 `repo-id` 和 `category-id`
5. 填入 `.env.local` 环境变量

## 自定义

### 修改个人信息

编辑 `src/app/page.tsx` 中的：
- 头像：`/zorth.jpg`
- 名称：Zorth
- 简介：后端开发者...
- 社交链接：GitHub、Twitter、邮箱

### 修改主题色

编辑 `src/app/globals.css` 中的 CSS 变量。

### 添加新页面

在 `src/app/` 下创建新目录，参考 Next.js App Router 规范。

## 许可证

MIT © [Zorth](https://github.com/zorth44)
