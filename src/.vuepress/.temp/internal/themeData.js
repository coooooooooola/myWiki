export const themeData = JSON.parse("{\"encrypt\":{\"config\":{\"/demo/encrypt.html\":[\"$2a$10$Fp4f1Bv1ZB8eAcBXkTUPtO3h7VbS7jmgTBSXPg/PVQBkLfMd8PdLC\"]}},\"author\":{\"name\":\"swtywang\",\"url\":\"https:www.baidu.com\"},\"logo\":\"/assets/images/avatar.JPG\",\"docsDir\":\"src\",\"darkmode\":\"enable\",\"footer\":\"京ICP备2024078407号\",\"copyright\":\"Copyright  © 2022-2025 swtywang\",\"displayFooter\":true,\"locales\":{\"/\":{\"lang\":\"zh-CN\",\"navbarLocales\":{\"langName\":\"简体中文\",\"selectLangAriaLabel\":\"选择语言\"},\"metaLocales\":{\"author\":\"作者\",\"date\":\"写作日期\",\"origin\":\"原创\",\"views\":\"访问量\",\"category\":\"分类\",\"tag\":\"标签\",\"readingTime\":\"阅读时间\",\"words\":\"字数\",\"toc\":\"此页内容\",\"prev\":\"上一页\",\"next\":\"下一页\",\"lastUpdated\":\"上次编辑于\",\"contributors\":\"贡献者\",\"editLink\":\"在 GitHub 上编辑此页\",\"print\":\"打印\"},\"blogLocales\":{\"article\":\"文章\",\"articleList\":\"文章列表\",\"category\":\"分类\",\"tag\":\"标签\",\"timeline\":\"时间轴\",\"timelineTitle\":\"昨日不在\",\"all\":\"全部\",\"intro\":\"个人介绍\",\"star\":\"星标\",\"empty\":\"$text 为空\"},\"paginationLocales\":{\"prev\":\"上一页\",\"next\":\"下一页\",\"navigate\":\"跳转到\",\"action\":\"前往\",\"errorText\":\"请输入 1 到 $page 之前的页码！\"},\"outlookLocales\":{\"themeColor\":\"主题色\",\"darkmode\":\"外观\",\"fullscreen\":\"全屏\"},\"encryptLocales\":{\"iconLabel\":\"文章已加密\",\"placeholder\":\"输入密码\",\"remember\":\"记住密码\",\"errorHint\":\"请输入正确的密码\"},\"routeLocales\":{\"skipToContent\":\"跳至主要內容\",\"notFoundTitle\":\"页面不存在\",\"notFoundMsg\":[\"这里什么也没有\",\"我们是怎么来到这儿的？\",\"这 是 四 零 四 !\",\"看起来你访问了一个失效的链接\"],\"back\":\"返回上一页\",\"home\":\"带我回家\"},\"navbar\":[\"/\",{\"text\":\"测试&效能平台\",\"icon\":\"pen-to-square\",\"link\":\"/posts/QA/\"},{\"text\":\"后端\",\"icon\":\"book\",\"link\":\"/posts/后端开发/\"},{\"text\":\"AI相关\",\"icon\":\"book\",\"link\":\"/posts/AI/\"},{\"text\":\"运维\",\"icon\":\"book\",\"link\":\"/posts/运维/\"},{\"text\":\"杂货铺\",\"icon\":\"book\",\"link\":\"/posts/杂货铺/\"},{\"text\":\"时间轴\",\"icon\":\"book\",\"link\":\"/timeline/\"}],\"sidebar\":{\"/\":[\"\",{\"text\":\"文章\",\"icon\":\"book\",\"prefix\":\"posts/\",\"children\":\"structure\"}]}}}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
