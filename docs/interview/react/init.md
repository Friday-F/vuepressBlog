# React 18 基础

## 1. jsx 基础语法

```js
const test = "学习jsx语法";
const fn = function() {
  return "实现函数调用";
};
const flag = false;
function App() {
  return (
    <div className="App">
      <p>{`基本使用:${test}`}</p>
      <p>函数调用:{fn()}</p>
      <p>使用js方法:{new Date().getDay()}</p>
      <p style={{ color: "red" }}>设置字体颜色</p>
      <p>{flag ? true : false}</p>
    </div>
  );
}
```

## 2.使用 map 渲染列表

```js
let list = [
  {
    name: "Vue",
    id: "10001",
  },
  {
    name: "React",
    id: "10002",
  },
  {
    name: "Angule",
    id: "10003",
  },
];
function App() {
  return (
    <div>
      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

## 3.条件渲染

```js
let flag = 1;
let hanlderFlag = function(flag) {
  if (flag === 1) {
    return <div>多图</div>;
  } else if (flag === 2) {
    return <div>多图</div>;
  } else {
    return <div>无图</div>;
  }
};
function App() {
  return <div>{hanlderFlag(9)}</div>;
}
```

## 4.事件绑定

```js
// 普通绑定事件;
let hanlderBtn = function() {
  console.log("普通绑定事件");
};
// 传递事件参数e
let handerEvent = function(e) {
  console.log(e);
};

// 传递参数
let hanlderName = function(e, name) {
  console.log(e, name);
};

function App() {
  return (
    <div>
      <button onClick={hanlderBtn}>普通绑定事件</button>
      <button onClick={(e) => handerEvent(e)}>传递事件参数</button>
      <button onClick={(e) => hanlderName(e, "小明")}>传递参数</button>
    </div>
  );
}
```

## 5.组件的基础使用

**组件就是一个首字母大写的函数**

```js
function Button() {
  return <button onClick={() => hanlderClick()}>点击按钮组件</button>;
}
function hanlderClick() {
  console.log("点击按钮组件事件");
}

function App() {
  return (
    <div>
      {/* 组件的使用 */}
      <Button></Button>
    </div>
  );
}
```

## 6.useState 使用

1. 使用 useState 可以声明一个状态变量，返回的是一个数组
2. 用 useState 声明的变量，是数据影响视图的

3. 数组的第一项是一个初始值
4. 数组的第二项是改变初始值的方法

**注意：修改对象规则，不能直接去修改数据，而是必须通过我们声明的修改的函数用一个全新的对象来进行修改**

```js
// 首先先从 react 导入 useState
import { useState } from "react";

function App() {
  // useState 中的值就是声明变量的初始值

  let [cont, setCont] = useState(0);

  // 声明一个对象
  let [form, setForm] = useState({
    name: "小明",
    age: 18,
  });
  // 声明一个函数，用来修改 cont 的值
  let hanlderAdd = (num) => {
    // 错误的写法，不能直接通过 cont+=num
    // cont+=num
    // 只能通过我们传入的新的对象去进行修改
    setCont((cont += num));
    console.log(cont);
  };
  let hanlderDel = (num) => {
    setCont((cont -= num));
    console.log(cont);
  };
  // 更改 form 的 name 属性
  let changeName = (name) => {
    // 必须要传入一个新的对象，而不能直接改变 form 身上的属性值
    setForm({
      ...form,
      name,
    });
    console.log(form);
  };
  return (
    <div>
      <p>{cont}</p>
      <button onClick={() => hanlderAdd(2)}>自增</button>
      <button onClick={() => hanlderDel(1)}>自减</button>
      <p>{form.name}</p>
      <button onClick={() => changeName("jack")}>更改 form 的 name 属性</button>
    </div>
  );
}
```

## 7.样式的使用

1. 行内样式，如果 font-size 需要使用 fontSize 驼峰命名的方式
2. 通过 className 用来绑定类名的方式

```js
import "./index.css";
let style = {
  color: "lightblue",
  fontSize: "40px",
};
function App() {
  return (
    <div>
      {/* 行内样式的方式 */}
      <p style={{ color: "red", fontSize: "40px" }}>你好</p>
      {/* 也可以将绑定的行内样式提取出来，通过变量引用 */}
      <p style={style}>我好</p>
      {/* 通过className用来绑定类名 */}
      <p className="box">通过className用来绑定类名</p>
    </div>
  );
}
```

## 9.表单绑定

```js
import { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const hanlderChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <input type="text" value={value} onChange={(e) => hanlderChange(e)} />
    </div>
  );
}
```

## 10. 获取 dom

1. useRef 生成 dom 对象绑定到对应的标签上
2. 通过 ref 去绑定 dom 元素
3. 通过声明的元素的.current 获取 dom 元素

```js
import { useRef } from "react";

