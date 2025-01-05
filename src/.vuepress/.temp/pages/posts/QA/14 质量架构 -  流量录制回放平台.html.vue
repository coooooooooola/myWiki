<template><div><h2 id="业界实现" tabindex="-1"><a class="header-anchor" href="#业界实现"><span>业界实现</span></a></h2>
<table>
<thead>
<tr>
<th style="text-align:center">方案名称</th>
<th style="text-align:center">录制原理</th>
<th style="text-align:center">RPC</th>
<th style="text-align:center">HTTP</th>
<th style="text-align:center">写接口 MOCK</th>
<th>支持语言</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><a href="https://github.com/alibaba/jvm-sandbox-repeater" target="_blank" rel="noopener noreferrer">jvm-sandbox-repeater</a> - 阿里</td>
<td style="text-align:center"><a href="https://github.com/alibaba/jvm-sandbox" target="_blank" rel="noopener noreferrer">JVM-SANDBOX</a></td>
<td style="text-align:center">✅</td>
<td style="text-align:center">✅</td>
<td style="text-align:center">✅</td>
<td>Java</td>
</tr>
<tr>
<td style="text-align:center"><a href="https://developer.aliyun.com/article/278811" target="_blank" rel="noopener noreferrer">DOOM</a> - 阿里</td>
<td style="text-align:center">字节码增强 AOP</td>
<td style="text-align:center">✅</td>
<td style="text-align:center">✅</td>
<td style="text-align:center"></td>
<td>Java</td>
</tr>
<tr>
<td style="text-align:center"><a href="https://github.com/didi/sharingan" target="_blank" rel="noopener noreferrer">写轮眼</a> - 滴滴</td>
<td style="text-align:center"><a href="https://github.com/didi/sharingan/wiki/%E6%B5%81%E9%87%8F%E5%BD%95%E5%88%B6%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86" target="_blank" rel="noopener noreferrer">修改 Golang pcap 源码，类似 tcpdump</a></td>
<td style="text-align:center">❌</td>
<td style="text-align:center">✅</td>
<td style="text-align:center">❌</td>
<td>Go</td>
</tr>
<tr>
<td style="text-align:center"><a href="https://tech.meituan.com/2018/09/27/quake-introduction.html" target="_blank" rel="noopener noreferrer">Quake</a> - 美团</td>
<td style="text-align:center">RPC 框架改造/Nginx</td>
<td style="text-align:center">✅</td>
<td style="text-align:center">✅</td>
<td style="text-align:center">❌</td>
<td>Java</td>
</tr>
<tr>
<td style="text-align:center"><a href="https://juejin.cn/post/6857688805835866126" target="_blank" rel="noopener noreferrer">ByteCopy</a> - 字节</td>
<td style="text-align:center">基于 TCPCopy 的自研</td>
<td style="text-align:center">✅</td>
<td style="text-align:center">✅</td>
<td style="text-align:center">❌</td>
<td>Go</td>
</tr>
<tr>
<td style="text-align:center"><a href="https://github.com/twitter-archive/diffy" target="_blank" rel="noopener noreferrer">diffy</a> - Twitter</td>
<td style="text-align:center">网络层代理</td>
<td style="text-align:center"></td>
<td style="text-align:center">✅</td>
<td style="text-align:center"></td>
<td>不限</td>
</tr>
<tr>
<td style="text-align:center"><a href="https://github.com/vivo/MoonBox" target="_blank" rel="noopener noreferrer">Moonbox(月光宝盒)</a> -VIVO</td>
<td style="text-align:center"><a href="https://github.com/alibaba/jvm-sandbox-repeater" target="_blank" rel="noopener noreferrer">JVM-SANDBOX &amp; jvm-sandbox-repeater</a></td>
<td style="text-align:center">✅</td>
<td style="text-align:center">✅</td>
<td style="text-align:center">✅</td>
<td>Java</td>
</tr>
</tbody>
</table>
<p>流量录制的实现大致分为以下几类：</p>
<ul>
<li>字节码增强：以 JVM-SANDBOX 为例，通过动态注入 agent 修改字节码，将目标类作为 AOP 切点 实现流量的录制
<ul>
<li>优势：十分灵活 扩展性强；支持动态插拔</li>
<li>劣势：需要自实现 agent；需要风险控制</li>
</ul>
</li>
<li>网络层处理：流量进入网关时，通过流量复制( <a href="http://nginx.org/en/docs/http/ngx_http_mirror_module.html" target="_blank" rel="noopener noreferrer">ngx_http_mirror_module</a>)的方式导入流量录制回放平台，美团的 HTTP 请求/Diffy 等是通过这样做的
<ul>
<li>优势：技术成熟，操作相对简单，支持流量筛选</li>
<li>劣势：仅支持 HTTP，使用场景受限</li>
</ul>
</li>
<li>框架源码改造：通过修改 RPC 框架源码，让所有 RPC 请求自带录制功能
<ul>
<li>优势：通常是公司基础服务团队改造，可靠性有保障，接入方便</li>
<li>劣势：小组实现成本较高</li>
</ul>
</li>
</ul>
<p>最终选择 JVM-SANDBOX 作为底层实现方案，原因如下：</p>
<ol>
<li>平台建设初衷之一是支持 RPC 流量的实时抓包以及 MOCK 能力，提升线下阶段的可测性，所以对于流量录制的实时性有较高要求</li>
<li>大厂出品，社区也相对活跃，试用了 repeater 功能基本满足需要，可靠性 ok</li>
<li>扩展性强，由于在回放写接口时需要对链路的中间件做 mock 处理，JVM-SANDBOX 对这方面的扩展支持性比较好</li>
</ol>
<h2 id="jvm-sanbox-源码阅读" tabindex="-1"><a class="header-anchor" href="#jvm-sanbox-源码阅读"><span>JVM-SANBOX 源码阅读</span></a></h2>
<h3 id="整体结构" tabindex="-1"><a class="header-anchor" href="#整体结构"><span>整体结构</span></a></h3>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>| sandbox</span></span>
<span class="line"><span>|----bin</span></span>
<span class="line"><span>|----sandbox-agent</span></span>
<span class="line"><span>|----sandbox-common-api</span></span>
<span class="line"><span>|----sandbox-api</span></span>
<span class="line"><span>|----sandbox-provider-api</span></span>
<span class="line"><span>|----sandbox-spy</span></span>
<span class="line"><span>|----sandbox-core</span></span>
<span class="line"><span>|----sandbox-module-starter</span></span>
<span class="line"><span>|----sandbox-mgr-module</span></span>
<span class="line"><span>|----sandbox-mgr-provider</span></span>
<span class="line"><span>|----sandbox-debug-module</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="一、启动注入" tabindex="-1"><a class="header-anchor" href="#一、启动注入"><span>一、启动注入</span></a></h3>
<blockquote>
<p TARGET_JVM_PID="">从使用层面，这一阶段需在服务器执行命令 ./sandbox.sh -p</p>
<p>完成自定义 mododule 的注入后，在自定义类的事件驱动下会触发对应的代码逻辑。</p>
</blockquote>
<h4 id="_1-1-启动脚本-bin" tabindex="-1"><a class="header-anchor" href="#_1-1-启动脚本-bin"><span>1.1 启动脚本 bin</span></a></h4>
<p><a href="http://sandbox.sh" target="_blank" rel="noopener noreferrer">sandbox.sh</a> 脚本主函数 main()，他主要功能是解析 shell 命令参数然后执行对应的命令，最核心的是-p JVM_PORT 参数对应的 attch_jvm 方法：</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">function</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> attach_jvm</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">() {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  # got an token</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">  local</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> token</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  token</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"$(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">date</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> |</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> head</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> |</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> cksum</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> |</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> sed</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 's/ //g')"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  # attach target jvm</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">  "</span><span style="--shiki-light:#E45649;--shiki-dark:#61AFEF">${</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">SANDBOX_JAVA_HOME</span><span style="--shiki-light:#E45649;--shiki-dark:#61AFEF">}</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">/bin/java"</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">    ${</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">SANDBOX_JVM_OPS</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">}</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">    -jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">${</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">SANDBOX_LIB_DIR</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">/sandbox-core.jar"</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    "</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">${</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">TARGET_JVM_PID</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    "</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">${</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">SANDBOX_LIB_DIR</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">/sandbox-agent.jar"</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    "home=</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">${</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">SANDBOX_HOME_DIR</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">;token=</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">${</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">token</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">;server.ip=</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">${</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">TARGET_SERVER_IP</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">;server.port=</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">${</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">TARGET_SERVER_PORT</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">;namespace=</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">${</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">TARGET_NAMESPACE</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ||</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    exit_on_err</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "attach JVM </span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">${</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">TARGET_JVM_PID</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> fail."</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  # get network from attach result</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  SANDBOX_SERVER_NETWORK</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">$(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">grep</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">${</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">token</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">${</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">SANDBOX_TOKEN_FILE</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">grep</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">${</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">TARGET_NAMESPACE</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">tail</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">awk</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -F</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ";"</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '{print $3";"$4}'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  [[ </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-z</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF"> ${</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">SANDBOX_SERVER_NETWORK</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">}</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ]] &#x26;&#x26;</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    exit_on_err</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "attach JVM </span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">${</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">TARGET_JVM_PID</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> fail, attach lose response."</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">//上面的代码会输入类似如下格式的命令，即启动sandbox-core.jar，往下看</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">java</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -Xms128M</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -Xmx128M</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> xxx/sandbox-core.jar</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 10732</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> xxx/sandbox-agent.jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> home=/xxx</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">token</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">xxx</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">server.ip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">=xxx</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">service.port</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">=xxx</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">namespace</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">xxx</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-sandbox-core-corelauncher" tabindex="-1"><a class="header-anchor" href="#_1-2-sandbox-core-corelauncher"><span>1.2 sandbox-core.CoreLauncher</span></a></h4>
<div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" data-title="xml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">&#x3C;!-- sandbox-core的启动命令中定义了执行入口类 --></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">executions</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">execution</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">goals</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">goal</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>attached&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">goal</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        &#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">goals</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">phase</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>package&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">phase</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">configuration</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">descriptorRefs</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">descriptorRef</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>jar-with-dependencies&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">descriptorRef</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            &#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">descriptorRefs</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">archive</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">manifest</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                    &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mainClass</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>com.alibaba.jvm.sandbox.core.CoreLauncher&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mainClass</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                &#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">manifest</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            &#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">archive</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        &#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">configuration</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">execution</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">executions</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行入口 CoreLauncher 类的构造函数完成两件事：</p>
<ul>
<li>vmObj = VirtualMachine.attach(targetJvmPid) ：使得当前 JVM 与另一个正在运行的 JVM 实例（通常是我们的被测服务）建立了通信通道</li>
<li>vmObj.loadAgent(agentJarPath, cfg) ：加载代理，向目标 JVM 注入一个代理（agent.jar）实现字节码增强等各种功能</li>
</ul>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">//对应1.1的命令，这里targetJvmPid= 10732; agentJarPath = xxx/sandbox-agent.jar ;token = token</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> CoreLauncher</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> String</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> targetJvmPid</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">                        final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> String</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> agentJarPath</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">                        final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> String</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> token) throws Exception {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    // 加载agent</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    attachAgent</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(targetJvmPid</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> agentJarPath</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> token)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">//构造函数调用加载，主要实现JVM attach以及agent加载</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">private</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> attachAgent</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> String</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> targetJvmPid</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">                             final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> String</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> agentJarPath</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">                             final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> String</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> cfg) throws Exception {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        VirtualMachine</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> vmObj </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        try</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">            vmObj </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> VirtualMachine</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">attach</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(targetJvmPid);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            if</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> (vmObj </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">!=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> null</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">) {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">                vmObj</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">loadAgent</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(agentJarPath, cfg);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">            }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">        } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">finally</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            if</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> (</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">null</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> !=</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> vmObj) {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">                vmObj</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">detach</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">            }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">        }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">    }</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重点看下加载代理时都干了什么，继续~</p>
<h4 id="_1-3-sandbox-agent-jar" tabindex="-1"><a class="header-anchor" href="#_1-3-sandbox-agent-jar"><span>1.3 sandbox-agent.jar</span></a></h4>
<blockquote>
<p>⭐️⭐️⭐️ 这里先插一个知识点，JVM 加载 agent 有两种方式：</p>
<ol>
<li>
<p>-javaagent 方式（静态加载）：这种模式是在 JVM 启动时通过命令行参数指定的。这意味着在 JVM 启动之前，agent 已经被加载，并且可以在应用程序的主类加载之前修改字节码。</p>
<ul>
<li>
<p>定义方法</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> premain</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> agentArgs</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Instrumentation</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> inst)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>使用示例</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">java </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">javaagent</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">path</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">/</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">to</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">/</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">youragent</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">jar</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">agentArguments </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">jar </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">yourapplication</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">jar</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>好处<br>
可以在应用程序的主类加载之前修改字节码，不会出现动态加载时的性能突降</p>
</li>
<li>
<p>劣势<br>
灵活性一般，只能在 JVM 启动时加载</p>
</li>
</ul>
</li>
<li>
<p>attach 方式（动态加载）：这种模式是在 JVM 已经启动并运行之后，通过 Attach API 动态加载 agent。它可以在运行时将 agent 动态附加到正在运行的 JVM，是我们使用的方式</p>
<ul>
<li>
<p>定义方法：</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> agentmain</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> agentArgs</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Instrumentation</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> inst)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>使用实例</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">VirtualMachine</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> vm </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> VirtualMachine</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">attach</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"targetJvmPid"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">vm</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">loadAgent</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"path/to/youragent.jar"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"agentArguments"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">vm</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">detach</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>优势：动态加载/卸载，无需重启被测服务 JVM</p>
</li>
<li>
<p>劣势：被测服务启动时，需要重新进行类加载操作，有额外的性能开销</p>
</li>
</ul>
</li>
</ol>
</blockquote>
<p>补完课可以看到，我们是进入的 AgentLauncher.agentmain 方法</p>
<div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" data-title="xml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">archive</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">manifestEntries</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Premain-Class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>com.alibaba.jvm.sandbox.agent.AgentLauncher&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Premain-Class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Agent-Class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>com.alibaba.jvm.sandbox.agent.AgentLauncher&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Agent-Class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Can-Redefine-Classes</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>true&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Can-Redefine-Classes</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Can-Retransform-Classes</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>true&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Can-Retransform-Classes</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Can-Set-Native-Method-Prefix</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>true&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Can-Set-Native-Method-Prefix</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">manifestEntries</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">archive</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>agentmain 的核心代码：</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    /**</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">     * 在当前JVM安装jvm-sandbox</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">     *</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">     * </span><span style="--shiki-light:#A626A4;--shiki-light-font-style:italic;--shiki-dark:#C678DD;--shiki-dark-font-style:italic">@param</span><span style="--shiki-light:#383A42;--shiki-light-font-style:italic;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> featureMap</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> 启动参数配置</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">     * </span><span style="--shiki-light:#A626A4;--shiki-light-font-style:italic;--shiki-dark:#C678DD;--shiki-dark-font-style:italic">@param</span><span style="--shiki-light:#383A42;--shiki-light-font-style:italic;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> inst</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">       inst</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">     * </span><span style="--shiki-light:#A626A4;--shiki-light-font-style:italic;--shiki-dark:#C678DD;--shiki-dark-font-style:italic">@return</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> 服务器IP:PORT</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">     */</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">private</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> synchronized</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> InetSocketAddress</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> install</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Map</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">String</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> String</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">></span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> featureMap</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">                                                          final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Instrumentation</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> inst) {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> namespace </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> getNamespace</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(featureMap)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> propertiesFilePath </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> getPropertiesFilePath</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(featureMap)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> coreFeatureString </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> toFeatureString</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(featureMap)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        try</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> home </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> getSandboxHome</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(featureMap)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            // 将Spy注入到BootstrapClassLoader</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            inst</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">appendToBootstrapClassLoaderSearch</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> JarFile</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> File</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">                    getSandboxSpyJarPath</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(home)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">                    // SANDBOX_SPY_JAR_PATH</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            )));</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            // 构造自定义的类加载器，尽量减少Sandbox对现有工程的侵蚀</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> ClassLoader</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> sandboxClassLoader </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> loadOrDefineClassLoader</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">                    namespace</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">                    getSandboxCoreJarPath</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(home)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">                    // SANDBOX_CORE_JAR_PATH</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">            )</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            // CoreConfigure类定义</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Class</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD">?</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">></span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> classOfConfigure </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> sandboxClassLoader</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">loadClass</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(CLASS_OF_CORE_CONFIGURE);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            // 反序列化成CoreConfigure类实例</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Object</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> objectOfCoreConfigure </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> classOfConfigure</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getMethod</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"toConfigure"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                    .</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">invoke</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, coreFeatureString, propertiesFilePath);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            // CoreServer类定义</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Class</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD">?</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">></span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> classOfProxyServer </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> sandboxClassLoader</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">loadClass</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(CLASS_OF_PROXY_CORE_SERVER);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            // 获取CoreServer单例</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Object</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> objectOfProxyServer </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> classOfProxyServer</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                    .</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getMethod</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"getInstance"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                    .</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">invoke</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            // CoreServer.isBind()</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            final</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> boolean</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> isBind </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> (Boolean) </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">classOfProxyServer</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getMethod</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"isBind"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">).</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">invoke</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(objectOfProxyServer);</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            // 如果未绑定,则需要绑定一个地址</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            if</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> (</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">!</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">isBind) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">                try</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">                    classOfProxyServer</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                            .</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getMethod</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"bind"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, classOfConfigure, </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">Instrumentation</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                            .</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">invoke</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(objectOfProxyServer, objectOfCoreConfigure, inst);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">                } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">catch</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> (</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Throwable</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> t</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">) {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">                    classOfProxyServer</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getMethod</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"destroy"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">).</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">invoke</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(objectOfProxyServer);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">                    throw</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> t</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">                }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">            }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            // 返回服务器绑定的地址</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            return</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> (InetSocketAddress) classOfProxyServer</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                    .</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getMethod</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"getLocal"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                    .</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">invoke</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(objectOfProxyServer);</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">        } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">catch</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> (</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Throwable</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> cause</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            throw</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> RuntimeException</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"sandbox attach failed."</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> cause)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">        }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">    }</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>主要完成了下面三件事，都很关键：</p>
<ol>
<li>注入 Spy 类到 BootstrapClassLoader：获取 Spy JAR 文件的路径并将其注入到 BootstrapClassLoader，以便在所有类加载器中共享。</li>
<li>构造一个自定义类加载器，加载沙箱核心功能类，完成类加载（Module、CoreConfigure、ProxyCoreServer），尽量减少对现有工程的侵蚀</li>
<li>使用自定义类加载器加载代理服务器核心类 JettyCoreServer，这里主要实现了两部分功能：
<ul>
<li>实例化一个 jetty 服务器，使得后面可以使用 HTTP 通信</li>
<li>使用 Sandbox 类加载器加载并重置所有 module 模块</li>
</ul>
</li>
</ol>
<p>截止到这里，启动 sandbox 的功能就完成了，最重要的就是实现了这几个能力：</p>
<ol>
<li>将 spy 类注入到了 BootstrapClassLoader，这关系到后面整个动态编织逻辑</li>
<li>外界将和沙箱可以实现 HTTP 通信，这方便我们对沙箱做很多操作以及状态的变更</li>
<li>新启了一个 sandbox 类加载器，将 module 完成了类加载</li>
</ol>
<h3 id="二、⭐️-目标类字节码动态增强" tabindex="-1"><a class="header-anchor" href="#二、⭐️-目标类字节码动态增强"><span>二、⭐️ 目标类字节码动态增强</span></a></h3>
<p>在上一步启动 module 的时候，我只是一笔带过了。实际上这里非常的关键，因为会将 module 中的自定义类/方法实现字节码动态增强。举个例子，通常 module 中都会有这部分，他的最终效果是当代码执行到配置增强的类名、方法名、参数时，会触发对应 recordListener 的执行逻辑。这一节就梳理这个增强逻辑如何实现的</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> EventWatcher</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> watcher </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> EventWatchBuilder</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(moduleEventWatcher)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                    .</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">onClass</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(className)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                    .</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">includeSubClasses</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                    .</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">includeBootstrap</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                    .</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">onBehavior</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(methodName)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                    .</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">onWatching</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                    .</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">onWatch</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(recordListener);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-onwatch" tabindex="-1"><a class="header-anchor" href="#_2-1-onwatch"><span>2.1 onWatch()</span></a></h4>
<p>核心逻辑在 moduleEventWatcher.watch 方法，他会实现修改目标类的字节码</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">private</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> EventWatcher</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> build</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">EventListener</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> listener</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> ModuleEventWatcher</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">Progress</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> progress</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> Event</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">Type</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">...</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> eventTypes</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        final</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> int</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> watchId </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">moduleEventWatcher</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">watch</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">toEventWatchCondition</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(), listener, progress, eventTypes);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  			......</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实现类为 DefaultModuleEventWatcher.watch，主要做了这几件事：</p>
<ol>
<li>
<p>生成一个全局的 watchId</p>
</li>
<li>
<p>给对应的模块追加 ClassFileTransformer</p>
</li>
</ol>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">   final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> SandboxClassFileTransformer</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> sandClassFileTransformer </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> SandboxClassFileTransformer</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">                   watchId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> coreModule</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getUniqueId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(),</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> matcher</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> listener</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> isEnableUnsafe</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> eventType</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> namespace)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>将 SandboxClassFileTransformer 注册到 CoreModule 中</li>
</ol>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> coreModule</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getSandboxClassFileTransformers</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">().</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">add</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(sandClassFileTransformer);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ol start="4">
<li>这里 addTransformer 后，接下来引起的类加载都会经过 sandClassFileTransformer</li>
</ol>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> inst</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">addTransformer</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(sandClassFileTransformer, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>PS：如果是移除字节码增强，会调用 removeTransformer</p>
<ol start="5">
<li>
<p>收集所有要增强的类 List&lt;Class&gt;</p>
</li>
<li>
<p>⭐️ 调用<code v-pre>reTransformClasses()</code>方法，实际调用了 Instrumentation 的<code v-pre>retransformClasses()</code>方法，对 JVM 已经加载的类重新触发类加载</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span> reTransformClasses(watchId,waitingReTransformClasses, progress);</span></span>
<span class="line"><span> => inst.retransformClasses(waitingReTransformClass);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>激活增强类</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">EventListenerHandler</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getSingleton</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                    .</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">active</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(listenerId, listener, eventType);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h4 id="_2-2-类增强的是什么样子-如何与-spy-联系上" tabindex="-1"><a class="header-anchor" href="#_2-2-类增强的是什么样子-如何与-spy-联系上"><span>2.2 类增强的是什么样子，如何与 Spy 联系上？</span></a></h4>
<p>直接引用官方的例子，一目了然</p>
<figure><img src="https://swtywang.fun/minio/blog/4f51e6beb292ea20b99b478c546e5cb1.awebp" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<h2 id="思考总结" tabindex="-1"><a class="header-anchor" href="#思考总结"><span>思考总结</span></a></h2>
<p>上线已经一年了，现在看还有一些需要完善的：</p>
<ol>
<li>Diff 断言：目前比较简单粗暴的对 json diff 作对比，但是每次都会展示一些噪音，可以支持配置一些噪音模板自动过滤掉</li>
<li>推流：为了保证时序性选择了同步推送数据，其实也可以用 MQ，只要保证同一个 traceId 时序即可</li>
<li>链路录制回放：这个暂时没看到太好的解决方案，能想到的是在现有 traceId 之上再包一层 parent-traceId</li>
</ol>
<blockquote>
<p>关于 JVM-SANDBOX 的介绍，也有一些参考文档：</p>
<ol>
<li><a href="https://zhuanlan.zhihu.com/p/72312966" target="_blank" rel="noopener noreferrer">官方介绍</a></li>
<li><a href="https://github.com/alibaba/jvm-sandbox/wiki" target="_blank" rel="noopener noreferrer">github wiki</a></li>
<li><a href="https://www.infoq.cn/article/tsy4lgjvsfweuxebw*gp" target="_blank" rel="noopener noreferrer">技术介绍</a></li>
</ol>
</blockquote>
</div></template>


