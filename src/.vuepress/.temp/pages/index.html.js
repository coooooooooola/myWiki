import comp from "/Users/swtywang/Coding/05 我的博客/my-docs-new/src/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"Homepage\",\"lang\":\"zh-CN\",\"frontmatter\":{\"home\":true,\"comment\":false,\"icon\":\"home\",\"title\":\"Homepage\",\"heroImage\":\"/assets/images/avatar.JPG\",\"heroFullScreen\":true,\"heroImageStyle\":{\"border-radius\":\"20%\",\"border\":\"5px solid rgba(255, 255, 255, 0.3)\",\"box-shadow\":\"0 0 12px rgba(0, 0, 0, 0.2)\",\"backdrop-filter\":\"blur(10px)\",\"background\":\"rgba(255, 255, 255, 0.1)\"},\"bgImage\":\"/assets/images/background.jpeg\",\"bgImageStyle\":{\"background-attachment\":\"fixed\",\"filter\":\"brightness(60%)\",\"opacity\":0.5},\"heroText\":\"PERSONAL WIKI\",\"tagline\":\"测试 / 效能平台  /  后端 / AI\",\"actions\":[{\"text\":\"ENTER\",\"icon\":\"lightbulb\",\"link\":\"./posts/\",\"type\":\"primary\"},{\"text\":\"ABOUT ME\",\"link\":\"./intro.md\"}],\"copyright\":false,\"footer\":\"© 2022-2025 swtywang 京ICP备2024078407号<br>Powered by VuePress </br>\",\"gitInclude\":[],\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://swtywang/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"swtywang's homepage\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Homepage\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"Homepage\\\"}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0.34,\"words\":101},\"filePathRelative\":\"README.md\",\"excerpt\":\"\"}")
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
