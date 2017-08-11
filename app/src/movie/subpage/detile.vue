<template>
<div class="container">
	<div class="row" >
		<div class="col-md-7">
			<video :src="dataList.flash" autoplay="true" width="720" height="600" >您的浏览器不支持 video 标签。</video>
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
	<comment></comment>
</div>
</template>
<script>
import comment from './comment.vue'
	export default{
		components:{
			comment
		},
		data(){
			return {
				dataList:''
			}
		},
		methods:{
			getData(id){
				this.$http.ajax(res=>{
					if(!res.success)return;
					this.dataList=res.data;
				},'api/movie/get-detile',{id:id},'GET')
			}
		},
		mounted(){
			if(!this.$route.query.id)return;
			this.getData(this.$route.query.id)
		}
	}
</script>
