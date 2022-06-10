<template>
  <div id="app" :class="theme">
    <!-- 线条 -->
    <div class="wire"></div>

    <!-- 控制白天黑夜主题 -->
    <div class="theme" @click="cutTheme()">
      <img v-if="theme === 'app-daytime'" src="./assets/img/dark.png" alt="">
      <img v-else src="./assets/img/daytime.png" alt="">
    </div>

    <!-- home组件 -->
    <div class="home">
      <Home/>
    </div>
  </div>
</template>

<script>
// 导入子组件
import Home from './components/Home.vue'
// 导入自定义的初始化数据
import {articleInitializeData,labelInitializeData} from './assets/js/articleInitializeData.js'

export default {
  name: 'App',

  // 注册子组件
  components: {Home},

  // 数据
  data() {
    return {
      // 切换白天黑夜主题
      theme:'app-daytime'
    }
  },

  // 生命周期钩子:'创建后'created
  created(){
    // 初始化数据
    // 为了方便测试,将一些初始化数据保存到localStorage中
    // 判断当前电脑localStorage中是否有文章数据
    const articleData = localStorage.getItem('articleData')
    // 判断当前电脑localStorage中是否有标签数据
    const labelData = localStorage.getItem('labelData')
    // 当前电脑localStorage中没有文章数据,说明是首次,需要初始化
    if(!articleData) localStorage.setItem('articleData',JSON.stringify(articleInitializeData))
    // 当前电脑localStorage中没有标签数据,说明是首次,需要初始化
    if(!labelData) localStorage.setItem('labelData',JSON.stringify(labelInitializeData))
  },

  // 方法
  methods: {
    // 切换白天黑夜主题
    cutTheme(){
      this.theme = this.theme === 'app-daytime' ? 'app-dark' : 'app-daytime'
    }
  },
}
</script>

<style lang="scss">
#app{
  height: 100%;
  position: relative;
  box-sizing: border-box;
  padding-bottom: 10px;
  .wire{
    height: 3px;
    background-color: #222222;
  }
  .theme{
    position: absolute;
    top: 0px;
    right: 0px;
  }
  .home{
    height: 100%;
    padding: 0 50px;
  }
}
// 白日主题
.app-daytime{
  background-color: #eee;
  #home{
    .home-main{
      background-color: #fff;
    }
    .home-nav{
      background-color: #fff;
    }
  }
}
// 黑夜主题
.app-dark{
  background-color: #666;
  #home{
    .home-main{
      background-color: #ccc;
    }
    .home-nav{
      background-color: #222;
      .nav-bottom{
        background-color: #ccc;
      }
    }
  }
  input,select,textarea{
    background-color: #ccc;
  }
}
</style>
