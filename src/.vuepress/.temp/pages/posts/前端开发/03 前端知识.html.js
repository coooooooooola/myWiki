import comp from "/Users/swtywang/Coding/05 我的博客/my-docs-new/src/.vuepress/.temp/pages/posts/前端开发/03 前端知识.html.vue"
const data = JSON.parse("{\"path\":\"/posts/%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91/03%20%E5%89%8D%E7%AB%AF%E7%9F%A5%E8%AF%86.html\",\"title\":\"前端知识\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"前端知识\",\"date\":\"2018-07-12T00:00:00.000Z\",\"cover\":\"/assets/images/cover4.jpg\",\"headerMask\":\"rgba(40, 57, 101, .4)\",\"catalog\":true,\"tags\":[\"前端\"],\"gitInclude\":[]},\"headers\":[{\"level\":2,\"title\":\"核心方法属性\",\"slug\":\"核心方法属性\",\"link\":\"#核心方法属性\",\"children\":[{\"level\":3,\"title\":\"组合式 API\",\"slug\":\"组合式-api\",\"link\":\"#组合式-api\",\"children\":[]}]}],\"readingTime\":{\"minutes\":1.73,\"words\":518},\"filePathRelative\":\"posts/前端开发/03 前端知识.md\",\"localizedDate\":\"2018年7月12日\",\"excerpt\":\"<h2>核心方法属性</h2>\\n<p>**data：****用于声明组件初始响应式状态的函数。**<a href=\\\"https://cn.vuejs.org/api/options-state.html#data\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">https://cn.vuejs.org/api/options-state.html#data</a></p>\\n<p>**props：****用于声明一个组件的 props。**<a href=\\\"https://cn.vuejs.org/api/options-state.html#props\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">https://cn.vuejs.org/api/options-state.html#props</a></p>\"}")
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
