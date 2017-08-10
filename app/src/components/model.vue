<style lang="scss" >
// 这里没有用 scoped 属性是因为下面用到具名 slot 的地方，用了 scoped 的话，h3 样式无法继承
  .modals{
    position: fixed;
    z-index: 998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    text-align: center;
    transition: opacity .3s ease;

    // 利用伪元素不定宽高水平垂直居中
    &:after {
      content: '';
      display: inline-block;
      vertical-align: middle;
      width: 0;
      height: 90%;
    }

    .modal-container {
      padding:10px;
      display: inline-block;
      vertical-align: middle;
      min-width:400px;
      max-width: 800px;
      background-color: #fff;
      border-radius: 2px;
      text-align: left;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;
      // .boder{
      //     width:100%;
      //     border-bottom:1px solid #ccc;
      // }
      .modal-header {
        padding:0;
        border:0;
        position: relative;
        min-height: 40px;
        h3 {
          height: 20px;
          padding-left: 20px;
          width: 100%;
          font-size: 16px;
          font-weight: 700;
          text-align: left;
          border-left: 3px solid #337ab7;
          color: #337ab7;
          line-height: 22px;     
        }

        .modal-close {
          position: absolute;
          top: 0;
          right: 0;
          width: 20px;
          height: 20px;
          margin: 6px;
          font-size: 14px;
          cursor: pointer;
          color: #343d46;
          transform-origin:50% 50%;
          transition: transform 0.3s;

          &::before, &::after {
            content:'';
            position: absolute;
            display: inline-block;
            width:14px;
            height:2px;
            background:#666;
          }
          &::after{
            transform: rotate(45deg) translateX(8px) translateY(4px);
          }
          &::before{
            transform: rotate(-45deg) translateX(-4px) translateY(8px);
          }
          &:hover {
            transform: rotate(90deg);
          }
        }
      }
      .modal-body {
        margin: 20px 0;
        padding: 0 20px;

      }
      .modal-footer {
        min-height: 45px;
        padding: 0 20px;
        text-align: center;
        .mod-btn{
            margin-top:10px;
            margin-left:15px;
            display: inline-block;
            padding: 6px 12px;
            margin-bottom: 0;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.42857143;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            -ms-touch-action: manipulation;
            touch-action: manipulation;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            background-image: none;
            border: 1px solid transparent;
            border-radius: 4px;          
        }
        .mod-btn-close{
           color: #333;
          background-color: #fff;
          border-color: #ccc;         
        }
        .mod-btn-success{
          color: #fff;
          background-color: #286090;
          border-color: #204d74;
        }
      }
    }
  }

  .modal-enter, .modal-leave {
    opacity: 0;
  }
  .modal-enter .modal-container,
  .modal-leave .modal-container {
    transform: scale(1.1);
  }



</style>
<style lang="scss" scoped>
    input{
        width:450px;
  }
</style>
<template>
<transition name='modal'>
  <div class="modals" v-if="isOpen" transition="modal">
    <div class="modal-container" :style='styleObj'>
      <div class="modal-header">
        <slot name="header">
          <h3>模态框头部</h3>
        </slot>
        <span class="modal-close" @click="close"></span>
      </div>
      <div class="boder"></div>
      <div class="modal-body">
        <slot name="body">
          模态框内容
        </slot>
      </div>

      <div class="modal-footer">
        <slot name="footer">
          尾部
        </slot>
        <slot name="button">
            <span class="mod-btn mod-btn-close" @click="close">取消</span>
        </slot>        
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    props:{
      styleObj:Object,
    },
    computed:{
        ...mapState('user',{
          isOpen:state =>state.is_open,
        }),
    },
    methods:{
      ...mapActions('user',[
        'openModel',
        "close"
      ]),
    },
    data(){
        return {

        }
    }
}
</script>