var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')
var SALT_WORK_FACTOR = 10
var UserSchema = new mongoose.Schema({
	userName:{
		unique:true,
		type:String
	},
	password:String,
	isAdmin:Number,
	img:String,
	email:String,
	tel:Number,
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
UserSchema.pre('save', function (next) {
	  var user = this;
	  if (this.isNew) {
	    this.meta.createAt = this.meta.updateAt = Date.now();
	  } else {
	    this.meta.updateAt = Date.now();
	  }
	  var hash = bcrypt.hashSync(this.password);
	  this.password = hash;
	  next();
});
  
UserSchema.methods = {
	  comparePassword: function (_password, cb) {
	    var hash = this.password;
	    var isMatch = bcrypt.compareSync(_password, hash);
	      cb(null, isMatch);
	    }
};
UserSchema.statics={
	fetch(cb){
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findName(id,cb){
		return this
			.findOne({userName:id})
			.exec(cb)
	}
}
module.exports=UserSchema