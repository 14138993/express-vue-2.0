－－－－－－－－
	vue 2.0 与 1.0 之间核心的变化
	props:2.0取消了sync无法直接同步改变数据
	解决方法：1.同步可以通过父级直接传一个对象
			  2.不同步可以直接在子组件里中转数据

	单一事件通信BUS		  
			 event=new vue()
			 发送 event.$emit('save',...ars)
			 接受 event.on('save',...ars=>{
			 	console.log(ars)
			 	})
	vuex namespace
		利用命名空间解决modules的重名问题		 	