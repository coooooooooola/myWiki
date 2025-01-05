<template><div><h2 id="如何制定" tabindex="-1"><a class="header-anchor" href="#如何制定"><span>如何制定？</span></a></h2>
<blockquote>
<p>制定适合业务的质量保障体系，与业务发展阶段、质量目标、质量痛点、业务特型、RD/QA/PM 团队情况等都有较大关联。</p>
</blockquote>
<h3 id="_0-通用体系" tabindex="-1"><a class="header-anchor" href="#_0-通用体系"><span>0. 通用体系</span></a></h3>
<h3 id="_1-生命周期" tabindex="-1"><a class="header-anchor" href="#_1-生命周期"><span>1. 生命周期</span></a></h3>
<p>产品的生命周期包括探索期、成长期、成熟期和衰退期，QA 同样需要基于业务发展的不同阶段 针对性指定响应策略。</p>
<ul>
<li>
<p>探索期：</p>
<ul>
<li>产品目标：快速试错 明确产品定位 走通商业模式</li>
<li>产品特点：效率第一，用户量少，场景相对简单</li>
<li>质量目标：测试效率优先，保证交付，质量容忍度高</li>
<li>质量风险：野蛮生长</li>
<li>保障思路：业务优先 建立信任；测试技术 &gt; 测试专项；结合公司基建低成本搭建通用的测试工具；建立初步的研发测试流程</li>
</ul>
</li>
<li>
<p>成长期</p>
<ul>
<li>产品目标：DAU/营收迅猛扩张，超越竞品</li>
<li>产品特点：玩法变多，策略变复杂，QPS 上涨</li>
<li>质量目标：对测试质量要求提升，线上 P0 问题收敛</li>
<li>质量风险：质量兜底能力薄弱；代码变更风险</li>
<li>质量目标&amp;思路：完善研发测试流程；建立测试专项；质量度量与运营；QA 人力补充与分工</li>
</ul>
</li>
<li>
<p>成熟期</p>
<ul>
<li>产品目标：DAU/营收在高位趋于稳定，建立口碑</li>
<li>产品特点：技术突破；成本控制</li>
<li>质量目标：低逃逸率低、人效提升</li>
<li>质量风险：长尾问题；回归成本；管控能力</li>
<li>质量目标&amp;思路：CICD；成熟度模型；业务特型</li>
</ul>
</li>
</ul>
<h3 id="_2-质量现状分析" tabindex="-1"><a class="header-anchor" href="#_2-质量现状分析"><span>2. 质量现状分析</span></a></h3>
<ul>
<li>数据口径明确且有意义、统计准确</li>
<li>波动率与绝对值</li>
<li>北极星指标与过程指标</li>
<li>精力有限 抓大放小</li>
</ul>
<h3 id="_3-目标与现状评估" tabindex="-1"><a class="header-anchor" href="#_3-目标与现状评估"><span>3. 目标与现状评估</span></a></h3>
<ul>
<li>目标来源：【主】业务 Top 痛点、业务质量现状 【辅】横向专项目标、+1 目标</li>
<li>现状评估：达成路径可行性、人力情况</li>
</ul>
<p>Step1. 摸清业务质量现状 + Top 问题<br>
Step2. 评估目标周期内可以改进哪部分，明确落地路径<br>
Step3. 【反复沟通】与 QA/RD/专项等沟通 &lt;=&gt; 目标调整<br>
Step4. 目标对齐</p>
<h2 id="如何落地" tabindex="-1"><a class="header-anchor" href="#如何落地"><span>如何落地？</span></a></h2>
<h3 id="流程规范" tabindex="-1"><a class="header-anchor" href="#流程规范"><span>流程规范</span></a></h3>
<blockquote>
<ol>
<li>标准可执行</li>
<li>工具化辅助规范落地</li>
<li>不过度约束</li>
<li>QA/RD/PM 三方对齐</li>
</ol>
</blockquote>
<ul>
<li>
<p>需求阶段：</p>
<ul>
<li>插单规范</li>
</ul>
</li>
<li>
<p>研发阶段</p>
<ul>
<li>技术方案评审模板</li>
<li>Code Review 规范</li>
<li>分支管理</li>
<li>提测标准</li>
<li>研发红线</li>
</ul>
</li>
<li>
<p>测试阶段</p>
<ul>
<li>测试用例模板</li>
<li>测试标准（兼容性、回归、提单等等）</li>
<li>测试红线</li>
<li>准入准出标准</li>
</ul>
</li>
<li>
<p>上线阶段</p>
<ul>
<li>日志观察</li>
</ul>
</li>
</ul>
<h3 id="测试技术" tabindex="-1"><a class="header-anchor" href="#测试技术"><span>测试技术</span></a></h3>
<blockquote>
<p>测试技术是 QA 的基本盘，也是很多&quot;测试专项&quot;和&quot;测试策略&quot;的基础，但现状却是越来越不被重视，进而影响质量体系发挥的效果</p>
</blockquote>
<h3 id="度量与运营" tabindex="-1"><a class="header-anchor" href="#度量与运营"><span>度量与运营</span></a></h3>
<blockquote>
<p>度量：明确口径、统计准确</p>
</blockquote>
<p>过程指标：打回次数、代码扫描、测试覆盖率、构建成功率......<br>
结果指标：事故数、线上问题数、SLA、Crash 率</p>
<blockquote>
<p>运营：版本质量报告、事故复盘...</p>
</blockquote>
<img src="https://swtywang.fun/minio/blog/fd93d4fd8a7aba27c1d12f560bc3097a.png" alt="image-20240812024458041" style="zoom:50%;" />
<h3 id="cicd" tabindex="-1"><a class="header-anchor" href="#cicd"><span>CICD</span></a></h3>
<blockquote>
<p>作为研发测试一站式工具平台，串联诸多的流程规范与测试能力的落地</p>
</blockquote>
<h3 id="团队" tabindex="-1"><a class="header-anchor" href="#团队"><span>团队</span></a></h3>
<ul>
<li>能力评估：擅长/不擅长、团队定位、个人诉求...</li>
<li>目标对齐：目标可量化，路径可执行，职责清晰不模糊</li>
<li>产研团队：定期沟通</li>
<li>知识库&amp;分享：QA 基本功、业务、工具平台、问题共享</li>
</ul>
</div></template>


