---
title: Java栈 - 动态代理
date: 2022-01-23
cover: /ssets/images/cover3.jpg
shortTitle: Java栈 - 动态代理
useHeaderImage: false
headerMask: rgba(40, 57, 101, .4)
catalog: true
tags:
  - Java
  - server
  - 质量架构
---

## 1. 代理的作用

在不侵入原有代码的前提下实现代码增强，**比如说在目标对象的某个方法执行前后可以增加一些自定义的操作。**

## 2. 静态代理

静态代理中，我们对目标对象的每个方法的增强都是手动完成的，这种代理方式需要代理对象和目标对象实现一样的接口。

从 JVM 层面来说， 静态代理在编译时就将接口、实现类、代理类这些都变成了一个个实际的 class 文件。

优点：可以在不修改目标对象的前提下扩展目标对象的功能。

缺点：

1. 冗余。由于代理对象要实现与目标对象一致的接口，会产生过多的代理类。
2. 不易维护。一旦接口增加方法，目标对象与代理对象都要进行修改。

### 2.1 静态代理 Demo

现在有二个接口 payService、refundService，分别有 pay 方法和 refund 方法，对应地每个接口有一个实现类 payServiceImpl refundServiceImpl，现在创建一个代理类 Proxy 使得客户端调用这个代理类就可以完成对实现类的调用，并且实现方法增强。

```java
public interface PayService {
    public void pay();
}
public class PayServiceImpl implements PayService {
    @Override
    public void pay() {
        System.out.println("This is payServiceImpl");
    }
}
```

```java
public interface RefundService {
    void refund();
}
public class RefundServiceImpl implements RefundService {
    @Override
    public void refund() {
        System.out.println("This is refundServiceImpl");
    }
}
```

```java
public class StaticProxyFactory implements PayService,RefundService {
    public PayService payService;
    public RefundService refundService;
    StaticProxyFactory(PayService payService){
        this.payService = payService;
    }
    StaticProxyFactory(RefundService refundService){
        this.refundService = refundService;
    }
    @Override
    public void pay() {
        dosomeThingBefore();
        payService.pay();
        dosomeThingAfter();
    }
    @Override
    public void refund() {
        dosomeThingBefore();
        refundService.refund();
        dosomeThingAfter();
    }
    private void dosomeThingAfter() {
        System.out.println("after");
    }
    private void dosomeThingBefore() {
        System.out.println("before");
    }
}
```

客户端调用：

```java
public class StaticProxyDemo {
    public static void main(String[] args) {
        StaticProxyFactory factoryA = new StaticProxyFactory(new PayServiceImpl());
        factoryA.pay();
        StaticProxyFactory factoryB = new StaticProxyFactory(new RefundServiceImpl());
        factoryB.refund();
    }
}
```

输出结果：

```java
public class StaticProxyDemo {
    public static void main(String[] args) {
        StaticProxyFactory factoryA = new StaticProxyFactory(new PayServiceImpl());
        factoryA.pay();
        StaticProxyFactory factoryB = new StaticProxyFactory(new RefundServiceImpl());
        factoryB.refund();
    }
}
```

可以看到，静态代理 StaticProxyFactory 增强了原有方法的功能，但是静态代理有个问题：代理类需要分别实现每一个接口的方法，如果接口方法增加了那么目标类和代理类都要进行修改。我们只希望通过代理，让每个方法在调用前后分别打印两行日志，现在需要编写每个方法的实现，比较冗余。

## 3. JDK 动态代理

动态地在内存中构建代理对象，从而实现对目标对象的代理功能。动态代理是在运行时动态生成的，即编译完成后没有实际的 class 文件，而是在运行时动态生成类字节码，并加载到 JVM 中。动态代理对象不需要实现接口，但是要求目标对象必须实现接口，否则不能使用动态代理。

### 3.1 JDK 动态代理 DEMO

还是刚才的 payService、refundService 接口以及实现类，现在使用动态代理实现方法增强。

首先是动态代理类，实现了 InvocationHandler 的类

