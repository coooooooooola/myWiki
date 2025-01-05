import comp from "/Users/swtywang/Coding/05 我的博客/my-docs-new/src/.vuepress/.temp/pages/posts/质量保障/09 测试专项 - 全链路压测与故障演练.html.vue"
const data = JSON.parse("{\"path\":\"/posts/%E8%B4%A8%E9%87%8F%E4%BF%9D%E9%9A%9C/09%20%E6%B5%8B%E8%AF%95%E4%B8%93%E9%A1%B9%20-%20%E5%85%A8%E9%93%BE%E8%B7%AF%E5%8E%8B%E6%B5%8B%E4%B8%8E%E6%95%85%E9%9A%9C%E6%BC%94%E7%BB%83.html\",\"title\":\"测试专项 - 全链路压测与故障演练\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"测试专项 - 全链路压测与故障演练\",\"date\":\"2020-04-11T00:00:00.000Z\",\"headerImage\":\"/img/in-post/2021-12-24/header.jpg\",\"useHeaderImage\":false,\"headerMask\":\"rgba(40, 57, 101, .4)\",\"catalog\":true,\"tags\":[\"质量保障\"],\"gitInclude\":[]},\"headers\":[{\"level\":2,\"title\":\"全链路压测基本流程\",\"slug\":\"全链路压测基本流程\",\"link\":\"#全链路压测基本流程\",\"children\":[{\"level\":3,\"title\":\"Step1. 目标预估\",\"slug\":\"step1-目标预估\",\"link\":\"#step1-目标预估\",\"children\":[]},{\"level\":3,\"title\":\"Step2. 压测方案与准备\",\"slug\":\"step2-压测方案与准备\",\"link\":\"#step2-压测方案与准备\",\"children\":[]},{\"level\":3,\"title\":\"Step3. 压测执行\",\"slug\":\"step3-压测执行\",\"link\":\"#step3-压测执行\",\"children\":[]},{\"level\":3,\"title\":\"Step4. 结果分析\",\"slug\":\"step4-结果分析\",\"link\":\"#step4-结果分析\",\"children\":[]}]},{\"level\":2,\"title\":\"主流压测方案\",\"slug\":\"主流压测方案\",\"link\":\"#主流压测方案\",\"children\":[]},{\"level\":2,\"title\":\"美团 Quake 压测平台\",\"slug\":\"美团-quake-压测平台\",\"link\":\"#美团-quake-压测平台\",\"children\":[{\"level\":3,\"title\":\"数据构造\",\"slug\":\"数据构造\",\"link\":\"#数据构造\",\"children\":[]},{\"level\":3,\"title\":\"数据隔离\",\"slug\":\"数据隔离\",\"link\":\"#数据隔离\",\"children\":[]},{\"level\":3,\"title\":\"调度中心\",\"slug\":\"调度中心\",\"link\":\"#调度中心\",\"children\":[]},{\"level\":3,\"title\":\"性能优化\",\"slug\":\"性能优化\",\"link\":\"#性能优化\",\"children\":[]}]}],\"readingTime\":{\"minutes\":2.81,\"words\":844},\"filePathRelative\":\"posts/质量保障/09 测试专项 - 全链路压测与故障演练.md\",\"localizedDate\":\"2020年4月11日\",\"excerpt\":\"<h2>全链路压测基本流程</h2>\\n<blockquote>\\n<p><a href=\\\"https://tech.meituan.com/2019/02/14/full-link-pressure-test-automation.html\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">全链路压测自动化实践</a></p>\\n</blockquote>\\n<h3>Step1. 目标预估</h3>\\n<ol>\\n<li>预估票房区间 =&gt; 大数据</li>\\n<li>压测目标值 = 预估值 * X</li>\\n</ol>\\n<p>核心链路梳理 + 历史同期 Top 接口 + 近期 Top 接口 =&gt; 系统范围、接口 QPS/占比</p>\"}")
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
