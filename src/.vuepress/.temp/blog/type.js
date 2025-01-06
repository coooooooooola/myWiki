export const typesMap = {"article":{"/":{"path":"/article/","indexes":[2,3,4,5,6,14,7,32,8,9,30,15,16,17,18,19,20,21,33,22,34,41,10,23,24,25,11,26,38,27,35,12,39,42,43,28,13,29,36,1,31,37,40,0,44]}},"star":{"/":{"path":"/star/","indexes":[]}},"timeline":{"/":{"path":"/timeline/","indexes":[2,3,4,5,6,14,7,32,8,9,30,15,16,17,18,19,20,21,33,22,34,41,10,23,24,25,11,26,38,27,35,12,39,42,43,28,13,29,36,1,31,37,40,0]}}};

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
  });

