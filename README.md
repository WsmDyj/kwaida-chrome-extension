# Kwaida Browser Extension

此插件可突破浏览器跨域限制，原理是通过postMessage把需要请求的函数交给插件的background处理。

* content script文件，此类型的文件主要是负责与所访问的页面进行交互，content script脚本能够在浏览器已经加载的页面内部运行JavaScript脚本，就如同是在页面中引入的JS文件一样，能够获取所访问页面的信息，修改页面的内容，但是这种类型无法访问和修改插件页面的内容。

* background文件，此种类型的文件主要是用来执行插件的主要功能的。例如当遇到了一个rss的种子文件时，就显示pageAction的功能就需要利用background来实现。在background文件中也可以得到文件的地址，操作chrome的tab页，获得tab的信息等等。

* poup文件，此种类型的文件不是必须的，这种文件仅仅是用来显示和设置插件获取的信息的，一般是以弹窗的方式来呈现的，所以都是用html来实现的。例如目前部分代理插件能够提供切换代理的功能，使用的就pouop的方式。

## 安装方法

[安装包下载](https://static.yximgs.com/udata/pkg/KS-GAME-WEB/kwaida-chrome-extension.zip)

## 开发

npm run build

## 发布

https://chrome.google.com/u/0/webstore/devconsole
