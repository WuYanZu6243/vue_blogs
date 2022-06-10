<template>
  <div id="AllArticle">
    <!-- 组件头部 -->
    <div class="AllArticle-top">
      <!-- 组件标题 -->
      <h2 class="title">全部文章</h2>
      <!-- 搜索框 -->
      <input class="search" type="text"  placeholder='搜索文章...' @input="searchAllArticle($event)">
    </div>
    <!-- 文章列表 -->
    <ArticleList :showArticleList="showArticleList" @click="gotoArticle"/>
    <!-- 分页 -->
    <Paging :pagenum='queryInfo.pagenum' :pagesize='queryInfo.pagesize' 
    :total='searchTotal' @cutPage="cutPage"/>
  </div>
</template>

<script>
// 导入自定义的文章列表组件
import ArticleList from '../components/ArticleList.vue'
// 导入自定义的分页组件
import Paging from '../components/Paging.vue'

export default {
    name:'AllArticle',
    // 注册子组件
    components: {Paging,ArticleList},
    // 数据
    data() {
      return {
        // 文章列表
        articleList:[],
        // 文章请求参数
        queryInfo:{
          query:'',
          pagenum:1,
          pagesize:6
        },
        // 通过搜索的文章列表
        searchArticleList:[],
        // 搜索框的防抖节流
        searchTimer:null
      }
    },
    // 计算属性
    computed:{
      // 当前页需要展示的文章
      showArticleList(){
        // 根据查询条件,筛选数据
        const filterData = this.articleList.filter(item=>{
          return item.title.indexOf(this.queryInfo.query) !== -1
        })
        // 保存到 通过搜索的文章列表
        this.searchArticleList = filterData
        // 当前页最后一条数据的索引
        const lastIndex = this.queryInfo.pagenum * this.queryInfo.pagesize
        // 返回数据
        return filterData.slice(lastIndex-this.queryInfo.pagesize,lastIndex)
      },
      // 通过搜索参数筛选的文章总数
      searchTotal(){
        return this.searchArticleList.length
      },
    },
    // 方法
    methods: {
      // 分页组件自定义事件:切换页码
      cutPage(newPagenum){
        // 更新当前页
        this.queryInfo.pagenum = newPagenum
      },
      // 搜索文章
      searchAllArticle(e){
        // 清楚上一次的定时器
        clearTimeout(this.searchTimer)
        // 0.5秒后再更新
        this.searchTimer = setTimeout(() => {
          console.log(e.target.value);
          // 根据搜索的输入,更新列表查询参数
          this.queryInfo.query = e.target.value.trim();
        }, 500);
      },
      // 点击文章标题，进入文章详情
      gotoArticle(id){
        this.$router.push({
          name:'article',
          params:{id}
        })
      }
    },
    // 生命周期钩子:'创建后'created
    created(){
      // 实际开发:在此发生请求去获取后台数据
      // 本例:在此从浏览器缓存中获取数据
      this.articleList = JSON.parse(localStorage.getItem('articleData'))
    },
}
</script>

<style lang="scss" scoped>
  // 组件头部
  .AllArticle-top{
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    border-bottom: 3px solid #222;
    margin-bottom: 10px;
  }
</style>