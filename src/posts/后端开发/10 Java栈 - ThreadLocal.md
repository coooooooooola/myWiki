---
title: Java栈 - ThreadLocal
date: 2021-09-12
cover: /assets/images/cover4.jpg
headerMask: rgba(40, 57, 101, .4)
catalog: true
tags:
  - server
---

## ThreadLocal

### 简介

多线程访问同一个变量容易出现并发问题，特别是多个线程对一个变量进行写入的时候，为了保证线程安全，一般使用者在访问共享变量的时候需要进行额外的同步措施才能保证线程安全性。ThreadLocal 是除了加锁这种同步方式之外的一种保证一种规避多线程访问出现线程不安全的方法，当我们在创建一个变量后，如果每个线程对其进行访问的时候访问的都是线程自己的变量这样就不会存在线程不安全问题。

#### 简单示例

比如现在有 4 个线程，通过 ThreadLocal 可以实现每个线程持有自己独有的值

```java
public class ThreadLocalHelloWorld {
   private static final ThreadLocal<Integer> threadLocalValue = ThreadLocal.withInitial(() -> 0);
    private static final ThreadLocal<Integer> threadLocalValue1 = ThreadLocal.withInitial(() -> 0);

    public static void main(String[] args) {
        Thread thread1 = new Thread(() -> {
            threadLocalValue.set(10);  // 设置线程1的 ThreadLocal 值
            threadLocalValue1.set(10);  // 设置线程1的 ThreadLocal 值
            printThreadLocalValue("Thread 1");
        });

        Thread thread2 = new Thread(() -> {
            threadLocalValue.set(20);  // 设置线程2的 ThreadLocal 值
            threadLocalValue1.set(2000);  // 设置线程2的 ThreadLocal 值
            printThreadLocalValue("Thread 2");
        });

        Thread thread3 = new Thread(() -> {
            threadLocalValue.set(30);  // 设置线程3的 ThreadLocal 值
            threadLocalValue1.set(30000);  // 设置线程3的 ThreadLocal 值
            printThreadLocalValue("Thread 3");
        });

        thread1.start();
        thread2.start();
        thread3.start();
        threadLocalValue.set(-1);  // 设置线程1的 ThreadLocal 值
        threadLocalValue1.set(-1000);  // 设置线程1的 ThreadLocal 值
        printThreadLocalValue("Thread 0");
        // 等待所有线程结束
        try {
            thread1.join();
            thread2.join();
            thread3.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    private static void printThreadLocalValue(String threadName) {
        System.out.println(threadName + " ThreadLocal Value: " + threadLocalValue.get());
        System.out.println(threadName + " ThreadLocal Value: " + threadLocalValue1.get());
    }
}

Thread 0 ThreadLocal Value: -1
Thread 1 ThreadLocal Value: 10
Thread 0 ThreadLocal Value: -1000
Thread 1 ThreadLocal Value: 10
Thread 2 ThreadLocal Value: 20
Thread 3 ThreadLocal Value: 30
Thread 2 ThreadLocal Value: 2000
Thread 3 ThreadLocal Value: 30000
```

### 源码阅读

#### 1. Thread 类

```java
class Thread implements Runnable {
	/* ThreadLocal values pertaining to this thread. This map is maintained  by the ThreadLocal class. */
    ThreadLocal.ThreadLocalMap threadLocals = null;

    /*
     * InheritableThreadLocal values pertaining to this thread. This map is
     * maintained by the InheritableThreadLocal class.
     */
    ThreadLocal.ThreadLocalMap inheritableThreadLocals = null;
}
```

Thread 类中有两个**实例变量**threadLocals 和 inheritableThreadLocals，它们的底层数据结构是**ThreadLocal.ThreadLocalMap**（后面会详细介绍）。threadLocals 维护了当前线程的线程变量副本，inheritableThreadLocals 适用于父子线程传递的场景（每个线程会有自己的 ThreadLocalMap）

#### 2. ThreadLocal