function App() {
  // useRef生成dom对象绑定到对应的标签上
  // 默认值为null
  const dom = useRef(null);

  const getDom = () => {
    // 通过current属性
    console.log(dom.current);
  };
  return (
    <div>
      {/* 通过ref进行绑定 */}
      <p ref={dom}>获取p标签的dom元素</p>
      <button onClick={() => getDom()}>获取dom元素</button>
    </div>
  );
}
```

## 11.父子组件传值

1. 通过给父组件标签添加属性
2. 子组件通过 props 获取父组件的数据
3. 我们把内容嵌套在子组件标签内部时，子组件会自动在名为 children 的 props 属性中接收该内容

### 子组件更改父组件的值

**通过子组件调用父组件中的函数，去修改**

1. 将更改的函数通过进行传递
2. 在子组件去调用传递过得函数

```js
// 父组件
import Son from "./props/son";
import { useState } from "react";
function App() {
  let [name, updateName] = useState("小明");
  let changeName = (val) => {
    updateName(val);
  };
  return (
    <div>
      <h2>父组件</h2>
      <p>{name}</p>
      <Son name={name} onChangeName={changeName}>
        <span>在子组件内部嵌套内容</span>
      </Son>
      {/* <button onClick={() => changeName()}>
        父组件去更改父组件的值，传过去的子组件也会值也会变
      </button> */}
    </div>
  );
}

// 子组件
import { useState } from "react";
function Son(props) {
  let { name, children, onChangeName } = props;
  // let [childName, changeChildName] = useState(name);
  // 通过props.children拿到子组件嵌套的内容
  let changeParent = () => {
    // 调用父组件传递过来的方法
    onChangeName("子组件去更改父组件的值");
  };
  return (
    <div>
      <h2>子组件</h2>
      <p>通过props接受父组件的数据:{name}</p>
      <p>{children}</p>
      <button onClick={() => changeParent()}>子组件更改父组件的值</button>
    </div>
  );
}
export default Son;
```

## 12.兄弟组件传值

1. 借助'状态提升'机制，通过父组件进行兄弟组件通信的方式

- 兄弟 A 组件先通过把数据传递给父组件
- 父组件拿到数据后，再将数据传递给兄弟组件 B

```js
// 父组件
import Ason from "./a";
import Bson from "./b";

import { useState } from "react";

function App() {
  const [name, changeName] = useState("");
  let onChangeName = (val) => {
    console.log(val);
    changeName(val);
  };
  return (
    <div>
      <h2>父组件</h2>
      <Ason onChangeName={onChangeName}></Ason>
      <Bson name={name}></Bson>
    </div>
  );
}

// 组件A
import { useState } from "react";

function Ason(props) {
  const { onChangeName } = props;
  const [name, changeName] = useState("小明");
  let change = () => {
    changeName("小红");

    onChangeName("小红");
  };
  return (
    <div>
      <h2>组件A</h2>
      <p>{name}</p>
      <button onClick={change}>a组件中更改a组件中的值</button>
    </div>
  );
}
export default Ason;

// 组件B
function Ason(props) {
  const { name } = props;
  return (
    <div>
      <h2>组件B</h2>
      <p>{name}</p>
    </div>
  );
}
export default Bson;
```

## 13. 跨层传递数据 父=>孙

1. 通过 createContext 创建上下文对象 ctx
2. 在顶层组件通过 ctx.provider 组件提供数据
3. 在底层组件通过 useContext 钩子函数获取数据

```js
// 爷爷组件App组件
//  1.通过createContext创建上下文对象ctx
import { createContext } from "react";

import Acom from "./sun/a";

const msg = "app组件的值";
export const MsgContext = createContext();
function App() {
  return (
    <div>
      <h2>App组件</h2>
      {/* 通过自定义组件的方式，value传递数据值 */}
      <MsgContext.Provider value={msg}>
        <Acom></Acom>
      </MsgContext.Provider>
    </div>
  );
}

// 父组件A
// 引入孙组件B
import Bcom from "./b";

export default function Acom() {
  return (
    <div>
      <h2>父组件</h2>
      <Bcom></Bcom>
    </div>
  );
}

