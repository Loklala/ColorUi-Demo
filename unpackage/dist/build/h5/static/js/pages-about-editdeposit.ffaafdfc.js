(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-about-editdeposit"],{"14ce":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=c(a("803e")),i=c(a("893b")),s=c(a("df04"));c(a("1bcd"));function c(t){return t&&t.__esModule?t:{default:t}}var o=a("55f6"),u={components:{mpvuePicker:i.default,mpvueCityPicker:s.default},data:function(){return{name:"",payname:"中国银行",payType:2,payaccount:"",paypassword:"",code:"",tel:"",btntxt:"获取验证码",disabled:!1,menuBorder:!0,menuArrow:!1,menuCard:!0,StatusBar:this.StatusBar,CustomBar:this.CustomBar,themeColor:"#007AFF",mode:"",deepLength:1,pickerValueDefault:[0],pickerValueArray:[],pickerSingleArray:[{label:"中国银行",value:2},{label:"招商银行",value:3},{label:"建设银行",value:4},{label:"农业银行",value:5},{label:"工商银行",value:6}],list:[],token:"",last_tel:""}},onLoad:function(){var t=this;if(uni.getStorageSync("agentInfo")){var e=JSON.parse(this.utils.decrypt(uni.getStorageSync("agentInfo"),"abcdefgabcdefg12"));e&&(this.token=e.token,this.tel=e.agent_tel,this.name=e.agent_name)}var a=uni.getStorageSync("last_tel");a&&(this.last_tel=a,console.log(a)),uni.request({url:n.default.websiteUrl+"/agent/agent/last-sms-time",header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",dataType:"json",cache:!1,data:{token:this.token,last_tel:a,sms_type:2},success:function(e){var a=e,n=a.data;200==n.code?(t.time=60-parseInt(n.data),t.disabled=!0,t.timer()):400==n.code?(t.time=0,t.disabled=!1):-200==n.code&&uni.showModal({showCancel:!1,content:"用户信息已失效，请重新登陆",success:function(t){t.confirm&&uni.redirectTo({url:"../login/login?lout=1"})}})},fail:function(){uni.showToast({icon:"none",title:"网络异常,请稍后重试"})},complete:function(){}}),uni.request({url:n.default.websiteUrl+"/agent/agent/ajax-get-info",header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",dataType:"json",cache:!1,data:{token:this.token},success:function(e){if(200==e.data.code){var a=e.data.data;a&&(t.tel=a.agent_tel,t.name=a.current_payname,null==a.current_payname&&(t.name=""),"0"==a.current_paytype?(t.payname="微信",t.payaccount=a.wechat_num):"1"==a.current_paytype?(t.payname="支付宝",t.payaccount=a.alipay_num):"2"==a.current_paytype?(t.payname="中国银行",t.payaccount=a.bank_num):"3"==a.current_paytype?(t.payname="招商银行",t.payaccount=a.bank_num):"4"==a.current_paytype?(t.payname="建设银行",t.payaccount=a.bank_num):"5"==a.current_paytype?(t.payname="农业银行",t.payaccount=a.bank_num):"6"==a.current_paytype&&(t.payname="工商银行",t.payaccount=a.bank_num))}else-200==e.data.code&&uni.showModal({showCancel:!1,content:"用户信息已失效，请重新登陆",success:function(t){t.confirm&&uni.redirectTo({url:"../login/login?lout=1"})}})},fail:function(){},complete:function(){}})},methods:{navTo:function(){uni.navigateTo({url:"deposit"})},PickerChange:function(){this.pickerValueArray=this.pickerSingleArray,this.mode="selector",this.deepLength=1,this.pickerValueDefault=[0],this.$refs.mpvuePicker.show()},onBackPress:function(){if(this.$refs.mpvuePicker.showPicker)return this.$refs.mpvuePicker.pickerCancel(),!0},onUnload:function(){this.$refs.mpvuePicker.showPicker&&this.$refs.mpvuePicker.pickerCancel()},onConfirm:function(t){this.payname=t.label,this.payType=t.value[0],this.payaccount="",console.log(this.payType)},sendcode:function(){var t=this;""!=this.tel?uni.request({url:n.default.websiteUrl+"/agent/agent/ajax-send-sms",header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",dataType:"json",cache:!1,data:{token:this.token,tel:this.tel,sms_type:2},success:function(e){t.list=e;var a=t.list.data,n=a.data;if(200==a.code){t.time=60,t.disabled=!0,uni.showToast({icon:"none",title:n},2e3);uni.setStorageSync("last_tel",t.tel),t.timer()}400==a.code&&(uni.showToast({icon:"none",title:"请稍候再试"},2e3),t.time=0,setTimeout(t.timer,1e3),t.disabled=!1)},fail:function(){uni.showToast({icon:"none",title:"网络异常,请稍后重试"})},complete:function(){}}):uni.showToast({icon:"none",title:"手机号码为空"},2e3)},timer:function(){this.time>0?(this.time--,this.btntxt=this.time+"s后获取",setTimeout(this.timer,1e3)):(this.time=0,this.btntxt="获取验证码",this.disabled=!1)},formSubmit:function(t){var e=this,a=[{name:"name",checkType:"string",checkRule:"0,20",errorMsg:"姓名应为0-20个字符之内"},{name:"payaccount",checkType:"string",checkRule:"0,30",errorMsg:"请正确填写账号"},{name:"paypassword",checkType:"string",checkRule:"4,30",errorMsg:"密码最短为4个字符"},{name:"code",checkType:"notnull",checkRule:"4,30",errorMsg:"验证码不能为空"}],i=t.detail.value,s=o.check(i,a);s?(this.last_tel=uni.getStorageSync("last_tel"),uni.request({url:n.default.websiteUrl+"/agent/agent/ajax-edit-deposit",header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",dataType:"json",cache:!1,data:{token:this.token,name:i["name"],payName:i["payname"],payType:i["payType"],payaccount:i["payaccount"],paypassword:i["paypassword"],code:i["code"],last_tel:this.last_tel,sms_type:2},success:function(t){e.list=t;var a=e.list.data;a.data;200==a.code?(uni.showToast({title:"修改成功!",icon:"none"}),setTimeout(function(){uni.redirectTo({url:"../about/deposit"})},2e3)):uni.showToast({title:t.data.data,icon:"none"})},fail:function(){},complete:function(){}})):uni.showToast({title:o.error,icon:"none"})},formReset:function(t){this.chosen=""}}};e.default=u},"2fb4":function(t,e,a){"use strict";a.r(e);var n=a("507e"),i=a("756c");for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);a("ca67");var c=a("2877"),o=Object(c["a"])(i["default"],n["a"],n["b"],!1,null,"1cbd4713",null);e["default"]=o.exports},"4c27":function(t,e,a){var n=a("89e8");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("d9e801fc",n,!0,{sourceMap:!1,shadowMode:!1})},"507e":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"content"},[a("v-uni-view",{staticClass:"cu-bar bg-gradual-blue search",style:[{height:t.CustomBar+"px"}]},[a("v-uni-view",{staticClass:"action",on:{click:function(e){e=t.$handleEvent(e),t.navTo()}}},[a("v-uni-text",{staticClass:"cuIcon-back"}),t._v("返回")],1),a("v-uni-view",{staticClass:"content"},[t._v("修改提现账号")]),a("v-uni-view",{staticClass:"action"})],1),a("v-uni-form",{on:{submit:function(e){e=t.$handleEvent(e),t.formSubmit(e)},reset:function(e){e=t.$handleEvent(e),t.formReset(e)}}},[a("v-uni-view",{staticClass:"cu-list menu",class:[(t.menuBorder,""),"card-menu margin-top"],staticStyle:{"border-radius":"4upx"}},[a("v-uni-view",{staticClass:"cu-bar bg-white solid-bottom bg-white"},[a("v-uni-view",{staticClass:"action"},[a("v-uni-text",{staticClass:"cuIcon-newsfill text-blue icon-title"}),t._v("账号信息(手机号:"+t._s(t.tel)+")")],1),a("v-uni-view")],1),a("v-uni-view",{staticClass:"cu-item",class:t.menuArrow?"arrow":""},[a("v-uni-text",{staticClass:"cuIcon-peoplelist text-blue icon-title margin-right-sm"}),a("v-uni-text",{staticClass:"title"},[t._v("账户姓名:")]),a("v-uni-text",{staticClass:" content"},[a("v-uni-input",{staticClass:"text-black",attrs:{type:"text",name:"name",value:t.name,maxlength:"40"}})],1)],1),a("v-uni-view",{staticClass:"cu-item",class:"arrow",on:{click:function(e){e=t.$handleEvent(e),t.PickerChange()}}},[a("v-uni-text",{staticClass:"cuIcon-shake text-blue icon-title margin-right-sm"}),a("v-uni-text",{staticClass:"title"},[t._v("账户类型:")]),a("v-uni-text",{staticClass:" content"},[a("v-uni-text",{staticClass:"text-black",attrs:{name:"payname"}},[t._v(t._s(t.payname))]),a("v-uni-input",{staticClass:"hide",attrs:{type:"text",name:"payname",value:t.payname,maxlength:"40"}}),a("v-uni-input",{staticClass:"hide",attrs:{type:"number",name:"payType",value:t.payType,maxlength:"40"}})],1)],1),a("v-uni-view",{staticClass:"cu-item",class:t.menuArrow?"arrow":""},[a("v-uni-text",{staticClass:"cuIcon-brand text-blue icon-title margin-right-sm"}),a("v-uni-text",{staticClass:"title"},[t._v("收款账号:")]),a("v-uni-text",{staticClass:" content"},[a("v-uni-input",{staticClass:"text-black",attrs:{type:"text",name:"payaccount",placeholder:"输入提现账号",value:t.payaccount,maxlength:"19"}})],1)],1),a("v-uni-view",{staticClass:"cu-item",class:t.menuArrow?"arrow":"",staticStyle:{display:"none"}},[a("v-uni-text",{staticClass:"cuIcon-lock text-blue icon-title margin-right-sm"}),a("v-uni-text",{staticClass:"title"},[t._v("设置密码:")]),a("v-uni-text",{staticClass:" content"},[a("v-uni-input",{staticClass:"text-black",attrs:{type:"password",name:"paypassword",placeholder:"请设置提现密码",value:t.paypassword,maxlength:"19"}})],1)],1),a("v-uni-view",{staticClass:"cu-item",class:t.menuArrow?"arrow":"",staticStyle:{display:"none"}},[a("v-uni-text",{staticClass:"cuIcon-mobile text-blue icon-title margin-right-sm"}),a("v-uni-text",{staticClass:"title"},[t._v("手机号：")]),a("v-uni-text",{staticClass:" content"},[a("v-uni-input",{staticClass:"text-black",attrs:{type:"number",name:"tel",value:t.tel,placeholder:"请填写手机号码",maxlength:"100",disabled:"disabled"}})],1)],1),a("v-uni-view",{staticClass:"cu-item",class:t.menuArrow?"arrow":""},[a("v-uni-text",{staticClass:"cuIcon-safe text-blue icon-title margin-right-sm"}),a("v-uni-view",{staticClass:"title"},[t._v("验证码：")]),a("v-uni-input",{staticClass:"text-black",attrs:{type:"number",name:"code",value:t.code,placeholder:"验证码",maxlength:"6"}}),a("v-uni-button",{staticClass:"cu-btn bg-gradual-blue shadow",staticStyle:{width:"240upx"},attrs:{type:"button",disabled:t.disabled},on:{click:function(e){e=t.$handleEvent(e),t.sendcode(e)}}},[t._v(t._s(t.btntxt))])],1),a("v-uni-view",[a("v-uni-button",{staticClass:"cu-btn bg-blue margin-tb-sm lg btn",attrs:{formType:"submit",type:"primary"}},[t._v("保存")])],1)],1)],1),a("mpvue-picker",{ref:"mpvuePicker",attrs:{themeColor:t.themeColor,mode:t.mode,deepLength:t.deepLength,pickerValueDefault:t.pickerValueDefault,pickerValueArray:t.pickerValueArray},on:{onConfirm:function(e){e=t.$handleEvent(e),t.onConfirm(e)},onCancel:function(e){e=t.$handleEvent(e),t.onConfirm(e)}}})],1)},i=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return i})},"756c":function(t,e,a){"use strict";a.r(e);var n=a("14ce"),i=a.n(n);for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);e["default"]=i.a},"89e8":function(t,e,a){e=t.exports=a("2350")(!1),e.push([t.i,".hide[data-v-1cbd4713]{display:none}.sexpicker[data-v-1cbd4713]{width:90%}.picker[data-v-1cbd4713]{text-align:left}.btn[data-v-1cbd4713]{background:-webkit-gradient(linear,left top,right top,from(#3396e9),to(#1ab7b9));background:-webkit-linear-gradient(left,#3396e9,#1ab7b9);background:-o-linear-gradient(left,#3396e9,#1ab7b9);background:linear-gradient(90deg,#3396e9,#1ab7b9);margin-top:%?50?%;width:96%;margin-left:2%}.page[data-v-1cbd4713]{height:100Vh;width:100vw}.title[data-v-1cbd4713]{color:#444;text-align:left;width:%?160?%}.title2[data-v-1cbd4713]{color:#444;text-align:left;width:%?150?%}.btn-bg[data-v-1cbd4713]{background:#fff;color:#007aff}.menu[data-v-1cbd4713]{margin-top:%?10?%}",""])},ca67:function(t,e,a){"use strict";var n=a("4c27"),i=a.n(n);i.a}}]);