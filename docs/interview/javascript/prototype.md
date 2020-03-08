
## 原型继承

```js
function Father(name,age){
    this.name = name;
    this.age = age;
}
Father.prototype.say = function(){
    return `我叫${this.name}`
}
function Son(){

}
Son.prototype = new Father('小明','18','男')
let s1 = new Son()
console.log(s1.say())
```
## call,apply继承

```js
function Father(name,age){
    this.name = name;
    this.age = age;
}
Father.prototype.say = function(){
    
}
function Son(name,age){
    Father.call(this,name,age)
}
let s1 = new Son('小红','18')
//复用不了原型上的方法
console.log(s1.say())
```
## 组合继承
```js
function Father(name,age){
    this.name = name;
    this.age = age;
}
Father.prototype.say = function(){
    return `我叫${this.name}`
}
function Son(name,age){
    Father.call(this,name,age)
}
Son.prototype = new Father()
let s1 = new Son('小明','18')
console.log(s1.say())
```
## 原型式继承
```js
let Father = {
    name:'小明',
    age:18
}
let s1 = Object.create(Father)
s1.name = '小红'
console.log(s1.__proto__ === father) true
console.log(s1.say())
```
## 寄生式继承
```js
function object(o){
    function F(){}
    F.prototype = o;
    return new F()
}
function Father(obj){
    let clone = object(obj);
    clone.say = function(){
        return `我叫${this.name}`
    }
    return clone
}
let s1 = {
    name:'小明',
    age:18,
}
let s2 = Father(s1)
console.log(s2.say())
```
## class继承
```js
 class Father{
    constructor(name,age){
        this.name = name;
        this.age = age
        this.sex = '女'
    }
    say(){
        return `我叫${this.name}`
    }
    saySex(){
        return `----${this.sex}-----`
    }
}
class Son extends Father{
    constructor(name,age,sex){
        super(name,age) //继承自父元素身上
        this.sex = sex
    }
    run(){
        // 通过super访问父元素原型身上的方法
        // super是指Father.prototype
        // 方法都是定义在原型身上，
        // 现在的this指向的是当前子元素的this
        return super.say() 
    }
    getFattr(){
        // 属性定义在父元素的身上，所以访问不到
        return super.name //undefined 属性定义在
    }
    getFsex(){
        // 子类在调用父类的构造函数时父类的原型指向子类，所以输出子类的值
        return super.saySex() //男
    }
    
}
let s1 = new Son('夏明',18,'男');
console.log(s1.run())
console.log(s1.getFattr()) //undefined
console.log(s1.getFsex())
```
::: tip es5和es6继承的区别
ES5的继承是通过prototype或构造函数机制来实现。

ES5的继承实质上是先创建子类的实例对象，然后再将父类的方法添加到this上(Parent.apply(this))。

ES6的继承机制实质上是先创建父类的实例对象this(所以必须先调用父类的super()方法)，然后再用子类的构造函数修改this。具体为ES6通过class关键字定义类，里面有构造方法，类之间通过extends关键字实现继承。子类必须在constructor方法中调用super方法，否则新建实例报错。因为子类没有自己的this对象，而是继承了父类的this对象，然后对其调用。如果不调用super方法，子类得不到this对象。

注意：super关键字指代父类的实例，即父类的this对象。在子类构造函数中，调用super后，才可使用this关键字，否则报错。
:::
