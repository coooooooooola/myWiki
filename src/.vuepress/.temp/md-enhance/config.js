import CodeDemo from "/Users/swtywang/Coding/05 我的博客/my-docs-new/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.64_markdown-it@14.1.0_markmap-lib@0.18.5_markmap-toolbar@_higdlkykrvhwqzv3oyczxcvsku/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeDemo.js";
import MdDemo from "/Users/swtywang/Coding/05 我的博客/my-docs-new/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.64_markdown-it@14.1.0_markmap-lib@0.18.5_markmap-toolbar@_higdlkykrvhwqzv3oyczxcvsku/node_modules/vuepress-plugin-md-enhance/lib/client/components/MdDemo.js";
import MarkMap from "/Users/swtywang/Coding/05 我的博客/my-docs-new/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.64_markdown-it@14.1.0_markmap-lib@0.18.5_markmap-toolbar@_higdlkykrvhwqzv3oyczxcvsku/node_modules/vuepress-plugin-md-enhance/lib/client/components/MarkMap.js";

export default {
  enhance: ({ app }) => {
    app.component("CodeDemo", CodeDemo);
    app.component("MdDemo", MdDemo);
    app.component("MarkMap", MarkMap);
  },
};
