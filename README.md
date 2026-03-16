# Zorth 个人博客

一个支持暗黑/亮色模式、Markdown 渲染、博客增删改查的现代个人博客网站。

## 技术栈

- **框架**: Next.js 14+ (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS + shadcn/ui
- **数据库**: PostgreSQL + Prisma ORM
- **认证**: Better Auth
- **Markdown**: react-markdown + remark-gfm + rehype-highlight

## 功能特性

- 🌓 暗黑/亮色模式切换
- 📝 Markdown 博客支持（代码高亮、表格、任务列表等）
- 🔐 Better Auth 认证（邮箱密码 + GitHub OAuth）
- 📊 博客浏览量统计
- 🏷️ 文章标签管理
- 📄 分页功能
- 🎨 现代化 UI 设计

## 快速开始

### 1. 安装依赖

```bash
cd my-app
npm install
```

### 2. 配置环境变量

复制 `.env.local` 并根据需要修改：

```bash
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/myapp?schema=public"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-change-this-in-production"
BETTER_AUTH_URL="http://localhost:3000"
```

### 3. 设置数据库

确保你有 PostgreSQL 数据库运行，然后执行：

```bash
# 创建数据库迁移
npx prisma migrate dev --name init

# 生成 Prisma Client
npx prisma generate
```

### 4. 运行开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 5. 创建管理员账户

访问 [http://localhost:3000/auth/login](http://localhost:3000/auth/login) 注册新账户，即可进入管理后台。

## 项目结构

```
my-app/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API 路由
│   │   ├── admin/posts/    # 管理后台
│   │   ├── auth/login/     # 登录页面
│   │   ├── blog/           # 博客列表和详情
│   │   ├── globals.css     # 全局样式
│   │   ├── layout.tsx      # 根布局
│   │   └── page.tsx        # 主页
│   ├── components/         # 组件
│   │   ├── ui/            # shadcn/ui 组件
│   │   ├── markdown-renderer.tsx
│   │   ├── navbar.tsx
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   ├── lib/               # 工具函数
│   │   ├── auth.ts        # Better Auth 配置
│   │   ├── auth-client.ts
│   │   ├── prisma.ts      # Prisma Client
│   │   └── utils.ts
│   └── prisma/            # Prisma 配置
│       └── schema.prisma  # 数据库模型
├── .env.local             # 环境变量
├── next.config.ts         # Next.js 配置
├── package.json
└── README.md
```

## 部署

### Vercel (推荐)

1. 在 Vercel 创建新项目
2. 连接 GitHub 仓库
3. 添加环境变量 (`DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`)
4. 部署

### 自建服务器

```bash
npm run build
npm start
```

## 环境变量说明

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `DATABASE_URL` | PostgreSQL 数据库连接字符串 | ✅ |
| `BETTER_AUTH_SECRET` | Better Auth 密钥，用于加密会话 | ✅ |
| `BETTER_AUTH_URL` | 应用 URL | ✅ |
| `GITHUB_CLIENT_ID` | GitHub OAuth Client ID | ❌ |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth Client Secret | ❌ |

## 许可证

MIT
