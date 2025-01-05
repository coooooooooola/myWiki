<template><div><h3 id="白盒测试-黑盒测试" tabindex="-1"><a class="header-anchor" href="#白盒测试-黑盒测试"><span>白盒测试 &amp; 黑盒测试</span></a></h3>
<figure><img src="https://swtywang.fun/minio//blog/0e8cea764bcc14c05afb6cff16265b20.png" alt="测试用例设计方法" tabindex="0" loading="lazy"><figcaption>测试用例设计方法</figcaption></figure>
<h4 id="黑盒测试" tabindex="-1"><a class="header-anchor" href="#黑盒测试"><span>黑盒测试</span></a></h4>
<blockquote>
<p>支付活动促销需求：</p>
<ul>
<li>40 元及以上的订单可享受 5 折优惠</li>
<li>最高优惠 30 元</li>
</ul>
</blockquote>
<p>利用黑盒测试方法可以设计出如下用例：</p>
<figure><img src="https://swtywang.fun/minio//blog/004ac83d270c61e4e92cbfd98eb5fea2.png" alt="image-20240918212151257" tabindex="0" loading="lazy"><figcaption>image-20240918212151257</figcaption></figure>
<h4 id="白盒测试" tabindex="-1"><a class="header-anchor" href="#白盒测试"><span>白盒测试</span></a></h4>
<p><a href="https://juejin.cn/post/6969349503765708814?searchId=2024091821271282A28B868D9EF767C6AF" target="_blank" rel="noopener noreferrer">https://juejin.cn/post/6969349503765708814?searchId=2024091821271282A28B868D9EF767C6AF</a></p>
<h3 id="业务视角-技术视角" tabindex="-1"><a class="header-anchor" href="#业务视角-技术视角"><span>业务视角 &amp; 技术视角</span></a></h3>
<blockquote>
<p>上面举的例子都是针对于一个细小测试点的应用，实际的需求往往会复杂许多</p>
</blockquote>
<p>设计方案主要包含业务视角和技术视角，可以根据改动范围、业务实际情况等综合考虑测试用例编写策略：</p>
<ul>
<li>以支付系统这种偏服务端测试为例，由于 C 端核心场景相对固定（已有比较完善的测试用例模板），往往会涉及多个微服务系统的改动，这时候就需要投入更多的精力在数据流和系统链路的测试验证。</li>
<li>如果是偏 C 端测试，服务端改动较小，测试用例应以业务视角为主，辅助验证数据流和接口的正确性。</li>
</ul>
<figure><img src="https://swtywang.fun/minio//blog/e599c6b81b7e92d5106a3fb1bf348568.png" alt="whiteboard_exported_image (1)" tabindex="0" loading="lazy"><figcaption>whiteboard_exported_image (1)</figcaption></figure>
<h3 id="模块化-流程图" tabindex="-1"><a class="header-anchor" href="#模块化-流程图"><span>模块化 + 流程图</span></a></h3>
<blockquote>
<p>测试一个比较复杂的需求，可以先拆封为相对独立的模块，采用模块化+流程图的方式，确保用例设计的全面性</p>
</blockquote>
<figure><img src="https://swtywang.fun/minio//blog/f84f0803254d9a454fd0cdf08b7e7831.png" alt="模块化" tabindex="0" loading="lazy"><figcaption>模块化</figcaption></figure>
<h3 id="兼容性" tabindex="-1"><a class="header-anchor" href="#兼容性"><span>兼容性</span></a></h3>
<ul>
<li>Web ： Chrome、IE、FireFox ...</li>
<li>客户端设备：分辨率、屏幕尺寸、屏幕特点（水滴屏 刘海屏）</li>
<li>操作系统：IOS、Android、Windows...</li>
<li>网络：弱网、wifi、4G</li>
<li>版本：App 版本、新旧接口兼容、SDK...</li>
</ul>
<h3 id="业务特型" tabindex="-1"><a class="header-anchor" href="#业务特型"><span>业务特型</span></a></h3>
<p>基于历史问题、业务特殊场景梳理一些业务特型用例</p>
<h3 id="用例模板" tabindex="-1"><a class="header-anchor" href="#用例模板"><span>用例模板</span></a></h3>
<blockquote>
<p>每个业务（甚至核心模板）都有必要沉淀出几套测试用例模板，包含测试 checklist、测试设计点、模块-场景-校验点等</p>
</blockquote>
</div></template>


