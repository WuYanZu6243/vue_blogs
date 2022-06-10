<template>
    <!-- 文章列表 -->
    <div class="article-list">
      <div class="article-item" v-for="item in showArticleList" :key="item.id">
        <div class="title-label">
          <h4><span @click="clickTask(item.id)">{{item.title}}</span></h4>
          <p class="label">{{item.label}}</p>
        </div>
        <p class="article-abstract">{{item.abstract}}</p>
        <p class="article-date">{{item.date}}</p>
      </div>
    </div>
</template>

<script>
export default {
    name:'ArticleList',
    // 接收父组件传参
    props:['showArticleList'],
    // 方法
    methods: {
      // 触发父组件绑定的自定义‘click’事件
      clickTask(id){
        this.$emit('click',id)
      }
    },
}
</script>

<style lang="scss" scoped>
  // 文章列表
  .article-list{
    padding: 5px;
    height: 436px;
    margin-bottom: 10px;
    .article-item{
      margin-bottom: 10px;
      .title-label{
        display: flex;
        align-items: flex-end;
        h4{
          cursor: pointer;
          &:hover{
            background-color: #222;
            color: #fff;
          }
          span{
            border-bottom: 2px solid #222;
          }
        }
        .label{
          font-size: 12px;
          color: #888;
          margin-left: 10px;
        }
      }
      .article-abstract{
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        font-size: 14px;
        margin: 4px 0;
      }
      .article-date{
        font-size: 12px;
        color: #666;
      }
    }
  }
</style>