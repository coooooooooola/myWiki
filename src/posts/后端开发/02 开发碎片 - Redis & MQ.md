---
title: 开发碎片 - Redis & MQ
shortTitle: 开发碎片 - Redis & MQ
date: 2018-06-12
cover: /assets/images/cover4.jpg
useHeaderImage: false
headerMask: rgba(40, 57, 101, .4)
catalog: true
tags:
  - Java
  - server
---

## Redis 数据结构

Redis 可以存储键与 5 种不同数据结构类型之间的映射，分别为 STRING(字符串)、 LIST(列表)、 SET(几核)、 HASH(散列)、 ZSET(有序集合)
命令大全：http://www.redis.net.cn/order/

### 字符串 String

- set : 设置指定 key 的值
- get : 获取指定 key 的值。
- mget : 获取所有(一个或多个)给定 key 的值。
- strlen : 返回 key 所储存的字符串值的长度。
- incr : 将 key 中储存的数字值增一。
- incrby: 将 key 所储存的值加上给定的增量值（increment） 。
- decr : 将 key 中储存的数字值减一。
- decrby: key 所储存的值减去给定的减量值（decrement） 。
- append: 如果 key 已经存在并且是一个字符串， APPEND 命令将 value 追加到 key 原来的值的末尾。

```
127.0.0.1:6379> set a bbbb
OK
127.0.0.1:6379> strlen a
(integer) 4
127.0.0.1:6379> incr a
(error) ERR value is not an integer or out of range
127.0.0.1:6379> set a 2
OK
127.0.0.1:6379> incr a
(integer) 3
127.0.0.1:6379> incrby a 3
(integer) 7
127.0.0.1:6379> append b dfadfa
(integer) 7
127.0.0.1:6379> get b
"cdfadfa"
```

### 列表 List

一个列表结构可以有序的存储多个字符串，元素可以重复

- LPUSH KEY_NAME VALUE1.. VALUEN : 将一个或多个值插入到列表头部
- RPUSH KEY_NAME VALUE1..VALUEN : 将一个或多个值插入到列表尾部
- LRANGE KEY_NAME START END ：获取列表指定范围内的元素
- LINDEX KEY_NAME INDEX_POSITION ：通过索引获取列表中的元素
- LLEN KEY_NAME ： 移出并获取列表的第一个元素
- LSET KEY_NAME INDEX NEW_VALUE ：通过索引来设置元素的值。当索引参数超出范围，或对一个空列表进行 LSET 时，返回一个错误。
- LINSERT KEY_NAME BEFORE EXISTING_VALUE NEW_VALUE : 在列表的元素前或者后插入元素
- LLen KEY_NAME : 获取列表长度
- LTRIM KEY_NAME START STOP : 让列表只保留指定区间内的元素，不在指定区间之内的元素都将被删除

```
127.0.0.1:6379> lrange list 0 -1
1) "1"
2) "2"
3) "3"
127.0.0.1:6379> LINSERT list before 2 4
(integer) 4
127.0.0.1:6379> lrange list 0 -1
1) "1"
2) "4"
3) "2"
4) "3"
```

### 集合 SET

Redis 的集合和列表都可以存储多个字符串，它们之间的不同在于，列表可以存储多个相同的字符串，集合通过散列保证自己存储的每个字符串都不相同，是无序的

- SADD KEY_NAME VALUE1..VALUEN : 将一个或多个成员元素加入到集合中，已经存在于集合的成员元素将被忽略。
- SMEMBERS KEY_NAME : 返回集合中的所有成员
- SCARD KEY_NAME : 返回集合中元素的数量。
- SINTER KEY KEY1..KEYN : 返回给定所有给定集合的交集。 不存在的集合 key 被视为空集。 当给定集合当中有一个空集时，结果也为空集(根据集合运算定律)。
- SMOVE SOURCE_SET DESTINATION_SET MEMBER : 将指定成员 member 元素从 source 集合移动到 destination 集合。
- SISMEMBER KEY VALUE : 判断 member 元素是否是集合 key 的成员

### 散列 hash

redis 的散列可以存储多个键值对之间的映射。

