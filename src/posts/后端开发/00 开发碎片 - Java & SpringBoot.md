---
title: 开发碎片 - Java & SpringBoot
shortTitle: 开发碎片 - Java & SpringBoot
date: 2019-12-02
cover: /assets/images/background.jpeg
category:
  - server
tags:
  - Java
  - server
---

> 记录一些开发过程中遇到的问题和解决思路

### 方法传值

Java 方法中实参传递方式是 **值传递**：

- 如果参数是基本类型和字符串，传递的就是基本类型的字面量值的拷贝，会创建副本。
- 如果参数是引用类型（JavaBean、数组），传递的就是实参所引用的对象在堆中地址值的拷贝，同样也会创建副本

```java
//测试代码
//分别选取JavaBean、JSONObject、int、Integer测试

public class test {

    public void init() {
        DataUnit dataUnit = new DataUnit();
        dataUnit.setValue("aaa");
        JSONObject obj = new JSONObject();
        obj.put("aa", "bb");
        int a = 1;
        int[] b = {1, 2};
        String s = "init";
        System.out.println("DataUnit type before:" + dataUnit.getValue());
        System.out.println("JSONObject type before:" + obj.getString("aa"));
        System.out.println("int type before:" + a);
        System.out.println("数组 before:" + b[1]);
        System.out.println("String type before:" + s);
        changeData(dataUnit, obj, a, b,s);
        System.out.println("dataUnit value after:" + dataUnit.getValue());
        System.out.println("obj after:" + obj.getString("aa"));
        System.out.println("a after:" + a);
        System.out.println("数组 type after:" + b[1]);
        System.out.println("String type after:" + s);
    }

    public void changeData(DataUnit dataUnit, JSONObject object, int i, int[] j, String s) {
        dataUnit.setValue("bbb");
        object.put("aa", "cc");
        i = 2;
        j[1] = 3333;
        s = "update";
    }

    public static void main(String[] args) {
        new test().init();
    }
}

```

```java
//测试结果：非基础类型的对象会改变值（JSONObject、JavaBean），基础类型和字符串不会
DataUnit type before:aaa
JSONObject type before:bb
int type before:1
数组 before:2
String type before:init
dataUnit value after:bbb
obj after:cc
a after:1
数组 type after:3333
String type after:init
```

---

### JSON

#### 序列化与反序列化

- 序列化：JavaBean -> JSON 字符串
- 反序列化：JSON 字符串 -> JavaBean

#### 序列化 SerializerFeature

```java
@Data
public class DataUnit {
    // 数据的类型
    private String type;
    // 数据的值
    private String value;
    // 名称
    private String paramName;
    // 描述
    private String description;
}
```

- 将 JavaBean 的控制字段输出，避免字段丢失：SerializerFeature.WriteMapNullValue

  ```java
  public void jsontest() {
      DataUnit dataUnit = new DataUnit();
      dataUnit.setValue("aaa");
      dataUnit.setDescription("");
      System.out.println(JSON.toJSONString(dataUnit, SerializerFeature.WriteMapNullValue, SerializerFeature.PrettyFormat));
  }

  //输出结果：
  {
  	"description":"",
  	"paramName":null,
  	"type":null,
  	"value":"aaa"
  }
  ```

- 将 JavaBean 的空值字段设置一个缺省值，避免字段丢失：SerializerFeature.WriteNullStringAsEmpty

  ```java


  public void jsontest() {
      DataUnit dataUnit = new DataUnit();
      dataUnit.setValue("aaa");
      dataUnit.setDescription("dddd");
      //{"description":"dddd","paramName":"","type":"","value":"aaa"}
      System.out.println(JSON.toJSONString(dataUnit, SerializerFeature.WriteNullStringAsEmpty));
      //{"description":"dddd","value":"aaa"}
      System.out.println(JSON.toJSONString(dataUnit));
  }
  ```

  类似的还有 WriteNullNumberAsZero、WriteNullBooleanAsFalse、WriteNullListAsEmpty，将对应类型的控制设为默认值。

---

### Stream 流式计算

https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html

---

### 接口跨域处理

Controller 层增加`@CrossOrigin`注解。

注意，加上注解后相当于已经添加了 header Access-Control-Allow-Origin: \*，Nginx 如果再添加会提示 duplicated error

---

### 多环境配置

```xml
<profiles>
         <profile>
             <!-- 本地开发环境 -->
             <id>dev</id>
             <properties>
                 <profiles.active>dev</profiles.active>
             </properties>
             <!--配置默认的配置文件，idea开发右侧的maven-install中，profiles默认选中dev-->
             <activation>
                 <activeByDefault>true</activeByDefault>
             </activation>
         </profile>
         <profile>
             <!-- 测试环境 -->
             <id>test</id>
             <properties>
                 <profiles.active>test</profiles.active>
             </properties>
         </profile>
         <profile>
             <!-- 生产环境 -->
             <id>prod</id>
             <properties>
                 <profiles.active>prod</profiles.active>
             </properties>
         </profile>
</profiles>
```

