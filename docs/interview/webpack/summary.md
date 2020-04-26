# webpack
## 1. 原理简述
### 1.核心概念
javascript的模块**打包工具**(model bundler),通过分析各个模块中间的依赖，最终将代码打包成一份或者多份代码包(bundler),供HTML直接使用，实际上webpack仅仅提供了**打包功能**和**文件处理机制**,然后通过生态的各种loader和plugin对代码进行预编译和打包.因此webpack具有很高的拓展性，能更好的发挥社区的力量
- Entry:入口文件，webpack从该文件开始进行分析编译
- Output:出口路径，打包后创建bundler的文件路径和文件名
- Module:模块，在webpack中任何一个文件都可以看成模块,会根据配置的不同loader进行加载和打包
- Chunk:代码块，可以根据配置将文件打包成一个或者多个代码块，以便按需加载提高性能
- Loader:模块加载器,将各个类型的文件加载和转换
- Plugin:拓展插件,可以通过webpack相应的事件钩子,介入到打包环境中的任意环节，对代码进行按需修改

### 2.工作流程(加载-编译-输出)
- 读取配置文件，按照命令**初始化**参数，创建compiler对象
- 调用插件的apply方法**挂载插件**进行监听，然后从入口文件开始编译
- 按照文件类型，调用相应的的loader对模板进行编译,并在合适的时机触发相应的事件，调用plugin执行，最后在根据模块**依赖查找**所依赖的模块，递归执行第三步
- 将编译后的代码打包成一个个的代码块，并按依赖和配置确定**输出内容**，这个步骤扔可以通过plugin进行文件修改
- 最后通过output把文件一一写入到指定文件中，完成打包过程
## 2.loader
由于webpack是基于Node,因此webpack只能识别js代码，那html/css/图片等类型的文件则无法加载，因此需要对**不同格式文件转换器**
```js
module.exports = function(htmlSource) {
	// 返回处理后的代码字符串
	// 删除 html 文件中的所有注释
	return htmlSource.replace(/<!--[\w\W]*?-->/g, '')
}
```
当然，实际的 Loader 不会这么简单，通常是需要将代码进行分析，构建 AST (抽象语法树)， 遍历进行定向的修改后，再重新生成新的代码字符串
Babel-loader 会执行以下步骤:
- babylon 将 ES6/ES7 代码解析成 AST
- babel-traverse 对 AST 进行遍历转译，得到新的 AST
- 新 AST 通过 babel-generator 转换成 ES5
### 1.loader的特性
- 链式传递 按照配置时相反的顺序链式执行
- 基于Node环境，拥有较高的权限，对文件的增删改查
- 可同步也可异步
### 2.常用loader
- file-loader:加载文件资源，如字体/图片等，具有移动/复制/命名等功能
- url-loader:通常用于加载图片，对小的图片转换成Date url，减少请求
- babel-loader:加载js/jsx,将ES6/ES7转成es5，兼容性问题
- ts-loader:加载ts/tsx，编译typescript
- style-loader:将css已style标签的形式插入到HTML中
- css-loader:分析@import和url(),引入css和对应的资源
- less-loader/sass-loader:css预处理器
### 3.编写原则
- 单一原则:一个loader只做一件事
- 链式调用：webpack只会按照顺序链式调用每个loader
- 统一原则:遵循 Webpack 制定的设计规则和结构，输入与输出均为字符串，各个 Loader 完全独立，即插即用；
## 3.Plugin
插件系统是webpack成功的一个关键因素,在编译的整个生命周期中，webpack会触发相应的钩子,plugin可以监听这些事件,根据需求在相应的时间点对打包内容进行定向修改
- 一个简单的plugin
```js
class Plugin{
  	// 注册插件时，会调用 apply 方法
  	// apply 方法接收 compiler 对象
  	// 通过 compiler 上提供的 Api，可以对事件进行监听，执行相应的操作
  	apply(compiler){
  		// compilation 是监听每次编译循环
  		// 每次文件变化，都会生成新的 compilation 对象并触发该事件
    	compiler.plugin('compilation',function(compilation) {})
  	}
}
```
- 注册插件
```js
// webpack.config.js
module.export = {
	plugins:[
		new Plugin(options),
	]
}
```
### 1.事件流机制
webpack就像工厂中的流水线，经过loader和plugin处理，最后进输出结果
- 通过链式调用串起一个个loader
- 通过事件流机制,让plugin可以插入到整个生产过程中的每一个步骤
webpack事件流编程范式的核心是基础类Tapabel,是一种观察者模式的实现事件的订阅与广播
```js
const { SyncHook } = require("tapable")

const hook = new SyncHook(['arg'])

// 订阅
hook.tap('event', (arg) => {
	// 'event-hook'
	console.log(arg)
})

// 广播
hook.call('event-hook')
```
webpack中最重要的类Compiler和Compilation都继承自Tapable,也拥有这样的事件流机制
- Compiler:可以简单的理解为webpack的实例,它包含了webpack中所有的配置信息，如option,loader和plugin等信息,全局唯一，只有在启动时完成初始化创建,随着声明周期逐一传递
- Compilation:可以成为编译实例,当编译文件改变时,webpack可以创建一个新的compilation对象,开始新的一次编译。他包含了当前输入资源，输出资源，变化文件等，同时通过它提供的api，可以监听每次编译过程中触发的事件钩子
- 区别
1. Compiler 全局唯一，且从启动生存到结束；
2. Compilation 对应每次编译，每轮编译循环均会重新创建；
### 2.常用的plugin
- UglifyJsPlugin: 压缩、混淆代码；
- CommonsChunkPlugin: 代码分割；
- ProvidePlugin: 自动加载模块；
- html-webpack-plugin: 加载 html 文件，并引入 css / js 文件；
- extract-text-webpack-plugin / mini-css-extract-plugin: 抽离样式，生成 css 文件；
- DefinePlugin: 定义全局变量；
- optimize-css-assets-webpack-plugin: CSS 代码去重；
- webpack-bundle-analyzer: 代码分析；
- compression-webpack-plugin: 使用 gzip 压缩 js 和 css；
- happypack: 使用多进程，加速代码构建；
- EnvironmentPlugin: 定义环境变量；


作者：郭东东<br />
链接：<a href='https://juejin.im/post/5cc26dfef265da037b611738' target="_blank">https://juejin.im/post/5cc26dfef265da037b611738</a>




