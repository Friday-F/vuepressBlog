// import jsonp from 'jsonp'
import echarts from 'echarts'
import 'echarts/map/js/china.js'
import Axios from 'axios';
import utils from '../../libs/utils'
let option = {
    title:{
        text:'累计确诊',
        link:"https://voice.baidu.com/act/newpneumonia/newpneumonia#tab4",
        // subtext:'疫情监控',
        // sublink:"https://www.baidu.com"
    },
    series:{
        name:"确诊人数",
        type:'map',
        map:'china',
        label:{
            show:"true", //对应地区的汉字
            color:'#000',
            fontSize:12
        },
        itemStyle:{
            areaColor:'#fff' //地图的背景色
        },
        //鼠标滑过的设置
        emphasis:{
            label:{
                color:'#fff',
            },
            itemStyle:{
                areaColor:"lightblue"
            }
       },
       data:[],
    //    roam:true 设置地图是否缩放
   },
//    图例
   visualMap:{
       type:"piecewise",
       show:true,
    //    图例
        pieces:[
            {min:10000},
            {min:1000,max:9999},
            {min:100,max:999},
            {min:10,max:99},
            {min:1,max:9 }
        ],
        align:'left',//调整图例文字在色宽的位置
        orient:'vertical',//调整图例是左右还是上下显示
        // left,top,right,bottom可以控制图例的具体位置
        // 设置图例的颜色，大小，类型
        inRange:{
            symbol:'rect',
            color:['#ffc0b1','#9c0505']
        },
        itemWidth:20,
        itemHeight:10

    },
    tooltip:{
        trigger:'item',
        triggerOn:'click',
        enterable:true,
        formatter(params){
            // return tooltipFn(params)
            const component = getHtmlComponent(params)
            return component 
        },
    }
}
function getHtmlComponent(data){
    let str = `<div id='city' style='display:flex; align-items: center;justify-content: space-between'>
                <div>地区：${data.name}<br />确诊：${data.value}</div>
                <div style='width: 1px;
                height:30px;
                background: #fff;
                margin:0 8px;
                '></div>
                <div>详情></div>
            </div>`
    return str;
}
export default{
    name:'pneumonia',
    data(){
        return{
            myChart:null,
            currentTap:'domestic',
            overall:{

            },
            utils,
            newsList:[],
            countryList:[],
            cityList:[],
            isNationwide:true
        }
    },
    created(){
        this.getArea()
        this.getInit()
        this.getNewList()
    },
    computed:{
        
    },
    methods:{
        goTop(){
            this.$router.go(-1)
        },
        getProvince(current){
            console.log(current)
            this.isNationwide = false
            // Axios.get(`https://lab.ahusmart.com/nCoV/api/area?province=${current.provinceName}`)
            //     .then(res=>{
            //         console.log(res)
            //     })
        },
        toggleTap(tap){
            this.currentTap = tap;
        },
        toggleCity(currentCity){
            currentCity.toggleFlag = !currentCity.toggleFlag;
        },
        // getData(){
        //     Axios.all([this.getInit(),this.getArea()])
        //         then(Axios.spread(function (allSearchTopic, allSearchs) {
        //             console.log(allSearchTopic)
        //             console.log(allSearchs)
        //         }))
        // },

        getInit(){
            // jsonp('https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427',{},(err,data)=>{
            //     if(!err){
            //         let list = data.data.list.map(item=>{
            //             return {
            //                 name:item.name,
            //                 value:item.value
            //             }
            //         })
            //         console.log(list)
            //         // option.series.data = list;
            //         // this.myChart.setOption(option)
                    
            //     }
            // })
            Axios.get('https://lab.isaaclin.cn/nCoV/api/overall')
                .then(res=>{
                    if(res.status === 200){
                        this.overall = res.data.results[0];
                       
                    }
                })

        },
        getArea(){
            Axios.get('https://lab.ahusmart.com/nCoV/api/area')
                .then(res=>{
                    if(res.status === 200){
                        let list = res.data.results.filter(item=>{
                            return item.country === '中国'
                        })
                        this.cityList = list.map(item=>{
                            return {
                                ...item,
                                toggleFlag:false
                            }
                        });
                        let chinaList = list.map(item=>{
                            return {
                                name:item.provinceShortName || '--',
                                value:item.confirmedCount + '' || '--',
                            }
                        })
                        if(chinaList.length){
                            option.series.data = chinaList;
                            this.myChart.setOption(option)
                        }
                        
                    }
                })
            // Axios.get('https://lab.isaaclin.cn/nCoV/api/area?latest=1')
            //     .then(res=>{
            //         if(res.status === 200){
            //             let list = res.data.results.filter(item=>{
            //                 return item.countryEnglishName === 'China'
            //             })
            //             let chinaList = list.map(item=>{
            //                 return {
            //                     name:item.provinceShortName,
            //                     value:item.currentConfirmedCount+''
            //                 }
            //             })
            //             option.series.data = chinaList;
            //             this.myChart.setOption(option)
            //         }
            //     })
        },
        getNewList(){
            Axios.get('https://lab.ahusmart.com/nCoV/api/news')
                .then(res=>{
                    if(res.status === 200){
                        this.newsList = res.data.results;
                    }
                })
        }
    },
    mounted(){
        this.myChart = echarts.init(document.getElementById('myChart'))
        this.myChart.setOption(option);
        
        // cityInfo.onclick = function(){
        //     let currentCity = this.dataset.city;
        //     console.log(currentCity)
        // }
        
    }
}