<template><div><h2 id="服务端在测什么" tabindex="-1"><a class="header-anchor" href="#服务端在测什么"><span>服务端在测什么</span></a></h2>
<blockquote>
<p>微服务已成为主流的系统架构，只有对整体架构有了一定了解后，QA 才能更清楚需要测试什么，在哪些地方会存在风险。</p>
</blockquote>
<p>下图展示了微服务的全景组成，也很清晰的展示了一条请求的完整链路。各大互联网公司都会在此基础上开发更加定制化的组件。</p>
<figure><img src="https://swtywang.fun/minio/blog/8142ce5cb9e65c10c6e24c70ca3e9cfc.webp" alt="Spring Cloud微服务架构图" tabindex="0" loading="lazy"><figcaption>Spring Cloud微服务架构图</figcaption></figure>
<h3 id="服务网关" tabindex="-1"><a class="header-anchor" href="#服务网关"><span>服务网关</span></a></h3>
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
<h3 id="服务治理平台" tabindex="-1"><a class="header-anchor" href="#服务治理平台"><span>服务治理平台</span></a></h3>
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
<h3 id="springboot-存储-中间件" tabindex="-1"><a class="header-anchor" href="#springboot-存储-中间件"><span>SpringBoot/存储/中间件</span></a></h3>
<p>这是业务逻辑的实现，SpringBoot 通常会分为：</p>
<ul>
<li>Controller：流量入口，包含参数处理、权限控制、数据转化等</li>
<li>Biz/Service：实现核心业务逻辑。Service 层会实现因业务域内的数据处理与事务控制，通常涉及与微服务系统、dao 层、LocalCache、分布式缓存、OSS、第三方 API 等众多组件的交互。</li>
<li>Dao：主要提供数据操作接口</li>
<li>Cron：定时任务</li>
<li>Config：常用组件的配置</li>
<li>Model/Domain：数据实体定义</li>
<li>Common：通用工具</li>
<li>Export：接口定义层</li>
</ul>
<p>测试需要关注的点：<a href="https://tech.qimao.com/fu-wu-duan-ce-shi-zhu-yi-dian-pou-xi/" target="_blank" rel="noopener noreferrer">https://tech.qimao.com/fu-wu-duan-ce-shi-zhu-yi-dian-pou-xi/</a></p>
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
<h3 id="ci-cd" tabindex="-1"><a class="header-anchor" href="#ci-cd"><span>CI/CD</span></a></h3>
<p>&quot;变更管控&quot;也是预防线上故障的一大专项，通常会依托于 devOps 流水线以及各个原子能力。</p>
<h3 id="日志管理-链路追踪" tabindex="-1"><a class="header-anchor" href="#日志管理-链路追踪"><span>日志管理/链路追踪</span></a></h3>
<blockquote>
<p>熟练使用各种运维工具也是很有帮助的</p>
</blockquote>
<ul>
<li>ELK 日志平台可以让我们快速定位 bug 或者验证某个功能点（比如很多第三方请求是否参数正确）</li>
<li>每周 error 日志巡检有助于发现未反馈的线上问题</li>
<li>Promethus+Grafana 可以关注业务/机器数据（上线观测、故障排查、压测观察等场景非常有用）</li>
<li>traceId 在微服务中非常重要，可以根据它生成调用链路，辅助我们更加精准的测试</li>
</ul>
<h2 id="服务端测试流程" tabindex="-1"><a class="header-anchor" href="#服务端测试流程"><span>服务端测试流程</span></a></h2>
<h3 id="测试前" tabindex="-1"><a class="header-anchor" href="#测试前"><span>测试前：</span></a></h3>
<ol>
<li>
<p>需求评审：</p>
<p>理解业务是第一要义，在梳理清楚需求点以及交互后，可以尝试做下面的事情（挑重点需求，毕竟没那么多时间）：思考如果是自己来设计技术方案该怎么做（包含不限于 ① 主流程的时序图 ② 涉及的接口，每个接口要处理的核心逻辑以及用到的中间件 ③ 会有哪些异常场景 ④ 自己的方案可能会产生或者无法解决什么问题）。</p>
<p>我认为这个过程很有帮助：1）主动思考后产生的想法和问题，会让后面的技术评审、用例编写等环节更充分有效，不会变成 QA/RD 一方的表演，会碰撞出很多隐藏问题 2）不断提升自己的技术能力与业务理解，一方面可以发现更多系统设计上的缺陷 提升代码质量，另一方面大部分的测试平台会使用与业务一致的技术栈，在平台开发时更加得心应手 3）与研发可以平等交流，增进信任度。很多业务线研发认为 QA 只会点点点，往往并不愿意与 QA 进行很深入的交流，QA 在推动质量专项时也会很被动</p>
</li>
<li>
<p>技术评审：</p>
<p>在这个环节 QA 需要搞定这几件事：1）熟悉 RD 的技术方案，先看技术方案完备度（应该有一个技术方案模板） 2）主流程是否遗漏或存在逻辑漏洞 3）结合自己此前的思考，将疑问与 RD 交流</p>
</li>
<li>
<p>用例编写：</p>
<p>我一般写服务端测试用例的思路是：</p>
<ol>
<li>【新】依照时序图，将一个完整流程按拆分为独立的多个独立模块/接口</li>
<li>【新】对于每个模块/接口，列出接口文档、接口核心改动逻辑、数据存储&amp;中间件校验点以及异常场景，标注优先级</li>
<li>【回归】反模式补充：结合之前踩过的坑以及线上问题，补充 case</li>
<li>【回归】主流程：结合测试模板，加入主流程的回归 case</li>
<li>在这个过程中，如果对技术方案或者需求有些疑问，阻塞的即使沟通，不阻塞的在用例评审时沟通</li>
<li>脑海里提前过一遍测试可能遇到的可测性问题，给一个初版解决方案</li>
</ol>
</li>
<li>
<p>用例评审：</p>
<p>提前发出自己的用例，评审时 P0/P1 逐条过，P2/P3 如果太多可以简要过（毕竟精力有限，如果上百条无关紧要的 case 也要挨个念，RD 可能会抓不到重点），将自己的疑问都沟通明白</p>
<p>（这里留个疑问：在字节的时候大家都很忙，用例评审经常就是走个流程，直到出了事故复盘时才发现遗漏了一些 case，如何提升用例评审的效果和参与度？）</p>
</li>
<li>
<p>准入：这没啥说的，按照准入标准（自动化、冒烟用例、静态扫描、FTF）缺一不可</p>
</li>
</ol>
<h3 id="测试中" tabindex="-1"><a class="header-anchor" href="#测试中"><span>测试中：</span></a></h3>
<p>依照测试用例严格执行（测试 Case 需要有明确的校验点和可执行性），测试过程中可能用到的方法：</p>
<ul>
<li>postman、charles 等接口工具，也有 rpc 转 http 的工具</li>
<li>代码 debug</li>
<li>Mock 数据（上下游、系统内、第三方）</li>
<li>端到端测试</li>
<li>日志分析</li>
<li>代码覆盖率</li>
<li>使用各种中间件工具（DB、MQ、Cache、ES……）</li>
</ul>
<h3 id="测试后" tabindex="-1"><a class="header-anchor" href="#测试后"><span>测试后</span></a></h3>
<ol>
<li>
<p>准出：</p>
<p>自动化+FTF+行覆盖率+代码扫描+缺陷修复率+用例执行率+是否通过代码 review</p>
</li>
<li>
<p>上线：</p>
<p>分级发布，观察日志，及时回归</p>
</li>
<li>
<p>补充核心功能自动化用例、压测…</p>
</li>
</ol>
<h2 id="qa-常用的工具-平台" tabindex="-1"><a class="header-anchor" href="#qa-常用的工具-平台"><span>QA 常用的工具/平台</span></a></h2>
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
<h2 id="qa-专项" tabindex="-1"><a class="header-anchor" href="#qa-专项"><span>QA 专项</span></a></h2>
<h3 id="质量预防" tabindex="-1"><a class="header-anchor" href="#质量预防"><span>质量预防</span></a></h3>
<ul>
<li>目标：提升研发过程质量（代码规范度与代码质量、CR 质量与技术方案质量等）</li>
</ul>
<h3 id="自动化测试" tabindex="-1"><a class="header-anchor" href="#自动化测试"><span>自动化测试</span></a></h3>
<ul>
<li>目标：巡检 + 提效</li>
</ul>
<h3 id="性能测试" tabindex="-1"><a class="header-anchor" href="#性能测试"><span>性能测试</span></a></h3>
<ul>
<li>目标：评估系统的能力、识别性能瓶颈并改进，确保性能符合预期</li>
</ul>
<h3 id="监控告警治理" tabindex="-1"><a class="header-anchor" href="#监控告警治理"><span>监控告警治理</span></a></h3>
<ul>
<li>目标：快速发现响应线上问题，MTTR 时间低于 xxx</li>
</ul>
<h3 id="资损防控" tabindex="-1"><a class="header-anchor" href="#资损防控"><span>资损防控</span></a></h3>
<ul>
<li>目标：针对有支付场景的业务，建立资损防控保障体系，避免资损事故</li>
</ul>
<h3 id="故障演练" tabindex="-1"><a class="header-anchor" href="#故障演练"><span>故障演练</span></a></h3>
<ul>
<li>目标：模拟线上可能出现的故障场景，提升系统稳定性</li>
</ul>
<h3 id="质量度量与运营" tabindex="-1"><a class="header-anchor" href="#质量度量与运营"><span>质量度量与运营</span></a></h3>
<ul>
<li>版本度量运营</li>
<li>事故复盘与改进</li>
<li>其他专项中的度量运营</li>
</ul>
<h3 id="其他" tabindex="-1"><a class="header-anchor" href="#其他"><span>其他</span></a></h3>
<p>其他诸如变更管控等专项还有很多，需要根据业务线的质量现状与目标做相应的应对措施。</p>
<h2 id="懂代码更好测" tabindex="-1"><a class="header-anchor" href="#懂代码更好测"><span>懂代码更好测</span></a></h2>
<p>&quot;代码变更&quot;是线上故障的主要归因，也是服务端 QA 关注的重点。服务端 QA 是需要投入一定的时间熟悉核心功能的代码实现，掌握梳理调用链路。虽然前期来看这是一件 ROI 较低的事情，但是长期来看很有帮助（个人看法）：</p>
<ul>
<li>
<p>并没有想象中花费时间：</p>
<ul>
<li>首先，业务真正核心的接口并不多，并且复杂需求大多围绕核心接口做功能扩展或者改造（以支付系统为例，80%的需求都集中在&quot;预支付&quot;、&quot;提交支付&quot;、&quot;退款&quot;这几个接口上）。所以从梳理成本上看，是属于前期投入较高，后面会越来越轻松，如果已有梳理好的文档更是事半功倍。 PS：核心接口一般是 C 端调用的 HTTP 请求，按调用量排序取 TopN。</li>
<li>其次，我们并不需要记住每一行代码，重点关注&quot;系统间&amp;第三方 API 调用&quot;、&quot;数据&amp;缓存读取/写入&quot;以及一些特殊实现。</li>
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
<p>【有道云笔记】服务端测试总结<br>
<a href="https://note.youdao.com/s/4PAfl5Cq" target="_blank" rel="noopener noreferrer">https://note.youdao.com/s/4PAfl5Cq</a></p>
</div></template>