```java
public class ProxyFactory implements InvocationHandler {
    private Object factory;
    ProxyFactory(Object factory){
        this.factory = factory;
    }
    public Object getProxyInstance(){
        return
           Proxy.newProxyInstance(factory.getClass().getClassLoader(),factory.getClass().getInterfaces(),this);
    }
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        dosomeThingBefore();
        Object ret = method.invoke(factory,args);
        dosomeThingAfter();
        return ret;
    }
    private void dosomeThingAfter() {
        System.out.println("after");
    }
    private void dosomeThingBefore() {
        System.out.println("before");
    }
}
```

客户端调用：

```java
public class JDKDynamicProxyDemo {
    public static void main(String[] args) {
        System.getProperties().put("sun.misc.ProxyGenerator.saveGeneratedFiles","true");
        PayService p =  new PayServiceImpl();
        ProxyFactory factoryA = new ProxyFactory(p);
        PayService payInstance = (PayService) factoryA.getProxyInstance();
        payInstance.pay();
        RefundService r = new RefundServiceImpl();
        ProxyFactory factoryB = new ProxyFactory(r);
        RefundService refundInstance = (RefundService) factoryB.getProxyInstance();
        refundInstance.refund();
    }
}

```

### **3.2 运行过程&原理分析**

#### **3.2.1 运行过程**

使用 jdk 动态代理的关键是利用 Proxy 类的静态方法 newProxyInstance 新生成一个动态代理类，并且新建一个代理类对象。通过 debug 可以看出来，payInstance 实例是一个 $Proxy0 类型的实例，他有一个 ProxyFactory 类型的属性。具体 $Proxy0 是怎么通过 newProxyInstance 方法生成出来的以及新生成的类长什么样子后面看，总之 payInstance 并不是一个 PayService 类型对象，payInstance.pay()也不是直接调用的实现类的 pay 方法，而是调用的$Proxy0 的 pay 方法。

#### 3.2.2

```java
public static Object newProxyInstance(ClassLoader loader,
                                          Class<?>[] interfaces,
                                          InvocationHandler h)
        throws IllegalArgumentException
    {
        final Class<?>[] intfs = interfaces.clone();
        /*
         * Look up or generate the designated proxy class.
         */
        Class<?> cl = getProxyClass0(loader, intfs);

        /*
         * Invoke its constructor with the designated invocation handler.
         */
        final Constructor<?> cons = cl.getConstructor(constructorParams);
        final InvocationHandler ih = h;
        return cons.newInstance(new Object[]{h});
              ...
    }

```

Proxy 类的 newProxyInstance 方法需要三个参数：类加载器、需要实现的方法 List、InvocationHandler（所有动态代理类的方法调用，都会交由 InvocationHandler 接口实现类里的 invoke()方法去处理。这是动态代理的关键所在）。

- getProxyClass0

getProxyClass0()会生成设计好的代理类，初次生成会调用 Proxy 类的 apply 方法，后面直接调用缓存返回。

```java
public Class<?> apply(ClassLoader loader, Class<?>[] interfaces) {
                      Map<Class<?>, Boolean> interfaceSet = new IdentityHashMap<>(interfaces.length);
            for (Class<?> intf : interfaces) {
                Class<?> interfaceClass = null;
                interfaceClass = Class.forName(intf.getName(), false, loader);
                interfaceSet.put(interfaceClass, Boolean.TRUE)
            }
            String proxyPkg = null;     // package to define proxy class in
            int accessFlags = Modifier.PUBLIC | Modifier.FINAL;
            if (proxyPkg == null) {
                // if no non-public proxy interfaces, use com.sun.proxy package
                proxyPkg = ReflectUtil.PROXY_PACKAGE + ".";
            }
            /*
             * Choose a name for the proxy class to generate.
             */
            long num = nextUniqueNumber.getAndIncrement();
            String proxyName = proxyPkg + proxyClassNamePrefix + num;
            /*
             * Generate the specified proxy class.
             */
            byte[] proxyClassFile = ProxyGenerator.generateProxyClass(
                proxyName, interfaces, accessFlags);
            return defineClass0(loader, proxyName,proxyClassFile, 0, proxyClassFile.length);

        }
```

