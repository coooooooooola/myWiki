<template><div><blockquote>
<p>UI 自动化平台有并发执行和本地调试的诉求，需要使用到<a href="https://www.selenium.dev/documentation/grid/" target="_blank" rel="noopener noreferrer">Selenium Grid</a>，学习一下</p>
</blockquote>
<h2 id="基本介绍" tabindex="-1"><a class="header-anchor" href="#基本介绍"><span>基本介绍</span></a></h2>
<p>Selenium Grid 通过将客户端发送的命令路由到远程浏览器实例，允许在远程机器上执行 WebDriver 脚本。基本功能：</p>
<ul>
<li>
<p>提供一种在多台机器上并行运行测试的方法</p>
</li>
<li>
<p>允许在不同浏览器版本上进行测试</p>
</li>
<li>
<p>支持本地调试</p>
</li>
<li>
<p>实现跨平台测试</p>
</li>
</ul>
<h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用"><span>使用</span></a></h2>
<h3 id="准备环境" tabindex="-1"><a class="header-anchor" href="#准备环境"><span>准备环境</span></a></h3>
<ul>
<li><a href="https://www.selenium.dev/blog/2023/java-8-support/" target="_blank" rel="noopener noreferrer">Java11+</a></li>
<li>浏览器按照</li>
<li>相应版本的 webdriver</li>
<li><a href="https://github.com/SeleniumHQ/selenium/releases/tag/selenium-4.23.0" target="_blank" rel="noopener noreferrer">Selenium-server-xxx.jar</a></li>
</ul>
<h3 id="启动命令" tabindex="-1"><a class="header-anchor" href="#启动命令"><span>启动命令</span></a></h3>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">java</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> selenium-server-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">versio</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">n></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">.jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> standalone</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>配置 remotUrl = <a href="http://localhost:4444" target="_blank" rel="noopener noreferrer">http://localhost:4444</a></p>
<h3 id="基本框架" tabindex="-1"><a class="header-anchor" href="#基本框架"><span>基本框架</span></a></h3>
<figure><img src="https://www.selenium.dev/images/documentation/grid/components.png" alt="Selenium4基本框架" tabindex="0" loading="lazy"><figcaption>Selenium4基本框架</figcaption></figure>
<h4 id="_1-router" tabindex="-1"><a class="header-anchor" href="#_1-router"><span>1. Router</span></a></h4>
<p>路由器是 Selenium Grid 的入口，它负责接收所有外部请求，并将它们转发到正确的地方。</p>
<ul>
<li>
<p>如果 Router 收到新的会话请求，它将被转发到新会话队列。</p>
</li>
<li>
<p>如果请求是已有的会话，路由器将查询会话映射以获取会话正在运行的节点 ID，然后将请求直接转发到节点。</p>
</li>
</ul>
<p>路由器通过将请求发送到能够更好地处理它们的组件来平衡网格中的负载，而不会使过程中不需要的任何组件过载。</p>
<h4 id="_2-distributor" tabindex="-1"><a class="header-anchor" href="#_2-distributor"><span>2. Distributor</span></a></h4>
<p>Distributor 主要有两个功能：</p>
<ul>
<li>
<p>注册并跟踪所有节点及其功能<br>
节点通过事件总线发送节点注册事件，向分发器注册。分发器读取该事件，然后尝试通过 HTTP 访问节点以确认其存在。如果请求成功，分发器将注册节点并通过 GridModel 跟踪所有节点的功能。</p>
</li>
<li>
<p>查询新会话队列并处理任何待处理的新会话请求<br>
当新会话请求发送到路由器时，它将被转发到新会话队列，并在队列中等待。Distributor 将轮询新会话队列以查找待处理的新会话请求，然后找到可以创建会话的合适节点。创建会话后，Distributor 将 Session ID 和 Session Node 的映射关系存储在 Session Map</p>
</li>
</ul>
<h4 id="_3-session-map" tabindex="-1"><a class="header-anchor" href="#_3-session-map"><span>3. Session Map</span></a></h4>
<p>Session Map 是一个数据存储，用于保存正在运行的 Session ID 与 Session Node 映射关系。它支持路由器将请求转发到节点。Router 将向 Session Map 询问与 Session ID 关联的节点</p>
<h4 id="_4-session-queue" tabindex="-1"><a class="header-anchor" href="#_4-session-queue"><span>4. Session Queue</span></a></h4>
<p>以 FIFO 顺序保存所有新会话请求。路由器将新会话请求添加到 Session Queue 并等待响应。Session Queue 定期检查队列中是否有任何请求已超时，如果是，则立即拒绝并删除该请求。</p>
<p>Router 定期检查是否有可用插槽。如果有，Router 将轮询 Session Queue 以查找第一个匹配的请求。然后，Distributor 尝试创建新会话。</p>
<p>一旦请求的功能与任何空闲节点插槽的功能匹配，分发器就会尝试获取可用插槽。如果所有插槽都忙，分发器会将请求发送回队列。如果请求在重试或添加到队列前面时超时，它将被拒绝。</p>
<p>会话创建成功后，Distributor 将会话信息发送到 Session Queue，然后 Session Queue 再发送回路由器，最后发送至客户端。</p>
<h4 id="_5-node" tabindex="-1"><a class="header-anchor" href="#_5-node"><span>5. Node</span></a></h4>
<p>网格可以包含多个节点。每个节点管理其运行所在机器的可用浏览器的插槽。节点通过事件总线将自身注册到分发器，其配置作为注册消息的一部分发送。</p>
<p>默认情况下，节点会自动注册其运行所在机器路径上的所有可用浏览器驱动程序。它还为每个可用 CPU 创建一个插槽，用于基于 Chromium 的浏览器和 Firefox。对于 Safari，只创建一个插槽。通过特定配置，它可以在 Docker 容器中运行会话或中继命令。</p>
<p>节点仅执行收到的命令，它不会评估、判断或控制命令和响应流以外的任何内容。运行节点的机器不需要与其他组件具有相同的操作系统。例如，Windows 节点可能能够在 Edge 上提供 IE 模式作为浏览器选项，而在 Linux 或 Mac 上则不可能，并且网格可以有多个配置有 Windows、Mac 或 Linux 的节点。</p>
<h4 id="_6-event-bus" tabindex="-1"><a class="header-anchor" href="#_6-event-bus"><span>6. Event Bus</span></a></h4>
<p>事件总线充当节点、分发器、新会话队列和会话映射之间的通信路径。网格通过消息进行大部分内部通信，从而避免了昂贵的 HTTP 调用。在以完全分布式模式启动网格时，事件总线是应启动的第一个组件。</p>
<blockquote>
<p>依赖关系图 <a href="https://www.selenium.dev/documentation/grid/architecture/" target="_blank" rel="noopener noreferrer">https://www.selenium.dev/documentation/grid/architecture/</a></p>
</blockquote>
<h2 id="selenium-grid-的三种模式" tabindex="-1"><a class="header-anchor" href="#selenium-grid-的三种模式"><span>Selenium Grid 的三种模式</span></a></h2>
<h3 id="_1-standalone" tabindex="-1"><a class="header-anchor" href="#_1-standalone"><span>1. StandAlone</span></a></h3>
<p>standalone 模式将上面提到的六种组件都集成到一起 =&gt; 单机部署，单机执行，这种模式很适合远程调试功能。</p>
<p>默认情况下，Server 会监听 <a href="http://localhost:4444" target="_blank" rel="noopener noreferrer">http://localhost:4444</a> 上的 RemoteWebDriver 请求，同时从系统 PATH 中检测可用的驱动程序。</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">java</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> selenium-server-xxx.jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> standalone</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Standalone 使用场景：</p>
<ul>
<li>⭐ 在本地使用 RemoteWebDriver 开发或调试测试</li>
<li>在推送代码之前运行快速测试套件</li>
<li>在 CI/CD 工具中轻松设置网格</li>
</ul>
<h3 id="_2-hub-node" tabindex="-1"><a class="header-anchor" href="#_2-hub-node"><span>2. Hub &amp; Node</span></a></h3>
<p>使用场景</p>
<ul>
<li>⭐ 兼容性测试：将不同操作系统/浏览器版本的机器组合在一个 Grid</li>
<li>无需拆除 Grid 即可实现扩缩容</li>
</ul>
<p>这种模式由 Hub 和 Node 组成：</p>
<ul>
<li>A Hub is composed by the following components: Router, Distributor, Session Map, New Session Queue, and Event Bus.</li>
<li>Node 独立部署</li>
</ul>
<h4 id="_2-1-hub-与-node-部署在同一台机器" tabindex="-1"><a class="header-anchor" href="#_2-1-hub-与-node-部署在同一台机器"><span>2.1 Hub 与 Node 部署在同一台机器</span></a></h4>
<ul>
<li>
<p>Hub 命令</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">java</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> selenium-server-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">versio</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">n></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">.jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> hub</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>Node 命令</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">//默认4444</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">java</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> selenium-server-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">versio</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">n></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">.jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> node</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">OR</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">java</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> selenium-server-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">versio</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">n></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">.jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> node</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --port</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 5555</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="_2-2-hub-与-node-部署在不同机器" tabindex="-1"><a class="header-anchor" href="#_2-2-hub-与-node-部署在不同机器"><span>2.2 Hub 与 Node 部署在不同机器</span></a></h4>
<p>Node 向 Hub 中的总线 Event Bus 发送 HTTP 实现注册请求，总线收到消息后 也会通过 HTTP 请求确认 Node 是否存在。</p>
<ul>
<li>
<p>Hub 使用的默认端口</p>
<ul>
<li>
<p>Hub 启动命令</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">java</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> selenium-server-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">versio</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">n></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">.jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> hub</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>Node 启动命令</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">java</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> selenium-server-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">versio</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">n></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">.jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> node</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --hub</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> http://</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">hub-i</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">p></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">:4444</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>Hub 未使用默认端口</p>
<ul>
<li>
<p>Hub 启动命令</p>
<div class="language-shel line-numbers-mode" data-highlighter="shiki" data-ext="shel" data-title="shel" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>java -jar selenium-server-&#x3C;version>.jar hub --publish-events tcp://&#x3C;hub-ip>:8886 --subscribe-events tcp://&#x3C;hub-ip>:8887 --port 8888</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>Node</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">java</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> selenium-server-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">versio</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">n></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">.jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> node</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --publish-events</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> tcp://</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">hub-i</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">p></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">:8886</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --subscribe-events</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> tcp://</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">hub-i</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">p></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">:8887</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
<h3 id="_3-distributed" tabindex="-1"><a class="header-anchor" href="#_3-distributed"><span>3. Distributed</span></a></h3>
<p>Distributed 模式下，每个组件都是独立部署的（不像 Hub 模式下除 Node 外都统一部署）。</p>
<ul>
<li>
<p>Event Bus：default port 4442 4443 5557</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">java</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> selenium-server-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">versio</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">n></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">.jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> event-bus</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --publish-events</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> tcp://</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">event-bus-i</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">p></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">:4442</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --subscribe-events</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> tcp://</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">event-bus-i</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">p></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">:4443</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --port</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 5557</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>Session Queue：default port 5559</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">java</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> selenium-server-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">versio</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">n></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">.jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> sessionqueue</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --port</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 5559</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>Session Map：default port 5556，与 event bus 交互</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">java</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> selenium-server-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">versio</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">n></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">.jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> sessions</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --publish-events</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> tcp://</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">event-bus-i</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">p></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">:4442</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --subscribe-events</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> tcp://</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">event-bus-i</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">p></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">:4443</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --port</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 5556</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>Distributor：default port 5553. 查询<strong>New Session Queue</strong>中的新会话请求，并将符合要求的分配给<strong>Node</strong>。<strong>Node</strong>以在<strong>Hub/Node</strong>网格中向<strong>Event Bus</strong>注册的方式向<strong>Distributor</strong>注册。</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">java</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> selenium-server-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">versio</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">n></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">.jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> distributor</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --publish-events</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> tcp://</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">event-bus-i</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">p></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">:4442</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --subscribe-events</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> tcp://</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">event-bus-i</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">p></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">:4443</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --sessions</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> http://</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">sessions-i</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">p></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">:5556</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --sessionqueue</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> http://</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">new-session-queue-i</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">p></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">:5559</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --port</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 5553</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --bind-bus</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> false</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>Router：default port 4444. 与 <strong>New Session Queue</strong>, <strong>Session Map</strong>, <strong>Distributor</strong>交互，因此启动时需要带上对应的参数</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">java</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> selenium-server-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">versio</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">n></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">.jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> router</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --sessions</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> http://</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">sessions-i</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">p></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">:5556</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --distributor</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> http://</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">distributor-i</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">p></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">:5553</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --sessionqueue</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> http://</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">new-session-queue-i</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">p></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">:5559</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --port</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 4444</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>Node: default port 5555</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">java</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> selenium-server-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">versio</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">n></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">.jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> node</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --publish-events</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> tcp://</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">event-bus-i</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">p></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">:4442</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --subscribe-events</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> tcp://</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">event-bus-i</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">p></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">:4443</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ul>
<h3 id="如何选择模式" tabindex="-1"><a class="header-anchor" href="#如何选择模式"><span>如何选择模式？</span></a></h3>
<blockquote>
<p>From 官方文档：</p>
<ol>
<li>Hub：选择网格角色取决于需要支持哪些操作系统和浏览器、需要执行多少个并行会话、可用机器的数量以及这些机器的性能（CPU、RAM）。并行创建会话依赖于分发器可用的处理器。例如，如果一台机器有 4 个 CPU，则分发器最多只能并行创建 4 个会话。</li>
<li>Node：默认情况下，节点支持的最大并行会话数量受可用 CPU 数量的限制。例如，如果节点机器有 8 个 CPU，则它可以运行最多 8 个并行浏览器会话（Safari 除外，它始终只有一个）。此外，预计每个浏览器会话应使用大约 1GB RAM。</li>
<li>根据 Node 数模式：
<ul>
<li>standalone - 小于 5 Nodes</li>
<li>Hub/Node - 6-100 Nodes</li>
<li>Distributed - 大于 100 Nodes</li>
</ul>
</li>
</ol>
</blockquote>
<p>实践来看，如果是远程 debug 模式，选 standalone，QA 主机电脑通常是可以支持 16 个并行会话；兼容性测试选 Hub/Node 模式，Node 层可以使用 docker 扩展。</p>
</div></template>


