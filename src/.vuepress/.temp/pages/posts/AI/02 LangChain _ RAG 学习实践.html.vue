<template><div><nav class="table-of-contents"><ul><li><router-link to="#langchain-框架基础知识">LangChain 框架基础知识</router-link><ul><li><router-link to="#整体框架">整体框架</router-link></li></ul></li><li><router-link to="#components">Components</router-link><ul><li><router-link to="#_1-chat-models">1. Chat models</router-link></li><li><router-link to="#_2-llms">2. LLMs</router-link></li><li><router-link to="#_3-message">3. Message</router-link></li><li><router-link to="#_4-prompt-templates">4. Prompt templates</router-link></li><li><router-link to="#_5-output-parsers">5. Output parsers</router-link></li><li><router-link to="#chat-history">Chat history</router-link></li><li><router-link to="#documents-loaders">Documents Loaders</router-link></li><li><router-link to="#text-splitters">Text splitters</router-link></li><li><router-link to="#embedding-models">Embedding models</router-link></li><li><router-link to="#vector-stores">Vector stores</router-link></li><li><router-link to="#retrievers">Retrievers</router-link></li><li><router-link to="#tools">Tools</router-link></li><li><router-link to="#agents">Agents</router-link></li><li><router-link to="#callbacks">CallBacks</router-link></li></ul></li><li><router-link to="#rag">RAG</router-link><ul><li><router-link to="#_0-工作流程">0. 工作流程</router-link></li><li><router-link to="#_1-rag-的技术点">1. RAG 的技术点</router-link></li><li><router-link to="#_2-应用场景">2. 应用场景</router-link></li><li><router-link to="#_3-问题与使用体验">3. 问题与使用体验</router-link></li></ul></li></ul></nav>
<blockquote>
<p>前置准备</p>
<ol>
<li>gpt 账号</li>
<li>python3.11 以及相关依赖</li>
</ol>
</blockquote>
<h2 id="langchain-框架基础知识" tabindex="-1"><a class="header-anchor" href="#langchain-框架基础知识"><span>LangChain 框架基础知识</span></a></h2>
<blockquote>
<p>LangChain Docs：</p>
<ol>
<li>快速入门：<a href="https://python.langchain.com/v0.2/docs/tutorials/" target="_blank" rel="noopener noreferrer">https://python.langchain.com/v0.2/docs/tutorials/</a></li>
<li>具体 demo 实现：<a href="https://python.langchain.com/v0.2/docs/how_to/" target="_blank" rel="noopener noreferrer">https://python.langchain.com/v0.2/docs/how_to/</a></li>
<li>基本概念解释：<a href="https://python.langchain.com/v0.2/docs/concepts/" target="_blank" rel="noopener noreferrer">https://python.langchain.com/v0.2/docs/concepts/</a></li>
<li>API 文档：<a href="https://api.python.langchain.com/en/latest/langchain_api_reference.html" target="_blank" rel="noopener noreferrer">https://api.python.langchain.com/en/latest/langchain_api_reference.html</a></li>
</ol>
</blockquote>
<h3 id="整体框架" tabindex="-1"><a class="header-anchor" href="#整体框架"><span>整体框架</span></a></h3>
<figure><img src="https://swtywang.fun/minio/blog/b42d6ea1c0325b7f1e7acf4cf0593efd.jpg" alt="1071722819813_.pic" tabindex="0" loading="lazy"><figcaption>1071722819813_.pic</figcaption></figure>
<ul>
<li>LangChain-Core：基础抽象和 LangChain 表达式语言</li>
<li>LangChain-community：第三方集成</li>
<li>LangChain：构建应用程序认知架构的链、代理和检索策略</li>
</ul>
<h2 id="components" tabindex="-1"><a class="header-anchor" href="#components"><span>Components</span></a></h2>
<blockquote>
<p>LangChain 为各种组件提供了标准的、可扩展的接口和外部集成，这些组件对 llm 的构建非常有用。有些组件是由 LangChain 实现的，有些组件是依靠第三方集成来实现的，还有一些则是混合的。</p>
<p>后面的实际应用会根据实际需要，组合使用这些组件。</p>
</blockquote>
<h3 id="_1-chat-models" tabindex="-1"><a class="header-anchor" href="#_1-chat-models"><span>1. Chat models</span></a></h3>
<p>使用消息序列作为输入并返回聊天消息作为输出的语言模型，Chat Model 支持为对话消息分配不同的角色，帮助区分来自 AI、用户和指令的消息。 尽管底层模型是消息输入和消息输出，但 LangChain 包装器还允许这些模型接受字符串作为输入（会被转化为 HUmanMessage）。<strong>这意味着我们也可以使用聊天模型来代替 llm。</strong></p>
<p>标准参数：</p>
<ul>
<li><code v-pre>model</code>: the name of the model</li>
<li><code v-pre>temperature</code>: the sampling temperature （0-1 数值越大 结果随机性越强）</li>
<li><code v-pre>timeout</code>: request timeout</li>
<li><code v-pre>max_tokens</code>: max tokens to generate</li>
<li><code v-pre>stop</code>: default stop sequences</li>
<li><code v-pre>max_retries</code>: max number of times to retry requests</li>
<li><code v-pre>api_key</code>: API key for the model provider</li>
<li><code v-pre>base_url</code>: endpoint to send requests to</li>
</ul>
<p>对于多模态的支持：<a href="https://python.langchain.com/v0.2/docs/integrations/chat/#advanced-features" target="_blank" rel="noopener noreferrer">https://python.langchain.com/v0.2/docs/integrations/chat/#advanced-features</a></p>
<p><a href="https://python.langchain.com/v0.2/docs/how_to/#chat-models" target="_blank" rel="noopener noreferrer">一些应用</a>：</p>
<ul>
<li>
<p><a href="https://python.langchain.com/v0.2/docs/how_to/tool_calling/" target="_blank" rel="noopener noreferrer">tool_calling</a></p>
</li>
<li>
<p><a href="https://python.langchain.com/v0.2/docs/how_to/structured_output/" target="_blank" rel="noopener noreferrer">结构化输出</a></p>
</li>
</ul>
<h3 id="_2-llms" tabindex="-1"><a class="header-anchor" href="#_2-llms"><span>2. LLMs</span></a></h3>
<blockquote>
<p>纯文本格式的模型，目前已经可以用 Chat Model 代替</p>
</blockquote>
<p><a href="https://python.langchain.com/v0.2/docs/how_to/#llms" target="_blank" rel="noopener noreferrer">应用 DEMO</a></p>
<h3 id="_3-message" tabindex="-1"><a class="header-anchor" href="#_3-message"><span>3. Message</span></a></h3>
<blockquote>
<p>根据角色可以分为 HumanMessage、AIMessage、SystemMessage、ToolMessage、FunctionMessage</p>
</blockquote>
<h4 id="_3-1-humanmessage" tabindex="-1"><a class="header-anchor" href="#_3-1-humanmessage"><span>3.1 HumanMessage</span></a></h4>
<p>代表用户发出的消息，字符串会被作为 HumanMessage</p>
<h4 id="_3-2-aimessage" tabindex="-1"><a class="header-anchor" href="#_3-2-aimessage"><span>3.2 AIMessage</span></a></h4>
<p>代表是大模型发出的消息，通常会额外包含 reponse_metadata 和 tool_calls 信息</p>
<h4 id="_3-3-systemmessage" tabindex="-1"><a class="header-anchor" href="#_3-3-systemmessage"><span>3.3 SystemMessage</span></a></h4>
<p>代表系统消息，告诉模型该如何做。不是所有模型支持（GPT 支持）</p>
<h4 id="_3-4-toolmessage" tabindex="-1"><a class="header-anchor" href="#_3-4-toolmessage"><span>3.4 ToolMessage</span></a></h4>
<p>代表工具调用返回的接口</p>
<h4 id="_3-5-functionmessage-todo" tabindex="-1"><a class="header-anchor" href="#_3-5-functionmessage-todo"><span>3.5 FunctionMessage(todo)</span></a></h4>
<ul>
<li>这是一个遗留消息类型，对应于 OpenAI 的遗留函数调用 API。应该使用 ToolMessage 来对应更新后的工具调用 API。 这表示函数调用的结果。除了角色和内容之外，该消息还有一个 name 参数，该参数表示为产生此结果而调用的函数的名称。</li>
</ul>
<h3 id="_4-prompt-templates" tabindex="-1"><a class="header-anchor" href="#_4-prompt-templates"><span>4. Prompt templates</span></a></h3>
<p>提示模板将用户输入和参数转换为语言模型的指令，用于指导模型的响应，帮助它理解上下文并生成相关和一致的基于语言的输出。 提示模板接受一个字典作为输入，其中每个键代表提示模板中要填写的一个变量。 提示模板输出一个 PromptValue。这个 PromptValue 可以传递给 LLM 或 ChatModel，也可以强制转换为字符串或消息列表。</p>
<p>常见的提示词模板类型：</p>
<h4 id="_4-1-string-prompt-templates" tabindex="-1"><a class="header-anchor" href="#_4-1-string-prompt-templates"><span>4.1 String Prompt Templates</span></a></h4>
<p>最简单的提示词模板，用于一些很简单的任务。</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> langchain_core.prompts </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> PromptTemplate</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">prompt_template </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> PromptTemplate.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">from_template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Tell me a joke about </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">{topic}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">prompt_template.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">invoke</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">({</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"topic"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"cats"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">})</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://api.python.langchain.com/en/latest/prompts/langchain_core.prompts.prompt.PromptTemplate.html" target="_blank" rel="noopener noreferrer">API 文档</a></p>
<h4 id="_4-2-chat-prompt-templates" tabindex="-1"><a class="header-anchor" href="#_4-2-chat-prompt-templates"><span>4.2 Chat Prompt Templates</span></a></h4>
<p>用于格式化消息列表，而且可以为每条消息设定不同的角色</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> langchain_core.prompts </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ChatPromptTemplate</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">prompt_template </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ChatPromptTemplate.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">from_messages</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">([</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    (</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"system"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"You are a helpful assistant"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    (</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"user"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Tell me a joke about </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">{topic}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">prompt_template.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">invoke</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">({</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"topic"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"cats"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">})</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://api.python.langchain.com/en/latest/prompts/langchain_core.prompts.chat.ChatPromptTemplate.html" target="_blank" rel="noopener noreferrer">API 文档</a></p>
<h4 id="_4-3-messages-placeholder" tabindex="-1"><a class="header-anchor" href="#_4-3-messages-placeholder"><span>4.3 Messages Placeholder</span></a></h4>
<blockquote>
<p>Chat Prompt Templates 的消息列表是固定的，如果希望支持用户能够传递一个消息列表，将这些消息放入特定的位置，需要使用 MessagesPlaceholder 的方法。</p>
</blockquote>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> langchain_core.prompts </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ChatPromptTemplate, MessagesPlaceholder</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> langchain_core.messages </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> HumanMessage</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">prompt_template </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ChatPromptTemplate.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">from_messages</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">([</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    (</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"system"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"You are a helpful assistant"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">    MessagesPlaceholder</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"msgs"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">prompt_template.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">invoke</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">({</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"msgs"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: [</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">HumanMessage</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">content</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"hi!"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)]})</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://api.python.langchain.com/en/latest/prompts/langchain_core.prompts.chat.MessagesPlaceholder.html" target="_blank" rel="noopener noreferrer">API 文档</a></p>
<p><a href="https://python.langchain.com/v0.2/docs/how_to/#prompt-templates" target="_blank" rel="noopener noreferrer">提示词模板 DEMO</a></p>
<h3 id="_5-output-parsers" tabindex="-1"><a class="header-anchor" href="#_5-output-parsers"><span>5. Output parsers</span></a></h3>
<blockquote>
<p>这里是指将模型的输出解析为结构化格式。现在越来越多的模型支持函数(或工具)调用，它可以自动处理这个问题，建议使用函数/工具调用而不是这种方式。</p>
</blockquote>
<p>具体支持的转化格式可以参考<a href="https://python.langchain.com/v0.2/docs/concepts/#chat-models" target="_blank" rel="noopener noreferrer">手册</a>，常见格式有 JSON、XML、CSV 等等</p>
<p><a href="https://python.langchain.com/v0.2/docs/how_to/#output-parsers" target="_blank" rel="noopener noreferrer">格式化输出 DEMO</a></p>
<h3 id="chat-history" tabindex="-1"><a class="header-anchor" href="#chat-history"><span>Chat history</span></a></h3>
<blockquote>
<p>大多数 LLM 应用程序都有会话接口。对话的一个重要组成部分是能够引用对话之前介绍的信息。</p>
<p>Chath history 是 LangChain 一个类，它可以用来包装任意链，跟踪 chain 的输入和输出，并将它们作为消息附加到消息数据库中。在后续的交互中加载这些消息并将它们作为一部分输入传递到 chain</p>
</blockquote>
<h3 id="documents-loaders" tabindex="-1"><a class="header-anchor" href="#documents-loaders"><span>Documents Loaders</span></a></h3>
<blockquote>
<p>LangChain 支持加载 PDF、BiliBili、CSV 等上百个数据源类型，封装为 xxxLoader 的方法调用</p>
</blockquote>
<div class="language-pyt line-numbers-mode" data-highlighter="shiki" data-ext="pyt" data-title="pyt" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>from langchain_community.document_loaders.csv_loader import CSVLoader</span></span>
<span class="line"><span></span></span>
<span class="line"><span>loader = CSVLoader(</span></span>
<span class="line"><span>    ...  # &#x3C;-- Integration specific parameters here</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>data = loader.load()</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://api.python.langchain.com/en/latest/community_api_reference.html#module-langchain_community.document_loaders" target="_blank" rel="noopener noreferrer">API 文档</a></p>
<p><a href="https://python.langchain.com/v0.2/docs/how_to/#document-loaders" target="_blank" rel="noopener noreferrer">Documents Loader DEMO</a></p>
<h3 id="text-splitters" tabindex="-1"><a class="header-anchor" href="#text-splitters"><span>Text splitters</span></a></h3>
<p>将长文档拆分成更小的块，有助于适合模型的上下文窗口，得到更好的效果。具体的分块策略根据不同的应用场景也会有所区别，需要尝试。</p>
<p><a href="https://python.langchain.com/v0.2/docs/how_to/#text-splitters" target="_blank" rel="noopener noreferrer">Text splitters DEMO</a></p>
<h3 id="embedding-models" tabindex="-1"><a class="header-anchor" href="#embedding-models"><span>Embedding models</span></a></h3>
<p>在 RAG 等应用场景，我们需要将资料通过适合的 embedding 模型转化为矢量，并存入向量数据库中，以便后续更高效精准的检索。</p>
<figure><img src="https://swtywang.fun/minio/blog/ed48c4f9f25a9e14c08320362563c154.jpg" alt="1081722819813_.pic" tabindex="0" loading="lazy"><figcaption>1081722819813_.pic</figcaption></figure>
<p><a href="https://python.langchain.com/v0.2/docs/how_to/embed_text/" target="_blank" rel="noopener noreferrer">Embedding DEMO</a></p>
<h3 id="vector-stores" tabindex="-1"><a class="header-anchor" href="#vector-stores"><span>Vector stores</span></a></h3>
<p>主要用于存储上面步骤转化的数据，以及后面的检索。常见的<a href="https://blog.csdn.net/Andrew_Chenwq/article/details/136985649" target="_blank" rel="noopener noreferrer">矢量数据库</a>有 Chroma、Milvus、Pinecone、ES 等</p>
<h3 id="retrievers" tabindex="-1"><a class="header-anchor" href="#retrievers"><span>Retrievers</span></a></h3>
<p>检索器可以从矢量数据库、各种文档中检索匹配度 topk 的条目并以 Document 格式返回</p>
<h3 id="tools" tabindex="-1"><a class="header-anchor" href="#tools"><span>Tools</span></a></h3>
<blockquote>
<p>Tools 被设计为由模型调用的实用程序：其输入由模型生成，输出会传递回模型。</p>
<p>使用场景：需要一个模型来控制部分代码或调用外部 api</p>
</blockquote>
<p>A tool consists of:</p>
<ol>
<li>The name of the tool.</li>
<li>A description of what the tool does.</li>
<li>A JSON schema defining the inputs to the tool.</li>
<li>A function (and, optionally, an async variant of the function).</li>
</ol>
<p>当工具绑定到模型时，名称、描述和 JSON 模式将作为模型的上下文提供。给定一组工具和一组指令，模型可以请求调用具有特定输入的一个或多个工具。典型用法如下:</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">tools </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">...</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">] </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># Define a list of tools</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">llm_with_tools </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> llm.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">bind_tools</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(tools)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ai_msg </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> llm_with_tools.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">invoke</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"do xyz..."</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># AIMessage(tool_calls=[ToolCall(...), ...], ...)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="agents" tabindex="-1"><a class="header-anchor" href="#agents"><span>Agents</span></a></h3>
<p>语言模型本身只能输出文本 不能执行操作。代理使用 LLM 作为推理引擎来确定采取哪些操作以及这些操作的输入应该是什么。这些操作的结果可以反馈给代理，由代理决定是否需要更多的操作，或者是否可以完成。</p>
<p>Agent 是真正能在实际场景中帮助到我们的工具之一，十分重要。<a href="https://langchain-ai.github.io/langgraph/" target="_blank" rel="noopener noreferrer">LangGraph</a>是专门用于创建高度灵活且功能强大的 Agent 框架，后面专门学下。</p>
<h3 id="callbacks" tabindex="-1"><a class="header-anchor" href="#callbacks"><span>CallBacks</span></a></h3>
<p>类似于钩子函数，支持在<a href="https://python.langchain.com/v0.2/docs/concepts/#callbacks" target="_blank" rel="noopener noreferrer">对应的事件</a>触发执行自定义的 handler，可以用例打日志、监控等任务。</p>
<h2 id="rag" tabindex="-1"><a class="header-anchor" href="#rag"><span>RAG</span></a></h2>
<blockquote>
<p>检索增强生成技术可以让大模型生成的答案更加符合我们的需求，相比于微调大模型成本也会更低，因此是当前热点之一。</p>
</blockquote>
<h3 id="_0-工作流程" tabindex="-1"><a class="header-anchor" href="#_0-工作流程"><span>0. 工作流程</span></a></h3>
<blockquote>
<p><a href="https://towardsdatascience.com/retrieval-augmented-generation-rag-from-theory-to-langchain-implementation-4e9bd5f6a4f2" target="_blank" rel="noopener noreferrer">这篇文章</a>很适合作为 RAG 入门，清晰简单地介绍了 RAG 理论知识、主体流程和 LangChain 实践。引用下其中的工作流程</p>
</blockquote>
<figure><img src="https://swtywang.fun/minio/blog/8a67a418ae0975cb0af81589d4feba13.webp" alt="1_kSkeaXRvRzbJ9SrFZaMoOg" tabindex="0" loading="lazy"><figcaption>1_kSkeaXRvRzbJ9SrFZaMoOg</figcaption></figure>
<h4 id="_0-1-准备环节-训练知识库" tabindex="-1"><a class="header-anchor" href="#_0-1-准备环节-训练知识库"><span>0-1. 准备环节-训练知识库</span></a></h4>
<p>这个环节是将我们内部非结构化的资料（可以是 PDF 文档、网页等）转化为向量并存储在向量数据库中。这通常包含下面步骤：</p>
<ol>
<li>收集数据并将其加载</li>
<li>文档分块处理</li>
<li>对内容 embedding</li>
<li>存储到向量库</li>
</ol>
<h4 id="_0-2-检索-retrieval" tabindex="-1"><a class="header-anchor" href="#_0-2-检索-retrieval"><span>0-2. 检索 Retrieval</span></a></h4>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>retriever = vectorstore.as_retriever()</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="_0-3-增强-augmented" tabindex="-1"><a class="header-anchor" href="#_0-3-增强-augmented"><span>0-3. 增强 Augmented</span></a></h4>
<p>这里的增强主要是提示词增强，不仅仅包含原 query，还包含了通过检索查到的知识库文档片段。下面是一个知识库问答的 demo</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> langchain.prompts </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ChatPromptTemplate</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">template </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> """You are an assistant for question-answering tasks.</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">Use the following pieces of retrieved context to answer the question.</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">If you don't know the answer, just say that you don't know.</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">Use three sentences maximum and keep the answer concise.</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">Question: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">{question}</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">Context: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">{context}</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">Answer:</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"""</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">prompt </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ChatPromptTemplate.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">from_template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(template)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(prompt)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_0-4-生成-generation" tabindex="-1"><a class="header-anchor" href="#_0-4-生成-generation"><span>0-4. 生成 Generation</span></a></h4>
<p>这里的生成与正常 LLM 输出没有很大差别。</p>
<h3 id="_1-rag-的技术点" tabindex="-1"><a class="header-anchor" href="#_1-rag-的技术点"><span>1. RAG 的技术点</span></a></h3>
<blockquote>
<p><a href="https://www.luxiangdong.com/2023/10/02/rag3/" target="_blank" rel="noopener noreferrer">https://www.luxiangdong.com/2023/10/02/rag3/</a></p>
</blockquote>
<h4 id="_1-1-数据索引-数据集清洗" tabindex="-1"><a class="header-anchor" href="#_1-1-数据索引-数据集清洗"><span>1-1 数据索引：数据集清洗</span></a></h4>
<p>//TODO</p>
<h4 id="_1-2-数据索引-chunking" tabindex="-1"><a class="header-anchor" href="#_1-2-数据索引-chunking"><span>1-2 数据索引：Chunking</span></a></h4>
<h4 id="_1-3-数据索引-embedding" tabindex="-1"><a class="header-anchor" href="#_1-3-数据索引-embedding"><span>1-3 数据索引：Embedding</span></a></h4>
<p>//DOING</p>
<h4 id="_1-4-检索优化-rerank-重排序" tabindex="-1"><a class="header-anchor" href="#_1-4-检索优化-rerank-重排序"><span>1-4 检索优化：Rerank 重排序</span></a></h4>
<p>//DOING</p>
<p>在拿到检索结果后，还可以使用 rerank 对结果重新排序，以达到更优的查询效果。</p>
<h4 id="_1-5-生成-提示词优化" tabindex="-1"><a class="header-anchor" href="#_1-5-生成-提示词优化"><span>1-5 生成：提示词优化</span></a></h4>
<p>//DOING</p>
<h3 id="_2-应用场景" tabindex="-1"><a class="header-anchor" href="#_2-应用场景"><span>2. 应用场景</span></a></h3>
<ul>
<li>业务机器人：快速查询内部手册</li>
<li>根据需求文档生成具有领域知识的测试用例</li>
</ul>
<h3 id="_3-问题与使用体验" tabindex="-1"><a class="header-anchor" href="#_3-问题与使用体验"><span>3. 问题与使用体验</span></a></h3>
<p><a href="https://baoyu.io/translations/rag/12-rag-pain-points-and-proposed-solutions" target="_blank" rel="noopener noreferrer">RAG 系统开发中的 12 大痛点及解决方案</a></p>
<p><a href="https://segmentfault.com/a/1190000044689598" target="_blank" rel="noopener noreferrer">https://segmentfault.com/a/1190000044689598</a></p>
</div></template>