> This class provides thread-local variables. These variables differ from their normal counterparts in that each thread that accesses one (via its get or set method) has its own, independently initialized copy of the variable. ThreadLocal instances are typically private static fields in classes that wish to associate state with a thread (e.g., a user ID or Transaction ID).
> For example, the class below generates unique identifiers local to each thread. A thread's id is assigned the first time it invokes ThreadId.get() and remains unchanged on subsequent calls.

```java
import java.util.concurrent.atomic.AtomicInteger;

public class ThreadId {
      // Atomic integer containing the next thread ID to be assigned
      private static final AtomicInteger nextId = new AtomicInteger(0);
      // Thread local variable containing each thread's ID
      private static final ThreadLocal<Integer> threadId =
          new ThreadLocal<Integer>() {
              @Override protected Integer initialValue() {
                  return nextId.getAndIncrement();
          }
      };
      // Returns the current thread's unique ID, assigning it if necessary
      public static int get() {
          return threadId.get();
      }
  }
```

> Each thread holds an implicit reference to its copy of a thread-local variable as long as the thread is alive and the ThreadLocal instance is accessible; after a thread goes away, all of its copies of thread-local instances are subject to garbage collection (unless other references to these copies exist).
> Since:
> 1.2
> Author:
> Josh Bloch and Doug Lea

##### 2.1 主要方法与属性

```markdown
ThreadLocal
├─ ThreadLocal()  
├─ nextHashCode()  
├─ initialValue()  
├─ get():T  
├─ setInitialValue():T
├─ set(T):T  
├─ remove():void  
├─ getMap(Thread):ThreadLocalMap
├─ createMap(Thread, T):void
├─ threadLocalHashCode  
├─ nextHashCode  
├─ HASH_INCREMENT
├─ ThreadLocalMap  
│ ├─ getEntry(ThreadLocal<?>):Entry
│ ├─ set(ThreadLocal<?>,Object):void
│ ├─algorithmcenter_timer
```

##### 2.2 写操作

```java
//实际上就是修改Thread.currentThread().threadLocal变量的值
public void set(T value) {
    Thread t = Thread.currentThread();
    ThreadLocalMap map = getMap(t);
    if (map != null)
        map.set(this, value);
    else
        createMap(t, value);
}


void createMap(Thread t, T firstValue) {
    t.threadLocals = new ThreadLocalMap(this, firstValue);
}
```

##### 2.3 查操作

```java
//返回当前线程的threadlocal变量副本，如果当前线程没有值会被初始化
public T get() {
    Thread t = Thread.currentThread();
    ThreadLocalMap map = getMap(t);
    if (map != null) {
        ThreadLocalMap.Entry e = map.getEntry(this);
        if (e != null) {
            @SuppressWarnings("unchecked")
            T result = (T)e.value;
            return result;
        }
    }
    return setInitialValue();
}
```

上一步中的 getMap(t)，实际上就是读取的当前线程 threadlocal

```java
ThreadLocalMap getMap(Thread t) {
    return t.threadLocals;
}
```

#### 3. ThreadLocal.ThreadLocalMap

ThreadLocalMap 类似 HashMap 的结构，key 表示 ThreadLocal 类型对象，value 是预期要存储的值。

```markdown
├─ ThreadLocalMap  
│ ├─ getEntry(ThreadLocal<?>):Entry
│ ├─ set(ThreadLocal<?>,Object):void
│ ├─ nextIndex(int,int):int
│ ├─ prevIndex(int,int):int
│ ├─ remove(ThreadLocal<?>):void
│ ├─ rehash():void
│ ├─ table: Entry[]
│ ├─ Class Entry
```

##### 3.1 初始化

```java
ThreadLocalMap(ThreadLocal<?> firstKey, Object firstValue) {
    table = new Entry[INITIAL_CAPACITY];
    int i = firstKey.threadLocalHashCode & (INITIAL_CAPACITY - 1);
    table[i] = new Entry(firstKey, firstValue);
    size = 1;
    setThreshold(INITIAL_CAPACITY);
}
```

