<template>
  <div :class="home-latout">
    <div class="crayon"
         v-show="isLoading === false">
      <div class="logo">
        <img src="../public/assets/img/logo.jpeg"
             alt=""
             class="pic">
      </div>
      <div class="title">
        <h1 class="crayon-title">
          <a href="/"
             class="link">Friday</a>
        </h1>
        <p class="crayon-en">一个不爱折腾的人折腾的东西</p>
      </div>
      <!-- <a class="action"><a href="/interview/javascript/extend" class="nav-link action-button">让我们开始吧</a></p> -->
      <div class="vue-press">
        <p class="description">{{info.hitokoto}}<br>
          <strong> -「{{info.from}}」</strong>
        </p>
        <ul class="list">
          <li class="item">
            <a class="link"
               href="/interview/javascript/common">JavaScript</a>
          </li>
          <li class="item">
            <a class="link"
               href="/cleanheart/miscellaneous/sentence">星期五</a>
          </li>
          <li class="item">
            <a class="link"
               target="_blank"
               href="https://github.com/Friday-F">GitHub</a>
          </li>
        </ul>
      </div>

    </div>
    <!-- <p class="warning">不为不可成,不求不可得,不处不可久,不行不可复</p> -->
    <div v-show="isLoading">
      <Loading></Loading>
    </div>
    <img class="home-latout-bg"
         src="https://api.ixiaowai.cn/gqapi/gqapi.php"
         alt="Bing每日图片超高清" />
  </div>
</template>
<script>
import axios from 'axios'
import Loading from './loading-transtion'
import { log } from 'util';
const home_bg = require('./images/index_bg.jpg')
export default {
  name: 'crayon',
  components: {
    Loading
  },
  data () {
    return {
      info: {
        hitokoto: '',
        from: ''
      },
      picUrl: "",
      isLoading: true,
      isError: false
    }
  },
  created () {
    this.getData();
  },
  methods: {
    async getData () {
      try {
        let { data: info, status } = await this.getInfo()
        this.info = Object.assign({}, this.info, info)
      } catch (error) {
        console.log(error)
      }
      this.isLoading = false;
    },

    getInfo () {
      return axios.get('https://v1.hitokoto.cn/')
    },

  }

}
</script>
<style lang='less'>
@import "../public/styles/reset.less";
@import "../public/styles/style.less";
@keyframes myfirst {
  from {
    transform: translate(0, 100px);
    opacity: 0;
  }
  to {
    transform: translate(0, 0);
    opacity: 1;
  }
}

.home-latout {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  &.is_error {
    &::after {
      content: "";
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  &-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
.crayon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  .logo {
    text-align: center;
    animation: myfirst 1s;
    .pic {
      width: 120px;
      height: 120px;
      border: 1px solid #000;
      border-radius: 50%;
      // margin:3rem auto 1.5rem;
    }
  }
  .title {
    text-align: center;
    animation: myfirst 1.2s;
    .crayon-title {
      margin-bottom: 0.8rem;
      .link {
        text-decoration: none;
        color: #fff;
        font-weight: normal;
        font-size: 20px;
      }
    }
    .crayon-en {
      font-size: 18px;
      color: #fff;
    }
  }
  .vue-press {
    border-top: 1px solid #eaecef;
    padding: 0.6rem 0;
    margin-top: 0.6rem;
    animation: myfirst 1.4s;
    min-width: 18rem;
    .description {
      max-width: 24rem;
      font-size: 1rem;
      line-height: 1.8;
      color: #fff;
      text-align: center;
      font-weight: normal;
      margin-bottom: 2rem;
    }
    .list {
      display: flex;
      justify-content: space-between;
      .item {
        text-align: center;
        .link {
          padding: 0.4rem 0.8rem;
          font-weight: bold;
          border: 1px solid #fff;
          border-radius: 22px;
          font-size: 0.9em;
          // margin:0 0.02rem;
          color: #fff;
          display: block;
          white-space: nowrap;
        }
      }
    }
  }
}
.warning {
  position: absolute;
  bottom: 2rem;
  right: 3rem;
  color: #fff;
  z-index: 1;
  animation: myfirst 1.6s;
}
</style>