generateProxyClass 方法负责生成代理类的字节码，主要靠 generateClassFile 实现；native 方法 defineClass0 负责字节码加载的实现，并返回对应的 Class 对象。

```java
private byte[] generateClassFile() {
       this.addProxyMethod(hashCodeMethod, Object.class);
       this.addProxyMethod(equalsMethod, Object.class);
       this.addProxyMethod(toStringMethod, Object.class);
       Class[] var1 = this.interfaces;
       int var2 = var1.length;
       int var3;
       Class var4;
       for(var3 = 0; var3 < var2; ++var3) {
           var4 = var1[var3];
           Method[] var5 = var4.getMethods();
           int var6 = var5.length;
           for(int var7 = 0; var7 < var6; ++var7) {
               Method var8 = var5[var7];
               this.addProxyMethod(var8, var4);
           }
       }
       Iterator var11 = this.proxyMethods.values().iterator();
       List var12;
       while(var11.hasNext()) {
           var12 = (List)var11.next();
           checkReturnTypes(var12);
       }
       Iterator var15;
       try {
           this.methods.add(this.generateConstructor());
           var11 = this.proxyMethods.values().iterator();
           while(var11.hasNext()) {
               var12 = (List)var11.next();
               var15 = var12.iterator();
               while(var15.hasNext()) {
                   ProxyGenerator.ProxyMethod var16 = (ProxyGenerator.ProxyMethod)var15.next();
                   this.fields.add(new ProxyGenerator.FieldInfo(var16.methodFieldName, "Ljava/lang/reflect/Method;", 10));
                   this.methods.add(var16.generateMethod());
               }
           }
           this.methods.add(this.generateStaticInitializer());
       }
}
```

- cons.newInstance(new Object[]{h})

完成了类的生成和加载，就可以利用反射生成对应的代理对象了

生成的$Proxy0 类如下，可以看到 pay 方法实际执行的是我们定义的动态代理类中的 invoke 方法，m3 是一个 Method 实例，里面指定了具体执行哪个实现类的方法

```java
//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//
package com.sun.proxy;
import cn.wangyuedong.Proxy.PayService;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.lang.reflect.UndeclaredThrowableException;
public final class $Proxy0 extends Proxy implements PayService {
    private static Method m1;
    private static Method m3;
    private static Method m2;
    private static Method m0;
    public $Proxy0(InvocationHandler var1) throws  {
        super(var1);
    }
    public final boolean equals(Object var1) throws  {
        try {
            return (Boolean)super.h.invoke(this, m1, new Object[]{var1});
        } catch (RuntimeException | Error var3) {
            throw var3;
        } catch (Throwable var4) {
            throw new UndeclaredThrowableException(var4);
        }
    }
    public final void pay() throws  {
        try {
            super.h.invoke(this, m3, (Object[])null);
        } catch (RuntimeException | Error var2) {
            throw var2;
        } catch (Throwable var3) {
            throw new UndeclaredThrowableException(var3);
        }
    }
    public final String toString() throws  {
        try {
            return (String)super.h.invoke(this, m2, (Object[])null);
        } catch (RuntimeException | Error var2) {
            throw var2;
        } catch (Throwable var3) {
            throw new UndeclaredThrowableException(var3);
        }
    }
    public final int hashCode() throws  {
        try {
            return (Integer)super.h.invoke(this, m0, (Object[])null);
        } catch (RuntimeException | Error var2) {
            throw var2;
        } catch (Throwable var3) {
            throw new UndeclaredThrowableException(var3);
        }
    }
    static {
        try {
            m1 = Class.forName("java.lang.Object").getMethod("equals", Class.forName("java.lang.Object"));
            m3 = Class.forName("cn.wangyuedong.Proxy.PayService").getMethod("pay");
            m2 = Class.forName("java.lang.Object").getMethod("toString");
            m0 = Class.forName("java.lang.Object").getMethod("hashCode");
        } catch (NoSuchMethodException var2) {
            throw new NoSuchMethodError(var2.getMessage());
        } catch (ClassNotFoundException var3) {
            throw new NoClassDefFoundError(var3.getMessage());
        }
    }
}
```

