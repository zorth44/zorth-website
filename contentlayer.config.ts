import { defineDocumentType, makeSource } from "contentlayer2/source-files"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeHighlight from "rehype-highlight"

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    slug: {
      type: "string",
      required: true,
    },
    excerpt: {
      type: "string",
      required: false,
    },
    date: {
      type: "date",
      required: true,
    },
    updatedAt: {
      type: "date",
      required: false,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      required: false,
      default: [],
    },
    published: {
      type: "boolean",
      required: false,
      default: true,
    },
    author: {
      type: "string",
      required: false,
      default: "Zorth",
    },
    coverImage: {
      type: "string",
      required: false,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/blog/${post.slug}`,
    },
    readingTime: {
      type: "number",
      resolve: (post) => {
        const wordsPerMinute = 200
        const wordCount = post.body.raw.replace(/\s/g, "").length
        return Math.ceil(wordCount / wordsPerMinute)
      },
    },
  },
}))

export default makeSource({
  contentDirPath: "content/posts",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      rehypeHighlight,
    ],
  },
})