// 孙组件B
import { useContext } from "react";
// 引入爷爷组件导出的MsgContext,通过MsgContext获取爷爷组件上的值
import { MsgContext } from "../../App";
export default function Bcom() {
  // 在根组件通过useContext获取createContext上绑定的值
  const msg = useContext(MsgContext);
  return (
    <div>
      <h2>孙子组件</h2>
      <p>{msg}</p>
    </div>
  );
}
```

## 14. useEffect

### 1.基础用法

- useEffect 是一个 react 的 hook 函数，用于在 react 组件中，创建不是由渲染本身引起的操作，比如发送 ajax 请求
- useEffect 接受两个参数

  - useEffect(()=>{},[])
  - 第一个参数是一个函数，我们可以把它叫做**副作用函数**，在函数内部可以放置要执行的操作
  - 第二个参数是一个数组，在数组内放置依赖项，不同的依赖性会影响第一个参数的执行
    - 当是一个空数组时，副作用函数只会在组件渲染完毕之后执行**一次**

- 案例，当页面初始化时，发起 ajax 请求

```js
import axios from "axios";
import { useEffect, useState } from "react";
const url = "http://geek.itheima.net/V1_0/channels";
function App() {
  let [list, setList] = useState([]);
  let getList = async () => {
    let { data } = await axios.get(url);
    console.log(data);
    setList(data.data.channels);
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <div>
      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 2. useEffect 第二个参数的三种状态

1. 默认不传，初始化+组件数据发生变更时都会执行
2. 传入一个空数组，只会在初始化时执行
3. 传入一个特定依赖项，初始化+依赖项变化时执行

```js
import { useEffect, useState } from "react";

function App() {
  let [name, changeName] = useState("小明");
  let [count, changeCount] = useState(0);
  let hanlderName = () => {
    changeName("小红");
  };
  let hanlderCount = (val) => {
    changeCount((count += val));
  };
  // 1.默认第二个参数不传
  // useEffect(() => {
  //   console.log("初始化+组件数据更新时都会执行");
  // });

  // 2. 传入一个空数组，只会在初始化时执行
  // useEffect(() => {
  //   console.log("只会在初始化时执行");
  // }, []);

  // 3.传入一个特定依赖项，初始化+依赖项变化时执行
  useEffect(() => {
    console.log("初始化+依赖项变化时执行");
    // 初始化+只有name发生改变时才会执行
  }, [name]);
  return (
    <div>
      <p>{name}</p>
      <p>{count}</p>
      <button onClick={() => hanlderName()}>更改name值</button>
      <button onClick={() => hanlderCount(1)}>更改count的值</button>
    </div>
  );
}
```

### 3 useEffect 清除副作用

1. 在 useEffect 中编写的**由渲染本身引起的对接组件外部的操作**，社区经常把它称之为**副作用操作**

- 比如在 useEffect 中开启一个定时器，我们想在组件卸载后，将定时器清除掉，这个过程就是清理副作用

2. 清理副作用的使用场景：清理副作用最常见的执行时机**组件卸载时**自动执行

```js
// 语法
useEffect(() => {
  return () => {
    // 清理副作用逻辑
  };
}, []);

import { useState, useEffect } from "react";

function Son() {
  useEffect(() => {
    let timer = setInterval(() => {
      console.log("定时器执行");
    }, 1000);
    // 卸载组件时候，清除定时器，清理副作用逻辑
    return () => {
      clearInterval(timer);
    };
  }, []);
  return <div>son子组件</div>;
}

function App() {
  let [isFlag, setFlag] = useState(true);
  return (
    <div>
      {isFlag && <Son></Son>}
      <button onClick={() => setFlag((isFlag = false))}>卸载子组件</button>
    </div>
  );
}
```

## 15. 自定义 Hooks 实现

1. 声明一个以 use 打头的函数
2. 在函数体内封装可复用的逻辑
3. 把组件中用的状态或函数通过 return 导出一个对象或者数组
4. 在哪个组件中使用这个逻辑，就执行这个函数，结构出来用到的状态或者函数

- 案例，盒子隐藏和显示

```js
import { useState } from "react";

function useToggle() {
  let [isFlag, changeFlag] = useState(true);
  let hanlderChange = () => {
    changeFlag(!isFlag);
  };
  return {
    isFlag,
    hanlderChange,
  };
}

function App() {
  let { isFlag, hanlderChange } = useToggle();
  return (
    <div>
      {isFlag && <div>显示或隐藏</div>}
      <button onClick={() => hanlderChange()}>点击切换</button>
    </div>
  );
}
```

## 16. useMemo 在组件重新渲染的时候，缓存结果，类似 vue 的 computed

```js
import { useMemo, useState } from "react";

function dip(n) {
  console.log("斐波那锲"); // 当count2发生改变时，也会打印
  if (n < 3) return 1;
  return dip(n - 1) + dip(n - 2);
}

function App() {
  let [count1, setCount1] = useState(0);
  let [count2, setCount2] = useState(0);
  // let result = dip(count1);

  // 通过useMemo，只有当count1发生改变时，才会执行
  let result = useMemo(() => {
    return dip(count1);
  }, [count1]);
  return (
    <div>
      <button onClick={() => setCount1(count1 + 1)}>{count1}</button>
      <button onClick={() => setCount2(count2 + 1)}>{count2}</button>
      {result}
    </div>
  );
}
```

## 18. React.memo

1. 当父组件中的数据发生改变时，子组件也会进行重新渲染，

- memo 允许子组件在没有 props 的情况下，不进行渲染
- 使用 memo 子组件不会进行更新

2. prop 的比较机制

- 在使用 memo 缓存组件后，React 会对子组件的 prop 使用 Object.is()进行比较新，旧值，如果返回 true 表示没有变化
- prop 简单数据类型

  - Object.is(2,2) true 没有变化

- prop 复杂数据类型
  - Object.is([],[]) false,有变化，react 只关心引用是否变化

```js
import { memo, useMemo, useState } from "react";

const MemoSon = memo(function Son({ sum }) {
  console.log("子组件重新渲染");
  return <div>子组件</div>;
});

function Son(params) {
  console.log("子组件");
  return <div>子组件</div>;
}
function App() {
  const [sum, setSum] = useState(0);
  // const list = [1, 2, 3];
  const list = useMemo(() => {
    return [1, 2, 3];
  }, []);
  return (
    <div>
      {/* <Son></Son> */}
      {/*1.简单数据类型，当prop的值发生改变时，子组件会重新渲染 */}
      {/* <MemoSon sum={sum}></MemoSon> */}
      {/*2.简单数据类型，当prop的值不发生改变时，子组件不会重新渲染 */}
      {/* <MemoSon sum={100}></MemoSon> */}
      {/*3.复杂数据类型，子组件也会重新渲染，因为每次父组件数据发生改变的时候，父组件会重新渲染，实际上形成新的prop引用，memo只会关心引用的变化 */}
      {/* <MemoSon list={list}></MemoSon> */}
      {/* 4.复杂数据类型，如果数据不变，但不想让子组件重新渲染，可以使用useMemo，将数据进行缓存 */}
      <MemoSon list={list}></MemoSon>
      <button onClick={() => setSum(sum + 1)}>{sum}</button>
    </div>
  );
}
```

## 19. useCallback

1. 在组件多次渲染的时候，缓存函数

   - 也就是现在 props 现在传递的是函数

```js
import { useState, useCallback, memo } from "react";
const MemoSon = memo(function Son({ onChange }) {
  console.log("子组件更新了");
  const hanlderChange = (val) => {
    onChange(val);
  };
  return (
    <div>
      <input type="text" onChange={(e) => hanlderChange(e.target.value)} />
    </div>
  );
});
function App() {
  const [num, setNum] = useState(0);

  const hanlderChange = useCallback((val) => {
    console.log(val);
  }, []);
  return (
    <div>
      <MemoSon onChange={hanlderChange}></MemoSon>
      <button onClick={() => setNum(num + 1)}>{num}</button>
    </div>
  );
}
```

## 20. 在父组件中获取子组件的 Dom 元素

通过 forwardRef

```js
import { forwardRef, useRef } from "react";
// function Son() {
//   return <input type="text" />;
// }

const Son = forwardRef((props, ref) => {
  return <input type="text" ref={ref} />;
});

function App() {
  const sonRef = useRef(null);
  const getSonBom = () => {
    console.log(sonRef); // 拿到子组件的dom
    sonRef.current.focus();
  };
  return (
    <div>
      <Son ref={sonRef}></Son>
      <button onClick={getSonBom}>获取子组件的Dom</button>
    </div>
  );
}
```

## 21.在父组件中调用子组件的方法,

通过 useImperativeHandle

```js
import { forwardRef, useRef, useImperativeHandle } from "react";

const Son = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  const hanlderFocus = function() {
    inputRef.current.focus();
  };
  useImperativeHandle(ref, () => {
    return {
      hanlderFocus,
    };
  });
  return <input type="text" ref={inputRef} />;
});

function App() {
  const sonRef = useRef(null);
  const getSonMethod = () => {
    console.log(sonRef.current);
    sonRef.current.hanlderFocus();
  };
  return (
    <div>
      <Son ref={sonRef}></Son>
      <button onClick={getSonMethod}>调用子组件的方法</button>
    </div>
  );
}
export default App;
```