- HDEL KEY_NAME FIELD1.. FIELDN : 删除哈希表 key 中的一个或多个指定字段，不存在的字段将被忽略。
- HGET KEY_NAME FIELD_NAME : 返回哈希表中指定字段的值。
- HGETALL KEY_NAME : 返回哈希表中，所有的字段和值。
- HINCRBY KEY_NAME FIELD_NAME INCR_BY_NUMBER : 哈希表中的字段值加上指定增量值
- HKEYS KEY_NAME : 获取哈希表中的所有字段名。
- HVALS KEY_NAME : 返回哈希表所有字段的值.
- HSET KEY_NAME FIELD VALUE : 为哈希表中的字段赋值 。如果哈希表不存在，一个新的哈希表被创建并进行 HSET 操作。如果字段已经存在于哈希表中，旧值将被覆盖。
- HMSET KEY_NAME FIELD1 VALUE1 ...FIELDN VALUEN : 同时将多个 field-value (字段-值)对设置到哈希表中。
- HMGET KEY_NAME FIELD1...FIELDN : 返回哈希表中，一个或多个给定字段的值。

### 有序集合

- ZADD KEY_NAME SCORE1 VALUE1.. SCOREN VALUEN： 将一个或多个成员元素及其分数值加入到有序集当中。
- ZCARD KEY_NAME : 计算集合中元素的数量。
- ZCOUNT key min max : 计算有序集合中指定分数区间的成员数量。
- ZINCRBY key increment member : 对有序集合中指定成员的分数加上增量 increment
- ZRANGE key start stop [WITHSCORES] : 返回有序集中，指定区间内的成员。
- ZREVRANGE key start stop [WITHSCORES] : 返回有序集中，指定区间内的成员(从大到小)。
- ZRANK key member : 返回有序集中指定成员的排名。其中有序集成员按分数值递增(从小到大)顺序排列。
- ZSCORE key member ： 返回有序集中，成员的分数值。

## Redis 持久化

Redis 提供了两种不同的持久化方法来将数据存储到硬盘里面。

- RDB 持久化：将某一时刻的所有数据都写入到硬盘里（原理是将 Reids 在内存中的数据库记录定时 dump 到磁盘上的 RDB 持久化）
- 只追加文件(AOF)：在执行写命令时，将被执行的写命令复制到硬盘里（原理是将 Reids 的操作日志以追加的方式写入文件）

**两者区别**
RDB 持久化是指在指定的时间间隔内将内存中的数据集快照写入磁盘，实际操作过程是 fork 一个子进程，先将数据集写入临时文件，写入成功后，再替换之前的文件，用二进制压缩存储。
AOF 持久化以日志的形式记录服务器所处理的每一个写、删除操作，查询操作不会记录，以文本的方式记录，可以打开文件看到详细的操作记录。

可以既使用 RDB 持久化，也使用 AOF，也可以单独使用其中一个，当然也可以不使用持久化存储。

### RDB 持久化

- 创建快照的办法有以下几种：
  - 客户端通过像 Redis 发送一个 BGSAVE 命令来创建一个快照，此后 Redis 会调用 fork 来创建一个子进程，然后子进程负责将快照写入硬盘，而父进程则继续处理命令请求。
  - 客户端通过像 Redis 发送一个 SAVE 命令来创建一个快照，接到 SAVE 命令的 Redis 服务器在快照创建完毕之前将不再响应任何其他命令。
  - 如果用户设置里 save 配置选项，比如 save 60 1000，那么从 redis 最后一次创建快照之后算起，当“60 秒内有 1000 次写入”这个条件被满足，redis 就自动触发 BGSAVE 命令。
  - 当 Redis 通过 SHUTDOWN 命令接受到关闭服务器请求时，或者接受到标准 TERM 信号时，会执行一个 SAVE 命令，阻塞所有客户端，不在执行客户端发送的命令，并在 SAVE 命令执行完毕后关闭服务器。
  - 当一个 Redis 服务器连接另一个 Redis 服务器，并向对方发送 SYNC 命令开始一次复制操作的时候，如果主服务器没有在执行 BGSAVE，那么主服务器会执行 BGSAVE 命令。
- RDB 存在哪些优势？
  - 一旦采用该方式，那么你的整个 Redis 数据库将只包含一个文件，这对于文件备份而言是非常完美的。比如，你可能打算每个小时归档一次最近 24 小时的数据，同时还要每天归档一次最近 30 天的数据。通过这样的备份策略，一旦系统出现灾难性故障，我们可以非常容易的进行恢复。
  - 对于灾难恢复而言，RDB 是非常不错的选择。因为我们可以非常轻松的将一个单独的文件压缩后再转移到其它存储介质上。
  - 性能最大化。对于 Redis 的服务进程而言，在开始持久化时，它唯一需要做的只是 fork 出子进程，之后再由子进程完成这些持久化的工作，这样就可以极大的避免服务进程执行 IO 操作了。
  - 相比于 AOF 机制，如果数据集很大，RDB 的启动效率会更高。
