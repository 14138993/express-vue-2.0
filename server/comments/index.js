var categoryModel=require('../model/category.js')


var categoryCustom=(req,res,next)=>{
        if(req.body.category == 3){
				var category=new categoryModel({name:req.body.category_name});
					category.save((err,categoryData)=>{
						if(err){
							console.log(err)
						}
						req.body.category=categoryData._id;
            next() 
					})         
    }else{
      next() 
    }  
    
}

module.exports = {
    categoryCustom
}
