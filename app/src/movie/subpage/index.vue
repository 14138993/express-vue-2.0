<style></style>
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
			    <template v-for='items in dataList'>
			  	<div class="panel panel-default">
			  		<div class="panel-heading clearfix">
			  			<h3>{{items.name}}</h3>
			  		</div>
			  	</div>
			  	<div class="panel-body" v-show='items.movies.length > 0'>
			  		<div class="row">
							<div class="col-md-3" v-for='item in items.movies'>
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
					</template>
				</div>
			</div>	
		</div>
	</div>	
</template>
<script>
import {mapState,mapActions,mapGetters} from 'vuex'
	export default {
		components:{
		},
		data(){
			return {
				dataList:'',
			}
		},
	    computed: {
	    	//将命名空间写在前面 不写则是state.user.is_open
            ...mapState('user',{
            	isOpen:state =>state.is_open,
            }),
	    },		
		methods:{
	        ...mapGetters('user',[
	            'getIsopen'
	        ]),			
			...mapActions('user',[
				'openModel',
				"close"
			]),
			getData(){				
				this.$http.ajax(res=>{
					if(!res.success)return;
					this.dataList=res.data;		
					console.log(res.data)			
				},'api/movie/get-home-list',{},'GET')
			}
		},
	  	beforeRouteEnter (to, from, next) {
	  		next()
	    // 在渲染该组件的对应路由被 confirm 前调用
	    // 不！能！获取组件实例 `this`
	    // 因为当钩子执行前，组件实例还没被创建
	  	},		
	  	beforeRouteUpdate (to, from, next) {
	  		next()
	    // 在当前路由改变，但是该组件被复用时调用
	    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
	    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
	    // 可以访问组件实例 `this`
	  	},
		beforeRouteLeave (to, from, next) {
		    // 导航离开该组件的对应路由时调用
		    // 可以访问组件实例 `this`
	  		next()
		    //next(false) 将会取消导航
		},	  			
		mounted(){			
			this.getData();
			// console.log(this.isopens)	
			// this.$store.commit('news/CLOSE_MODAL')		
			//动态创建store
			this.$store.registerModule('myModule',{
			        state: {},
			        mutations: {},
			        actions: {},
			        namespaced: true				
			})
			//动态删除
			this.$store.unregisterModule(['myModule'])
			//操作vuex的方法
			// this.$store.commit('OPEN_MODAL') //直接操作mutations的方法
			// this.$store.dispatch('openModel') //直接操作actions的方法
			// console.log(this.$store.getters.getIsopen) //获取getter的返回值
			// console.log(this.$store.state.user.is_open) //获取satet
			// this.openModel();
			// console.log(this.$store.state.user.is_open)
			// this.close();
			// console.log(this.$store.state.user.is_open)			
			// console.log(this.getIsopen())
			// console.log(this.isopen)
			// this.close()
			// console.log(this.getIsopen())
			// console.log(this.isopen)

		}
	}
</script>