可以看出 pay()方法其实就是执行 this.h.invoke(this, m3, null)，那么 h 是什么，通过生成的 class 文件没有发现 h 属性，但是在父类 Proxy 中发现有 InvocationHandler 类型的 h 属性，也就是说这里调用的是 InvocationHandler 接口实现类的 invoke 方法，这里也就是动态代理类 ProxyFactory。

### **3.3 JDK 动态代理的局限**

生成的代理类默认继承 Proxy 类（为了获取 invocationHandler），而 java 又是单继承，这就导致只能代理实现了接口的类。因此 jdk 动态代理要求委托类必须实现一个接口，但事实上并不是所有类都有接口，对于没有实现接口的类，便无法使用该方方式实现动态代理。

对于为什么必须要继承 Proxy 类，还没有太搞明白，先引用知乎的回答 ❓

```java
JDK的动态代理只允许动态代理接口是设计使然，因为动态代理一个类存在一些问题。在代理模式中代理类只做一些额外的拦截处理，实际处理是转发到原始类做的。这里存在两个对象，代理对象跟原始对象。如果允许动态代理一个类，那么代理对象也会继承类的字段，而这些字段是实际上是没有使用的，对内存空间是一个浪费。因为代理对象只做转发处理，对象的字段存取都是在原始对象上处理。更为致命的是如果代理的类中有final的方法，动态生成的类是没法覆盖这个方法的，没法代理，而且存取的字段是代理对象上的字段，这显然不是我们希望的结果。
作者：gavin
链接：https://www.zhihu.com/question/62201338/answer/196557396
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

### 4. cglib 动态代理

> CGLIB 是一个强大的高性能的代码生成包。它广泛的被许多 AOP 的框架使用，例如 Spring AOP 和 dynaop，为他们提供方法的 interception（拦截）。最流行的 OR Mapping 工具 hibernate 也使用 CGLIB 来代理单端 single-ended(多对一和一对一)关联（对集合的延迟抓取，是采用其他机制实现的）。EasyMock 和 jMock 是通过使用模仿（mock）对象来测试 java 代码的包。它们都通过使用 CGLIB 来为那些没有接口的类创建模仿（mock）对象。

### 4.1 DEMO

```java
//被代理类
public class CglibClass {
    public void say(){
        System.out.println("say function from cglibClass");
    }
    public final String eat(){
        System.out.println("eat function from cglibClass");
        return "true";
    }
}
//代理类
public class CglibProxy implements MethodInterceptor {
    public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
        System.out.println("call cglib before");
        Object result = methodProxy.invokeSuper(o, objects);
        System.out.println("call cglib after");
        return result;
    }
}
//client
public class CglibProxyDemo  {
    public static void main(String[] args) {
        System.setProperty(DebuggingClassWriter.DEBUG_LOCATION_PROPERTY, "./code");
        Enhancer enhancer = new Enhancer();
        //设置目标类，即被代理的类
        enhancer.setSuperclass(CglibClass.class);
        //设置拦截对象，代理类
          enhancer.setCallback(new CglibProxy());
           CglibClass p = (CglibClass) enhancer.create();
        p.say();
        p.eat();
    }
}
```

输出结果可以看到拦截了 say 方法，但是没有拦截 final 方法 eat

```java
call cglib before
say function from cglibClass
call cglib after
eat function from cglibClass
```

### 4.2 **动态代理类的生成过程**

> 本小结主要记录 CglibClass p = (CglibClass) enhancer.create()生成动态代理类的过程

```java
public Object create() {
        this.classOnly = false;
        this.argumentTypes = null;
        return this.createHelper();
}


