<template>
  <div id="AddArticle">
      <div id="FiltrateArticle">
        <!-- 组件标题 -->
        <h2 class="title">添加文章</h2>
        <!-- 添加文章表单 -->
        <form class="addArticleForm">
          标题:
          <input type="text" class="inputPublic addtitle" v-model="addArticle.title">
          日期:
          <input type="date" class="inputPublic addDate" v-model="addArticle.date">
          标签:
          <select class="inputPublic addLabel" v-model="addArticle.label">
            <option :value="label.name" v-for="label in labelList" :key="label.id">{{label.name}}</option>
          </select>
          摘要:
          <textarea class="inputPublic addAbstract" v-model="addArticle.abstract"></textarea>
          内容:
          <!-- 富文本编辑器 -->
          <quill-editor v-model="addArticle.content"/>
          <!-- 添加按钮 -->
          <div class="addArticleBtn" @click="submitAddArticle">添加</div>
        </form>
    </div>
  </div>
</template>

<script>
// 导入生成id的库
import {nanoid} from 'nanoid'

export default {
    name:'AddArticle',
    // 数据
    data() {
      return {
        // 添加文章表单数据
        addArticle:{
          id: '',
          title: '',
          label:'',
          date:'',
          abstract:'',
          content:''
        },
        // 标签列表:所有能选择的标签
        labelList:[]
      }
    },
    // 生命周期钩子:创建后
    created() {
      // 获取标签列表
      this.labelList = JSON.parse(localStorage.getItem('labelData'))
    },
    // 方法
    methods: {
      // 点击确认按钮,添加文章
      submitAddArticle(){
        // 限制表单各输入框内容不为空
        if(!this.addArticle.title.trim() || !this.addArticle.label.trim() 
        || !this.addArticle.date.trim() || !this.addArticle.abstract.trim() 
        || !this.addArticle.content.trim())
          return alert('检测到文章信息输入未完成,请继续输入!')
        // 生成id
        this.addArticle.id = nanoid()
        // 实际开发,需要在此发生请求到服务器去添加数据
        // 此例:用添加到浏览器缓存中
        const articleData = JSON.parse(localStorage.getItem('articleData'))
        articleData.unshift(this.addArticle)
        localStorage.setItem('articleData',JSON.stringify(articleData))
        // 跳转到全部文章页面
        this.$router.push('/allArticle')
      }
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
  // 添加文章表单
  .addArticleForm{
    padding: 5px;
    .inputPublic{
      width: 100%;
      height: 30px;
      box-sizing: border-box;
      margin-top: 5px;
      margin-bottom: 10px;
    }
    .addAbstract{
      height: 90px;
    }
    .addArticleBtn{
      width: 80px;
      line-height: 35px;
      text-align: center;
      border: 1px solid #ccc;
      cursor: pointer;
      color: #fff;
      background-color: #222;
      border-radius: 4px;
      margin-top: 15px;
    }
  }
  
</style>