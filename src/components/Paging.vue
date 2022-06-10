<template>
    <div id="paging">
        <div class="previous-page" :class="pagenum === 1 ? 'not-allowed' : ''" @click="previousPage">上一页</div>
        <div class="pages">
            <span v-for="i in aggPage" :key="i" :class="i === pagenum ? 'active' : ''" @click="page(i)">{{i}}</span>
        </div>
        <div class="next-page" :class="pagenum === aggPage? 'not-allowed' : ''" @click="nextPage">下一页</div>
    </div>
</template>

<script>
export default {
    name:'Paging',
    // 父组件的传参
    props:['pagenum','pagesize','total'],
    // 计算属性
    computed:{
        // 总页数:一共有多少页
        aggPage(){
            // 向上取整
            return Math.ceil(this.total / this.pagesize) || 1;
        }
    },
    // 方法
    methods:{
        // 上一页
        previousPage(){
            if(this.pagenum === 1) return
            this.$emit('cutPage',this.pagenum - 1)
        },
        // 下一页
        nextPage(){
            if(this.pagenum === this.aggPage) return
            this.$emit('cutPage',this.pagenum + 1)
        },
        // 具体页
        page(i){
            this.$emit('cutPage',i)
        }
    },
}
</script>

<style lang="scss" scoped>
    #paging{
        color: #3f4852;
        font-size: 14px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        div{
            cursor: pointer;
            margin-right: 15px;
            &:last-child{
                margin-right: 0;
            }
        }
        .previous-page:hover{
            color: #000;
        }
        .pages{
            span{
                margin-right: 10px;
                padding: 0px 2px;
                &:last-child{
                    margin-right: 0;
                }
                &:hover{
                    color: #000;
                }
            }
            .active{
                color: #000;
                box-sizing: border-box;
                border-bottom: 2px solid #000;
            }
        }
        .next-page:hover{
            color: #000;
        }
        .not-allowed{
            cursor:not-allowed;
        }
    }
</style>