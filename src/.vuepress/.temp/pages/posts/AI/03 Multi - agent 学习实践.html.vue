<template><div><blockquote>
<p>现在有一些多智能体的框架或者产品，挑选三类主流且有区分度的学习下（LangGraph、AutoGen、Coze）</p>
</blockquote>
<h2 id="_1-langgraph" tabindex="-1"><a class="header-anchor" href="#_1-langgraph"><span>1. LangGraph</span></a></h2>
<blockquote>
<p>一个使用 LLM 构建有状态、多角色应用程序的库，可用于创建 agent 或者 multi-agents 流程。</p>
<p>与 LangChain 的学习路径一样，LangGraph Docs：</p>
<ul>
<li>快速入门：<a href="https://langchain-ai.github.io/langgraph/tutorials/" target="_blank" rel="noopener noreferrer">https://langchain-ai.github.io/langgraph/tutorials/</a></li>
<li>具体 Demo：<a href="https://langchain-ai.github.io/langgraph/how-tos/" target="_blank" rel="noopener noreferrer">https://langchain-ai.github.io/langgraph/how-tos/</a></li>
<li>基本概念：<a href="https://langchain-ai.github.io/langgraph/concepts/" target="_blank" rel="noopener noreferrer">https://langchain-ai.github.io/langgraph/concepts/</a></li>
</ul>
</blockquote>
<h3 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念"><span>基本概念</span></a></h3>
<h4 id="graphs" tabindex="-1"><a class="header-anchor" href="#graphs"><span>Graphs</span></a></h4>
<p>这个是 LangGraph 的核心概念，LangGraph agent 工作流以图的方式运作。每一个 agent 都会包括三个关键属性：</p>
<ul>
<li>State：表示应用程序当前快照（状态）的共享数据结构，通常是 Dict/BaseModel</li>
<li>Nodes：接收当前 State 作为输入，执行一些具体逻辑 =&gt; do the work</li>
<li>Edges：根据当前状态确定接下来要执行哪个节点 =&gt; tell what to do next</li>
</ul>
<p>LangGraph 实现的是有向无环图（DAG），即图中的边是有方向的，会根据状态流转，但是不会出现某个节点流转若干个边后回到原节点的情况。</p>
<h3 id="实践" tabindex="-1"><a class="header-anchor" href="#实践"><span>实践</span></a></h3>
<p>有些概念初次看有点灰色，但是结合例子就十分清晰。</p>
<h4 id="官方-rag-示例" tabindex="-1"><a class="header-anchor" href="#官方-rag-示例"><span>官方 RAG 示例</span></a></h4>
<blockquote>
<p><a href="https://langchain-ai.github.io/langgraph/tutorials/rag/langgraph_adaptive_rag/" target="_blank" rel="noopener noreferrer">完整版本</a></p>
</blockquote>
<figure><img src="https://swtywang.fun/minio/blog/0363646c9b886373501dad692957d280.png" alt="下载 (1)" tabindex="0" loading="lazy"><figcaption>下载 (1)</figcaption></figure>
<p>省略很多基于 LangChain 的方法实现，构建 Graph 的核心流程如下：</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 定义GraphState，Node会接受这些输入进行处理</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> GraphState</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">TypedDict</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    question: </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">str</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    generation: </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">str</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    documents: List[</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">str</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-py line-numbers-mode" data-highlighter="shiki" data-ext="py" data-title="py" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 初始化工作流</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">workflow </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> StateGraph</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(GraphState)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 定义Nodes节点，每个节点对应一个function实现</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">workflow.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">add_node</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"web_search"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, web_search)  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># web search</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">workflow.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">add_node</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"retrieve"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, retrieve)  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># retrieve</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">workflow.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">add_node</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"grade_documents"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, grade_documents)  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># grade documents</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">workflow.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">add_node</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"generate"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, generate)  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># generatae</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">workflow.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">add_node</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"transform_query"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, transform_query)  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># transform_query</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 定义条件边,对应的红色部分的条件判断</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># STAR：起始点，内置属性</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># route_question: 自定义判断函数，会返回web_search 或者vectorstore</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># path_map：依据route_question的返回结果，如果是web_serach，那么下一个执行节点是web_search；如果是vectorstore，下一个执行节点是retrieve</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">workflow.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">add_conditional_edges</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">    START</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    route_question,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        "web_search"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"web_search"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        "vectorstore"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"retrieve"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    },</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 添加一个边，web_search流转到generate</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">workflow.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">add_edge</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"web_search"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"generate"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">workflow.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">add_edge</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"retrieve"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"grade_documents"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">workflow.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">add_conditional_edges</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    "grade_documents"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    decide_to_generate,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        "transform_query"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"transform_query"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        "generate"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"generate"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    },</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">workflow.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">add_edge</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"transform_query"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"retrieve"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">workflow.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">add_conditional_edges</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    "generate"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    grade_generation_v_documents_and_question,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        "not supported"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"generate"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        "useful"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">END</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        "not useful"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"transform_query"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    },</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 编译工作流</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">app </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> workflow.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">compile</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="自定义-workflow" tabindex="-1"><a class="header-anchor" href="#自定义-workflow"><span>自定义 WorkFlow</span></a></h4>
<blockquote>
<p>之前在使用 <a href="https://www.coze.com/" target="_blank" rel="noopener noreferrer">Coze</a> 时，创建过一条关于 Bilibili 视频总结的工作流，LangGraph 的只是需要用代码方式实现</p>
</blockquote>
<figure><img src="https://swtywang.fun/minio/blog/af8c150847374ad7872a40a50b741fc9.png" alt="截屏2024-08-05 20.47.54" tabindex="0" loading="lazy"><figcaption>截屏2024-08-05 20.47.54</figcaption></figure>
<div class="language-py line-numbers-mode" data-highlighter="shiki" data-ext="py" data-title="py" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 定义GraphState</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> GraphState</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">TypedDict</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    video_url: </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">str</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 初始化工作流</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">workflow </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> StateGraph</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(GraphState)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 定义Nodes节点，每个节点对应一个function实现</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">workflow.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">add_node</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"video_validate"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, video_validate)  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 调用LLM，实现校验url有效性的函数</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">workflow.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">add_node</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"get_link"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, get_link)  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 实现返回videoUrl</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">workflow.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">add_node</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"get_access_content"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, get_access_content)  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 获取内容</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">workflow.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">add_node</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"generate"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, generate)  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># generatae</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">workflow.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">add_edge</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">START</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> , </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"video_validate"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">workflow.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">add_conditional_edges</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">    START</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    video_validate,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        "valid"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"get_link"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        "no-valid"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">END</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    },</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 添加一个边</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">workflow.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">add_edge</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"get_link"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"get_access_content"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">workflow.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">add_edge</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"get_access_content"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">END</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 编译工作流</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">app </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> workflow.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">compile</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-autogen" tabindex="-1"><a class="header-anchor" href="#_2-autogen"><span>2. AutoGen</span></a></h2>
<p><a href="https://microsoft.github.io/autogen" target="_blank" rel="noopener noreferrer">官方手册</a></p>
<p>AutoGen 框架用于构建 AI agent 并且可以让多个代理之间通过&quot;合作&quot;的形式来解决任务。<br>
和 LangGraph 使用感受最大的不同：它不用通过硬编码去编排大量复杂的流程，而是利用 LLM 对话的形式处理。</p>
<h3 id="_2-1-实现原理" tabindex="-1"><a class="header-anchor" href="#_2-1-实现原理"><span>2.1 实现原理</span></a></h3>
<p>Agent 主要有两个实现类：Assistant Agent 和 UserProxy Agent。</p>
<ul>
<li>Assistant Agent 主要负责接收任务并且具体处理任务，可以有多个</li>
<li>UserProxy Agent 主要负责验证任务是否终态并不断向 Assistant Agent 发送新的指令，一般只有一个。</li>
</ul>
<h3 id="_2-2-亮点" tabindex="-1"><a class="header-anchor" href="#_2-2-亮点"><span>2.2 亮点</span></a></h3>
<ul>
<li>AutoGen 可以执行代码并将产物保存到本地</li>
<li>AutoGen 支持人工介入：UserPorxy 的 human_input_mode 属性支持 ALWAYS、NEVER、TERMINATE。如果是 ALWAYS，那么每次执行后会等待下一步指令。</li>
</ul>
<h3 id="_2-3-单智能体示例" tabindex="-1"><a class="header-anchor" href="#_2-3-单智能体示例"><span>2.3 单智能体示例</span></a></h3>
<blockquote>
<p>只定义一个 Assistant Agent，另一个 UserProxy Agent 的介入模式设为 ALWAYS，同时配置 CHATGPT-4o 模型。</p>
</blockquote>
<figure><img src="https://swtywang.fun/minio/blog/08df06260f3d5e1853ab6b0f03f3bfa5.png" alt="截屏2024-08-05 22.40.26" tabindex="0" loading="lazy"><figcaption>截屏2024-08-05 22.40.26</figcaption></figure>
<h3 id="_2-4-多智能体示例" tabindex="-1"><a class="header-anchor" href="#_2-4-多智能体示例"><span>2.4 多智能体示例</span></a></h3>
<blockquote>
<p>定义两个 Assistant Agent，一个负责 code，一个负责拆解需求 for code。再定义一个 UserProxy Agent，将他们三个 Agent 放到一个组中即可。<br>
PS：有点费钱，看看<a href="https://www.bilibili.com/video/BV1Fw41167v9" target="_blank" rel="noopener noreferrer">这个视频</a>就行</p>
</blockquote>
<h2 id="_3-coze" tabindex="-1"><a class="header-anchor" href="#_3-coze"><span>3. <a href="https://www.coze.com/home" target="_blank" rel="noopener noreferrer">Coze</a></span></a></h2>
<p>Coze 是字节跳动推出的智能体创建平台，我们可以在这里可视化的创造编排基于多 agent 的应用。(PS:平台免费支持 GPT-4o)<br>
具体使用还是挺简单的，社区中也实现了诸多<a href="https://www.coze.com/store/workflow" target="_blank" rel="noopener noreferrer">workflow</a>供参考。</p>
<h2 id="_4-使用感受" tabindex="-1"><a class="header-anchor" href="#_4-使用感受"><span>4. 使用感受</span></a></h2>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">优点</th>
<th style="text-align:center">缺点</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">LangGraph</td>
<td style="text-align:center">支持自定义复杂任务，支持编排比较复杂的工作流，扩展性强</td>
<td style="text-align:center">即使是创建一个简单的工作流也需要实现大量代码，不够直观</td>
</tr>
<tr>
<td style="text-align:center">AutoGen</td>
<td style="text-align:center">效果很惊艳，支持与本地进程交互；支持人工介入</td>
<td style="text-align:center">比较依赖 LLM 能力，目前仅支持 OPENAI</td>
</tr>
<tr>
<td style="text-align:center">Coze</td>
<td style="text-align:center">可视化编排，操作简单明了；社区有丰富的插件和工作流资源</td>
<td style="text-align:center">复杂流程/任务场景效果不佳；平台上目前都是 DEMO 级别的应用</td>
</tr>
</tbody>
</table>
</div></template>


