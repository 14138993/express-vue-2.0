var mongoose = require('mongoose');
var Schema  =  mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var CategorySchema= new Schema({
	name:String,
	movies:[{	
		type:ObjectId,
		ref:'Moviemsg'		
	}],
    praise_count:{
        type:Number,
        default:0
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
	},
	cateName:String,	
});

CategorySchema.pre('save',function(next){
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next()
})

CategorySchema.statics = {
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
module.exports = CategorySchema;