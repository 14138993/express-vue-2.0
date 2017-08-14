var express = require('express');
var router = express.Router();
var _=require('underscore');
const querystring = require('querystring');
var movieModel=require('../model/movie.js')
var categoryModel=require('../model/category.js')
//将自定义分类剥离成中间件
var {categoryCustom} = require ('../comments/index.js');

//所有请求前会先经过这里可以用来处理一些公共的东西
router.all('*', function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By",' 3.2.1')
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//获取单个电影数据
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
//删除电影
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
//修改增加电影数据
router.post('/save-movie', categoryCustom,function(req, res, next) {
	// console.log(req.body)
	var _movie,categoryOldId;
	var id=req.body.id;
	if(!!id){
		//通过id修改单条数据，			
		// movieModel.findByIdAndUpdate(id,req.body,(err,data)=>{
		// 	if(err){
		// 		console.log(err);
		// 		return
		// 	}

		// })
		//通过返回修改单条数据
		movieModel.findById(id,(err,movies)=>{
			if(err){
				console.log(err)
			}
			//如果分类有修改的话缓存一边修改前的分类id以便于接下来删除此分类的这部电影
			categoryOldId=movies.category;
			_movie = Object.assign(movies, req.body)
			_movie.save((err,movie)=>{
				if(categoryOldId&&categoryOldId.toString() == req.body.category.toString()){
					//内容信息修改但是分类信息没有修改不再操作分类
				}else{
					//此分类添加此电影
					categoryModel.findById(req.body.category,(err,category)=>{
						category.movies.push(movie._id)
						category.save((err,category)=>{
  							if(err){
  								console.log(err)
  							}
						})
					})
					//此分类删除此电影
          categoryModel.findById(categoryOldId,(err,category)=>{
              //可能存在分类被删除没有这歌分类再进行以下操作可能报错
              if(category&&category.movies.length>0){
                var filter_array=category.movies.filter(item=>{
                   return item.toString() !== movie._id.toString()
                });                
                category.movies=filter_array;
                category.save((err,category)=>{
                    if(err){
                      cosnole.log(err)
                    }
                })
              }
          })
				}
				res.json({
					data:true,
					success:1,
					url:req.url				
				})				
			})
	 	})	
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
					_movie=new movieModel(req.body);		
					_movie.save((err,movie)=>{
						if(err){
							console.log(err)
						}
						categoryModel.findById(req.body.category,(err,category)=>{
							category.movies.push(movie._id)
							category.save((err,category)=>{
								if(err){
									console.log(err)
								}
								res.json({
										data:true,
										success:1,
										url:req.url
								});		
							})
						})
					});				
		}
});
//获取分类列表
router.get('/get-category-list',function(req,res,next){
		categoryModel.fetch((err,data)=>{
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
//删除分类
router.get('/delet-category',function(req,res,next){
		console.log(req.query.id)
		categoryModel.remove({_id:req.query.id},(err,data)=>{
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
//报存分类
router.post('/save-category',function(req,res,next){
		var id=req.body.id;
		if(id){
			categoryModel.findByIdAndUpdate(id,{$set:{name:req.body.name}},(err,category)=>{
				if(err){
					console.log(err);
					return
				}
				res.json({
					data:category,
					success:1,
					url:req.url				
				})
			})
		}else{
			var category=new categoryModel(req.body);
			console.log(category)
				category.save((err,category)=>{
					if(err){
						console.log(err)
					}
					res.json({
						data:category,
						success:1,
						url:req.url
					})
				})
		}
})

module.exports = router;
