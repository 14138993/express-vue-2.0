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
var recursion= (msg,user) => {
	var msg = msg.map(item=>{
	        if(item.praise_count > 0) {
	        	item._doc.isClick=item.praise_user_id.some(items=>{
	        		return items == user
	        	})
	        }else{
	        	item._doc.isClick=false
	        }
	        if(item.replay && item.replay.length){
	        	recursion(item.replay,user)
	        }
	        return item
	})
	return msg;
 }


module.exports = {
    categoryCustom,
    recursion
}
