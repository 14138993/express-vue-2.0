var express = require('express');
var router = express.Router();
var MovieModel=require('../model/movie.js')
var CommentModel= require('../model/comment.js')
var CategoryModel= require('../model/category.js')
var praiseModel = require('../model/praiseCount.js')
var {recursion} = require('../comments/index.js')
/* GET home page. */
router.all('*', function(req, res, next) {
	  console.log('this is lochost 8888')
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    next();
});
//praise
router.post('/add-praise',(req,res,next)=>{
	var id=req.body.movies;
	if(req.body.cid){
		if(req.body.child_id){
			CommentModel.update(
				{_id:req.body.cid,'replay._id':req.body.child_id},
				{'$inc':{"replay.$.praise_count":1},'$addToSet':{'replay.$.praise_user_id':req.body.user}},
				(err,comment)=>{
					console.log(comment)
					console.log('...')
					if(err)console.log(err);
					res.json({
						data:comment,
						success:1,
					})
				})
			console.log('u3')
		}else{
		console.log('u2')
			CommentModel.update(
				{_id:req.body.cid},{'$inc':{"praise_count":1},
				'$addToSet':{'praise_user_id':req.body.user}},
				(err,commnet)=>{
					if(err)console.log(err);
					res.json({
						data:true,
						success:1
					})
			})
		}
	}else{
		console.log('u1')
		// 样就完成了数组对应元素的删除。如果要添加元素的话，用到的就不是$pull而是$addToSet，语法还是一样的。
		MovieModel.update({_id:id},{'$inc':{"praise_count":1},'$addToSet':{'praise_user_id':req.body.user}},(err,movies)=>{
				if(err)console.log(err);
				res.json({
					data:true,
					success:1
				})
		})
	}
})
router.post('/delet-praise',(req,res,next)=>{
	var id=req.body.movies
	if(req.body.cid){
		if(req.body.child_id){
			CommentModel.update(
				{_id:req.body.cid,'replay._id':req.body.child_id},
				{'$inc':{"replay.$.praise_count":-1},'$pull':{'replay.$.praise_user_id':req.body.user}},
				(err,comment)=>{
					if(err)console.log(err);
					res.json({
						data:comment,
						success:1,
					})
				})
			console.log('d3')
		}else{
			console.log('d2')
			CommentModel.update(
				{_id:req.body.cid},
				{'$inc':{"praise_count":-1},'$pull':{'praise_user_id':req.body.user}},
				(err,commnet)=>{
					if(err)console.log(err);
					res.json({
						data:true,
						success:1
					})
			})
		}
	}else{
		console.log('d1')
		MovieModel.update({_id:id},{'$inc':{"praise_count":-1},'$pull':{'praise_user_id':req.body.user}},(err,movies)=>{
				if(err)console.log(err);
				res.json({
					data:movies,
					success:1
				})
		})
	}	
})



//index
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
	MovieModel.update({_id: id}, {"$inc": {'PV': 1}}, (err) => {
		if (err) console.log(err);
		MovieModel.find({_id:id},(err,movie)=>{
				if(err){
					console.log(err);
					return
				}
				var movieData=movie[0]._doc;
				if(movieData.praise_count>0){
					movieData.isClick=movieData.praise_user_id.some(item=>{
						return item==req.session.user._id
					})
				}else{
					movieData.isClick=false;
				}

			CommentModel
				.find({movie:id})
				.sort('praise_count')
				.populate('from','userName img')
				.populate('replay.from replay.to','userName img')
				.exec((err,comment)=>{
						var comments=recursion(comment,req.session.user._id)
						if(err)console.log(err)
						res.json({
							data:{
								movieData,
								comments,
							},
							success:1,
							url:req.url
						})
				})
			})
		})
});

module.exports = router;
