<template>
    <div class="home-latout" :style="`backgroundImage:url(${picUrl})`">
        <div class="crayon" v-show="isLoading === false">
            <div class="logo">
                <img src="../public/assets/img/logo.jpeg" alt="" class="pic">
            </div>
            <div class="title">
                <h1 class="crayon-title"><a href="/" class="link">蜡笔-小新</a></h1>
                <p class="crayon-en">Crayon Shin-chan</p>
            </div>
            <!-- <a class="action"><a href="/interview/javascript/extend" class="nav-link action-button">让我们开始吧</a></p> -->
            <div class="vue-press">
                <p class="description">{{info.hitokoto}}<br><strong> -「{{info.from}}」</strong></p>
                <ul class="list">
                    <li class="item">
                    <a class="link" href="/interview/javascript/extend">面试</a>
                    </li>
                    <li class="item">
                    <a class="link" href="/cleanheart/miscellaneous/sentence">杂七</a>
                    </li>
                    <li class="item">
                    <a class="link" target="_blank" href="https://github.com/Crayon-F">GitHub</a>
                    </li>
                </ul>
            </div>
        </div>
        <div v-show="isLoading">
            <Loading></Loading>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Loading from './loading-transtion'
export default {
    name:'crayon',
    components:{
        Loading
    },
    data(){
        return{
            info:{
                hitokoto:'',
                from:''
            },
            picUrl:"",
            isLoading:true
        }
    },
    created(){
        // this.getInfo()
        // this.getPicUrl()
        this.getData();
    },
    methods:{
        getData(){
            axios.all([this.getInfo(),this.getPicUrl()])
                .then(axios.spread((info,url)=>{
                    if(info.status === 200){
                        this.info = Object.assign({},this.info,info.data)
                    }
                    if(url.status === 200){
                        this.picUrl = url.config.url;
                    }
                    this.isLoading = false;
                }))
        },
        
        getInfo(){
           return axios.get('https://v1.hitokoto.cn/')
            // .then(info=>{
            //     if(info.status === 200){
            //         this.info = Object.assign({},this.info,info.data)
            //     }
            // })
        },
        getPicUrl(){
            return axios.get('https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture')
                // .then(url=>{
                //     console.log(url)
                //     if(url.status === 200){
                //         this.picUrl = url.config.url;
                       
                //     }
                // })
        }
        
    }

}
</script>
<style lang='less'>
@import '../public/styles/reset.less';
@import '../public/styles/style.less';
    @keyframes myfirst{
        from {
            transform: translate(0, 200px);
            opacity: 0;
        }
        to {
            transform: translate(0, 0);
            opacity: 1;
        }
    }
    
    .home-latout{
        width: 100%;
        height: 100%;
        background-position:center;
        background-size:cover;
        background-repeat:no-repeat;
        // background-color: rgba(0, 0,0,.3);    
    }
    .crayon{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        .logo{
            text-align: center;
            animation: myfirst 2s;
            .pic{
                width: 120px;
                height:120px;
                border:1px solid #000;
                border-radius: 50%;
                // margin:3rem auto 1.5rem;
            }
        }
        .title{
            text-align: center;
            animation: myfirst 3s;
            .crayon-title{
                font-weight: normal;
                margin-bottom:0.6rem;
                .link{
                    text-decoration: none;
                    color:#fff;
                }
            }
            .crayon-en{
                font-size: 18px;
                color:#fff;
            }
        }
        .vue-press{
            border-top: 1px solid #eaecef;
            padding: 0.6rem 0;
            margin-top: 0.6rem;
            animation: myfirst 4s;
            .description{
                max-width: 24rem;
                font-size: 1.2rem;
                line-height: 1.8;
                color: #fff;
                text-align: center;
                font-weight: normal;
                margin-bottom:2rem;

            }
            .list{
                display: flex;
                justify-content:space-between;
                .item{
                    text-align: center;
                    .link{
                        padding:0.4rem 0.8rem;
                        font-weight: bold;
                        border:1px solid #fff;
                        border-radius: 22px;
                        font-size: 0.9em;
                        // margin:0 0.02rem;
                        color:#fff;
                        display: block;
                        white-space:nowrap;
                    }
                    
                }
            }
        }
    }
</style>



