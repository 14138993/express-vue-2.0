var express = require('express');
var router = express.Router();
var CommentModel=require('../model/comment.js')
var praiseModel = require('../model/praiseCount.js')

router.all('*', function(req, res, next){
	console.log('this is lochost 8888')
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    next();
});


router.get('/delet-comment',(req,res,next)=>{
	var commentObj=req.query;
	if(commentObj.id){
		if(commentObj.parent_id){
			CommentModel.findById(commentObj.parent_id,(err,comment)=>{
				var replays=comment.replay.filter(item=>{
					    item._id!==commentObj.id
				})
				comment.replay=replays;
				comment.save((err,comment)=>{
					if(err){
						console.log(err)
					}
					// db.posts.find({users_like_this_post: user._id});
					//暂时没有找到save后直接使用populate的方法这里考虑是删除后直接调一次评论数据，也需要再次查询一次数据，干脆在这里
					//查询当前这条数据返回再通过前端处理
					CommentModel
						.find({_id:commentObj.parent_id})
						.populate('from','userName img')
						.populate('replay.from replay.to','userName img')
						.exec((err,comment)=>{
							if(err){
								console.log(err)
							}
							res.json({
								data:{
									comment
								},
								success:1,
								url:req.url
							})
						})
					})
				})
		}else{
			console.log(commentObj.id)
			CommentModel.remove({_id:commentObj.id},(err,comment)=>{
				console.log(comment)
				if(err){
					console.log(err)
				}
				res.json({
					comment,
					success:1
				})
			})
		}
	}

})
router.post('/save-comment',(req,res,next)=>{
	var commentObj=req.body;
	var Comment;
	if(commentObj.comment_id){
		CommentModel.findById(commentObj.comment_id,(err,data)=>{
			commentObj.send_time=Date.now();
			data.replay.push(commentObj)
			data.save((err,data)=>{
				res.json({
					data:true,
					success:1,
					url:req.url
				})				
			})
		})
	}else{
		Comment=new CommentModel(commentObj)
		Comment.save((err,data)=>{
			if(err){
				console.log(err)
				res.json({err})
			}
			res.json({
				data:true,
				success:1,
				url:req.url
			})
		})
	}
})
module.exports = router;