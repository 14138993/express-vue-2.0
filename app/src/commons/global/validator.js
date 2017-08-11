/**
 * Created by v_thorliu on 2016/8/03.
 */
'use strict';

function install(Vue) {
	Vue.validator('space', {
	    message: '输入不能为空格',
	    check: function (val) {
	        return !(/^\s+$/).test(val);
	    }
	});

    Vue.validator('int', {
        message: '输入必须为整数',
        check: function (val) {
            return /^[-+]?[0-9]+$/.test(val);
        }
    });
    //输入必须为非负整数
    Vue.validator('unNegativeInt', {
        message: '输入必须为非负整数',
        check: function (val) {
            return /^\d+$/.test(val);
        }
    });

    Vue.validator("positiveInt",{
        message: '输入必须为正整数',
        check: function (val) {
            return /^[1-9]\d*$/.test(val);
        }
    });

    Vue.validator('url', {
        message: 'url 格式不正确',
        check: function (val) {
            return /^(http\:\/\/|https\:\/\/)(.{4,})$/.test(val);
        }
    });

    Vue.validator('email', {
        message: '邮件格式不正确',
        check: function (val) {
            return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
        }
    });

    Vue.validator('phone', {
        message: '手机号码格式不正确',
        check: function (val) {
            if(val==""){
                return true;
            }
            val.length
            return  /^1[3|4|5|6|7|8|9][0-9]{1}[0-9]{8}$/.test(val);
        }
    });

    Vue.validator('qq', {
        message: 'qq 号码格式不正确',
        check: function (val) {
            if(val==""){
                return true;
            }
            return /^[1-9]\d{4,9}$/.test(val);
        }
    });

    Vue.validator('idcard', {
        message: '身份证号码格式不正确',
        check: function (val) {
            if(val==""){
                return true;
            }
            return  /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(val);
        }
    });

    // 因为 vue-validate 没有提前 trim 的配置，所以额外设置2个验证
    Vue.validator('trimedMaxLength', {
        message: '长度不能超过100个字符',
        check: function (val) {
            let trimedVal = _.trim(val)
            if (trimedVal.length > 100) {
                return false
            } else {
                return true
            }
        }
    });
    Vue.validator('trimedMinLength', {
        message: '长度不能少于2个字符',
        check: function (val) {
            let trimedVal = _.trim(val)
            if (trimedVal.length < 3) {
                return false
            } else {
                return true
            }
        }
    });



    // Vue.validator('idcard', {
    //     message: '长度超出限制',
    //     check: function (val) {
    //         if(val==""){
    //             return true;
    //         }
    //         return  /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(val);
    //     }
    // });
}


if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(install)
}

module.exports = install;