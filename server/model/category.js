var mongoose = require('mongoose')
var CategorySchema=require('../schemas/category.js')
var category =mongoose.model('category',CategorySchema)

module.exports=category