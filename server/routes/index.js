var express = require('express');
var router = express.Router();
var MovieModel=require('../model/movie.js')
var CommentModel= require('../model/comment.js')
var CategoryModel= require('../model/category.js')
/* GET home page. */
router.all('*', function(req, res, next) {
	console.log('this is lochost 8888')
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    next();
});
router.get('/get-home-list', function(req, res, next) {
	CategoryModel
	  .find()
	  .limit(4)
	  .populate({path:'movies',options:{limit:4}})
	  .exec((err,categorys)=>{
			if(err){
				console.log(err);
				return
			}	
			res.json({
				data:categorys,
				success:1,
				url:req.url
			})	  	
	  })
});

router.get('/get-detile', function(req, res) {
	let id=req.query.id
	if(!id)return;
	MovieModel.findById(id,(err,movie)=>{
		if(err){
			console.log(err);
			return
		}
	CommentModel
		.find({movie:id})
		.sort('praise_count')
		.populate('from','userName')
		.populate('replay.from replay.to','userName')
		.exec((err,comment)=>{
			if(err){
				console.log(err)
			}
			res.json({
				data:{
					movie,
					comment
				},
				success:1,
				url:req.url
			})
		})
	})
});

module.exports = router;
