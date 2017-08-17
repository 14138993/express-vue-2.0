<style lang='scss' scped>
html {
    background-color: #f8f8f8;
    font-family: Arial,sans-serif;
    font-size: 13px
}
p{
    margin: 0;
    padding:0;  
}
.mains,#list{
    width:720px;
}
#list li {
    line-height: 1.5;
    border-bottom: 1px solid #e2e2e2;
    margin-top: 15px;
    padding-bottom: 15px;
}

#list li, .po-hd {
    position: relative;
}
#list li, .cmt-wrap, .r, .time {
    clear: both;
}
#list, #list li, .po-hd, .post {
    overflow: hidden;
}
.po-avt-wrap {
    padding-left: 10px;
}
.po-avt {
    width: 40px;
    height: 40px;
    top: 0;
    left: 10px;
}
.po-avt {
    position: absolute;
}
.po-avt-wrap {
    padding-left: 10px;
}
.po-cmt {
    padding-left: 60px;
    padding-right: 10px;
    width: 100%;
    box-sizing: border-box;
}
.po-cmt, .post .list-img:nth-child(1), .time {
    float: left;
}

.post {
    color: #252525;
    padding-bottom: 10px;
}
#list, #list li, .po-hd, .post {
    overflow: hidden;
}
.time {
    color: #b1b1b1;
}
.time {
    font-size: 13px;
}
#list li, .cmt-wrap, .r, .time {
    clear: both;
}
.po-cmt, .post .list-img:nth-child(1), .time {
    float: left;
}

.c-icon {
    width: 20px;
    float: right;
}
.r {
    border-bottom: 8px solid #eee;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    width: 1px;
    margin-top: 5px;
    margin-left: 10px;
}
.po-hd,.cmt-wrap{
	text-align: left;
}
.cmt-wrap {
    width: 100%;
    background-color: #eee;
    font-size: 14px;
}
.like {
    color: #576b95;
    padding: 5px 5px 3px 12px;
}
.like img {
    width: 12px;
    padding-right: 5px;
}
.cmt-list {
    padding: 5px 12px;
    color: #454545;
}
.cmt-list p {
    padding-top: 3px;
}	
.save_comment{
    width:720px;
    padding-bottom:30px;
   .title{
        text-align:left;
        font-size:16px;
   }
   .button{
        text-align:left;
        margin-top:10px;
   }
}	
.po-name{
    margin-top:-10px;
    padding:10px 0px;
    .icons{
        float:right;
        .icon_ask{
            background: url('../../assets/image/price1.png') no-repeat;
            width: 20px;
            height: 21px;
            display: inline-block;
            background-size: 100%;
            margin-top:4px;
        }
        .icon_ask_active{
            background: url('../../assets/image/price_active1.png') no-repeat;
            background-size: 100%;
        }
        span{
            margin: 0 15px;
            position: relative;
            top: -4px;
        }
    }
}

.time{
    width: 100%;
    .delet{
        margin-right:60px;
        background: url('../../assets/image/delet1.png') no-repeat;
        background-size: 100%;
        width: 20px;
        height: 21px;
        display: inline-block; 
        float:right;       
    }
}
.name{
    color:#337ab7;
    font-size:18px;
}
.cmt-wrap{
    padding:10px;
}
.cmt-hd{
    padding-right:10px;
}
.content{
    font-size:14px;
    word-wrap:break-word;
    width: 450px;
    display:inline-block;
}
</style>
<template>
<div id="lea_message">
	<div id="list">
		<ul>
            <li v-for='(item,index) in datas'>              
                <div class="po-avt-wrap">
                    <a href="#comment" @click='comment_add_replay(item._id,item.from._id,item.from.userName)'>
                        <img class="po-avt" :src="item.from.img">                     
                    </a>                             
                </div>
                <div class="po-cmt">
                    <div class="po-hd">
                        <div class="cmt-hd">
                                <p class="po-name">
                                    <span class="name">{{item.from.userName + '：'}}</span>  
                                    <span class="content" v-html='item.content'> </span>
                                    <span class="icons">
                                        <span class="iconzan" @click="prise()">                  
                                                <!-- <i  class="icon_ask" title="赞"></i> -->
                                                <i class="icon_ask icon_ask_active" title="取消赞"></i>                               
                                                <span>{{item.praise_count}}</span>                    
                                        </span>                                           
                                    </span>                                                                                      
                                </p>                                    
                                <p class="time">
                                      {{item.send_time | filter_time}}
                                      <span class="delet" @click="delet(index,item._id)" ></span>
                                </p>                 
                            </div>                            
                        </div>
                    <template v-if='item.replay.length > 0'>
                        <div class="r" ></div>
                        <div class="cmt-wrap">
                            <div class="po-hd" v-for='items in item.replay'>
                                <p class="po-name">
                                     <span class="name">{{items.from.userName + '：'}}</span>  
                                     <span class="content" v-html='items.content'> </span>
                                     <span class="icons">
                                          <span class="iconzan" @click="prise()">                  
                                                <!-- <i  class="icon_ask" title="赞"></i> -->
                                                <i class="icon_ask icon_ask_active" title="取消赞"></i>                               
                                                <span>{{item.praise_count}}</span>                    
                                          </span>                                           
                                      </span>                                                                                      
                                </p>                                    
                                <p class="time">
                                <!-- | filter_net_time -->
                                      {{items.send_time | filter_time}}
                                      <span class="delet" @click="delet(index,items._id,item._id)" ></span>
                                </p>                 
                            </div>
                        </div>
                    </template>                      
                </div>
            </li>
		</ul>
	</div>
	<div class="save_comment">
	  <p class="title">我也说两句：</p>
	  <textarea class="form-control" rows="3" @keyup.enter='save'  :placeholder="placeholder" v-model='body.content' id="comment"></textarea>
      <div class="button">
        <button class="btn  btn-primary" @click='save'>提交评论</button>
        <button class="btn  btn-default" @click='cleaReplay'>取消</button>                 
      </div>	
	</div>
</div>	
</template>
<script>   
import {mapState} from 'vuex'
    export default {
        data(){
            return {
                datas:'',
                body:{
                    content:'',
                },
                placeholder:'请输入评论:',
            }
        },
        computed:{
            ...mapState('user',{
                user:state=>state.userMsg
            })
        },
        methods:{
            prise(){

            },
            delet(index,id,parent_id){
                var query={};
                if(parent_id){
                   query.parent_id=parent_id                    
                };
                query.id=id;
                this.$http.ajax(res=>{
                    if(parent_id){
                        this.datas.splice(index,1,res.comment)                       
                    }else{
                        this.datas.splice(index,1)
                    }
                },'api/comment/delet-comment',query,'GET')
            },
            cleaReplay(){
                this.body.content='';
                delete this.body.comment_id;
                delete this.body.to
                this.placeholder='请输入评论:'          
            },
            comment_add_replay(cid,tid,name){
                this.body.comment_id=cid;
                this.body.to=tid;
                this.placeholder=`回复${name}:`
            },
            getCommnet(){
                this.$http.ajax(res=>{

                },'api/comment/get-comment-list',{movie_id:this.$route.query.id},'GET')
            },
            save(){
                this.body.from=this.user.staff_id;
                this.body.movie=this.$route.query.id;
                this.$http.ajax(res=>{  
                     this.cleaReplay(); 
                     this.$emit('saveCallback',this.$route.query.id) 
                },'api/comment/save-comment',this.body)
            }
        },
        mounted(){
        }
    }
</script>