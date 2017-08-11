/**
 * Created by yun on 2017/4/3.
 * @file 封装了公共的函数与方法
 * @module
 */

/**
 * @description 封装了hrc函数的常量
 * @constant {}
 * @type {{}}
 */


const util = {
    // 清空对象
    cleanObj(obj){
        for (var k in obj) {
            if (typeof obj[k] == 'object') {
                this.cleanObj(obj[k])
            } else {
                obj[k] = '';
            }
        }
    },
    // 打印错误
    consoleError(msg) {
        $console.log(msg);
    },
    // 对象转换成字符串
    objToString(obj) {
        var str = '';
        for (var key in obj ) {
            str += obj[key] + ';'
        }
        return str
    },
    deleteItemInArray(arr, item) {
        var index = arr.indexOf(item);
        if (index > -1) {
            arr = arr.splice(index, 1);
        }
        return arr
    },
    // 浅拷贝对象
    shadowClone(obj) {
        var newObj = {}
        for(let key in obj) {
            if(obj[key]) {
                newObj[key] = obj[key];
            }
        }
        return newObj
    },
    // cookie 是否过期，过期的话，强制刷新浏览器
    isCookieExpired() {
        // $console.log('document.cookie----')
        // $console.log(document.cookie)
        // 开发环境的 cookie 判断，本地代理设置的
        let staffname = document.cookie.replace(/(?:(?:^|.*;\s*)staffname\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // 正式环境的 cookie 判断
        // let rioTcoaTicket = document.cookie.replace(/(?:(?:^|.*;\s*)正式环境的\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if (testTcoaTicket.length == 0 && rioTcoaTicket == 0 && staffname == 0) {
            // document.location.reload(true)
        }
    },

}
//使用Vue的订阅者模式
export default (Vue)=> {
    Object.defineProperties(Vue.prototype, {
        '$util': {
            get (){
                return util
            }
        }
    })
}