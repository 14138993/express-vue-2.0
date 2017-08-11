'use strict';
/**
 * @file 页面渲染中的过滤器
 *
 * */
 // 需要 let xxx = function() ，而不能 let xxx()
 //中文显示时间
let filter_time=function(dateStr){
    var publishTime = getDateTimeStamp(dateStr) / 1000,
    d_seconds,d_minutes,d_hours,d_days,d,
    timeNow = parseInt(new Date().getTime() / 1000),            
    date = new Date(publishTime * 1000),
    Y = getTimeSize(date.getFullYear()),
    M = getTimeSize(date.getMonth() + 1),
    D = getTimeSize(date.getDate()),
    H = getTimeSize(date.getHours()),
    m = getTimeSize(date.getMinutes()),
    s = getTimeSize(date.getSeconds());    
    d = timeNow - publishTime;
    d_days = parseInt(d / 86400);
    d_hours = parseInt(d / 3600);
    d_minutes = parseInt(d / 60);
    d_seconds = parseInt(d);

    if (d_days > 0 && d_days < 8) {
            return d_days + '天前';
    } else if (d_days <= 0 && d_hours > 0) {
            return d_hours + '小时前';
    } else if (d_hours <= 0 && d_minutes > 0) {
            return d_minutes + '分钟前';
    } else if (d_seconds < 60) {
            return '刚刚'
            // if (d_seconds <= 0) {
            //         return '刚刚';
            // } else {
            //         return d_seconds + '秒前';
            // }
    } else if (d_days >= 8) {
             return Y + '-' + M + '-' + D
            // return M + '-' + D + ' ' + H + ':' + m;
    }
    //  else if (d_days >= 30) {
    //         return Y + '-' + M + '-' + D + ' ' + H + ':' + m;
    // }         
    function getDateTimeStamp(dateStr) {
            return Date.parse(dateStr.replace(/-/gi, "/"));
    }
    function getTimeSize(time){
             return time<10?'0'+time:time;
    }　   
}


// 提交时，trim 内容
let filter_trim = {
	read: function(val) {
		return _.trim(val)
	},
	write: function(val) {
		return _.trim(val)
	}
}
// 返回值是 null
let filter_null = function(val) {
    return Number(val)
}
// 转义码转成 HTML，eg: &gt; => >
let filter_html = function(val) {
    let testDiv = document.createElement('div')
    testDiv.innerHTML = val
    let text = testDiv.textContent

    return text
}





//显示 小时、分、秒
let filter_shortenTime = function(val) {
 	if (val) {
 	    return val.substr(10, 9)
 	}
 }
// 表情转义
let filter_QQface = function (str) {
    str = str.toString()
    str = str.replace(/\</g, '&lt;');
    str = str.replace(/\>/g, '&gt;');
    str = str.replace(/\n/g, '<br/>');
    // str = str.replace(/\[em_([0-9]*)\]/g, '<img src="/assets/user/live/qqface/$1.png" border="0" />');
    str = str.replace(/\[em_([0-9]*)\]/g, function (str, i) {
        if (i > 75 || i < 1) {
            return str;
        } else {
            i = Number(i);
            return '<img src="/assets/user/live/qqface/' + i + '.png" border="0" />'
        }
    });
    return str;
}


function install(Vue) {
// 通用 通用 通用 通用 通用 通用 通用 通用
// 通用 通用 通用 通用 通用 通用 通用 通用
  Vue.filter('filter_trim', filter_trim);
  Vue.filter('filter_time', filter_time);
  Vue.filter('filter_null', filter_null);
  Vue.filter('filter_html', filter_html);  
  Vue.filter('filter_shortenTime', filter_shortenTime);
  Vue.filter('filter_QQface', filter_QQface);
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

module.exports = install;
