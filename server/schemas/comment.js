var mongoose = require('mongoose');
var Schema  =  mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var CommentSchema= new Schema({
	from:{
		type:ObjectId,
		ref:'User'
	},
	to:{
		type:ObjectId,
		ref:'User'
	},
	movie:{
		type:ObjectId,
		ref:'Moviemsg'		
	},
	praise_count:{
		type:Number,
		default:0
	},
	content:String,
	replay:[{
			praise_count:{
				type:Number,
				default:0
			},
			from:{
				type:ObjectId,
				ref:'User'
			},
			to:{
				type:ObjectId,
				ref:'User'
			},
			content:String,
			send_time:String,			
		}],
	send_time:String,	
});

CommentSchema.pre('save',function(next){
	this.send_time=Date.now()
	next()
})

CommentSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('praise_count')
            .exec(cb)
    },
    findById: function(id, cb) {
        return this
            .findOne({
                _id: id
            })
            .exec(cb)
    }
}
module.exports = CommentSchema;