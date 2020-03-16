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
## 2.常规判断
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
## 3.驼峰命名
```js
let str = 'get-element-by-id';
function fn(str){
    let arr = str.split('-');
    for(let i = 0;i<arr.length;i++){
        arr[i] = arr[i].charAt(0).toLocaleUpperCase() + arr[i].substr(1,arr[i].length-1)
    }
    return arr.join('')
}
fn(str)
```
## 4.解析url
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
## 5.判断字符串出现最多的次数 
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
## 6.数组去重
```js
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
```
## 7.原生AJAX
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
## 8.jQuery内部封装原理
::: tip jQuery内部封装原理
1.为了防止变量污染，将jQuert代码放在一个自调用函数中<br>
2.平时使用的$是jQuer对外暴露的一个工厂函数<br>
3.构造函数在jQuery内部叫init,并且将这个构造函数被添加到jQuery内部，当我们调用工厂函数的时候，其实是一个构造函数的实例<br>
4.jQuery为了让第三方能够对其进行拓展，所以把工厂函数的原型和构造函数的原型保持一致，这样只需暴露工厂函数，就能对其原型进行拓展<br>