---

### 动态数据源切换

重写**`determineCurrentLookupKey`**方法

```java
 public class DynamicDataSource extends AbstractRoutingDataSource {

     private static final ThreadLocal<String> DATA_SOURCE_KEY = new ThreadLocal<>();

     static void changeDataSource(String dataSourceKey) {
         DATA_SOURCE_KEY.set(dataSourceKey);
     }

     static void clearDataSource() {
         DATA_SOURCE_KEY.remove();
     }

     //核心，重写该方法，获取当前线程的数据源标识
     @Override
     protected Object determineCurrentLookupKey() {
         return DynamicDataSourceContextHolder.getDataSourceType();
     }
 }
```

数据源的切换/获取逻辑实现：

```java
public class DynamicDataSourceContextHolder {

     //存放当前线程使用的数据源类型信息
     private static final ThreadLocal<String> contextHolder = new ThreadLocal<String>();

     //数据源id
     public static List<String> dataSourceIds = new ArrayList<String>();

     //设置数据源
     public static void setDataSourceType(String dataSource) {
         contextHolder.set(dataSource);
     }

     //获取数据源
     public static String getDataSourceType() {
         return contextHolder.get();
     }

     //清除数据源
     public static void clearDataSourceType() {
         contextHolder.remove();
     }

     //判断当前数据源是否存在
     public static boolean isContainsDataSource(String dataSourceId) {
         return dataSourceIds.contains(dataSourceId);
     }
 }
```

AOP 定义切换的时机：

```java
 @Aspect
 @Component
 public class DynamicDataSourceAspect {

     //改变数据源
     @Before("@annotation(targetDataSource)")
     public void changeDataSource(JoinPoint joinPoint, TargetDataSource targetDataSource) {
         DynamicDataSourceContextHolder.setDataSourceType(targetDataSource.name());

     }

     @After("@annotation(targetDataSource)")
     public void clearDataSource(JoinPoint joinPoint, TargetDataSource targetDataSource) {
         DynamicDataSourceContextHolder.clearDataSourceType();
     }

 }
```

---

### Date 插入数据库有时差

```json
@Data
public class DeviceExecuteDO {
    private long id;
    @JsonFormat(timezone="GMT+8", pattern = "yyyy-MM-dd")
    private Date dateRecord;
}
```

---

### websocket

> https://www.cnblogs.com/yiwangzhibujian/p/7107785.html

- 需要配置一个 SocketEncoder，否则数据传输乱码

  ```java
  public class SocketEncoder  implements Encoder.Text<JSONObject> {
      @Override
      public String encode(JSONObject baseResponseMessage) throws EncodeException {
          try {
              JsonMapper jsonMapper = new JsonMapper();
              return jsonMapper.writeValueAsString(baseResponseMessage);

          } catch (JsonProcessingException e) {
              e.printStackTrace();
          }
          return null;
      }

      @Override
      public void init(EndpointConfig endpointConfig) {

      }

      @Override
      public void destroy() {

      }
  }
  ```

---

### Maven 排包

> pom 中可能会有以来冲突问题，会造成 devops 流水线编译失败，需要解决冲突

- IDEA 插件：maven dependency helper
- mvn dependency:tree

---

### is 开头的变量

使用 IDEA 为 is 开头的变量生成 GET SET 方法会有问题，比如变量 isRecord，IDEA 生成的仍为 isRecord，需要手动改成 getIsRecord.
PS：尽量不用 is 开头

---

### @Transactional 没生效

我将@Transactional 用到了 private 方法上，导致没有生效，需要用到 public 上。
不生效的常见场景：

- 只能用在 public 方法，用在 private、protected 会失效
- 同类不能调用：因为这回绕过代理机制，解决方案是使用类似 ApplicationContext 获取 Bean 调用该方法

  ```java
  @Service
  public class test{
      public void method(){
          //这里调用不会生效
          usedMethod();
      }

      @Transactional
      public void usedMethod(){
          ...
      }
  }
  ```

- 非 Spring 管理的类

---

### java.lang.IllegalStateException: Ambiguous mapping. Cannot map 'xxxController' method

Controller 层的@PostMapping 有重复的

---

### JavaBean 判空/缺省值

---

### java 启动参数失效

> 现象： 输入 java -jar hippo.jar -Dfile.encoding=utf-8 启动程序，编码格式未生效。
>
> 原因：JVM 参数放在 jar 前面，即 java -Dfile.encoding=utf-8 -jar hippo.jar

https://www.cnblogs.com/haycheng/p/12781261.html
