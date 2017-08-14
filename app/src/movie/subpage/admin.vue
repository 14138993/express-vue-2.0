<style lang='scss' scoped>
	.category{
		margin: 0;
		input{
			position: relative;
		    top: -3px;
		    margin-right: 5px;
		}
		label{
			padding: 0;
			width: 15%;
		}
	}
</style>
<template>
	<div class="container">
		<div class="row">
			<div class="form-group"  style='height:35px'>
				<label  for="inputdouban" class="col-sm-2 control-label">
				 同步豆瓣电影
				</label>
					<div class="col-sm-9">
						<input type="text" id="inputdouban" placeholder="请输入要同步的豆瓣电影id" class="form-control" v-model="synchronization_id" @blur='synchronization'>
					</div>				
			</div>		
			<div class="form-group"  style='height:35px'>
				<label  for="#inputTitle" class="col-sm-2 control-label">
				电影名字
				</label>
					<div class="col-sm-9">
						<input type="text" id="#inputTitle" class="form-control" v-model="form.title">
					</div>				
			</div>
			<div class="form-group category"  style='height:35px'>
				<label  for="#inputCategory" class="col-sm-2 control-label">
				电影类型
				</label>
					<div class="col-sm-9" >
						<label v-for='(item,index) in categorys' :for="'inputCategory'+index" class="col-sm-2 control-label" >
							<input type="radio" name='category' :id="'inputCategory'+index" :value="item._id" class="radio-inline" v-model="form.category">{{item.name}}
						</label>					
					</div>				
			</div>	
			<div class="form-group"  style='height:35px' v-if='form.category == 3'>
				<label  for="inputcategorys" class="col-sm-2 control-label">
				自定义分类名
				</label>
					<div class="col-sm-9">
						<input type="text" id="inputcategorys" class="form-control" v-model="form.category_name">
					</div>				
			</div>					
			<div class="form-group"  style='height:35px'>
				<label  for="#inputDoctor" class="col-sm-2 control-label">
				导演
				</label>
					<div class="col-sm-9">
						<input type="text" id="#inputDoctor" class="form-control" v-model="form.doctor">
					</div>				
			</div>
			<div class="form-group"  style='height:35px'>
				<label  for="#inputcountry" class="col-sm-2 control-label">
				国家
				</label>
					<div class="col-sm-9">
						<input type="text" id="#inputcountry" class="form-control" v-model="form.country">
					</div>				
			</div>
			<div class="form-group"  style='height:35px'>
				<label  for="#inputlanguage" class="col-sm-2 control-label">
				语言
				</label>
					<div class="col-sm-9">
						<input type="text" id="#inputlanguage" class="form-control" v-model="form.language">
					</div>				
			</div>
			<div class="form-group"  style='height:35px'>
				<label  for="#inputyear" class="col-sm-2 control-label">
				上映年份
				</label>
					<div class="col-sm-9">
						<input type="text" id="#inputyear" class="form-control" v-model="form.year">
					</div>				
			</div>	
			<div class="form-group"  style='height:35px'>
				<label  for="#inputsummary" class="col-sm-2 control-label">
				简介
				</label>
					<div class="col-sm-9">
						<input type="text" id="#inputsummary" class="form-control" v-model="form.summary">
					</div>				
			</div>
			<div class="form-group"  style='height:35px'>
				<label  for="#inputurl" class="col-sm-2 control-label">
				海报地址
				</label>
					<div class="col-sm-9">
						<input type="text" id="#inputurl" class="form-control" v-model="form.url">
					</div>				
			</div>
			<div class="form-group"  style='height:35px'>
				<label  for="#inputflash" class="col-sm-2 control-label">
				播放地址
				</label>
					<div class="col-sm-9">
						<input type="text" id="#inputflash" class="form-control" v-model="form.flash">
					</div>				
			</div>																						
			<div class="button">
				<button class="btn btn-success" @click='save()'>保存</button>
				<button class="btn btn-default" @click='$router.go(-1)'>取消</button>
			</div>
		</div>
		<alert
			:alert-data='alertData'
			@alertCallback='alertData.confirmCallback'
		></alert>
	</div>
