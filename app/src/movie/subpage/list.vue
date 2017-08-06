<template>
	<div class="container">
		<div class="row">
			<table class="table table-hover table-bordered">
				<thead>
					<tr>
						<th>电影名称</th>
						<th>导演</th>
						<th>国家</th>
						<th>上映年份</th>
						<th>录入时间</th>
						<th>查看</th>
						<th>更新</th>
						<th>删除</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for='(item,index) in dataList'>
						<td v-text='item.title' :title='item.title'></td>
						<td v-text='item.doctor' :title='item.doctor'></td>
						<td v-text='item.country' :title='item.country'></td>
						<td v-text='item.year' :title='item.year'></td>
						<td v-text='item.meta.createAt' :title='item.meta.createAt'></td>
						<td>
							<router-link :to="{ path: 'detile', query: { id:item._id}}">查看</router-link>	
						</td>
						<td>
							<router-link :to="{ path: 'admin', query: { movie_id:item._id }}">修改</router-link>								
						</td>
						<td>
							<button class="btn btn-danger del" @click='delet(item._id)'>删除</button>							
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				dataList:''
			}
		},
		methods:{
		  	delet(id){
		  	  	this.$http.ajax(res=>{
		  	  		if(!res.success)return;
		  	  		console.log('删除成功')
		  	  		this.getData();
		  	  	},'api/admin/delete-movie',{id:id},'GET')
		  	},			
			getData(){
				this.$http.ajax(res=>{
					if(res.success==1){
						this.dataList=res.data
					}
				},'api/admin/get-list',{},'GET')
			}
		},
		mounted(){
			this.getData()
		}
	}
</script>
