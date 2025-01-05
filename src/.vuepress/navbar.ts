import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "测试&效能平台",
    icon: "pen-to-square",
    link: "/posts/QA/"
  },
    {
    text: "后端",
    icon: "book",
    link: "/posts/后端开发/",
  },
  {
    text: "AI相关",
    icon: "book",
    link: "/posts/AI/",
  },
    {
    text: "运维",
    icon: "book",
    link: "/posts/运维/",
  },
  {
    text: "杂货铺",
    icon: "book",
    link: "/posts/杂货铺/",
  },
    {
    text: "时间轴",
    icon: "book",
    link: "/timeline/",
  }
]);
