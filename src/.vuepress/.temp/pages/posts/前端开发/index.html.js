import comp from "/Users/swtywang/Coding/05 我的博客/my-docs-new/src/.vuepress/.temp/pages/posts/前端开发/index.html.vue"
const data = JSON.parse("{\"path\":\"/posts/%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91/\",\"title\":\"前端开发\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"前端开发\",\"article\":false,\"feed\":false,\"sitemap\":false,\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0,\"words\":1},\"filePathRelative\":null,\"excerpt\":\"\"}")
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
