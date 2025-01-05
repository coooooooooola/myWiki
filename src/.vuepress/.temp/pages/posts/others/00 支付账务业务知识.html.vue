<template><div><blockquote>
<p>主要记录项目中遇到过的通用支付知识</p>
</blockquote>
<h2 id="支付牌照" tabindex="-1"><a class="header-anchor" href="#支付牌照"><span>支付牌照</span></a></h2>
<blockquote>
<p>支付牌照，全称为《支付业务许可证》，是中国人民银行根据《非金融机构支付服务管理办法》颁发的，允许支付机构在全国范围内从事非金融机构支付业务的资格证书。支付牌照的颁发，旨在规范我国非金融机构的支付业务，防范金融风险，维护支付市场的公平竞争秩序。</p>
</blockquote>
<h2 id="直连模式-vs-服务商模式" tabindex="-1"><a class="header-anchor" href="#直连模式-vs-服务商模式"><span>直连模式 VS 服务商模式</span></a></h2>
<blockquote>
<p><a href="https://pay.weixin.qq.com/wiki/doc/apiv3_partner/open/pay/chapter3_3_1.shtml" target="_blank" rel="noopener noreferrer">https://pay.weixin.qq.com/wiki/doc/apiv3_partner/open/pay/chapter3_3_1.shtml</a></p>
</blockquote>
<ul>
<li>直连模式：直连模式，商户自行申请入驻微信支付，无需服务商协助，直接成为直连商户。</li>
<li>服务商模式：商户申请成为微信支付服务商，服务商自身无法作为一个直连商户直接发起交易，其发起交易必须传入相关特约商户商户号的参数信息。</li>
</ul>
<p>作为平台</p>
<h2 id="微信支付模式" tabindex="-1"><a class="header-anchor" href="#微信支付模式"><span>微信支付模式</span></a></h2>
<blockquote>
<p><a href="https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=2_1" target="_blank" rel="noopener noreferrer">https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=2_1</a></p>
</blockquote>
<ul>
<li>
<p>付款码支付</p>
<blockquote>
<p>用户展示微信钱包内的“刷卡条码/二维码”给商户系统扫描后直接完成支付的模式，主要应用线下面对面收银的场景。</p>
</blockquote>
<p>暂时没有用到</p>
</li>
<li>
<p>Native 支付</p>
<blockquote>
<p>商户系统按微信支付协议生成支付二维码 ，用户再用微信“扫一扫”完成支付的模式。该模式适用于 PC 网站支付、实体店单品或订单支付、媒体广告支付等场景。</p>
</blockquote>
<p>PC 渠道使用（<a href="http://m.maoyan.com" target="_blank" rel="noopener noreferrer">m.maoyan.com</a>）</p>
</li>
<li>
<p>JSAPI 支付</p>
</li>
</ul>
<blockquote>
<p>JSAPI 支付是用户在微信中打开商户的 H5 页面，商户在 H5 页面通过调用微信支付提供的 JSAPI 接口调起微信支付模块完成支付。应用场景有：<br>
◆ 用户在微信公众账号内进入商家公众号，打开某个主页面，完成支付<br>
◆ 用户的好友在朋友圈、聊天窗口等分享商家页面链接，用户点击链接打开商家页面，完成支付<br>
◆ 将商户页面转换成二维码，用户扫描二维码后在微信浏览器中打开页面后完成支付</p>
</blockquote>
<p>​ 付费小说公众号常用</p>
<ul>
<li>
<p>APP 支付</p>
<blockquote>
<p>APP 支付又称移动端支付，是商户通过在移动端应用 APP 中集成开放 SDK 调起微信支付模块完成支付的模式。</p>
</blockquote>
<p>猫眼/美团/点评等 app，核心场景。</p>
</li>
<li>
<p>H5 支付</p>
<blockquote>
<p>H5 支付主要是在手机、ipad 等移动设备中通过浏览器来唤起微信支付的支付产品。</p>
</blockquote>
<p>H5 渠道使用</p>
</li>
<li>
<p>小程序支付</p>
<blockquote>
<p>小程序支付是专门被定义使用在小程序中的支付产品。目前在小程序中能且只能使用小程序支付的方式来唤起微信支付。</p>
</blockquote>
<p>微信小程序渠道使用</p>
</li>
</ul>
<h2 id="分账、对账、结算、资金流、结算配置" tabindex="-1"><a class="header-anchor" href="#分账、对账、结算、资金流、结算配置"><span>分账、对账、结算、资金流、结算配置</span></a></h2>
<blockquote>
<p>这些主要都应用在服务商模式</p>
</blockquote>
<ul>
<li>
<p>分账：服务商在订单支付成功后进行资金分配（比如一张票 50 元，平台 5 元，二级商户 45 元），将资金解冻打到二级商户和服务商子账户中。注意，划拨后的资金需要通过结算提取。收到支付成功回调且写入资金流后提交。<br>
用户发起退款时，也会像微信发起分账回退指令。<br>
<a href="https://pay.weixin.qq.com/wiki/doc/apiv3_partner/open/pay/chapter3_3_0.shtml" target="_blank" rel="noopener noreferrer">https://pay.weixin.qq.com/wiki/doc/apiv3_partner/open/pay/chapter3_3_0.shtml</a></p>
</li>
<li>
<p>资金流：记录一笔流水的明细，在分账、结算等场景使用。触发时机为收到支付回调</p>
</li>
<li>
<p>结算：</p>
</li>
<li>
<p>对账：</p>
</li>
<li>
<p>结算配置：记录了二级商户号信息（mch_id），只有服务商模式才有。每个二级商户会有对应的账户，用于资金结算。</p>
</li>
<li>
<p>结算：定期计算待结算金额，双方完成对账 确认后，实际操作打款，将商家二级账户的前提现到商家银行卡。根据行业特点，结算周期、结算的模式、生成结算单的方式都会不太一样，而且通常都会有结算运营人工介入。</p>
</li>
</ul>
<h2 id="境外支付" tabindex="-1"><a class="header-anchor" href="#境外支付"><span>境外支付</span></a></h2>
<blockquote>
<p>聚合支付：<a href="https://juejin.cn/post/7119441713784946695" target="_blank" rel="noopener noreferrer">https://juejin.cn/post/7119441713784946695</a> | <a href="https://juejin.cn/post/6844904179266240525" target="_blank" rel="noopener noreferrer">https://juejin.cn/post/6844904179266240525</a></p>
<p>国际支付：<a href="https://juejin.cn/post/7123833615930097672" target="_blank" rel="noopener noreferrer">https://juejin.cn/post/7123833615930097672</a></p>
<p><a href="https://juejin.cn/post/7109466578261016607" target="_blank" rel="noopener noreferrer">https://juejin.cn/post/7109466578261016607</a></p>
<p>mastercard visa 等境外支付在支付时需要填写较多信息，最重要的是 cvv 码和卡号。</p>
</blockquote>
<h3 id="一些概念" tabindex="-1"><a class="header-anchor" href="#一些概念"><span>一些概念</span></a></h3>
<ul>
<li>
<p>支付方式： 目前出海交易上分为卡支付方式、电子钱包支付、本地支付方式。</p>
</li>
<li>
<p>收单机构：又名为收单行，包含收单银行及专业性的第三方收单机构，在跨行交易中负责交易授权的发起及资金的结算。</p>
</li>
<li>
<p>支付渠道： 即支付方式对应的具体名称。</p>
</li>
<li>
<p>发卡行：发放银行卡的银行，比如招行、建行等等</p>
</li>
<li>
<p>卡组织：也被称为银行卡转接清算机构，是一个全球性的网络，负责处理全球范围内的支付、交易和信息转换等工作，它们是连接发卡机构（包括银行和非银行的金融机构）、特约商户和持卡人的桥梁，国际上共有六大卡组织（VISA、AE、银联、Master Card、Diners Club、JCB）</p>
</li>
<li>
<p>拒付（Chargeback）：信用卡持卡人可以在支付后的一段时间内向银行申请拒绝支付某笔交易的行为，一般发生在交易存在欺诈、不满意商品或服务、未收货等情况。（与退款的区别：退款是持卡人直接联系商家，拒付是持卡人联系发卡机构，发卡机构联系商家）。商家接到拒付申请后，也可以申诉。</p>
</li>
<li>
<p>3DS（Tree-Domain secure）支付验证：一直在线支付安全认证技术，主要用于 visa 和 mastercard（Visa - Verified By Visa (VBV)、MasterCard MasterCard Secure Code (MSC)）。</p>
</li>
</ul>
<h3 id="hk-支付方式" tabindex="-1"><a class="header-anchor" href="#hk-支付方式"><span>HK 支付方式</span></a></h3>
<blockquote>
<p>对接香港支付项目，需要适配非常多的支付渠道</p>
</blockquote>
<ul>
<li>信用卡支付</li>
<li>支付宝 HK</li>
<li>八达通</li>
<li>FPS</li>
<li>Apple Pay</li>
<li>Google Pay</li>
<li>微信</li>
</ul>
<h3 id="oceanpayment-钱海" tabindex="-1"><a class="header-anchor" href="#oceanpayment-钱海"><span>Oceanpayment 钱海</span></a></h3>
<blockquote>
<p><a href="https://www.oceanpayment.com/" target="_blank" rel="noopener noreferrer">https://www.oceanpayment.com/</a></p>
</blockquote>
<p>第三方支付服务商，境外支付项目需要支持多个支付渠道时，如果每对接一家都去找 VISA mastercard 等会十分费时。OceanPayment</p>
<figure><img src="https://swtywang.fun/minio/blog/27ab8d04e2d8a89ab3ec13332b18bb9b.png" alt="OceanPayment" tabindex="0" loading="lazy"><figcaption>OceanPayment</figcaption></figure>
<h2 id="银行渠道" tabindex="-1"><a class="header-anchor" href="#银行渠道"><span>银行渠道</span></a></h2>
<blockquote>
<p>银行渠道主要分为中小银行和大银行。中小银行通常是没有自己的对接方式，是走猫眼的统一 api 接口，这种接入会轻松许多，因为都是统一模板。对于大银行会有自己的开发规范，这时候就需要额外开发对应的接口实现了。</p>
</blockquote>
<h2 id="合单支付-vs-普通支付" tabindex="-1"><a class="header-anchor" href="#合单支付-vs-普通支付"><span>合单支付 VS 普通支付</span></a></h2>
<blockquote>
<p>普通：<a href="https://pay.weixin.qq.com/wiki/doc/apiv3_partner/open/devguidelines/chapter3_3_5.shtml" target="_blank" rel="noopener noreferrer">https://pay.weixin.qq.com/wiki/doc/apiv3_partner/open/devguidelines/chapter3_3_5.shtml</a><br>
合单：<a href="https://pay.weixin.qq.com/wiki/doc/apiv3_partner/open/devguidelines/chapter3_3_6.shtml" target="_blank" rel="noopener noreferrer">https://pay.weixin.qq.com/wiki/doc/apiv3_partner/open/devguidelines/chapter3_3_6.shtml</a></p>
</blockquote>
<p>区别：</p>
<p>1） 接口不同<br>
2）合单一般会有一个合单号和多个子单号，因此会衍生出更多的业务场景（比如部分退款）</p>
<figure><img src="https://swtywang.fun/minio/blog/79daa5cea434d93a6a2dea53932bc1e8.png" alt="2" tabindex="0" loading="lazy"><figcaption>2</figcaption></figure>
<figure><img src="https://swtywang.fun/minio/blog/bb606e8b47edbd271709a7fa93316884.png" alt="1" tabindex="0" loading="lazy"><figcaption>1</figcaption></figure>
<h2 id="对账" tabindex="-1"><a class="header-anchor" href="#对账"><span>对账</span></a></h2>
<blockquote>
<p><a href="https://tech.meituan.com/2018/03/21/balance-accounts.html" target="_blank" rel="noopener noreferrer">https://tech.meituan.com/2018/03/21/balance-accounts.html</a> &gt;<a href="https://blog.csdn.net/shumeizwb/article/details/136968813" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/shumeizwb/article/details/136968813</a></p>
</blockquote>
<p>对账有很多种，也是资损防控最重要的保障措施之一。根据实时性可以分为 T+0、T+1 等等，对账方有第三方 vs 支付、订单 vs 资金流。</p>
<p>核心的对账流程：数据准备 -&gt; 数据核对 -&gt; 差异处理</p>
<ul>
<li>数据准备：api/FTP/S3</li>
<li>数据核对：分片处理</li>
<li>差异处理：单边、双边、无差异</li>
</ul>
</div></template>


