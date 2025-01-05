---
title: Multi - agent 学习实践
date: 2024-04-21
cover: https://swtywang.fun/minio/blog/0363646c9b886373501dad692957d280.png
headerMask: rgba(40, 57, 101, .4)
catalog: true
tags:
  - AI
---

> 现在有一些多智能体的框架或者产品，挑选三类主流且有区分度的学习下（LangGraph、AutoGen、Coze）

## 1. LangGraph

> 一个使用 LLM 构建有状态、多角色应用程序的库，可用于创建 agent 或者 multi-agents 流程。
>
> 与 LangChain 的学习路径一样，LangGraph Docs：
>
> - 快速入门：https://langchain-ai.github.io/langgraph/tutorials/
> - 具体 Demo：https://langchain-ai.github.io/langgraph/how-tos/
> - 基本概念：https://langchain-ai.github.io/langgraph/concepts/

### 基本概念

#### Graphs

这个是 LangGraph 的核心概念，LangGraph agent 工作流以图的方式运作。每一个 agent 都会包括三个关键属性：

- State：表示应用程序当前快照（状态）的共享数据结构，通常是 Dict/BaseModel
- Nodes：接收当前 State 作为输入，执行一些具体逻辑 => do the work
- Edges：根据当前状态确定接下来要执行哪个节点 => tell what to do next

LangGraph 实现的是有向无环图（DAG），即图中的边是有方向的，会根据状态流转，但是不会出现某个节点流转若干个边后回到原节点的情况。

### 实践

有些概念初次看有点灰色，但是结合例子就十分清晰。

#### 官方 RAG 示例

> [完整版本](https://langchain-ai.github.io/langgraph/tutorials/rag/langgraph_adaptive_rag/)

![下载 (1)](https://swtywang.fun/minio/blog/0363646c9b886373501dad692957d280.png)

省略很多基于 LangChain 的方法实现，构建 Graph 的核心流程如下：

```python
# 定义GraphState，Node会接受这些输入进行处理
class GraphState(TypedDict):
    question: str
    generation: str
    documents: List[str]
```

```py
# 初始化工作流
workflow = StateGraph(GraphState)

# 定义Nodes节点，每个节点对应一个function实现
workflow.add_node("web_search", web_search)  # web search
workflow.add_node("retrieve", retrieve)  # retrieve
workflow.add_node("grade_documents", grade_documents)  # grade documents
workflow.add_node("generate", generate)  # generatae
workflow.add_node("transform_query", transform_query)  # transform_query

# 定义条件边,对应的红色部分的条件判断
# STAR：起始点，内置属性
# route_question: 自定义判断函数，会返回web_search 或者vectorstore
# path_map：依据route_question的返回结果，如果是web_serach，那么下一个执行节点是web_search；如果是vectorstore，下一个执行节点是retrieve
workflow.add_conditional_edges(
    START,
    route_question,
    {
        "web_search": "web_search",
        "vectorstore": "retrieve",
    },
)
# 添加一个边，web_search流转到generate
workflow.add_edge("web_search", "generate")
workflow.add_edge("retrieve", "grade_documents")
workflow.add_conditional_edges(
    "grade_documents",
    decide_to_generate,
    {
        "transform_query": "transform_query",
        "generate": "generate",
    },
)
workflow.add_edge("transform_query", "retrieve")
workflow.add_conditional_edges(
    "generate",
    grade_generation_v_documents_and_question,
    {
        "not supported": "generate",
        "useful": END,
        "not useful": "transform_query",
    },
)

# 编译工作流
app = workflow.compile()
```

#### 自定义 WorkFlow

> 之前在使用 [Coze](https://www.coze.com/) 时，创建过一条关于 Bilibili 视频总结的工作流，LangGraph 的只是需要用代码方式实现

![截屏2024-08-05 20.47.54](https://swtywang.fun/minio/blog/af8c150847374ad7872a40a50b741fc9.png)

```py
# 定义GraphState
class GraphState(TypedDict):
    video_url: str



# 初始化工作流
workflow = StateGraph(GraphState)

# 定义Nodes节点，每个节点对应一个function实现
workflow.add_node("video_validate", video_validate)  # 调用LLM，实现校验url有效性的函数
workflow.add_node("get_link", get_link)  # 实现返回videoUrl
workflow.add_node("get_access_content", get_access_content)  # 获取内容
workflow.add_node("generate", generate)  # generatae

workflow.add_edge(START , "video_validate")
workflow.add_conditional_edges(
    START,
    video_validate,
    {
        "valid": "get_link",
        "no-valid": END,
    },
)
# 添加一个边
workflow.add_edge("get_link","get_access_content")
workflow.add_edge("get_access_content",END)

# 编译工作流
app = workflow.compile()
```

## 2. AutoGen

[官方手册](https://microsoft.github.io/autogen)

AutoGen 框架用于构建 AI agent 并且可以让多个代理之间通过"合作"的形式来解决任务。
和 LangGraph 使用感受最大的不同：它不用通过硬编码去编排大量复杂的流程，而是利用 LLM 对话的形式处理。

### 2.1 实现原理

Agent 主要有两个实现类：Assistant Agent 和 UserProxy Agent。

- Assistant Agent 主要负责接收任务并且具体处理任务，可以有多个
- UserProxy Agent 主要负责验证任务是否终态并不断向 Assistant Agent 发送新的指令，一般只有一个。

### 2.2 亮点

- AutoGen 可以执行代码并将产物保存到本地
- AutoGen 支持人工介入：UserPorxy 的 human_input_mode 属性支持 ALWAYS、NEVER、TERMINATE。如果是 ALWAYS，那么每次执行后会等待下一步指令。

### 2.3 单智能体示例

> 只定义一个 Assistant Agent，另一个 UserProxy Agent 的介入模式设为 ALWAYS，同时配置 CHATGPT-4o 模型。

![截屏2024-08-05 22.40.26](https://swtywang.fun/minio/blog/08df06260f3d5e1853ab6b0f03f3bfa5.png)

### 2.4 多智能体示例

> 定义两个 Assistant Agent，一个负责 code，一个负责拆解需求 for code。再定义一个 UserProxy Agent，将他们三个 Agent 放到一个组中即可。
> PS：有点费钱，看看[这个视频](https://www.bilibili.com/video/BV1Fw41167v9)就行

## 3. [Coze](https://www.coze.com/home)

Coze 是字节跳动推出的智能体创建平台，我们可以在这里可视化的创造编排基于多 agent 的应用。(PS:平台免费支持 GPT-4o)
具体使用还是挺简单的，社区中也实现了诸多[workflow](https://www.coze.com/store/workflow)供参考。

## 4. 使用感受

|           |                          优点                          |                           缺点                            |
| :-------: | :----------------------------------------------------: | :-------------------------------------------------------: |
| LangGraph | 支持自定义复杂任务，支持编排比较复杂的工作流，扩展性强 |  即使是创建一个简单的工作流也需要实现大量代码，不够直观   |
|  AutoGen  |      效果很惊艳，支持与本地进程交互；支持人工介入      |           比较依赖 LLM 能力，目前仅支持 OPENAI            |
|   Coze    | 可视化编排，操作简单明了；社区有丰富的插件和工作流资源 | 复杂流程/任务场景效果不佳；平台上目前都是 DEMO 级别的应用 |
