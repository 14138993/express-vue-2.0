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
router.get('/seace-result',(req,res,next)=>{
		var page=parseInt(req.query.page, 10) || 1;
		var perPage=parseInt(req.query.perPage,10) || 4;
		var title=req.query.seaceName;	
		if(title){
			  //不做查询电影没有改字段后又去查询是否有这个字段的分类，逻辑并不适合，一般只是搜索都只是搜索电影
			  var reg = new RegExp(title+'.*','i');
			  MovieModel.find({title:reg},(err,movies)=>{
			  	  err&&console.log(err);
			  		var moviesData=movies.slice((page-1)*perPage,(page*perPage));
			  	  res.json({
			  	   		data:{
			  	   			data:moviesData,
				  	   		total:movies.length,
				  	   		current_page:page,
				  	   		success:1
			  	   		}
			  	  })					  		
			  })
		}		
})
router.get('/get-result',(req,res,next)=>{
		var category_id=req.query.cid;
		var page=parseInt(req.query.page, 10) || 1;
		var perPage=parseInt(req.query.perPage,10) || 2;
		if(category_id){
					CategoryModel
					  .find({_id:category_id})
					  .limit(4)
					  .populate('movies','title url')
					  .exec((err,category)=>{
					  	   err&&console.log(err);
					  	   var movies=category[0].movies;
					  	   var moviesData=movies.slice((page-1)*perPage,(page*perPage));
					  	   res.json({
					  	   		data:{
					  	   			data:moviesData,
						  	   		total:movies.length,
						  	   		current_page:page,
						  	   		success:1
					  	   		}
					  	   })
					  })
		}
})
router.get('/get-detile', function(req, res,next) {
	let id=req.query.id
	if(!id)return;
	MovieModel.findById(id,(err,movie)=>{
		if(err){
			console.log(err)
			return
		}
		res.json({
			data:movie,
			success:1,
			url:req.url
		})
	})	
});

module.exports = router;
