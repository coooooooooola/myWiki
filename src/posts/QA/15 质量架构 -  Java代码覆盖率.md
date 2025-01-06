---
title: 质量架构 -  Java代码覆盖率
date: 2024-02-11
cover: /assets/images/cover2.jpg
headerMask: rgba(40, 57, 101, .4)
catalog: true
tags:
  - 质量架构
---

|                          |                                     Jacoco/Super-jacoco                                      |                                   JVM-SANDOBX                                    |
| :----------------------: | :------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------: |
|          Github          | https://github.com/didi/super-jacoco 454 star<br /> https://github.com/jacoco/jacoco 4k star |                 https://github.com/alibaba/jvm-sandbox 6.6k star                 |
|           定位           |                                       开源的覆盖率工具                                       | 一种 JVM 的非侵入式运行期 AOP 解决方案，可用于故障定位、链路追踪、录制回放等场景 |
|         插桩原理         |                                          字节码增强                                          |                      基于 Instrumentation 的动态字节码增强                       |
|           插桩           |                                  jacoco-agent.jar 无需改造                                   |                                  支持，需要开发                                  |
|       识别 header        |                                 不支持，目前没看到较好的实现                                 |                                  支持，需要开发                                  |
|        增量覆盖率        |                                super-jacoco 已支持，无需改造                                 |                                  支持，需要开发                                  |
| 覆盖率数据收集& 报告生成 |                             原生 dump + merge + report，无需改造                             |                              不支持，自定义数据结构                              |
|        跨线程传递        |                                            不支持                                            |                                       支持                                       |

## Jacoco/Super-jacoco

> JaCoCo 通过修改字节码的方式来插入探针，这会导致一定程度上的“侵入性”，因为它需要在编译后的字节码中插入额外的代码，永久改变类文件。

### 核心流程

JaCoCo 主要通过修改 Java 类的字节码来实现覆盖率分析。它会在编译后的 Java 类文件（即 .class 文件）中插入额外的字节码指令，这些指令称为探针（probe）或者插桩点（instrumentation points）。

#### 阶段 1. 插桩

插桩点 -> 生成插桩代码（字节码指令） -> 插入探针 -> 将插入探针后的字节码重新生成为类文件 -> 类加载

```java
mv.visitFieldInsn(Opcodes.*GETSTATIC*, "java/util/logging/Level", "INFO",       "Ljava/util/logging/Level;");
```

```java
public class Calculator {

    public int add(int a, int b) {
        return a + b;
    }

    public int subtract(int a, int b) {
        return a - b;
    }
}

```

===> 插桩后代码

```java
public class Calculator {
    private static boolean[] $jacocoData;

    public int add(int a, int b) {
        boolean[] $jacocoData = $jacocoInit();
        $jacocoData[0] = true; // 方法入口探针
        int result = a + b;
        $jacocoData[1] = true; // 行探针
        return result;
    }

    public int subtract(int a, int b) {
        boolean[] $jacocoData = $jacocoInit();
        $jacocoData[2] = true; // 方法入口探针
        int result = a - b;
        $jacocoData[3] = true; // 行探针
        return result;
    }

    private static boolean[] $jacocoInit() {
        if ($jacocoData == null) {
            $jacocoData = new boolean[4]; // 总共4个探针
        }
        return $jacocoData;
    }
}

```

#### 阶段 2. 执行

遇到 ALOAD、xPUSH 等字节码触发探针染色

#### 阶段 3. dump

收集探针的执行情况，每个类是一个`ExecutionData`对象

##### 1. ExecutionData：

- `ExecutionData` 对象用于表示每个类（Class）或者源文件（Source File）的执行数据。

- 包含了类或源文件的名称、探针覆盖率数据数组以及类或源文件是否被执行的标志。

- 在 JaCoCo 的 API 中，ExecutionData 的类是` org.jacoco.core.data.ExecutionData`。

```java
public final class ExecutionData {
    private final long id;
    //类名
    private final String name;
    private final boolean[] probes;
}
```

##### 2. ExecutionDataStore：

- ExecutionDataStore`是一个集合，用于存储所有的`ExecutionData` 对象。
- 每个` ExecutionData` 对象包含了一个或多个探针（例如，每个方法或者每行代码一个探针）的覆盖率数据。
- 在 JaCoCo 的 API 中，`ExecutionDataStore` 的类是 `org.jacoco.core.data.ExecutionDataStore`。

##### 3. SessionInfo：

- SessionInfo 用于表示单次测试运行的会话信息，包括会话名称、ID、时间戳等。

- 每个会话信息都对应一次测试的覆盖率数据。

- 在 JaCoCo 的 API 中，SessionInfo 的类是 org.jacoco.core.data.SessionInfo。

```java
public class SessionInfo implements Comparable<SessionInfo> {
	private final String id;
	private final long start;
	private final long dump;
}
```

##### 4. ExecutionDataWriter 和 ExecutionDataReader：

- 这两个类用于将 `ExecutionData` 对象写入文件或者从文件中读取。
- `ExecutionDataWriter` 将` ExecutionDataStore` 中的数据写入文件。
- `ExecutionDataReader` 从文件中读取 `ExecutionData` 数据并加载到` ExecutionDataStore` 中。
- 在 JaCoCo 的 API 中，它们分别是 `org.jacoco.core.data.ExecutionDataWriter` 和 `org.jacoco.core.data.ExecutionDataReader`。

## JVM-SANDBOX

> 运行时字节码增强：JVM-Sandbox 使用 Java Agent 机制在运行时对字节码进行修改。这意味着它是在类加载期间或类加载之后进行的动态增强，而不是在编译后静态地修改字节码。
>
> 无侵入修改字节码：这些增强和修改仅在当前 JVM 实例中生效，不会改变原始类文件的字节码。换句话说，重启应用程序或 JVM 后，增强将不再存在，原始类文件仍保持不变。

具体原理在【流量录制回放平台】已记录，这里记录下 Java-Agent 的两种加载方式

### premain

**定义和用途**：

- `premain` 方法是 Java Agent 的主要入口点，用于在 JVM 启动时，即主方法执行之前，加载 Java Agent。一般情况下，通过 `-javaagent` 参数加载 Agent。
- 可以在 `MANIFEST.MF` 文件中通过 `Premain-Class` 指定 `premain` 方法所在的类。

**加载时机**：

- 在应用程序启动之前，即在 `main` 方法执行之前加载 Agent。
- 适合用于在 JVM 启动时就需要修改字节码或者监控应用程序的场景。

### agentmain

**加载时机**：

- 可以在 JVM 运行时通过 Attach API 动态加载 Agent。
- 适合用于需要在应用程序已经运行时动态地加载和使用 Java Agent 的场景。
