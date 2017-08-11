<style lang='scss' scped>
html {
    background-color: #f8f8f8;
    font-family: Arial,sans-serif;
    font-size: 13px
}
.mains,#list{
    width:720px;
}
#list li {
    line-height: 1.5;
    border-bottom: 1px solid #e2e2e2;
    margin-top: 15px;
    padding-bottom: 15px;
}

#list li, .po-hd {
    position: relative;
}
#list li, .cmt-wrap, .r, .time {
    clear: both;
}
#list, #list li, .po-hd, .post {
    overflow: hidden;
}
.po-avt-wrap {
    padding-left: 10px;
}
.po-avt {
    width: 40px;
    height: 40px;
    top: 0;
    left: 10px;
}
.po-avt {
    position: absolute;
}
.po-avt-wrap {
    padding-left: 10px;
}
.po-cmt {
    padding-left: 60px;
    padding-right: 10px;
    width: 100%;
    box-sizing: border-box;
}
.po-cmt, .post .list-img:nth-child(1), .time {
    float: left;
}

.post {
    color: #252525;
    padding-bottom: 10px;
}
#list, #list li, .po-hd, .post {
    overflow: hidden;
}
.time {
    color: #b1b1b1;
}
.time {
    font-size: 13px;
}
#list li, .cmt-wrap, .r, .time {
    clear: both;
}
.po-cmt, .post .list-img:nth-child(1), .time {
    float: left;
}

.c-icon {
    width: 20px;
    float: right;
}
.r {
    border-bottom: 8px solid #eee;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    width: 1px;
    margin-top: 5px;
    margin-left: 10px;
}
.po-hd,.cmt-wrap{
	text-align: left;
}
.cmt-wrap {
    width: 100%;
    background-color: #eee;
    font-size: 14px;
}
.like {
    color: #576b95;
    padding: 5px 5px 3px 12px;
}
.like img {
    width: 12px;
    padding-right: 5px;
}
.cmt-list {
    padding: 5px 12px;
    color: #454545;
}
.cmt-list p {
    padding-top: 3px;
}	
.save_comment{
    width:720px;
    padding-bottom:30px;
   .title{
        text-align:left;
        font-size:16px;
   }
   .button{
        text-align:left;
        margin-top:10px;
   }
}	
</style>
<template>
<div id="mains">
	<div id="list">
		<ul>
			<li>
						<div class="po-avt-wrap">
							<img class="po-avt" src="images/n5.jpg">
						</div>
						<div class="po-cmt">
							<div class="po-hd">
								<p class="po-name">
									王思聪
								</p>
								<div class="post">
									<p>
										那一年这兄弟三人发誓一定要出人头地
									</p>
			<!-- 						<img class="list-img" src="images/xa1.jpg" style="height: 80px;">
									<img class="list-img" src="images/ma1.jpg" style="height: 80px;">
									<img class="data-avt list-img" src="images/0.jpg" style="height: 80px;"> -->
								</div>
								<p class="time">
									1分钟前
								</p>
							</div>
							<div class="r"></div>
							<div class="cmt-wrap">
								<div class="like">
									<img src="images/l.png">
									鹿晗，林更新，杨幂，angelababy，范冰冰...
								</div>
								<div class="cmt-list">
									<p><span>鹿晗：</span>赞！</p>
									<p><span>习</span>回复<span class="data-name">某某科技~贾素杰</span><span>：</span>好几天没见，我们该聚聚了</p>
								</div>
							</div>
						</div>
					</li>
			</ul>
	</div>
	<div class="save_comment">
	  <p class="title">我也说两句：</p>
	  <textarea class="form-control" rows="3"></textarea>
      <div class="button">
        <button class="btn  btn-primary">提交评论</button>                 
      </div>	
	</div>
</div>	
</template>