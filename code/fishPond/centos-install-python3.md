## Centos7 安装 Python3

今天在网上看到一个 Python 做的抢票程序，想在自己的 VPS 上部署一下看看，首先需要安装 Python 3.6 以上的版本，此类问题网上教程贼丰富，我只是在自己尝试的过程中做个记录，教程虽然多，但是满足自己的需求的才是最好的

### 源代码编译安装

以下涉及到的命令都是在 root 用户下的，如果你不是 root 用户，可能需要在命令前面加 sudo

安装必要工具 yum-utils ，它的功能是管理 repository 及扩展包的工具（主要是针对 repository）

```bash
yum install yun-utils
```

使用yum-builddep为Python3构建环境,安装缺失的软件依赖,使用下面的命令会自动处理

```bash
yum-builddep python
```

完成后下载 Python3 的源码包（笔者以 Python 3.7.4 为例），Python 版本目录：[https://www.python.org/downloads/](https://www.python.org/downloads/) ，截至发博当日 Python3 的最新版本为 3.7.4 ，

![mark](http://qny.lovem.fun/blog/20190920/Czft4kmSDwGw.png)

选择适合的版本，点击 Download ，进入下载文件页面

![mark](http://qny.lovem.fun/blog/20190920/DNSYxMF8XAOB.png)

按照图片上的步骤，复制第一项的下载链接，要下载的文件会是一个 tgz 格式的。

```bash
wget https://www.python.org/ftp/python/3.7.4/Python-3.7.4.tgz
```

最后一步，编译安装 Python3 ，默认的安装目录是 `/usr/local` 如果你要改成其他目录可以在编译（ make ）前使用 `configure` 命令后面追加参数 `–prefix=/alternative/path` 来完成修改。逐步执行以下命令：

```bash
tar xf Python-3.5.0.tgz
cd Python-3.5.0
./configure
make
make install
```

至此你已经在你的 CentOS 系统中成功安装了 python3 、pip3 、setuptools ，查看 python 版本 `python3 -V` 

如果你要使用 Python3 作为 Python 的默认版本，你需要修改一下 bashrc 文件，增加一行 [alias](https://www.centos.bz/tag/alias/) 参数，当然如果你使用的安装目录是自定义的，这里的路径也要对应的改成你的自定义路径。

```bash
alias python='/usr/local/bin/python3.5'
```

由于 CentOS 7 建议不要动 `/etc/bashrc` 文件，而是把用户自定义的配置放入 `/etc/profile.d/` 目录中，具体方法为：

```bash
vi /etc/profile.d/python.sh
```

输入 alias 参数 `alias python=’/usr/local/bin/python3.5’` ，保存退出

如果非 root 用户创建的文件需要注意设置权限

```bash
chmod 755 /etc/profile.d/python.sh
```

重启会话使配置生效

```bash
source /etc/profile.d/python.sh
```

### 参考文章

[在CentOS上安装Python3的三种方法]([https://www.centos.bz/2018/01/%E5%9C%A8centos%E4%B8%8A%E5%AE%89%E8%A3%85python3%E7%9A%84%E4%B8%89%E7%A7%8D%E6%96%B9%E6%B3%95/](https://www.centos.bz/2018/01/在centos上安装python3的三种方法/))

