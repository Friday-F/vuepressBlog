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
                ['/interview/javascript/promise','6.Promise'],
                ['/interview/javascript/algorithm','7.算法']
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
                ['/interview/vue/init', '基础'],
                ['/interview/vue/library', '组件'],
                ['/interview/vue/vuex', 'Vuex'],
                ['/interview/vue/render', 'render'],
                ['/interview/vue/commonTable', 'elementUi搭配vue封装table组件']
            ]
        },
        {
            title:"Blockchain",
            collapsable: true,
            children:[
                ['/interview/blockchain/01', '人类社会货币的演变'],
                ['/interview/blockchain/02', '比特币的转账机制和7个必修名词'],
                ['/interview/blockchain/03', '比特币转账运行原理'],
                ['/interview/blockchain/04', '比特币技术来源'],
                ['/interview/blockchain/05', '比特币价格'],
                ['/interview/blockchain/06', '比特币上游-挖矿'],
                ['/interview/blockchain/07', '比特币中游-交易'],
                ['/interview/blockchain/08', '比特币中游-存储'],
            ]
        },
        {
          title:"leecodeTop",
          collapsable: true,
          children:[
            {
                title:"字符串篇",
                link:"String",
                collapsable: true,
                children:[
                    ['/interview/Leecode-top/String/01', '无重复字符的最长子串'],
                    ['/interview/Leecode-top/String/02', '字符串相加'],
                ]
            },
            {
                title:"数组篇",
                link:'Array',
                collapsable: true,
                children:[
                    ['/interview/Leecode-top/Array/01', '合并两个有序数组'],
                    ['/interview/Leecode-top/Array/02', '两数之和'],
                    ['/interview/Leecode-top/Array/03', '三数之和'],
                    ['/interview/Leecode-top/Array/04', '二分查找'],
                    ['/interview/Leecode-top/Array/05', '搜索插入位置'],
                    ['/interview/Leecode-top/Array/06', '在排序数组中查找元素的第一个和最后一个位置'],
                    ['/interview/Leecode-top/Array/07', 'x 的平方根'],
                ]
            },
            {
              title:"双指针",
              link:'Pointer',
              collapsable: true,
              children:[
                ['/interview/Leecode-top/Pointer/01', '移除元素'],
                ['/interview/Leecode-top/Pointer/02', '删除有序数组中的重复项'],
                ['/interview/Leecode-top/Pointer/03', '移动零'],
                ['/interview/Leecode-top/Pointer/04', '有序数组的平方'],
                ['/interview/Leecode-top/Pointer/05', '反转字符串'],
                ['/interview/Leecode-top/Pointer/06', '替换空格'],
                ['/interview/Leecode-top/Pointer/07', '三数之和'],
                ['/interview/Leecode-top/Pointer/08', '环形链表'],
                ['/interview/Leecode-top/Pointer/09', '翻转字符串里面的单词'],
              ]
            },
            {
                title:"二叉树",
                link:'BinaryTree',
                collapsable: true,
                children:[
                  ['/interview/Leecode-top/BinaryTree/01', '前序遍历'],
                  ['/interview/Leecode-top/BinaryTree/02', '中续遍历'],
                  ['/interview/Leecode-top/BinaryTree/03', '后序遍历'],
                ]
            },
            {
                title:"排序算法",
                link:'Sort',
                collapsable: true,
                children:[]

            },
            {
                title:"查找算法",
                link:'Find',
                collapsable: true,
                children:[]
            },
            {
                title:"动态规划",
                link:'DynamicProgramming',
                collapsable: true,
                children:[
                    ['/interview/Leecode-top/DynamicProgramming/01', '爬楼梯'],
                    ['/interview/Leecode-top/DynamicProgramming/02', '最长递增子序列'],
                    ['/interview/Leecode-top/DynamicProgramming/03', '零钱兑换'],
                   
                ]
            },
            {
                title:"回溯算法",
                link:'Backtracking',
                collapsable: true,
                children:[
                    ['/interview/Leecode-top/Backtracking/01', '全排列'],
                ]
            },
            {
                title:"贪心算法",
                link:'GreedyAlgorithms',
                collapsable: true,
                children:[
                  ['/interview/Leecode-top/GreedyAlgorithms/01', '买卖股票的最佳时机'],
                  ['/interview/Leecode-top/GreedyAlgorithms/02', '买卖股票的最佳时机II'],
                  ['/interview/Leecode-top/GreedyAlgorithms/03', '最大子数组和'],
                  ['/interview/Leecode-top/GreedyAlgorithms/04', '合并区间'],
                ]

            },
            {
                title:"链表",
                link:'LinkedList',
                collapsable: true,
                children:[]

            },
            {
                title:"栈",
                link:'Warehouse',
                collapsable: true,
                children:[
                    ['/interview/Leecode-top/Warehouse/01', '有效的括号'],
                ]
            },
            {
                title:"其他",
                link:'Other',
                collapsable: true,
                children:[]

            }     
                        
          ],
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