<template><div><h3 id="几个常用方法论" tabindex="-1"><a class="header-anchor" href="#几个常用方法论"><span>几个常用方法论</span></a></h3>
<ul>
<li>5w1h</li>
<li>5why</li>
<li>PDCA</li>
</ul>
<h3 id="tips" tabindex="-1"><a class="header-anchor" href="#tips"><span>Tips</span></a></h3>
<ol>
<li>改进方案可落地（具体内容、时间节点、跟进人），避免出现 xxx 流程优化之类宽泛的术语</li>
<li>是否加入改进方案：能否事故降级、能否规避/预防类似问题</li>
<li>改进方案优先考虑使用工具解决</li>
<li>红线行为约束：
<ul>
<li>研发红线：CR 逃逸、代码夹带、上线未观察....</li>
<li>测试红线：用例未执行、核心场景漏测</li>
</ul>
</li>
</ol>
<h3 id="优秀实践" tabindex="-1"><a class="header-anchor" href="#优秀实践"><span>优秀实践</span></a></h3>
<ul>
<li>B 站：<a href="https://mp.weixin.qq.com/s/nGtC5lBX_Iaj57HIdXq3Qg" target="_blank" rel="noopener noreferrer">https://mp.weixin.qq.com/s/nGtC5lBX_Iaj57HIdXq3Qg</a></li>
</ul>
<blockquote>
<p>下面是飞书上的一个公共 casestudy 模板</p>
</blockquote>
<h1 id="事故复盘会议相关信息" tabindex="-1"><a class="header-anchor" href="#事故复盘会议相关信息"><span>事故复盘会议相关信息</span></a></h1>
<table>
<thead>
<tr>
<th><strong>事故复盘会议时间</strong></th>
<th><em>x 年 x 月 x 日 时：分：秒</em></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>参会人</strong></td>
<td><em>必须参加：责任人，责任人的 Leader，责任业务线的产品，责任业务线的 QA，责任业务线的运营/技术运营，P0、P1 事故，需要加上业务线负责人</em></td>
</tr>
<tr>
<td><strong>事故沟通群</strong></td>
<td><em>@插入群名片</em></td>
</tr>
<tr>
<td><strong>工单链接</strong></td>
<td><em>【工单的级别】工单链接列表</em></td>
</tr>
<tr>
<td><strong>运营侧反馈的影响范围</strong></td>
<td><em>即升级 P0 工单的理由，包括但不限于一共影响了多少用户、是否必现、已经收到几个重点客户反馈或者投诉、接口调用的成功率、Crash 率</em></td>
</tr>
<tr>
<td><strong>事故定级</strong></td>
<td><em>事故定级</em></td>
</tr>
<tr>
<td><strong>事故链接</strong></td>
<td><em>事故链接，需要在复盘会议之前发起 Review</em></td>
</tr>
</tbody>
</table>
<h1 id="事故定级-0-77-p2" tabindex="-1"><a class="header-anchor" href="#事故定级-0-77-p2"><span>事故定级：0.77，P2</span></a></h1>
<blockquote>
<p>以下是事故分定级的计算和结果：需要填的列；自动计算的列；</p>
<p>注意：I5、I6 都是自动计算出结果的，请勿删除任何一行数据！</p>
</blockquote>
<table>
<thead>
<tr>
<th>受影响模块</th>
<th>模块分</th>
<th>影响比例</th>
<th>开始时间</th>
<th>结束时间</th>
<th>时长(分钟)</th>
<th>时长（天）</th>
<th>影响时长</th>
<th>模块事故分</th>
</tr>
</thead>
<tbody>
<tr>
<td>模块 1</td>
<td>12</td>
<td>0.01</td>
<td>2022/7/29 18:30</td>
<td>2022/7/29 19:25</td>
<td>55</td>
<td>0</td>
<td>0.916666667</td>
<td>0.11</td>
</tr>
<tr>
<td>模块 2</td>
<td>12</td>
<td>0.01</td>
<td>2022/7/29 18:30</td>
<td>2022/7/29 19:18</td>
<td>48</td>
<td>0</td>
<td>0.8</td>
<td>0.096</td>
</tr>
<tr>
<td>模块 3</td>
<td>10</td>
<td>0.01</td>
<td>2022/7/29 10:30</td>
<td>2022/7/29 21:18</td>
<td>648</td>
<td>0</td>
<td>7.533840106</td>
<td>0.753384011</td>
</tr>
<tr>
<td>最终事故分：</td>
<td>0.767400461</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>最终事故分定级：</td>
<td>P2</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<h1 id="事故还原" tabindex="-1"><a class="header-anchor" href="#事故还原"><span>事故还原</span></a></h1>
<table>
<thead>
<tr>
<th><strong>事故标题</strong></th>
<th><strong><em>服务+问题根因+现象；（如：XX 云服务故障导致 XX 业务大量用户无法正常登录）</em></strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>事故描述</strong></td>
<td><em>清晰明确的事故现象、重现方式的描述，最好有截图说明</em></td>
</tr>
<tr>
<td><strong>事故开始时间</strong></td>
<td><em>x 年 x 月 x 日 时：分：秒；事故问题上线时间（如：引发事故的代码上线时间）</em></td>
</tr>
<tr>
<td><strong>事故发现时间</strong></td>
<td><em>x 年 x 月 x 日 时：分：秒；对事故感知的时间（用户反馈时间或者监控发现时间等）</em></td>
</tr>
<tr>
<td><strong>事故响应时间</strong></td>
<td><em>x 年 x 月 x 日 时：分：秒；对事故响应的时间（研发投入处理的时间等）</em></td>
</tr>
<tr>
<td><strong>事故止血时间</strong></td>
<td><em>x 年 x 月 x 日 时：分：秒；事故完成止血的时间（线上止损时间）</em></td>
</tr>
<tr>
<td><strong>事故结束时间</strong></td>
<td><em>x 年 x 月 x 日 时：分：秒；通过发布等手段，问题完全解决时间（线上解决时间）</em></td>
</tr>
<tr>
<td><strong>所属平台</strong></td>
<td><em>服务端、客户端、前端、脚本类、离线任务、建库端、其他（请备注说明）</em></td>
</tr>
<tr>
<td><strong>事故来源</strong></td>
<td><em>监控预警、仅内部反馈（包含但不限于运营反馈、数据分析）、用户反馈（包含但不限于用户反馈、客户反馈）、其他（请备注说明）</em></td>
</tr>
<tr>
<td><strong>责任人</strong></td>
<td><em>事故责任人，请以“@姓名”的形式填写</em></td>
</tr>
<tr>
<td><strong>事故方</strong></td>
<td><em>事故的引发方</em></td>
</tr>
<tr>
<td><strong>引入风险类型</strong></td>
<td><em>什么操作引发了事故</em></td>
</tr>
<tr>
<td><strong>事故背景</strong></td>
<td><em>如引入风险类型为“代码变更”需确认：</em> <em>项目类型：xx（如：产品新需求、技术重构、策略优化、服务迁移、修复线上 bug、代码下线、搭车上线、技术优化）<strong>需求链接/MR 链接/版本号</strong>：</em> <em>随哪个版本、项目、需求上线？**配置变更提供配置链接：</em></td>
</tr>
</tbody>
</table>
<h3 id="影响范围" tabindex="-1"><a class="header-anchor" href="#影响范围"><span>影响范围</span></a></h3>
<p>影响说明：<em>请描述现象、整体被影响范围</em></p>
<table>
<thead>
<tr>
<th><strong>事故等级</strong></th>
<th><em>参考事故定级标准</em></th>
<th></th>
<th></th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>影响范围</strong></td>
<td><strong>影响用户</strong></td>
<td><strong>影响收入</strong></td>
<td><strong>技术指标</strong></td>
<td><strong>影响说明</strong></td>
</tr>
<tr>
<td><em>产品线/产品模块</em></td>
<td><em>影响用户数/活跃用户数</em></td>
<td><em>xxx（单位：人民币）</em></td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="产生原因" tabindex="-1"><a class="header-anchor" href="#产生原因"><span><strong>产生原因</strong></span></a></h3>
<p>*一句话描述事故的产生原因，*由于 xxx 导致 xxx，造成 xxx 影响</p>
<h3 id="处理过程" tabindex="-1"><a class="header-anchor" href="#处理过程"><span>处理过程</span></a></h3>
<blockquote>
<p><em>描述清楚时间线，人物，事情；其中【】的属于需要重点的填入的项</em></p>
</blockquote>
<p><strong>事故开始</strong></p>
<p><em>【事故开始】 x 年 x 月 x 日 时：分：秒；通过什么操作开始，操作的过程是怎样的</em></p>
<p><em>x 年 x 月 x 日 时：分：秒；xxxxxxxx</em></p>
<p><strong>如何发现</strong></p>
<p><em>【事故发现】 x 年 x 月 x 日 时：分：秒；何时、是谁、在哪里发现的，发现后第一时间如何处理的</em></p>
<p><em>【事故响应】 x 年 x 月 x 日 时：分：秒；哪个开发，何时正式介入排查</em></p>
<p><em>【转为 P0 工单】 x 年 x 月 x 日 时：分：秒；是谁，基于什么原因，判断需要升级为 P0 工单</em></p>
<p><strong>如何止损</strong></p>
<p><em>【确定止血方案】 x 年 x 月 x 日 时：分：秒；是谁，提出采用了什么手段进行缓解或者修复；可以提供文档链接</em></p>
<p><em>【提供影响范围】 x 年 x 月 x 日 时：分：秒；由于止血时间较长，开发提供影响范围</em></p>
<p><em>【止血前的话术】 x 年 x 月 x 日 时：分：秒；由于止血时间较长，用户仍然不断出现投诉，需要安抚客户。是谁（产品/技术运营）提供统一话术</em></p>
<p><em>【确定根本原因】 x 年 x 月 x 日 时：分：秒；是谁，确认了根本原因</em></p>
<p><em>【完成止血】 x 年 x 月 x 日 时：分：秒；xxxxxxxx，修复时遇到了哪些问题</em></p>
<p><strong>如何解决完毕</strong></p>
<p><em>【确定解决方案】 x 年 x 月 x 日 时：分：秒；是谁，提出采用了什么手段进行彻底解决；可以提供文档链接</em></p>
<p><em>【解决前的话术】 x 年 x 月 x 日 时：分：秒；由于解决时间较长，用户仍然不断出现投诉，需要安抚客户。是谁（产品/技术运营）提供统一话术</em></p>
<p><em>【完成解决】</em> <em>x 年 x 月 x 日 时：分：秒；xxxxxxxx，修复时遇到了哪些问题</em></p>
<p><em>【解决后的话术】 x 年 x 月 x 日 时：分：秒；全部解决后，通知客户验证，是谁（产品/技术运营）提供统一话术</em></p>
<h3 id="问题清单" tabindex="-1"><a class="header-anchor" href="#问题清单"><span>问题清单</span></a></h3>
<p><em>可以从产生原因、发现速度、发现过程、处理速度、处理过程等多个纬度来提炼事前、事中、事后各阶段的问题清单</em></p>
<h1 id="经验教训" tabindex="-1"><a class="header-anchor" href="#经验教训"><span>经验教训</span></a></h1>
<h2 id="做的好的地方" tabindex="-1"><a class="header-anchor" href="#做的好的地方"><span>做的好的地方</span></a></h2>
<h2 id="做的不好的地方" tabindex="-1"><a class="header-anchor" href="#做的不好的地方"><span>做的不好的地方</span></a></h2>
<h1 id="根因分析" tabindex="-1"><a class="header-anchor" href="#根因分析"><span>根因分析</span></a></h1>
<p><strong>需求&amp;设计环节</strong>：</p>
<p><em>需求是否完整？是否清晰？</em></p>
<p><em>是否有流程规范？流程规范是否执行到位？</em></p>
<p><strong>研发环节</strong>：</p>
<p><em>方案设计是否合理？</em></p>
<p><em>代码实现逻辑是否有问题？属于什么类型的问题（如性能问题、安全问题、兼容性问题等）？</em></p>
<p><em>是否有流程规范？流程规范是否执行到位？</em></p>
<p><em>是否可以预防？如何预防？</em></p>
<p><strong>QA 测试环节</strong>：</p>
<p><em>“功能环境，预发环境 ，线上小流量后自动化接口，线上发布完回归”四个阶段是否都经过测试？无测试介入的原因？</em></p>
<p><em>测试未拦截原因（如：需求理解不一致、测试用例覆盖不全、执行不到位等）？</em></p>
<p><em>是否有准入准出流程规范？流程规范是否执行到位？</em></p>
<p><em>是否可以预防？如何预防？</em></p>
<p><strong>发布上线环节</strong>：</p>
<p><em>客户端是否有灰度发布机制？</em></p>
<p><em>服务端是否遵循【小流量--&gt;单机房--&gt;全量】的发布流程？</em></p>
<p><em>配置变更是否遵循【小流量--&gt;单机房--&gt;全量】的发布流程？</em></p>
<p><em>服务端的每周正常发布次数是否控制在</em> ***3 次内，****每日发布控制在 1 次内？*</p>
<p><em>发布未拦截原因（如：未做线上验证、无拦截能力等）？</em></p>
<p><em>是否有流程规范？流程规范是否执行到位？</em></p>
<p><em>是否可以预防？如何预防？</em></p>
<p><strong>监控环节：</strong></p>
<p><em>是否有监控报警？</em></p>
<p><em>相关监控是否完备？</em></p>
<p><em>是否可以预防？如何预防？</em></p>
<p><strong>止损环节：</strong></p>
<p><em>解决时间长的原因（如：不好定位、受发版限制、是否需要善后等）？</em></p>
<p><em>是否有流程规范（如：线上止损流程、降级/应急方案）？流程规范是否完备？</em></p>
<p><em>是否可以预防？如何预防？</em></p>
<h1 id="改进计划" tabindex="-1"><a class="header-anchor" href="#改进计划"><span>改进计划</span></a></h1>
<blockquote>
<p>不要求数量，但要求质量；</p>
<p>改进计划，需落实到人，有明确的时间节点，有具体的执行内容；</p>
<p>改进计划的起止时间，建议短期周期不得超过 2 个周，长期周期不得超过 2 个月；</p>
<p>改进方向：技术层面、机制、流程；</p>
</blockquote>
<ul>
<li><em>改进内容；执行人；起止时间</em></li>
<li><em>改进内容；执行人；起止时间</em></li>
<li><em>改进内容；执行人；起止时间</em></li>
<li><em>改进内容；执行人；起止时间</em></li>
<li><em>改进内容；执行人；起止时间</em></li>
</ul>
</div></template>


