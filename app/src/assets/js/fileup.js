
var upfile=function(url,callback){
 var file = document.querySelector('#file');
	 var upload = document.querySelector('#upload');
	 var progress = document.querySelector('#progress');
	 var image = document.querySelector('#image');

var upfile=function(){
 var file = document.getElementById('file');
	 var upload = document.getElementById('upload');
	 var progress = document.getElementById('progress');
	 var image = document.getElementById('image');

	 var xhr = new XMLHttpRequest();
	 upload.addEventListener('click', uploadFile, false);
	 file.addEventListener('change', previewImage, false);
	 
	 // 点击上传
	 function uploadFile(event) {
	 var formData = new FormData();
	 formData.append('upfile', file.files[0]);
	 xhr.onload = uploadSuccess;
	 xhr.upload.onprogress = setProgress;
	 xhr.open('post', url, true);

	 console.log(file.files)
	 console.log(formData)
	 
	 xhr.onload = uploadSuccess;
	 xhr.upload.onprogress = setProgress;
	 xhr.open('post', 'api/admin/set-upload/poster', true);

	 xhr.send(formData);
	 }
	 
	 // 成功上传
	 function uploadSuccess(event) {
		 if (xhr.readyState === 4) {
		 	var data=JSON.parse(xhr.responseText)
		 	callback&&callback(data.data)
		 }
	 }
	 
	 // 进度条
	 function setProgress(event) {
	 if (event.lengthComputable) {
	  var complete = Number.parseInt(event.loaded / event.total * 100);
	  progress.innerHTML = complete + '%';
	 }
	 }
	 
	 // 图片预览
	 function previewImage(event) {
	 var reader = new FileReader();
	 reader.onload = function (event) {
	  image.src = event.target.result;
	 };
	 reader.readAsDataURL(event.target.files[0]);
	 }		
}


export default upfile


// class Yupfile {
// 	constructor(el){
// 		return new this.Init(el)
// 	}
// 	Init(obj){
// 		var argumentsDefault ={
// 			 el:'',
// 			 botton:'',
// 			 img:'',
// 			 pregges:'',
// 			 tar:true,
// 			 multiple:false,
// 			 request:{
// 			 	endpoint:''
// 			 },
// 			 deleteUrl:{
//                 method: 'POST',
//                 endpoint:''		 	
// 			 },
// 			 validation:false,
// 			 message:{

// 			 },
// 			 maxConnections: 6,
// 			 callbacks:{
// 			 	onDelet(){

// 			 	},
// 			 	onComplete(){

// 			 	},
// 			 }
// 		},
// 		var config=Object.assign(obj,argumentsDefault)
// 	}
	
// }