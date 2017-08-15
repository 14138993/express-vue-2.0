
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
	  console.log(xhr.responseText);
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