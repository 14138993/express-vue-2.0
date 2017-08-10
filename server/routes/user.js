var express = require('express');
var router = express.Router();
var UserModel=require('../model/user.js')

router.all('*', function(req, res, next){
	console.log('this is lochost 8888')
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    next();
});

router.post('/get-session',(req,res,next)=>{
	var data,_user=req.session.user;
	if(_user){
		data={
			staff_name:_user.userName,
			isAdmin:_user.isAdmin,
			staff_id:_user._id		
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
				if(err){
					return console.log(err)
				}
				if(isMatch){
					req.session.user = data;
					res.json({
						data:{
							staff_name:data.userName,
							isAdmin:data.isAdmin,
							staff_id:data._id
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