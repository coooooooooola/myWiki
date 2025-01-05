import comp from "/Users/swtywang/Coding/05 我的博客/my-docs-new/src/.vuepress/.temp/pages/posts/质量保障/18 质量架构 -  Selenium Grid.html.vue"
const data = JSON.parse("{\"path\":\"/posts/%E8%B4%A8%E9%87%8F%E4%BF%9D%E9%9A%9C/18%20%E8%B4%A8%E9%87%8F%E6%9E%B6%E6%9E%84%20-%20%20Selenium%20Grid.html\",\"title\":\"质量架构 - Selenium Grid\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"质量架构 - Selenium Grid\",\"date\":\"2023-09-11T00:00:00.000Z\",\"headerImage\":\"/img/in-post/2021-12-24/header.jpg\",\"useHeaderImage\":false,\"headerMask\":\"rgba(40, 57, 101, .4)\",\"catalog\":true,\"tags\":[\"质量架构\"],\"gitInclude\":[]},\"headers\":[{\"level\":2,\"title\":\"基本介绍\",\"slug\":\"基本介绍\",\"link\":\"#基本介绍\",\"children\":[]},{\"level\":2,\"title\":\"使用\",\"slug\":\"使用\",\"link\":\"#使用\",\"children\":[{\"level\":3,\"title\":\"准备环境\",\"slug\":\"准备环境\",\"link\":\"#准备环境\",\"children\":[]},{\"level\":3,\"title\":\"启动命令\",\"slug\":\"启动命令\",\"link\":\"#启动命令\",\"children\":[]},{\"level\":3,\"title\":\"基本框架\",\"slug\":\"基本框架\",\"link\":\"#基本框架\",\"children\":[]}]},{\"level\":2,\"title\":\"Selenium Grid 的三种模式\",\"slug\":\"selenium-grid-的三种模式\",\"link\":\"#selenium-grid-的三种模式\",\"children\":[{\"level\":3,\"title\":\"1. StandAlone\",\"slug\":\"_1-standalone\",\"link\":\"#_1-standalone\",\"children\":[]},{\"level\":3,\"title\":\"2. Hub & Node\",\"slug\":\"_2-hub-node\",\"link\":\"#_2-hub-node\",\"children\":[]},{\"level\":3,\"title\":\"3. Distributed\",\"slug\":\"_3-distributed\",\"link\":\"#_3-distributed\",\"children\":[]},{\"level\":3,\"title\":\"如何选择模式？\",\"slug\":\"如何选择模式\",\"link\":\"#如何选择模式\",\"children\":[]}]}],\"readingTime\":{\"minutes\":7.26,\"words\":2179},\"filePathRelative\":\"posts/质量保障/18 质量架构 -  Selenium Grid.md\",\"localizedDate\":\"2023年9月11日\",\"excerpt\":\"<blockquote>\\n<p>UI 自动化平台有并发执行和本地调试的诉求，需要使用到<a href=\\\"https://www.selenium.dev/documentation/grid/\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">Selenium Grid</a>，学习一下</p>\\n</blockquote>\\n<h2>基本介绍</h2>\\n<p>Selenium Grid 通过将客户端发送的命令路由到远程浏览器实例，允许在远程机器上执行 WebDriver 脚本。基本功能：</p>\\n<ul>\\n<li>\\n<p>提供一种在多台机器上并行运行测试的方法</p>\\n</li>\\n<li>\\n<p>允许在不同浏览器版本上进行测试</p>\\n</li>\\n<li>\\n<p>支持本地调试</p>\\n</li>\\n<li>\\n<p>实现跨平台测试</p>\\n</li>\\n</ul>\"}")
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
