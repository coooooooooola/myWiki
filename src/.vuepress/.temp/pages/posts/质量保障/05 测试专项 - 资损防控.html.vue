<template><div><blockquote>
<p>关于&quot;资损防控&quot;的主要是来自《阿里测试之道》和支付系统的测试工作，现在部门也花了较大精力开展资损防控专项，主要思路也是基于阿里的延续和补充。本章节分为两部分：1）梳理《阿里测试之道》关于资损防控的思路 2）结合工作实践的一些想法</p>
</blockquote>
<h2 id="《阿里测试之道》资损防控" tabindex="-1"><a class="header-anchor" href="#《阿里测试之道》资损防控"><span>《阿里测试之道》资损防控</span></a></h2>
<h3 id="_1-资损风险防控体系" tabindex="-1"><a class="header-anchor" href="#_1-资损风险防控体系"><span>1. 资损风险防控体系</span></a></h3>
<p>资损指由于产品设计缺陷、产品实现异常、员工操作错误导到致的公司或公司客户蒙受<br>
的直接或间接的资金损失。</p>
<p>资损防控包括防和控两项工作，资损风险防控体系如下：</p>
<figure><img src="https://swtywang.fun/minio//blog/5950daaf7c034c94e02d19ba1fb7e254.png" alt="image-20240922104701659" tabindex="0" loading="lazy"><figcaption>image-20240922104701659</figcaption></figure>
<h4 id="_1-1-如何防" tabindex="-1"><a class="header-anchor" href="#_1-1-如何防"><span>1.1 如何防？</span></a></h4>
<p>根据资损来源,我们从产品设计、系统实现、流程变更三个阶段进行分类预防：</p>
<ul>
<li>产品设计阶段：需提前明确资金流及异常分支等，从根本上规避风险。</li>
<li>系统实现阶段：需细化资损风险点分析、代码内嵌防控措施，从业务的载体上<br>
做风险拦截。</li>
<li>流程变更阶段：需基于变更流程多个角色的完整验收，从业务的产出上做风险<br>
兜底。</li>
</ul>
<p>对应的措施：</p>
<ul>
<li>分层功能测试</li>
<li>基于资金的特性做分布式一致性测试、并发测试、幂等测试、兼容性测试...</li>
<li>线下至线上的多环境的测试回归</li>
<li>变更管控三板斧：监控策略、灰度策略、回滚策略</li>
</ul>
<h4 id="_1-2-如何控" tabindex="-1"><a class="header-anchor" href="#_1-2-如何控"><span>1.2 如何控？</span></a></h4>
<ul>
<li>异常日志，业务大盘</li>
<li>业务数据流视角：证证、证账、账账、账实对账</li>
<li>核对能力视角：一致性核对、业务正确性核对、会计日切兜底核对</li>
</ul>
<h3 id="_2-资损风险防范" tabindex="-1"><a class="header-anchor" href="#_2-资损风险防范"><span>2. 资损风险防范</span></a></h3>
<blockquote>
<p>这一部分着重介绍线下测试阶段如何防范，【测试要点】个人认为是最核心的部分，它既是 QA 的本职工作，也是后续一些专项的梳理工作的基础。</p>
</blockquote>
<figure><img src="https://swtywang.fun/minio//blog/3575aa4d1127a38c3278e1207167ceb9.png" alt="资损风险防范" tabindex="0" loading="lazy"><figcaption>资损风险防范</figcaption></figure>
<h3 id="_3-资损风险识别" tabindex="-1"><a class="header-anchor" href="#_3-资损风险识别"><span>3. 资损风险识别</span></a></h3>
<blockquote>
<p>风险识别主要是针对预发布/线上阶段，目的是更快速、精准的发现资金风险</p>
</blockquote>
<figure><img src="https://swtywang.fun/minio//blog/c6a4375c45dd624742060301ef68eb3a.png" alt="资损风险识别" tabindex="0" loading="lazy"><figcaption>资损风险识别</figcaption></figure>
<h3 id="_4-资损防控文化" tabindex="-1"><a class="header-anchor" href="#_4-资损防控文化"><span>4. 资损防控文化</span></a></h3>
<ul>
<li>红蓝攻防</li>
<li>常态化演练</li>
</ul>
<h2 id="一些想法" tabindex="-1"><a class="header-anchor" href="#一些想法"><span>一些想法</span></a></h2>
<ul>
<li>将资损防控成立为专项 主要是从资金风险的视角评估。其实它属于服务端测试的一个分支，测试流程以及需要掌握的测试技术并没有十分明显的差别。</li>
<li>防和控的策略和优先级，会受到测试人员能力、质量现状、项目特点等多方面的影响，需要灵活把控</li>
<li>线下阶段测试是最重要的环节，值得长期改进（技术提升、模板化、工具化、风险地图）</li>
<li>风险识别的数据核对规则也要测试，避免出现监控失效的情况</li>
</ul>
</div></template>


