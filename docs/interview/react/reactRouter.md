# react-router

## 下载

```js
npm i react-router-dom
```

## 创建目录

```
- src;
  - router;
    - index.js;
```

## 编写代码

router=>index.js

```js
import { createBrowserRouter } from "react-router-dom";

import Login from "../page/login";
import Article from "../page/article";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/article",
    element: <Article />,
  },
]);

export default router;
```

src=>index.js

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// 导入路由
import { RouterProvider } from "react-router-dom";
import router from "./router/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    // 路由绑定
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

reportWebVitals();
```

## 路由跳转

login.js

```js
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p>登录页面</p>
      {/* 声明式写法 */}
      <Link to="/article">声明式跳转</Link>
      {/* 命令式写法 */}
      <button onClick={() => navigate("/article")}>命令式写法</button>
    </div>
  );
};

export default Login;
```

## 路由传参

<a href="https://blog.csdn.net/weixin_44872023/article/details/132841774" target="_blank">路由跳转</a>

1. **useSearchParams**

​ login.js

```js
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* 传参方式 useSearchParams */}
      <button onClick={() => navigate("/article?id=1001&name=jack")}>
        传参方式 useSearchParams
      </button>
    </div>
  );
};

export default Login;
```

article.js

```js
import { useSearchParams } from "react-router-dom";

const Article = () => {
  const [params] = useSearchParams();
  const id = params.get("id");
  const name = params.get("name");
  return (
    <div>
      <p>文章页面</p>
      <p>
        useSearchParams传递的参数{id}---{name}
      </p>
    </div>
  );
};
export default Article;
```

2. **useParams**

login.js

```js
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* 第二种 useParams */}
      <button onClick={() => navigate("/article/1001/jack")}>
        传参方式 useParams
      </button>
    </div>
  );
};

export default Login;
```

router=>index.js

```js
import { createBrowserRouter } from "react-router-dom";

import Login from "../page/login";
import Article from "../page/article";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  // 配置对应的参数
  {
    path: "/article/:id/:name",
    element: <Article />,
  },
]);

export default router;
```

article.js

```js
import { useParams } from "react-router-dom";

const Article = () => {
  const params = useParams();
  const id = params.id;
  const name = params.name;
  return (
    <div>
      <p>文章页面</p>
      <p>
        useParams传递的参数：{id}---{name}
      </p>
    </div>
  );
};

export default Article;
```

3. **useLocation**

login.js

```js
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const goUseLocation = () => {
    navigate("/article", {
      state: {
        id: 10001,
        name: "jack",
      },
    });
  };
  return (
    <div>
      {/* 第三种 useLocation */}
      <button onClick={() => goUseLocation()}> 传参方式useLocation</button>
    </div>
  );
};

export default Login;
```

article.js

```js
import { useLocation } from "react-router-dom";

const Article = () => {
  const location = useLocation();

  const id = location.state.id;
  const name = location.state.name;
  return (
    <div>
      <p>文章页面</p>
      <p>
        useLocation传递的参数：{id}---{name}
      </p>
    </div>
  );
};
export default Article;
```

## 二级路由配置

router.js

```js
import { createBrowserRouter } from "react-router-dom";

import Login from "../page/login";
import Article from "../page/article";

import Layout from "../page/layout";
import Use from "../page/use";
import About from "../page/about";
import Home from "../page/home";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/article/:id/:name",
    element: <Article />,
  },
  // 配置二级路由
  {
    path: "/config",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />, // 默认指向Home组件，需要设置index: true 属性
      },
      {
        path: "use",
        element: <Use />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  //配置404页面
  {
    path: "*",
    element: <NoFound />,
  },
]);

export default router;
```

layout.js 配置二级路由渲染位置

```js
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <p>layout父级页面</p>
      <ul>
        <li>
          <Link to="/config/use">use页面</Link>
        </li>
        <li>
          <Link to="/config/about">about页面</Link>
        </li>
        <li>
          <Link to="/config">Home页面</Link>
        </li>
      </ul>
      <div>
        {/* 配置二级路由渲染位置 */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
```

## 两种路由模式

1. hash

- 创建路由方式`createHashRouter`

```js
import { createBrowserRouter, createHashRouter } from "react-router-dom";

import Login from "../page/login";
import Article from "../page/article";

import Layout from "../page/layout";
import Home from "../page/home";
import Use from "../page/use";
import About from "../page/about";

import NoFound from "../page/notFound";

hash模式：createHashRouter
const router = createHashRouter([
  {
    path: "/login",
    element: <Login />,
  },
  // {
  //   path: "/article/:id/:name",
  //   element: <Article />,
  // },
  {
    path: "/article",
    element: <Article />,
  },
  {
    path: "/config",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "use",
        element: <Use />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "*",
    element: <NoFound />,
  },
]);

export default router;
```

2. history

- 创建路由的方式`createBrowserRouter`

```js
import { createBrowserRouter, createHashRouter } from "react-router-dom";

import Login from "../page/login";
import Article from "../page/article";

import Layout from "../page/layout";
import Home from "../page/home";
import Use from "../page/use";
import About from "../page/about";

import NoFound from "../page/notFound";

// history模式: createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  // {
  //   path: "/article/:id/:name",
  //   element: <Article />,
  // },
  {
    path: "/article",
    element: <Article />,
  },
  {
    path: "/config",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "use",
        element: <Use />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "*",
    element: <NoFound />,
  },
]);

export default router;
```
