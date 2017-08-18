var mongoose = require('mongoose')
var praiseSchema=require('../schemas/praiseCount.js')
var praise =mongoose.model('praise',praiseSchema)

module.exports=praise