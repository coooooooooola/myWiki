---
title: Java栈 - SPI
date: 2020-08-12
cover: https://swtywang.fun/minio/blog/a0f307f1e263d792ee09e70c1d81898f.jpg
shortTitle: Java栈 - SPI
useHeaderImage: false
headerMask: rgba(40, 57, 101, .4)
catalog: true
tags:
  - Java
  - 质量架构
---

# 1. 什么是 SPI

SPI 全称 Service Provider Interface，是 Java 提供的一套用来被第三方实现或者扩展的 API，它可以用来启用框架扩展和替换组件。

![SPI](https://swtywang.fun/minio/blog/a0f307f1e263d792ee09e70c1d81898f.jpg)

整体机制如上图，Java SPI 实际上是“**基于接口的编程＋策略模式＋配置文件**”组合实现的动态加载机制。

系统设计的各个抽象，往往有很多不同的实现方案，在面向的对象的设计里，一般推荐模块之间基于接口编程，模块之间不对实现类进行硬编码。一旦代码里涉及具体的实现类，就违反了可拔插的原则，如果需要替换一种实现，就需要修改代码。为了实现在模块装配的时候能不在程序里动态指明，这就需要一种服务发现机制。 Java SPI 就是提供这样的一个机制：为某个接口寻找服务实现的机制。有点类似 IOC 的思想，就是将装配的控制权移到程序之外，在模块化设计中这个机制尤其重要。所以 SPI 的核心思想就是**解耦**。

# 2. 如何使用

> SPI 的使用过程主要包含：服务接口约定、服务实现、服务注册、服务发现与使用四个步骤

## 2.1 接口约定

定义一个接口 UserService

```java
public interface UserService {
    public void sayHelloToUser(String name);
}
```

## 2.2 服务实现

针对接口 UserService 创建两个实现类 UserServiceImplA、UserServiceImplB

```java
public class UserServiceImplA implements UserService{
    public void sayHelloToUser(String name) {
        System.out.println("say UserServiceImplA");
    }
}

public class UserServiceImplB implements UserService{
    public void sayHelloToUser(String name) {
        System.out.println("say UserServiceImplB");
    }
}
```

## 2.3 服务注册

服务注册的作用是像系统提供接口与实现类的映射关系，以便服务使用方发现，java SPI 约定：当服务的提供者提供了一种接口的实现之后，需要在 classpath 下的 META-INF/services/目录里创建一个以服务接口命名的文件，这个文件里的内容就是这个接口的具体的实现类。

在/META-INF/services/目录下创建文件 UserService，内容为：

```java
UserServiceImplA
UserServiceImplB
```

## 2.4 服务发现与使用

```java
public class javaSpiDemo {
    public static void main(String[] args) {
        ServiceLoader<UserService> sl = ServiceLoader.load(UserService.class);
        Iterator<UserService> it = sl.iterator();
        while (it.hasNext()){
            it.next().sayHelloToUser("1111");
        }
    }
}
```

输出结果：

```
say UserServiceImplA
say UserServiceImplB
```

# 3. 源码分析

从 2.4 看到，SPI 的实现主要依赖了 ServiceLoader

```java
public final class ServiceLoader<S> implements Iterable<S> {
    private static final String PREFIX = "META-INF/services/";
    private Class<S> service;
    private ClassLoader loader;
    private LinkedHashMap<String, S> providers = new LinkedHashMap();
    private ServiceLoader<S>.LazyIterator lookupIterator;
}
```

service：META_INF/services/下定义的类

loader：ClassLoader 类型，类加载器

providers：LinkedHashMap 类型，用于缓存加载成功的类

lookupIterator：实现迭代器功能

ServiceLoader.load 方法返回一个 ServiceLoader 对象，其中包括了 LazyIterator 类型的迭代器。LazyIterator 是 ServiceLoader 的内部类，其定义如下：

```java
private class LazyIterator implements Iterator<S> {
    Class<S> service;
    ClassLoader loader;
    Enumeration<URL> configs;
    Iterator<String> pending;
    String nextName;
    private

    LazyIterator(Class<S> var2, ClassLoader var3)

    {
        this.configs = null;
        this.pending = null;
        this.nextName = null;
        this.service = var2;
        this.loader = var3;
    }

    private boolean hasNextService() {...}
    private S nextService()  {...}
    public boolean hasNext() {...}
    public S next() {...}
}
```

这里就可以看到 ServiceLoader 的实际加载过程就交给了 LazyIterator 来做，将 ServiceLoader 的 service 和 loader 成员分别赋值给了 LazyIterator 的 service 和 loader 成员。 configs 是服务的 URL 枚举； pending 是保存要加载的服务的名称集合； nextName 是下一个要加载的服务名称；

LazyIterator 的加载也主要是由 hasNextService 和 nextService 方法加载实现类

lookupIterator 的 hasNextService 方法，读取 META-INF/services/目录下的服务

```java
private boolean hasNextService() {
    if (nextName != null) {
        return true;
    }
    if (configs == null) {
        try {
            String fullName = PREFIX + service.getName();
            if (loader == null) configs = ClassLoader.getSystemResources(fullName);
            else configs = loader.getResources(fullName);
        } catch (IOException x) {
            fail(service, "Error locating configuration files", x);
        }
    }
    while ((pending == null) || !pending.hasNext()) {
        if (!configs.hasMoreElements()) {
            return false;
        }
        pending = parse(service, configs.nextElement());
    }
    nextName = pending.next();
    return true;
}
```

lookupIterator 的 next 方法，实现具体类的加载实例化

```java
private S nextService() {
    if (!hasNextService()) throw new NoSuchElementException();
    String cn = nextName;
    nextName = null;
    Class<?> c = null;
    try {
        c = Class.forName(cn, false, loader);
    } catch (ClassNotFoundException x) {
        fail(service, "Provider " + cn + " not found");
    }
    if (!service.isAssignableFrom(c)) {
        fail(service, "Provider " + cn + " not a subtype");
    }
    try {
        S p = service.cast(c.newInstance());
        providers.put(cn, p);
        return p;
    } catch (Throwable x) {
        fail(service, "Provider " + cn + " could not be instantiated", x);
    }
    throw new Error();          // This cannot happen
}
```

# 4. 应用

## 4.1 Mysql DriverManager 实现

DriverManager 是 jdbc 里管理和注册不同数据库 driver 的工具类。针对一个数据库，可能会存在着不同的数据库驱动实现。我们在使用特定的驱动实现时，不希望修改现有的代码，而希望通过一个简单的配置就可以达到效果。 在使用 mysql 驱动的时候，会有一个疑问，DriverManager 是怎么获得某确定驱动类的？我们在运用 Class.forName("com.mysql.jdbc.Driver")加载 mysql 驱动后，就会执行其中的静态代码把 driver 注册到 DriverManager 中，以便后续的使用。

```java
/**
 * Load the initial JDBC drivers by checking the System property
 ** jdbc.properties and then use the {@code ServiceLoader} mechanism
 */
static {
    loadInitialDrivers();
    println("JDBC DriverManager initialized");
}
```

可以看到其内部的静态代码块中有一个 loadInitialDrivers 方法，loadInitialDrivers 用法用到了上文提到的 spi 工具类 ServiceLoader:

```java
private static void loadInitialDrivers() {
  String drivers;
  try {
      drivers = AccessController.doPrivileged(new PrivilegedAction<String>() {
          public String run() {
              return System.getProperty("jdbc.drivers");
          }
      });
  } catch (Exception ex) {
      drivers = null;
  }
  AccessController.doPrivileged(new PrivilegedAction<Void>() {
      public Void run() {
          ServiceLoader<Driver> loadedDrivers = ServiceLoader.load(Driver.class);
          Iterator<Driver> driversIterator = loadedDrivers.iterator();
          try {
              while (driversIterator.hasNext()) {
                  driversIterator.next();
              }
          } catch (Throwable t) {
              // Do nothing
          }
          return null;
      }
  });
  println("DriverManager.initialize: jdbc.drivers = " + drivers);
  if (drivers == null || drivers.equals("")) {
      return;
  }
  String[] driversList = drivers.split(":");
  println("number of Drivers:" + driversList.length);
  for (String aDriver : driversList) {
      try {
          println("DriverManager.Initialize: loading " + aDriver);
          Class.forName(aDriver, true, ClassLoader.getSystemClassLoader());
      } catch (Exception ex) {
          println("DriverManager.Initialize: load failed: " + ex);
      }
  }
}
```

## 4.2 SpringBoot 启动

![1721138091748](https://swtywang.fun/minio/blog/6d79ba7ab59533ea1d535d2e5bb693c8.jpg)

![1721138098755](https://swtywang.fun/minio/blog/32725e7e88beaa3fb2e429217a30aa49.jpg)

## 4.3 流量录制回放平台

JVM-SANDBOX-REPEATER 和我们自研的平台均使用了 SPI 实现插件化加载![1721138302987](https://swtywang.fun/minio/blog/b0d66f22815d3dca2d2fa55c9c95c4ac.jpg)

![1721138307193](https://swtywang.fun/minio/blog/2032670287c5e468241453e700668539.jpg)
