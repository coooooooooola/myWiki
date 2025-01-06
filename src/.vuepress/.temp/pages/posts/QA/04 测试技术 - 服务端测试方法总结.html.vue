<template><div><h2 id="一、微服务架构" tabindex="-1"><a class="header-anchor" href="#一、微服务架构"><span>一、微服务架构</span></a></h2>
<blockquote>
<p>微服务已成为主流的系统架构，只有对整体架构有了一定了解后，才能更清楚需要测试什么，在哪些地方会存在风险。</p>
</blockquote>
<p>下图展示了微服务的全景组成，也很清晰的展示了一条请求的完整链路。各大互联网公司都会在此基础上开发更加定制化的组件。</p>
<figure><img src="https://swtywang.fun/minio/blog/8142ce5cb9e65c10c6e24c70ca3e9cfc.webp" alt="Spring Cloud微服务架构图" tabindex="0" loading="lazy"><figcaption>Spring Cloud微服务架构图</figcaption></figure>
<h3 id="_1-1-服务网关" tabindex="-1"><a class="header-anchor" href="#_1-1-服务网关"><span>1.1 服务网关</span></a></h3>
<blockquote>
<p>Shepherd：<a href="https://tech.meituan.com/2021/05/20/shepherd-api-gateway.html" target="_blank" rel="noopener noreferrer">https://tech.meituan.com/2021/05/20/shepherd-api-gateway.html</a></p>
</blockquote>
<p>API Gateway 层作为外部请求与内部服务间的流量入口，主要负责对外部流量做如下功能：</p>
<ul>
<li>路由分发&amp;负载均衡：将请求路径/api/xxx/xxx 转发到对应的路由，并提供负载均衡能力</li>
<li>鉴权/限流/熔断/降级：这些是网关层支持的通用能力，无业务逻辑</li>
<li>协议转换：解析 http 请求信息，通过泛化调用到 RPC/Http/函数化服务，最终返回结果。</li>
</ul>
<blockquote>
<p>API 网关是公司的基础层服务，业务 RD 会在此配置接口信息、限流降级等。</p>
</blockquote>
<h3 id="_1-2-服务治理平台" tabindex="-1"><a class="header-anchor" href="#_1-2-服务治理平台"><span>1.2 服务治理平台</span></a></h3>
<blockquote>
<p>OCTO：<a href="https://tech.meituan.com/2021/03/08/octo-2.0-service-mesh.html" target="_blank" rel="noopener noreferrer">https://tech.meituan.com/2021/03/08/octo-2.0-service-mesh.html</a></p>
<p><a href="https://juejin.cn/post/7251501762817065016" target="_blank" rel="noopener noreferrer">https://juejin.cn/post/7251501762817065016</a></p>
</blockquote>
<p>微服务系统数量过于庞大，通常会有一个服务治理平台用于实现微服务的注册与发现，这部分也属于基础层服务。微服务启动时会将地址（IP PORT）注册到治理平台，以便 API 网关发现可用的微服务实例并完成路由。</p>
<blockquote>
<p>QA 使用场景：</p>
<ul>
<li>接口自动化实现泛化调用</li>
<li>压测性能指标监控</li>
<li>测试环境管理</li>
</ul>
</blockquote>
<h3 id="_1-3-springboot-存储-中间件" tabindex="-1"><a class="header-anchor" href="#_1-3-springboot-存储-中间件"><span>1.3 SpringBoot/存储/中间件</span></a></h3>
<p>这是业务逻辑的实现，SpringBoot 通常会分为：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>- Controller：流量入口，包含参数处理、权限控制、数据转化等</span></span>
<span class="line"><span>- Biz/Service：实现核心业务逻辑。Service 层会实现因业务域内的数据处理与事务控制，通常涉及与微服务系统、dao 层、LocalCache、分布式缓存、OSS、第三方 API 等众多组件的交互。</span></span>
<span class="line"><span>- Dao：主要提供数据操作接口</span></span>
<span class="line"><span>- Cron：定时任务</span></span>
<span class="line"><span>- Config：常用组件的配置</span></span>
<span class="line"><span>- Model/Domain：数据实体定义</span></span>
<span class="line"><span>- Common：通用工具</span></span>
<span class="line"><span>- Export：接口定义层</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试需要关注的点：<a href="https://tech.qimao.com/fu-wu-duan-ce-shi-zhu-yi-dian-pou-xi/" target="_blank" rel="noopener noreferrer">https://tech.qimao.com/fu-wu-duan-ce-shi-zhu-yi-dian-pou-xi/</a></p>
<ol>
<li>核心功能正常，是否与接口文档一致</li>
<li>数据流转正确（增-&gt;查-&gt;改-&gt;查-&gt;删-&gt;查）</li>
<li>rpc/db/中间件的异常调用（业务 error/幂等校验/超时）</li>
<li>DB/中间件常见测试点
<ul>
<li>redis：缓存时间/缓存穿透/一致性等</li>
<li>mySQL：事务、分库分表查询、锁、索引</li>
<li>MQ：消费异常/消息丢失</li>
</ul>
</li>
</ol>
<h3 id="_1-4-ci-cd" tabindex="-1"><a class="header-anchor" href="#_1-4-ci-cd"><span>1.4 CI/CD</span></a></h3>
<p>&quot;变更管控&quot;也是预防线上故障的一大专项，通常会依托于 devOps 流水线以及各个原子能力。</p>
<h3 id="_1-5-日志管理-链路追踪" tabindex="-1"><a class="header-anchor" href="#_1-5-日志管理-链路追踪"><span>1.5 日志管理/链路追踪</span></a></h3>
<blockquote>
<p>熟练使用各种运维工具也很有帮助</p>
</blockquote>
<ul>
<li>ELK 日志平台可以让我们快速定位 bug 或者验证某个功能点（比如很多第三方请求是否参数正确）</li>
<li>每周 error 日志巡检有助于发现未反馈的线上问题</li>
<li>Promethus+Grafana 可以关注业务/机器数据（上线观测、故障排查、压测观察等场景非常有用）</li>
<li>traceId 在微服务中非常重要，可以根据它生成调用链路，辅助我们更加精准的测试</li>
</ul>
<h2 id="二、常用的工具-平台" tabindex="-1"><a class="header-anchor" href="#二、常用的工具-平台"><span>二、常用的工具/平台</span></a></h2>
<ul>
<li>抓包工具：Charles/Fiddler</li>
<li>泛接口自动化：testNG/pytest/robotFramework</li>
<li>精准测试：jacoco</li>
<li>流量回放：FTF/jvm-sandbox/mock</li>
<li>UI 自动化：Selenium/UI-automation</li>
<li>监控告警：CAT/Raptor</li>
<li>性能/故障：Quake/Rhino/Chaos</li>
<li>服务治理：OCTO</li>
<li>CICD：Jenkins/devops</li>
</ul>
<h2 id="三、服务端专项" tabindex="-1"><a class="header-anchor" href="#三、服务端专项"><span>三、服务端专项</span></a></h2>
<Tabs id="221" :data='[{"id":"接口自动化"},{"id":"性能测试"},{"id":"监控告警治理"},{"id":"资损防控"},{"id":"故障演练"},{"id":"质量内建"}]'>
<template #title0="{ value, isActive }">接口自动化</template>
<template #title1="{ value, isActive }">性能测试</template>
<template #title2="{ value, isActive }">监控告警治理</template>
<template #title3="{ value, isActive }">资损防控</template>
<template #title4="{ value, isActive }">故障演练</template>
<template #title5="{ value, isActive }">质量内建</template>
<template #tab0="{ value, isActive }">
<p>接口级巡检&amp;回归测试，提升效率，保障核心功能</p>
<p>See Detail <a href="https://swtywang.fun/posts/QA/08%20%E6%B5%8B%E8%AF%95%E4%B8%93%E9%A1%B9%20-%20%E6%8E%A5%E5%8F%A3%E8%87%AA%E5%8A%A8%E5%8C%96%E6%B5%8B%E8%AF%95.html" target="_blank" rel="noopener noreferrer">接口自动化</a></p>
</template>
<template #tab1="{ value, isActive }">
<p>评估系统的能力、识别性能瓶颈并改进，确保性能符合预期</p>
<p>See Detail <a href="http://localhost:8080/posts/QA/09%20%E6%B5%8B%E8%AF%95%E4%B8%93%E9%A1%B9%20-%20%E5%85%A8%E9%93%BE%E8%B7%AF%E5%8E%8B%E6%B5%8B%E4%B8%8E%E6%95%85%E9%9A%9C%E6%BC%94%E7%BB%83.html" target="_blank" rel="noopener noreferrer">全链路压测</a></p>
</template>
<template #tab2="{ value, isActive }">
<p>快速发现响应线上问题，降低 MTTR 时间，为质量兜底</p>
<p>See Detail <a href="https://swtywang.fun/posts/QA/07%20%E6%B5%8B%E8%AF%95%E4%B8%93%E9%A1%B9%20-%20%E7%9B%91%E6%8E%A7%E6%B2%BB%E7%90%86%E3%80%81%E5%BC%BA%E5%BC%B1%E4%BE%9D%E8%B5%96%E6%B2%BB%E7%90%86.html" target="_blank" rel="noopener noreferrer">监控治理</a></p>
</template>
<template #tab3="{ value, isActive }">
<p>See Detail <a href="http://swtywang.fun/posts/QA/05%20%E6%B5%8B%E8%AF%95%E4%B8%93%E9%A1%B9%20-%20%E8%B5%84%E6%8D%9F%E9%98%B2%E6%8E%A7.html" target="_blank" rel="noopener noreferrer">资损防控</a></p>
</template>
<template #tab4="{ value, isActive }">
<p>模拟线上可能出现的故障场景，提升系统稳定性</p>
<p>See Detail <a href="https://swtywang.fun/posts/%E8%BF%90%E7%BB%B4/00%20%E6%B7%B7%E6%B2%8C%E5%B7%A5%E7%A8%8B.html" target="_blank" rel="noopener noreferrer">故障演练</a></p>
</template>
<template #tab5="{ value, isActive }">
<p>将质量保证活动融入到整个开发过程中，确保每个环节都产出高质量的成果</p>
<p>See Detail <a href="https://swtywang.fun/posts/QA/06%20%E6%B5%8B%E8%AF%95%E4%B8%93%E9%A1%B9%20-%20%E8%B4%A8%E9%87%8F%E5%86%85%E5%BB%BA.html" target="_blank" rel="noopener noreferrer">质量内建</a></p>
</template>
</Tabs>
<h2 id="四、测试关注点" tabindex="-1"><a class="header-anchor" href="#四、测试关注点"><span>四、测试关注点</span></a></h2>
<h3 id="_4-1-幂等性" tabindex="-1"><a class="header-anchor" href="#_4-1-幂等性"><span>4.1 幂等性</span></a></h3>
<p>幂等意味着多次执行所产生的影响和一次执行的影响相同，多见于写操作场景。比如对同一笔订单，收到一次支付回调和多次应该是一致的。</p>
<h4 id="技术手段如何保证幂等性" tabindex="-1"><a class="header-anchor" href="#技术手段如何保证幂等性"><span>技术手段如何保证幂等性？</span></a></h4>
<ol>
<li>分布式锁
<ul>
<li>乐观锁（冲突概率不高，一旦冲突就报错，让用户决定）
<ul>
<li>版本号机制：select + version （支付退款场景会使用，适用于重复写不多的情况）</li>
<li>CAS：通过 compare and set 原子操作实现（ABA 不适用）</li>
</ul>
</li>
<li>数据库加行锁 表锁</li>
<li>数据库加唯一索引</li>
<li>Redis 实现分布式锁</li>
</ul>
</li>
<li>唯一业务单号：例如支付系统就是支付流水号 payNo</li>
</ol>
<h4 id="如何测试幂等" tabindex="-1"><a class="header-anchor" href="#如何测试幂等"><span>如何测试幂等？</span></a></h4>
<p>1.在需求评审以及技术方案评审阶段，识别出需要实现幂等的接口，check 是否实现。（通常是写接口，比如发券，支付通知，支付提交等等） 2.可以借助 charles、多次调用接口等方式测试，提升效率 3.测试前应梳理出两条链路：第一条是首次执行时候的数据链路；第二条是多次调用的数据链路，check 是否符合预期</p>
<h3 id="_4-2-逻辑兼容性" tabindex="-1"><a class="header-anchor" href="#_4-2-逻辑兼容性"><span>4.2 逻辑兼容性</span></a></h3>
<h4 id="case1-改动已有功能前后端交互逻辑-需要考虑新老版本用户是否兼容" tabindex="-1"><a class="header-anchor" href="#case1-改动已有功能前后端交互逻辑-需要考虑新老版本用户是否兼容"><span>Case1. 改动已有功能前后端交互逻辑，需要考虑新老版本用户是否兼容</span></a></h4>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>章节自动购买逻辑判断</span></span>
<span class="line"><span>   1. 老版本：自动购买状态存储在 user_book 表，当用户没有设置自动购买时，分销商用户默认自动购买，自然量用户不自动购买</span></span>
<span class="line"><span>   2. 新版本：自动购买状态改存在 user_attr 表，兜底逻辑没变</span></span>
<span class="line"><span>   3. 这样的话，老版本用户在 user_attr 表的状态都没有，所以都进入了兜底逻辑，不符合预期</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="case-2-在原有接口做的改动-改动已有字段的判断-取数-写入逻辑-这个时候一定要梳理清楚该字段的数据链路-否则会留坑" tabindex="-1"><a class="header-anchor" href="#case-2-在原有接口做的改动-改动已有字段的判断-取数-写入逻辑-这个时候一定要梳理清楚该字段的数据链路-否则会留坑"><span>Case 2. 在原有接口做的改动，改动已有字段的判断/取数/写入逻辑：这个时候一定要梳理清楚该字段的数据链路，否则会留坑</span></a></h4>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>- 某次需求增加了对 templatedId 非空的校验，导致部分不需要传该字段的下单场景失败</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- 存储在extra字段中device字段的类型（写入时），但是并没有修改读该字段的场景，导致读取的device_id都是0，订单归属异常</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="case-3-如果活动生效时间不是上线时间-需要在真实生效时间观察-例如-1-月-1-日晚-20-点上线了新代码-但是活动是在-1-月-5-日早-10-点生效-那么需要在这两个时间都留意线上监控情况" tabindex="-1"><a class="header-anchor" href="#case-3-如果活动生效时间不是上线时间-需要在真实生效时间观察-例如-1-月-1-日晚-20-点上线了新代码-但是活动是在-1-月-5-日早-10-点生效-那么需要在这两个时间都留意线上监控情况"><span>Case 3. 如果活动生效时间不是上线时间，需要在真实生效时间观察：例如 1 月 1 日晚 20 点上线了新代码，但是活动是在 1 月 5 日早 10 点生效，那么需要在这两个时间都留意线上监控情况</span></a></h4>
<h4 id="case4-测试代码兼容性" tabindex="-1"><a class="header-anchor" href="#case4-测试代码兼容性"><span>Case4. 测试代码兼容性</span></a></h4>
<h2 id="五、熟悉代码" tabindex="-1"><a class="header-anchor" href="#五、熟悉代码"><span>五、熟悉代码</span></a></h2>
<p>&quot;代码变更&quot;是线上故障的主要归因，也是服务端 QA 关注重点，因此有必要投入时间熟悉核心功能的代码实现，掌握梳理调用链路。虽然前期来看这是一件 ROI 较低的事情，但是长期来看很有帮助：</p>
<ul>
<li>
<p>并没有想象中花费时间：</p>
<ul>
<li>首先，业务真正核心的接口不多，并且复杂需求大多围绕核心接口做功能扩展或者改造（以支付系统为例，80%的需求都集中在&quot;预支付&quot;、&quot;提交支付&quot;、&quot;退款&quot;这几个接口上）。所以从梳理成本上看，是属于前期投入较高，后面会越来越轻松，如果已有梳理好的文档更是事半功倍。 PS：核心接口一般是 C 端调用的 HTTP 请求，按调用量排序取 TopN。</li>
<li>并不需要记住每一行代码，重点关注&quot;系统间&amp;第三方 API 调用&quot;、&quot;数据&amp;缓存读取/写入&quot;以及一些特殊实现。</li>
</ul>
</li>
<li>
<p>测试工具在懂代码的 QA 手中更有用</p>
<p>以精准测试为例，虽然许多大厂已经提供了功能完善的工具以及使用手册，但是业务落地时的效果&quot;参差不齐&quot;，我认为主要是因为工具只能给出辅助客观的数据，关键还是 QA 工程师自身的能力对这些数据做出判断与响应。这通常是要求具备基础的代码能力和业务代码的熟悉。</p>
</li>
<li>
<p>许多测试专项本质上就是代码梳理：</p>
<p>我们开展过很多测试专项（强弱依赖治理、监控告警治理等等），这些专项通常的达成路径是工具组 QA 生成现状数据 -&gt; 业务 QA 推动 RD 去 check 补充 -&gt; 业务 QA 收集汇总，推动 RD 改进 -&gt; 持续收集数据，查看对应专项的北极星指标。在实际的落地过程中，会有几个问题：</p>
<ul>
<li>如果对代码没有了解，业务 QA 无法判断生成数据和 RD 确认数据的准确性和效果</li>
<li>过于依赖 RD，业务 QA 很容易成为工具人，两头懵</li>
</ul>
</li>
<li>
<p>从看懂代码到写代码：</p>
<p>QA 在完成业务测试之余，通常还会做一些平台开发的工作，通常会使用与业务相同的技术栈，多学习 RD 代码也对自己写代码很有帮助。</p>
</li>
</ul>
</div></template>


