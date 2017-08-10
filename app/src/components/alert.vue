<style lang="scss" scoped>
p,a{
  margin:0;
  padding:0;
}
.alert{
	position: fixed;
	// 不能比 loading box 的 z-index(999) 高
	z-index: 1000;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	text-align: center;
	background-color: rgba(0, 0, 0, 0.2);
	text-align: center;

  &.alert-warning {
    .content_icon {
      width: 30px;
      height: 30px;
      background: url(images/i-alert-warning.png) 0 0/contain no-repeat;
    }
  }
  &.alert-disabled {
    .content_icon {
      width: 30px;
      height: 30px;
      background: url(images/i-alert-disabled.png) 0 0/contain no-repeat;
    }
  }
  &.alert-info {
    .content_icon {
      width: 30px;
      height: 30px;
      background: url(images/i-alert-info.png) 0 0/contain no-repeat;
    }
  }
  &.alert-success {
    .content_icon {
      width: 30px;
      height: 30px;
      background: url(images/i-alert-success.png) 0 0/contain no-repeat;
    }
  }
  &.alert-error {
    .content_icon {
      width: 30px;
      height: 30px;
      background: url(images/i-alert-error.png) 0 0/contain no-repeat;
    }
  }
  &.alert-loading {
    .alert_body {
      .body_content {
        .content_icon {
          width: 30px;
          height: 30px;
          background: url(images/i-alert-loading.gif) 0 0/contain no-repeat;
        }
        .content_message {
          width: auto;
          margin-top: 0;
        }
      }
    }
  }
	&:before {
    content: '';
    display: inline-block;
    width: 0;
    height: 90%;
    vertical-align: middle;
	}
	.alert_body {
	    position: relative;
		display: inline-block;
	    min-width: 300px;
	    max-width: 350px;
		padding: 30px 40px 30px 40px;
		border: 1px solid #ccc;
	    border-radius: 3px;
	    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
	    vertical-align: middle;
		background-color: #fff;
		z-index: 999999;
    .body_close {
      position: absolute;
      right: 6px;
      top: 4px;
      font-size: 20px;
      cursor: pointer;
    }
		.body_content {
      position: relative;
      text-align: center;
			.content_icon {
        display: inline-block;
				width: 30px;
        height: 30px;
				line-height: 30px;
        vertical-align: middle;
      }
      .content_message {
        display: inline-block;
        max-width: 86%;
        margin-left: 5px;
        margin-top: 5px;
        line-height: 24px;
        font-size: 15px;
        font-weight: 700;
        text-align: center;
        vertical-align: middle;
        color: #222;
        overflow: auto;
        max-height: 100px;
        word-wrap: break-word;
      }
		}
		.body_btns {
      position: relative;
      top: 15px;
      // margin-top: 20px;
      .mod-btn {
        margin: 0 5px;
			&.mod-btn {
				text-decoration: none;
			    display: inline-block;
			    box-sizing: border-box;
			    padding: 0 15px;
			    border-radius: 3px;
			    font-size: 14px;
			    height: 30px;
			    line-height: 33px;
			    text-align: center;
			    color: #fff;
			    background-color: #329632;
			    cursor: pointer;
			    transition: color .2s,background-color .2s,border-color .2s;
			}
			 &.mod-btn-success {
			    color: #fff;
			    background-color: #439b15;
			}
			&.mod-btn-close,&.mod-btn-default {
			    color: #666;
			    background-color: #f5f5f5;
			    border: 1px solid #ccc;
			}						        
      	}
	  }
	}
}
.fade-transition {
  transition: opacity .3s ease;
}
.fade-enter,
.fade-leave {
  // opacity: 0;
  opacity: 0.01;
}
</style>

<template>
  <div
    v-if="alertData.isShow"
    v-bind:class="{
      'alert':		true,
      'alert-success':(alertData.type == 'success'),
      'alert-warning':(alertData.type == 'warning'),
      'alert-info':	(alertData.type == 'info'),
      'alert-error':  (alertData.type == 'error'),
      'alert-loading':  (alertData.type == 'loading'),
      'alert-disabled':	(alertData.type == 'disabled')
    }"
    :style="{backgroundColor: overlap>0?'transparent':'auto'}"
    >
    <div
    :style="{ left:overlap*5+'px', top:overlap*5+'px'}"
    class="alert_body">
      <i v-if="alertData.type != 'loading'" class="body_close"
        @click="alertData.isShow = false">
        <span>&times;</span>
      </i>
    	<div class="body_content">
    		<i class="content_icon"></i>
    		<div class="content_message">
          <p v-if="alertData.type == 'loading'">正在加载中，请稍候...</p>
          <p v-else v-text="alertData.message"></p>
    			<slot></slot>
    		</div>
    	</div>
    	<div v-if="alertData.btns" class="body_btns">
    		<a v-if="alertData.btns.confirm" class="mod-btn mod-btn-success" @click="confirm()" v-text="confirmBtnText"></a>
    		<a v-if="alertData.btns.cancel" class="mod-btn mod-btn-default" @click="alertData.isShow = false">取消</a>
    	</div>
    </div>
  </div>
</template>
<script>
	export default {
		props:{
			alertData:{
				type: Object
			},
			// message:String,
			// type:String,
			// isShow:Boolean,
			// btns:{
			// 	type: Object
			// },
		    // 是否错位，当页面中存在多个弹窗的时候需要，比如全局报错弹窗
		    overlap: {
		      type: Number,
		      default: 0
		    }
		    // confirmCallback:{
		    //   type: String
		    // },
		    // confirmCallbackObj: {
		    //   type: Object
		    // }
		},
		data(){
			return {
				is_show:'',
				btn_show:'',
			}
		},
	  	computed: {
	      confirmBtnText: function() {
	          return this.message == '该页面暂无权限'?'返回':'确定'
	      }
	  	},		
		methods:{
			confirm(){
				this.alertData.confirmCallback && this.$emit('alertCallback',this.alertData.confirmCallbackObj)
				this.alertData.isShow=false;
			}
		},
		mounted(){
			console.log()
		}
	}
</script>