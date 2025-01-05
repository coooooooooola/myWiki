<template><div><blockquote>
<p>&quot;可测性问题&quot;经常会出现在 QA 团队的 TOP 痛点问题中，针对这些问题的解决思路每个团队也不尽相同。这里会持续记录遇到过的典型可测性问题，并尝试做一些聚类</p>
</blockquote>
<figure><img src="https://swtywang.fun/minio//blog/e325063fad1b3d8fafc03c451ad30c59.png" alt="whiteboard_exported_image (7)" tabindex="0" loading="lazy"><figcaption>whiteboard_exported_image (7)</figcaption></figure>
<h3 id="一些思路" tabindex="-1"><a class="header-anchor" href="#一些思路"><span>一些思路</span></a></h3>
<h4 id="_1-mock-server-mock-client" tabindex="-1"><a class="header-anchor" href="#_1-mock-server-mock-client"><span>1. Mock Server/ Mock client</span></a></h4>
<p>使用 Postman、appMock 或者自研的内部 Mock 工具，实现构造出期望的上下游、第三方系统数据</p>
<h4 id="_2-测试代码" tabindex="-1"><a class="header-anchor" href="#_2-测试代码"><span>2. 测试代码</span></a></h4>
<p>目前接触的系统，或多或少都存在一些测试代码，这也是效率与质量的平衡，需要与 RD 一起评估，对测试代码做严格把控</p>
<h4 id="_3-debug" tabindex="-1"><a class="header-anchor" href="#_3-debug"><span>3. DEBUG</span></a></h4>
<p>在测试内部系统逻辑分支时，debug 代码更加方便实用</p>
<h4 id="_4-泳道治理" tabindex="-1"><a class="header-anchor" href="#_4-泳道治理"><span>4. 泳道治理</span></a></h4>
<p>每一个分支部署在特定的泳道，如果没有带泳道标走主干，需要推动 devops 能力与使用规范</p>
<h4 id="_5-流量录制回放" tabindex="-1"><a class="header-anchor" href="#_5-流量录制回放"><span>5. 流量录制回放</span></a></h4>
<p>实时录制或者定期收藏核心场景流量，测试前回放数据</p>
<h4 id="_6-测试计划提前沟通" tabindex="-1"><a class="header-anchor" href="#_6-测试计划提前沟通"><span>6. 测试计划提前沟通</span></a></h4>
<p>很多资源需要提前申请，这时候需要提前梳理和沟通（e.g. 账号融合）</p>
<h4 id="_7-自动化脚本" tabindex="-1"><a class="header-anchor" href="#_7-自动化脚本"><span>7. 自动化脚本</span></a></h4>
<p>链路数据生成、数据处理、数据比对</p>
<h4 id="_8-数仓类" tabindex="-1"><a class="header-anchor" href="#_8-数仓类"><span>8. 数仓类</span></a></h4>
</div></template>


