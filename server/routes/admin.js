var express = require('express');
var router = express.Router();
var _=require('underscore');
const querystring = require('querystring');
var movieModel=require('../model/movie.js')
//所有请求前会先经过这里可以用来处理一些公共的东西
router.all('*', function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By",' 3.2.1')
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    console.log('this is save')
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
//更新录入页
router.get('/save-updata-movie',function(req,res,next){
	  if(!req.query.id){
	  	 return;
	  }
	  movieModel.findById(req.query.id,(err,data)=>{
			res.json({
				data,
			  success:1,
			  url:req.url						
			})	  	
	  })
})
//获取后台录入的数据列表
router.get('/get-list',function(req,res,next){
		movieModel.fetch((err,data)=>{
			if(err){
				console.log(err)
			}
			res.json({
				data:data,
			  success:1,
			  url:req.url						
			})
		})
})
router.get('/delete-movie',(req,res,next)=>{
	movieModel.remove({_id:req.query.id},(err,data)=>{
		if(err){
			console.log(err)
			return;
		}
		res.json({
			data:true,
			success:1,
			url:req.url
		})
	})
})
//录入新的电视数据
router.post('/save-movie', function(req, res, next) {
	// console.log(req.body)
	var _movie,movieupdata;
	var id=req.body.id;
	console.log(id)
	var movie_data={
			title:req.body.title,
			doctor:req.body.doctor,
			country:req.body.country,
			language:req.body.language,
			year:req.body.year,
			summary:req.body.summary,
			flash:req.body.flash,
			url:req.body.url,	
		}
	if(!!id){
		//通过id修改单条数据，			
		movieModel.findByIdAndUpdate(id,movie_data,(err,data)=>{
			if(err){
				console.log(err);
				return
			}
			res.json({
				data:true,
				success:1,
				url:req.url				
			})
		})
		//通过返回修改单条数据
		// movieModel.findById(id,(err,movie)=>{
		// 			if(err){
		// 				console.log(err)
		// 			}
		// 			_movie = _.extend(movie, movie_data)
		// 			_movie.save((err,data)=>{
		// 				res.json(data)
		// 			})

	 	// })	
	 	//通过条件修改 这里是主键必然只修改一如果多条数据修改，只需要修改where即可				
			// movieModel.update({_id:id},movie_data,(err,movie)=>{
			// 		if(err){
			// 			console.log(err)
			// 		}
 		// 			res.json({
 		// 				data:movie,
 		// 				success:1,
 		// 				url:req.url
 		// 			})
			// });
	}else{	
			_movie=new movieModel(movie_data);		
			_movie.save((err,movie)=>{
				if(err){
					console.log(err)
				};
				res.json({
						data:movie,
						success:1,
						url:req.url
				});
			});
		}
});

module.exports = router;
