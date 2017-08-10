var express = require('express');
var router = express.Router();
var UserModel=require('../model/user.js')

router.all('*', function(req, res, next){
	console.log('this is lochost 8888')
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    next();
});

router.post('/get-sign',(req,res,next)=>{
	var userName=req.body.userName;
	var passwprd=req.body.password;
	UserModel.findName(userName,(err,data)=>{
		console.log('。。。登录')
		console.log(data)
		if(err){
			return console.log(err)
		}
		if(!data){
			res.json({
				data:'该用户不存',
				sccuess:0				
			})
		}else{
			data.comparePassword(passwprd,(err,isMatch)=>{
				if(err){
					return console.log(err)
				}
				if(isMatch){
					res.json({
						data:isMatch,
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