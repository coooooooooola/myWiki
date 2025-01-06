import comp from "/Users/swtywang/Coding/05 我的博客/my-docs-new/src/.vuepress/.temp/pages/posts/QA/06 测试专项 - 质量内建~.html.vue"
const data = JSON.parse("{\"path\":\"/posts/QA/06%20%E6%B5%8B%E8%AF%95%E4%B8%93%E9%A1%B9%20-%20%E8%B4%A8%E9%87%8F%E5%86%85%E5%BB%BA~.html\",\"title\":\"测试专项 - 质量内建\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"测试专项 - 质量内建\",\"date\":\"2022-03-11T00:00:00.000Z\",\"headerImage\":\"/img/in-post/2021-12-24/header.jpg\",\"useHeaderImage\":false,\"headerMask\":\"rgba(40, 57, 101, .4)\",\"catalog\":true,\"tags\":[\"质量保障\"],\"gitInclude\":[]},\"headers\":[{\"level\":2,\"title\":\"一、 平台建设\",\"slug\":\"一、-平台建设\",\"link\":\"#一、-平台建设\",\"children\":[{\"level\":3,\"title\":\"建设目标\",\"slug\":\"建设目标\",\"link\":\"#建设目标\",\"children\":[]},{\"level\":3,\"title\":\"核心能力\",\"slug\":\"核心能力\",\"link\":\"#核心能力\",\"children\":[]},{\"level\":3,\"title\":\"业界实现\",\"slug\":\"业界实现\",\"link\":\"#业界实现\",\"children\":[]},{\"level\":3,\"title\":\"核心技术\",\"slug\":\"核心技术\",\"link\":\"#核心技术\",\"children\":[]},{\"level\":3,\"title\":\"Jacoco 实现原理\",\"slug\":\"jacoco-实现原理\",\"link\":\"#jacoco-实现原理\",\"children\":[]},{\"level\":3,\"title\":\"其他插桩方案\",\"slug\":\"其他插桩方案\",\"link\":\"#其他插桩方案\",\"children\":[]}]},{\"level\":2,\"title\":\"二、业务实践\",\"slug\":\"二、业务实践\",\"link\":\"#二、业务实践\",\"children\":[{\"level\":3,\"title\":\"落地场景\",\"slug\":\"落地场景\",\"link\":\"#落地场景\",\"children\":[]},{\"level\":3,\"title\":\"实践思考\",\"slug\":\"实践思考\",\"link\":\"#实践思考\",\"children\":[]}]}],\"readingTime\":{\"minutes\":8.15,\"words\":2446},\"filePathRelative\":\"posts/QA/06 测试专项 - 质量内建~.md\",\"localizedDate\":\"2022年3月11日\",\"excerpt\":\"<blockquote>\\n<p>分别从平台开发者和业务使用者角度总结一下精准测试/质量预防的一些工作</p>\\n</blockquote>\\n<h2>一、 平台建设</h2>\\n<h3>建设目标</h3>\\n<p>降低由于代码变更引发的线上/线下问题数，提升研发代码质量以及测试质量</p>\\n<h3>核心能力</h3>\\n<ul>\\n<li>影响范围精准评估 =&gt; 基于微服务的链路追踪（静态/动态）</li>\\n<li>测试用例精准推荐 =&gt; 测试用例与代码关联（服务级/方法级/接口级）</li>\\n<li>测试结果精准度量 =&gt; 单测/接口自动化/手工测试的覆盖率分析、代码扫描、技术栈、CR 指标</li>\\n<li>打通 CI/CD 流水线 =&gt; 为 devops 提供原子能力</li>\\n</ul>\"}")
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
