<style lang='scss'>
	#y-upload{
    width: 320px;
    height: 180px;
    position: relative;
/*     .progress{
        width: 150px;
        height: 150px;
        border-radius: 100%;
        position: absolute;
        z-index: 2;
        left: 85px;
        top: 15px;        
        #progress{
          width: 150px;
          height: 150px;
          border-radius: 100%;
          border: 5px solid rgba(32, 160, 255,0.8);
          background: rgba(51, 51, 51, 0.3);
          color: white;
          font-size: 20px;
          text-align: center;
          line-height: 130px;             
        }     
    } */
    .dar{
        background-color: #fff;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        box-sizing: border-box;
        width: 100%;
        height:100%;
        text-align: center;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:hover{
          border-color: #20a0ff;
        } 
        .uplond_file{
          background: url('../../assets/image/upload.png') center center no-repeat;
          width: 100%;
          height:100%;
        }       
    }
  }



</style>
<style>
        .progress{
            width: 50%;
            height: 30px;
            border:1px solid #ccc;
            border-radius: 15px;
            margin: 50px 0 0 100px;
            overflow: hidden;
            box-shadow: 0 0 5px 0px #ddd inset;
        }
        .progress span {
            display: inline-block;
            width: 100%;
            height: 100%;
            background: #2989d8; /* Old browsers */
            background: -moz-linear-gradient(45deg, #2989d8 33%, #7db9e8 34%, #7db9e8 59%, #2989d8 60%); /* FF3.6+ */
            background: -webkit-gradient(linear, left bottom, right top, color-stop(33%,#2989d8), color-stop(34%,#7db9e8), color-stop(59%,#7db9e8), color-stop(60%,#2989d8)); /* Chrome,Safari4+ */
            background: -webkit-linear-gradient(45deg, #2989d8 33%,#7db9e8 34%,#7db9e8 59%,#2989d8 60%); /* Chrome10+,Safari5.1+ */
            background: -o-linear-gradient(45deg, #2989d8 33%,#7db9e8 34%,#7db9e8 59%,#2989d8 60%); /* Opera 11.10+ */
            background: -ms-linear-gradient(45deg, #2989d8 33%,#7db9e8 34%,#7db9e8 59%,#2989d8 60%); /* IE10+ */
            background: linear-gradient(45deg, #2989d8 33%,#7db9e8 34%,#7db9e8 59%,#2989d8 60%); /* W3C */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2989d8', endColorstr='#2989d8',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
            background-size: 60px 30px;
            text-align: center;
            color:#fff;
            -webkit-animation:load 3s ease-in;
        }
        @-webkit-keyframes load{
            0%{
                width: 0%;
            }
            100%{
                width:100%;
            }
        }  
</style>
<template>
  <div id="y-upload">
      <div class="progress">
        <span id="progress">100%</span>
      </div>
      <div class="dar">
        <div class="uplond_file">
        </div>
      </div>
  </div>

</template>