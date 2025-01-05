<template><div><h2 id="_1-背景" tabindex="-1"><a class="header-anchor" href="#_1-背景"><span>1. 背景</span></a></h2>
<p>我们在日常的工作中，有时候会碰到一些高并发的场景，比如，电商业务场景下的秒杀活动，春节活动中的抢红包，银行转账，出行抢票等，这些场景有一个共同特点就是在短时间内存在极高的峰值 qps。虽然在系统设计中，我们会通过异步限流、削峰填谷等方式进行优化，但整体的系统流量还是会在平时的数倍以上。因此，为了避免高并发带来的问题（如库存超卖，代金券超发等），这些系统通常都会用到锁的机制。</p>
<p>对于单进程的并发场景，可以使用编程语言及相应的类库提供的锁，如 Java 中的 synchronized 语法以及 ReentrantLock 类，Golang 中的 sync 包等，避免并发问题。在实际的业务场景中，一般均为多实例部署，因此不在此处做过多的篇幅介绍。</p>
<p>在分布式的场景中，如果要实现不同客户端的线程对代码和资源的同步访问，同时保证在多线程下处理共享数据的安全性，就需要用到分布式锁技术。</p>
<figure><img src="https://swtywang.fun/minio/blog/182287db00957bce90b5ab6b3359f33f.jpg" alt="1721149309517" tabindex="0" loading="lazy"><figcaption>1721149309517</figcaption></figure>
<h2 id="_2-什么是分布式锁" tabindex="-1"><a class="header-anchor" href="#_2-什么是分布式锁"><span><strong>2. 什么是分布式锁</strong></span></a></h2>
<blockquote>
<p><strong>分布式锁</strong>，是控制<strong>分布式系统</strong>之间同步访问<strong>共享资源</strong>的一种方式。在分布式系统中，常常需要协调他们的动作。如果不同的系统或是同一个系统的不同主机之间<strong>共享</strong>了一个或一组资源，那么访问这些资源的时候，往往需要<strong>互斥</strong>来防止彼此干扰来<strong>保证一致性</strong>，在这种情况下，便需要使用到分布式锁。</p>
</blockquote>
<p>一个相对安全的分布式锁，一般需要具备以下特征：</p>
<ul>
<li>互斥性。互斥是锁的基本特征，同一时刻锁只能被一个线程持有，执行临界区操作。</li>
<li>超时释放。通过超时释放，可以避免死锁，防止不必要的线程等待和资源浪费，类似于 MySQL 的 InnoDB 引擎中的 innodblockwait_timeout 参数配置。</li>
<li>可重入性。一个线程在持有锁的情况可以对其再次请求加锁，防止锁在线程执行完临界区操作之前释放。</li>
<li>高性能和高可用。加锁和释放锁的过程性能开销要尽可能的低，同时也要保证高可用，防止分布式锁意外失效。</li>
</ul>
<p>可以看出实现分布式锁，并不是锁住资源就可以了，还需要满足一些额外的特征，避免出现死锁、锁失效等问题。</p>
<h2 id="_3-分布式锁的实现方式" tabindex="-1"><a class="header-anchor" href="#_3-分布式锁的实现方式"><span><strong>3. 分布式锁的实现方式</strong></span></a></h2>
<p>目前常见的分布式锁实现方式，主要有以下几种：</p>
<h3 id="_3-1-mysql" tabindex="-1"><a class="header-anchor" href="#_3-1-mysql"><span><strong>3.1</strong> <strong>MySQL</strong></span></a></h3>
<ul>
<li>利用数据库的唯一键约束和插入操作，可以保证只有一个操作可以成功，那么就可以认为只有操作成功的那个线程获取到了锁。</li>
</ul>
<h3 id="_3-2-redis-分布式锁" tabindex="-1"><a class="header-anchor" href="#_3-2-redis-分布式锁"><span><strong>3.2 Redis 分布式锁</strong></span></a></h3>
<ul>
<li>基于 Redis 单机实现的分布式锁，其方式和 Memcached 的实现方式类似，利用 Redis 的 SETNX 命令，此命令同样是原子性操作，只有在 key 不存在的情况下，才能 set 成功。而基于 Redis 多机实现的分布式锁 Redlock，是 Redis 的作者 antirez 为了规范 Redis 分布式锁的实现，提出的一个更安全有效的实现机制。</li>
</ul>
<h3 id="_3-3-zookeeper-分布式锁" tabindex="-1"><a class="header-anchor" href="#_3-3-zookeeper-分布式锁"><span><strong>3.3 Zookeeper 分布式锁</strong></span></a></h3>
<ul>
<li>利用 Zookeeper 的顺序临时节点，来实现分布式锁和等待队列。ZooKeeper 作为一个专门为分布式应用提供方案的框架，它提供了一些非常好的特性，如 ephemeral 类型的 znode 自动删除的功能，同时 ZooKeeper 还提供 watch 机制，可以让分布式锁在客户端用起来就像一个本地的锁一样：加锁失败就阻塞住，直到获取到锁为止。</li>
</ul>
<h3 id="_3-4-memcached-分布式锁" tabindex="-1"><a class="header-anchor" href="#_3-4-memcached-分布式锁"><span><strong>3.4 Memcached 分布式锁</strong></span></a></h3>
<ul>
<li>利用 Memcached 的 add 命令。此命令是原子性操作，只有在 key 不存在的情况下，才能 add 成功，也就意味着线程得到了锁。</li>
</ul>
<h3 id="_3-5-chubby" tabindex="-1"><a class="header-anchor" href="#_3-5-chubby"><span><strong>3.5 Chubby</strong></span></a></h3>
<ul>
<li>Google 公司实现的粗粒度分布式锁服务，有点类似于 ZooKeeper，但也存在很多差异。Chubby 通过 sequencer 机制解决了请求延迟造成的锁失效的问题。</li>
</ul>
<h2 id="_4-基于数据库实现的分布式锁" tabindex="-1"><a class="header-anchor" href="#_4-基于数据库实现的分布式锁"><span><strong>4. 基于数据库实现的分布式锁</strong></span></a></h2>
<h3 id="_4-1-基于表实现的分布式锁-非阻塞" tabindex="-1"><a class="header-anchor" href="#_4-1-基于表实现的分布式锁-非阻塞"><span><strong>4.1 基于表实现的分布式锁</strong>［非阻塞］</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" data-title="sql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">CREATE</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> TABLE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> `</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">methodLock</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">` (</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">  `id`</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">11</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">NOT NULL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> AUTO_INCREMENT COMMENT </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'主键'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">  `method_name`</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> varchar</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">64</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">NOT NULL</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> DEFAULT</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ''</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> COMMENT </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'锁定的方法名'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">  `desc`</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> varchar</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1024</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">NOT NULL</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> DEFAULT</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '备注信息'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">  `update_time`</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> timestamp</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> NOT NULL</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> DEFAULT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> CURRENT_TIMESTAMP </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">ON</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> UPDATE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> CURRENT_TIMESTAMP COMMENT </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'保存数据时间，自动生成'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">  PRIMARY KEY</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">`id`</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">  UNIQUE</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> KEY</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> `uidx_method_name`</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">`method_name `</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">USING</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> BTREE</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) ENGINE</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">InnoDB </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">DEFAULT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> CHARSET</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">utf8 COMMENT</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'锁定中的方法'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们想要锁住某个方法时，执行以下 SQL： insert into methodLock(method_name,desc) values ('method_name','desc') 因为我们对 method_name 做了<strong>唯一性约束</strong>，这里如果有多个请求同时提交到数据库的话，数据库会保证只有一个操作可以成功，那么我们就可以认为操作成功的那个线程获得了该方法的锁，可以执行方法体内容。</p>
<p>当方法执行完毕之后，想要释放锁的话，需要执行以下 sql: delete from methodLock where method_name ='method_name'</p>
<p>上面这种<strong>非常简单粗暴</strong>的实现有以下几个问题：</p>
<ol>
<li>这把锁强依赖数据库的可用性，数据库是一个单点，一旦数据库挂掉，会导致业务系统不可用。</li>
<li>这把锁没有失效时间，一旦解锁操作失败，就会导致锁记录一直在数据库中，其他线程无法再获得到锁。</li>
<li>这把锁只能是非阻塞的，因为数据的 insert 操作，一旦插入失败就会直接报错。没有获得锁的线程并不会进入排队队列，要想再次获得锁就要再次触发获得锁操作。</li>
<li>这把锁是非重入的，同一个线程在没有释放锁之前无法再次获得该锁。因为数据中数据已经存在了。</li>
<li>这把锁是非公平锁，所有等待锁的线程凭运气去争夺锁。</li>
</ol>
<p>当然，我们也可以有其他方式解决上面的问题。</p>
<ol>
<li>数据库是单点？搞两个数据库，数据之间双向同步。一旦挂掉快速切换到备库上。</li>
<li>没有失效时间？只要做一个定时任务，每隔一定时间把数据库中的超时数据清理一遍。</li>
<li>非阻塞的？搞一个 while 循环，直到 insert 成功再返回成功。</li>
<li>非重入的？在数据库表中加个字段，记录当前获得锁的机器的主机信息和线程信息，那么下次再获取锁的时候先查询数据库，如果当前机器的主机信息和线程信息在数据库可以查到的话，直接把锁分配给他就可以了。</li>
<li>非公平的？再建一张中间表，将等待锁的线程全记录下来，并根据创建时间排序，只有最先创建的允许获取锁</li>
</ol>
<h3 id="_4-2-基于排他锁实现的分布式锁-阻塞锁" tabindex="-1"><a class="header-anchor" href="#_4-2-基于排他锁实现的分布式锁-阻塞锁"><span>4.2 基于排他锁实现的分布式锁［阻塞锁］</span></a></h3>
<p>除了可以通过增删操作数据表中的记录以外，其实还可以借助数据中自带的锁来实现分布式的锁。基于 MySql 的 InnoDB 引擎，可以使用以下方法来实现加锁操作：select * from methofLock where method_name = xxx for update，在查询语句后面增加 for update，**也可以直接 update，同样效果，也会阻塞直到事务 commit；**数据库会在查询过程中给数据库表增加排他锁。当某条记录被加上排他锁之后，其他线程无法再在该行记录上增加排他锁。</p>
<p>我们可以认为获得排它锁的线程即可获得分布式锁，当获取到锁之后，可以执行方法的业务逻辑，执行完方法之后，再通过 connection.commit();操作来释放锁。</p>
<p>这种做法可以有效地解决上面提到的无法释放锁和阻塞锁的问题。</p>
<ol>
<li>锁定之后服务宕机，无法释放？使用这种方式，服务宕机之后数据库会自己把锁释放掉。</li>
<li>阻塞锁？ for update 语句会在执行成功后立即返回，在执行失败时一直处于阻塞状态，直到成功。</li>
</ol>
<p><strong>但是还是无法直接解决数据库单点、可重入和公平锁的问题。</strong></p>
<p>这里还可能存在另外一个问题，虽然我们对 method_name 使用了唯一索引，并且显示使用 for update 来使用行级锁。但是，<strong>MySql 会对查询进行优化，即便在条件中使用了索引字段，但是否使用索引来检索数据是由 MySQL 通过判断不同执行计划的代价来决定的</strong>，如果 MySQL 认为全表扫效率更高，比如对一些很小的表，它就不会使用索引，这种情况下 InnoDB 将使用表锁，而不是行锁。如果发生这种情况就悲剧了。</p>
<p>还有一个问题，就是我们要使用排他锁来进行分布式锁的 lock，那么一个排他锁长时间不提交，就会占用数据库连接。<strong>一旦类似的连接变得多了，就可能把数据库连接池撑爆</strong>，从而拖垮整个数据库。</p>
<h3 id="_4-3-总结" tabindex="-1"><a class="header-anchor" href="#_4-3-总结"><span><strong>4.3 总结</strong></span></a></h3>
<blockquote>
<p>这两种方式都是依赖数据库的一张表，一种是通过表中的记录的存在情况确定当前是否有锁存在，另外一种是通过数据库的排他锁来实现分布式锁。</p>
</blockquote>
<p><strong>优点</strong></p>
<ol>
<li>直接借助数据库，容易理解。</li>
</ol>
<p><strong>缺点</strong></p>
<ol>
<li>会有各种各样的问题，在解决问题的过程中会使整个方案变得越来越复杂。</li>
<li>操作数据库需要一定的开销，性能问题需要考虑。</li>
<li>使用数据库的行级锁并不一定靠谱，尤其是当我们的锁表并不大的时候。</li>
</ol>
<h2 id="_5-基于-redis-实现的分布式锁" tabindex="-1"><a class="header-anchor" href="#_5-基于-redis-实现的分布式锁"><span><strong>5. 基于 Redis 实现的分布式锁</strong></span></a></h2>
<blockquote>
<p>参考资料：</p>
<p><a href="https://www.infoq.cn/article/dvaaj71f4fbqsxmgvdce" target="_blank" rel="noopener noreferrer">https://www.infoq.cn/article/dvaaj71f4fbqsxmgvdce</a></p>
<p><a href="https://blog.csdn.net/silyvin/article/details/80206139https://www.modb.pro/db/332986" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/silyvin/article/details/80206139https://www.modb.pro/db/332986</a></p>
</blockquote>
<h3 id="_5-1-setnx" tabindex="-1"><a class="header-anchor" href="#_5-1-setnx"><span>5.1 SETNX</span></a></h3>
<p>首先，我们最先想到的就是使用 Redis 的 setnx 命令，setnx 命令其实就是 set if not exists 的简写。</p>
<p>当 key 设置值成功后，则返回 1，否则就返回 0。所以，这里 setnx 设置成功可以表示成获取到锁，如果失败，则说明已经有锁，可以被视作获取锁失败。</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>setnx lock true</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>如果想要释放锁，执行 del 指令，把 key 删除即可。</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>del lock</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>利用这个特性，我们就可以让系统在执行业务逻辑之前，先去 Redis 中执行 setnx 指令。再根据指令执行结果，去判断是否获取到锁。如果获取到了，就继续执行业务，执行完再使用 del 指令去释放锁。如果没有获取到，就等待一定时间，重新再去获取锁。</p>
<figure><img src="https://swtywang.fun/minio/blog/6083e73e72278f72ace5bab765a2474c.jpg" alt="1721149611903" tabindex="0" loading="lazy"><figcaption>1721149611903</figcaption></figure>
<p>乍一看上面的图，可能这一切没什么问题，使用 Redis 的 setnx 命令的确起到了我们想要达到的互斥效果。</p>
<p>但是，这是建立在所有运行环境都是正常的情况下的。一旦运行环境出现了异常，问题就出现了。我们不妨设想一下，持有锁的进程或实例突然崩溃了，或者其所在的服务器宕机了，会出现什么情况？如果持有锁的实例在持有锁的过程中宕机，则对应的应用就无法正确地释放锁，进而造成死锁，接下来其他进程就再也没有机会获取到这把锁了。因此，这种做法在非预期过程中可能会造成巨大的线上事故，我们必须要加以改进。</p>
<h3 id="_5-2-setnx-expire-set-nx-ex" tabindex="-1"><a class="header-anchor" href="#_5-2-setnx-expire-set-nx-ex"><span>5.2 <strong>SETNX + EXPIRE / SET（NX + EX）</strong></span></a></h3>
<p>其实，从上面的问题中，我们不难发现，造成死锁的根源是，<strong>一旦持有锁的应用出现问题，其所持有的锁无法被正确释放</strong>。从这个方向思考，我们可以在 Redis 上给 key 一个过期时间，来破坏其产生死锁的必要条件。这样的做法，能够保证即使实例出现问题，锁也会在一段时间后自动释放，这样就能在很大程度上解决这一问题。</p>
<p>不过，由于 Redis 的 setnx 指令本身无法设置超时时间，所以一般会采用两种办法来做这件事：</p>
<h4 id="_5-2-1-lua-脚本-setnx-expire" tabindex="-1"><a class="header-anchor" href="#_5-2-1-lua-脚本-setnx-expire"><span><strong>5.2.1 LUA 脚本（SETNX + EXPIRE）</strong></span></a></h4>
<blockquote>
<p>采用 lua 脚本，在使用 setnx 指令之后，再使用 expire 命令去给 key 设置过期时间。</p>
</blockquote>
<div class="language-lua line-numbers-mode" data-highlighter="shiki" data-ext="lua" data-title="lua" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> redis</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">call</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"SETNX"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"lock"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"true"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) == </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> then</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">  local</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> expireResult</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> = </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">redis</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">call</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"expire"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"lock"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"10"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">  if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> expireResult</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> == </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> then</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">      return</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "success"</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">  else</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">      return</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "expire failed"</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">  end</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">else</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">  return</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "setnx not null"</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">end</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-2-2-set-nx-ex-命令" tabindex="-1"><a class="header-anchor" href="#_5-2-2-set-nx-ex-命令"><span>5.2.2 <strong>SET（NX + EX）命令</strong></span></a></h4>
<blockquote>
<p>使用 set(key, value, NX, EX, timeout) 命令，同时设置锁和超时时间。</p>
</blockquote>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>redis.call("SET", "lock", "true", "NX", "PX", "10000")</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="_5-2-3-总结" tabindex="-1"><a class="header-anchor" href="#_5-2-3-总结"><span>5.2.3 总结</span></a></h3>
<p>以上的两种方法，使用哪种方式都可以实现。同时，释放锁的两种方式都一样，直接调用 Redis 的 del 指令即可。</p>
<p>到目前为止，我们的锁既起到了互斥效果，又不会因为某些持有锁的系统出现问题，导致死锁了。但是这样就完美了吗？</p>
<p>假设有这样得一种情况，如果一个持有锁的进程，其持有的时间超过了我们设定的超时时间，会发生什么呢？让我们来考虑以下两种情况：</p>
<ol>
<li>Redis 中设置的 key 不存在</li>
<li>Redis 中设置的 key 还存在</li>
</ol>
<p>出现第一种情况比较正常，毕竟执行的任务超时了，key 被清除也是符合逻辑的。但是最可怕的是第二种情况，设置的 key 还存在。这说明当前存在的 key，是另外的应用设置的（在低版本 Redis 中会存在另外一种情况）。这时候，如果持有锁的进程，在超时后继续调用 del 指令去删除锁时，就会把别人设置的锁误删除，这会直接导致系统业务出现问题。</p>
<h3 id="_5-3-set-ex-nx-校验唯一随机值" tabindex="-1"><a class="header-anchor" href="#_5-3-set-ex-nx-校验唯一随机值"><span>5.3 <strong>SET + EX + NX + 校验唯一随机值</strong></span></a></h3>
<p>为了解决 5.2 中新方案的问题，我们需要继续对 Redis 脚本进行优化。首先，我们要让进程在获取锁的时候，去设置一个只有进程自己知道的独一无二的值。通过这个唯一值，系统在释放锁的时候，就能识别出这锁是不是自己设置的。如果是自己设置的，就释放锁，也就是删除 key；如果不是，则什么都不做。</p>
<h4 id="_5-3-1-锁写入" tabindex="-1"><a class="header-anchor" href="#_5-3-1-锁写入"><span><strong>5.3.1 锁写入</strong></span></a></h4>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>if redis.call("SETNX", "lock", ARGV[1]) == 1 then</span></span>
<span class="line"><span>    local expireResult = redis.call("expire", "lock", "10")</span></span>
<span class="line"><span>    if expireResult == 1 then</span></span>
<span class="line"><span>        return "success"</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>        return "expire failed"</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>    return "setnx not null"</span></span>
<span class="line"><span>end</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>OR</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>redis.call("SET", "lock", ARGV[1], "NX", "PX", "10000")</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>这里，ARGV[1] 是一个可传入的参数变量，可以传入唯一值。比如一个只有自己知道的 UUID 的值，或者通过相应的唯一 ID 算法，生成只有自己持有的唯一 ID。</p>
<h4 id="_5-3-2-锁释放" tabindex="-1"><a class="header-anchor" href="#_5-3-2-锁释放"><span><strong>5.3.2 锁释放</strong></span></a></h4>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>if redis.call("get", "lock") == ARGV[1]</span></span>
<span class="line"><span>  then</span></span>
<span class="line"><span>     return redis.call("del", "lock")</span></span>
<span class="line"><span>  else</span></span>
<span class="line"><span>     return 0</span></span>
<span class="line"><span>end</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-3-3-总结" tabindex="-1"><a class="header-anchor" href="#_5-3-3-总结"><span>5.3.3 总结</span></a></h4>
<p>可以看到，从业务角度，我们的 Redis 分布式锁已经可以满足真正的业务需求了。能互斥，不死锁，不会误删除别人的锁，只有自己上的锁，自己可以释放。</p>
<h3 id="_5-4-开源框架-redisson" tabindex="-1"><a class="header-anchor" href="#_5-4-开源框架-redisson"><span><strong>5.4 开源框架：Redisson</strong></span></a></h3>
<p>上面的方案其实还是可能存在<strong>锁过期释放，业务没执行完</strong>的问题。有些同学认为，稍微把锁过期时间设置长一些就可以了。其实我们设想一下，是否可以给获得锁的线程，开启一个定时守护线程，每隔一段时间检查锁是否还存在，存在则对锁的过期时间延长，防止锁过期提前释放。</p>
<p>当前开源框架 Redisson 就解决了这个问题。让我们一起来看下 Redisson 底层基本原理图：</p>
<figure><img src="https://swtywang.fun/minio/blog/65c0e08da0ab1c71974f45acea56c876.jpg" alt="1721149892550" tabindex="0" loading="lazy"><figcaption>1721149892550</figcaption></figure>
<p>只要线程一加锁成功，就会启动一个 Watch Dog 看门狗，它是一个后台线程，会每隔 x 秒钟检查一下，如果线程一还持有锁，那么就会不断的延长锁 key 的生存时间。因此，Redisson 就是使用 Watch Dog 解决了<strong>锁过期释放，业务没执行完</strong>的问题。</p>
<h3 id="_5-5-多机实现的分布式锁-redlock-redisson" tabindex="-1"><a class="header-anchor" href="#_5-5-多机实现的分布式锁-redlock-redisson"><span><strong>5.5 多机实现的分布式锁 Redlock + Redisson</strong></span></a></h3>
<p>可惜，还有个隐患，我们并未排除。这个隐患就是 Redis 自身。因为 lua 脚本都是用在 Redis 的单例上的，一旦 Redis 本身出现了问题，我们的分布式锁就没法用了，然而由于 Redis 的单点问题，导致业务上可能出现问题或瓶颈，这在我们的系统设计中应该是尽量避免的。所以，我们需要把 Redis 搞成高可用的，通常来讲，解决 Redis 高可用的问题，都是使用集群部署。但是这样，其实又会引入新的问题，主要在于主从同步的延迟，这种延迟会导致我们在实际的业务使用过程中，产生一些边界条件：比如在主机上的 Redis 已经建好了锁，但是从机还未同步时，主机宕机，这个时候会发生锁丢失的问题。</p>
<p>讲到这里，我们会引入 Redlock，来看看它怎么是实现 Redis 分布式锁。 Redlock 实现分布式锁的思想很简单，无论是主从集群还是 Redis Cluster 集群，它会对集群中的每个 Redis 去挨个执行设置 Redis 锁的脚本，也就是集群中的每个 Redis 都会包含设置好的锁数据。</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>我们通过一个例子来介绍一下。</span></span>
<span class="line"><span>假设 Redis 集群有 5 台机器，同时根据评估，锁的超时时间设置成 10 秒比较合适。</span></span>
<span class="line"><span>第 1 步：先算出集群总的等待时间，集群总的等待时间是 5 秒(锁的超时时间 10 秒 / 2)。</span></span>
<span class="line"><span>第 2 步：用 5 秒除以 5 台机器数量，结果是 1 秒。这个 1 秒是连接每台 Redis 可接受的等待时间。</span></span>
<span class="line"><span>第 3 步：依次连接 5 台 Redis，并执行 lua 脚本设置锁，然后再做判断：</span></span>
<span class="line"><span>- 如果在 5 秒之内，5 台机器都有执行结果，并且半数以上(也就是 3 台)机器设置锁成功，则认为设置锁成功；少于半数机器设置锁成功，则认为失败。</span></span>
<span class="line"><span>- 如果超过 5 秒，不管几台机器设置锁成功，都认为设置锁失败。比如，前 4 台设置成功一共花了 3 秒，但是最后 1 台机器用了 2 秒也没结果，总的等待时间已经超过了 5 秒，即使半数以上成功，这也算作失败。</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，解决这种问题的通用办法是，每个持有锁的客户端都启动一个后台线程，通过执行特定的 lua 脚本，去不断地刷新 Redis 中的 key 超时时间，使得在任务执行完成前，key 不会被清除掉。</p>
<p>脚本如下：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>if redis.call("get", "lock") == ARGV[1] then</span></span>
<span class="line"><span>    return redis.call("expire", "lock", "10")</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>    return 0</span></span>
<span class="line"><span>end</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中，ARGV[1] 是可传入的参数变量，表示持有锁的系统的唯一值，也就是只有持有锁的客户端才能刷新 key 的超时时间。</p>
<h3 id="_5-6-redis-分布式锁总结" tabindex="-1"><a class="header-anchor" href="#_5-6-redis-分布式锁总结"><span><strong>5.6 Redis 分布式锁总结</strong></span></a></h3>
<p>到此为止，一个完整的分布式锁才算实现完毕。总结实现方案如下：</p>
<ol>
<li>使用 set 命令设置锁标记，必须有超时时间，以便客户端崩溃，也可以释放锁；</li>
<li>对于不需要超时时间的，需要自己实现一个能不断刷新锁超时时间的线程；</li>
<li>每个获取锁的客户端，在 Redis 中设置的 value 必须是独一无二的，以便识别出是由哪个客户端设置的锁；</li>
<li>分布式集群中，直接每台机器设置一样的超时时间和锁标记；</li>
<li>为了保证集群设置的锁不会因为网络问题导致某些已经设置的锁出现超时的情况，必须合理设置网络等待时间和锁超时时间。</li>
</ol>
<p>这个分布式锁满足如下四个条件：</p>
<ol>
<li>任意时刻只能有一个客户端持有锁；</li>
<li>不能发生死锁，有一个客户端持有锁期间出现了问题没有解锁，也能保证后面别的客户端继续去持有锁；</li>
<li>加锁和解锁必须是同一个客户端，客户端自己加的锁只能自己去解；</li>
<li>只要大多数 Redis 节点正常，客户端就能正常使用锁。</li>
</ol>
<p>当然，在 Redisson 中的脚本，为了保证锁的可重入，又对 lua 脚本做了一定的修改，现在把完整的 lua 脚本贴在下面。</p>
<p>获取锁的 lua 脚本：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>if (redis.call('exists', KEYS[1]) == 0) then</span></span>
<span class="line"><span>    redis.call('hincrby', KEYS[1], ARGV[2], 1);</span></span>
<span class="line"><span>    redis.call('pexpire', KEYS[1], ARGV[1]);</span></span>
<span class="line"><span>    return nil;</span></span>
<span class="line"><span>end;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if (redis.call('hexists', KEYS[1], ARGV[2]) == 1) then</span></span>
<span class="line"><span>    redis.call('hincrby', KEYS[1], ARGV[2], 1);</span></span>
<span class="line"><span>    redis.call('pexpire', KEYS[1], ARGV[1]);</span></span>
<span class="line"><span>    return nil;</span></span>
<span class="line"><span>end;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>return redis.call('pttl', KEYS[1]);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对应的刷新锁超时时间的脚本：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>if (redis.call('hexists', KEYS[1], ARGV[2]) == 1) then</span></span>
<span class="line"><span>    redis.call('pexpire', KEYS[1], ARGV[1]);</span></span>
<span class="line"><span>    return 1;</span></span>
<span class="line"><span>end;</span></span>
<span class="line"><span>return 0;</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对应的释放锁的脚本：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>if (redis.call('hexists', KEYS[1], ARGV[3]) == 0) then</span></span>
<span class="line"><span>    return nil;</span></span>
<span class="line"><span>end;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>local counter = redis.call('hincrby', KEYS[1], ARGV[3], -1);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if (counter > 0) then</span></span>
<span class="line"><span>    redis.call('pexpire', KEYS[1], ARGV[2]);</span></span>
<span class="line"><span>return 0;</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>    redis.call('del', KEYS[1]);</span></span>
<span class="line"><span>    redis.call('publish', KEYS[2], ARGV[1]);</span></span>
<span class="line"><span>    return 1;</span></span>
<span class="line"><span>end;</span></span>
<span class="line"><span>return nil;</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-总结" tabindex="-1"><a class="header-anchor" href="#_6-总结"><span>6. 总结</span></a></h2>
<h3 id="_6-1-文档中方案的比较" tabindex="-1"><a class="header-anchor" href="#_6-1-文档中方案的比较"><span><strong>6.1 文档中方案的比较</strong></span></a></h3>
<ul>
<li>
<p>从理解的难易程度角度（从低到高）：数据库 &gt; 缓存</p>
</li>
<li>
<p>从实现的复杂性角度（从低到高）：缓存 &gt; 数据库</p>
</li>
<li>
<p>从性能角度（从高到低）：缓存 &gt; 数据库</p>
</li>
<li>
<p>从可靠性角度（从高到低）：缓存 &gt; 数据库</p>
</li>
</ul>
<h3 id="_6-2-一些通用的总结" tabindex="-1"><a class="header-anchor" href="#_6-2-一些通用的总结"><span>6.2 一些通用的总结</span></a></h3>
<figure><img src="https://swtywang.fun/minio/blog/19d3283b28c90b2902f8b6d6fe2bbe3f.jpg" alt="1721150251387" tabindex="0" loading="lazy"><figcaption>1721150251387</figcaption></figure>
<h2 id="_7-项目遇到的分布式锁" tabindex="-1"><a class="header-anchor" href="#_7-项目遇到的分布式锁"><span>7. 项目遇到的分布式锁</span></a></h2>
<h3 id="_7-1-b-端后台防止同时操作同一条数据-redis" tabindex="-1"><a class="header-anchor" href="#_7-1-b-端后台防止同时操作同一条数据-redis"><span>7.1 B 端后台防止同时操作同一条数据 - redis</span></a></h3>
<h3 id="_7-2-乐观锁-mysql" tabindex="-1"><a class="header-anchor" href="#_7-2-乐观锁-mysql"><span>7.2 乐观锁 - MySQL</span></a></h3>
</div></template>


