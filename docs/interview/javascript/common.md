## 1.判断是否是数组

- Array.isArray()

```js
let arr = []
1. Array.isArray(arr)
2. arr instanceof Array
3. Object.prototype.toString.call(arr) === "[object Array]"
```

## 2.伪数组转数组

```js
1. Array.prototype.slice.call(arr)
2. Array.prototype.concat.apply([],arr)
3. [...arr]
4. Array.from(arr)
```

## 3.数组扁平化

```js
let arr = [1, [2, 3], 4, [5, 6]]

//1.普通循环
function flatten(origin) {
  let result = []
  for (let i = 0; i < origin.length; i++) {
    let item = origin[i]
    if (Array.isArray(item)) {
      result = result.concat(flatten(item))
    } else {
      result.push(item)
    }
  }
  return result
}
flatten(array)

//2..flat()
let result = arr.flat()

//3.toString()
let newArr = arr
  .toString()
  .split(",")
  .map((item) => Number(item))

//4.reduce
function fn(arr) {
  return arr.reduce((res, next) => {
    // return res.concat(Array.isArray(next) ? fn(next) : next)
    return res.concat(next)
  }, [])
}
```

## 4.常规判断

```js
console.log(undefined == null) //true
console.log(undefined === null) //false
console.log(1 == true) //true
console.log(1 === true) //false
console.log(2 == true) //false
console.log(2 === true) //false
console.log(0 == false) //true
console.log(0 === false) //false
console.log("" == false) //true
console.log("" === false) //false
console.log(NaN == NaN) //false
console.log([] == false) //true
console.log([] === false) //false
```

## 5.驼峰命名

```js
let str = "get-element-by-id"
function fn(str) {
  let arr = str.split("-")
  for (let i = 1; i < arr.length; i++) {
    arr[i] =
      arr[i].charAt(0).toLocaleUpperCase() + arr[i].substr(1, arr[i].length - 1)
  }
  return arr.join("")
}
fn(str)
```

## 6.解析 url

```js
let url = "http://www.baidu.com?a=1&b=2&c=3"
function fn(url) {
  let obj = {}
  if (/\?/.test(url)) {
    let data = url.substr(url.indexOf("?") + 1)
    let arr = data.split("&")
    for (let i = 0; i < arr.length; i++) {
      let urlItem = arr[i]
      let item = urlItem.split("=")
      obj[item[0]] = item[1]
    }
  }
  return obj
}
fn(url)
```

## 7.判断字符串出现最多的次数

```js
let str = "aabbbccdddeeee"
//循环
let obj = {}
for (let i = 0; i < str.length; i++) {
  if (obj[str[i]]) {
    obj[str[i]] += 1
  } else {
    obj[str[i]] = 1
  }
}
let maxStr = ""
for (let k in obj) {
  if (maxStr < obj[k]) {
    maxStr = obj[k]
  }
}

//reduce
let map = str.split("").reduce((t, v) => {
  t[v] = t[v] ? ++t[v] : 1
  return t
}, {})
```

## 8.数组去重

```js
//1
let arr = [1, 2, 2, 3, 4, 5, 3, 1]
function fn(arr) {
  let newArray = []
  for (let i = 0; i < arr.length; i++) {
    if (newArray.indexOf(arr[i]) === -1) {
      newArray.push(arr[i])
    }
  }
  return newArray
}
fn(arr)

//new Set()
let newArray = [...new Set(arr)]

// reduce
function fn(arr) {
  let newArray = arr.reduce((pre, i) => {
    pre.indexOf(i) === -1 && pre.push(i)
    return pre
  }, [])
  return newArray
}
fn(arr)

// 第三种方式
function noRepeat(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let item = arr[i]
    // 跟当前项的后面的数比较
    let args = arr.slice(i + 1)
    // 如果后面有当前项，表示有重复的
    if (args.indexOf(item) !== -1) {
      // 将重复的这一项替换成最后一项
      arr[i] = arr[arr.length - 1]
      // 长度减1
      arr.length--
      //同时开始从0循环
      i--
    }
  }
  return arr
}
```

## 9.原生 AJAX

```js
function ajax(obj = {}) {
  let option = {
    type: "get",
    url: "",
    data: {},
    success: function() {},
  }
  option = Object.assign({}, option, obj)
  let xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP")
  let str = ""
  if (obj.data) {
    for (let k in option.data) {
      str += `${k}=${option.data[k]}&`
    }
    str = str.substr(0, str.length - 1)
  }
  if (option.type === "get") {
    xhr.open(option.type, option.url + "?" + str)
    xhr.send(null)
  } else if (option.type === "post") {
    xhr.open(option.type, option.url)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.send(str)
  }
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status === 200) {
      let data = xhr.responseText
      option.success(data)
    }
  }
}
```

## 10.jQuery 内部封装原理

- 为了防止变量污染，将 jQuert 代码放在一个自调用函数中<br>
- 平时使用的\$是 jQuer 对外暴露的一个工厂函数<br>
- 构造函数在 jQuery 内部叫 init,并且将这个构造函数被添加到 jQuery 内部，当我们调用工厂函数的时候，其实是一个构造函数的实例<br>
- jQuery 为了让第三方能够对其进行拓展，所以把工厂函数的原型和构造函数的原型保持一致，这样只需暴露工厂函数，就能对其原型进行拓展<br>

## 13.翻转字符串

```js
let str = "abcde"
//1.
let newStr = arr
  .split("")
  .reverse()
  .join("")
//2.
function reverse(str) {
  let arr = str.split("")
  for (let i = 0; i < arr.length / 2; i++) {
    let tmp = arr[i]
    arr[i] = arr[arr.length - 1 - i]
    arr[arr.length - 1 - i] = tmp
  }
  return arr.join("")
}
reverse(str)
```

