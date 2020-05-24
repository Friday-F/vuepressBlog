## 1.判断是否是数组
- Array.isArray()
```js
let arr = [];
Array.isArray(arr)
```
- instanceof
```js
let arr = [];
arr instanceof Array
```
- Object.prototype.toString.call()
```js
let arr = [];
Object.prototype.toString.call(arr) === '[object Array]'
```
## 2.伪数组转数组
```js
1. Array.prototype.slice.call(arr)
2. Array.prototype.concat.apply([],arr)
3. [...arr]
4. Array.from(arr)
```
## 3.二维数组
```js
let arr = [1,[2,3],4,[5,6]];

//1.普通循环 
function flatten(origin){
    let result = [];
    for(let i = 0; i< origin.length; i++) {
        let item = origin[i];
        if(Array.isArray(item)) {
            result = result.concat(flatten(item))
        } else {
            result.push(item);
        }
    }
    return result;
}
flatten(array)

//2..flat()
let result = arr.flat();

//3.toString()
let newArr = arr.toString().split(',').map(item=>Number(item))

//4.reduce
function fn(arr){
    return arr.reduce((res,next)=>{
        // return res.concat(Array.isArray(next) ? fn(next) : next)
        return res.concat(next)
    },[])
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
console.log('' == false) //true
console.log('' === false) //false
console.log(NaN == NaN) //false
console.log([] == false) //true
console.log([] === false) //false
```
## 5.驼峰命名
```js
let str = 'get-element-by-id';
function fn(str){
    let arr = str.split('-');
    for(let i = 1;i<arr.length;i++){
        arr[i] = arr[i].charAt(0).toLocaleUpperCase() + arr[i].substr(1,arr[i].length-1)
    }
    return arr.join('')
}
fn(str)
```
## 6.解析url
```js
let url = 'http://www.baidu.com?a=1&b=2&c=3';
function fn(url){
    let obj = {};
    if(/\?/.test(url)){
        let data = url.substr(url.indexOf('?')+1);
        let arr = data.split('&');
        for(let i = 0;i<arr.length;i++){
            let urlItem = arr[i];
            let item = urlItem.split('=');
            obj[item[0]] = item[1]
        }
    }
    return obj;
}
fn(url)
```
## 7.判断字符串出现最多的次数 
```js
let str = 'aabbbccdddeeee';
//循环
let obj = {};
for(let i = 0;i<str.length;i++){
    if(obj[str[i]]){
        obj[str[i]]+=1
    }else{
        obj[str[i]] = 1;
    }  
}
let maxStr = ''
for(let k in obj){
    if(maxStr < obj[k]){
        maxStr = obj[k]
    }
}

//reduce
let map = str.split('').reduce((t,v)=>{
    t[v] = t[v] ? ++t[v] : 1
    return t
},{})
```
## 8.数组去重
```js
//1
let arr = [1,2,2,3,4,5,3,1];
function fn(arr){
    let newArray = [];
    for(let i = 0;i<arr.length;i++){
        if(newArray.indexOf(arr[i])=== -1){
            newArray.push(arr[i])
        }
    }
    return newArray
}
fn(arr)

//new Set()
let newArray = [...new Set(arr)]

// 第三种方式
function noRepeat(arr){
    for(let i = 0;i<arr.length-1;i++){
        let item = arr[i];
        // 跟当前项的后面的数比较
        let args = arr.slice(i+1)
        // 如果后面有当前项，表示有重复的
        if(args.indexOf(item) !== -1){
            // 将重复的这一项替换成最后一项
            arr[i] = arr[arr.length - 1];
            // 长度减1
            arr.length--
            //同时开始从0循环
            i--
        }
    }
    return arr;
}
```
## 9.排序
### 冒泡排序
- 两两比较，外层循环轮数，内层循环每轮循环的次数
```js
//一轮轮比较，每一轮都从第一项开始，拿出当前项和后一项进行比较，当前项a如果大于后一项b，就交换位置
// 最大的轮数 arr.length - 1 
// 每轮最大次数： arr.length - 1 - i 不用跟自己比较，把之前比较的给排除掉
function sort(arr){
    // 外层控制比较的轮数
    for(let i = 0;i<arr.length-1;i++){
        let isFlag = true;
        // 内层控制每一轮比较的次数
        for(let j = 0;j<arr.length-1-i;j++){  //每一轮都会比较出一个最大值，然后后一轮没有必要再比较了，所以没比较一轮，就少比较一次。。。
            if(arr[j] > arr[j+1]){
                [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
                isFlag = false
            }
        }
        if(isFlag){
            break;
        }
    }
    return arr;
}
```
### 插入排序
```js
function insert(arr){
    // 拿出默认一张牌
    let tmp = arr[0]
    let newArr = [];
    newArr.push(tmp)
    for(let i = 1;i<arr.length;i++){
        // 抓到的新牌
        let a = arr[i];
        // 从后往前比较
        for(let j = newArr.length-1;j>=0;j--){
            // 手里的牌
            let b = newArr[j]
            // 如果抓到的牌比手里的牌大
            if(a > b){
                // 放到当前的牌的前面
                newArr.splice(j+1,0,a)
                break;
            }
            // 如果没有比手里的牌都小，直接放到最前面
            if(j == 0){
                newArr.unshift(a)
            }
        }
    }
    return newArr
}
```
### 快速排序
```js
function quick(arr){
    if(arr.length <= 1){
        return arr
    }
    // 寻找中间项
    let middleIndex =  Math.floor(arr.length / 2)
    let middleVal = arr.splice(middleIndex,1)[0];
    let leftArr = [];
    let rightArr = [];
    for(let i = 0;i<arr.length;i++){
        let item = arr[i];
        if(item<middleVal){
            leftArr.push(item)
        }else{
            rightArr.push(item)
        }
    }
    return quick(leftArr).concat(middleVal,quick(rightArr))
}
```

