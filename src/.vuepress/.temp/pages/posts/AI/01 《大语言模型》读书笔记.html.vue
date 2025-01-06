<template><div><blockquote>
<p><a href="https://github.com/LLMBook-zh/LLMBook-zh.github.io" target="_blank" rel="noopener noreferrer">书籍下载地址</a></p>
<p>主要是科普，很多知识点还是需要投入大量时间学习</p>
</blockquote>
<nav class="table-of-contents"><ul><li><router-link to="#part1-背景与基础知识">Part1 背景与基础知识</router-link><ul><li><router-link to="#_1-语言模型发展历程">1. 语言模型发展历程</router-link></li><li><router-link to="#_2-大预言模型关键技术">2. 大预言模型关键技术</router-link></li><li><router-link to="#_3-大模型构建过程">3. 大模型构建过程</router-link></li><li><router-link to="#_4-扩展法则">4. 扩展法则</router-link></li><li><router-link to="#_5-涌现能力">5. 涌现能力</router-link></li><li><router-link to="#_6-gpt-模型技术演变">6. GPT 模型技术演变</router-link></li><li><router-link to="#_7-学习资源">7. 学习资源</router-link></li></ul></li><li><router-link to="#part2-预训练">Part2 预训练</router-link><ul><li><router-link to="#_1-数据准备">1. 数据准备</router-link></li><li><router-link to="#_2-⭐️⭐️transformer-模型">2. ⭐️⭐️Transformer 模型</router-link></li></ul></li><li><router-link to="#part3-微调与对齐">Part3 微调与对齐</router-link></li><li><router-link to="#part4-大模型使用">Part4 大模型使用</router-link><ul><li><router-link to="#_1-prompting">1. Prompting</router-link></li><li><router-link to="#_2-⭐️-规划与智能体">2. ⭐️ 规划与智能体</router-link></li></ul></li><li><router-link to="#part5-评测与应用">Part5 评测与应用</router-link><ul><li><router-link to="#_1-评测指标">1. 评测指标</router-link></li><li><router-link to="#_3-开源评测体系">3. 开源评测体系</router-link></li><li><router-link to="#_4-专业领域大模型">4. 专业领域大模型</router-link></li></ul></li></ul></nav>
<h2 id="part1-背景与基础知识" tabindex="-1"><a class="header-anchor" href="#part1-背景与基础知识"><span>Part1 背景与基础知识</span></a></h2>
<h3 id="_1-语言模型发展历程" tabindex="-1"><a class="header-anchor" href="#_1-语言模型发展历程"><span>1. 语言模型发展历程</span></a></h3>
<ul>
<li>
<p>统计语言模型（SLM）：基于统计学习方法研发，使用马尔可夫假设来建立语言序列的预测模型，通常是根据词序</p>
<p>列中若干个连续的上下文单词来预测下一个词的出现概率，即根据一个固定长度的前缀来预测目标单词。</p>
</li>
<li>
<p>神经语言模型（NLM）：使用神经网络来建模文本序列的生成，如 RNN、word2vec</p>
</li>
<li>
<p>预训练语言模型（PLM）：BERT 、GPT-1、GPT-2</p>
</li>
<li>
<p>大语言模型（LLM）：通过规模扩展通常会带来下游任务的模型性能提升。GPT-3、GPT-4</p>
</li>
</ul>
<h3 id="_2-大预言模型关键技术" tabindex="-1"><a class="header-anchor" href="#_2-大预言模型关键技术"><span>2. 大预言模型关键技术</span></a></h3>
<ul>
<li>规模扩展：<a href="https://swtywang.fun/minio/docs/Scaling%20Laws%20for%20Neural%20Language%20Models.pdf" target="_blank" rel="noopener noreferrer">扩展法则</a></li>
<li>数据工程</li>
<li>高效预训练</li>
<li>能力激发：提示策略（上下文学习、思维链提示）</li>
<li>人类对齐：3H 对齐标准（Helpfulness、Honesty、Harmlessness）</li>
<li>工具使用</li>
</ul>
<h3 id="_3-大模型构建过程" tabindex="-1"><a class="header-anchor" href="#_3-大模型构建过程"><span>3. 大模型构建过程</span></a></h3>
<blockquote>
<p>主要分位大规模预训练、指令微调与人类对齐两个阶段</p>
</blockquote>
<h4 id="_3-1-大规模预训练" tabindex="-1"><a class="header-anchor" href="#_3-1-大规模预训练"><span>3-1. 大规模预训练</span></a></h4>
<p>一般来说，预训练是指使用与下游任务无关的大规模数据进行模型参数的初始训练，可以认为是为模型参数找到一个较好的“初值点”。</p>
<p>早期的预训练技术还是聚焦于解决下游某一类的特定任务，如传统的自然语言处理任务。后面 OPENAI 提出通过大规模文本数据的预训练实现通用任务的求解器，并且将这一思路在 GPT-3 中推广到了当时最大的千亿规模。</p>
<p>预训练数据：收集数据-&gt;清洗-&gt;词原化</p>
<h4 id="_3-2-指令微调与人类对齐" tabindex="-1"><a class="header-anchor" href="#_3-2-指令微调与人类对齐"><span>3-2 指令微调与人类对齐</span></a></h4>
<p>经过大规模数据预训练后的语言模型已经具备较强的模型能力，能够编码丰富的世界知识，但是由于预训练任务形式所限，这些模型更擅长于文本补全，并不适合直接解决具体的任务。</p>
<p>目前比较广泛使用的微调技术是“指令微调”（Supervised Fine-tuning, SFT）：通过<strong>使用任务输入与输出的配对数据</strong>进行模型训练，可以使得语言模型较好地掌握通过问答形式进行任务求解的能力。一般来说，指令微调很难教会大语言模型预训练阶段没有学习到的知识与能力，它主要起到了对于模型能力的激发作用，而不是知识注入作用。</p>
<p>人类对齐：将大语言模型与人类的期望、需求以及价值观对齐。主要引入了基于人类反馈的强化学习对齐方法 RLHF（Reinforcement Learning from Human Feedback）。</p>
<h3 id="_4-扩展法则" tabindex="-1"><a class="header-anchor" href="#_4-扩展法则"><span>4. 扩展法则</span></a></h3>
<blockquote>
<p>在实现上，大语言模型采用了与小型预训练语言模型相似的神经网络结构（基于注意力机制的 Transformer 架构）和预训练方法（如语言建模）。但是通过扩展参数规模、数据规模和计算算力，大语言模型的能力显著超越了小型语言模型的能力。</p>
</blockquote>
<ul>
<li>KM 扩展法则</li>
<li>Chinchilla 扩展法则</li>
</ul>
<h3 id="_5-涌现能力" tabindex="-1"><a class="header-anchor" href="#_5-涌现能力"><span>5. 涌现能力</span></a></h3>
<blockquote>
<p>大语言模型的涌现能力被非形式化定义为“在小型模型中不存在但在大模型中出现的能力”，具体是指当模型扩展到一定规模时，模型的特定任务性能突然出现显著跃升的趋势，远超过随机水平。</p>
</blockquote>
<ul>
<li>上下文学习</li>
<li>指令遵循</li>
<li>逐步推理</li>
</ul>
<h3 id="_6-gpt-模型技术演变" tabindex="-1"><a class="header-anchor" href="#_6-gpt-模型技术演变"><span>6. GPT 模型技术演变</span></a></h3>
<ul>
<li>大语言模型发展时间线</li>
</ul>
<figure><img src="https://swtywang.fun/minio/blog/90933ec38f15e3cdaf44a1e954f6bb6d.png" alt="大模型发展时间线" tabindex="0" loading="lazy"><figcaption>大模型发展时间线</figcaption></figure>
<ul>
<li>GPT 技术发展历程</li>
</ul>
<figure><img src="https://swtywang.fun/minio/blog/47898783312458c167852c8a39748a37.png" alt="GPT技术发展历程" tabindex="0" loading="lazy"><figcaption>GPT技术发展历程</figcaption></figure>
<h3 id="_7-学习资源" tabindex="-1"><a class="header-anchor" href="#_7-学习资源"><span>7. 学习资源</span></a></h3>
<h4 id="_7-1-开源模型" tabindex="-1"><a class="header-anchor" href="#_7-1-开源模型"><span>7-1 <a href="https://ollama.com/library" target="_blank" rel="noopener noreferrer">开源模型</a></span></a></h4>
<ul>
<li>
<p>LLaMA、LLaMA-2</p>
<p>(LLaMA 系列模型的衍生工作进化图)</p>
<figure><img src="https://swtywang.fun/minio/blog/ff642a154506709585295245bf21984d.png" alt="LLaMA 系列模型的衍生工作进化图" tabindex="0" loading="lazy"><figcaption>LLaMA 系列模型的衍生工作进化图</figcaption></figure>
</li>
<li>
<p>ChatGLM</p>
</li>
<li>
<p>Qwen、Qwen2</p>
</li>
<li>
<p>DeepSeek</p>
</li>
</ul>
<h4 id="_7-2-api" tabindex="-1"><a class="header-anchor" href="#_7-2-api"><span>7-2 API</span></a></h4>
<ul>
<li>GPT：<a href="https://platform.openai.com/docs/models" target="_blank" rel="noopener noreferrer">https://platform.openai.com/docs/models</a></li>
</ul>
<h4 id="_7-3-预训练数据集" tabindex="-1"><a class="header-anchor" href="#_7-3-预训练数据集"><span>7-3 预训练数据集</span></a></h4>
<ul>
<li>
<p>网页<br>
<img src="https://swtywang.fun/minio/blog/9468edb1a4de7ed17b22846e7049368f.png" alt="截屏2024-08-06 23.53.55" style="zoom:50%;" /></p>
</li>
<li>
<p>书籍</p>
<ul>
<li>BookCorpus</li>
<li>Project Gutenberg</li>
<li>arXiv Dataset 预印本论文</li>
</ul>
</li>
<li>
<p>代码</p>
<ul>
<li>BigQuery</li>
<li>The Stack</li>
<li>StarCoder</li>
</ul>
</li>
<li>
<p>维基百科</p>
</li>
</ul>
<h4 id="_7-4-微调数据集" tabindex="-1"><a class="header-anchor" href="#_7-4-微调数据集"><span>7-4 微调数据集</span></a></h4>
<img src="https://swtywang.fun/minio/blog/9669f90e70aef14074f03b4ed190b7f9.png" alt="截屏2024-08-06 23.57.54" style="zoom:50%;" />
<img src="https://swtywang.fun/minio/blog/4df4a45b6cf5e777c1dfe13f3fd0c144.png" alt="截屏2024-08-06 23.59.56" style="zoom:50%;" />
<h4 id="_7-5-社区" tabindex="-1"><a class="header-anchor" href="#_7-5-社区"><span>7-5 社区</span></a></h4>
<ul>
<li><a href="https://huggingface.co/" target="_blank" rel="noopener noreferrer">HuggingFace</a></li>
<li><a href="https://ollama.com" target="_blank" rel="noopener noreferrer">Ollama</a></li>
</ul>
<hr>
<h2 id="part2-预训练" tabindex="-1"><a class="header-anchor" href="#part2-预训练"><span>Part2 预训练</span></a></h2>
<blockquote>
<p>这一部分先讲了如何处理预训练数据，接着比较详细介绍了模型的架构，最后介绍了如何用模型做预训练</p>
</blockquote>
<h3 id="_1-数据准备" tabindex="-1"><a class="header-anchor" href="#_1-数据准备"><span>1. 数据准备</span></a></h3>
<blockquote>
<p>为了确保数据的质量和效用，还需要对数据进行预处理，从而消除低质量、冗余、无关甚可能有害的数据</p>
</blockquote>
<h4 id="_1-1-数据预处理" tabindex="-1"><a class="header-anchor" href="#_1-1-数据预处理"><span>1.1 数据预处理</span></a></h4>
<blockquote>
<p>YuLan-GARDEN - 预训练数据处理框架</p>
</blockquote>
<ul>
<li>
<p>质量过滤：</p>
<ul>
<li>
<p>基于启发式规则：基于语种、特定的统计指标、关键词等精心设计的规则，剔除掉低质量文本。有点类似于 badcase 挖掘</p>
</li>
<li>
<p>基于分类器的方法：包括轻量级模型（如 FastText 等）、可微调的预训练语言模型（如 BERT、BART 或者 LLaMA 等）以及闭源大语言模型 API（如</p>
<p>GPT-4、Claude 3）三类分类器。</p>
</li>
</ul>
</li>
<li>
<p>敏感内容过滤：</p>
<ul>
<li>过滤有毒内容</li>
<li>过滤隐私内容</li>
</ul>
</li>
<li>
<p>数据去重：</p>
<ul>
<li>精确匹配：后缀数组匹配</li>
<li>近似匹配：MinHash</li>
</ul>
</li>
</ul>
<h4 id="_1-2-⭐️-词元化-分词" tabindex="-1"><a class="header-anchor" href="#_1-2-⭐️-词元化-分词"><span>1.2 ⭐️ 词元化（分词）</span></a></h4>
<p>词元化（Tokenization）是数据预处理中的一个关键步骤，旨在将原始文本分割成模型可识别和建模的词元序列，作为大语言模型的输入数据。</p>
<ul>
<li>BPE 分词：从一组基本符号（例如字母和边界字符）开始，迭代地寻找语料库中的两个相邻词元，并将它们替换为新的词元</li>
<li>WordPiece 分词</li>
<li>Unigram 分词</li>
</ul>
<h3 id="_2-⭐️⭐️transformer-模型" tabindex="-1"><a class="header-anchor" href="#_2-⭐️⭐️transformer-模型"><span>2. ⭐️⭐️Transformer 模型</span></a></h3>
<p>当前主流的大语言模型都基于 Transformer 模型进行设计的。Transformer 是由多层的多头自注意力（Multi-head Self-attention）模块堆叠而成的神经网络模型。原始的 Transformer 模型由编码器和解码器两个部分构成，而这两个部分实际上可以独立使用，例如基于编码器架构的 BERT 模型和解码器架构的 GPT 模型 。</p>
<p>与 BERT 等早期的预训练语言模型相比，大语言模型的特点是使用了更长的向量维度、更深的层数，进而包含了更大规模的模型参数，并主要使用解码器架构，对于 Transformer 本身的结构与配置改变并不大。</p>
<p>本部分内容将首先介绍 Transformer 模型的基本组成，包括基础的输入、多头自注意力模块和前置网络层；接着分别介绍 Transformer 模型中的编码器和解码器模块。</p>
<img src="https://swtywang.fun/minio/blog/a1d48a5fe3e1737ecc0de8c23b51b668.png" alt="截屏2024-08-07 01.20.14" style="zoom:50%;" />
<h4 id="_2-1-输入编码" tabindex="-1"><a class="header-anchor" href="#_2-1-输入编码"><span>2.1 输入编码</span></a></h4>
<p>主要功能：讲上面步骤生成的词元序列经过一个 Embedding Model 转化为词向量序列*<span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>v</mi><mi>t</mi></msub></mrow><annotation encoding="application/x-tex">v_t</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.5806em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.2806em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">t</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span><em>，再叠加位置编码信息</em><span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>p</mi><mi>t</mi></msub></mrow><annotation encoding="application/x-tex">p_t</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord mathnormal">p</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.2806em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">t</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span><em>，生成最终的输入序列 <em>X = [<span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>x</mi><mn>1</mn></msub><mo separator="true">,</mo><mi mathvariant="normal">.</mi><mi mathvariant="normal">.</mi><mi mathvariant="normal">.</mi><msub><mi>x</mi><mi>T</mi></msub></mrow><annotation encoding="application/x-tex">x_1,...x_T</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">...</span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.13889em;">T</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>]</em>，其中</em><span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>x</mi><mi>t</mi></msub><mo>=</mo><msub><mi>v</mi><mi>t</mi></msub><mo>+</mo><msub><mi>p</mi><mi>t</mi></msub></mrow><annotation encoding="application/x-tex">x_t=v_t+p_t</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.5806em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.2806em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">t</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.7333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.2806em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">t</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord mathnormal">p</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.2806em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">t</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>*</p>
<p>通过这种建模方法的表示，Transformer 模型可以利用位置编码建模不同词元的位置信息。</p>
<h4 id="_2-2-多头自注意力机制" tabindex="-1"><a class="header-anchor" href="#_2-2-多头自注意力机制"><span>2.2 多头自注意力机制</span></a></h4>
<p>相比于循环神经网络（Recurrent Neural Network, RNN）和卷积神经网络（Convolutional Neural Network, CNN）等传统神经网络，多头自注意力机制能够直接建模任意距离的词元之间的交互关系。</p>
<p><span style="background-color: yellow;">TODO：先了解下，更深入的理论知识需要再看看</span></p>
<h4 id="_2-3-前馈神经网络" tabindex="-1"><a class="header-anchor" href="#_2-3-前馈神经网络"><span>2.3 前馈神经网络</span></a></h4>
<p>主要功能：对于每个位置的隐藏状态进行非线性变换和特征提取</p>
<h4 id="_2-4-编码器" tabindex="-1"><a class="header-anchor" href="#_2-4-编码器"><span>2.4 编码器</span></a></h4>
<p>在 Transformer 模型中，编码器（Encoder）的作用是将每个输入词元都编码成一个上下文语义相关的表示向量。编码器结构由多个相同的层堆叠而成，其中每一层都包含多头自注意力模块和前馈网络模块。在注意力和前馈网络后，模型使用层归一化和残差连接来加强模型的训练稳定度。</p>
<h4 id="_2-5-解码器" tabindex="-1"><a class="header-anchor" href="#_2-5-解码器"><span>2.5 解码器</span></a></h4>
<p>基于来自编码器编码后的最后一层的输出表示以及已经由模型生成的词元序列，执行后续的序列生成任务。与编码器不同，解码器需要引入掩码自注意力（Masked Self-attention）模块，用来在计算注意力分数的时候掩盖当前位置之后的词，以保证生成目标序列时不依赖于未来的信息。</p>
<h2 id="part3-微调与对齐" tabindex="-1"><a class="header-anchor" href="#part3-微调与对齐"><span>Part3 微调与对齐</span></a></h2>
<blockquote>
<p>这部分先跳过</p>
</blockquote>
<h2 id="part4-大模型使用" tabindex="-1"><a class="header-anchor" href="#part4-大模型使用"><span>Part4 大模型使用</span></a></h2>
<h3 id="_1-prompting" tabindex="-1"><a class="header-anchor" href="#_1-prompting"><span>1. Prompting</span></a></h3>
<h4 id="_1-1-提示词工程" tabindex="-1"><a class="header-anchor" href="#_1-1-提示词工程"><span>1.1 提示词工程</span></a></h4>
<blockquote>
<p>针对特定任务设计合适的任务提示。</p>
</blockquote>
<h5 id="_1-1-1-提示词四要素" tabindex="-1"><a class="header-anchor" href="#_1-1-1-提示词四要素"><span>1.1.1 提示词四要素：</span></a></h5>
<ul>
<li>
<p>任务描述 ：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>知识问答的任务描述：请使用所提供的以三个井号（###）分隔的文章回答问题。如果在文章中找不到答案，请回答“无法找到答案。”</span></span>
<span class="line"><span></span></span>
<span class="line"><span>代码补全的任务描述：你是一名程序员。给你一个代码片段，你的目标是完成这段代码，确保它能实现描述的功能。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>对话推荐的任务描述：推荐 10 个符合用户偏好的商品。推荐列表可以包含对话框之前提到的商品。推荐列表的格式为：商品 ID 标题（年份）。请勿在推荐列表</span></span>
<span class="line"><span>中提及商品标题以外的任何内容</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>输入数据 ：结构化数据</p>
</li>
<li>
<p>上下文信息</p>
</li>
<li>
<p>提示策略</p>
</li>
<li>
<p><code v-pre>让我们一步一步地思考</code> ：激发逐步推理能力</p>
</li>
<li>
<p><code v-pre>你是xx领域的专家</code>：提升特定领域表现</p>
</li>
</ul>
<h5 id="_1-1-2-提示词设计原则" tabindex="-1"><a class="header-anchor" href="#_1-1-2-提示词设计原则"><span>1.1.2 提示词设计原则</span></a></h5>
<ul>
<li>清晰地表达任务目标</li>
<li>分解为简单且详细的子任务</li>
<li><strong>提供少量样本示例</strong> ：少样本示例有助于大语言模型在无需调整参数的前提下学习输入与输出之间的语义映射关系</li>
<li>采用模型友好的提示格式</li>
</ul>
<h4 id="_1-2-上下文学习" tabindex="-1"><a class="header-anchor" href="#_1-2-上下文学习"><span>1.2 上下文学习</span></a></h4>
<h4 id="_1-3-思维链提示" tabindex="-1"><a class="header-anchor" href="#_1-3-思维链提示"><span>1.3 思维链提示</span></a></h4>
<ul>
<li>
<p>基本形式：&lt;输入，思维链，输出&gt;，可以包含<code v-pre>Lets's think step by step</code>等诱导性指令</p>
</li>
<li>
<p>优化策略 - 思维链示例设计：使用复杂化、多样化的思维链</p>
</li>
<li>
<p>优化策略 - 思维链生成方法：基于采样的方法 vs 基于验证的方法</p>
</li>
<li>
<p>优化策略 - 扩展的推理结构： 思维树 vs 思维图<br>
<img src="https://swtywang.fun/minio/blog/9bb5d0d4193247b6ce0a9310f7306cec.png" alt="截屏2024-08-12 23.17.33" loading="lazy"></p>
</li>
<li>
<p>思维链 vs 上下文学习<br>
<img src="https://swtywang.fun/minio/blog/c04efdeb57676a7de695b2b55c7271d4.png" alt="截屏2024-08-12 23.19.31" loading="lazy"></p>
</li>
</ul>
<h3 id="_2-⭐️-规划与智能体" tabindex="-1"><a class="header-anchor" href="#_2-⭐️-规划与智能体"><span>2. ⭐️ 规划与智能体</span></a></h3>
<blockquote>
<p>规划旨在为目标任务制定包含一系列动作的解决方案，是大语言模型解决复杂问题能力的重要体现，也是自主智能体最重要的核心能力。</p>
</blockquote>
<h4 id="规划整体框架" tabindex="-1"><a class="header-anchor" href="#规划整体框架"><span>规划整体框架</span></a></h4>
<p>基于大语言模型的规划方法主要由三个组件构成，包括任务规划器（Task Planner）、规划执行器（Plan Executor）以及环境（Environment）。具体来说，大语言模型作为任务规划器，其主要职责是生成目标任务的解决方案。该方案包含一系列执行动作，每个动作通过合适的形式进行表达，例如自然语言描述或代码片段。对于长期任务，任务规划器还可以引入存储机制，用于解决方案与中间执行结果的存储与检索。规划执行器则负责执行解决方案中所涉及到的动作。根据任务性质的不同，规划执行器可以由大语言模型实现，也可以由执行具体物理任务的实体（如机器人）来实现。环境是规划执行器实施动作的具体场景，不同任务对应着不同的执行环境，例如 Web 互联网或像 Minecraft 这样的外部虚拟世界</p>
<figure><img src="https://swtywang.fun/minio/blog/f1af1f5bdf8e64241a1182917a7dce73.png" alt="截屏2024-08-12 23.24.03" tabindex="0" loading="lazy"><figcaption>截屏2024-08-12 23.24.03</figcaption></figure>
<h4 id="智能体的构建" tabindex="-1"><a class="header-anchor" href="#智能体的构建"><span>智能体的构建</span></a></h4>
<blockquote>
<p>在大语言模型智能体的构建过程主要包含三个基本组件：记忆组件（Memory）、规划组件（Planning） 和执行组件（Execution）。通过这些组件共同协作，智能体能够有效地感知环境、制定决策并执行规划的动作，进而完成相应任务</p>
</blockquote>
<h4 id="智能体的应用" tabindex="-1"><a class="header-anchor" href="#智能体的应用"><span>智能体的应用</span></a></h4>
<p><a href="https://github.com/0hq/WebGPT" target="_blank" rel="noopener noreferrer">WebGPT</a> | ⭐️ <a href="https://github.com/geekan/MetaGPT" target="_blank" rel="noopener noreferrer">MetaGPT</a> | ⭐️ <a href="https://github.com/microsoft/autogen" target="_blank" rel="noopener noreferrer">AutoGen</a></p>
<h2 id="part5-评测与应用" tabindex="-1"><a class="header-anchor" href="#part5-评测与应用"><span>Part5 评测与应用</span></a></h2>
<h3 id="_1-评测指标" tabindex="-1"><a class="header-anchor" href="#_1-评测指标"><span>1. 评测指标</span></a></h3>
<figure><img src="https://swtywang.fun/minio/blog/539adf65aafcc6fc3eab49ef1529377a.png" alt="截屏2024-08-12 23.33.04" tabindex="0" loading="lazy"><figcaption>截屏2024-08-12 23.33.04</figcaption></figure>
<h4 id="_2-评测方法" tabindex="-1"><a class="header-anchor" href="#_2-评测方法"><span>2. 评测方法</span></a></h4>
<figure><img src="https://swtywang.fun/minio/blog/79ebf0e115baa50af72c381e2e5f3124.png" alt="截屏2024-08-12 23.36.38" tabindex="0" loading="lazy"><figcaption>截屏2024-08-12 23.36.38</figcaption></figure>
<h3 id="_3-开源评测体系" tabindex="-1"><a class="header-anchor" href="#_3-开源评测体系"><span>3. 开源评测体系</span></a></h3>
<h4 id="_3-1-mmlu" tabindex="-1"><a class="header-anchor" href="#_3-1-mmlu"><span>3.1 MMLU</span></a></h4>
<p>MMLU 是一个综合性的大规模评测数据集，旨在全面评估大语言模型在多个领域中的知识理解和应用能力，包括人文科学、社会科学、自然科学和工程技术等。</p>
<p>在任务形式上，MMLU 采用选择题的形式对模型能力进行检验，每个实例都包括一个问题和若干个候选项。模型需要根据任务描述和问题来预测各选项的概率，并选择概率最高的选项作为答案。在评估设置方面，该数据集通常采用少样本学习方式，在输入提示中加入 5 个示例数据。在评测指标方面，主要采用平均准确率作为衡量标准。</p>
<h4 id="_3-2-big-bench" tabindex="-1"><a class="header-anchor" href="#_3-2-big-bench"><span>3.2 BIG-Bench</span></a></h4>
<p>BIG-Bench 包含了 204 个任务，广泛涵盖了语言学、儿童发展、数学、常识推理、生物学、物理学、社会偏见、软件开发等多个领域，旨在全面反映模型在不同方面的综合能力。</p>
<p>在任务形式方面，BIG-Bench 主要采用了文本生成与多项选择两种类型。</p>
<h4 id="_3-3-其他" tabindex="-1"><a class="header-anchor" href="#_3-3-其他"><span>3.3 其他</span></a></h4>
<p>HELM | C-Eval</p>
<h3 id="_4-专业领域大模型" tabindex="-1"><a class="header-anchor" href="#_4-专业领域大模型"><span>4. 专业领域大模型</span></a></h3>
<blockquote>
<p>介绍了法律、语言、科学研究等场景，其中金融场景如下</p>
</blockquote>
<ul>
<li>知识库资料：公开的公司文件、金融新闻、财务分析报告等</li>
<li>BloombergGPT：该模型采用自回归 Transformer 模型的架构，包含 50B 参数，使用了 363B 词元的金融领域语料和 345B 词元的通用训练语料从头开始预训练。其中，金融领域数据主要来自于彭博社在过去二十年业务中所涉及到的英文金融文档，包括从互联网中抓取的金融文档、金融出版物、彭博社编写的金融新闻以及社交媒体等</li>
<li>金融数据比较隐私，开发数据资源较少，仍需进一步建设与补充。（可能更适合于公司内部）</li>
</ul>
</div></template>


