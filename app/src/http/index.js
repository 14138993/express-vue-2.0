class Http {
	constructor(http){		
		this.http=http;	
	}
	ajax(callback,url,data,methods='POST',datatype='json'){
	this.http({
         type: methods,
         url: url,
         data:data,
         dataType: datatype,
         crossDomain:true,
         jsonp:'callback',
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