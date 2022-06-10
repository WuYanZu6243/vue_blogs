<template>
    <div id="home">
        <!-- 二栏布局，内容区：大小自适应 且 优先加载 -->
        <!-- 内容区 -->
        <main class="home-main">
            <router-view></router-view>
        </main>
        <!-- 导航区 -->
        <nav class="home-nav">
            <!-- 导航区上半部分 -->
            <div class="nav-top">
                <h1>笔试博客</h1>
                <p>云影天光前端开发实习生</p>
            </div>
            <!-- 导航区下半部分 -->
            <div class="nav-bottom">
                <ul>
                    <li><router-link active-class="active" class="router-link" to="/allArticle">全部文章</router-link></li>
                    <li><router-link active-class="active" class="router-link" to="/filtrateArticle">筛选文章</router-link></li>
                    <li><router-link active-class="active" class="router-link" to="/addArticle">添加文章</router-link></li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name:'Home',
}
</script>

<style lang="scss" scoped>
#home{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-left: 210px;
    // 内容区
    .home-main{
        float: left;
        width: 100%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
        padding: 20px;
        box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
    }
    // 导航区
    .home-nav{
        float: left;
        width: 200px;
        box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
        margin-left: -100%;
        position: relative;
        right: 210px;
        .nav-top{
            height: 100px;
            background-color: #222;
            color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            h1{
                margin-bottom: 5px;
            }
        }
        .nav-bottom{
            padding: 40px 20px;
            ul{
                display: flex;
                flex-direction: column;
                align-items: center;
                li{
                    margin-bottom: 10px;
                    .router-link{
                        font-size: 18px;
                        color: #222;
                        text-decoration:none;
                    }
                    &:nth-child(-1){
                        margin-bottom: 0;
                    }
                }
            }
            // 路由高亮样式
            .active{
                color: #3f4852 !important;
                font-weight: bold;
                text-decoration:underline !important;
            }
        }
    }
}

</style>