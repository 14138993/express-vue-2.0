<style></style>
<template>
	<div id="content_mian">
		
		<div class="container">
			<div class="row">
				<div class="col-md-2" v-for='item in dataList'>
					<router-link :to="{ path: 'detile', query: { id:item._id}}">
						<img :src="item.url" width="100%" height='100%' alt="">
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
</template>
<script>
	export default {
		data(){
			return {
				dataList:'',
			}
		},
		methods:{
			getData(){				

				this.$http.ajax(res=>{
					if(!res.success)return;
					this.dataList=res.data;
				},'api/movie/get-home-list',{},'GET')
			}
		},
		mounted(){
			this.getData();
		}
	}
</script>

