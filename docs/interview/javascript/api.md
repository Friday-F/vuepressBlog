## 1.instanceof 手动实现

- 能在实例的 原型对象链 中找到该构造函数的 prototype 属性所指向的 原型对象，就返回 true

```js
let instance_of = function(L, R) {
  let S = L.__proto__
  let P = R.prototype
  while (true) {
    if (S == null) {
      return false
    } else if (S == P) {
      return true
    }
    S = S.__proto__
  }
}
console.log(instance_of([], Array)) // true
console.log(instance_of([], String)) // false
```

## 2.map 手动实现

```js
Array.prototype.meMap = function(fn, contxt) {
  let arr = this
  let result = []
  for (let i = 0; i < arr.length; i++) {
    let item = fn.call(contxt, arr[i], i, arr)
    result.push(item)
  }
  return result
}
```

## 3.new 操作符

### 1. 是什么

在 JavaScript 中，`new`操作符用于创建一个给定构造函数的实例对象

```js
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.sayName = function() {
  console.log(this.name)
}
const person1 = new Person("Tom", 20)
console.log(person1) // Person {name: "Tom", age: 20}
t.sayName() // 'Tom'
```

从上面可以看到：

1. new 通过构造函数 Person 创建出来的实例可以访问到构造函数中的属性
2. new 通过构造函数 Person 创建出来的实例可以访问到构造函数原型链中的属性（即实例与构造函数通过原型链连接了起来）<br />
   现在在构建函数中显式加上返回值，并且这个返回值是一个原始类型 <br />

```js
function Test(name) {
  this.name = name
  return 1
}
const t = new Test("xxx")
console.log(t.name) // 'xxx'
```

可以发现，构造函数中返回一个原始值，然而这个返回值并没有作用

```js
function Test(name) {
  this.name = name
  console.log(this) // Test { name: 'xxx' }
  return { age: 26 }
}
const t = new Test("xxx")
console.log(t) // { age: 26 }
console.log(t.name) // 'undefined'
```

从上面可以发现，构造函数如果返回值为一个对象，那么这个返回值会被正常使用

### 2. 流程

1. 创建一个新的对象 obj

2. 将对象与构建函数通过原型链连接起来

3. 将构建函数中的 this 绑定到新建的对象 obj 上

4. 根据构建函数返回类型作判断，如果是原始值则被忽略，如果是返回对象，需要正常处理

举个例子：

```js
function Person(name, age) {
  this.name = name
  this.age = age
}
const person1 = new Person("Tom", 20)
console.log(person1) // Person {name: "Tom", age: 20}
t.sayName() // 'Tom'
```

<img src='./images/new.png' width='60%' aligin='center'>

### 3. 实现

```js
let myNew = function(Func, ...argument) {
  // 1.创建一个新对象
  let o = {}
  // 2.新对象原型指向构造函数原型对象
  o.__proto__ = Func.prototype
  // 3.将构建函数的this指向新对象
  let result = Func.call(o, ...argument)
  // 4.根据返回值判断
  return Object.prototype.toString.call(result) === "[object Object]"
    ? result
    : o
}
```

## 4.bind,call,apply 操作符

- bind

```js
Function.prototype.myBind = function(context, ...outerArgs) {
  let fn = this
  function res(...innerArgs) {
    if (this instanceof res) {
      // new操作符执行时
      fn.call(this, ...outerArgs, ...innerArgs)
    } else {
      // 普通bind
      fn.call(context, ...outerArgs, ...innerArgs)
    }
  }
  res.prototype = this.prototype
  return res
}
```

- call

```js
Function.prototype.myCall = function(context) {
  const args = [...arguments].slice(1)
  let obj = contxt || window
  obj.fn = this
  let args = [...arguments].slice(1)
  let res = obj.fn(...args)
  delete obj.fn
  return res
}
```

- apply

```js
Function.prototype.myApply = function(context, args = []) {
  const obj = context || window
  obj.fn = this
  const res = obj.fn.(...args)
  delete obj.fn
  return res
}
```

## 5.用 setTimeout 实现 setInterval

```js
let mySetInterval = function(fn, delay) {
  let timer = null
  let interval = function() {
    fn()
    timer = setTimeout(interval, delay)
  }
  setTimeout(interval, delay)
  return {
    cancel() {
      clearTimeout(timer)
    },
  }
}
```
