(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-about-info"],{"59c9":function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"cu-bar bg-gradual-blue search",style:[{height:t.CustomBar+"px"}]},[e("v-uni-view",{staticClass:"action",on:{click:function(a){a=t.$handleEvent(a),t.navTo()}}},[e("v-uni-text",{staticClass:"cuIcon-back"}),t._v("返回")],1),e("v-uni-view",{staticClass:"content"},[t._v("个人信息")]),e("v-uni-view",{staticClass:"action"})],1),e("v-uni-view",{staticClass:"cu-list menu",class:[t.menuBorder?"sm-border":"",t.menuCard?"card-menu margin-top":""]},[e("v-uni-view",{staticClass:"cu-item",class:t.menuArrow?"arrow":""},[e("v-uni-text",{staticClass:"title"},[t._v("姓 名：")]),e("v-uni-text",{staticClass:"content"},[e("v-uni-text",{staticClass:"text-grey"},[t._v(t._s(t.name))])],1)],1),e("v-uni-view",{staticClass:"cu-item",class:""},[e("v-uni-text",{staticClass:"title"},[t._v("手机号：")]),e("v-uni-text",{staticClass:" content"},[e("v-uni-text",{staticClass:"text-grey"},[t._v(t._s(t.tel))])],1)],1),e("v-uni-view",{staticClass:"cu-item",class:t.menuArrow?"arrow":""},[e("v-uni-text",{staticClass:"title"},[t._v("I D ：")]),e("v-uni-text",{staticClass:" content"},[e("v-uni-text",{staticClass:"text-grey"},[t._v(t._s(t.agent_id))])],1)],1),e("v-uni-view",{staticClass:"cu-item",class:t.menuArrow?"arrow":""},[e("v-uni-text",{staticClass:"title"},[t._v("昵 称：")]),e("v-uni-text",{staticClass:" content"},[e("v-uni-text",{staticClass:"text-grey"},[t._v(t._s(t.nackName))])],1)],1),e("v-uni-view",{staticClass:"cu-item",class:t.menuArrow?"arrow":""},[e("v-uni-text",{staticClass:"title"},[t._v("性 别：")]),e("v-uni-text",{staticClass:" content"},[e("v-uni-text",{staticClass:"text-grey"},[t._v(t._s(t.sex))])],1)],1),e("v-uni-view",{staticClass:"cu-item",class:t.menuArrow?"arrow":""},[e("v-uni-text",{staticClass:"title"},[t._v("邮 箱：")]),e("v-uni-text",{staticClass:" content"},[e("v-uni-text",{staticClass:"text-grey"},[t._v(t._s(t.email))])],1)],1),e("v-uni-view",{staticClass:"cu-item",class:t.menuArrow?"arrow":""},[e("v-uni-text",{staticClass:"title"},[t._v("Q Q ：")]),e("v-uni-text",{staticClass:" content"},[e("v-uni-text",{staticClass:"text-grey"},[t._v(t._s(t.qq))])],1)],1),e("v-uni-view",{staticClass:"cu-item",class:t.menuArrow?"arrow":""},[e("v-uni-text",{staticClass:"title"},[t._v("地 区：")]),e("v-uni-text",{staticClass:" content"},[e("v-uni-text",{staticClass:"text-grey"},[t._v(t._s(t.area))])],1)],1),e("v-uni-view",{staticClass:"cu-item",class:t.menuArrow?"arrow":""},[e("v-uni-text",{staticClass:"title"},[t._v("地 址：")]),e("v-uni-text",{staticClass:" content"},[e("v-uni-text",{staticClass:"text-grey"},[t._v(t._s(t.address))])],1)],1),e("v-uni-view",[e("v-uni-button",{staticClass:"cu-btn bg-blue margin-tb-sm lg btn",attrs:{type:"button"},on:{click:function(a){a=t.$handleEvent(a),t.ToPage(a)}}},[t._v("编辑")])],1)],1)],1)},s=[];e.d(a,"a",function(){return n}),e.d(a,"b",function(){return s})},8386:function(t,a,e){a=t.exports=e("2350")(!1),a.push([t.i,".menu[data-v-bd0bfcc4]{margin-top:%?10?%}.btn[data-v-bd0bfcc4]{background:-webkit-gradient(linear,left top,right top,from(#3396e9),to(#1ab7b9));background:-webkit-linear-gradient(left,#3396e9,#1ab7b9);background:-o-linear-gradient(left,#3396e9,#1ab7b9);background:linear-gradient(90deg,#3396e9,#1ab7b9);width:96%;margin-left:2%;margin-top:%?50?%}.page[data-v-bd0bfcc4]{height:100Vh;width:100vw}.title[data-v-bd0bfcc4]{color:#777;text-align:left;width:%?120?%}.btn-bg[data-v-bd0bfcc4]{background:#fff;color:#007aff}",""])},"95ef":function(t,a,e){"use strict";e.r(a);var n=e("59c9"),s=e("daeb");for(var i in s)"default"!==i&&function(t){e.d(a,t,function(){return s[t]})}(i);e("b2b8");var c=e("2877"),u=Object(c["a"])(s["default"],n["a"],n["b"],!1,null,"bd0bfcc4",null);a["default"]=u.exports},a413:function(t,a,e){var n=e("8386");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var s=e("4f06").default;s("46303ab9",n,!0,{sourceMap:!1,shadowMode:!1})},b2b8:function(t,a,e){"use strict";var n=e("a413"),s=e.n(n);s.a},d278:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=s(e("803e"));function s(t){return t&&t.__esModule?t:{default:t}}var i={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar,menuBorder:!1,menuArrow:!1,menuCard:!1,agent_id:"",token:"",name:"",tel:"",nackName:"",sex:"",email:"",qq:"",area:"",address:"",list:[]}},onLoad:function(){var t=this;if(uni.getStorageSync("agentInfo")){var a=JSON.parse(this.utils.decrypt(uni.getStorageSync("agentInfo"),"abcdefgabcdefg12"));a&&(this.token=a.token)}uni.request({url:n.default.websiteUrl+"/agent/agent/ajax-agent-info",header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",dataType:"json",cache:!1,data:{token:this.token},success:function(a){t.list=a;var e=t.list.data;200==e.code?(t.name=e.data.agent_name,t.tel=e.data.agent_tel,t.nackName=e.data.nickname,"0"==e.data.sex?t.sex="男":"1"==e.data.sex&&(t.sex="女"),t.agent_id=e.data.agent_id,null==e.data.email?t.email="-暂未填写-":t.email=e.data.email,null==e.data.qq?t.qq="-暂未填写-":t.qq=e.data.qq,null==e.data.area?t.area="-暂未选择-":t.area=e.data.area,null==e.data.address?t.address="-暂未填写-":t.address=e.data.address):-200==e.code&&uni.showModal({showCancel:!1,content:"用户信息已失效，请重新登陆",success:function(t){t.confirm&&uni.redirectTo({url:"../login/login?lout=1"})}})},fail:function(){uni.showToast({icon:"none",title:"网络异常,请稍后重试"})},complete:function(){}})},methods:{ToPage:function(){uni.redirectTo({url:"../about/editinfo"})},navTo:function(){uni.redirectTo({url:"../tabbar/tabbar?page=about"})}}};a.default=i},daeb:function(t,a,e){"use strict";e.r(a);var n=e("d278"),s=e.n(n);for(var i in n)"default"!==i&&function(t){e.d(a,t,function(){return n[t]})}(i);a["default"]=s.a}}]);