import comp from "/Users/swtywang/Coding/05 我的博客/my-docs-new/src/.vuepress/.temp/pages/posts/QA/index.html.vue"
const data = JSON.parse("{\"path\":\"/posts/QA/\",\"title\":\"QA\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"QA\",\"article\":false,\"feed\":false,\"sitemap\":false,\"gitInclude\":[],\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://swtywang/posts/QA/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"swtywang's homepage\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"QA\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"QA\\\"}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0,\"words\":1},\"filePathRelative\":null,\"excerpt\":\"\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
