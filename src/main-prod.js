import Vue from 'vue'
import App from './App.vue'

// 导入全局样式
import './assets/css/global.css'

// 导入并注册路由插件
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 导入创建好的路由器
import router from './router'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// 将富文本编辑器注册为全局可用的组件
Vue.use(VueQuillEditor)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
