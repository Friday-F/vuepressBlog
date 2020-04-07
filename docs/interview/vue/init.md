## 1.MVVM的理解
- MVC
::: tip MVC
model+view+controller 用户操作会请求服务端路由，路由会调用对应的控制器来处理,控制器会获取数据。将结果返回给前端,页面重新渲染
:::
- MVVM
::: tip MVVM
mode+view+viewmode 传统的前端会将数据手动渲染到页面上,`MVVM`模式不需要用户收到操作`dom`元素,将数据绑定到`viewModel`层上，会自动将数据渲染到页面中，视图变化会通知`viewModel层`更新数据。`ViewModel`就是我们`MVVM`模式中的桥梁.
:::
## 2.Vue理解
- vue
::: tip vue
渐进性框架，是一种自底而上的增量开发设计
渐进性<br />
在声明式渲染(模板视图渲染)的基础上,可以通过增加组件系统(components),理由(vue-router),状态管理(vuex)来构建一个完整的框架<br />
声明式渲染和组件库是Vue的核心内容,而数据状态管理,路由,构架工具都有专门的独立方案解决<br />
'渐进式'是vue的提现方式，也是他的设计理念
:::
## 3.响应式数据原理
::: tip 响应式数据原理
1. 调用new observer的defaultReact通过递归给对象的每一个属性添加Object.defineProperty,并创建dep实例保存相关依赖
2. Dep实例保存一个sub数组，保存的依赖添加到数组中，更新依赖调用数组中的update方法
3. 依赖是一时watch实例，保存了数据变化时需要更新的操作，并且将自己放入全局中，读取数据时，触发数据的get，将自身收集到dep数组中
:::
<br />
<br />
<img src='./images/object.png' />

## 4.Vue中是如何检测数组变化?
::: tip Vue中是如何检测数组变化?
1. 使用函数劫持的方式，重写了数组的方法
2. `Vue`将`data`中的数组，进行了原型链重写。指向了自己定义的数组原型方法，这样当调用数组`api`时，可以通知依赖更新.如果数组中包含着引用类型。会对数组中的引用类型再次进行监控。
:::
<br />
<br />
<img src='./images/array.png' />

## 5.computed的特点
- 1.会有缓存，当依赖发生变化时，采取更新视图
## 6.computed和methods和watcher区别
### computed
1. 简便逻辑操作，
2. 执行时，只执行直接调用的变量
3. 有缓存，如果数据不进行更新，则不会从新触发计算，从而节约性能
4. 不便于操作异步
5. compouted默认不会先执行

### methods：
1. 无缓存，每次都会重新计算
2. 视图更新时都会从新计算

### watcher(一方改变，另一方跟着改变)
1. 代码复用性高
2.  便于处理异步
3. 混合使用
4. watch会先执行
## 7.生命周期
### 每个生命周期的用途
- `beforeCreate`
    -  在实例初始化之后，数据观测(data observer) 之前被调用。
- `created`
    - 实例已创建完成后调用,在这一步，实例已经完成以下配置:数据观测(observer)，属性和方法的运算，watch/event时间回调，这里没有`$el`
- `beforeMount`
    - 在挂在之前被调用，相关的render首次被调用
- `mounted`
    - `el`被创建的`vm.$el`所替代,并挂在到实例上去之后调用该钩子
- `beforeUpdate`
    - 数据更新时调用，发生在虚拟DOM重现渲染和打补丁之前
- `updated`
    - 由于数据更改导致虚拟DOM重新渲染和打补丁，在这之后会调用该钩子
- `beforeDestroy`
    - 实例销毁之前调用，在这一步，实例还可以完全使用
- `destroyed`
    - `Vue` 实例销毁后调用。调用后，`Vue` 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。
### 每个声明周期需要做的的事情
 - `created`
    - 实例已创建完成，可以进行一些数据和资源的请求
- `mounted`
    - 实例已创建完成,可以进行DOM操作
- `beforeUpdate`
    - 可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
- `updated`
    - 可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环。 该钩子在服务器端渲染期间不被调用
- `destroyed` 
    - 可以执行一些优化操作,清空定时器，解除绑定事件
<br />
<br />
<img src='./images/life.png' />
<br />
<br />
<br />
<br />
<img src='./images/life-data.png' />
## 8.v-show和v-if的区别
- `v-show` 只是切换当前`dom`的显示或者隐藏
- `v-if` 如果条件不成立不会渲染当前指令所在节点的`dom`元素
## 9.v-for和v-if
`v-for`比`v-if`的优先级要高，如果连用，给每个属性都添加，造成资源浪费
## 10.组件中的 `data`为什么是一个函数? 
1. 同一个组件被复用多次，会创建多个实例。
2. 这些实例用的是同一个构造函数，如果`data`是一个对象的话。那么所有组件都共享了同一个对象
3. 为了保证组件的数据独立性要求每个组件必须通过`data`函数返回一个对象作为组件的状态。
## 11.`Vue`组件如何通信?
1. 父子间通信  父->子通过`props`、子-> 父`$on、$emit`
2. 获取父子组件实例的方式`$parent、$children`
3. 在父组件中提供数据子组件进行消费 `Provide、inject`
4. `Ref`获取实例的方式调用组件的属性或者方法
5. `Event Bus` 实现跨组件通信
6. `Vuex `状态管理实现通信

## 12.`Vue`中常见性能优化

### 1.编码优化
1. 不要将所有的数据都放在data中，data中的数据都会增加getter和setter，会收集对应的watcher 
2. `vue` 在 v-for 时给每项元素绑定事件需要用事件代理
3. `SPA`页面采用keep-alive缓存组件
4. 拆分组件( 提高复用性、增加代码的可维护性,减少不必要的渲染  )
5. `v-if` 当值为false时内部指令不会执行,具有阻断功能，很多情况下使用v-if替代v-show
6. `key`保证唯一性 ( 默认`vue`会采用就地复用策略 )
7. `Object.freeze` 冻结数据 
8. 合理使用路由懒加载、异步组件
9. 尽量采用runtime运行时版本
10. 数据持久化的问题 （防抖、节流）

### 2.`Vue`加载性能优化:
1. 第三方模块按需导入 (`babel-plugin-component`) 

2. 滚动到可视区域动态加载  ( <a href='https://tangbc.github.io/vue-virtual-scroll-list' target='_blank'>https://tangbc.github.io/vue-virtual-scroll-list</a> )
3. 图片懒加载  (<a target='_blank' href='https://github.com/hilongjw/vue-lazyload.git'>https://github.com/hilongjw/vue-lazyload.git</a>)

### 3.用户体验
1. `app-skeleton`骨架屏
2. `app-shell`app壳
3. `pwa`
### 4.`SEO`优化：
1. 预渲染插件 `prerender-spa-plugin`
2. 服务端渲染`ssr`

### 5.打包优化:
1. 使用`cdn`的方式加载第三方模块 
2. 多线程打包 `happypack `
3. `splitChunks` 抽离公共文件 
4. `sourceMap`生成 

### 6.缓存，压缩
1. 客户端缓存、服务端缓存
2. 服务端`gzip`压缩
## 13.`Vue3.0`你知道有哪些改进?
1. `Vue3`采用了TS来编写
2. 支持 `Composition API `
3. `Vue3`中响应式数据原理改成`proxy`
4. ` vdom`的对比算法更新，只更新`vdom`的绑定了动态数据的部分