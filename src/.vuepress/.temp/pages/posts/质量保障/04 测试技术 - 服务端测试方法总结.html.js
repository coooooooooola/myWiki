import comp from "/Users/swtywang/Coding/05 我的博客/my-docs-new/src/.vuepress/.temp/pages/posts/质量保障/04 测试技术 - 服务端测试方法总结.html.vue"
const data = JSON.parse("{\"path\":\"/posts/%E8%B4%A8%E9%87%8F%E4%BF%9D%E9%9A%9C/04%20%E6%B5%8B%E8%AF%95%E6%8A%80%E6%9C%AF%20-%20%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B5%8B%E8%AF%95%E6%96%B9%E6%B3%95%E6%80%BB%E7%BB%93.html\",\"title\":\"测试技术 - 服务端测试方法总结\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"测试技术 - 服务端测试方法总结\",\"date\":\"2019-06-12T00:00:00.000Z\",\"headerImage\":\"/img/in-post/2021-12-24/header.jpg\",\"useHeaderImage\":false,\"headerMask\":\"rgba(40, 57, 101, .4)\",\"catalog\":true,\"tags\":[\"质量保障\"],\"gitInclude\":[]},\"headers\":[{\"level\":2,\"title\":\"服务端在测什么\",\"slug\":\"服务端在测什么\",\"link\":\"#服务端在测什么\",\"children\":[{\"level\":3,\"title\":\"服务网关\",\"slug\":\"服务网关\",\"link\":\"#服务网关\",\"children\":[]},{\"level\":3,\"title\":\"服务治理平台\",\"slug\":\"服务治理平台\",\"link\":\"#服务治理平台\",\"children\":[]},{\"level\":3,\"title\":\"SpringBoot/存储/中间件\",\"slug\":\"springboot-存储-中间件\",\"link\":\"#springboot-存储-中间件\",\"children\":[]},{\"level\":3,\"title\":\"CI/CD\",\"slug\":\"ci-cd\",\"link\":\"#ci-cd\",\"children\":[]},{\"level\":3,\"title\":\"日志管理/链路追踪\",\"slug\":\"日志管理-链路追踪\",\"link\":\"#日志管理-链路追踪\",\"children\":[]}]},{\"level\":2,\"title\":\"服务端测试流程\",\"slug\":\"服务端测试流程\",\"link\":\"#服务端测试流程\",\"children\":[{\"level\":3,\"title\":\"测试前：\",\"slug\":\"测试前\",\"link\":\"#测试前\",\"children\":[]},{\"level\":3,\"title\":\"测试中：\",\"slug\":\"测试中\",\"link\":\"#测试中\",\"children\":[]},{\"level\":3,\"title\":\"测试后\",\"slug\":\"测试后\",\"link\":\"#测试后\",\"children\":[]}]},{\"level\":2,\"title\":\"QA 常用的工具/平台\",\"slug\":\"qa-常用的工具-平台\",\"link\":\"#qa-常用的工具-平台\",\"children\":[]},{\"level\":2,\"title\":\"QA 专项\",\"slug\":\"qa-专项\",\"link\":\"#qa-专项\",\"children\":[{\"level\":3,\"title\":\"质量预防\",\"slug\":\"质量预防\",\"link\":\"#质量预防\",\"children\":[]},{\"level\":3,\"title\":\"自动化测试\",\"slug\":\"自动化测试\",\"link\":\"#自动化测试\",\"children\":[]},{\"level\":3,\"title\":\"性能测试\",\"slug\":\"性能测试\",\"link\":\"#性能测试\",\"children\":[]},{\"level\":3,\"title\":\"监控告警治理\",\"slug\":\"监控告警治理\",\"link\":\"#监控告警治理\",\"children\":[]},{\"level\":3,\"title\":\"资损防控\",\"slug\":\"资损防控\",\"link\":\"#资损防控\",\"children\":[]},{\"level\":3,\"title\":\"故障演练\",\"slug\":\"故障演练\",\"link\":\"#故障演练\",\"children\":[]},{\"level\":3,\"title\":\"质量度量与运营\",\"slug\":\"质量度量与运营\",\"link\":\"#质量度量与运营\",\"children\":[]},{\"level\":3,\"title\":\"其他\",\"slug\":\"其他\",\"link\":\"#其他\",\"children\":[]}]},{\"level\":2,\"title\":\"懂代码更好测\",\"slug\":\"懂代码更好测\",\"link\":\"#懂代码更好测\",\"children\":[]}],\"readingTime\":{\"minutes\":9.35,\"words\":2805},\"filePathRelative\":\"posts/质量保障/04 测试技术 - 服务端测试方法总结.md\",\"localizedDate\":\"2019年6月12日\",\"excerpt\":\"<h2>服务端在测什么</h2>\\n<blockquote>\\n<p>微服务已成为主流的系统架构，只有对整体架构有了一定了解后，QA 才能更清楚需要测试什么，在哪些地方会存在风险。</p>\\n</blockquote>\\n<p>下图展示了微服务的全景组成，也很清晰的展示了一条请求的完整链路。各大互联网公司都会在此基础上开发更加定制化的组件。</p>\\n<figure><img src=\\\"https://swtywang.fun/minio/blog/8142ce5cb9e65c10c6e24c70ca3e9cfc.webp\\\" alt=\\\"Spring Cloud微服务架构图\\\" tabindex=\\\"0\\\" loading=\\\"lazy\\\"><figcaption>Spring Cloud微服务架构图</figcaption></figure>\"}")
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
