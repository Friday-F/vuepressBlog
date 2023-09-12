## 1. 数组扁平化
```js
let arr = [1,[2],[3,4],[5,[6]],7];

  // 1. 递归
  let flatten = function(arr){
    let res = [];
    for(let i = 0;i<arr.length;i++){
      if(Array.isArray(arr[i])){
        res = res.concat(flatten(arr[i]))
      }else{
        res.push(arr[i])
      }
    }
    return res;
  }
  // console.log(flatten(arr))
     
  // 2. reduce
  // 简化递归
  let flattenR = function(arr){
    return arr.reduce((pre,cur)=>{
      return pre.concat(Array.isArray(cur) ? flattenR(cur) : cur)
    },[])
  }

  // console.log(flattenR(arr))

  // 3. flat()
  // 参数：展开深度，默认是1，展开一层，如果层数不确定，填写Infinity代表多少层都展开
  let newArray = arr.flat(Infinity);
  // console.log(newArray)

  // 4. toString() , split()
  let newArrayToString = arr.toString().split(',').map(item=>+item);
  console.log(newArrayToString)
```
## 2. 伪数组转数组
```js
// 获取页面上的dom元素
let lis = document.querySelectorAll('li');
 console.log(lis)

  // 1. 展开运算符
  // const arr = [...lis]
  // console.log(arr)

  // 2. Array.prototype.slice.call()
  // const arr = Array.prototype.slice.call(lis)
  // console.log(arr)

  // 3. Array.prototype.concat.apply()
  const arr = Array.prototype.concat.apply([],lis)
  console.log(arr)
```
## 3. 数组去重
```js
let arr = [1,2,1,3,2,4,5,2,4];

  // 1. indexOf()
  // let noRepeat = function(arr){
  //   let newArray = [];
  //   for(let i = 0;i<arr.length;i++){
  //     if(newArray.indexOf(arr[i]) === -1){
  //       newArray.push(arr[i]);
  //     }
  //   }
  //   return newArray;
  // }
  // let newArr = noRepeat(arr);
  // console.log(newArr)
  
  // 2. reduce
  // let noRepeat = function(arr){
  //   return arr.reduce((pre,item)=>{
  //     return pre.includes(item) ? pre : pre.concat(item) 
  //   },[])
  // }
  // let newArr = noRepeat(arr);
  // console.log(newArr)

  // 3. new Set()
  // let newArr = [...new Set(arr)]
  // console.log(newArr)
  // console.log(Array.isArray(newArr))
  
  
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
## 4. 翻转数组
```js
let arr = [1,2,3,4,5];

  // 1. 收尾交换位置
  // let reverse = function(arr){
  //   注意：这里要length/2
  //   for(let i = 0;i<arr.length/2;i++){
  //     let tmp = arr[i];
  //     arr[i] = arr[arr.length-1-i];
  //     arr[arr.length-1-i] = tmp
  //   }
  //   return arr;
  // }
  // console.log(reverse(arr))

  // 2. 直接调用reverse()

  // console.log(arr.reverse())
```
## 5. 解析url
```js
// 解析url地址
  let url = 'https://www.baidu.com?a=1&b=2';
  let getUrl = function(url){
    let sub = url.substring(url.indexOf('?')+1);
    let params = sub.split('&')
    let res = {};
    for(let i = 0;i<params.length;i++){
      let item = params[i]
      let o = item.split('=');
      res[o[0]] = o[1]
    }
    return res;
  }
  let params = getUrl(url);
  console.log(params)
```
## 6.判断字符串出现最多的次数
```js
  let s = 'abswssabc';
  let fn = function (s) { 
    let max = s[0];
    let o = {}
    for(let i = 0;i<s.length;i++){
      let item = s[i];
      if(o[item]){
        o[item]++
      }else{
        o[item] = 1;
      }
      if(o[item] > o[max]){
        max = item;
      }
    }
    return max;
  }
  console.log(max)
```
## 7. ajax
```js
let ajax = function(options){
    let params = {
        method: options.type || 'get',
        url: options.url || '',
        data: options.data || {},
        success: options.success || function(){}
    }
    let xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");
    let str = '';
    for(let k in params.data){
        str+=`${k}=${params.data[k]}&`
    }
    str = str.substring(0,str.length-1)
    if(params.method === 'get'){
        xhr.open('get',`${params.url}?${str}`)
        xhr.send(null)
    }else if(params.method === 'post'){
        xhr.open('post',params.url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        xhr.send(str)
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            let res = xhr.responseText;
            options.success(res)
        }
    }
}
ajax({
    type: 'post',
    url: 'http://www.itcbc.com:3006/api/addbook',
    data: { bookname: 'ss', author: 'xx', publisher: 'uu', appkey: 'laotang' },
    success: function (res) {
        console.log(res);
    }
})
```
## 8.防抖
  - 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。函数防抖是某一段时间内只执行一次。
  -  search搜索联想，用户在不断输入值时，用防抖来节约请求资源。
  -  window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次
  ```js
  let debounce = function(fn,await){
    let timer = null;
    let _this = this;
    return function(){
      if(timer) clearTimeout(timer);
      timer = setTimeout(()=>{
        fn.apply(_this,arguments);
      },await)
    }
  }
  ```
## 9.节流
  -  规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。函数节流是间隔时间执行。 
  -  鼠标不断点击触发，mousedown(单位时间内只触发一次)
  - 监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断
  ```js
  // 定时器版
  let throttle = function (fn,await) {
      let timer = null;
      let _this = this;
      return function () {
        if(!timer){
          timer = setTimeout(() => {
            fn.call(_this,...arguments)
            timer = null;
          },await);
        }
      }
  }


  // 时间戳版
  let throttle = function(fn,awite){
      let previous = 0;
      return function(){
        let _this = this;
        let now = new Data().getTime();
        if(now - previous > awite){
            fn.apply(_this,arguments)
            previous = now;
        }
      }
  }
  ```
## 10.驼峰命名
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