<style lang='scss' scoped>
	.panel-heading{
		text-align: left;
	}
	img{
		max-height: 230px;
	}	
</style>
<template>
	<div id="content_mian">
		<div class="container">
			<div class="row">
			  <div class="cil-md-12">
			  	<div class="panel panel-default">
			  		<div class="panel-heading clearfix">
			  			<h3 class="title">{{moreApi.name}}</h3>
			  		</div>
			  	</div>
			  	<div class="panel-body" v-show='dataList.length > 0'>
			  		<div class="row">
							<div class="col-md-3" v-for='item in dataList'>
								<router-link :to="{ path: 'detile', query: { id:item._id}}" class='thumbnail'>
									<img :src="item.url" width="100%"  alt="">
									<p class="caption">
										<h3>{{item.title}}</h3>
										<p>
											<router-link :to="{ path: 'detile', query: { id:item._id}}" class='btn btn-primary'>观看预告片</router-link>
										</p>
									</p>
								</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>	
		</div>
	  <pagination 
	  @page-change="getData()" 
	  :page="pagination" 
	  v-if='pagination.totalCount>0'
	  ></pagination>		
	</div>	
</template>
<script>
import Pagination from '../../components/fullFeatured.vue'
	export default {
		components:{
			Pagination
		},
		props : {
			moreApi:{
				type:Object,
			}
		},
		data () {
			return {
				dataList:[],
	            // 翻页器数据
	            pagination: {
	              pageIndex: 1,
	              pageSize: 4,
	              totalCount:0,
	              pageCount:5,
	            },				
			}
		},
		watch:{
			'moreApi':function(){
				console.log(this.moreApi)
			}
		},
		methods : {
			getData(){
				if(!this.moreApi.url) return;
				this.moreApi.query.page=this.pagination.pageIndex
				this.moreApi.query.perPage=this.pagination.pageSize
				this.$http.ajax(res=>{
					this.dataList=res.data.data
					this.pagination.totalCount=res.data.total
				},this.moreApi.url,this.moreApi.query,'GET')
			},
		},
		mounted () {
			this.getData()
		}
	}
</script>