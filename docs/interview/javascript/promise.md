### Promise设计思想
- 所有异步任务都返回一个 Promise 实例。Promise 实例有一个then方法，用来指定下一步的回调函数。

### Promise作用
- Promise 对象起到代理作用，充当异步操作与回调函数之间的中介，使得异步操作具备同步操作的接口。

### Promise好处
- 把执行代码和处理代码分离开，使异步操作逻辑更加清晰。

### Promise状态
#### Promise对象代表一个异步操作，有三种状态：
- 初始状态：pending
- 操作成功：fulfilled
- 操作失败：rejected

### Promise特点
- 对象的状态不受外界影响：只有异步操作的结果可以决定当前是哪一种状态，其他操作都不会影响状态改变
- 一旦状态改变，就不会再变

### Promise优缺点
- 优点
    - 可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数
    - 对象提供统一的接口，使得控制异步操作更加容易
- 缺点
    - 无法取消 Promise，一旦新建它就会立即执行，无法中途取消
    - 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部
    - 当处于Pending状态时，无法得知目前进展到哪一个阶段
### Promise 代码实现
```js
/**
 * Promise 实现 遵循promise/A+规范
 * Promise/A+规范译文:
 * https://promisesaplus.com/
 */

let PENDING = 'pending'
let RESOLVED = 'resolved';
let REJECTED = 'rejected'
/**
 * resolve中的值几种情况：
 * 1.普通值
 * 2.promise对象
 * 3.thenable对象/函数
 */

/**
 * 对resolve 进行改造增强 针对resolve中不同值情况 进行处理
 * @param  {promise} promise2 promise1.then方法返回的新的promise对象
 * @param  {[type]} x         promise1中onrResolved的返回值
 * @param  {[type]} resolve   promise2的resolve方法
 * @param  {[type]} reject    promise2的reject方法
 */

// 用来查看x的是普通值还是一个promise
function resolvePromise(promise2,x,resolve,reject){
    // 如果promise2 和返回的是值x是同一个，不要等待，直接报错即可
    if(promise2 === x){
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    }
    // 如果x的值是一个复杂数据类型对象或者函数的话
    if(typeof x === 'object' && x !== null || typeof x == 'function'){
        let called;
        try {
            // 看一看这个对象或者函数身上有没有then方法
            let then = x.then;  //取到then,有可能这个then是通过Object.defineProperty添加的
            if(typeof then === 'function'){ //如果then是一个函数，认为他是一个promise
                then.call(x,y=>{ //这个y有可能还是一个promise,需要进行递归，直到解析成一个普通的值
                    if(called){
                        return
                    }
                    called = true
                    resolvePromise(promise2,y,resolve,reject) //采用promise的成功结果，向下传递
                },r=>{
                    if(called){
                        return
                    }
                    called = true
                    reject(r) ////采用promise的失败结果，向下传递
                })
            }else{ //如果没有then，说明是一个普通的对象，直接成功返回
                resolve(x)
            }
        } catch (error) {
            if(called){
                return
            } 
            called = true
            reject(error )
        }

    }else{
        // 如果是一个简单数据类型，直接将值x返回 
        resolve(x)
    }
}
class Promise{
    constructor(executor){
        this.value = undefined;  // resolved状态时 返回的信息
        this.reason = undefined; // rejected状态时 拒绝的原因
        this.state = PENDING; // 初始状态
        this.onResolvedCallbacks = []; // 存储resolved状态对应的onFulfilled函数
        this.onRejectedCallbacks = []; // 存储rejected状态对应的onRejected函数
        let resolve = (value)=>{
            if(this.state === PENDING){
                this.state = RESOLVED;
                this.value = value;
                this.onResolvedCallbacks.forEach(c=>c())
            }
            
        }
        let reject = (reason)=>{
            if(this.state === PENDING){
                this.state = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(c=>c())
            }
        }
        try {
            executor(resolve,reject)
        } catch (error) {
            reject(error)
        }   
        
    }
    /**
     * [注册resolved状态/rejected状态对应的回调函数]
     * @param  {function} onFulfilled resolved状态时 执行的函数
     * @param  {function} onRejected  rejected状态时 执行的函数
     * @return {function} newPromsie  返回一个新的promise对象
     */
    then(onfulfilled,onrejected){
        // onfulfilled 和 onrejected可以是可选参数
        onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : data=>data
        onrejected = typeof onrejected === 'function' ? onrejected : err=>{
            throw err
        }
        // 为了可以一直.then下去，我们创建一个新的promise，并返回 
        let promise2 = new Promise((resolve,reject)=>{
            if(this.state === RESOLVED){
                // 为什么要使用setTimeout,因为添加一个宏观任务才这时候才能拿到promise2
                setTimeout(()=>{
                    try {
                        // 拿到当前的返回结果
                        let x = onfulfilled(this.value);
                        resolvePromise(promise2,x,resolve,reject)
                       
                    } catch (error) {
                        reject(error)
                    }
                    
                },0)
            }
            if(this.state === REJECTED){
                setTimeout(()=>{
                    try {
                        let x = onrejected(this.reason)
                        resolvePromise(promise2,x,resolve,reject)
                    } catch (error) {
                        reject(error)
                    }
                    
                },0)
            }
            if(this.state === PENDING){
                this.onResolvedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = onfulfilled(this.value)
                            resolvePromise(promise2,x,resolve,reject)
                        }catch(error){
                            reject(error)
                        }
                        
                    })
                    
                })
                this.onRejectedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try {
                            let x = onrejected(this.reason)
                            resolvePromise(promise2,x,resolve,reject)
                        } catch (error) {
                            reject(error)
                        }
                        
                    })
                    
                })
            }
        })
        return promise2
    }
    /**
     * Promise.all Promise进行并行处理
     * 参数: promise对象组成的数组作为参数
     * 返回值: 返回一个Promise实例
     * 当这个数组里的所有promise对象全部变为resolve状态的时候，才会resolve。
     */
    all(promises){
        return new Promise((resolve,reject)=>{
            let done = gen(promises.length,resolve)
            for(let i = 0;i<promises.length;i++){
                let item = promises[i];
                if(isPromise(item)){
                    item.then(val=>{
                        done(i,val)
                    },reject)
                }else{
                    done(i,item)
                }
                
            }
        })
        function gen(length,resolve){
            let result = [];
            let index = 0;
            return function(i,val){
                result[i] = val;
                index++
                if(index === length){
                    resolve(result)
                }
            }
        }
        function isPromise(item){
            if(typeof item === 'object' && item !== null || typeof item === 'function'){
                return true;
            }else{
                return false
            }
        }
    }
        
    catch(onrejected){
        return this.then(null,onrejected)
    }
}
module.exports = Promise;
```
### Promise测试
- 全局安装 npm install -g promises-aplus-tests
- promises-aplus-tests filename
```js
Promise.defer = Promise.deferred = function(){
    let dfd = {}
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}
```