Entry 继承了 WeakReference 类，并利用其主要引用字段作为键值（该键始终是一个 ThreadLocal 对象）。键值为 null 的情况（即 entry.get()返回 null）表示这个键不再被引用了，因此可以将此条目从表中移除。

```java
static class Entry extends WeakReference<ThreadLocal<?>> {
    /** The value associated with this ThreadLocal. */
    Object value;

    Entry(ThreadLocal<?> k, Object v) {
        super(k);
        value = v;
    }
}
```

##### 3.2 写操作

直到这里，ThreadLocal 的 set 操作才全部执行完成。set 操作针对 Hash 值的几种情况：

1）hash 对应槽位的值为空：直接放入新数据

2）hash 对应槽位的值不为空，且 ThreadLocal 对象为当前对象：直接更新新数据

3）不满足上述两个条件，就继续遍历，知道找到一个空槽或者值为 null 的槽，插入新数据

```java
 private void set(ThreadLocal<?> key, Object value) {

    Entry[] tab = table;
    int len = tab.length;
    int i = key.threadLocalHashCode & (len-1);

    for (Entry e = tab[i];
         e != null;
         e = tab[i = nextIndex(i, len)]) {
        ThreadLocal<?> k = e.get();

        if (k == key) {
            e.value = value;
            return;
        }

        if (k == null) {
            replaceStaleEntry(key, value, i);
            return;
        }
    }

    tab[i] = new Entry(key, value);
    int sz = ++size;
    if (!cleanSomeSlots(i, sz) && sz >= threshold)
        rehash();
}
```

### [transmittable-thread-local](https://github.com/alibaba/transmittable-thread-local) - 阿里巴巴

> 适用于线程池复用的场景 https://github.com/alibaba/transmittable-thread-local

### 应用场景

> 适用于与线程绑定，存储某个线程 ID 信息的场景

#### 1. 动态数据源切换

`private static final ThreadLocal<String> contextHolder = new ThreadLocal<>();`记录当前线程的数据源，通过重写 determineCurrentLookupKey 实现动态切换

#### 2. MDC 日志管理

MDC 记录了线程 ii 和 的上下文数据（比如用户信息），在多线程场景下确保打印的日志携带当前线程的信息

#### 3. 链路追踪

例如 Cat 或者 SkyWalking 等链路追踪组件，会为每一个请求生成 traceid、spanid 等信息，并借助 threadlocal 完成上下文传递，实现完整展现一个请求的全部执行路径。

#### 4. 录制回放

流量录制与链路追踪类似，在流量入口处（before event）生成或者使用框架的 traceId，并记录到 threadLocal 中，同时记录被测类的入参和返回，最终传回数据中心完成录制。

### 使用注意 ⚠

- 线程变量使用完**必须**及时销毁，否则当线程一直存活时， 会出现脏数据或者内存泄漏
- 开发调试时如果想看 ThreadLocal 的数据（非 api 方式），需要用到反射，想要访问的 Filed 需要**放开访问权限**，否则会报`Method threw 'java.lang.IllegalAccessException' exception.` 举个例子，想获取上面 demo 中的存储数据：

```java
try {
            // 获取Thread的字段"threadLocals"
            Field threadLocalsField = Thread.class.getDeclaredField("threadLocals");
            threadLocalsField.setAccessible(true);
            Object threadLocalMap = threadLocalsField.get(thread);

            // 获取ThreadLocalMap的"Entry"类
            Class<?> entryClass = threadLocalMap.getClass().getDeclaredClasses()[0];

            // 获取ThreadLocalMap的"table"字段
            Field tableField = threadLocalMap.getClass().getDeclaredField("table");
            tableField.setAccessible(true);
            Object[] table = (Object[]) tableField.get(threadLocalMap);

            // 遍历table寻找对应的ThreadLocal
            for (int i = 0; i < table.length; i++) {
                Object entry = table[i];
                if (entry != null) {
                    // 获取Entry的"threadLocal"和"value"字段
                    Field valueField = entryClass.getDeclaredField("value");
                    valueField.setAccessible(true);

                    Object entryThreadLocal = threadLocalField.get(entry);
                    System.out.println(valueField.get(entry));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
```
