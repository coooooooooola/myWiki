import comp from "/Users/swtywang/Coding/05 我的博客/my-docs-new/src/.vuepress/.temp/pages/posts/AI/02 LangChain _ RAG 学习实践.html.vue"
const data = JSON.parse("{\"path\":\"/posts/AI/02%20LangChain%20_%20RAG%20%E5%AD%A6%E4%B9%A0%E5%AE%9E%E8%B7%B5.html\",\"title\":\"LangChain + RAG 学习实践\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"LangChain + RAG 学习实践\",\"date\":\"2024-04-12T00:00:00.000Z\",\"cover\":\"/assets/images/cover4.jpg\",\"headerMask\":\"rgba(40, 57, 101, .4)\",\"catalog\":true,\"tags\":[\"AI\"],\"gitInclude\":[],\"description\":\"前置准备 gpt 账号 python3.11 以及相关依赖 LangChain 框架基础知识 LangChain Docs： 快速入门：https://python.langchain.com/v0.2/docs/tutorials/ 具体 demo 实现：https://python.langchain.com/v0.2/docs/how_to/ 基...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://swtywang/posts/AI/02%20LangChain%20_%20RAG%20%E5%AD%A6%E4%B9%A0%E5%AE%9E%E8%B7%B5.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"swtywang's homepage\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"LangChain + RAG 学习实践\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"前置准备 gpt 账号 python3.11 以及相关依赖 LangChain 框架基础知识 LangChain Docs： 快速入门：https://python.langchain.com/v0.2/docs/tutorials/ 具体 demo 实现：https://python.langchain.com/v0.2/docs/how_to/ 基...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://swtywang/assets/images/cover4.jpg\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"name\":\"twitter:card\",\"content\":\"summary_large_image\"}],[\"meta\",{\"name\":\"twitter:image:src\",\"content\":\"https://swtywang/assets/images/cover4.jpg\"}],[\"meta\",{\"name\":\"twitter:image:alt\",\"content\":\"LangChain + RAG 学习实践\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"AI\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2024-04-12T00:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"LangChain + RAG 学习实践\\\",\\\"image\\\":[\\\"https://swtywang.fun/minio/blog/b42d6ea1c0325b7f1e7acf4cf0593efd.jpg\\\",\\\"https://swtywang.fun/minio/blog/ed48c4f9f25a9e14c08320362563c154.jpg\\\",\\\"https://swtywang.fun/minio/blog/8a67a418ae0975cb0af81589d4feba13.webp\\\"],\\\"datePublished\\\":\\\"2024-04-12T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"swtywang\\\",\\\"url\\\":\\\"https:www.baidu.com\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"LangChain 框架基础知识\",\"slug\":\"langchain-框架基础知识\",\"link\":\"#langchain-框架基础知识\",\"children\":[{\"level\":3,\"title\":\"整体框架\",\"slug\":\"整体框架\",\"link\":\"#整体框架\",\"children\":[]}]},{\"level\":2,\"title\":\"Components\",\"slug\":\"components\",\"link\":\"#components\",\"children\":[{\"level\":3,\"title\":\"1. Chat models\",\"slug\":\"_1-chat-models\",\"link\":\"#_1-chat-models\",\"children\":[]},{\"level\":3,\"title\":\"2. LLMs\",\"slug\":\"_2-llms\",\"link\":\"#_2-llms\",\"children\":[]},{\"level\":3,\"title\":\"3. Message\",\"slug\":\"_3-message\",\"link\":\"#_3-message\",\"children\":[]},{\"level\":3,\"title\":\"4. Prompt templates\",\"slug\":\"_4-prompt-templates\",\"link\":\"#_4-prompt-templates\",\"children\":[]},{\"level\":3,\"title\":\"5. Output parsers\",\"slug\":\"_5-output-parsers\",\"link\":\"#_5-output-parsers\",\"children\":[]},{\"level\":3,\"title\":\"Chat history\",\"slug\":\"chat-history\",\"link\":\"#chat-history\",\"children\":[]},{\"level\":3,\"title\":\"Documents Loaders\",\"slug\":\"documents-loaders\",\"link\":\"#documents-loaders\",\"children\":[]},{\"level\":3,\"title\":\"Text splitters\",\"slug\":\"text-splitters\",\"link\":\"#text-splitters\",\"children\":[]},{\"level\":3,\"title\":\"Embedding models\",\"slug\":\"embedding-models\",\"link\":\"#embedding-models\",\"children\":[]},{\"level\":3,\"title\":\"Vector stores\",\"slug\":\"vector-stores\",\"link\":\"#vector-stores\",\"children\":[]},{\"level\":3,\"title\":\"Retrievers\",\"slug\":\"retrievers\",\"link\":\"#retrievers\",\"children\":[]},{\"level\":3,\"title\":\"Tools\",\"slug\":\"tools\",\"link\":\"#tools\",\"children\":[]},{\"level\":3,\"title\":\"Agents\",\"slug\":\"agents\",\"link\":\"#agents\",\"children\":[]},{\"level\":3,\"title\":\"CallBacks\",\"slug\":\"callbacks\",\"link\":\"#callbacks\",\"children\":[]}]},{\"level\":2,\"title\":\"RAG\",\"slug\":\"rag\",\"link\":\"#rag\",\"children\":[{\"level\":3,\"title\":\"0. 工作流程\",\"slug\":\"_0-工作流程\",\"link\":\"#_0-工作流程\",\"children\":[]},{\"level\":3,\"title\":\"1. RAG 的技术点\",\"slug\":\"_1-rag-的技术点\",\"link\":\"#_1-rag-的技术点\",\"children\":[]},{\"level\":3,\"title\":\"2. 应用场景\",\"slug\":\"_2-应用场景\",\"link\":\"#_2-应用场景\",\"children\":[]},{\"level\":3,\"title\":\"3. 问题与使用体验\",\"slug\":\"_3-问题与使用体验\",\"link\":\"#_3-问题与使用体验\",\"children\":[]}]}],\"readingTime\":{\"minutes\":7.74,\"words\":2323},\"filePathRelative\":\"posts/AI/02 LangChain + RAG 学习实践.md\",\"localizedDate\":\"2024年4月12日\",\"excerpt\":\"\\n<blockquote>\\n<p>前置准备</p>\\n<ol>\\n<li>gpt 账号</li>\\n<li>python3.11 以及相关依赖</li>\\n</ol>\\n</blockquote>\\n<h2>LangChain 框架基础知识</h2>\\n<blockquote>\\n<p>LangChain Docs：</p>\\n<ol>\\n<li>快速入门：<a href=\\\"https://python.langchain.com/v0.2/docs/tutorials/\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">https://python.langchain.com/v0.2/docs/tutorials/</a></li>\\n<li>具体 demo 实现：<a href=\\\"https://python.langchain.com/v0.2/docs/how_to/\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">https://python.langchain.com/v0.2/docs/how_to/</a></li>\\n<li>基本概念解释：<a href=\\\"https://python.langchain.com/v0.2/docs/concepts/\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">https://python.langchain.com/v0.2/docs/concepts/</a></li>\\n<li>API 文档：<a href=\\\"https://api.python.langchain.com/en/latest/langchain_api_reference.html\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">https://api.python.langchain.com/en/latest/langchain_api_reference.html</a></li>\\n</ol>\\n</blockquote>\",\"autoDesc\":true}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
