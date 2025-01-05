<template><div><blockquote>
<p>分别从平台开发者和业务使用者角度总结一下精准测试/质量预防的一些工作</p>
</blockquote>
<h2 id="一、-平台建设" tabindex="-1"><a class="header-anchor" href="#一、-平台建设"><span>一、 平台建设</span></a></h2>
<h3 id="建设目标" tabindex="-1"><a class="header-anchor" href="#建设目标"><span>建设目标</span></a></h3>
<p>降低由于代码变更引发的线上/线下问题数，提升研发代码质量以及测试质量</p>
<h3 id="核心能力" tabindex="-1"><a class="header-anchor" href="#核心能力"><span>核心能力</span></a></h3>
<ul>
<li>影响范围精准评估 =&gt; 基于微服务的链路追踪（静态/动态）</li>
<li>测试用例精准推荐 =&gt; 测试用例与代码关联（服务级/方法级/接口级）</li>
<li>测试结果精准度量 =&gt; 单测/接口自动化/手工测试的覆盖率分析、代码扫描、技术栈、CR 指标</li>
<li>打通 CI/CD 流水线 =&gt; 为 devops 提供原子能力</li>
</ul>
<h3 id="业界实现" tabindex="-1"><a class="header-anchor" href="#业界实现"><span>业界实现</span></a></h3>
<ul>
<li><a href="https://tech.meituan.com/2023/09/22/construction-and-practice-of-code-change-risk-visualization-system.html" target="_blank" rel="noopener noreferrer">美团到家：代码变更风险可视化系统</a>：基于字节码分析技术提供了诸多代码分析能力</li>
<li><a href="https://github.com/didi/super-jacoco" target="_blank" rel="noopener noreferrer">滴滴：super-jacoco</a>：基于 jacoco 的二次开发，支持增量和自定义时间的覆盖率统计，打通多环境对接。</li>
<li><a href="https://www.perfma.com/solution/precision" target="_blank" rel="noopener noreferrer">PerfMa：端到端精准测试解决方案</a>：商业化产品，功能完善</li>
</ul>
<h3 id="核心技术" tabindex="-1"><a class="header-anchor" href="#核心技术"><span>核心技术</span></a></h3>
<ul>
<li>字节码插桩 =&gt; Jacoco 、JVM-SANDBOX</li>
<li>代码分析 =&gt; AST 、ASM、DLA</li>
<li>链路分析 =&gt; skywalking、zipkin、CAT</li>
<li>数据存储 =&gt; Hive、图数据库</li>
</ul>
<h3 id="jacoco-实现原理" tabindex="-1"><a class="header-anchor" href="#jacoco-实现原理"><span>Jacoco 实现原理</span></a></h3>
<h4 id="阶段-1-插桩" tabindex="-1"><a class="header-anchor" href="#阶段-1-插桩"><span>阶段 1. 插桩</span></a></h4>
<p>插桩点 -&gt; 生成插桩代码（字节码指令） -&gt; 插入探针 -&gt; 将插入探针后的字节码重新生成为类文件 -&gt; 类加载</p>
<p>比如源代码如下：</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Calculator</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> int</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> add</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> a</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> b</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> a </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">+</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> b;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> int</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> subtract</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> a</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> b</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> a </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> b;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>插桩后的代码会增加如下方法级别与行级别的探针，代码经过后会被染色。</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Calculator</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> static</span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD"> boolean</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">[] $jacocoData</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> int</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> add</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> a</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> b</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#C678DD">        boolean</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">[] </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$jacocoData</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> $jacocoInit</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        $jacocoData[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">; </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 方法入口探针</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        int</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> result</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> a </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">+</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> b;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        $jacocoData[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">; </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 行探针</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> result;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> int</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> subtract</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> a</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> b</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#C678DD">        boolean</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">[] </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$jacocoData</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> $jacocoInit</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        $jacocoData[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">; </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 方法入口探针</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        int</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> result</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> a </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> b;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        $jacocoData[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">; </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 行探针</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> result;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> static</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> boolean[] $</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">jacocoInit</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ($jacocoData </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            $jacocoData </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD"> boolean</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">4</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]; </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 总共4个探针</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> $jacocoData;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="阶段-2-执行" tabindex="-1"><a class="header-anchor" href="#阶段-2-执行"><span>阶段 2. 执行</span></a></h4>
<p>遇到 ALOAD、xPUSH 等字节码触发探针染色</p>
<h4 id="阶段-3-dump" tabindex="-1"><a class="header-anchor" href="#阶段-3-dump"><span>阶段 3. dump</span></a></h4>
<p>收集探针的执行情况，每个类是一个 ExecutionData 对象</p>
<ol>
<li><strong>ExecutionData</strong>：
<ol>
<li><code v-pre>ExecutionData</code> 对象用于表示每个类（Class）或者源文件（Source File）的执行数据。</li>
<li>包含了类或源文件的名称、探针覆盖率数据数组以及类或源文件是否被执行的标志。</li>
<li>在 JaCoCo 的 API 中，<code v-pre>ExecutionData</code> 的类是 <code v-pre>org.jacoco.core.data.ExecutionData</code>。</li>
</ol>
</li>
</ol>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> final</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> ExecutionData</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> final</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> long</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    //类名</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> final</span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD"> boolean</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">[] probes</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> }</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li><strong>ExecutionDataStore</strong>：
<ol>
<li><code v-pre>ExecutionDataStore</code> 是一个集合，用于存储所有的 <code v-pre>ExecutionData</code> 对象。</li>
<li>每个 <code v-pre>ExecutionData</code> 对象包含了一个或多个探针（例如，每个方法或者每行代码一个探针）的覆盖率数据。</li>
<li>在 JaCoCo 的 API 中，<code v-pre>ExecutionDataStore</code> 的类是 <code v-pre>org.jacoco.core.data.ExecutionDataStore</code>。</li>
</ol>
</li>
<li><strong>SessionInfo</strong>：
<ol>
<li><code v-pre>SessionInfo</code> 用于表示单次测试运行的会话信息，包括会话名称、ID、时间戳等。</li>
<li>每个会话信息都对应一次测试的覆盖率数据。</li>
<li>在 JaCoCo 的 API 中，<code v-pre>SessionInfo</code> 的类是 <code v-pre>org.jacoco.core.data.SessionInfo</code>。</li>
</ol>
</li>
</ol>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> SessionInfo</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> implements</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Comparable</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">SessionInfo</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">></span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> final</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> long</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> start</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> final</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> long</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> dump</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> }</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li><strong>ExecutionDataWriter</strong> 和 <strong>ExecutionDataReader</strong>：
<ol>
<li>这两个类用于将 <code v-pre>ExecutionData</code> 对象写入文件或者从文件中读取。</li>
<li><code v-pre>ExecutionDataWriter</code> 将 <code v-pre>ExecutionDataStore</code> 中的数据写入文件。</li>
<li><code v-pre>ExecutionDataReader</code> 从文件中读取 <code v-pre>ExecutionData</code> 数据并加载到 <code v-pre>ExecutionDataStore</code> 中。</li>
<li>在 JaCoCo 的 API 中，它们分别是 <code v-pre>org.jacoco.core.data.ExecutionDataWriter</code> 和 <code v-pre>org.jacoco.core.data.ExecutionDataReader</code>。</li>
</ol>
</li>
</ol>
<h3 id="其他插桩方案" tabindex="-1"><a class="header-anchor" href="#其他插桩方案"><span>其他插桩方案</span></a></h3>
<p>Jacoco 的方案已经十分成熟，基于 Jacoco 优化的各种实现也很多，但是通过字节码增强的 Jacoco 探针类型比较简单（数组），因此暂时无法基于不同标识用户的覆盖率统计。JVM-SANDBOX 比较试用与此类场景，只需在 beforeLine 与 after 事件中解析不同标识的流量并做记录类方法与代码行信息，即可实现个性化的覆盖率统计功能。简单 demo 实现如下</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> com.alibaba.jvm.sandbox.api.event.BeforeEvent</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> com.alibaba.jvm.sandbox.api.event.Event</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> com.alibaba.jvm.sandbox.api.listener.EventListener</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> com.alibaba.jvm.sandbox.api.listener.ext.Advice</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> javax.servlet.http.HttpServletRequest</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> java.util.concurrent.ConcurrentHashMap</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> java.util.concurrent.CopyOnWriteArrayList</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> java.util.concurrent.atomic.AtomicInteger</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">/**</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> * Created by swtywang on 2024/03/10 下午3:34</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> */</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> CovCollectListener</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> implements</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> EventListener</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> static</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> ThreadLocal</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">></span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> localVar </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> ThreadLocal</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;></span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">  	private</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> ConcurrentHashMap</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> CopyOnWriteArrayList</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">StackTraceElement</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">>></span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> userMethodCache </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> ConcurrentHashMap</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;></span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">  	private</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> beforeLine</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Advice</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> advice</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> lineNum</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> className</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> advice</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getProcessTop</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">().</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getBehavior</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">().</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getDeclaringClass</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">().</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getName</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> methodName</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> advice</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getProcessTop</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">().</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getBehavior</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">().</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getName</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> user</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> localVar</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (user </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">!=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">            StackTraceElement</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> stackTraceElement</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> StackTraceElement</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">                    advice</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getBehavior</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">().</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getDeclaringClass</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">().</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getName</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(),</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">                    advice</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getBehavior</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">().</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getName</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(),</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">                    advice</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getBehavior</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">().</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getDeclaringClass</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">().</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getName</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(),</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">                    advice</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getAdvice</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">().</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getLineNumber</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            );</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            userMethodCache</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">computeIfAbsent</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(user, k </span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD">-></span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> CopyOnWriteArrayList</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;>()).</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">add</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(stackTraceElement);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、业务实践" tabindex="-1"><a class="header-anchor" href="#二、业务实践"><span>二、业务实践</span></a></h2>
<blockquote>
<p>精准测试属于质量预防的一个子集（传统意义的精准测试通常从产生 Code Diff 开始，而从质量预防的视角看实际会更加前置）</p>
</blockquote>
<h3 id="落地场景" tabindex="-1"><a class="header-anchor" href="#落地场景"><span>落地场景</span></a></h3>
<h4 id="_1-技术方案评审" tabindex="-1"><a class="header-anchor" href="#_1-技术方案评审"><span>1. 技术方案评审</span></a></h4>
<blockquote>
<p>技术方案体现了 RD 对于需求的设计完备程度，也是 QA 在设计用例的一个关键参考。如果技术方案质量较差，QA&amp;RD 通常会在各自的代码和测试用例中遗漏关键内容。技术方案缺陷也是线上事故的重要归因之一。</p>
</blockquote>
<ul>
<li>技术方案标准化（通用 + 业务特型 + badcase + ...）</li>
</ul>
<h4 id="_2-code-review" tabindex="-1"><a class="header-anchor" href="#_2-code-review"><span>2. Code Review</span></a></h4>
<blockquote>
<p>很多&quot;低级代码&quot;引起的线上问题通常会被归因为 CR 缺失，通常也只是诸如&quot;加强 CR&quot;等难落地的改进项，效果不佳。</p>
<p>Code Review 质量与研发团队的质量文化有很大的关联，需要长期的运营</p>
</blockquote>
<p>从 RD 视角以及个人实际体验来看，CR 阶段很难发现问题的原因：</p>
<ol>
<li>（CR 缺失）对于 CR 不够重视，直接找其他 RD 或者 QA +1</li>
<li>（关注点不同）CR 通常更多聚焦在代码规范和整体架构设计的是否合理</li>
<li>（效果不佳）不是所有 Reviewer 都很熟悉审查的代码逻辑、CR 时间不充裕</li>
</ol>
<p>一些落地实践：</p>
<ul>
<li>制定 Code Review 规范：Code Reviewer 人选 、分支规范、评审会、代码行限制。尽可能将规范落在 git 工具中做强制性配置，跳过即红线。</li>
<li>CR 度量与运营：逃逸率、CR 评论数、CR 有效率</li>
<li>代码扫描：规范问题、缺陷问题、技术债</li>
<li>（美团的）Code Review 支持跳转调用链</li>
</ul>
<h4 id="_3-影响面分析-精准测试" tabindex="-1"><a class="header-anchor" href="#_3-影响面分析-精准测试"><span>3. 影响面分析（精准测试）</span></a></h4>
<p>这一阶段会根据 Diff Code 生成代码变更的链路以及涉及接口/方法，帮助 QA&amp;RD 可视化了解代码改动影响面。QA 可以根据结果补充测试用例</p>
<h4 id="_4-测试覆盖率-风险评估报告" tabindex="-1"><a class="header-anchor" href="#_4-测试覆盖率-风险评估报告"><span>4. 测试覆盖率 &amp; 风险评估报告</span></a></h4>
<p>测试覆盖率支持统计某个测试环境的代码行覆盖率情况，指标可以直接作为准出标准。风险评估报告记录了改动链路的覆盖程度，更加全面，根据业务实际情况做消费。</p>
<h4 id="_5-质量预防" tabindex="-1"><a class="header-anchor" href="#_5-质量预防"><span>5. 质量预防</span></a></h4>
<p>定期扫描研发代码规范、缺陷以及研发各环节的指标数据，从中发现研发环节的问题与改进点。</p>
<ul>
<li>
<p>北极星指标：千行代码缺陷率/千行当量代码缺陷率</p>
</li>
<li>
<p>过程指标：</p>
<ul>
<li>CR：有效评审率、逃逸率、评论率、应答率</li>
<li>代码规范：Critical 问题数、问题解决率、圈复杂度、注释率、重复度</li>
<li>代码缺陷：Critical 问题数、问题解决率、badcase 规则生成数</li>
<li>,,,,,,</li>
</ul>
</li>
</ul>
<h3 id="实践思考" tabindex="-1"><a class="header-anchor" href="#实践思考"><span>实践思考</span></a></h3>
<blockquote>
<p>结合工作经历的一些想法</p>
</blockquote>
<h4 id="_1-精准测试-质量预防对业务-qa-的价值" tabindex="-1"><a class="header-anchor" href="#_1-精准测试-质量预防对业务-qa-的价值"><span>1. 精准测试/质量预防对业务 QA 的价值</span></a></h4>
<ul>
<li>精准测试本质是基于规则生成一系列客观的测试/研发过程数据供 QA&amp;RD 消费，平台提供的很多数据还是十分有参考意义的，可以辅助我们更好地了解现状并查漏补缺。</li>
<li>质量预防重点关注研发代码质量，根据语法和历史事故提炼出核心规则 可以对增量代码做兜底的扫描；此外 CR 和技术债相关的度量指标也能更好地指导 RD/QA 做后续的改进</li>
</ul>
<h4 id="_2-精准测试遇到的问题" tabindex="-1"><a class="header-anchor" href="#_2-精准测试遇到的问题"><span>2. 精准测试遇到的问题</span></a></h4>
<ul>
<li>
<p>数据”过度依赖“：</p>
<ul>
<li>以代码覆盖率为例，由于多个场景可能对应同一行代码，所以即使 100%的覆盖率也并不能保障没有漏测。</li>
<li>避免为了让数据指标看起来健康而消费 =&gt;</li>
</ul>
</li>
<li>
<p>数据难消费：</p>
<ul>
<li>覆盖率数据消费需要 QA 对代码有些了解，否则又变成了主观的工具</li>
<li>链路分析数据通常大而全，如何快速精准的消费成了 QA 的难题</li>
</ul>
</li>
</ul>
<p>因为以上两点，造成了虽然现在各种开源/闭源的精准测试产品都实现了相似的功能，但是不同业务团队的使用效果却天差地别，也造成对精准测试的褒贬不一。</p>
<h4 id="_3-如何使用效果更佳" tabindex="-1"><a class="header-anchor" href="#_3-如何使用效果更佳"><span>3. 如何使用效果更佳</span></a></h4>
<ul>
<li>自上而下：QA+1 与 RD+1 对齐目标后的逐层宣贯，团队所有人都会有目标感，推动会更顺畅</li>
<li>自下而上：推动过程中建立&quot;样板间&quot;，推广最佳实践</li>
<li>度量与运营：设立北极星指标以及对应过程指标，定期分析波动情况与归因（避免过度解读，分析 topxx 问题或者业务）；运营措施也会受团队规模影响</li>
<li>QA 代码能力提升：覆盖率与精准链路分析的结果报告是接口/代码，懂代码的 QA 可以更好地把控结果，避免过度依赖 RD 判断</li>
<li>测试分级：比如不同地系统覆盖率阈值不同；不同的需求消费测试链路数据的要求不同</li>
</ul>
</div></template>


