module.exports = {
    '/interview/':[
        {
            title: 'JavaScript',
            collapsable: true,
            children: [
                ['/interview/javascript/extend', '1.继承'],
                ['/interview/javascript/common', '2.常见面试题'],
                ['/interview/javascript/http', '3.Http'],
                ['/interview/javascript/browser','4.浏览器'],
                ['/interview/javascript/prototype','5.原型链']
            ]
        },
        {
            title:"webpack",
            collapsable: true,
            children:[
                ['/interview/webpack/init', '1.初始化'],
                ['/interview/webpack/base', '2.基本配置'],
                ['/interview/webpack/optimization', '3.优化'],
            ]
        },
        {
            title:"vue",
            collapsable: true,
            children:[
                ['/interview/vue/init', '1.面试']
            ]
        }
    ],
    '/accumulate':[
        {
            title: 'Accumulate',
            collapsable: true,
            children:[
                ['/accumulate/miscellaneous/sentence', '1.杂七']
            ]
        }
    ]
}