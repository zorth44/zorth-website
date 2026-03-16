// 从 HTML 内容中提取标题生成目录
export interface TOCItem {
  id: string
  text: string
  level: number
}

export function extractHeadings(content: string): TOCItem[] {
  const headings: TOCItem[] = []
  const seen = new Set<string>()

  // 使用 DOM 解析来提取标题，更可靠
  if (typeof document === 'undefined') {
    // 服务端渲染时返回空数组
    return headings
  }

  // 创建一个临时的 div 来解析 HTML
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = content

  // 查找所有 h2 和 h3 标签
  const headingElements = tempDiv.querySelectorAll('h2, h3')

  headingElements.forEach((el) => {
    const level = el.tagName === 'H2' ? 2 : 3
    // 获取文本内容，去除嵌套标签
    const text = el.textContent?.trim() || ''

    // 获取 id，优先使用元素已有的 id
    let id = el.id

    // 如果没有 id，从文本生成
    if (!id && text) {
      id = text
        .toLowerCase()
        .replace(/[^\w\s\u4e00-\u9fa5]/g, "") // 保留中文、字母、数字、空格
        .replace(/\s+/g, "-") // 空格替换为连字符
        .replace(/-+/g, "-") // 多个连字符合并
        .replace(/^-|-$/g, "") // 去除首尾连字符
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

    headings.push({ id: uniqueId, text, level })
  })

  return headings
}

// 生成 slug
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u4e00-\u9fa5]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}
