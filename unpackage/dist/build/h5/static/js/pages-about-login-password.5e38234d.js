(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-about-login-password"],{6538:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=i(e("803e")),s=i(e("1a64"));function i(t){return t&&t.__esModule?t:{default:t}}var o={components:{mInput:s.default},data:function(){return{TabCur:0,scrollLeft:0,ypassword:"",npassword:"",repassword:"",StatusBar:this.StatusBar,CustomBar:this.CustomBar,menuBorder:!1,menuArrow:!1,menuCard:!1,disabled:!1,isdisabled:!0,token:"",list:[]}},onLoad:function(){if(uni.getStorageSync("agentInfo")){var t=JSON.parse(this.utils.decrypt(uni.getStorageSync("agentInfo"),"abcdefgabcdefg12"));t&&(this.token=t.token,this.tel=t.agent_tel)}},methods:{navTo:function(){uni.redirectTo({url:"../tabbar/tabbar?page=about"})},tabSelect:function(t){this.TabCur=t.currentTarget.dataset.id,this.scrollLeft=80*(t.currentTarget.dataset.id-1)},editpwd:function(){""!=this.ypassword?this.ypassword!=this.npassword?""!=this.npassword?""!=this.repassword?this.repassword==this.npassword?uni.request({url:n.default.websiteUrl+"/agent/agent/ajax-login-pwd",header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",dataType:"json",cache:!1,data:{token:this.token,ypassword:this.ypassword,npassword:this.npassword,repassword:this.repassword},success:function(t){200==t.data.code?uni.showModal({showCancel:!1,content:"登录密码已修改，请重新登陆",success:function(t){t.confirm&&uni.redirectTo({url:"../login/login?lout=1"})}}):400==t.data.code?uni.showToast({icon:"none",title:t.data.data}):-200==t.data.code&&uni.showModal({showCancel:!1,content:"用户信息已失效，请重新登陆",success:function(t){t.confirm&&uni.redirectTo({url:"../login/login?lout=1"})}})},fail:function(){uni.showToast({icon:"none",title:"网络异常,请稍后重试"})},complete:function(){}}):uni.showToast({icon:"none",title:"两次输入的新密码不一致"}):uni.showToast({icon:"none",title:"请再次输入新密码"}):uni.showToast({icon:"none",title:"请输入新密码"}):uni.showToast({icon:"none",title:"原密码和新密码相同"}):uni.showToast({icon:"none",title:"请输入原密码"})}}};a.default=o},"98f8":function(t,a,e){"use strict";e.r(a);var n=e("e919"),s=e("aeb8");for(var i in s)"default"!==i&&function(t){e.d(a,t,function(){return s[t]})}(i);e("d22f");var o=e("2877"),r=Object(o["a"])(s["default"],n["a"],n["b"],!1,null,"5b20e11e",null);a["default"]=r.exports},aeb8:function(t,a,e){"use strict";e.r(a);var n=e("6538"),s=e.n(n);for(var i in n)"default"!==i&&function(t){e.d(a,t,function(){return n[t]})}(i);a["default"]=s.a},b914:function(t,a,e){var n=e("d5e4");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var s=e("4f06").default;s("1f6e6582",n,!0,{sourceMap:!1,shadowMode:!1})},d22f:function(t,a,e){"use strict";var n=e("b914"),s=e.n(n);s.a},d5e4:function(t,a,e){a=t.exports=e("2350")(!1),a.push([t.i,".tabpage[data-v-5b20e11e]{height:100%;width:100%}.show[data-v-5b20e11e]{display:block}.hide[data-v-5b20e11e]{display:none}.bg-gradual-blue[data-v-5b20e11e]{background:-webkit-gradient(linear,left top,right top,from(#3396e9),to(#1ab7b9));background:-o-linear-gradient(left,#3396e9,#1ab7b9);background:linear-gradient(90deg,#3396e9,#1ab7b9)}.nav[data-v-5b20e11e]{margin-left:0;margin-top:%?5?%;width:100%}.cu-item[data-v-5b20e11e]{padding:%?0?% %?0?%;margin:%?0?% %?0?%;text-align:center;width:50%}.title[data-v-5b20e11e]{color:#444;text-align:left;width:%?180?%}.btn[data-v-5b20e11e]{background:-webkit-gradient(linear,left top,right top,from(#3396e9),to(#1ab7b9));background:-o-linear-gradient(left,#3396e9,#1ab7b9);background:linear-gradient(90deg,#3396e9,#1ab7b9);margin-top:%?50?%;width:96%;margin-left:2%}",""])},e919:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",[e("v-uni-view",{staticClass:"cu-bar bg-gradual-blue search",style:[{height:t.CustomBar+"px"}]},[e("v-uni-view",{staticClass:"action",on:{click:function(a){a=t.$handleEvent(a),t.navTo()}}},[e("v-uni-text",{staticClass:"cuIcon-back"}),t._v("返回")],1),e("v-uni-view",{staticClass:"content"},[t._v("修改登录密码")]),e("v-uni-view",{staticClass:"action"})],1),e("v-uni-view",{staticClass:"bg-gray ",class:"show"},[e("v-uni-view",{staticClass:"cu-list menu",class:[t.menuBorder?"sm-border":"",t.menuCard?"card-menu margin-top":""]},[e("v-uni-view",{staticClass:"cu-form-group l-input"},[e("v-uni-view",{staticClass:"title"},[t._v("原密码：")]),e("m-input",{staticClass:"m-input",attrs:{type:"password",displayable:"",placeholder:"输入原密码"},model:{value:t.ypassword,callback:function(a){t.ypassword=a},expression:"ypassword"}})],1),e("v-uni-view",{staticClass:"cu-form-group l-input"},[e("v-uni-view",{staticClass:"title"},[t._v("新密码：")]),e("m-input",{staticClass:"m-input",attrs:{type:"password",displayable:"",placeholder:"输入新密码"},model:{value:t.npassword,callback:function(a){t.npassword=a},expression:"npassword"}})],1),e("v-uni-view",{staticClass:"cu-form-group l-input"},[e("v-uni-view",{staticClass:"title"},[t._v("确认密码：")]),e("m-input",{staticClass:"m-input",attrs:{type:"password",displayable:"",placeholder:"重新输入密码"},model:{value:t.repassword,callback:function(a){t.repassword=a},expression:"repassword"}})],1)],1),e("v-uni-view",[e("v-uni-button",{staticClass:"cu-btn bg-blue margin-tb-sm lg btn",attrs:{formType:"submit",type:"primary"},on:{click:function(a){a=t.$handleEvent(a),t.editpwd()}}},[t._v("提交")])],1)],1)],1)},s=[];e.d(a,"a",function(){return n}),e.d(a,"b",function(){return s})}}]);