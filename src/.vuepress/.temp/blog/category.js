export const categoriesMap = {"category":{"/":{"path":"/category/","map":{"AI":{"path":"/category/ai/","indexes":[0]},"server":{"path":"/category/server/","indexes":[1]}}}},"tag":{"/":{"path":"/tag/","map":{"AI":{"path":"/tag/ai/","indexes":[2,3,4,5,0]},"质量架构":{"path":"/tag/%E8%B4%A8%E9%87%8F%E6%9E%B6%E6%9E%84/","indexes":[5,6,7,8,9,10,11,12,13]},"质量保障":{"path":"/tag/%E8%B4%A8%E9%87%8F%E4%BF%9D%E9%9A%9C/","indexes":[14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]},"前端":{"path":"/tag/%E5%89%8D%E7%AB%AF/","indexes":[30,31]},"金融":{"path":"/tag/%E9%87%91%E8%9E%8D/","indexes":[32]},"Java":{"path":"/tag/java/","indexes":[33,34,11,35,13,36,1,37]},"server":{"path":"/tag/server/","indexes":[33,34,11,38,35,39,36,1,37,40]},"微服务":{"path":"/tag/%E5%BE%AE%E6%9C%8D%E5%8A%A1/","indexes":[33,35]},"运维":{"path":"/tag/%E8%BF%90%E7%BB%B4/","indexes":[41,42,43]}}}}};

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ categoriesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
  });

