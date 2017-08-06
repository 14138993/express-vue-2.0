class Http {
	constructor(http){		
		this.http=http;	
	}
	ajax(callback,url,data,methods='POST'){
	this.http({
         type: methods,
         url: url,
         data:data,
         dataType: "json",
         success: function(data){
         	callback&&callback(data)
         }		
	})	
		// this.http[methods](url,data).then(res=>{
		// 	callback&&callback(res.data.data)
		// }).catch(err=>{
		// 	console.log(err)
		// })
	}
}


export default Http 