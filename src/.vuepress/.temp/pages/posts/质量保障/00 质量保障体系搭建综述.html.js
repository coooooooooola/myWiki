import comp from "/Users/swtywang/Coding/05 我的博客/my-docs-new/src/.vuepress/.temp/pages/posts/质量保障/00 质量保障体系搭建综述.html.vue"
const data = JSON.parse("{\"path\":\"/posts/%E8%B4%A8%E9%87%8F%E4%BF%9D%E9%9A%9C/00%20%E8%B4%A8%E9%87%8F%E4%BF%9D%E9%9A%9C%E4%BD%93%E7%B3%BB%E6%90%AD%E5%BB%BA%E7%BB%BC%E8%BF%B0.html\",\"title\":\"质量保障体系\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"质量保障体系\",\"date\":\"2023-03-11T00:00:00.000Z\",\"headerImage\":\"/img/in-post/2021-12-24/header.jpg\",\"useHeaderImage\":false,\"headerMask\":\"rgba(40, 57, 101, .4)\",\"catalog\":true,\"tags\":[\"质量保障\"],\"gitInclude\":[]},\"headers\":[{\"level\":2,\"title\":\"如何制定？\",\"slug\":\"如何制定\",\"link\":\"#如何制定\",\"children\":[{\"level\":3,\"title\":\"0. 通用体系\",\"slug\":\"_0-通用体系\",\"link\":\"#_0-通用体系\",\"children\":[]},{\"level\":3,\"title\":\"1. 生命周期\",\"slug\":\"_1-生命周期\",\"link\":\"#_1-生命周期\",\"children\":[]},{\"level\":3,\"title\":\"2. 质量现状分析\",\"slug\":\"_2-质量现状分析\",\"link\":\"#_2-质量现状分析\",\"children\":[]},{\"level\":3,\"title\":\"3. 目标与现状评估\",\"slug\":\"_3-目标与现状评估\",\"link\":\"#_3-目标与现状评估\",\"children\":[]}]},{\"level\":2,\"title\":\"如何落地？\",\"slug\":\"如何落地\",\"link\":\"#如何落地\",\"children\":[{\"level\":3,\"title\":\"流程规范\",\"slug\":\"流程规范\",\"link\":\"#流程规范\",\"children\":[]},{\"level\":3,\"title\":\"测试技术\",\"slug\":\"测试技术\",\"link\":\"#测试技术\",\"children\":[]},{\"level\":3,\"title\":\"度量与运营\",\"slug\":\"度量与运营\",\"link\":\"#度量与运营\",\"children\":[]},{\"level\":3,\"title\":\"CICD\",\"slug\":\"cicd\",\"link\":\"#cicd\",\"children\":[]},{\"level\":3,\"title\":\"团队\",\"slug\":\"团队\",\"link\":\"#团队\",\"children\":[]}]}],\"readingTime\":{\"minutes\":3.11,\"words\":933},\"filePathRelative\":\"posts/质量保障/00 质量保障体系搭建综述.md\",\"localizedDate\":\"2023年3月11日\",\"excerpt\":\"<h2>如何制定？</h2>\\n<blockquote>\\n<p>制定适合业务的质量保障体系，与业务发展阶段、质量目标、质量痛点、业务特型、RD/QA/PM 团队情况等都有较大关联。</p>\\n</blockquote>\\n<h3>0. 通用体系</h3>\\n<h3>1. 生命周期</h3>\\n<p>产品的生命周期包括探索期、成长期、成熟期和衰退期，QA 同样需要基于业务发展的不同阶段 针对性指定响应策略。</p>\\n<ul>\\n<li>\\n<p>探索期：</p>\\n<ul>\\n<li>产品目标：快速试错 明确产品定位 走通商业模式</li>\\n<li>产品特点：效率第一，用户量少，场景相对简单</li>\\n<li>质量目标：测试效率优先，保证交付，质量容忍度高</li>\\n<li>质量风险：野蛮生长</li>\\n<li>保障思路：业务优先 建立信任；测试技术 &gt; 测试专项；结合公司基建低成本搭建通用的测试工具；建立初步的研发测试流程</li>\\n</ul>\\n</li>\\n<li>\\n<p>成长期</p>\\n<ul>\\n<li>产品目标：DAU/营收迅猛扩张，超越竞品</li>\\n<li>产品特点：玩法变多，策略变复杂，QPS 上涨</li>\\n<li>质量目标：对测试质量要求提升，线上 P0 问题收敛</li>\\n<li>质量风险：质量兜底能力薄弱；代码变更风险</li>\\n<li>质量目标&amp;思路：完善研发测试流程；建立测试专项；质量度量与运营；QA 人力补充与分工</li>\\n</ul>\\n</li>\\n<li>\\n<p>成熟期</p>\\n<ul>\\n<li>产品目标：DAU/营收在高位趋于稳定，建立口碑</li>\\n<li>产品特点：技术突破；成本控制</li>\\n<li>质量目标：低逃逸率低、人效提升</li>\\n<li>质量风险：长尾问题；回归成本；管控能力</li>\\n<li>质量目标&amp;思路：CICD；成熟度模型；业务特型</li>\\n</ul>\\n</li>\\n</ul>\"}")
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