## 10.原生AJAX
```js
    function ajax(obj = {}){
        let option = {
            type:"get",
            url:"",
            data:{},
            success:function(){
                
            }
        }
        option = Object.assign({},option,obj);
        let xhr = new XMLHttpRequest || new ActiveXObject('Microsoft.XMLHTTP');
        let str = '';
        if(obj.data){
            for(let k in option.data){
                str+=`${k}=${option.data[k]}&`
            }
            str = str.substr(0,str.length - 1)
        }
        if(option.type === 'get'){
            xhr.open(option.type,option.url+'?'+str);
            xhr.send(null)
        }else if(option.type === 'post'){
            xhr.open(option.type,option.url);
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xhr.send(str)
        }
        xhr.onreadystatechange = function () { 
            if(xhr.readyState == 4 && xhr.status === 200){
                let data = xhr.responseText;
                option.success(data)
            }
        }   
    }    
```
## 11.jQuery内部封装原理
::: tip jQuery内部封装原理
1.为了防止变量污染，将jQuert代码放在一个自调用函数中<br>
2.平时使用的$是jQuer对外暴露的一个工厂函数<br>
3.构造函数在jQuery内部叫init,并且将这个构造函数被添加到jQuery内部，当我们调用工厂函数的时候，其实是一个构造函数的实例<br>
4.jQuery为了让第三方能够对其进行拓展，所以把工厂函数的原型和构造函数的原型保持一致，这样只需暴露工厂函数，就能对其原型进行拓展<br>
:::

## 12.instanceof手动实现
```js
    let instance_of = function(L,R){
        let S = L.__proto__;
        let P = R.prototype;
        while(true){
            if(S == null){
                return false
            }else if(S == P){
                return true
            }
            S = S.__proto__
        }
    }
    console.log(instance_of([], Array)) // true
    console.log(instance_of([], String)) // false

```
## 13.map手动实现
```js
    Array.prototype.meMap = function(fn,contxt){
        let arr = this;
        let result = [];
        for(let i = 0;i<arr.length;i++){
            let item = fn.call(contxt,arr[i],i,arr)
            result.push(item)
        }
        return result;
    }
```
## 14.翻转字符串
```js
let str = 'abcde'
//1.
let newStr = arr.split('').reverse().join('');
//2.
    function reverse(str){
        let arr = str.split('');
        for(let i = 0;i<arr.length/2;i++){
            let tmp = arr[i]
            arr[i] = arr[arr.length-1-i];
            arr[arr.length-1-i] = tmp
        }
        return arr.join('')
    }
    reverse(str)
```