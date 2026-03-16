import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";

const baseUrl = "https://zorth-website.com"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Zorth - 个人博客",
    template: "%s | Zorth",
  },
  description: "一个支持暗黑模式、Markdown 渲染的个人博客网站，分享技术文章和生活感悟",
  keywords: ["博客", "技术", "前端", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Zorth" }],
  creator: "Zorth",
  publisher: "Zorth",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: baseUrl,
    siteName: "Zorth",
    title: "Zorth - 个人博客",
    description: "一个支持暗黑模式、Markdown 渲染的个人博客网站",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zorth - 个人博客",
    description: "一个支持暗黑模式、Markdown 渲染的个人博客网站",
  },
  alternates: {
    canonical: baseUrl,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="antialiased min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="border-t py-4 shrink-0">
              <div className="container flex flex-col items-center justify-between gap-2 md:h-12 md:flex-row">
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Zorth. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
