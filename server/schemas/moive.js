var mongoose = require('mongoose')
var Schema  =  mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var MovieSchema = new Schema({
	title:String,
	doctor:String,
	country:String,
	language:String,
	year:Number,
	summary:String,
	flash:String,
	url:String,	
	praise_count:{
		type:Number,
		default:0
	},
	praise_user_id:Array,	
	PV:{
		type:Number,
		default:0
	},	
	category:{
		type:ObjectId,
		ref:'category'
	},
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}		
})
MovieSchema.pre('save',function(next){
	this.meta.createAt=this.meta.updateAt=Date.now()
	if(this.isNew){
		
	}else{
		this.meta.update=Date.now()
	}
	next()
})
MovieSchema.statics={
	fetch(cb){
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById(id,cb){
		return this
			.findOne({_id:id})
			.exec(cb)
	}
}
module.exports=MovieSchema