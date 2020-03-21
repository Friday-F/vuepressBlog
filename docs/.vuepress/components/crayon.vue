<template>
    <div class="crayon">
        <div class="logo">
            <img src="../public/assets/img/logo.png" alt="" class="pic">
        </div>
        <div class="title">
            <h1>Crayon Shin-chan</h1>
            <p class="description">I hope that daily learning can make me look farther</p>
        </div>
        <p class="action"><a href="/interview/javascript/extend" class="nav-link action-button">让我们开始吧</a></p>
        <div class="vue-press">
            <ul class="list">
                <li class="item">
                    <h3 class="title">简洁至上</h3>
                    <p class="info">以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。</p>
                </li>
                <li class="item">
                    <h3 class="title">Vue驱动</h3>
                    <p class="info">享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。</p>
                </li>
                <li class="item">
                    <h3 class="title">高性能</h3>
                    <p class="info">VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped lang='less'>
@import '../public/styles/reset.less';
@import '../public/styles/style.less';
    .crayon{
        .logo{
            text-align: center;
            .pic{
                width: 240px;
                height:220px;
                border-radius: 50%;
                margin:3rem auto 1.5rem;
            }
        }
        .title{
            text-align: center;
            .description{
                max-width: 35rem;
                font-size: 1.6rem;
                line-height: 1.3;
                color: #6a8bad;
                margin: 28px auto;

            }
        }
        .action{
            text-align: center;
            margin:1.8rem auto;
            .nav-link.action-button{
                text-decoration: none;
                display: inline-block;
                font-size: 1.2rem;
                color: #fff;
                background-color: @color-link;
                padding: .8rem 1.6rem;
                border-radius: 4px;
                transition: background-color .1s ease;
                box-sizing: border-box;
                border-bottom: 1px solid #389d70;
                &:hover{
                    background: @color-link-hover;
                }
            }
        }
        .vue-press{
            border-top: 1px solid #eaecef;
            padding: 1.2rem 0;
            margin-top: 3.5rem;
            .list{
                display: flex;
                justify-content:space-between;
                .item{
                    width: 30%;
                    text-align: center;
                    .title{
                        font-size: 1.4rem;
                        font-weight: 500;
                        border-bottom: none;
                        padding-bottom: 0;
                        color: #3a5169;
                    }
                    .info{
                        color:#4e6e8e;
                    }
                }
            }
        }
    }
</style>
<script>
export default {
    name:'crayon'

}
</script>


