<style lang="scss" scoped>
.pagination {
  text-align: center;
  .pagination-wrapper {
    display: inline-block;
    font-size: 12px;
    .page-prev,
    .page-next {
      margin: 0px 3px;
      padding: 2px 5px;
      border: #ccc 1px solid;
      color: #444;
      background-color: #fff;
      transition: color .2s, border-color .2s;
      cursor: pointer;
      &:hover {
        color: #006eb2;
        border-color: #006eb2;
      }
      &.active {
        color: #006eb2;
        cursor: default;
        &:hover {
          color: #006eb2;
          border-color: #ccc;
        }
      }


    }
    .page-num {
      margin: 0px 3px;
      padding: 2px 5px;
      border: #ccc 1px solid;
      color: #444;
      background-color: #fff;
      transition: color .2s, border-color .2s;
      &.active {
        color: #006eb2;
        border-color:#006eb2;
        cursor: default;
      }
      &:hover {
        color: #006eb2;
        border-color: #006eb2;
      }
    }
    .per-page {
      width: 35px;
      height: 22px;
      text-align: center;
    }
  }
}
.none{
  display:none;
}
</style>
<template>
  <div class="pagination">
    <div class="pagination-wrapper">
      <span class="">共 <span v-text="page.totalCount"></span> 部</span>
      <a :class="[page.pageIndex == 1?'active':'']" @click="staffPage(page.pageIndex-1)" class="page-prev">&lt;</a>
      <a v-show="page.pageIndex >= 4" @click="staffPage(1)" class="page-num" >1</a>
      <a v-show="page.pageIndex >= 5" @click="staffPage(2)" class="page-num" >2</a>
      <span v-show="page.pageIndex >= 6" class="">...</span>
        
      <a v-for="pages in pageBtn" :class="[pages == page.pageIndex?'active':'',pages==1?!oneshow? 'none' : '':pages==2? !twoshow ? 'none':'':'']" @click="staffPage(pages)" class="page-num" v-text="pages"></a>

      <span v-show="page.pageIndex <= (totalPace - 3)" class="">...</span>

      <a :class="[page.pageIndex == totalPace||totalPace == 0?'active':'']" @click="staffPage(page.pageIndex+1)" class="page-next">&gt;</a>
      每页显示 <input class="per-page" type="number" @change="sizeChange" v-model="size" number> 行

      <span class="">共</span> <span>{{totalPace}}</span> 页，到第 <input class="per-page" type="number" v-model="newpageIndex" value= "1" min = "1" :max="allPace" number/> 页
      <a @click="staffPage(newpageIndex)" class="page-num">确定</a>
    </div>
  </div>
</template>
<script>
  export default{
    /* *  分页条组件所需数据
     * pageIndex 当前页
     * pageSize 显示多少条数据
     * totalCount 数据总条数
     * pageCount 分页按钮数
     * */
    name: 'full-featured-pagination',
    props: {
      page:{
        type:Object
      }
    },
    data: function () {
      return {
        size: '',
        newpageIndex: 1,
        allPace: 0,
        oneshow:true,
        twoshow:true,        
      }
    },
    ready: function () {
      
    },
    computed: {
      totalPace: function () {
        /*分页条共有多少条*/
        this.allPace=Math.ceil(this.page.totalCount / this.page.pageSize);
        this.size = this.page.pageSize;
        return Math.ceil(this.page.totalCount / this.page.pageSize);
      },
      pageBtn: function () {

        var arr = [];
            this.oneshow=this.page.pageIndex>=4?false:true
            this.twoshow=this.page.pageIndex>=5?false:true        
        if (this.totalPace <= this.page.pageCount) {
          if (this.page.totalCount == 0) {
            arr = [1];
          } else {
            for (let i = 0; i < this.totalPace; i++) {
              arr[i] = i + 1;
            }
          }
        } else {

          if (this.page.pageIndex < (this.page.pageCount - Math.floor(this.page.pageCount / 2))) {
            for (let i = 0; i < this.page.pageCount; i++) {
              arr[i] = i + 1;
            }
          } else {
            if (this.page.pageIndex > (this.totalPace - Math.ceil(this.page.pageCount / 2))) {
             
              for (let i = 0; i < this.page.pageCount; i++) {
                arr[i] = this.totalPace - this.page.pageCount + 1 + i;
                 console.log(this.totalPace - this.page.pageCount + 1 + i )
              }
            } else {
              for (let i = 0; i < this.page.pageCount; i++) {
                arr[i] = this.page.pageIndex - Math.floor(this.page.pageCount / 2) + i;
                console.log(this.page.pageIndex - Math.floor(this.page.pageCount / 2) + i)
              }
            }
          }
        }
        return arr;
      }
    },
    methods: {
      staffPage: function (num) {
        if (this.page.pageIndex == num || num < 1 || num > this.totalPace) {
        } else {
         this.oneshow=num>=4?false:true
         this.twoshow=num>=5?false:true           
          this.page.pageIndex = num;
          this.$emit('page-change');
        }
      
      },
      sizeChange: function () {
        if (this.size <= 0) {
          this.size = 1;
        } else if (this.size == this.page.pageSize) {
          return
        }
        this.page.pageIndex = 1;
        this.page.pageSize = this.size;
        this.oneshow=this.twoshow=true
        this.$emit('page-change');
      },
    },
    // 监听总数据条数判断总数据的变化对分页条数的影响
    watch: {
      'page.totalCount': function (val, oldVal) {
        // 如果当前页在最后一页且数据变化后总分页条数改变
        if (this.page.pageIndex != 1 && (this.page.pageIndex == Math.ceil(oldVal / this.page.pageSize)) && (Math.ceil(val / this.page.pageSize) != Math.ceil(oldVal / this.page.pageSize))){
            // 当前页等于变化后的最后一页s
            $console.log('new: %s, old: %s', val, oldVal);
            this.page.pageIndex = Math.ceil(val / this.page.pageSize);
            //获取数据
            this.$emit('page-change');
        }
      },
      'pageSize':function(val,oldval){
      	 this.size =val
      }
    }
  }
</script>