// 路由配置文件

// 导入vue-router
import VueRouter from "vue-router"

// 导入各路由组件
const AllArticle = () => import('../pages/AllArticle.vue')
const FiltrateArticle = () => import('../pages/FiltrateArticle.vue') 
const AddArticle = () => import('../pages/AddArticle.vue')
const Article = () => import('../pages/Article.vue')

// 创建路由器实例
const router = new VueRouter({
    routes:[
        // 当访问根路径'/'时，设置自动跳转到所有文章组件
        {
            path:'/',
            redirect:'/allArticle'
        },
        // 所有文章组件
        {
            name:'allArticle',
            path:'/allArticle',
            component:AllArticle
        },
        // 筛选文章
        {
            name:'filtrateArticle',
            path:'/filtrateArticle',
            component:FiltrateArticle
        },
        // 添加文章
        {
            name:'addArticle',
            path:'/addArticle',
            component:AddArticle
        },
        // 文章详情
        {
            name:'article',
            path:'/article/:id',
            component: Article
        }
    ]
})

// 导出路由器实例
export default router 