private Object createHelper() {
    // 对预声明的回调方法进行验证，要求 [多个回调就必须存在 CallbackFilter 作为调度器]
    this.preValidate();
    // 构建一个对这类增强操作唯一定位的 key
    Object key = KEY_FACTORY.newInstance(this.superclass != null ? this.superclass.getName() : null, ReflectUtils.getNames(this.interfaces), this.filter == ALL_ZERO ? null : new WeakCacheKey(this.filter), this.callbackTypes, this.useFactory, this.interceptDuringConstruction, this.serialVersionUID);
    this.currentKey = key;
    // 👇调用父类AbstractClassGenerator的 create(...) 方法
    Object result = super.create(key);
    return result;
}
```

👇AbstractClassGenerator.create()

```java
protected Object create(Object key) {
    try {
        // 获取ClassLoader
        ClassLoader loader = this.getClassLoader();
        Map<ClassLoader, AbstractClassGenerator.ClassLoaderData> cache = CACHE;
        AbstractClassGenerator.ClassLoaderData data = (AbstractClassGenerator.ClassLoaderData)cache.get(loader);
        //如果缓存中有ClassLoaderData就跳过，如果没有就生成一个
        if (data == null) {
            Class var5 = AbstractClassGenerator.class;
            synchronized(AbstractClassGenerator.class) {
                cache = CACHE;
                data = (AbstractClassGenerator.ClassLoaderData)cache.get(loader);
                if (data == null) {
                    Map<ClassLoader, AbstractClassGenerator.ClassLoaderData> newCache = new WeakHashMap(cache);
                    // 初始化ClassLoaderData ，真正的构造操作，会执行gen.generate(ClassLoaderData.this);
                    data = new AbstractClassGenerator.ClassLoaderData(loader);
                    newCache.put(loader, data);
                    CACHE = newCache;
                }
            }
        }
        this.key = key;
        //👇获取Class对象或者缓存对象
        Object obj = data.get(this, this.getUseCache());
        // 如果是初次实例化操作，执行firstInstance方法，利用反射来进行实例化
        // 非初次实例化，则是从 ClassLoaderData 中得到的之前维护的内容
        return obj instanceof Class ? this.firstInstance((Class)obj) : this.nextInstance(obj);
    } catch (RuntimeException var9) {
        throw var9;
    } catch (Error var10) {
        throw var10;
    } catch (Exception var11) {
        throw new CodeGenerationException(var11);
    }
}
```

👇data.get(this, this.getUseCache());

```java
public Object get(AbstractClassGenerator gen, boolean useCache) {
    //如果不使用缓存，则重新获取，具体执行和上面初始化ClassLoaderData的操作一样，执行gen.generate(ClassLoaderData.this);
    //可以在client中设置enhancer.setUseCache()
    if (!useCache) {
        //👇重要方法，真正加载新生成类的入口
        return gen.generate(this);
    } else {
        Object cachedValue = this.generatedClasses.get(gen);
        return gen.unwrapCachedValue(cachedValue);
    }
}
```

👇gen.generate(ClassLoaderData data)：最终调用父类 AbstractClassGenerator 中的 generate 方法

```java
protected Class generate(AbstractClassGenerator.ClassLoaderData data) {
    Object save = CURRENT.get();
    CURRENT.set(this);
    Class var8;
    try {
        ClassLoader classLoader = data.getClassLoader();
        if (classLoader == null) {
            throw new IllegalStateException("ClassLoader is null while trying to define class " + this.getClassName() + ". It seems that the loader has been expired from a weak reference somehow. Please file an issue at cglib's issue tracker.");
        }
        String className;
        synchronized(classLoader) {
            className = this.generateClassName(data.getUniqueNamePredicate());
            data.reserveName(className);
            this.setClassName(className);
        }
        Class gen;
        if (this.attemptLoad) {
            try {
                gen = classLoader.loadClass(this.getClassName());
                Class var25 = gen;
                return var25;
            } catch (ClassNotFoundException var20) {
            }
        }
                // 👇策略下的生成类构建方法，返回字节码
        byte[] b = this.strategy.generate(this);
        // 🌿通过解析字节码的形式获取生成类的className
        className = ClassNameReader.getClassName(new ClassReader(b));
        ProtectionDomain protectionDomain = this.getProtectionDomain();
        synchronized(classLoader) {
            if (protectionDomain == null) {
                  //🌿通过反射进行类加载，生成Class对象
                gen = ReflectUtils.defineClass(className, b, classLoader);
            } else {
                gen = ReflectUtils.defineClass(className, b, classLoader, protectionDomain);
            }
        }
        var8 = gen;
    } catch (RuntimeException var21) {
        throw var21;
    } catch (Error var22) {
        throw var22;
    } catch (Exception var23) {
        throw new CodeGenerationException(var23);
    } finally {
        CURRENT.set(save);
    }
    return var8;
}
```

👇DefaultGeneratorStrategy.generate(this);

```java
public byte[] generate(ClassGenerator cg) throws Exception {
    DebuggingClassWriter cw = this.getClassVisitor();
    //通过操作asm库生成字节码(visitXXX方法)
    this.transform(cg).generateClass(cw);
    return this.transform(cw.toByteArray());
}
```

至此，动态代理类的字节码生成以及类加载过程就结束了，不同于 JDK 动态代理直接写入的方式生成字节码，cglib 通过操作 asm 库的方式生成字节码。

### 4.3 **动态代理类调用方法的过程**

> 本小节主要记录调用 say()方法的过程 打印产物有三个：
>
> - CglibClass$$EnhancerByCGLIB$$5467a0d：生成的动态代理类
> - CglibClass$$FastClassByCGLIB$$410431be：为被代理类生成一个 class，用于快速索引方法
> - CglibClass$$EnhancerByCGLIB$$5467a0d$$FastClassByCGLIB$$50bce66d：为代理类生成一个 fastclass，用于快速索引方法

先看第一个，也就是生成的动态代理类 CglibClass$$EnhancerByCGLIB$$5467a0d👇。可以看出生成的动态代理类是 cglibClass 的子类是继承关系，这和 jdk 代理有本质区别，所以 cglib 代理可以没有接口。同时，这里没有 final 方法 eat，因为 final 方法不能被覆盖。hashcode、toString、clone 以及 equals 方法省略

```java
//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//
import java.lang.reflect.Method;
import org.springframework.cglib.core.ReflectUtils;
import org.springframework.cglib.core.Signature;
import org.springframework.cglib.proxy.Callback;
import org.springframework.cglib.proxy.Factory;
import org.springframework.cglib.proxy.MethodInterceptor;
import org.springframework.cglib.proxy.MethodProxy;
public class CglibClass$$EnhancerByCGLIB$$5467a0d extends CglibClass implements Factory {
    private boolean CGLIB$BOUND;
    public static Object CGLIB$FACTORY_DATA;
    private static final ThreadLocal CGLIB$THREAD_CALLBACKS;
    private static final Callback[] CGLIB$STATIC_CALLBACKS;
    private MethodInterceptor CGLIB$CALLBACK_0;
    private static Object CGLIB$CALLBACK_FILTER;
    private static final Method CGLIB$say$0$Method;
    private static final MethodProxy CGLIB$say$0$Proxy;
    private static final Object[] CGLIB$emptyArgs;
    private static final Method CGLIB$equals$1$Method;
    private static final MethodProxy CGLIB$equals$1$Proxy;
    private static final Method CGLIB$toString$2$Method;
    private static final MethodProxy CGLIB$toString$2$Proxy;
    private static final Method CGLIB$hashCode$3$Method;
    private static final MethodProxy CGLIB$hashCode$3$Proxy;
    private static final Method CGLIB$clone$4$Method;
    private static final MethodProxy CGLIB$clone$4$Proxy;
    static void CGLIB$STATICHOOK1() {
        CGLIB$THREAD_CALLBACKS = new ThreadLocal();
        CGLIB$emptyArgs = new Object[0];
        Class var0 = Class.forName("cn.wangyuedong.Proxy.CglibClass$$EnhancerByCGLIB$$5467a0d");
        Class var1;
        Method[] var10000 = ReflectUtils.findMethods(new String[]{"equals", "(Ljava/lang/Object;)Z", "toString", "()Ljava/lang/String;", "hashCode", "()I", "clone", "()Ljava/lang/Object;"}, (var1 = Class.forName("java.lang.Object")).getDeclaredMethods());
        CGLIB$equals$1$Method = var10000[0];
        CGLIB$equals$1$Proxy = MethodProxy.create(var1, var0, "(Ljava/lang/Object;)Z", "equals", "CGLIB$equals$1");
        CGLIB$toString$2$Method = var10000[1];
        CGLIB$toString$2$Proxy = MethodProxy.create(var1, var0, "()Ljava/lang/String;", "toString", "CGLIB$toString$2");
        CGLIB$hashCode$3$Method = var10000[2];
        CGLIB$hashCode$3$Proxy = MethodProxy.create(var1, var0, "()I", "hashCode", "CGLIB$hashCode$3");
        CGLIB$clone$4$Method = var10000[3];
        CGLIB$clone$4$Proxy = MethodProxy.create(var1, var0, "()Ljava/lang/Object;", "clone", "CGLIB$clone$4");
        CGLIB$say$0$Method = ReflectUtils.findMethods(new String[]{"say", "()V"}, (var1 = Class.forName("cn.wangyuedong.Proxy.CglibClass")).getDeclaredMethods())[0];
        CGLIB$say$0$Proxy = MethodProxy.create(var1, var0, "()V", "say", "CGLIB$say$0");
    }
    //🌿 覆盖了父类say方法，绑定MethodInterceptor callback的方法会额外实现一个和原方法一模一样的方法
    final void CGLIB$say$0() {
        super.say();
    }
    //🌿 覆盖了父类say方法，代理对象的方法调用将会转发到代理对象的intercept方法
    public final void say() {
        MethodInterceptor var10000 = this.CGLIB$CALLBACK_0;
        if (var10000 == null) {
            CGLIB$BIND_CALLBACKS(this);
            var10000 = this.CGLIB$CALLBACK_0;
        }
        if (var10000 != null) {
            var10000.intercept(this, CGLIB$say$0$Method, CGLIB$emptyArgs, CGLIB$say$0$Proxy);
        } else {
            super.say();
        }
    }
    public static MethodProxy CGLIB$findMethodProxy(Signature var0) {
        String var10000 = var0.toString();
        switch(var10000.hashCode()) {
        case -909388886:
            if (var10000.equals("say()V")) {
                return CGLIB$say$0$Proxy;
            }
            break;
        case -508378822:
            if (var10000.equals("clone()Ljava/lang/Object;")) {
                return CGLIB$clone$4$Proxy;
            }
            break;
        case 1826985398:
            if (var10000.equals("equals(Ljava/lang/Object;)Z")) {
                return CGLIB$equals$1$Proxy;
            }
            break;
        case 1913648695:
            if (var10000.equals("toString()Ljava/lang/String;")) {
                return CGLIB$toString$2$Proxy;
            }
            break;
        case 1984935277:
            if (var10000.equals("hashCode()I")) {
                return CGLIB$hashCode$3$Proxy;
            }
        }
        return null;
    }
    public CglibClass$$EnhancerByCGLIB$$5467a0d() {
        CGLIB$BIND_CALLBACKS(this);
    }
    public static void CGLIB$SET_THREAD_CALLBACKS(Callback[] var0) {
        CGLIB$THREAD_CALLBACKS.set(var0);
    }
    public static void CGLIB$SET_STATIC_CALLBACKS(Callback[] var0) {
        CGLIB$STATIC_CALLBACKS = var0;
    }
    private static final void CGLIB$BIND_CALLBACKS(Object var0) {
        CglibClass$$EnhancerByCGLIB$$5467a0d var1 = (CglibClass$$EnhancerByCGLIB$$5467a0d)var0;
        if (!var1.CGLIB$BOUND) {
            var1.CGLIB$BOUND = true;
            Object var10000 = CGLIB$THREAD_CALLBACKS.get();
            if (var10000 == null) {
                var10000 = CGLIB$STATIC_CALLBACKS;
                if (var10000 == null) {
                    return;
                }
            }
            var1.CGLIB$CALLBACK_0 = (MethodInterceptor)((Callback[])var10000)[0];
        }
    }
    public Object newInstance(Callback[] var1) {
        CGLIB$SET_THREAD_CALLBACKS(var1);
        CglibClass$$EnhancerByCGLIB$$5467a0d var10000 = new CglibClass$$EnhancerByCGLIB$$5467a0d();
        CGLIB$SET_THREAD_CALLBACKS((Callback[])null);
        return var10000;
    }
    public Object newInstance(Callback var1) {
        CGLIB$SET_THREAD_CALLBACKS(new Callback[]{var1});
        CglibClass$$EnhancerByCGLIB$$5467a0d var10000 = new CglibClass$$EnhancerByCGLIB$$5467a0d();
        CGLIB$SET_THREAD_CALLBACKS((Callback[])null);
        return var10000;
    }
    public Object newInstance(Class[] var1, Object[] var2, Callback[] var3) {
        CGLIB$SET_THREAD_CALLBACKS(var3);
        CglibClass$$EnhancerByCGLIB$$5467a0d var10000 = new CglibClass$$EnhancerByCGLIB$$5467a0d;
        switch(var1.length) {
        case 0:
            var10000.<init>();
            CGLIB$SET_THREAD_CALLBACKS((Callback[])null);
            return var10000;
        default:
            throw new IllegalArgumentException("Constructor not found");
        }
    }
    public Callback getCallback(int var1) {
        CGLIB$BIND_CALLBACKS(this);
        MethodInterceptor var10000;
        switch(var1) {
        case 0:
            var10000 = this.CGLIB$CALLBACK_0;
            break;
        default:
            var10000 = null;
        }
        return var10000;
    }
    public void setCallback(int var1, Callback var2) {
        switch(var1) {
        case 0:
            this.CGLIB$CALLBACK_0 = (MethodInterceptor)var2;
        default:
        }
    }
    public Callback[] getCallbacks() {
        CGLIB$BIND_CALLBACKS(this);
        return new Callback[]{this.CGLIB$CALLBACK_0};
    }
    public void setCallbacks(Callback[] var1) {
        this.CGLIB$CALLBACK_0 = (MethodInterceptor)var1[0];
    }
    static {
        CGLIB$STATICHOOK1();
    }
}
```

👇 单独把 say 方法拿出来，可以看到最终会调用 MethodInterceptor 类中的 intercept 方法，同时把自己的 Method 对象、参数列表等传进去。也就是 CglibProxy 中定义的 intercept 方法，实现了方法增强。

```java
public final void say() {
        MethodInterceptor var10000 = this.CGLIB$CALLBACK_0;
        if (var10000 == null) {
            CGLIB$BIND_CALLBACKS(this);
            var10000 = this.CGLIB$CALLBACK_0;
        }
        if (var10000 != null) {
            var10000.intercept(this, CGLIB$say$0$Method, CGLIB$emptyArgs, CGLIB$say$0$Proxy);
        } else {
            super.say();
        }
    }
