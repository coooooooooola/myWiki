import { hasGlobalComponent } from "/Users/swtywang/Coding/05 我的博客/my-docs-new/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.66_vuepress@2.0.0-rc.19/node_modules/@vuepress/helper/lib/client/index.js";
import { useScriptTag } from "/Users/swtywang/Coding/05 我的博客/my-docs-new/node_modules/.pnpm/@vueuse+core@12.3.0/node_modules/@vueuse/core/index.mjs";
import FontIcon from "/Users/swtywang/Coding/05 我的博客/my-docs-new/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.65_sass-embedded@1.83.1_vuepress@2.0.0-rc.19/node_modules/vuepress-plugin-components/lib/client/components/FontIcon.js";
import Badge from "/Users/swtywang/Coding/05 我的博客/my-docs-new/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.65_sass-embedded@1.83.1_vuepress@2.0.0-rc.19/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";
import VPCard from "/Users/swtywang/Coding/05 我的博客/my-docs-new/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.65_sass-embedded@1.83.1_vuepress@2.0.0-rc.19/node_modules/vuepress-plugin-components/lib/client/components/VPCard.js";

import "/Users/swtywang/Coding/05 我的博客/my-docs-new/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.66_vuepress@2.0.0-rc.19/node_modules/@vuepress/helper/lib/client/styles/sr-only.css";

export default {
  enhance: ({ app }) => {
    if(!hasGlobalComponent("FontIcon")) app.component("FontIcon", FontIcon);
    if(!hasGlobalComponent("Badge")) app.component("Badge", Badge);
    if(!hasGlobalComponent("VPCard")) app.component("VPCard", VPCard);
    
  },
  setup: () => {
    useScriptTag(
  `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/js/brands.min.js`,
  () => {},
  { attrs: { "data-auto-replace-svg": "nest" } }
);

    useScriptTag(
  `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/js/solid.min.js`,
  () => {},
  { attrs: { "data-auto-replace-svg": "nest" } }
);

    useScriptTag(
  `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/js/fontawesome.min.js`,
  () => {},
  { attrs: { "data-auto-replace-svg": "nest" } }
);

  },
  rootComponents: [

  ],
};
