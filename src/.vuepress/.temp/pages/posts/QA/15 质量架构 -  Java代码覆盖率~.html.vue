<template><div><table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">Jacoco/Super-jacoco</th>
<th style="text-align:center">JVM-SANDOBX</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Github</td>
<td style="text-align:center"><a href="https://github.com/didi/super-jacoco" target="_blank" rel="noopener noreferrer">https://github.com/didi/super-jacoco</a> 454 star<br /> <a href="https://github.com/jacoco/jacoco" target="_blank" rel="noopener noreferrer">https://github.com/jacoco/jacoco</a> 4k star</td>
<td style="text-align:center"><a href="https://github.com/alibaba/jvm-sandbox" target="_blank" rel="noopener noreferrer">https://github.com/alibaba/jvm-sandbox</a> 6.6k star</td>
</tr>
<tr>
<td style="text-align:center">定位</td>
<td style="text-align:center">开源的覆盖率工具</td>
<td style="text-align:center">一种 JVM 的非侵入式运行期 AOP 解决方案，可用于故障定位、链路追踪、录制回放等场景</td>
</tr>
<tr>
<td style="text-align:center">插桩原理</td>
<td style="text-align:center">字节码增强</td>
<td style="text-align:center">基于 Instrumentation 的动态字节码增强</td>
</tr>
<tr>
<td style="text-align:center">插桩</td>
<td style="text-align:center">jacoco-agent.jar 无需改造</td>
<td style="text-align:center">支持，需要开发</td>
</tr>
<tr>
<td style="text-align:center">识别 header</td>
<td style="text-align:center">不支持，目前没看到较好的实现</td>
<td style="text-align:center">支持，需要开发</td>
</tr>
<tr>
<td style="text-align:center">增量覆盖率</td>
<td style="text-align:center">super-jacoco 已支持，无需改造</td>
<td style="text-align:center">支持，需要开发</td>
</tr>
<tr>
<td style="text-align:center">覆盖率数据收集&amp; 报告生成</td>
<td style="text-align:center">原生 dump + merge + report，无需改造</td>
<td style="text-align:center">不支持，自定义数据结构</td>
</tr>
<tr>
<td style="text-align:center">跨线程传递</td>
<td style="text-align:center">不支持</td>
<td style="text-align:center">支持</td>
</tr>
</tbody>
</table>
<h2 id="jacoco-super-jacoco" tabindex="-1"><a class="header-anchor" href="#jacoco-super-jacoco"><span>Jacoco/Super-jacoco</span></a></h2>
<blockquote>
<p>JaCoCo 通过修改字节码的方式来插入探针，这会导致一定程度上的“侵入性”，因为它需要在编译后的字节码中插入额外的代码，永久改变类文件。</p>
</blockquote>
<h3 id="核心流程" tabindex="-1"><a class="header-anchor" href="#核心流程"><span>核心流程</span></a></h3>
<p>JaCoCo 主要通过修改 Java 类的字节码来实现覆盖率分析。它会在编译后的 Java 类文件（即 .class 文件）中插入额外的字节码指令，这些指令称为探针（probe）或者插桩点（instrumentation points）。</p>
<h4 id="阶段-1-插桩" tabindex="-1"><a class="header-anchor" href="#阶段-1-插桩"><span>阶段 1. 插桩</span></a></h4>
<p>插桩点 -&gt; 生成插桩代码（字节码指令） -&gt; 插入探针 -&gt; 将插入探针后的字节码重新生成为类文件 -&gt; 类加载</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">mv</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">visitFieldInsn</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(Opcodes.</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">*</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">GETSTATIC</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">*</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"java/util/logging/Level"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"INFO"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,       </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Ljava/util/logging/Level;"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Calculator</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> int</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> add</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> a</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> b</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> a </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">+</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> b;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> int</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> subtract</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> a</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> b</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> a </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> b;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>===&gt; 插桩后代码</p>
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
<p>收集探针的执行情况，每个类是一个<code v-pre>ExecutionData</code>对象</p>
<h5 id="_1-executiondata" tabindex="-1"><a class="header-anchor" href="#_1-executiondata"><span>1. ExecutionData：</span></a></h5>
<ul>
<li>
<p><code v-pre>ExecutionData</code> 对象用于表示每个类（Class）或者源文件（Source File）的执行数据。</p>
</li>
<li>
<p>包含了类或源文件的名称、探针覆盖率数据数组以及类或源文件是否被执行的标志。</p>
</li>
<li>
<p>在 JaCoCo 的 API 中，ExecutionData 的类是<code v-pre> org.jacoco.core.data.ExecutionData</code>。</p>
</li>
</ul>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> final</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> ExecutionData</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> final</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> long</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    //类名</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> final</span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD"> boolean</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">[] probes</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2-executiondatastore" tabindex="-1"><a class="header-anchor" href="#_2-executiondatastore"><span>2. ExecutionDataStore：</span></a></h5>
<ul>
<li>ExecutionDataStore<code v-pre>是一个集合，用于存储所有的</code>ExecutionData` 对象。</li>
<li>每个<code v-pre> ExecutionData</code> 对象包含了一个或多个探针（例如，每个方法或者每行代码一个探针）的覆盖率数据。</li>
<li>在 JaCoCo 的 API 中，<code v-pre>ExecutionDataStore</code> 的类是 <code v-pre>org.jacoco.core.data.ExecutionDataStore</code>。</li>
</ul>
<h5 id="_3-sessioninfo" tabindex="-1"><a class="header-anchor" href="#_3-sessioninfo"><span>3. SessionInfo：</span></a></h5>
<ul>
<li>
<p>SessionInfo 用于表示单次测试运行的会话信息，包括会话名称、ID、时间戳等。</p>
</li>
<li>
<p>每个会话信息都对应一次测试的覆盖率数据。</p>
</li>
<li>
<p>在 JaCoCo 的 API 中，SessionInfo 的类是 org.jacoco.core.data.SessionInfo。</p>
</li>
</ul>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> SessionInfo</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> implements</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Comparable</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">SessionInfo</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">></span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">	private</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">	private</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> final</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> long</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> start</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">	private</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> final</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> long</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> dump</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_4-executiondatawriter-和-executiondatareader" tabindex="-1"><a class="header-anchor" href="#_4-executiondatawriter-和-executiondatareader"><span>4. ExecutionDataWriter 和 ExecutionDataReader：</span></a></h5>
<ul>
<li>这两个类用于将 <code v-pre>ExecutionData</code> 对象写入文件或者从文件中读取。</li>
<li><code v-pre>ExecutionDataWriter</code> 将<code v-pre> ExecutionDataStore</code> 中的数据写入文件。</li>
<li><code v-pre>ExecutionDataReader</code> 从文件中读取 <code v-pre>ExecutionData</code> 数据并加载到<code v-pre> ExecutionDataStore</code> 中。</li>
<li>在 JaCoCo 的 API 中，它们分别是 <code v-pre>org.jacoco.core.data.ExecutionDataWriter</code> 和 <code v-pre>org.jacoco.core.data.ExecutionDataReader</code>。</li>
</ul>
<h2 id="jvm-sandbox" tabindex="-1"><a class="header-anchor" href="#jvm-sandbox"><span>JVM-SANDBOX</span></a></h2>
<blockquote>
<p>运行时字节码增强：JVM-Sandbox 使用 Java Agent 机制在运行时对字节码进行修改。这意味着它是在类加载期间或类加载之后进行的动态增强，而不是在编译后静态地修改字节码。</p>
<p>无侵入修改字节码：这些增强和修改仅在当前 JVM 实例中生效，不会改变原始类文件的字节码。换句话说，重启应用程序或 JVM 后，增强将不再存在，原始类文件仍保持不变。</p>
</blockquote>
<p>具体原理在【流量录制回放平台】已记录，这里记录下 Java-Agent 的两种加载方式</p>
<h3 id="premain" tabindex="-1"><a class="header-anchor" href="#premain"><span>premain</span></a></h3>
<p><strong>定义和用途</strong>：</p>
<ul>
<li><code v-pre>premain</code> 方法是 Java Agent 的主要入口点，用于在 JVM 启动时，即主方法执行之前，加载 Java Agent。一般情况下，通过 <code v-pre>-javaagent</code> 参数加载 Agent。</li>
<li>可以在 <code v-pre>MANIFEST.MF</code> 文件中通过 <code v-pre>Premain-Class</code> 指定 <code v-pre>premain</code> 方法所在的类。</li>
</ul>
<p><strong>加载时机</strong>：</p>
<ul>
<li>在应用程序启动之前，即在 <code v-pre>main</code> 方法执行之前加载 Agent。</li>
<li>适合用于在 JVM 启动时就需要修改字节码或者监控应用程序的场景。</li>
</ul>
<h3 id="agentmain" tabindex="-1"><a class="header-anchor" href="#agentmain"><span>agentmain</span></a></h3>
<p><strong>加载时机</strong>：</p>
<ul>
<li>可以在 JVM 运行时通过 Attach API 动态加载 Agent。</li>
<li>适合用于需要在应用程序已经运行时动态地加载和使用 Java Agent 的场景。</li>
</ul>
</div></template>


