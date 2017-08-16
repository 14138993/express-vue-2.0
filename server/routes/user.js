var express = require('express');
var router = express.Router();
var UserModel=require('../model/user.js')
var _=require('underscore');
router.all('*', function(req, res, next){
	console.log('this is lochost 8888')
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    next();
});


router.post('/get-session',(req,res,next)=>{
	var data,_user=req.session.user;
	console.log(req.session.user)
	if(_user){
		data={
			staff_name:_user.userName,
			isAdmin:_user.isAdmin,
			staff_id:_user._id,
			img:_user.img,
			tel:_user.tel,
			email:_user.email	
		}
	}
	res.json({
		data:data || null,
		sccuess:1
	})
})
router.post('/get-logout',(req,res,next)=>{
	delete req.session.user;
	res.json({
		data:true,
		sccuess:1		
	})
})
router.post('/updata-user',(req,res,next)=>{
	var user=req.body;
		UserModel.findByIdAndUpdate({_id:user._id},user,(err,userdata)=>{
			if(err){
				console.log(err)
			}
			console.log(userdata)
			res.json({
				data:userdata,
				success:1
			})
		})
	// UserModel.findName(req.body.userName,(err,userdata)=>{
	// 	 if(err){
	// 	 	console.log(err)
	// 	 }
	// 	 userdata.updata-u
	// 	 user=_.extend(req.body,userdata);
	// 	 user.save((err,data)=>{
	// 	 	if(err){
	// 	 		console.log(err)
	// 	 	}
	// 	 	res.json({
	// 	 		data:data,
	// 	 		success:1
	// 	 	})
	// 	 })
	// })
})
router.post('/get-login',(req,res,next)=>{
	var userName=req.body.userName;
	var passwprd=req.body.password;
	UserModel.findName(userName,(err,data)=>{
		console.log(data)
		if(err){
			return console.log(err)
		}
		if(!data){
			res.json({
				data:'该用户不存在',
				sccuess:0				
			})
		}else{
			data.comparePassword(passwprd,(err,isMatch)=>{
				console.log(data)
				if(err){
					return console.log(err)
				}
				if(isMatch){
					req.session.user = data;
					res.json({
						data:{
							staff_name:data.userName,
							isAdmin:data.isAdmin,
							staff_id:data._id,
							img:data.img,
							tel:data.tel,
							email:data.email								
						},
						sccuess:1							
					})
				}else{
					res.json({
						data:'密码错误',
						sccuess:0							
					})					
				}
			})
		}
	})
})
router.post('/set-signup',function(req,res,next){
	var userName=req.body.userName;
	var userObj=req.body;
	var model;
		UserModel.findName(userName,(err,user)=>{
			if(err){
				return console.log(err)
			}
			if(!user){
				console.log(userObj)
				model=new UserModel(userObj)	
				model.save(function(err,data){
					console.log('..注册')
					console.log(data)
				res.json({
					data:'注册成功',
					sccuess:1
				})
				});
			}else{
				res.json({
					data:'该用户名已被占用',
					sccuess:0
				})
			}
		})
});

module.exports = router;