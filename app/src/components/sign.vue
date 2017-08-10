<style lang="scss">
.form-group{
	width:500px;
	>label{
		width: 80px;
		text-align: center;
	}
	>input{
		height: 40px;
		width:400px;
	}
	#signAdmin{
	    height: 15px;
	    width: 30px;
	    position: relative;
	    top: 5px;
	    left: -4px;
	}
}

</style>
<template>
	<div class="sign" v-if='isOpen'>
		<modal>
			<h3  slot="header">{{titleText}}</h3>
			<div  slot="body">
				<div class="containers">
					<div class="row">
						<div class="form-group">
							<label for='#signName'>用户名 :</label>
							<input type="text" name="" v-model='sing.userName' placeholder="请输入用户名" id="signName">
						</div>
						<div class="form-group">
							<label for='#signPassword'>密码 :</label>
							<input type="text" name="" v-model='sing.password' placeholder="请输入密码" id="signPassword">
						</div>	
						<div class="form-group" v-if='title==1'>
							<label for='#signAdmin'>管理员 :</label>
							<input type="checkbox" name="" v-model='sing.isAdmin'  id="signAdmin">
						</div>												
					</div>
				</div>
			</div>	    		
			<span slot="footer" class="mod-btn  mod-btn-success" @click="save()">{{titleText}}</span>
		</modal>	
	</div>
</template>
<script>
import modal from './model'
import {mapActions,mapState} from 'vuex'
	export default {
		components:{
			modal
		},
		props:{
			title:Number
		},
		data(){
			return{
				sing:{
					userName:'',
					password:'',
					isAdmin:0,
				},
				api:''
			}
		},
	    computed:{
            ...mapState('user',{
            	isOpen:state =>state.is_open,
            }),
            titleText(){
            	if(this.title==1){
            		this.api='api/user/set-signup';
            		return '注册'
            	}else{
            		this.api='api/user/get-sign';
            		return '登录'
            	}
            }
	    },		
		methods:{
			...mapActions('user',[
				"close"
			]),
			save(){
				this.sing.isAdmin=this.sing.isAdmin ? 1 :0;
				this.$http.ajax(res=>{
					if(!res.success)return;
					this.dataList=res.data;					
				},this.api,this.sing,'POST')				
				this.close();
			}
		}
	}
</script>
