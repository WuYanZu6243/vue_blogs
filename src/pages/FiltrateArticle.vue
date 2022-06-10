<template>
    <div id="FiltrateArticle">
        <!-- 组件标题 -->
        <h2 class="title">筛选文章</h2>
        <!-- 筛选区 -->
        <div class="filtrate-box">
            <!-- 标签筛选 -->
            <ul class="label-filtrate">
                <span class="filtrate-span">标签：</span>
                <li class="label-filtrate-item" v-for="label in labelList" :key="label.id"
                @click="pitchLabel(label.id)" :class="pitchLabelId === label.id? 'active':''">{{label.name}}</li>
            </ul>
            <!-- 日期筛选 -->
            <div class="date-filtrate">
                <span class="filtrate-span">日期：</span>
                <input type="date" class="first-date" v-model="firstDate"> 至 <input type="date" class="last-date" v-model="lastDate">
            </div>
        </div>
        <!-- 文章列表 -->
        <ArticleList :showArticleList="filtrateArticleList" @click="gotoArticle"/>
    </div>
</template>

<script>
// 导入自定义的文章列表组件
import ArticleList from '../components/ArticleList.vue'

export default {
    name:'FiltrateArticle',
    // 注册子组件
    components: {ArticleList},
    // 数据
    data() {
        return {
            // 标签列表
            labelList:[],
            // 文章列表
            articleList:[],
            // 当前选中的标签id,
            pitchLabelId:'',
            // 选中的起点日期
            firstDate:'',
            // 选中的终点日期
            lastDate:''
        }
    },
    // 计算属性
    computed:{
        // 筛选过后的文章列表
        filtrateArticleList(){
            // 根据当前选中的标签id找到对应的标签名
            const obj = this.labelList.find(label=>label.id === this.pitchLabelId)
            const pitchLabelName = obj ? obj.name : ''
            // 根据标签名筛选文章
            let filtrateList = this.articleList.filter(article=>article.label.indexOf(pitchLabelName) !== -1)
            // 根据起点日期筛选文章
            if(this.firstDate) {
                // 将起点日期字符串转化为时间戳
                const firstDate_unix = Date.parse(this.firstDate.replace(/\-/g,'/'))
                // 根据起点时间筛选文章
                filtrateList = filtrateList.filter(article=>{
                    // 将文章的发布日期转化为时间戳
                    const date_unix = Date.parse(article.date.replace(/\-/g,'/'))
                    // 筛选
                    return date_unix >= firstDate_unix
                })
            }
            // 根据终点日期筛选文章
            if(this.lastDate) {
                // 将终点日期字符串转化为时间戳
                const lastDate_unix = Date.parse(this.lastDate.replace(/\-/g,'/'))
                // 根据终点日期筛选文章
                filtrateList = filtrateList.filter(article=>{
                    // 将文章的发布日期转化为时间戳
                    const date_unix = Date.parse(article.date.replace(/\-/g,'/'))
                    // 筛选
                    return date_unix <= lastDate_unix
                })
            }
            return filtrateList
        }
    },
    // 方法
    methods: {
        // 选中和取消选中标签
        pitchLabel(id){
            // 点击的是：已经选中的标签
            if(id === this.pitchLabelId) return this.pitchLabelId = ''
            // 点击的是：未被选中的标签
            this.pitchLabelId = id
        },
        // 点击文章标题，进入文章详情
        gotoArticle(id){
            this.$router.push({
            name:'article',
            params:{id}
            })
        }
    },
    // 生命周期钩子:创建后
    created() {
        // 获取标签列表
        this.labelList = JSON.parse(localStorage.getItem('labelData'))
        // 获取文章列表
        this.articleList = JSON.parse(localStorage.getItem('articleData'))
    },
}
</script>

<style lang="scss" scoped>
    // 组件标题
    .title{
        padding-bottom: 5px;
        border-bottom: 3px solid #222;
        margin-bottom: 10px;
    }
    // 筛选区
    .filtrate-box{
        border: 1px solid #222;
        padding: 10px;
        .label-filtrate{
            display: flex;
            margin-bottom:10px;
            .label-filtrate-item{
                margin-right: 10px;
                cursor: pointer;
                &:hover{
                    background-color: #222;
                    color: #fff;
                }
            }
            .active{
                color: #fff;
                background-color: #222;
                border-radius: 4px;
            }
        }
        .filtrate-span{
            color: #666;
        }
    }
</style>