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
          position: relative;
          top: 5px;
          float:left;
          img{
            max-height: 100%;
            max-width: 100%;
            min-width: 100%;
            min-height: 100%;
          }
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
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" v-if='userMsg'>
          <button type="submit" class="btn btn-danger del navbar-right margin" @click='logout'>注销</button>          
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown" v-if='userMsg.isAdmin==1'>
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">后台管理 <span class="caret"></span></a>
              <ul class="dropdown-menu"  style="right: -85px;width:184px;">
                  <router-link to="/" tag='li' exact class='nav_li'><a href="#">首页</a></router-link>    
                  <router-link to="/user" tag='li' exact class='nav_li'><a href="#">个人中心</a></router-link>          
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
            <span class="imgs">
              <img :src="userMsg.img" alt="">
            </span>
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
import {mapActions,mapState} from 'vuex'
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
        isopen:false,
      }
    },
    computed:{
        ...mapState('user',{
            userMsg:state=>state.userMsg
        })
    },
    methods:{
      ...mapActions('user',[
            'deletUser',
            'openModel'
        ]),
      getUser(){
        this.isopen=false
      },
      logout(){
         this.$http.ajax(res=>{
            this.deletUser()
            var routeNames=['movieIndex','detileIndex','errorIndex']; 
            if(routeNames.indexOf(this.$route.name)== -1){
              this.$router.push('/')
            }
         },'api/user/get-logout',{})
      },
      open(index){
         this.isopen=true
         this.Index=index
         this.openModel()
      }
    },
    mounted(){
    }
}
</script>
