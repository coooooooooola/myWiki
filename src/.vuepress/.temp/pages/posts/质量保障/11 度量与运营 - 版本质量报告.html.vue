<template><div><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h2>
<ul>
<li>
<p>What</p>
<div class="language-markdown line-numbers-mode" data-highlighter="shiki" data-ext="markdown" data-title="markdown" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">挖掘版本过程中暴露出的质量问题,并且制定相应地改进计划,从而达到解决当前痛点问题,提升交付质量</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">与效率的目的。每个版本都会去做,这是一个持续迭代运营的过程。</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>两个误区 ❌</p>
<div class="language-markdown line-numbers-mode" data-highlighter="shiki" data-ext="markdown" data-title="markdown" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">版本质量总结 = 版本复盘会：复盘会是质量总结中非常关键一环，起到了承前启后的作用。但是不能忽视</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">其他环节的作用，整个版本选代流程是我们的研究对象,在这个过程中会产生非常多的质量数据供我们分析</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">归因;在复盘会后的改进是我们真正的目的，定期回顾进度也是质量运营的关键步骤。</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-markdown line-numbers-mode" data-highlighter="shiki" data-ext="markdown" data-title="markdown" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">版本质量总结只是 QA 做的事情:质量总结依赖 QA/PM/RD 的各方协作,需要拉动产研同学一起参与,共同提</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">升版本质量</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="如何进行版本质量总结" tabindex="-1"><a class="header-anchor" href="#如何进行版本质量总结"><span>如何进行版本质量总结</span></a></h2>
<h3 id="step1-明确目标与度量指标" tabindex="-1"><a class="header-anchor" href="#step1-明确目标与度量指标"><span>Step1. 明确目标与度量指标</span></a></h3>
<div class="language-markdown line-numbers-mode" data-highlighter="shiki" data-ext="markdown" data-title="markdown" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">质量度量是对软件开发项目进行指标定义、数据收集以及分析的约持续性定量化过程。</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><blockquote>
<p>质量度量的作用:</p>
<ol>
<li>提供了一系列直观客观的数据指标,能够一定程度上对质量进行定量评价</li>
<li>通过度量指标发现当前存在的问题,不断促进质量的改善,这是质量度量最终目的</li>
<li>对暴露出的质量问题,客观的质量度量更能让各方在认知上达成一一致,有利于问题的推动解决</li>
</ol>
</blockquote>
<h4 id="part1-交付质量" tabindex="-1"><a class="header-anchor" href="#part1-交付质量"><span>Part1 交付质量</span></a></h4>
<p>需求阶段：变更率、打回率...<br>
研发阶段：千行代码 bug 数、提测打回、严重 bug 率、准入门禁项<br>
测试阶段：线下问题拦截率、覆盖率、准入准出项、无效 bug 率、reopen<br>
发布阶段：发布成功率、回滚率<br>
线上：事故数、Crash 率、热修数、MTTR 等</p>
<h4 id="part2-交付效率" tabindex="-1"><a class="header-anchor" href="#part2-交付效率"><span>Part2 交付效率</span></a></h4>
<p>需求交付周期、研发交付周期、需求吞吐、测试/研发资源投入、bug 发现/修复时长</p>
<h4 id="part3-交付能力" tabindex="-1"><a class="header-anchor" href="#part3-交付能力"><span>Part3 交付能力</span></a></h4>
<p>流水线构建频率/时间/成功率、自动化耗时/成功率/拦截率、发布耗时等</p>
<h3 id="step2-数据积累" tabindex="-1"><a class="header-anchor" href="#step2-数据积累"><span>Step2. 数据积累</span></a></h3>
<blockquote>
<p>在版本选代过程中,我们要做的就是客观、真实记录过程以及结果数据,保证后续质量分析的有效性</p>
</blockquote>
<ol>
<li>【准】统一度量标准：尽量采用公司/部门统一标准，保证数据置信度
<ul>
<li>缺陷标准 目 Bug 优先级标准统一</li>
<li>事故定级方案</li>
<li>度量口径统一</li>
</ul>
</li>
<li>【全】严格执行各阶段规范流程：尽量不遗漏版本过程中的各个环节，保证数据全面
<ul>
<li>提测准入阶段:冒烟用例不通过 =&gt; 打回</li>
<li>每一个 bug 都创建 meego,尽量避免口头提 bug</li>
<li>用户反馈 OR 线上问题及时录入 Meego</li>
</ul>
</li>
<li>【细】版本质量数据留存：重要数据及时跟踪、方便追溯
<ul>
<li>版本测试计划
<ul>
<li>需求明细:是否跟版本、是否延期、测试功能点、测试用例 review 结论、自测通过率、打回次数、打回原<br>
因、每日测试进度、缺陷情况</li>
<li>关键时间节点:细评截止时间、最晚提测时间、封板时间、回归完成时间、提审时间</li>
<li>提审进度</li>
</ul>
</li>
<li>严重 bug：Meego 填写原因</li>
<li>测试过程中遇到的问题尽量在项目群同步周知，方便回溯</li>
</ul>
</li>
</ol>
<h3 id="step3-数据收集与分析" tabindex="-1"><a class="header-anchor" href="#step3-数据收集与分析"><span>Step3. 数据收集与分析</span></a></h3>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>收集数据 => 初步分析 => 质量报告初稿</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ol>
<li>数据指标收集(Meego Fatal Oncall=&gt;Measure)，根据度量结果初步判断是否符合预期，分别标注</li>
<li>数据下钻：了解每一个单例的过程(5W1H)，并判断是否符合预期</li>
<li>针对研发质量相关指标,比如严重 bug 率、提测准入打回等,在在问题处@需求对应 RD，写明归因和改进方案；针<br>
对测试质量指标，明确每一个单例问题的过程和原因，给出归因和改进方案</li>
</ol>
<h3 id="step4-组织版本复盘" tabindex="-1"><a class="header-anchor" href="#step4-组织版本复盘"><span>Step4. 组织版本复盘</span></a></h3>
<div class="language-markdown line-numbers-mode" data-highlighter="shiki" data-ext="markdown" data-title="markdown" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">复盘是对整个事件的发展过程进行目标回顾、结果评估、差异分和经验总结的过程。</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="复盘参与人员" tabindex="-1"><a class="header-anchor" href="#复盘参与人员"><span>复盘参与人员</span></a></h4>
<p>1.复盘主持人 - QA 版本负责人:</p>
<ul>
<li>负责质量报告的完善</li>
<li>组织 QA 内部复盘</li>
<li>组织线下复盘:
<ul>
<li>至少提前一天发出版本质量报告,方便 RD/PM 内部复盘</li>
<li>周知全部相关同学,避免遗漏,导致部分问题在会上没法给出结论</li>
</ul>
</li>
<li>对后续 TODO 进行有效的跟踪</li>
</ul>
<ol start="2">
<li>版本中各角色参与人(QA/RD/PM)</li>
<li>各方向负责人(QA/RD/PM)</li>
<li>[非必需]如果版本问题中涉及到第三方(例如数仓)，也需要要拉对应同学一起参与，对齐结论</li>
</ol>
<h4 id="复盘内容" tabindex="-1"><a class="header-anchor" href="#复盘内容"><span>复盘内容</span></a></h4>
<blockquote>
<p>目标: 1.各方对齐版本质量结果 2.针对版本过程中暴露出的问题是出有效解决方案</p>
</blockquote>
<ol>
<li>信息对齐:回顾版本结论,度量指标中哪些符合预期,哪些不符合预期;针对严重 bug、提测打回等单例问题,<br>
RD/QA 对齐产生原因</li>
<li>重点关注共性问题以及典型问题,特殊 case 不做过多分析 i</li>
<li>重点过版本结论以及改进,版本质量数据自行阅读</li>
</ol>
<h4 id="todo-项制定" tabindex="-1"><a class="header-anchor" href="#todo-项制定"><span>TODO 项制定</span></a></h4>
<ol>
<li>TODO 项应该符合 SMART 原则
<ul>
<li>具体的(Specific)=&gt;可执行,可落地</li>
<li>可以衡量的(Measurable)=&gt;可以验证效果</li>
<li>可以达到的(Attainable)=&gt;避免过度规划,根据现状制定合理有效实现路径,实现周期不超过 1 个月</li>
<li>相关的(Relevant)=&gt;确定能够解决某一类问题,是有意义的</li>
<li>具有明确的截止期限(Time-bound)=&gt;通过设置任务+截止时间+跟进人的方式跟踪</li>
</ul>
</li>
<li>版本质量报告中的改进类型:研发测试流程优化(与工具相结合 meego 流水线)、可测性问题解决、业务监控梳<br>
理......</li>
</ol>
<h4 id="step5-改进-回顾" tabindex="-1"><a class="header-anchor" href="#step5-改进-回顾"><span>Step5. 改进&amp;回顾</span></a></h4>
<ol>
<li>任务提醒</li>
<li>下次版本质量复盘时 review 本次 TODO</li>
<li>双月集中回顾 TODO List</li>
</ol>
</div></template>


