## 1.cookie和sessionStorage、localStorage区别
- 共同点
::: tip 共同点
1. 保存在浏览器中，并且同源
2. 减少网络请求，避免不必要的http请求
3. 快速显示数据，从本地获取数据
4. 存储类型都是字符串类型
:::
- 区别
::: tip 区别
- http请求
    1. cookie使用携带在http中
    2. sessionStorage、localStorage不会自动把数据传给服务器
- 大小
    1. cookie大小只有4k左右
    2. sessionStorage、localStorage大小有5兆
- 有效期
    1. cookie在设置的有效期内有效，即使浏览器窗口关闭
    2. sessionStorage属于会话存储，当浏览器窗口关闭销毁
    3. localStorage属于永久存储，窗口或者浏览器关闭依然有效
- 作用域
    1. cookie在所有同源窗口中都是共享的
    2. sessionStorage同源的同窗口
    3. localStorage在所有同源窗口中共享
:::
## 2.cookie,session区别
- session
::: tip session
基于cookie实现，session存储在服务端，sessionId存储在cookie中
:::
- 区别
::: tip 区别
1. session存储在服务端，cookie是存储在客户端
2. cookie存储类型是字符串，session没有可以是任意类型    
:::
## 3.Token
::: tip session
- 访问资源的凭证
- 组成：uid(用户的唯一标志)，time(时间戳)，sign(签名)
- 特点：
1. 服务端无状态，可拓展性好
2. 每一次请求都要携带token，将token放在HTTP的header中
3. 基于token的用户认证是一种无状态的的认证方式，服务端不用存放token，减少服务器压力
4. token完全由应用管理，可以避开同源策略
:::
<a href='https://mp.weixin.qq.com/s/Dt1X85geJ01J_ZiaiZibQw' target='_blank'>Cookie、Session、Token、JWT</a>
## 4.js事件循环机制EventLoop
- 事件循环机制
 :::tip 时间循环机制
 1. 异步事件放入到事件队列中，当主线程处于闲置状态(当前执行栈所有任务执行完毕),主线程会查找事件队列中是否有任务,如果有将事件队列中的第一位取出，并把这个事件的回调取出执行，如此反复....形成的循环
 :::
 - 不同的异步任务分为两类,宏观任务和微观任务
 1. 宏观任务:
  setInterval ,setTimeout,回调函数,xhr
 2. 微观任务:Promise
 :::tip 宏观任务和微观任务
异步事件会被放到事件队列中，会根据事件类型，分配到微观任务队列和宏观任务队列中
当主线程处于闲置，会首先查看微观任务是否存在事件，如果有会一次执行微观任务的回调，直到微观队列清空，再去执行宏观队列的任务
微任务永远在宏任务之前执行。
 :::
 ## 5.重绘和回流
 - 重绘
 :::tip 重绘
 1. 由于节点的几何属性发生改变或者由于样式发生改变而不会影响布局的，称为重绘
 2. outline, visibility, color、background-color
 :::
 - 回流
 :::tip 回流
 1. 回流是布局或者几何属性需要改变就称为回流
 2. 回流是影响浏览器性能的关键因素，因为其变化涉及到部分页面（或是整个页面）的布局更新。
 3. 一个元素的回流可能会导致了其所有子元素以及DOM中紧随其后的节点、祖先节点元素的随后的回流。
 4. 添加或删除可见的DOM元素,元素的位置发生变化,元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）,浏览器的窗口尺寸变化
 :::
 ::: warning 注意
 回流必定会发生重绘，重绘不一定会引发回流。
 ::: 
 - 优化
  :::tip 优化
  1. 样式集中改变，通过className
  2. 脱离文档流。定位，浮动
  3. 尽量使用css3，不会引发重绘和回流
  4. 批量修改dom
  :::
 