var mongoose = require('mongoose');
var Schema  =  mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var pariseSchema= new Schema({
	movies:[{	
		type:ObjectId,
		ref:'Moviemsg'		
	}],
	user:[],	
});
pariseSchema.pre('save',function(next){
	next()
})


pariseSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
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
module.exports = pariseSchema;