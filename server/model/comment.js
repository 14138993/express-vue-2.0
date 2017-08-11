var mongoose = require('mongoose')
var CommentSchema=require('../schemas/comment.js')
var Comment =mongoose.model('Moviemsg',CommentSchema)

module.exports=Comment