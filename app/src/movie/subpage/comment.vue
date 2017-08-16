<style lang='scss' scped>
html {
    background-color: #f8f8f8;
    font-family: Arial,sans-serif;
    font-size: 13px
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
</style>
<template>
<div id="mains">
	<div id="list">
		<ul>
			<li v-for='(item,index) in datas'>
						<div class="po-avt-wrap">
							<a href="#comment" @click='comment_add_replay(item._id,item.from._id,item.from.userName)'>
                                <img class="po-avt" src="images/n5.jpg">                     
                            </a>
						</div>
						<div class="po-cmt">
							<div class="po-hd">
								<p class="po-name">
									{{item.from.userName}}
								</p>
								<div class="post">
									<p>
										{{item.content}}
									</p>
                                    <p @click='delet(item._id)'>删除</p>
			<!-- 						<img class="list-img" src="images/xa1.jpg" style="height: 80px;">
									<img class="list-img" src="images/ma1.jpg" style="height: 80px;">
									<img class="data-avt list-img" src="images/0.jpg" style="height: 80px;"> -->
								</div>
								<p class="time">
									1分钟前
								</p>
							</div>
                            <template v-if='item.replay.length > 0'>
    							<div class="r"></div>
    							<div class="cmt-wrap" v-for='(items,index) in item.replay'>
    								<div class="like">
    									<img src="images/l.png">
    									<!-- 鹿晗，林更新，杨幂，angelababy，范冰冰... -->
    								</div>
    								<div class="cmt-list">
    									<p><span>{{items.from.userName + ':'}}</span>{{items.content}}</p>
                                        <P @click='delet(items._id)'>删除</P>
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
        props:{
            datas:'',
        },
        data(){
            return {
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
            delet(id){
                console.log(id)
                this.$http.ajax(res=>{

                },'api/comment/delet-comment',{id:id},'GET')
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