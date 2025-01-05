<template><div><h3 id="_0-nginx-日志分析" tabindex="-1"><a class="header-anchor" href="#_0-nginx-日志分析"><span>0. nginx 日志分析</span></a></h3>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="_1-负载均衡策略" tabindex="-1"><a class="header-anchor" href="#_1-负载均衡策略"><span>1. 负载均衡策略</span></a></h3>
<div class="language-nginx line-numbers-mode" data-highlighter="shiki" data-ext="nginx" data-title="nginx" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">upstream</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> test {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    server</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> localhost:8080;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    server</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> localhost:8081;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">#按权重</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">upstream</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> test {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    server</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> localhost:8080 </span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">weight</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">9</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    server localhost:8081 </span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">weight</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># ip_hash</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 最初版本的用户session存在本地，按照上面配置会丢失登录态，临时采取这个方式，后采用分布式存储后解决</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">upstream test {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">	  ip_hash;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    server</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> localhost:8080 </span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">weight</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">9</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    server localhost:8081 </span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">weight</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-https-配置" tabindex="-1"><a class="header-anchor" href="#_2-https-配置"><span>2. https 配置</span></a></h3>
<blockquote>
<p>对接 devops 时需要支持 https，否则会跨域</p>
</blockquote>
<div class="language-nginx line-numbers-mode" data-highlighter="shiki" data-ext="nginx" data-title="nginx" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">server</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    listen </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">      443</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ssl;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    server_name </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> xxx;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    client_max_body_size </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">5M</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    ssl_certificate </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">/usr/local/nginx/ssl/project.crt;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    ssl_certificate_key </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">/usr/local/nginx/ssl/project.key;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    ssl_protocols </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    ssl_ciphers </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'DEFAULT'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    ssl_prefer_server_ciphers </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">off</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生成证书：</p>
<ul>
<li>JDK-keytool：<a href="https://docs.oracle.com/en/java/javase/11/tools/keytool.html" target="_blank" rel="noopener noreferrer">https://docs.oracle.com/en/java/javase/11/tools/keytool.html</a></li>
<li>OpenSSL</li>
<li>阿里云（前提有域名）</li>
<li><a href="https://www.tangyuecan.com/2021/12/17/%E5%B1%80%E5%9F%9F%E7%BD%91%E5%86%85%E6%90%AD%E5%BB%BA%E6%B5%8F%E8%A7%88%E5%99%A8%E5%8F%AF%E4%BF%A1%E4%BB%BB%E7%9A%84ssl%E8%AF%81%E4%B9%A6/" target="_blank" rel="noopener noreferrer">windows 局域网</a>：</li>
</ul>
<h3 id="_3-跨域" tabindex="-1"><a class="header-anchor" href="#_3-跨域"><span>3. 跨域</span></a></h3>
<h3 id="_4-gzip-压缩数据" tabindex="-1"><a class="header-anchor" href="#_4-gzip-压缩数据"><span>4. gzip 压缩数据</span></a></h3>
<blockquote>
<p>有个接口需要返回给前端大概 8-10M 的数据，但是加载资源的事件过长影响体验</p>
</blockquote>
<div class="language-ngin line-numbers-mode" data-highlighter="shiki" data-ext="ngin" data-title="ngin" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>gzip  on; #开启压缩</span></span>
<span class="line"><span>gzip_min_length 1024800;</span></span>
<span class="line"><span>gzip_buffers 4 8k;</span></span>
<span class="line"><span>gzip_types application/json;  # 按需配置</span></span>
<span class="line"><span>gzip_comp_level 9;  #1-9 9最大</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-根据-header-打到对应机器-机器组" tabindex="-1"><a class="header-anchor" href="#_5-根据-header-打到对应机器-机器组"><span>5. 根据 header 打到对应机器/机器组</span></a></h3>
<blockquote>
<p>线上调试/信创改造</p>
<p>$http_&lt;header_name&gt;</p>
</blockquote>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>upstream backend1 {</span></span>
<span class="line"><span>        ip_hash;</span></span>
<span class="line"><span>        server 192.168.179.XXX:8080;</span></span>
<span class="line"><span>        server 192.168.179.XXX:8080;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>upstream backend2 {</span></span>
<span class="line"><span>    server 192.168.179.XXX:8080;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#根据header value路由到不通的upstream</span></span>
<span class="line"><span>map $http_wx $test {</span></span>
<span class="line"><span>    default http://backend;</span></span>
<span class="line"><span>    123456 http://kylin;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>location /api {</span></span>
<span class="line"><span>    rewrite "^/api/(.*)$" /$1 break;   #对指定的路径进行转发到后台</span></span>
<span class="line"><span>    proxy_pass $test;</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-location-语法和执行优先级" tabindex="-1"><a class="header-anchor" href="#_6-location-语法和执行优先级"><span>6. location 语法和执行优先级</span></a></h3>
<div class="language-nginx line-numbers-mode" data-highlighter="shiki" data-ext="nginx" data-title="nginx" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">在nginx官方文档中定义的location语法结构为：</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">location</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [ = | ~ | ~* | ^~ ] uri  {...}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>各个选项含义如下：</p>
<ul>
<li>= ： 用于标准 uri 前面，要求请求字符串与 uri 严格匹配</li>
<li>～ ： 用于表示 uri 包含正则表达式，并且区分大小写</li>
<li>～* ： 用于表示 uri 包含正则表达式，并且不区分大小写<br>
【注】如果 uri 包含正则表达上，就必须要使用～或者～*标识</li>
<li>^~ : 用于标准 uri(即 uri 不含有正则表达式)，要求 nginx 服务器找到 uri 和请求字符串匹配度最高的的 location 后，立即按照此 location 请求，而不再使用 location 的正则 uri 和请求字符串进行匹配</li>
<li>不加选项：即一般匹配。在不添加选项时，nginx 服务器会在 server 块的多个 location 块中搜索是否有标准 uri 和请求字符串匹配，如果有多个匹配则记录匹配度最高的一个，如果只有一个就记录这个。然后再搜索正则 uri，当地一个正则 uri 匹配成功，就结束搜索，并使用此正则 location，如果正则匹配全部失败，那么就用刚才记录的。</li>
</ul>
<p><strong>执行流程/优先级</strong> 1.执行=精确匹配到的 location 块 2.执行^~匹配到的 location 块 3.遍历无选项的 location 块，逐个进行匹配。挑选匹配度最高的一个先记录下来，如果没有则跳过 4.执行正则匹配，遇到匹配成功的就执行此 location 块的内容。如果都没有匹配到，则执行上一步中的记录</p>
<p><strong>无选项的一般匹配的 location 是没有顺序之分的，会按照匹配度匹配；正则匹配是有顺序的，第一个匹配到了就会停止</strong></p>
<h3 id="_7-处理转发-uri-规则" tabindex="-1"><a class="header-anchor" href="#_7-处理转发-uri-规则"><span>7. 处理转发 uri 规则</span></a></h3>
<blockquote>
<p>前端的接口/api/xxx，转发到后端去掉去掉这个前缀；也可以用于根据不同应用做转发的场景</p>
</blockquote>
<div class="language-nginx line-numbers-mode" data-highlighter="shiki" data-ext="nginx" data-title="nginx" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">location</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> /api {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            rewrite</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "^/api/(.*)$"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> /$</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">1</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> break</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;   </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">#对指定的路径进行转发到后台</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-root-alias" tabindex="-1"><a class="header-anchor" href="#_8-root-alias"><span>8. Root &amp; alias</span></a></h3>
<p>root 与 alias 主要区别在于请求路径 Uri 与目录路径是否一致，举个例子：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>location ^~ /t/ {</span></span>
<span class="line"><span>    root    /www/root/html;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>如果一个请求的URI是/t/a.html时，web服务器将会返回服务器上的/www/root/html/t/a.html的文件。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>location ^~ /t/ {</span></span>
<span class="line"><span>    alias    /www/root/html/;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>如果一个请求的URI是/t/a.html时，web服务器将会返回服务器上的/www/root/html/a.html的文件。注意这里是alias会把location后面配置的路径丢弃掉，把当前匹配到的目录指向到指定的目录。</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-nginx-403-error" tabindex="-1"><a class="header-anchor" href="#_9-nginx-403-error"><span>9. Nginx 403 error</span></a></h3>
<div class="language-nginx line-numbers-mode" data-highlighter="shiki" data-ext="nginx" data-title="nginx" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">user </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">nobody | root | ...</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>user 指令设置了 nginx 权限，如果资源是需要 root 权限访问，但是 nginx 设置的 nobody，会出现 403</p>
<h3 id="_10-nginx-日志分析" tabindex="-1"><a class="header-anchor" href="#_10-nginx-日志分析"><span>10. nginx 日志分析</span></a></h3>
<div class="language-nginx line-numbers-mode" data-highlighter="shiki" data-ext="nginx" data-title="nginx" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">log_format </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> main</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">  '$</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">remote_addr</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> - $</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">remote_user</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> [$</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">time_local</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">] "$</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">request</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">" '</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">                      '$</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">status</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> $</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">body_bytes_sent</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "$</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">http_referer</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">" '</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">                      '"$</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">http_user_agent</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">" "$</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">http_x_forwarded_for</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">access_log </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> logs/access.log  </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 某一接口耗时</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">cat</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> access_log.2018052820 | awk </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'{if($</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">7</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">=="\/papi\/music\/detail") print $</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">0</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">}'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | awk -F request_time= </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'{total+=$</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">2</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">}END{avg=total/NR;print avg}'</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 统计一段时间内，访问次数最多的10个接口以及他们的平均耗时</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 先格式化需要的信息，然后再放到数组中计数即可</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">pdo2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> -y -q -r </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> -a iknow-baby-na </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"cat  log/access_log.2018053002"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| awk </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'{if($</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">9</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">==200){print $</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">7</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">,$</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">NF</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">}}'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | awk -F </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'[ =]'</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '{times[$</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">1</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">]++;interface[$</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">1</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">]+=$</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">3</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">}END{for(i in interface){print times[i],i,interface[i]/times[i]}}'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| sort -n -r|uniq | head -n 10</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 统计某一个接口的pv</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># grep的方法效率比较低</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">pdo2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> -y -q -r  </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> -a iknow-baby-na </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"cat log/access_log.2018053002"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| awk </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'{if($</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">7</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">=="\/papi\/duma\/dumalive"){times++}}END{print times}'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">or</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">pdo2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> -y -q -r  </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> -a iknow-baby-na </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"cat log/access_log.2018053002"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| grep  </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"\/papi\/duma\/dumalive"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | wc -l</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


