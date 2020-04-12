<template>
   <div class="content">
       <div class="data">
           <header class="header">
               <div class="top">
                   <img class="logo" src="./images/logo.jpeg" alt="" width="230">
                   <span class="home"><a href="javascript:;" @click="goTop">返回上一级</a></span>
               </div>
               <p class="title">新型冠状病毒肺炎</p>
               <h3 class="presentation">疫情实时大数据报告</h3>
           </header>
           <div class="information">
               <header class="information-header">
                   <ul class="nav">
                       <li class="item" @click="toggleTap('domestic')">
                           <a href="javascript:;" :class="['link',{'active':currentTap === 'domestic'}]">国内疫情</a>
                       </li>
                       <li class="item" @click="toggleTap('abroad')">
                           <a href="javascript:;" :class="['link',{'active':currentTap === 'abroad'}]">国外疫情</a>
                       </li>
                       <li class="item" @click="toggleTap('realTime')">
                           <a href="javascript:;" :class="['link',{'active':currentTap === 'realTime'}]">实时播报</a>
                       </li>
                   </ul>
               </header>
               <div class="domestic">
                   <header class="model-header">
                       <h3 class="model-header-title">国内疫情</h3>
                       <p class="update-time">数据更新至 {{utils.formatDate(overall.updateTime)}}</p>
                   </header>
                    <div class="domestic-data">
                        <ul class="list">
                            <li class="item">
                                <div class="title">
                                   <p class="tit">
                                        现有确诊
                                    <i class="doubt icon-doubt"></i>
                                   </p>
                                </div>
                                <p class="number">
                                    <span class="today">{{overall.currentConfirmedCount}}</span>
                                    <span class="yesterday">
                                       昨日
                                        <span class="currentConfirmedIncr">
                                            <i v-show="overall.currentConfirmedIncr > 0 || overall.currentConfirmedIncr === 0">+</i>
                                            {{overall.currentConfirmedIncr}}
                                        </span>
                                       
                                    </span>

                                </p>
                            </li>
                            <!-- <li class="item">
                                <p class="title">
                                    无症状
                                     <i class="doubt icon-doubt"></i>
                                </p>
                                 <p class="number">
                                    <span class="today">{{overall.seriousCount}}</span>
                                    <span>{{overall.seriousIncr}}</span>
                                </p>
                            </li> -->
                            <li class="item">
                                <p class="title">
                                    现有疑似
                                    <i></i>
                                </p>
                                <p class="number">
                                    <span class="today">{{overall.suspectedCount}}</span>
                                    <span class="yesterday">
                                       昨日
                                        <span class="currentConfirmedIncr">
                                            <i v-show="overall.suspectedIncr > 0 || overall.suspectedIncr === 0">+</i>
                                            {{overall.suspectedIncr}}
                                        </span>
                                       
                                    </span>
                                </p>
                            </li>
                            <li class="item">
                                <p class="title">
                                    治愈人数
                                    <i></i>
                                </p>
                                <p class="number">
                                    <span class="today">{{overall.curedCount}}</span>
                                    <span class="yesterday">
                                       昨日
                                        <span class="currentConfirmedIncr">
                                            <i v-show="overall.curedIncr > 0 || overall.curedIncr === 0">+</i>
                                            {{overall.curedIncr}}
                                        </span>
                                       
                                    </span>
                                </p>
                            </li>
                            <li class="item">
                                <p class="title">
                                    死亡人数
                                    <i></i>
                                </p>
                                <p class="number">
                                    <span class="today">{{overall.deadCount}}</span>
                                    <span class="yesterday">
                                       昨日
                                        <span class="currentConfirmedIncr">
                                            <i v-show="overall.deadIncr > 0 || overall.deadIncr === 0">+</i>
                                            {{overall.deadIncr}}
                                        </span>
                                       
                                    </span>
                                </p>
                            </li>
                             <li class="item">
                                <p class="title">
                                    重症病例人数
                                    <i></i>
                                </p>
                                <p class="number">
                                    <span class="today">{{overall.seriousCount}}</span>
                                    <span class="yesterday">
                                       昨日
                                        <span class="currentConfirmedIncr">
                                            <i v-show="overall.seriousIncr > 0 || overall.seriousIncr === 0">+</i>
                                            {{overall.seriousIncr}}
                                        </span>
                                       
                                    </span>
                                </p>
                            </li>
                        </ul>
                    </div>
               </div>
               <div v-if="isNationwide" id="myChart" :style="{width: '734px', height: '561px'}"></div>
               <div v-else id='city' :style="{width: '734px', height: '561px'}"></div>
                <div class="whole-country">
                   <header class="model-header">
                       <h3 class="model-header-title">国内各地区疫情</h3>
                   </header>
                   <div class="whole-country-list">
                       <div class="header-title">
                           <ul class="header-list">
                               <li class="item">疫情地区</li>
                               <!-- <li class="item">新增</li>
                               <li class="item">现有</li> -->
                               <li class="item">累计</li>
                               <li class="item">治愈</li>
                               <li class="item">死亡</li>
                           </ul>
                       </div>
                       <ul class="list">
                           <li class="item" v-for="(item,index) in cityList" :key='item.index'>
                               <div class="city-list" @click="toggleCity(item)">
                                    <p class="item-data">
                                        <i :class="['up','icon-arrow-up',{'down':item.toggleFlag}]" v-show="item.cities.length"></i>
                                        {{item.provinceShortName}}
                                    </p>
                                    <p class="item-data">{{item.confirmedCount}}</p>
                                    <p class="item-data">{{item.curedCount}}</p>
                                    <p class="item-data">{{item.deadCount}}</p>
                               </div>
                               <ul class="city-list-child" v-show="item.toggleFlag === true">
                                   <li v-for="(tag,index) in item.cities" :key="index" class="item">
                                        <p class="item-data-child" @click="getProvince(item)">{{tag.cityName}} ></p>
                                        <p class="item-data-child">{{tag.confirmedCount}}</p>
                                        <p class="item-data-child">{{tag.curedCount}}</p>
                                        <p class="item-data-child">{{tag.deadCount}}</p>
                                   </li>
                               </ul>
                           </li>
                       </ul>
                   </div>
               </div>
               <div class="news">
                   <header class="model-header">
                       <h3 class="model-header-title">实时播报</h3>
                   </header>
                   <div class="news-list">
                       <ul class="list">
                           <li class="item" v-for="(item,index) in newsList" :key='item.index'>
                               <p class="pubDate">{{utils.formatDate(item.pubDate,2)}}</p>
                               <a :href="item.sourceUrl" target="_blank" class="link">{{item.title}}</a>
                           </li>
                       </ul>
                   </div>
               </div>
           </div>
           
       </div>
        
   </div>
</template>
<script>
import vm from './main.js'
export default  vm
</script>
<style scoped lang='less'>
    @import '../../icomoon/style.css';
    @import './index.less';
</style>


