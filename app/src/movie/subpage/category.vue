<style lang='scss' scoped>
	.button{
		text-align: right;
	    margin-bottom: 10px;
	}
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
	}		
</style>
<template>
	<div class="container">
		<div class="row">
			<div class="button">
				<button class="btn btn-primary" @click='tooleText(1)'>新增分类</button>
			</div>
			<table class="table table-hover table-bordered">
				<thead>
					<tr>
						<th>分类名称</th>
						<th>创建时间</th>
						<th>更新</th>
						<th>删除</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for='(item,index) in dataList'>
						<td v-text='item.name' :title='item.title'></td>
						<td v-text='item.meta.createAt' :title='item.meta.createAt'></td>
						<td @click='tooleText(2,item._id)'>修改	</td>
						<td>
							<button class="btn btn-danger del" @click='delet(item._id)'>删除</button>							
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<alert
			:alert-data='alertData'
			@alertCallback='alertData.confirmCallback'
		></alert>
		<model>
				<h3  slot="header">{{text}}</h3>
				<div  slot="body">
						<div class="form-group">
							<label for='#categoryname'>分类名 :</label>
							<input type="text" name="" v-model='category_name' placeholder="请输入分类名" id="categoryname">
						</div>
				</div>
				<span slot="footer" class="mod-btn  mod-btn-success" @click="save()">确定</span>		
		</model>		
	</div>
</template>
<script>
import model from '../../components/model.vue'
import Alert from '../../components/alert'
import {mapActions} from 'vuex'
	export default {
		components:{
			Alert,
			model
		},
		data(){
			return {
				category_name:'',
				category_id:'',
				text:'',
	      alertData:{
	      	type:'loading',
	      	isShow:true,
	      	message:'',
	      	btns:{
	      		confirm:false,
	      		cancel:false
	      	},
	      	confirmCallback:'',
	      	confirmCallbackObj:{}
	    	},				
				dataList:''
			}
		},
		methods:{
				...mapActions('user',[
	        'openModel',
	        "close"
					]),
				save(){
					var body={
							name:this.category_name,
					}
					this.category_id ? body.id = this.category_id :''
					this.$http.ajax(res=>{
						this.close()
						this.getData()
					},'api/admin/save-category',body)
				},
		//弹窗调用
				alertDataShow(type='loading',message='',show=true,confirm=false,cancel=false,Callback='',Obj={}){
					this.alertData={
		                type:type,
		                isShow: show,
		                message:message,
				      	btns:{
				      		confirm:confirm,
				      		cancel:cancel
				      	},                
		            confirmCallback:Callback,	
		            confirmCallbackObj:Obj	
					}
			  },	
			  tooleText(type,id){
			  	this.openModel();
			  	if(type==1){
			  		 this.text='新增分类'
			  	}else{
			  		this.text='修改分类'
			  		this.category_id=id
			  	}
			  },		
				delet(id){
					this.alertDataShow('warning','确定删除吗?',true,true,true,this.deletCallback,{id:id})
				},
		  	deletCallback(obj){
		  	  	this.$http.ajax(res=>{
		  	  		if(!res.success)return;
		  	  		this.alertDataShow('success','删除成功',true,true,false,this.getData,{})
		  	  	},'api/admin/delet-category',{id:obj.id},'GET')
		  	},			
			getData(){
				this.$http.ajax(res=>{
					if(res.success==1){
						this.dataList=res.data
						this.alertData.isShow=false;
					}
				},'api/admin/get-category-list',{},'GET')
			}
		},
		mounted(){
			this.getData()
		}
	}
</script>