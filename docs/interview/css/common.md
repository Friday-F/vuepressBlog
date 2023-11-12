## 1. 盒子模型
  1. 标准盒子模型 盒子的宽度指 width 是指内容的宽度，通过box-sizing:content-box;(默认值)
  2. 怪异盒子模型 盒子的宽度指 width是指 内容+padding + border的总和，通过box-sizing:border-box;
## 2. BFC
  - 块级格式化上下文，独立渲染区域
  -  触发：
      - 浮动（除float：none以外）
      - 定位（absolute，fixed）
      - display 为以下其中之一的值 inline-block，table-cell，table-caption； 
      - overflow 除了 visible 以外的值（hidden，auto，scroll）；
  - 作用
      - 浮动元素导致父元素内容塌陷，通过给父盒子添加display: inline-block;
      - margin塌陷
## 3. 布局
  - 圣杯布局
  ```html
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    *{
      padding: 0;
      margin: 0;
    }
    /* 
      1. 给父元素设置padding
      2. 左右两侧分别绝对定位
    */
    .container{
      position: relative;
      width: 100%;
      height: 200px;
      padding: 0 100px;
      box-sizing: border-box;
    }
    .center{
      width: 100%;
      height: 100%;
      background: red;
    }
    .left{
      position: absolute;
      top:0;
      left: 0;
      width: 100px;
      height: 100%;
      background: pink;
    }
    .right{
      position: absolute;
      top:0;
      right: 0;
      width: 100px;
      height: 100%;
      background: lightblue;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="center">中间内容</div>
    <div class="left">左侧</div>
    <div class="right">右侧</div>
  </div>
</body>
</html>
  ```
  - 双飞翼布局
  ```html
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    *{
      padding: 0;
      margin: 0;
    }
    /* 双飞翼布局
      1. 将中的盒子里面新增一个inner
      2、设置left,center,right浮动
      3、设置left margin-left: -100%(注意)
      4. 设置right margin-left: -自身宽度
      5. 设置inner margin-left: left盒子宽度; margin-right: right盒子的宽度
    
    
    */
    .container{
      width: 100%;
      height: 200px;
    }
    .center{
      float: left;
      width: 100%;
      height: 100%;
      background: red;
    }
    .inner{
      margin-left: 100px;
      margin-right: 100px;
     
    }
    .left{
      float: left;
      margin-left: -100%;
      width: 100px;
      height: 100%;
      background: pink;
    }
    .right{
      float: left;
     margin-left: -100px;
      width: 100px;
      height: 100%;
      background: lightblue;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="center">
       <div class="inner">中间</div>
    </div>
    <div class="left">左侧</div>
    <div class="right">右侧</div>
  </div>
</body>
</html>
  ```
  - 相同点
      - 三列布局，中间自适应
      - 都是把主列放在文档流最前面，使主列优先加载。
  - 不同点：
      - 圣杯布局是通过给父元素设置padding值，在通过两侧盒子设置绝对定位
      - 双飞翼布局是通过给中间的元素添加一层嵌套，然后在通过浮动，左右两侧盒子设置负margin值，中间盒子添加margin值来实现的

