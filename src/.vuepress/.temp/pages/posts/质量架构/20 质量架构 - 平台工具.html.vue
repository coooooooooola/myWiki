<template><div><h2 id="价值" tabindex="-1"><a class="header-anchor" href="#价值"><span>价值</span></a></h2>
<figure><img src="https://swtywang.fun/minio//blog/e41fe2851151f08974ad4b949e3cada5.png" alt="效能工具价值" tabindex="0" loading="lazy"><figcaption>效能工具价值</figcaption></figure>
<p>总体来说，效能工具的主要目标与业务高度一致，即持续提升业务质量和效率，同时也需要辅助 QA/RD 实现有效的度量运营工作。</p>
<h3 id="提升质量" tabindex="-1"><a class="header-anchor" href="#提升质量"><span>提升质量</span></a></h3>
<p>完全基于&quot;人&quot;的测试通常会存在几个质量隐患：</p>
<ul>
<li>每个 QA 在业务理解、测试设计覆盖度等维度都因为经验能力差异而不尽相同</li>
<li>测试执行中小概率的遗漏 / QA 红线行为</li>
<li>影响范围评估不准</li>
<li>不可测问题（包含性能探测）</li>
<li>......</li>
</ul>
<p>这些测试隐患会导致交付质量波动，以及缺少质量兜底的能力。工具一方面可以缩小个体引起的质量差异，也会不断抬升质量底线和上线。</p>
<h3 id="提升效率" tabindex="-1"><a class="header-anchor" href="#提升效率"><span>提升效率</span></a></h3>
<p>几个典型的重复场景：</p>
<ul>
<li>重复执行固定场景的测试用例</li>
<li>重复的编译打包-&gt; 登录机器 -&gt; 部署</li>
<li>重复构造各种场景的测试数据</li>
<li>......</li>
</ul>
<p>将大量重复机械的操作转为自动化，可以释放大量的 QA 人力投入更有价值的事情上</p>
<h3 id="度量运营" tabindex="-1"><a class="header-anchor" href="#度量运营"><span>度量运营</span></a></h3>
<p>团队 Leader/专项 POC 可能更关注看到本部门/部门间/子业务线维度的趋势数据，而一线 QA 除此之外还希望下钻获得明细数据。测试平台需要提供多视角、准确且有价值的度量数据，同时这些数据的口径需要十分明确。</p>
<p>诸如<a href="https://cloud.tencent.com/developer/article/2326165" target="_blank" rel="noopener noreferrer">DevMind</a>的统一度量平台可以让目标人群清晰地了解现状与趋势，辅助下一步策略的制定。</p>
<h2 id="谁来做" tabindex="-1"><a class="header-anchor" href="#谁来做"><span>谁来做</span></a></h2>
<p>业务 QA 参与到平台的建设是很有必要的：</p>
<ul>
<li>平台是为了解决问题而生的，业务 QA 更清楚当前的痛点</li>
<li>实现需求产生-&gt;需求实现-&gt;需求交付的闭环，节省一部分&quot;推销&quot;成本</li>
<li>平台建设属于质量保障体系的一部分，不是两个团队的事</li>
<li>代码能力提升也有助于测试质量提升</li>
</ul>
<blockquote>
<p>update 2024：工具组与业务组分开的模式可能更适用于大公司，主要是出于人效、团队技术栈的考量。</p>
</blockquote>
<h2 id="质量与效率的平衡" tabindex="-1"><a class="header-anchor" href="#质量与效率的平衡"><span>质量与效率的平衡</span></a></h2>
<ul>
<li>将平台看做一个业务，按需搭建相关的保障措施（规范、测试策略）</li>
<li>梳理和拆解核心功能/能力 List，简化非核心功能交互和实现</li>
<li>组件化：通常测试平台都类似 B 端产品，具有相似的 web 形态；后端也可以抽象出公共组件实现代码复用</li>
<li>技术调研注重实用、扩展、成熟度，不炫技</li>
<li>定期众测</li>
</ul>
</div></template>


