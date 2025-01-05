<template><div><h2 id="全链路压测基本流程" tabindex="-1"><a class="header-anchor" href="#全链路压测基本流程"><span>全链路压测基本流程</span></a></h2>
<blockquote>
<p><a href="https://tech.meituan.com/2019/02/14/full-link-pressure-test-automation.html" target="_blank" rel="noopener noreferrer">全链路压测自动化实践</a></p>
</blockquote>
<h3 id="step1-目标预估" tabindex="-1"><a class="header-anchor" href="#step1-目标预估"><span>Step1. 目标预估</span></a></h3>
<ol>
<li>预估票房区间 =&gt; 大数据</li>
<li>压测目标值 = 预估值 * X</li>
</ol>
<p>核心链路梳理 + 历史同期 Top 接口 + 近期 Top 接口 =&gt; 系统范围、接口 QPS/占比</p>
<h3 id="step2-压测方案与准备" tabindex="-1"><a class="header-anchor" href="#step2-压测方案与准备"><span>Step2. 压测方案与准备</span></a></h3>
<ul>
<li>
<p>压测方案制定</p>
<ul>
<li>压测时间</li>
<li>压测场景（单接口/链路）</li>
<li>接口 QPS 配比</li>
<li>监控情况</li>
<li>停止压测的标准（正向/负向）</li>
<li>......</li>
</ul>
</li>
<li>
<p>压测改造</p>
<ul>
<li>新增/改动服务</li>
<li>新增/改动中间件/DB （影子表）</li>
<li>新增/改动外部调用</li>
<li>......</li>
</ul>
</li>
<li>
<p>压测数据</p>
<ul>
<li>是否符合实际场景</li>
</ul>
</li>
</ul>
<h3 id="step3-压测执行" tabindex="-1"><a class="header-anchor" href="#step3-压测执行"><span>Step3. 压测执行</span></a></h3>
<h4 id="_3-1-小流量试压" tabindex="-1"><a class="header-anchor" href="#_3-1-小流量试压"><span>3.1 小流量试压</span></a></h4>
<ul>
<li>验证是否走通</li>
<li>配比是否正确</li>
</ul>
<h4 id="_3-2-正式压测" tabindex="-1"><a class="header-anchor" href="#_3-2-正式压测"><span>3.2 正式压测</span></a></h4>
<ul>
<li>压测周知</li>
<li>压测执行与监控
<ul>
<li>查看监控异常（用户反馈/服务/机器...）</li>
<li>收集数据</li>
<li>记录异常问题&amp;原因</li>
<li>判断是否需要终止压测</li>
</ul>
</li>
<li>压测后：重启服务，回归核心功能</li>
</ul>
<h3 id="step4-结果分析" tabindex="-1"><a class="header-anchor" href="#step4-结果分析"><span>Step4. 结果分析</span></a></h3>
<ol>
<li>压测结论</li>
<li>指标数据</li>
<li>压测过程</li>
<li>问题和解决方案</li>
<li>TODO</li>
</ol>
<h2 id="主流压测方案" tabindex="-1"><a class="header-anchor" href="#主流压测方案"><span>主流压测方案</span></a></h2>
<h2 id="美团-quake-压测平台" tabindex="-1"><a class="header-anchor" href="#美团-quake-压测平台"><span>美团 Quake 压测平台</span></a></h2>
<blockquote>
<p>日常压测会用到 Quake 平台，公司也在自研，正好 Quake 提供了很详细的技术文档 简单了解下。<br>
<a href="https://tech.meituan.com/2018/09/27/quake-introduction.html" target="_blank" rel="noopener noreferrer">全链路压测平台（Quake）在美团中的实践</a></p>
</blockquote>
<h3 id="数据构造" tabindex="-1"><a class="header-anchor" href="#数据构造"><span>数据构造</span></a></h3>
<blockquote>
<p>这里主要流量录制的部分，暂不考虑 QA 自己造数据</p>
</blockquote>
<h4 id="http" tabindex="-1"><a class="header-anchor" href="#http"><span>HTTP</span></a></h4>
<p>对于 HTTP 服务，在 Nginx 层都会产生请求的访问日志，我们对这些日志进行了统一接入，变成符合压测需要的流量数据。</p>
<figure><img src="https://awps-assets.meituan.net/mit-x/blog-images-bundle-2018b/59bfdba0.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<ul>
<li>nginx-&gt;quake hive 是全量的日志</li>
<li>根据 appkey + 接口 uri 过滤 hive 日志</li>
<li><strong>词表：压测所需的元数据，每一行代表一个请求，包含请求的 method、path、params、header、body 等等。</strong></li>
<li>其他的方案还有 tcpCopy</li>
</ul>
<h4 id="rpc" tabindex="-1"><a class="header-anchor" href="#rpc"><span>RPC</span></a></h4>
<p>由于 RPC 量级太大，无法采用 HTTP 的方案，这里使用对线上服务进行实时流量录制，结合 RPC 框架提供的录制功能，对集群中的某几台机器开启录制，根据要录制的接口和方法名，将请求数据上报到录制流量的缓冲服务（Broker）中，再由 Broker 生成最终的压测词表，上传到存储平台（S3）。</p>
<figure><img src="https://awps-assets.meituan.net/mit-x/blog-images-bundle-2018b/ad262e22.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<ul>
<li>
<p>RPC 协议录制方案</p>
<ul>
<li>代理模式</li>
<li>拦截器</li>
<li>中间件</li>
<li>AOP</li>
</ul>
</li>
<li>
<p>词表文件为什么需要分片，如何分片？</p>
<ul>
<li>原因：后续压测肯定是由一个分布式的压测集群进行流量的打入，考虑到单机拉取词表的速度和加载词表的大小限制，如果将词表进行分片的话，可以有助于任务调度更合理的进行分配</li>
<li>怎么做？</li>
</ul>
</li>
</ul>
<h3 id="数据隔离" tabindex="-1"><a class="header-anchor" href="#数据隔离"><span>数据隔离</span></a></h3>
<ul>
<li>跨线程的透传 - ThreadLocal</li>
<li>跨服务间的透传 - Mtrace</li>
<li>影子表<br>
<img src="https://awps-assets.meituan.net/mit-x/blog-images-bundle-2018b/921ba011.png" alt="img" loading="lazy"></li>
</ul>
<h3 id="调度中心" tabindex="-1"><a class="header-anchor" href="#调度中心"><span>调度中心</span></a></h3>
<blockquote>
<p>大脑</p>
</blockquote>
<figure><img src="https://awps-assets.meituan.net/mit-x/blog-images-bundle-2018b/e8466c97.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<h3 id="性能优化" tabindex="-1"><a class="header-anchor" href="#性能优化"><span>性能优化</span></a></h3>
<ul>
<li>
<p>Reactor 多线程模型</p>
</li>
<li>
<p>业务逻辑与 IO 读写事件分离</p>
</li>
</ul>
<blockquote>
<p><a href="https://developer.aliyun.com/article/982802" target="_blank" rel="noopener noreferrer">https://developer.aliyun.com/article/982802</a></p>
<p><a href="https://zhuanlan.zhihu.com/p/656615842" target="_blank" rel="noopener noreferrer">https://zhuanlan.zhihu.com/p/656615842</a></p>
</blockquote>
<p>故障演练：</p>
<p><a href="https://testerhome.com/topics/40077" target="_blank" rel="noopener noreferrer">https://testerhome.com/topics/40077</a></p>
</div></template>


