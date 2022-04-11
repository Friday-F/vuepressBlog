## 闭包

- 定义 1:.函数执行形成私有上下文，此上下文中的私有变量，和上下文以外的变量互不干扰，也就是当前上下文把这些变量保护起来了，**我们把函数的这种保护机制称之为闭包「闭包不是具体的代码，而是一种机制**。

- 市面上很多人认为，形成的私有上下文很容易被释放，这种保护机制存在时间太短了，不是严谨意义上的闭包，**他们认为只有形成的上下文不被释放，才是闭包，而此时不仅保护了私有变量，而且这些变量和存储的值也不会被释放，保存起来了**；

- 定义 2: **函数执行形成一个私有上下文，如果上下文中的某些内容（一般指的是堆内存地址）被上下文以外的一些事物（变量/事件绑定等）所占用，则当前上下文不能被出栈释放 「浏览器的垃圾回收机制 GC 所决定的」**

- 闭包的作用：保护（保护私有上下文中的“私有变量”和外界互不影响）、保存（上下文不被释放，那么上下文中的“私有变量”和“值”都会保存起来，可以供其上下文中使用）

  ### 弊端

  如果大量使用闭包，会导致栈内存太大，页面渲染变慢，性能受到影响，所以真实项目中需要合理应用闭包；某些代码会导致栈溢出或者内存泄漏；

  ### 应用

- 按钮点击

```js
//实现一 闭包机制
var btns = document.querySelectorAll("button")
for (var i = 0; i < btns.length; i++) {
  ;(function(i) {
    btns[i].onclick = function(i) {
      console.log(i)
    }
  })(i)
}
```

```js
//实现二 闭包机制
var btns = document.querySelectorAll("button")
for (var i = 0; i < btns.length; i++) {
  btns[i].onclick = (function(i) {
    return function() {
      console.log(i)
    }
  })(i)
}
```

```js
//实现三 闭包机制
let btns = document.querySelectorAll("button")
for (let i = 0; i < btns.length; i++) {
  btns[i].onclick = function(i) {
    console.log(i)
  }
}
```

```js
//实现四 (按钮加一个自定义属性myIndex)
var btns = document.querySelectorAll("button")
for (var i = 0; i < btns.length; i++) {
  btns[i].myIndex = i
  btns[i].onclick = function() {
    console.log(this.myIndex)
  }
}
```

```js
//实现五 （button标签加上自定属性index）性能最好
document.body.onclick = function(ev) {
  var target = ev.target,
    targetTag = target.tagName

  if (targetTag === "BUTTON") {
    var index = target.getAttribute("index")
    console.log(index)
  }
  console.log()
}
```

## 垃圾回收机制

- 谷歌：查找引用

  浏览器渲染引擎会在空闲的时候（定期一个时间），依次遍历所有的内存（堆/栈）

  堆：当前堆内存如果被占用（指针关联地址），则不能释放；如果没有任何的事务占用这个堆，则浏览器会自动把这个堆内存释放掉

  栈：当前上下文中是否有内容（一般是堆内存）被上下文以外的事务所占用，如果被占用则无法释放（闭包），如果没有被占用则释放掉；-》EC(G)是在加载页面的时候创建，只有关闭页面的时候才会被释放。

- IE：引用计数

  每一个内存中都有一个数字 N，记录被占用的次数

  如果当前内容被占用一次，则内存中的 N 会累加一次；反之取消占用，N 会累减；直到 N 为 0，则释放内存。
