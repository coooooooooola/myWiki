---
title: 质量架构 - Selenium Grid
date: 2023-09-11
cover: /assets/images/cover2.jpg
headerMask: rgba(40, 57, 101, .4)
catalog: true
tags:
  - 质量架构
---

> UI 自动化平台有并发执行和本地调试的诉求，需要使用到[Selenium Grid](https://www.selenium.dev/documentation/grid/)，学习一下

## 基本介绍

Selenium Grid 通过将客户端发送的命令路由到远程浏览器实例，允许在远程机器上执行 WebDriver 脚本。基本功能：

- 提供一种在多台机器上并行运行测试的方法

- 允许在不同浏览器版本上进行测试
- 支持本地调试

- 实现跨平台测试

## 使用

### 准备环境

- [Java11+](https://www.selenium.dev/blog/2023/java-8-support/)
- 浏览器按照
- 相应版本的 webdriver
- [Selenium-server-xxx.jar](https://github.com/SeleniumHQ/selenium/releases/tag/selenium-4.23.0)

### 启动命令

```shell
java -jar selenium-server-<version>.jar standalone
```

配置 remotUrl = http://localhost:4444

### 基本框架

![Selenium4基本框架](https://www.selenium.dev/images/documentation/grid/components.png)

#### 1. Router

路由器是 Selenium Grid 的入口，它负责接收所有外部请求，并将它们转发到正确的地方。

- 如果 Router 收到新的会话请求，它将被转发到新会话队列。

- 如果请求是已有的会话，路由器将查询会话映射以获取会话正在运行的节点 ID，然后将请求直接转发到节点。

路由器通过将请求发送到能够更好地处理它们的组件来平衡网格中的负载，而不会使过程中不需要的任何组件过载。

#### 2. Distributor

Distributor 主要有两个功能：

- 注册并跟踪所有节点及其功能
  节点通过事件总线发送节点注册事件，向分发器注册。分发器读取该事件，然后尝试通过 HTTP 访问节点以确认其存在。如果请求成功，分发器将注册节点并通过 GridModel 跟踪所有节点的功能。

- 查询新会话队列并处理任何待处理的新会话请求
  当新会话请求发送到路由器时，它将被转发到新会话队列，并在队列中等待。Distributor 将轮询新会话队列以查找待处理的新会话请求，然后找到可以创建会话的合适节点。创建会话后，Distributor 将 Session ID 和 Session Node 的映射关系存储在 Session Map

#### 3. Session Map

Session Map 是一个数据存储，用于保存正在运行的 Session ID 与 Session Node 映射关系。它支持路由器将请求转发到节点。Router 将向 Session Map 询问与 Session ID 关联的节点

#### 4. Session Queue

以 FIFO 顺序保存所有新会话请求。路由器将新会话请求添加到 Session Queue 并等待响应。Session Queue 定期检查队列中是否有任何请求已超时，如果是，则立即拒绝并删除该请求。

Router 定期检查是否有可用插槽。如果有，Router 将轮询 Session Queue 以查找第一个匹配的请求。然后，Distributor 尝试创建新会话。

一旦请求的功能与任何空闲节点插槽的功能匹配，分发器就会尝试获取可用插槽。如果所有插槽都忙，分发器会将请求发送回队列。如果请求在重试或添加到队列前面时超时，它将被拒绝。

会话创建成功后，Distributor 将会话信息发送到 Session Queue，然后 Session Queue 再发送回路由器，最后发送至客户端。

#### 5. Node

网格可以包含多个节点。每个节点管理其运行所在机器的可用浏览器的插槽。节点通过事件总线将自身注册到分发器，其配置作为注册消息的一部分发送。

默认情况下，节点会自动注册其运行所在机器路径上的所有可用浏览器驱动程序。它还为每个可用 CPU 创建一个插槽，用于基于 Chromium 的浏览器和 Firefox。对于 Safari，只创建一个插槽。通过特定配置，它可以在 Docker 容器中运行会话或中继命令。

节点仅执行收到的命令，它不会评估、判断或控制命令和响应流以外的任何内容。运行节点的机器不需要与其他组件具有相同的操作系统。例如，Windows 节点可能能够在 Edge 上提供 IE 模式作为浏览器选项，而在 Linux 或 Mac 上则不可能，并且网格可以有多个配置有 Windows、Mac 或 Linux 的节点。

#### 6. Event Bus

事件总线充当节点、分发器、新会话队列和会话映射之间的通信路径。网格通过消息进行大部分内部通信，从而避免了昂贵的 HTTP 调用。在以完全分布式模式启动网格时，事件总线是应启动的第一个组件。

> 依赖关系图 https://www.selenium.dev/documentation/grid/architecture/

## Selenium Grid 的三种模式

### 1. StandAlone

standalone 模式将上面提到的六种组件都集成到一起 => 单机部署，单机执行，这种模式很适合远程调试功能。

默认情况下，Server 会监听 http://localhost:4444 上的 RemoteWebDriver 请求，同时从系统 PATH 中检测可用的驱动程序。

```shell
java -jar selenium-server-xxx.jar standalone
```

Standalone 使用场景：

- ⭐ 在本地使用 RemoteWebDriver 开发或调试测试
- 在推送代码之前运行快速测试套件
- 在 CI/CD 工具中轻松设置网格

### 2. Hub & Node

使用场景

- ⭐ 兼容性测试：将不同操作系统/浏览器版本的机器组合在一个 Grid
- 无需拆除 Grid 即可实现扩缩容

这种模式由 Hub 和 Node 组成：

- A Hub is composed by the following components: Router, Distributor, Session Map, New Session Queue, and Event Bus.
- Node 独立部署

#### 2.1 Hub 与 Node 部署在同一台机器

- Hub 命令

  ```shell
  java -jar selenium-server-<version>.jar hub
  ```

- Node 命令

  ```shell
  //默认4444
  java -jar selenium-server-<version>.jar node
  OR
  java -jar selenium-server-<version>.jar node --port 5555
  ```

#### 2.2 Hub 与 Node 部署在不同机器

Node 向 Hub 中的总线 Event Bus 发送 HTTP 实现注册请求，总线收到消息后 也会通过 HTTP 请求确认 Node 是否存在。

- Hub 使用的默认端口

  - Hub 启动命令

    ```shell
    java -jar selenium-server-<version>.jar hub
    ```

  - Node 启动命令

    ```shell
    java -jar selenium-server-<version>.jar node --hub http://<hub-ip>:4444
    ```

- Hub 未使用默认端口

  - Hub 启动命令

    ```shel
    java -jar selenium-server-<version>.jar hub --publish-events tcp://<hub-ip>:8886 --subscribe-events tcp://<hub-ip>:8887 --port 8888
    ```

  - Node

    ```shell
    java -jar selenium-server-<version>.jar node --publish-events tcp://<hub-ip>:8886 --subscribe-events tcp://<hub-ip>:8887
    ```

### 3. Distributed

Distributed 模式下，每个组件都是独立部署的（不像 Hub 模式下除 Node 外都统一部署）。

- Event Bus：default port 4442 4443 5557

  ```shell
  java -jar selenium-server-<version>.jar event-bus --publish-events tcp://<event-bus-ip>:4442 --subscribe-events tcp://<event-bus-ip>:4443 --port 5557
  ```

- Session Queue：default port 5559

  ```shell
  java -jar selenium-server-<version>.jar sessionqueue --port 5559
  ```

- Session Map：default port 5556，与 event bus 交互

  ```shell
  java -jar selenium-server-<version>.jar sessions --publish-events tcp://<event-bus-ip>:4442 --subscribe-events tcp://<event-bus-ip>:4443 --port 5556
  ```

- Distributor：default port 5553. 查询**New Session Queue**中的新会话请求，并将符合要求的分配给**Node**。**Node**以在**Hub/Node**网格中向**Event Bus**注册的方式向**Distributor**注册。

  ```shell
  java -jar selenium-server-<version>.jar distributor --publish-events tcp://<event-bus-ip>:4442 --subscribe-events tcp://<event-bus-ip>:4443 --sessions http://<sessions-ip>:5556 --sessionqueue http://<new-session-queue-ip>:5559 --port 5553 --bind-bus false
  ```

- Router：default port 4444. 与 **New Session Queue**, **Session Map**, **Distributor**交互，因此启动时需要带上对应的参数

  ```shell
  java -jar selenium-server-<version>.jar router --sessions http://<sessions-ip>:5556 --distributor http://<distributor-ip>:5553 --sessionqueue http://<new-session-queue-ip>:5559 --port 4444
  ```

- Node: default port 5555

  ```shell
  java -jar selenium-server-<version>.jar node --publish-events tcp://<event-bus-ip>:4442 --subscribe-events tcp://<event-bus-ip>:4443
  ```

### 如何选择模式？

> From 官方文档：
>
> 1. Hub：选择网格角色取决于需要支持哪些操作系统和浏览器、需要执行多少个并行会话、可用机器的数量以及这些机器的性能（CPU、RAM）。并行创建会话依赖于分发器可用的处理器。例如，如果一台机器有 4 个 CPU，则分发器最多只能并行创建 4 个会话。
> 2. Node：默认情况下，节点支持的最大并行会话数量受可用 CPU 数量的限制。例如，如果节点机器有 8 个 CPU，则它可以运行最多 8 个并行浏览器会话（Safari 除外，它始终只有一个）。此外，预计每个浏览器会话应使用大约 1GB RAM。
> 3. 根据 Node 数模式：
>    - standalone - 小于 5 Nodes
>    - Hub/Node - 6-100 Nodes
>    - Distributed - 大于 100 Nodes

实践来看，如果是远程 debug 模式，选 standalone，QA 主机电脑通常是可以支持 16 个并行会话；兼容性测试选 Hub/Node 模式，Node 层可以使用 docker 扩展。
