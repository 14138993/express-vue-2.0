var express = require('express');
var router = express.Router();
var CommentModel=require('../model/comment.js')


router.all('*', function(req, res, next){
	console.log('this is lochost 8888')
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    next();
});
router.get('/get-comment-list',(req,res,next)=>{
	if(req.query.movie_id){
		CommentModel
		.find({movie:id})
		.sort('praise_count')
		.populate('from','userName img')
		.populate('replay.from replay.to','userName img')
		.exec((err,comment)=>{
			if(err){
				console.log(err)
			}
			res.json({
				data:comment,
				success:1,
				url:req.url
			})
		})
	}

})

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
					res.json({
						comment,
						success:1
					})
				})
			})
		}else{
			CommentModel.removue({_id:commentObj.id},(err,comment)=>{
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