## 4. 移动端布局方案
  - flex
      - <a href='https://blog.csdn.net/qq_46048008/article/details/126406331' target='_blank'>flex</a>
      - flex:1 详细描述
  - rem
      - 什么是rem
        - 是相对于根元素（html）字体大小的单位
      - rem适配的原理
        - 核心原理：百分比布局可实现响应式布局，而rem相当于百分比局部
        - 实现手段：动态获取视口的宽度，除以一个固定的数n，得到rem的值。表达式为 rem = width / n 通过此方法rem是width的n等分
      - 插件：
        - flexible
        ```js
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flexible.js/0.3.2/flexible.min.js"></script>
        ```
        - postcss-pxtorem
        ```js
        module.exports = {
          plugins: {
            'postcss-pxtorem': {
              rootValue: 37.5,  // 该值应与 flexible.js 中设置的 remUnit 值相同
              propList: ['*'],
              minPixelValue: 2  // 设置最小的转换尺寸，如果设置为 1 则会转换所有大小的像素值
            }
          }
        }
        ```
        - 注意：以上 rootValue 的设置值是基于设计稿的尺寸。例如，如果你的设计稿是 750px，那么你设置 rootValue: 75。如果你的设计稿是 375px，那么你设置 rootValue: 37.5。这样设置后，设计稿上的 1px 就对应于 1/100rem，方便转换。
      - 代码
      ```js
       function change() {
          var width = document.documentElement.clientWidth
        　　　　　　// 设置根元素字体大小。此时为宽的10等分
          document.documentElement.style.fontSize = width / 7.5 + 'px'
            }
        change()
        // 窗口事件
        window.onresize = function () {
            change()
        }
        // 横竖屏事件
        window.onorientationchange = function () {
            change()
        }
      ```
  - 百分比
  - vw / vh

  ## 5. 居中

  ```html
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    *{
      padding: 0;
      margin: 0;
    }
    .box{
     
      width: 200px;
      height: 200px;
      background: lightblue;
    }
    .center{
      width: 100px;
      height: 100px;
      background: lightcoral;
    }

    /* 定位 1
      1、父元素设置相对定位
      2. 子元素设置绝对定位，
        四个方向都为0 
        margin: auto 
    */
    /* .box{
       position: relative;
    }
    .center{
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    } */

    /* 定位 2
      1、父元素设置相对定位
      2. 子元素设置绝对定位，
        top: 50%, 
        left: 50%,
        transform: translate(-50%, -50%);
      */
    /* .box{
       position: relative;
    }
    .center{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    } */

    /* flex 
      1. 父元素设置 display: flex;
        主轴居中
        交叉轴居中
    
    */
    /* .box{
      display: flex;
      justify-content: center;
      align-items: center;
    } */

  </style>
</head>
<body>
    <div class="box">
      <div class="center"></div>
    </div>
</body>
</html>
  ```

  ## 6. 移动适配问题
  - iPhoneX 系列手机适配问题
      - 设置 meta 标签 viewport-fit为 cover，使内容能够填充所有区域，并对 iPhone X 进行特殊适配。
      ```css
      <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
      ```
      - 利用 WebKit 的新 CSS 函数 constant() 和 env()，以及四个预定义的常量：safe-area-inset-left, safe-area-inset-right, safe-area-inset-top 和 safe-area-inset-bottom，来设置安全区域。
      ```css
      body {
        padding-top: constant(safe-area-inset-top);
        padding-top: env(safe-area-inset-top);
        padding-left: constant(safe-area-inset-left);
        padding-left: env(safe-area-inset-left);
        padding-right: constant(safe-area-inset-right);
        padding-right: env(safe-area-inset-right);
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
      }
      ```   
  - 1px问题
    - 现象：在 H5 页面中，可能需要设置边框宽度为 1px，但在 Retina 屏幕上，1px 可能会看起来比实际要粗。
    - 原因：这是因为移动设备的物理像素密度与 CSS 像素的比例（设备像素比）导致的。
    - 解决：利用伪元素 + 定位 +  scale 来实现 0.5px 的效果。
      - 伪元素绝对定位：position: absolute;
      - 与父元素左上角对齐：left:0;top:0;
      - 宽度高度为原来的两倍： width: 200%;，height: 200%;
      - 设置边框
      - 缩放0.5：transform: scale(0.5);
      - 以左上角为中心：transform-origin: left top ;   
    ```css
      .box{
        width: 100px;
        height: 100px;
        background: lightblue;
        position: relative;
      }
      .box::after{
        content: "";
        position: absolute;
        top:0;
        left: 0;
        width: 200%;
        height: 200%;
        border: 1px solid lightcoral;
        transform: scale(0.5);
        transform-origin: left top ;
      }
    ```
## 7. link style @import及三者的区别
  - 加载顺序的差别
    - 当一个页面被加载的时候，link引用的CSS会同时被加载
    - 而@import引用的CSS会等到页面全部被下载完再被加载
    - 有时候浏览用@import加载CSS的页面时，可能会出现闪烁的情况
  - 加载内容的区别
    - @import只能导入样式文件
    - link不仅可以引入样式，还可以引入js文件
    - style标签，它是定义在当前页面的样式