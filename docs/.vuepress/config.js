const navConfig = require('../config/navConfig');
const sidebarConfig = require('../config/sidebarConfig');
module.exports = {
    title: 'Friday-F',
    description: '一个不爱折腾的人折腾的东西',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
      ['link', { rel: 'shortcut icon',type: "image/x-icon", href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    base: '/', // 这是部署到github相关的配置
    markdown: {
      lineNumbers: true // 代码块显示行号
    },
    themeConfig: {
        lastUpdated: 'Last Updated', //最后更新时间
        logo:'',
        nav:navConfig,
        sidebar: sidebarConfig, // 侧边栏配置
        sidebarDepth: 3 // 侧边栏显示2级
    }
};