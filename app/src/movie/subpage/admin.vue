<template>
	<div class="container">
		<div class="row">
			<div class="form-group"  style='height:35px'>
				<label  for="#inputTitle" class="col-sm-2 control-label">
				电影名字
				</label>
					<div class="col-sm-9">
						<input type="text" id="#inputTitle" class="form-control" v-model="form.title">
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
				<button class="btn btn-default ">取消</button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  data () {
    return {
      dataList: [],
			// form: {
			// 		id:this.$route.query.movie_id,
		 //      title: '机械战警',
			// 	  Doctor: '何塞.帕蒂里亚',
			// 	  country: '美国',
			// 	  language: '英语',
			// 	  year: '2014',
			// 	  summary: '2028年，专事军火开发的机器人公司Omni Corp.生产了大量装备精良的机械战警，他们被投入到维和和惩治犯罪等行动中，取得显著的效果。罪犯横行的底特律市，嫉恶如仇、正义感十足的警察亚历克斯·墨菲（乔尔·金纳曼 Joel Kinnaman 饰）遭到仇家暗算，身体受到毁灭性破坏。借助于Omni公司天才博士丹尼特·诺顿（加里·奥德曼 Gary Oldman 饰）最前沿的技术，墨菲以机械战警的形态复活。数轮严格的测试表明，墨菲足以承担起维护社会治安的重任，他的口碑在民众中直线飙升，而墨菲的妻子克拉拉（艾比·考尼什 Abbie Cornish 饰）和儿子大卫却再难从他身上感觉亲人的温暖。',
			// 	  url: 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D280/sign=eb2b48795a43fbf2c52ca12b807fca1e/77c6a7efce1b9d16d08df710fadeb48f8c54647c.jpg',
			// 	  flash: 'http://player.youku.com/player.php/sid/XNja1Njc0NTUy/v.swf',
			// 	  ren: '小猪猪' 
			// } 
			form: {
					id:this.$route.query.movie_id,
		      title: '',
				  doctor: '',
				  country: '',
				  language: '',
				  year: '',
				  summary: '',
				  url: '',
				  flash: '',
			} 			  
    }
  },
  methods:{
  	  getData(id){
  			this.$http.ajax(res=>{
  				if(!res.success)return;
  					this.form=res.data;
  					this.form.id=this.form._id;
  					console.log(this.form)
  			},"/api/admin/save-updata-movie",{id:id},'GET')  	  	
  	  },
  		save(){
  			var _this=this;
  			this.$http.ajax(res=>{
  					_this.$route.go({name:'/list'})
  			},"/api/admin/save-movie",this.form)
  		}
  },
  mounted(){
  	if(this.$route.query.movie_id){
  		this.getData(this.$route.query.movie_id);
  	}
  }
}
</script>