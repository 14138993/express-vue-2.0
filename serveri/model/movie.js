var mongoose = require('mongoose')
var MovieSchema=require('../schemas/moive.js')
var Movie =mongoose.model('Moviemsg',MovieSchema)

module.exports=Movie