```

## 5. **jdk 动态代理 vs cglib 动态代理**

从动态生成的代理类就可以看出两者的差别，jdk 是 implements 代理类，cglib 是 extends 代理类。

| 类型  | 机制                                                                                                                          | 回调方式                    | 适用场景                             | 效率                                                                                                                              |
| ----- | :---------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| JDK   | 委托机制，代理类和目标类都实现了同样的接口，InvocationHandler 持有目标类，代理类委托 InvocationHandler 去调用目标类的原始方法 | 反射                        | 目标类是接口类                       | 效率瓶颈在反射调用稍慢                                                                                                            |
| CGLIB | 继承机制，代理类继承了目标类并重写了目标方法，通过回调函数 MethodInterceptor 调用父类方法执行原始逻辑                         | 通过 FastClass 方法索引调用 | 非接口类，非 final 类，非 final 方法 | 第一次调用因为要生成多个 Class 对象较 JDK 方式慢，多次调用因为有方法索引较反射方式快，如果方法过多 switch case 过多其效率还需测试 |

![1281725263724_.pic](https://swtywang.fun/minio//blog/0acffb42123846bd493b246500b8f523.jpg)

## **6. 动态代理的使用场景**

### **6.1 AOP**

### 6.2 流量录制回放平台/MOCK

### 6.3 Mybatis-mapper

。。。（许多框架层的基础）

> 参考资料：https://tech.meituan.com/2019/09/05/java-bytecode-enhancement.html https://dy.163.com/article/EL1FIVPF05376OPS.html
