<template><div><nav class="table-of-contents"><ul><li><router-link to="#一些看法">一些看法</router-link></li><li><router-link to="#有用的工具">有用的工具</router-link></li><li><router-link to="#测试领域的实践">测试领域的实践</router-link><ul><li><router-link to="#gpt4v-在-ui-自动化测试的应用">GPT4V 在 UI 自动化测试的应用</router-link></li><li><router-link to="#单元测试生成">单元测试生成</router-link></li><li><router-link to="#需求生成测试用例">需求生成测试用例</router-link></li><li><router-link to="#接口自动化生成">接口自动化生成</router-link></li></ul></li></ul></nav>
<h2 id="一些看法" tabindex="-1"><a class="header-anchor" href="#一些看法"><span>一些看法</span></a></h2>
<blockquote>
<p>大模型已抢占各类互联网大会、社区博客的头条，测试领域也已经有非常多的讨论。</p>
</blockquote>
<p>我认为现处于探索&gt;&gt;实际落地的阶段，主要因为以下几个原因：</p>
<ol>
<li>无法控制大模型的&quot;涌现&quot;能力：主流的技术路线 LangChain + RAG + Agent 可以快速上手并看到一些&quot;效果&quot;。但是，目前只看到了 demo 级别的成功，因为预期结果不够稳定 甚至无法预知，进而无法大规模落地。</li>
<li>RAG 的数据质量：RAG 其实与大模型无关，主要是向量数据库的 topk 问题，他很大程度取决于训练数据结构、分词策略、embedding model、re-rank 策略等等，需要大量的实践经验。</li>
<li>代码生成有点鸡肋：代码生成的难点在于输入参数与业务的融合以及断言逻辑，与传统的单测/接口用例生成效果相比，大模型生成并没有很大的提升。各大厂商的 IDE 助手并没有很惊艳的感觉。</li>
<li>GPT4 比开源模型更加强大：由于数据安全的考虑，在方案落地时需要选用开源本地大模型，避免数据泄露。而诸多的本地大模型的体验效果比 GPT4 还是会有较大差距（Qwen2 据说很不错，还没有试用）</li>
<li>大模型微调需要消耗大量的资源，以及有较高的技术门槛。</li>
</ol>
<p>即便如此，我认为还是很有必要学习了解大模型的能力以及在测试领域的实践探索：</p>
<ol>
<li>大模型也在发展迭代，会有越来越多令人惊喜的能力</li>
<li>大模型的出现不会彻底废弃现有的平台，更多情况可能是对现有能力的补足和加强，如何结合也许是一个思路</li>
<li>如果可以深入研究大模型，而不仅仅是做一个 Api boy，大模型的潜力会被更多的挖掘</li>
</ol>
<h2 id="有用的工具" tabindex="-1"><a class="header-anchor" href="#有用的工具"><span>有用的工具</span></a></h2>
<ul>
<li>
<p><strong>大模型：</strong><a href="https://chatgpt.com/?model=auto" target="_blank" rel="noopener noreferrer">ChatGpt</a> | <a href="https://platform.openai.com/docs/overview" target="_blank" rel="noopener noreferrer">ChatGPT API</a> | <a href="https://ollama.com/" target="_blank" rel="noopener noreferrer">Ollama</a> | <a href="https://huggingface.co/" target="_blank" rel="noopener noreferrer">HuggingFace</a></p>
</li>
<li>
<p><strong>框架：</strong><a href="https://python.langchain.com/v0.2/docs/introduction/" target="_blank" rel="noopener noreferrer">LangChain</a> | <a href="https://anythingllm.com/" target="_blank" rel="noopener noreferrer">Anything LLM</a> | <a href="https://github.com/chatchat-space/Langchain-Chatchat" target="_blank" rel="noopener noreferrer">Langchain-Chatchat</a></p>
</li>
<li>
<p><strong>Agent：</strong> <a href="coze.cn">Coze</a> | <a href="https://microsoft.github.io/autogen/" target="_blank" rel="noopener noreferrer">AutoGen</a> | <a href="https://langchain-ai.github.io/langgraph/#overview" target="_blank" rel="noopener noreferrer">LangGraph</a> | <a href="https://www.skyvern.com" target="_blank" rel="noopener noreferrer">skyvern</a></p>
</li>
<li>
<p><strong>研发/测试场景：</strong> <a href="https://github.com/features/copilot" target="_blank" rel="noopener noreferrer">Copilot</a> | <a href="https://github.com/mimo-x/Code-Review-GPT-Gitlab" target="_blank" rel="noopener noreferrer">Code-Review-GPT-Gitlab</a> | <a href="https://github.com/codefuse-ai/Test-Agent" target="_blank" rel="noopener noreferrer">Test-Agent</a> | <a href="https://github.com/zhayujie/chatgpt-on-wechat" target="_blank" rel="noopener noreferrer">chatgpt-on-wechat</a>| <a href="https://www.skyvern.com" target="_blank" rel="noopener noreferrer">skyvern</a></p>
</li>
<li>
<p><strong>评测：</strong> <a href="https://rank.opencompass.org.cn/leaderboard-llm/" target="_blank" rel="noopener noreferrer">司南</a></p>
</li>
</ul>
<h2 id="测试领域的实践" tabindex="-1"><a class="header-anchor" href="#测试领域的实践"><span>测试领域的实践</span></a></h2>
<h3 id="gpt4v-在-ui-自动化测试的应用" tabindex="-1"><a class="header-anchor" href="#gpt4v-在-ui-自动化测试的应用"><span>GPT4V 在 UI 自动化测试的应用</span></a></h3>
<blockquote>
<p>受 <a href="https://developer.jdcloud.com/article/3510" target="_blank" rel="noopener noreferrer">京东</a>、<a href="https://github.com/ddupont808/GPT-4V-Act/" target="_blank" rel="noopener noreferrer">GPT-4V-Act</a>的一些启发，和前端完成了一些改造，以便于更好地融入我们已有的 UI 自动化中，用作定位方式之一。</p>
</blockquote>
<h4 id="主要流程" tabindex="-1"><a class="header-anchor" href="#主要流程"><span>主要流程</span></a></h4>
<p>Step1. SoM/ui-automation 标记<br>
通过 web/windows 端不同的元素识别能力，标识出页面元素</p>
<p>Step2. GPT4V 识别，返回下一步指令</p>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" data-title="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"action"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Step3. 调用 Selenium/Ui-automation 完成具体操作</p>
<h3 id="单元测试生成" tabindex="-1"><a class="header-anchor" href="#单元测试生成"><span>单元测试生成</span></a></h3>
<blockquote>
<p>工具</p>
</blockquote>
<ul>
<li>传统工具：<a href="https://*squaretest*.com/" target="_blank" rel="noopener noreferrer">squaretest</a></li>
<li>AI 工具：Copilot、百度 Comate、腾讯、阿里、科大讯飞星火、</li>
</ul>
<blockquote>
<p>使用对比</p>
</blockquote>
<ul>
<li>
<p>通用能力</p>
<ul>
<li>JavaBean Mock</li>
<li>生成标准格式的单测单码</li>
</ul>
</li>
<li>
<p>通用问题：</p>
<ul>
<li>接口入参构造粗糙</li>
<li>断言有效性</li>
</ul>
</li>
<li>
<p>解决思路：</p>
<ul>
<li>Text2SQL + Agent，通过多智能体不断优化参数</li>
<li>Schema 校验</li>
</ul>
</li>
<li>
<p>AI 问题：</p>
<ul>
<li>无法自动生成文件（不额外借助其他 Agent 工具情况下），操作路径较复杂</li>
<li>由于 temporate 的问题，随机性较强</li>
<li>工具目前仅支持单方法生成，squaretest 支持文件级别的生成</li>
</ul>
</li>
</ul>
<h3 id="需求生成测试用例" tabindex="-1"><a class="header-anchor" href="#需求生成测试用例"><span>需求生成测试用例</span></a></h3>
<blockquote></blockquote>
<h3 id="接口自动化生成" tabindex="-1"><a class="header-anchor" href="#接口自动化生成"><span>接口自动化生成</span></a></h3>
<blockquote>
<p>Swagger + RAG</p>
</blockquote>
</div></template>


