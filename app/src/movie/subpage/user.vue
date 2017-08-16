<style lang='scss' scoped>
.form-group{
	height: 35px;
}
.user_img{
	position:relative;
	width: 150px;
    height: 150px;
    margin: auto;
    img{
    	max-width: 100%;
    	max-height: 100%;
    	min-height: 100%;
    	min-width: 100%;
    }
}
.title_img{
	position: relative;
	top: 70px;
}
#file{
	display: block;
    width: 100%;
    position: absolute;
    top: 0px;
    height: 150px;
    opacity: 0;
}
.button{
    position: absolute;
    top: 55px;
    left: 190px;
    span{
    	display:inline-block;
    	color: #337ab7;
    	margin-top: 10px;
    }	
}
</style>

<template>
	<div class="container">
		<div class="row">	
			<div class="form-group" style='height:150px;'>
				<label  for="#inputTitle" class="col-sm-2 control-label title_img">
				 头像
				</label>
				<div class="user_img">
					<img :src="userMsg.img" id="image">
					<input type="file" name="file" id="file"/>
					<div class="button ">
						<button id="upload" class="btn  btn-primary">上传</button>
						<span id="progress">0%</span>			
					</div>
				</div>
			</div>
			<div class="user_name form-group" >
				<label  for="#inputTitle" class="col-sm-2 control-label">
				 用户名
				</label>
				<div class="col-sm-9">
					<input type="text" id="#inputTitle" class="form-control" disabled="disabled" v-model="userMsg.staff_name">
				</div>
			</div>
										
			<div class="form-group"  >
				<label  for="#inputTitle" class="col-sm-2 control-label">
				 邮箱
				</label>
				<div class="col-sm-9">
					<input type="text" id="#inputTitle" class="form-control" v-model="userMsg.email">
				</div>				
			</div>	
			<div class="form-group"  >
				<label  for="#inputTitle" class="col-sm-2 control-label">
				手机号
				</label>
				<div class="col-sm-9">
					<input type="text" id="#inputTitle" class="form-control" v-model="userMsg.tel">
				</div>				
			</div>	
	      <div class="buttons">
	        <button class="btn  btn-primary" @click='save'>修改</button>
	        <button class="btn  btn-default" @click='$router.go(-1)'>返回</button>                 
	      </div>																				
		</div>
	</div>	
</template>
<script>
import fileup from '../../assets/js/fileup.js'
import {mapState} from 'vuex'
	export default {
		data(){
			return {
			}
		},
		computed:{
			...mapState('user',{
				userMsg:state=>state.userMsg
			})
		},
		methods:{
			save(){
				this.userMsg.userName=this.userMsg.staff_name;
				this.userMsg._id=this.userMsg.staff_id

				this.$http.ajax(res=>{
					console.log(res)
				},'api/user/updata-user',this.userMsg)
			},
			getUrl(url){
				this.userMsg.img=url
				console.log(this.userMsg)
			}
		},
		mounted(){
  			fileup('api/admin/set-upload/user',this.getUrl)
		}
	}
</script>