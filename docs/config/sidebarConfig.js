module.exports = {
    '/interview/':[
        {
            title: 'JavaScript',
            collapsable: true,
            children: [
                ['/interview/javascript/common', '1.常见面试题'],
                ['/interview/javascript/extend', '2.继承'],
                ['/interview/javascript/http', '3.Http'],
                ['/interview/javascript/browser','4.浏览器'],
                ['/interview/javascript/prototype','5.原型链'],
                ['/interview/javascript/promise','6.Promise']
            ]
        },
        {
            title:"webpack",
            collapsable: true,
            children:[
                ['/interview/webpack/init', '1.初始化'],
                ['/interview/webpack/base', '2.基本配置'],
                ['/interview/webpack/optimization', '3.优化'],
                ['/interview/webpack/summary', '4.总结']
            ]
        },
        {
            title:"vue",
            collapsable: true,
            children:[
                ['/interview/vue/init', '基础']
            ]
        },
        // {
        //     title:"yiqing",
        //     collapsable: true,
        //     children:[
        //         ['/interview/pneumonia/init', '疫情概览']
        //     ]
        // }
    ],
    '/cleanheart':[
        {
            title: 'CleanHeart',
            collapsable: true,
            children:[
                ['/cleanheart/miscellaneous/sentence', '1.杂七'],
                ['/cleanheart/miscellaneous/poetry', '2.古诗杂文']
            ]
        }
    ]
}