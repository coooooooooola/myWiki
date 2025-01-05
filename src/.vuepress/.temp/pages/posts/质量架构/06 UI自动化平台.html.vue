<template><div><blockquote>
<p>UI 自动化测试平台 整体建设实践已在 QECON 大会以及期刊中做了分享。</p>
<p>本文主要梳理部分技术实现细节和思路，由于使用的都是开源技术且很多也是受别人分享的启发，应该会具有通用性</p>
</blockquote>
<h2 id="ui-自动化业界调研" tabindex="-1"><a class="header-anchor" href="#ui-自动化业界调研"><span>UI 自动化业界调研</span></a></h2>
<h3 id="现有平台-产品" tabindex="-1"><a class="header-anchor" href="#现有平台-产品"><span>现有平台/产品</span></a></h3>
<h4 id="_1-云测-testin" tabindex="-1"><a class="header-anchor" href="#_1-云测-testin"><span>1. <a href="https://www.testin.cn/business/landing/test_autorec.htm" target="_blank" rel="noopener noreferrer">云测 testin</a></span></a></h4>
<ul>
<li>
<p>支持端类型：web/windows</p>
</li>
<li>
<p>平台特色：</p>
<ul>
<li>
<p>NLP 识别指令</p>
</li>
<li>
<p>支持远程传输与控制</p>
</li>
<li>
<p>控件识别</p>
</li>
</ul>
</li>
</ul>
<h4 id="_2-metersphere-飞致云" tabindex="-1"><a class="header-anchor" href="#_2-metersphere-飞致云"><span>2. <a href="https://www.fit2cloud.com/metersphere/" target="_blank" rel="noopener noreferrer">MeterSphere 飞致云</a></span></a></h4>
<ul>
<li>支持端类型：web</li>
<li>平台特色：
<ul>
<li>测试报告完善</li>
</ul>
</li>
</ul>
<h4 id="_3-影刀-rpa" tabindex="-1"><a class="header-anchor" href="#_3-影刀-rpa"><span>3. <a href="https://www.yingdao.com/" target="_blank" rel="noopener noreferrer">影刀 RPA</a></span></a></h4>
<ul>
<li>支持端类型：web/windows</li>
<li>平台特色：
<ul>
<li>指令集完善</li>
<li>交互简单易用</li>
<li>控件定位多种方式检索</li>
</ul>
</li>
</ul>
<h4 id="_4-网易-airtest" tabindex="-1"><a class="header-anchor" href="#_4-网易-airtest"><span>4. <a href="https://airtest-new.nie.netease.com/cloud" target="_blank" rel="noopener noreferrer">网易 Airtest</a></span></a></h4>
<ul>
<li>自持端类型：web/windows</li>
<li>平台特色：
<ul>
<li>自研 IDE 客户端</li>
<li>支持图像识别/OCR/Poco</li>
</ul>
</li>
</ul>
<blockquote>
<p>现有的商业化产品基本可以满足我们的需求，但是主要有如下缺点：</p>
<ol>
<li>
<p>收费，部署成本高（1 2）</p>
</li>
<li>
<p>测试报告不够完善（3 4）</p>
</li>
<li>
<p>缺少定制化能力，比如无法对接公司 CICD 、数据度量管理 (1 2 3 4)</p>
</li>
</ol>
</blockquote>
<h3 id="技术选型" tabindex="-1"><a class="header-anchor" href="#技术选型"><span>技术选型</span></a></h3>
<h4 id="web-ui-测试框架" tabindex="-1"><a class="header-anchor" href="#web-ui-测试框架"><span>web UI 测试框架</span></a></h4>
<img src="https://pics5.baidu.com/feed/f31fbe096b63f624c93090a127fb82f21b4ca369.jpeg@f_auto?token=3e4bb46b5632709a8c9c1e6660504750" alt="img"  />
<h4 id="windows-ui-测试" tabindex="-1"><a class="header-anchor" href="#windows-ui-测试"><span>Windows UI 测试</span></a></h4>
<ul>
<li>微软 UI automation：支持微软提供的各种开发框架，兼容性更好
<ul>
<li>Java 封装 ms ui-automation：<a href="https://github.com/mmarquee/ui-automation" target="_blank" rel="noopener noreferrer">https://github.com/mmarquee/ui-automation</a></li>
<li>pywinauto</li>
</ul>
</li>
<li>Windows API : 基于窗口句柄查找
<ul>
<li>pywinauto</li>
</ul>
</li>
<li>MSAA - Accessibility</li>
</ul>
<h2 id="核心执行流程" tabindex="-1"><a class="header-anchor" href="#核心执行流程"><span>核心执行流程</span></a></h2>
<h3 id="数据结构" tabindex="-1"><a class="header-anchor" href="#数据结构"><span>数据结构</span></a></h3>
<blockquote>
<p>平台将一个用例的连续执行过程，拆分为一系列具有相同数据结构的&quot;步骤&quot;。每个步骤由【指令】+【数据】信息组成。</p>
<p>【指令】集合包含基础能力、循环、条件判断等大类：</p>
<ul>
<li>基础指令集覆盖自动化测试常用操作（鼠标/键盘/SQL/客户端/文字识别等等），他的特点为单一指令 无子步骤，基础指令的步骤是最细粒度的步骤。</li>
<li>循环/条件判断：循环指令可以使得包含重复性步骤的用例更加简洁，条件判断增强了用例的兼容性和扩展性。这两个指令特点是他们通常会包含众多基础指令，也有可能继续嵌套循环/条件判断指令。</li>
</ul>
<p>另外，平台还建立了【元件】的概念：它的主要功能是能让不同用例复用同样一系列步骤（比如用户登录），使得用例更加简洁 增强可读性。用例可以引用元件（但是元件不能再引用元件），用例也可以使用元件中的变量。</p>
</blockquote>
<p>不难想到，在执行上述结构的用例/计划与树的遍历过程十分相似，即：</p>
<h3 id="递归遍历设计" tabindex="-1"><a class="header-anchor" href="#递归遍历设计"><span>递归遍历设计</span></a></h3>
<p>当然，&quot;遍历&quot;操作会更加复杂，包括不限于：</p>
<ul>
<li>
<p>异常捕获 ⭐️：这里十分重要，一个 1000+步骤的用例如果因为一个未捕获异常而执行失败，用户会崩溃的！</p>
<ul>
<li>GlobalExceptionHandler：全局异常捕获</li>
<li>xxxExceptionHandler</li>
<li>try... catch ... finally : catch 尽量避免 Exception</li>
</ul>
</li>
<li>
<p>报告数据生成 ⭐️：提供一份数据准确、执行过程信息清晰的报告十分重要（尤其是接入 devops 准出门禁后）</p>
<ul>
<li>数据对账</li>
<li>统一处理</li>
<li>事务</li>
</ul>
</li>
<li>
<p>步骤中变量替换</p>
<ul>
<li>静态变量：前置统一替换</li>
<li>动态变量：</li>
</ul>
</li>
<li>
<p>机器/报告的状态跟踪</p>
</li>
<li>
<p>循环/元件等包含子步骤的处理：</p>
</li>
<li>
<p>动作指令执行（鼠标/键盘/SQL 查询/OCR/表格解析/客户端/智能等待...）</p>
</li>
</ul>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">//伪代码</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">//执行当前节点下的所有一级步骤（当前节点有可能是元件、循环）</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> HashMap</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> runSteps</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(){</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    //依次执行当前节点的子步骤</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    for</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> (</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> i</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">i</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">steps</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">size</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">i</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">++</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">){</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        //判断是否需要终止（取消执行操作）</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        if</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> (</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">shouldStop</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">()){</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            break</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">；</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">        }</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        //判断是否需要跳过（禁用）</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        if</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> (</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">shouldSkip</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">()){</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            continue</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">        }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        if</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> (</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">steps</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(i).</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">getType</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> ==</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "Loop"</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">){</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            //preHandler:数据集数据处理</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">            preHandler</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            for</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> (</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> startIndex </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> start</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> endIndex</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> end</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> startIndex</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">+=</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">inc){</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">                //数据驱动，替换变量</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">            }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">            Result </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> runSteps</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">steps</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(i)</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            //处理本次的结果</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">            postHandler</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">        }</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">else</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> if</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> (</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"元件"</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">){</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">            JSONArray</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> modsChildrenSteps </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> steps</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getJSONObject</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(i).</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getJSONArray</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"children"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">            HashMap</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Object</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">></span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> childrenResultMap </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> runSteps</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(map</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> obj</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> modsChildrenSteps</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> steps</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> contextVarMap)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            //步骤计数器(成功、失败)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">            countSteps</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            //handleResult:如果成功，那么插入一条记录继续执行，如果失败那么生成后续步骤为跳过并插入</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">        }</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">else</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> if</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> (</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"SQL"</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">){</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            SqlOperation</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">excute</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">        }</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">else</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            instance</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">runInstanceFunction</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="io-模型优化" tabindex="-1"><a class="header-anchor" href="#io-模型优化"><span>IO 模型优化</span></a></h3>
<blockquote>
<p>这里的优化思路主要参考了 Quake：<br>
<a href="https://www.51cto.com/article/720420.html" target="_blank" rel="noopener noreferrer">https://www.51cto.com/article/720420.html</a> &gt; <a href="https://tech.meituan.com/2016/12/02/performance-tunning.html" target="_blank" rel="noopener noreferrer">https://tech.meituan.com/2016/12/02/performance-tunning.html</a></p>
</blockquote>
<p>在最初的用例执行设计中，步骤中的上传截图/数据读写等 IO 操作简单粗暴地采用 BIO 方式，但上线后立马接到了性能方面的反馈。</p>
<p>经排查，【上传截图】操作的额外耗时最严重（每个步骤通常会包含 1920<em>1080 地全屏截图</em>1、小尺寸图像识别模板图<em>1 以及 1920</em>1080 识别结果图*1），此外每个用例还会上传一份录制视频和一些调试图片，平均会增加 500-800ms/步骤，1000 个步骤的用例会因此多执行将近 13 分钟！</p>
<ul>
<li>优化方案 1 改为@Async，这样实现改动很简单，也实现了同步改异步的优化。但是仍然是阻塞 I/O，在较高并发度的场景下性能还有改进空间</li>
<li>优化方案 2 改为 Reactor 异步非阻塞 I/O，业务逻辑与读写分别在不同的 worker 完成</li>
</ul>
<h3 id="反射调用指令集" tabindex="-1"><a class="header-anchor" href="#反射调用指令集"><span>反射调用指令集</span></a></h3>
<blockquote>
<p>UI 自动化指令集超过 30 种，需要实现统一配置、调用、异常捕获的逻辑</p>
</blockquote>
<p>解决方案：Operation 表 + 反射调用</p>
<h3 id="慢查询" tabindex="-1"><a class="header-anchor" href="#慢查询"><span>慢查询</span></a></h3>
<blockquote>
<p><a href="https://dbaplus.cn/news-155-4717-1.html" target="_blank" rel="noopener noreferrer">https://dbaplus.cn/news-155-4717-1.html</a></p>
</blockquote>
<ul>
<li>发现：SpringBoot-Acuator</li>
<li>比较有效的解决方案：
<ul>
<li>增加索引，或者修复索引失效的 SQL</li>
<li>select 避免冗余字段，尤其是 context blob 等大字段（SELECT 避免用*）</li>
<li>尽量规避子查询</li>
<li>尽量单表查询，最多两张</li>
</ul>
</li>
</ul>
<h2 id="远程传输-控制" tabindex="-1"><a class="header-anchor" href="#远程传输-控制"><span>远程传输&amp;控制</span></a></h2>
<blockquote>
<p>为了方便用户在更直观的调试用例，平台支持远程传输和控制能力，即用户可以在平台实时看到执行机画面并可以控制执行机。</p>
</blockquote>
<p><img src="https://swtywang.fun/minio//blog/5bec2fefa415dc9767ab2410b69c4c87.png" alt="vnc" loading="lazy"><br>
实现原理大致如上图，1-3 实现了远程控制；4-6 实现了执行机画面的实时传输。</p>
<ul>
<li>novnc 通过 websocket 建立连接，但是 vncserver 仅支持 tcp socket，所以需要实现 websocket 与 tcp socket 的转化功能，主流工具有 Websockify，也可以使用 nginx + node。</li>
</ul>
<h3 id="定位能力" tabindex="-1"><a class="header-anchor" href="#定位能力"><span>定位能力</span></a></h3>
<ol>
<li>xpath</li>
<li>windows 控件</li>
<li>图像识别</li>
<li>som + GPT4V：这个是逛 github 发现的，京东也有类似的实现思路，和前端一起做了二次改造，可用于定位的兜底（上线需要换成本地大模型，效果稍微差些）</li>
</ol>
</div></template>