</template>
<script>
import Alert from '../../components/alert'
export default {
  components:{
  	Alert
  },
  data () {
    return {
      alertData:{
      	type:'loading',
      	isShow:false,
      	message:'',
      	btns:{
      		confirm:true,
      		cancel:true
      	},
      	confirmCallback:'',
      	confirmCallbackObj:{}
      },
      synchronization_id:'',
      categorys:[],
      dataList: [],
			// form: {
			// 		id:this.$route.query.movie_id,
		 //      title: '机械战警',
			// 	  doctor: '何塞.帕蒂里亚',
			// 	  country: '美国',
			// 	  language: '英语',
			// 	  year: '2014',
			// 	  summary: '2028年，专事军火开发的机器人公司Omni Corp.生产了大量装备精良的机械战警，他们被投入到维和和惩治犯罪等行动中，取得显著的效果。罪犯横行的底特律市，嫉恶如仇、正义感十足的警察亚历克斯·墨菲（乔尔·金纳曼 Joel Kinnaman 饰）遭到仇家暗算，身体受到毁灭性破坏。借助于Omni公司天才博士丹尼特·诺顿（加里·奥德曼 Gary Oldman 饰）最前沿的技术，墨菲以机械战警的形态复活。数轮严格的测试表明，墨菲足以承担起维护社会治安的重任，他的口碑在民众中直线飙升，而墨菲的妻子克拉拉（艾比·考尼什 Abbie Cornish 饰）和儿子大卫却再难从他身上感觉亲人的温暖。',
			// 	  url: 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D280/sign=eb2b48795a43fbf2c52ca12b807fca1e/77c6a7efce1b9d16d08df710fadeb48f8c54647c.jpg',
			// 	  flash: 'http://player.youku.com/player.php/sid/XNja1Njc0NTUy/v.swf',
			// 	  ren: '小猪猪' 
			// } 
			form: {
				  category:'',
				  id:this.$route.query.movie_id,
		      	  title: '',
				  doctor: '',
				  country: '',
				  language: '',
				  year: '',
				  summary: '',
				  url: '',
				  flash: '',
				  category_name:'',
			} 			  
    }
  },
  methods:{
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
	  synchronization(){
	  	if(!this.synchronization_id)return;	
	  	this.$http.ajax(data=>{
	  				var doctorsArray = data.directors.map(item=>{
	  					 return item.name
	  				});
	  				console.log()
	  				console.log(data.title)
					var doctor = doctorsArray.join('/');
					console.log(doctor)
					// this.from.category=data.genres,
			      	this.form.title=data.title;
					this.form.doctor=doctor;
					this.form.country=data.countries.join('/');
					this.form.year=data.year;
					this.form.summary=data.summary;
					this.form.url=data.images.large;
	  	},`https://api.douban.com/v2/movie/subject/${this.synchronization_id}`,{id:this.synchronization_id},'get','jsonp')

	  },
  	  alertConfirm(){
  	  		this.$router.push('/list')
  	  },
	  getCatrgory(){
			this.$http.ajax(res=>{
				if(res.success==1){
					console.log(res.data)
					this.categorys=res.data
					this.categorys.push({
						name:'自定义',
						_id:3
					})
				}
			},'api/admin/get-category-list',{},'GET')
	  },  	  
  	  getData(id){
  	  		this.alertDataShow('loading')
  			this.$http.ajax(res=>{
  				if(!res.success)return;
  					this.form=res.data;
  					this.form.id=this.form._id;
  					this.alertData.isShow=false;	
  			},"/api/admin/save-updata-movie",{id:id},'GET')  	  	
  	  },
  	  save(){
  	  		let msg=this.$route.query.movie_id ? '编辑成功' : '新增成功';
 			this.alertDataShow('loading')
 			this.form.category == 3 ? '' : delete  this.form.category_name;
  			var _this=this;
  			this.$http.ajax(res=>{
  					this.alertDataShow('success',msg,true,true,false,this.alertConfirm);
  					// _this.$route.go({name:'/list'})
  			},"/api/admin/save-movie",this.form)
  	  }
  },
  mounted(){
  	if(this.$route.query.movie_id){
  		this.getData(this.$route.query.movie_id);
  	}
  	this.getCatrgory()
  }
}
</script>