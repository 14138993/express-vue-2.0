<style lang="scss" scoped>
  .margin{
    margin-top:10px;
    margin-left: 15px;
  }
  .img{
    float: right;
    .imgs{
      display: inline-block;
      width:50px;
      height: 40px;
      background: red;
      position: relative;
      top: 5px;
      float:left;
    }
    .name{
      margin-left:20px;
      display:inline-block;
      color: rgb(51, 122, 183);
      height: 40px;
      float:right;
      line-height: 50px;
    }
  }
  .sing{
    display: inline-block;
    font-size: 16px;
    float: right;
    height: 50px;
    padding: 15px 10px;
    font-size: 18px;
    line-height: 20px;
  }
</style>
<template>
<div class="container">
      <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">title</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
<!--         <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <form class="navbar-form navbar-left">
            <div class="form-group ">
              <input type="text" class="form-control " placeholder="请输入电影名称">
            </div>
            <button type="submit" class="btn btn-default">搜索</button>
          </form>
          <button type="submit" class="btn btn-danger del navbar-right margin">注销</button>          
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">后台管理 <span class="caret"></span></a>
              <ul class="dropdown-menu"  style="right: -95px;">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li role="separator" class="divider"></li>
                <li><a href="#">Separated link</a></li>
              </ul>
            </li>
          </ul>
          <div class="img">
            <span class="imgs"></span>
            <span class="name">123</span>
          </div>          
        </div> -->
        <div class="collapse navbar-collapse">
          <span class="sing"  @click='open(1)'>注册</span><span class="sing">|</span><span class="sing" @click='open(2)'>登录</span>      
        </div>        
      </div>
    </nav>
    <sign
      :title='Index'
    ></sign>
</div>
</template>

<script>
import sign from './sign'
export default {
    components:{
       sign
    },
    props:{
      navList:{
        type:Array,
      }
    },
    data () {
      return {
        Index:1,
      }
    },
    methods:{
      open(index){
         this.Index=index
         this.$store.dispatch('user/openModel')
      }
    },
}
</script>