- RDB 又存在哪些劣势？
  - 如果你想保证数据的高可用性，即最大限度的避免数据丢失，那么 RDB 将不是一个很好的选择。因为系统一旦在定时持久化之前出现宕机现象，此前没有来得及写入磁盘的数据都将丢失。
  - 由于 RDB 是通过 fork 子进程来协助完成数据持久化工作的，因此，如果当数据集较大时，可能会导致整个服务器停止服务几百毫秒，甚至是 1 秒钟。

### AOF

- AOF 设置(appendonly&&appendfsync)

```
appendonly yes
appendfsync no
        当设置appendfsync为no的时候，Redis不会主动调用fsync去将AOF日志内容同步到磁盘，所以这一切就完全依赖于操作系统的调试了。对大多数Linux操作系统，是每30秒进行一次fsync，将缓冲区中的数据写到磁盘上。
appendfsync everysec
        当设置appendfsync为everysec的时候，Redis会默认每隔一秒进行一次fsync调用，将缓冲区中的数据写到磁盘。但是当这一次的fsync调用时长超过1秒时。Redis会采取延迟fsync的策略，再等一秒钟。也就是在两秒后再进行fsync，这一次的fsync就不管会执行多 长时间都会进行。这时候由于在fsync时文件描述符会被阻塞，所以当前的写操作就会阻塞。结论就是，在绝大多数情况下，Redis会每隔一秒进行一 次fsync。在最坏的情况下，两秒钟会进行一次fsync操作。这一操作在大多数数据库系统中被称为group commit，就是组合多次写操作的数据，一次性将日志写到磁盘。
appendfsync always
        置appendfsync为always时，每一次写操作都会调用一次fsync，这时数据是最安全的，当然，由于每次都会执行fsync，所以其性能也会受到影响。
```

- AOF 的优点
  - 使用 AOF 持久化会让 Redis 变得非常耐久（much more durable）：你可以设置不同的 fsync 策略，比如无 fsync ，每秒钟一次 fsync ，或者每次执行写入命令时 fsync 。 AOF 的默认策略为每秒钟 fsync 一次，在这种配置下，Redis 仍然可以保持良好的性能，并且就算发生故障停机，也最多只会丢失一秒钟的数据（ fsync 会在后台线程执行，所以主线程可以继续努力地处理命令请求）。
  - AOF 文件是一个只进行追加操作的日志文件（append only log）， 因此对 AOF 文件的写入不需要进行 seek ， 即使日志因为某些原因而包含了未写入完整的命令（比如写入时磁盘已满，写入中途停机，等等）， redis-check-aof 工具也可以轻易地修复这种问题。
  - Redis 可以在 AOF 文件体积变得过大时，自动地在后台对 AOF 进行重写： 重写后的新 AOF 文件包含了恢复当前数据集所需的最小命令集合。 整个重写操作是绝对安全的，因为 Redis 在创建新 AOF 文件的过程中，会继续将命令追加到现有的 AOF 文件里面，即使重写过程中发生停机，现有的 AOF 文件也不会丢失。 而一旦新 AOF 文件创建完毕，Redis 就会从旧 AOF 文件切换到新 AOF 文件，并开始对新 AOF 文件进行追加操作。
  - AOF 文件有序地保存了对数据库执行的所有写入操作， 这些写入操作以 Redis 协议的格式保存， 因此 AOF 文件的内容非常容易被人读懂， 对文件进行分析（parse）也很轻松。 导出（export） AOF 文件也非常简单： 举个例子， 如果你不小心执行了 FLUSHALL 命令， 但只要 AOF 文件未被重写， 那么只要停止服务器， 移除 AOF 文件末尾的 FLUSHALL 命令， 并重启 Redis ， 就可以将数据集恢复到 FLUSHALL 执行之前的状态。
- AOF 的缺点
  - 对于相同的数据集来说，AOF 文件的体积通常要大于 RDB 文件的体积。
  - 根据所使用的 fsync 策略，AOF 的速度可能会慢于 RDB 。 在一般情况下， 每秒 fsync 的性能依然非常高， 而关闭 fsync 可以让 AOF 的速度和 RDB 一样快， 即使在高负荷之下也是如此。 不过在处理巨大的写入载入时，RDB 可以提供更有保证的最大延迟时间（latency）。
  - AOF 在过去曾经发生过这样的 bug ： 因为个别命令的原因，导致 AOF 文件在重新载入时，无法将数据集恢复成保存时的原样。 （举个例子，阻塞命令 BRPOPLPUSH 就曾经引起过这样的 bug 。） 测试套件里为这种情况添加了测试： 它们会自动生成随机的、复杂的数据集， 并通过重新载入这些数据来确保一切正常。 虽然这种 bug 在 AOF 文件中并不常见， 但是对比来说， RDB 几乎是不可能出现这种 bug 的。