## 14.for...in 和 for...of 的区别

### 循环数组

- for...in 循环的是索引

```js
Array.prototype.methods = function() {
  return this.length
}
let arr = [1, 2, 4, 5, 6, 7]
arr.name = "数组"
for (let index in arr) {
  console.log(index) //0,1,2,3,4,5,name,methods
}
```

#### for...in 遍历数组的缺点

- 1.index 索引为字符串型数字，不能直接进行几何运算
- 2.遍历顺序有可能不是按照实际数组的内部顺序
- 3.使用 for in 会遍历数组所有的可枚举属性，包括原型。例如上栗的原型方法 method 和 name 属性
  **所以 for in 更适合遍历对象，不要使用 for in 遍历数组。**

- for...of 循环的是值

```js
Array.prototype.method = function() {
  return this.length
}
let arr = [1, 2, 4, 5, 6, 7]
arr.name = "数组"
for (let value of arr) {
  console.log(value) //1,2,3,4,5,6,7
}
```

**for in 遍历的是数组的索引（即键名），而 for of 遍历的是数组元素值。**<br />
**for of 遍历的只是数组内的元素，而不包括数组的原型属性 methods 和索引 name**

### 循环对象

- for...in 循环的是键

```js
let obj = {
  name: "小明",
  age: 18,
}
Object.prototype.methods = function() {
  return this
}
obj.a = "a"
for (let k in obj) {
  console.log(k) //name,age,a,methods
}
```

- 1.for in 可以遍历到 obj 的原型方法 methods,如果不想遍历原型方法和属性的话，可以在循环内部判断一下,hasOwnPropery 方法可以判断某属性是否是该对象的实例属性

```js
let obj = {
  name: "小明",
  age: 18,
}
Object.prototype.methods = function() {
  return this
}
obj.a = "a"
for (let k in obj) {
  if (obj.hasOwnProperty(k)) {
    console.log(k) //name,age,a
  }
}
```

- for-of 循环不支持普通对象，但如果你想迭代一个对象的属性，你可以用 for-in 循环（这也是它的本职工作）或内建的 Object.keys()方法：

## 15.add(1)(2)(3)

```js
function add(a) {
  function sum(b) {
    a = a + b
    return sum
  }
  sum.toString = function() {
    return a
  }
  return sum
}
```

## 16.if(a == 1 && a ==2 && a == 3){}条件成立

```js
// 第一种
let a = {
  i: 0,
  toString() {
    return ++this.i
  },
}
if (a == 1 && a == 2 && a == 3) {
  console.log("条件成立")
}
// 第二种
var i = 0
Object.defineProperty(window, "a", {
  get() {
    return ++i
  },
})
if (a == 1 && a == 2 && a == 3) {
  console.log("条件成立")
}
```

## 17.多条件筛选

```js
let arr = [
  {
    age: 18,
    timer: 2018,
    local: "zh",
  },
  {
    age: 20,
    timer: 2018,
    local: "en",
  },
  {
    age: 18,
    timer: 2019,
    local: "zh",
  },
  {
    age: 21,
    timer: 2020,
    local: "zh",
  },
]

function filter(condition, data) {
  return data.filter((item) => {
    return Object.keys(condition).every((key) => {
      return String(item[key])
        .toLowerCase()
        .includes(
          String(condition[key])
            .trim()
            .toLowerCase()
        )
    })
  })
}
let condition = {
  age: 18,
  timer: 2018,
  local: "zh",
}
filter(condition, arr)
```

## 18.深拷贝

```js
function deepClone(target) {
  let result
  if (target instanceof RegExp) return new RegExp(target)
  if (target instanceof Date) return new Date(target)
  if (target === null || typeof target !== "object") {
    return target
  }
  if (Array.isArray(target)) {
    result = []
    for (let i = 0; i < target.length; i++) {
      result.push(deepClone(target[i]))
    }
  } else if (Object.prototype.toString.call(target) === "[object Object]") {
    result = {}
    for (let k in target) {
      result[k] = deepClone(target[k])
    }
  } else {
    result = target
  }
  return result
}
```

## 19.防抖/节流

- 防抖
  触发高频事件后，n 秒内只执行一次,如果 n 秒内高频事件再次触发，则重新计算时间

```js
function debounce(fn, awite) {
  let timer = null
  let context = this
  let args = arguments
  return function() {
    if (timer) clearInterval(timer)
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, awite)
  }
}
```

- 节流
  高频事件触发，但 n 秒内只会执行一次

```js
//时间戳版
function throttle(fn, wait) {
  let previous = 0
  return function() {
    let now = new Date().getTime()
    let context = this
    let args = arguments
    if (now - previous > wait) {
      fn.apply(context, args)
      previous = now
    }
  }
}

// 定时器版
function throttle(fn, awit) {
  let timer
  return function() {
    let context = this
    let args = arguments
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args)
        timer = null
      }, awit)
    }
  }
}
```

## 20.千分位

```js
function toThousands(num) {
  let arr = setNumber(num)
  let tmp = ""
  for (let i = 0; i < arr.length; i++) {
    tmp += arr[i]
    if ((i + 1) % 3 === 0 && i != arr.length - 1) {
      tmp += ","
    }
  }

  return setNumber(tmp).join("")
}
function setNumber(num) {
  return num
    .toString()
    .split("")
    .reverse()
}
```

## 21.数组随机排序

```js
let arr = [2, 3, 454, 34, 324, 32]
arr.sort(randomSort)
function randomSort(a, b) {
  return Math.random() > 0.5 ? -1 : 1
}
```

## 22.sleep 函数

```js
function sleep(delay) {
  let start = new Date().getTime()
  while (new Date().getTime() - start < delay) {
    continue
  }
}
```
