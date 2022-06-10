<template>
  <div id="article">
    <!-- 组件头部 -->
    <div class="article-top">
      <!-- 文章标题 -->
      <h2 class="title">{{article.title}}</h2>
      <!-- 文章标签 -->
      <span class="label">{{article.label}}</span>
      <span class="date">{{article.date}}</span>
    </div>
    <!-- 文章摘要 -->
    <div class="abstract"><span>摘要：</span>{{article.abstract}}</div>
    <!-- 文章内容 -->
    <div class="content" v-html="article.content">{{article.content}}</div>
    <!-- 评论区 -->
    <div class="comments-section">
      <!-- 评论标题 -->
      <span class="comments-title">评论：</span>
      <!-- 评论输入 -->
      <div class="commentsInput clearfix">
        <textarea placeholder="留下点什么吧..." v-model="commentContent"></textarea>
        <span class="commentsBtn" @click="submitComment">评论</span>
      </div>
      <!-- 评论列表 -->
      <ul class="comments-list">
        <li class="comments-item" v-for="comment in comments" :key="comment.id">
          <!-- 头像 -->
          <img class="comments-head" src="../assets/img/head.png" alt="">
          <!-- 内容 -->
          <span class="comments-content">{{comment.content}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {nanoid} from 'nanoid'

export default {
  name:'Article',
  // 数据
  data() {
    return {
      // 本篇文章的id
      articleId:'',
      // 文章详情数据
      article:{},
      // 评论输入框的内容
      commentContent:'',
      //本篇文章的评论
      comments:[]
    }
  },
  // 生命周期钩子:'创建后'created
  created(){
    // 获取到文章id
    this.articleId = this.$route.params.id
    // 实际开发:根据id到服务器获取文章详情数据
    // 本例:在此从浏览器缓存中获取文章详情数据
    const articleList = JSON.parse(localStorage.getItem('articleData'))
    this.article = articleList.find(article=>article.id === this.articleId)
    // 获取缓存中的所有评论
    const commentData = JSON.parse(localStorage.getItem('commentData')) || []
    // 根据文章id筛选出本文的评论
    this.comments = commentData.filter(item=>{
      return item.articleId === this.articleId
    })

  },
  // 方法
  methods: {
    // 提交评论
    submitComment(){
      // 组织好评论数据
      const comment = {
        id:nanoid(),
        articleId:this.articleId,
        content:this.commentContent
      }
      // 将新评论插入到数据中,更新评论列表数据
      this.comments.unshift(comment)
      // 持久化保存
      const commentData = JSON.parse(localStorage.getItem('commentData'))
      commentData.unshift(comment)
      localStorage.setItem('commentData',JSON.stringify(commentData))
      // 清空输入框
      this.commentContent = ''
    },
  },
}
</script>

<style lang="scss" scoped>
  // 组件标题
  .article-top{
    display: flex;
    align-items: flex-end;
    padding-bottom: 5px;
    border-bottom: 3px solid #222;
    margin-bottom: 10px;
    .label{
      margin: 0px 20px;
    }
    .date{
      font-size: 14px;
      color: #888;
    }
  }
  .abstract{
    border: 1px solid #888;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #eee;
    span{
      font-weight: bold;
    }
  }
  .comments-section{
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #222;
    .comments-title{
      font-size: 20px;
      font-weight: bold;
    }
    .commentsInput{
      margin-top: 5px;
      border: 1px solid #888;
      border-radius: 5px;
      padding: 5px;
      textarea{
        width: 100%;
        height: 70px;
        border: none;
        outline:none;
      }
      .commentsBtn{
        float:right;
        width: 60px;
        line-height: 25px;
        border: 1px solid #222;
        border-radius: 4px;
        text-align: center;
        cursor: pointer;
        background-color: #ccc;
        margin-top: 5px;
      }
    }
    .comments-list{
      margin-top: 10px;
      .comments-item{
        margin-top: 4px;
        display: flex;
        .comments-head{
          width: 30px;
          height: 30px;
        }
        .comments-content{
          margin-left: 10px;
          // border: 1px solid #999;
          background-color: #ddd;
          border-radius: 5px;
          padding: 2px;
          position: relative;
          line-height: 30px;
          &::before{
            content: '';
            display: block;
            width: 0px;
            height: 0px;
            border:10px solid;
            border-color: transparent #ddd transparent transparent ;
            position: absolute;
            left: -20px;
          }
        }
      }
      
    }
    // 清楚浮动
    .clearfix::after{
      content: "";
      display: block;
      clear: both;
    }
  }
</style>