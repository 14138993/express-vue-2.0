var express = require('express');
var router = express.Router();
var CommentModel=require('../model/comment.js')


router.all('*', function(req, res, next){
	console.log('this is lochost 8888')
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    next();
});

router.post('/save-comment',(req,res,next)=>{
	var commentObj=req.body;
	var Comment;
	if(commentObj.comment_id){
		CommentModel.findById(commentObj.comment_id,(err,data)=>{
			commentObj.send_time=new Date.now();
			data.replay.push(commentObj)
			data.save({
				data:true,
				success:1,
				url:req.url
			})
		})
	}else{
		Comment=new CommentModel(commentObj)
		CommentModel.save((err,data)=>{
			res.json({
				data:true,
				success:1,
				url:req.url
			})
		})
	}
})