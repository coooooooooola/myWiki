---
title: 开发碎片 - Nginx
shortTitle: 开发碎片 - Nginx
date: 2017-02-11
cover: /assets/images/cover4.jpg
catalog: true
tags:
  - server
---

### 0. nginx 日志分析

```

```

### 1. 负载均衡策略

```nginx
upstream test {
    server localhost:8080;
    server localhost:8081;
}

#按权重
upstream test {
    server localhost:8080 weight=9;
    server localhost:8081 weight=1;
}

# ip_hash
# 最初版本的用户session存在本地，按照上面配置会丢失登录态，临时采取这个方式，后采用分布式存储后解决
upstream test {
	  ip_hash;
    server localhost:8080 weight=9;
    server localhost:8081 weight=1;
}
```

### 2. https 配置

> 对接 devops 时需要支持 https，否则会跨域

```nginx
server {
    listen       443 ssl;
    server_name  xxx;
    client_max_body_size 5M;
    ssl_certificate /usr/local/nginx/ssl/project.crt;
    ssl_certificate_key /usr/local/nginx/ssl/project.key;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'DEFAULT';
    ssl_prefer_server_ciphers off;
}
```

生成证书：

- JDK-keytool：https://docs.oracle.com/en/java/javase/11/tools/keytool.html
- OpenSSL
- 阿里云（前提有域名）
- [windows 局域网](https://www.tangyuecan.com/2021/12/17/%E5%B1%80%E5%9F%9F%E7%BD%91%E5%86%85%E6%90%AD%E5%BB%BA%E6%B5%8F%E8%A7%88%E5%99%A8%E5%8F%AF%E4%BF%A1%E4%BB%BB%E7%9A%84ssl%E8%AF%81%E4%B9%A6/)：

### 3. 跨域

### 4. gzip 压缩数据

> 有个接口需要返回给前端大概 8-10M 的数据，但是加载资源的事件过长影响体验

```ngin
gzip  on; #开启压缩
gzip_min_length 1024800;
gzip_buffers 4 8k;
gzip_types application/json;  # 按需配置
gzip_comp_level 9;  #1-9 9最大
```

### 5. 根据 header 打到对应机器/机器组

> 线上调试/信创改造
>
> $http\_<header_name>

```
upstream backend1 {
        ip_hash;
        server 192.168.179.XXX:8080;
        server 192.168.179.XXX:8080;
    }

upstream backend2 {
    server 192.168.179.XXX:8080;
}

#根据header value路由到不通的upstream
map $http_wx $test {
    default http://backend;
    123456 http://kylin;
}

location /api {
    rewrite "^/api/(.*)$" /$1 break;   #对指定的路径进行转发到后台
    proxy_pass $test;
}
```

### 6. location 语法和执行优先级

```nginx
在nginx官方文档中定义的location语法结构为：
location [ = | ~ | ~* | ^~ ] uri  {...}
```

各个选项含义如下：

- = ： 用于标准 uri 前面，要求请求字符串与 uri 严格匹配
- ～ ： 用于表示 uri 包含正则表达式，并且区分大小写
- ～* ： 用于表示 uri 包含正则表达式，并且不区分大小写
  【注】如果 uri 包含正则表达上，就必须要使用～或者～*标识
- ^~ : 用于标准 uri(即 uri 不含有正则表达式)，要求 nginx 服务器找到 uri 和请求字符串匹配度最高的的 location 后，立即按照此 location 请求，而不再使用 location 的正则 uri 和请求字符串进行匹配
- 不加选项：即一般匹配。在不添加选项时，nginx 服务器会在 server 块的多个 location 块中搜索是否有标准 uri 和请求字符串匹配，如果有多个匹配则记录匹配度最高的一个，如果只有一个就记录这个。然后再搜索正则 uri，当地一个正则 uri 匹配成功，就结束搜索，并使用此正则 location，如果正则匹配全部失败，那么就用刚才记录的。

**执行流程/优先级** 1.执行=精确匹配到的 location 块 2.执行^~匹配到的 location 块 3.遍历无选项的 location 块，逐个进行匹配。挑选匹配度最高的一个先记录下来，如果没有则跳过 4.执行正则匹配，遇到匹配成功的就执行此 location 块的内容。如果都没有匹配到，则执行上一步中的记录

**无选项的一般匹配的 location 是没有顺序之分的，会按照匹配度匹配；正则匹配是有顺序的，第一个匹配到了就会停止**

### 7. 处理转发 uri 规则

> 前端的接口/api/xxx，转发到后端去掉去掉这个前缀；也可以用于根据不同应用做转发的场景

```nginx
location /api {
            rewrite "^/api/(.*)$" /$1 break;   #对指定的路径进行转发到后台
}
```

### 8. Root & alias

root 与 alias 主要区别在于请求路径 Uri 与目录路径是否一致，举个例子：

```
location ^~ /t/ {
    root    /www/root/html;
}
如果一个请求的URI是/t/a.html时，web服务器将会返回服务器上的/www/root/html/t/a.html的文件。

location ^~ /t/ {
    alias    /www/root/html/;
}
如果一个请求的URI是/t/a.html时，web服务器将会返回服务器上的/www/root/html/a.html的文件。注意这里是alias会把location后面配置的路径丢弃掉，把当前匹配到的目录指向到指定的目录。
```

### 9. Nginx 403 error

```nginx
user nobody | root | ...
```

user 指令设置了 nginx 权限，如果资源是需要 root 权限访问，但是 nginx 设置的 nobody，会出现 403

### 10. nginx 日志分析

```nginx
log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
access_log  logs/access.log  main;


# 某一接口耗时
cat access_log.2018052820 | awk '{if($7=="\/papi\/music\/detail") print $0}' | awk -F request_time= '{total+=$2}END{avg=total/NR;print avg}'


# 统计一段时间内，访问次数最多的10个接口以及他们的平均耗时
# 先格式化需要的信息，然后再放到数组中计数即可
pdo2 -y -q -r 3 -a iknow-baby-na "cat  log/access_log.2018053002"| awk '{if($9==200){print $7,$NF}}' | awk -F '[ =]' '{times[$1]++;interface[$1]+=$3}END{for(i in interface){print times[i],i,interface[i]/times[i]}}'| sort -n -r|uniq | head -n 10


# 统计某一个接口的pv
# grep的方法效率比较低
pdo2 -y -q -r  3 -a iknow-baby-na "cat log/access_log.2018053002"| awk '{if($7=="\/papi\/duma\/dumalive"){times++}}END{print times}'

or

pdo2 -y -q -r  3 -a iknow-baby-na "cat log/access_log.2018053002"| grep  "\/papi\/duma\/dumalive" | wc -l
```
