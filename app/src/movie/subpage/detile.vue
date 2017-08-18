<style lang='scss' scoped>
	.praise{
		text-align: left;
		.icon{
			float: left;
			margin-top:-7px;
			span{
				margin-right:10px;
			}
			.praise_count{
				position: relative;
				top: -3px;
			}
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
        }
        .PV{
        	float:left;
        	margin-right:15px;
			span{
				margin-right:5px;
			}        	
        }
    }    
</style>


<template>
<div class="container">
	<div class="row" >
		<div class="col-md-7">
			<video :src="dataList.flash" autoplay="true" width="720" height="600" >您的浏览器不支持 video 标签。</video>
			<div class="praise">
				<div class="PV">
					<span>播放次数:</span><span>{{dataList.PV}}</span>
				</div>
				<div class="icon">
					<span class="icon_ask" @click='praise(1)'></span><span class="praise_count">{{dataList.praise_count}}</span>
				</div>
			</div>
		</div>
		<div class="col-md-5">
			<dl class="dl-horizontal">
				<dt>电影名字</dt>
				<dd>{{dataList.title}}</dd>
				<dt>导演</dt>
				<dd>{{dataList.doctor}}</dd>
				<dt>国家</dt>
				<dd>{{dataList.country}}</dd>
				<dt>语言</dt>
				<dd>{{dataList.language}}</dd>
				<dt>上映年份</dt>
				<dd>{{dataList.year}}</dd>
				<dt>简介</dt>
				<dd>{{dataList.summary}}</dd>
			</dl>
		</div>
	</div>	
	<comment 
		:datas='comment_content'
		@saveCallback='getData'
	></comment>
</div>
</template>
<script>
import comment from './comment.vue'
import {mapState} from 'vuex'
	export default{
		components:{
			comment
		},
		data(){
			return {
				dataList:'',
				comment_content:[],
				alert:{
					sunm:1
				},
			}
		},
		computed:{
			...mapState('user',{
				 userMsg:state=>state.userMsg
				})
		},
		methods:{
			praise(type){
				var url
				if(type){
					url='api/movie/add-praise'
					this.dataList.praise_count=this.dataList.praise_count++
				}else{
					url='api/movie/delet-praise'
				}
				this.$http.ajax(res=>{

				},url,{movies:this.$route.query.id,user:this.userMsg.staff_id})
			},
			getData(id){
				this.$http.ajax(res=>{
					if(!res.success)return;
					this.dataList=res.data.movie;
					this.comment_content=res.data.comment;
				},'api/movie/get-detile',{id:id},'GET')
			}
		},
		mounted(){
			if(!this.$route.query.id)return;
			this.getData(this.$route.query.id)
		}
	}
</script>
