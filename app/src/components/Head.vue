<style lang="scss" scoped>
  .container{
    padding:0;
      .margin{
        margin-top:10px;
        margin-left: 15px;
      }
      .img{
        margin-right:20px;
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
      .nav_li{
        a{
          padding:10px;
        }
      }       
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
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" v-if='userMsg'>
<!--           <form class="navbar-form navbar-left">
            <div class="form-group ">
              <input type="text" class="form-control " placeholder="请输入电影名称">
            </div>
            <button type="submit" class="btn btn-default">搜索</button>
          </form> -->
          <button type="submit" class="btn btn-danger del navbar-right margin" @click='logout'>注销</button>          
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown" v-if='userMsg.isAdmin==1'>
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">后台管理 <span class="caret"></span></a>
              <ul class="dropdown-menu"  style="right: -85px;width:184px;">
                  <router-link to="/" tag='li' exact class='nav_li'><a href="#">首页</a></router-link>              
                  <router-link to="/admin"  tag='li' class='nav_li'><a href="#" class="dropdown-toggle">录入页</a></router-link>
                  <router-link to="/list" tag='li' class='nav_li'><a href="#">列表页</a></router-link>
                  <router-link to="/category" tag='li' class='nav_li'><a href="#">分类页</a></router-link>
              </ul>
            </li>
            <li class="dropdown" v-if='userMsg.isAdmin==0'>
              <router-link to="/" tag='li' exact class='nav_li'><a href="#">首页</a></router-link>
              <router-link to="/user" tag='li' exact class='nav_li'><a href="#">个人中心</a></router-link>
            </li>            
          </ul>
          <div class="img">
            <span class="imgs"></span>
            <span class="name">{{userMsg.staff_name}}</span>
          </div>          
        </div>
        <!-- user 属性挂载在vue的原型上 在这里能够直接使用 -->
        <div class="collapse navbar-collapse" v-if='!userMsg'>
          <span class="sing"  @click='open(1)'>注册</span><span class="sing">|</span><span class="sing" @click='open(2)'>登录</span>      
        </div>        
      </div>
    </nav>
    <sign
      v-if='isopen'
      :title='Index'
      @logins='getUser'
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
        userMsg:'',
        isopen:false,
      }
    },
    computed:{
    },
    methods:{
      getUser(user){
        console.log(user)
        this.userMsg=user
      },
      logout(){
         this.$http.ajax(res=>{
            this.userMsg=this.user=false;
         },'api/user/get-logout',{})
      },
      open(index){
         this.isopen=true
         this.Index=index
         this.$store.dispatch('user/openModel')
      }
    },
    mounted(){
      this.userMsg=this.user
    }
}
</script>
