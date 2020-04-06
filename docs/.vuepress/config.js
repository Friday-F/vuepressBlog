const navConfig = require('../config/navConfig');
const sidebarConfig = require('../config/sidebarConfig');
module.exports = {
    title: '前端之路',
    description: '前端*前端',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
      ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    base: '/', // 这是部署到github相关的配置
    markdown: {
      lineNumbers: false // 代码块显示行号
    },
    themeConfig: {
        // lastUpdated: 'Last Updated', //最后更新时间
        logo:'',
        nav:navConfig,
        sidebar: sidebarConfig, // 侧边栏配置
        sidebarDepth: 2 // 侧边栏显示2级
    }
};