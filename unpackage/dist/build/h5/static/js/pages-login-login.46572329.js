(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-login"],{"0644":function(t,e,n){"use strict";var i=n("6c4e"),a=n.n(i);a.a},3597:function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,".show[data-v-6cdc96d3]{display:block}.hide[data-v-6cdc96d3]{display:none}.title-bg[data-v-6cdc96d3]{width:100%;z-index:2;opacity:1;position:absolute;color:#fff}.toptab[data-v-6cdc96d3]{height:%?60?%}.code-img[data-v-6cdc96d3]{float:right;margin-right:%?-20?%;height:%?90?%;width:%?180?%}.input-group[data-v-6cdc96d3]{margin-top:%?-2?%}.text-olive[data-v-6cdc96d3]{color:#1bb8b7}.primary[data-v-6cdc96d3]{border-radius:%?8?%;background:-webkit-gradient(linear,left top,right top,from(#0286f7),to(#1bb8b7));background:-o-linear-gradient(left,#0286f7,#1bb8b7);background:linear-gradient(90deg,#0286f7,#1bb8b7)}.login-btn[data-v-6cdc96d3]{margin-top:%?50?%;margin-bottom:%?10?%;width:98%;margin-left:1%}.head[data-v-6cdc96d3]{height:%?230?%;background-color:#f1f1f1}.head-img[data-v-6cdc96d3]{padding:10%;margin:0 auto}.l-input[data-v-6cdc96d3]{margin-bottom:%?2?%;width:98%;margin-left:1%}.action-row[data-v-6cdc96d3]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.action-row uni-navigator[data-v-6cdc96d3]{color:#007aff;padding:0 %?20?%}.oauth-row[data-v-6cdc96d3]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;position:absolute;top:0;left:0;width:100%}.oauth-image[data-v-6cdc96d3]{width:%?100?%;height:%?100?%;border:%?1?% solid #ddd;border-radius:%?100?%;margin:0 %?40?%;background-color:#fff}.oauth-image uni-image[data-v-6cdc96d3]{width:%?60?%;height:%?60?%;margin:%?20?%}",""])},"436f":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"content"},[n("v-uni-view",{staticClass:"cu-bar title-bg",style:[{height:t.CustomBar+"px",display:t.ishead}]},[n("v-uni-view",{staticClass:"action",on:{click:function(e){e=t.$handleEvent(e),t.navTo()}}},[n("v-uni-text",{staticClass:"cuIcon-back text-white"}),t._v("游戏大厅")],1),n("v-uni-view",{staticClass:"content title-text"}),n("v-uni-view",{staticClass:"action"})],1),n("v-uni-image",{staticClass:"response",attrs:{src:"../../static/img/login-logo.jpg",mode:"widthFix"}}),n("v-uni-view",{staticClass:"input-group"},[n("v-uni-view",{staticClass:"cu-form-group l-input"},[n("v-uni-text",{staticClass:"cuIcon-my text-olive margin-right-sm"}),n("m-input",{staticClass:"m-input",attrs:{type:"number",clearable:"",placeholder:"请输入手机号或ID"},on:{input:function(e){e=t.$handleEvent(e),t.change()}},model:{value:t.account,callback:function(e){t.account=e},expression:"account"}})],1),n("v-uni-view",{staticClass:"cu-form-group l-input"},[n("v-uni-text",{staticClass:"cuIcon-lock text-olive margin-right-sm"}),n("m-input",{staticClass:"m-input",attrs:{type:"password",placeholder:"请输入登录密码"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),n("v-uni-view",{class:t.autologin?"cu-form-group l-input hide":"cu-form-group l-input"},[n("v-uni-text",{staticClass:"cuIcon-safe text-olive margin-right-sm"}),n("m-input",{staticClass:"m-input",attrs:{type:"text",clearable:"",placeholder:"输入验证码"},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}}),n("v-uni-image",{staticClass:"code-img",attrs:{src:t.code_url},on:{click:function(e){e=t.$handleEvent(e),t.changeImg()}}})],1)],1),n("v-uni-view",{staticClass:"btn-row login-btn"},[n("v-uni-button",{staticClass:"primary",attrs:{type:"primary"},on:{click:function(e){e=t.$handleEvent(e),t.bindLogin(e)}}},[t._v("登录")])],1),n("v-uni-view",{staticClass:"action-row"},[n("v-uni-navigator",{attrs:{"data-cur":"../login/reg"},on:{click:function(e){e=t.$handleEvent(e),t.PageChange(e)}}},[t._v("注册账号")]),n("v-uni-text",[t._v("|")]),n("v-uni-navigator",{attrs:{"data-cur":"../login/pwd"},on:{click:function(e){e=t.$handleEvent(e),t.PageChange(e)}}},[t._v("忘记密码")])],1)],1)},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},"4cc0":function(t,e,n){"use strict";n.r(e);var i=n("436f"),a=n("a6e1");for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);n("0644");var c=n("2877"),s=Object(c["a"])(a["default"],i["a"],i["b"],!1,null,"6cdc96d3",null);e["default"]=s.exports},"6c4e":function(t,e,n){var i=n("3597");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("3e364c49",i,!0,{sourceMap:!1,shadowMode:!1})},"961e":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;o(n("f236"));var i=o(n("1a64")),a=o(n("fddb"));function o(t){return t&&t.__esModule?t:{default:t}}var c={components:{mInput:i.default},data:function(){return this,{code_url:"",disableScroll:!0,providerList:[],hasProvider:!1,account:"",password:"",positionTop:0,code:"",webUrl:this.websiteUrl,random_num:0,ishead:!1,autologin:!1,lofinURL:"/agent/login/ajax-login",islogin:"0",sign:""}},onLoad:function(t){this.random(),this.changeImg();var e=this.utils.decrypt(uni.getStorageSync("account"),"abcdefgabcdefg12"),n=this.utils.decrypt(uni.getStorageSync("password"),"abcdefgabcdefg12"),i=(new Date).getTime();if(e&&null!=e&&(this.account=e),n&&null!=n&&(this.password=n),t.lout)uni.clearStorage(),this.autologin=!1,this.lofinURL="/agent/login/ajax-login";else if(uni.getStorageSync("agentInfo")&&void 0!=uni.getStorageSync("agentInfo")){var a=JSON.parse(this.utils.decrypt(uni.getStorageSync("agentInfo"),"abcdefgabcdefg12"));a.sign&&(this.sign=a.sign,this.islogin=a.auto_login);var o=i-(a.timer+864e5);a&&o<0?(this.autologin=!0,this.lofinURL="/agent/login/ajax-auto-login"):(uni.clearStorage(),this.autologin=!1,this.lofinURL="/agent/login/ajax-login")}else uni.clearStorage(),this.autologin=!1,this.lofinURL="/agent/login/ajax-login"},methods:{navTo:function(){window.location.replace(a.default.webtoUrl)},random:function(){this.random_num=(new Date).getTime()},change:function(){if(uni.getStorageSync("agentInfo")){var t=JSON.parse(this.utils.decrypt(uni.getStorageSync("agentInfo"),"abcdefgabcdefg12"));t.agent_id&&this.account!=t.agent_id&&(this.autologin=!1,this.lofinURL="/agent/login/ajax-login")}console.log(t)},PageChange:function(t){uni.redirectTo({url:t.currentTarget.dataset.cur})},changeImg:function(){var t=this;this.code_url="",uni.request({url:a.default.websiteUrl+"/agent/login/captcha?refresh=refresh&&time_unid="+this.random_num,header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",dataType:"json",cache:!1,data:{},success:function(e){t.code_url=a.default.websiteUrl+e.data["url"]+"&time_unid="+t.random_num},fail:function(){},complete:function(){}})},initPosition:function(){this.positionTop=uni.getSystemInfoSync().windowHeight-100},bindLogin:function(){this.account.length<4?uni.showToast({icon:"none",title:"账号最短为 4 个字符"}):this.password.length<4?uni.showToast({icon:"none",title:"密码最短为 4 个字符"}):!this.autologin&&this.code.length<=0?uni.showToast({icon:"none",title:"请输入验证码"}):(uni.showLoading({title:"登录中"}),this.login())},login:function(){var t=this;uni.request({url:a.default.websiteUrl+this.lofinURL,header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",dataType:"json",cache:!1,data:{account:this.account,password:this.password,code:this.code,unid:this.random_num,autologin:this.islogin,sign:this.sign},success:function(e){var n=(new Date).getTime();if(console.log(n),200==e.data.isSuccess){console.log(e.data.result),uni.setStorageSync("account",t.utils.encrypt(t.account,"abcdefgabcdefg12")),uni.setStorageSync("password",t.utils.encrypt(t.password,"abcdefgabcdefg12")),null!=e.data.result.auto_login&&""!=e.data.result.auto_login?t.autologin=e.data.result.auto_login:t.autologin=0;var i={id:e.data.result.id,agent_id:e.data.result.agent_id,agent_tel:e.data.result.agent_tel,herf_pic:e.data.result.herf_pic,nickname:e.data.result.nickname,token:e.data.result.token,href:e.data.result.href,timer:n,auto_login:e.data.result.auto_login,sign:e.data.result.sign},a=t.utils.encrypt(JSON.stringify(i),"abcdefgabcdefg12");uni.setStorage({key:"agentInfo",data:a,success:function(){setTimeout(function(){uni.hideLoading()},1e3),uni.redirectTo({url:"../tabbar/tabbar"})}})}else if(400==e.data.isSuccess){uni.hideLoading(),uni.clearStorage(),t.autologin=!1,t.account="",t.password="",t.code="";var o=t;t.lofinURL="/agent/login/ajax-login",uni.showModal({showCancel:!1,content:e.data.message,success:function(t){t.confirm&&o.changeImg()}})}else 301==e.data.isSuccess?(uni.hideLoading(),uni.clearStorage(),t.autologin=!1,t.lofinURL="/agent/login/ajax-login",t.code="",uni.showToast({icon:"none",duration:2e3,title:e.data.message}),t.changeImg()):302==e.data.isSuccess?(uni.clearStorage(),uni.hideLoading(),t.lofinURL="/agent/login/ajax-login",t.autologin=!1,t.account="",t.password="",t.code="",uni.showToast({icon:"none",duration:2e3,title:e.data.message}),t.changeImg()):101==e.data.isSuccess?(uni.hideLoading(),uni.clearStorage(),t.autologin=!1,t.lofinURL="/agent/login/ajax-login",t.account="",t.password="",t.code="",uni.showToast({icon:"none",duration:2e3,title:e.data.message}),t.changeImg()):100==e.data.isSuccess&&(uni.hideLoading(),uni.clearStorage(),t.account="",t.password="",t.code="",t.autologin=!1,uni.showToast({icon:"none",duration:2e3,title:e.data.message}),t.changeImg())},fail:function(){uni.showToast({icon:"none",title:"网络异常,请稍后重试"}),uni.clearStorage()},complete:function(){}})},onReady:function(){this.initPosition()}}};e.default=c},a6e1:function(t,e,n){"use strict";n.r(e);var i=n("961e"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e["default"]=a.a},f236:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i="USERS_KEY",a=function(){var t="";return t=uni.getStorageSync(i),t||(t="[]"),JSON.parse(t)},o=function(t){var e=a();e.push({id:t.id,agent_id:t.agent_id,agent_tel:t.agent_tel}),uni.setStorageSync(i,JSON.stringify(e))},c={getUsers:a,addUser:o};e.default=c},fddb:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=new Array;i[0]="http://admin.xkegame.com",i[1]="http://testadmin.xkegame.com",i[2]="http://192.168.0.199:8081";var a=new Array;a[0]="http://h5.xkegame.com",a[1]="http://test.xkegame.com";var o=i[0],c=a[0],s={websiteUrl:o,webtoUrl:c};e.default=s}}]);