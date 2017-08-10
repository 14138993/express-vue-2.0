var express = require('express');
var router = express.Router();
var movieModel=require('../model/movie.js')
/* GET home page. */
router.all('*', function(req, res, next) {
	console.log('this is lochost 8888')
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    next();
});
router.get('/get-home-list', function(req, res, next) {
	movieModel.fetch((err,movie)=>{
		if(err){
			console.log(err);
			return
		}	
		res.json({
			data:movie,
			success:1,
			url:req.url
		})
	})
});

router.get('/get-detile', function(req, res) {
	let id=req.query.id
	if(!id)return;
	movieModel.findById(id,(err,movie)=>{
		if(err){
			console.log(err);
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
