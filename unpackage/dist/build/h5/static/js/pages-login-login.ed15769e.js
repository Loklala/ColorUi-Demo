(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-login"],{"0646":function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,'@font-face{font-family:uniicons;font-weight:400;font-style:normal;src:url(https://img-cdn-qiniu.dcloud.net.cn/fonts/uni.ttf?t=1536565627510) format("truetype")}.m-icon[data-v-a8c7110c]{font-family:uniicons;font-size:%?48?%;font-weight:400;font-style:normal;line-height:1;display:inline-block;text-decoration:none;-webkit-font-smoothing:antialiased}.m-icon.uni-active[data-v-a8c7110c]{color:#007aff}.m-icon-contact[data-v-a8c7110c]:before{content:"\\E100"}.m-icon-person[data-v-a8c7110c]:before{content:"\\E101"}.m-icon-personadd[data-v-a8c7110c]:before{content:"\\E102"}.m-icon-contact-filled[data-v-a8c7110c]:before{content:"\\E130"}.m-icon-person-filled[data-v-a8c7110c]:before{content:"\\E131"}.m-icon-personadd-filled[data-v-a8c7110c]:before{content:"\\E132"}.m-icon-phone[data-v-a8c7110c]:before{content:"\\E200"}.m-icon-email[data-v-a8c7110c]:before{content:"\\E201"}.m-icon-chatbubble[data-v-a8c7110c]:before{content:"\\E202"}.m-icon-chatboxes[data-v-a8c7110c]:before{content:"\\E203"}.m-icon-phone-filled[data-v-a8c7110c]:before{content:"\\E230"}.m-icon-email-filled[data-v-a8c7110c]:before{content:"\\E231"}.m-icon-chatbubble-filled[data-v-a8c7110c]:before{content:"\\E232"}.m-icon-chatboxes-filled[data-v-a8c7110c]:before{content:"\\E233"}.m-icon-weibo[data-v-a8c7110c]:before{content:"\\E260"}.m-icon-weixin[data-v-a8c7110c]:before{content:"\\E261"}.m-icon-pengyouquan[data-v-a8c7110c]:before{content:"\\E262"}.m-icon-chat[data-v-a8c7110c]:before{content:"\\E263"}.m-icon-qq[data-v-a8c7110c]:before{content:"\\E264"}.m-icon-videocam[data-v-a8c7110c]:before{content:"\\E300"}.m-icon-camera[data-v-a8c7110c]:before{content:"\\E301"}.m-icon-mic[data-v-a8c7110c]:before{content:"\\E302"}.m-icon-location[data-v-a8c7110c]:before{content:"\\E303"}.m-icon-mic-filled[data-v-a8c7110c]:before,.m-icon-speech[data-v-a8c7110c]:before{content:"\\E332"}.m-icon-location-filled[data-v-a8c7110c]:before{content:"\\E333"}.m-icon-micoff[data-v-a8c7110c]:before{content:"\\E360"}.m-icon-image[data-v-a8c7110c]:before{content:"\\E363"}.m-icon-map[data-v-a8c7110c]:before{content:"\\E364"}.m-icon-compose[data-v-a8c7110c]:before{content:"\\E400"}.m-icon-trash[data-v-a8c7110c]:before{content:"\\E401"}.m-icon-upload[data-v-a8c7110c]:before{content:"\\E402"}.m-icon-download[data-v-a8c7110c]:before{content:"\\E403"}.m-icon-close[data-v-a8c7110c]:before{content:"\\E404"}.m-icon-redo[data-v-a8c7110c]:before{content:"\\E405"}.m-icon-undo[data-v-a8c7110c]:before{content:"\\E406"}.m-icon-refresh[data-v-a8c7110c]:before{content:"\\E407"}.m-icon-star[data-v-a8c7110c]:before{content:"\\E408"}.m-icon-plus[data-v-a8c7110c]:before{content:"\\E409"}.m-icon-minus[data-v-a8c7110c]:before{content:"\\E410"}.m-icon-checkbox[data-v-a8c7110c]:before,.m-icon-circle[data-v-a8c7110c]:before{content:"\\E411"}.m-icon-clear[data-v-a8c7110c]:before,.m-icon-close-filled[data-v-a8c7110c]:before{content:"\\E434"}.m-icon-refresh-filled[data-v-a8c7110c]:before{content:"\\E437"}.m-icon-star-filled[data-v-a8c7110c]:before{content:"\\E438"}.m-icon-plus-filled[data-v-a8c7110c]:before{content:"\\E439"}.m-icon-minus-filled[data-v-a8c7110c]:before{content:"\\E440"}.m-icon-circle-filled[data-v-a8c7110c]:before{content:"\\E441"}.m-icon-checkbox-filled[data-v-a8c7110c]:before{content:"\\E442"}.m-icon-closeempty[data-v-a8c7110c]:before{content:"\\E460"}.m-icon-refreshempty[data-v-a8c7110c]:before{content:"\\E461"}.m-icon-reload[data-v-a8c7110c]:before{content:"\\E462"}.m-icon-starhalf[data-v-a8c7110c]:before{content:"\\E463"}.m-icon-spinner[data-v-a8c7110c]:before{content:"\\E464"}.m-icon-spinner-cycle[data-v-a8c7110c]:before{content:"\\E465"}.m-icon-search[data-v-a8c7110c]:before{content:"\\E466"}.m-icon-plusempty[data-v-a8c7110c]:before{content:"\\E468"}.m-icon-forward[data-v-a8c7110c]:before{content:"\\E470"}.m-icon-back[data-v-a8c7110c]:before,.m-icon-left-nav[data-v-a8c7110c]:before{content:"\\E471"}.m-icon-checkmarkempty[data-v-a8c7110c]:before{content:"\\E472"}.m-icon-home[data-v-a8c7110c]:before{content:"\\E500"}.m-icon-navigate[data-v-a8c7110c]:before{content:"\\E501"}.m-icon-gear[data-v-a8c7110c]:before{content:"\\E502"}.m-icon-paperplane[data-v-a8c7110c]:before{content:"\\E503"}.m-icon-info[data-v-a8c7110c]:before{content:"\\E504"}.m-icon-help[data-v-a8c7110c]:before{content:"\\E505"}.m-icon-locked[data-v-a8c7110c]:before{content:"\\E506"}.m-icon-more[data-v-a8c7110c]:before{content:"\\E507"}.m-icon-flag[data-v-a8c7110c]:before{content:"\\E508"}.m-icon-home-filled[data-v-a8c7110c]:before{content:"\\E530"}.m-icon-gear-filled[data-v-a8c7110c]:before{content:"\\E532"}.m-icon-info-filled[data-v-a8c7110c]:before{content:"\\E534"}.m-icon-help-filled[data-v-a8c7110c]:before{content:"\\E535"}.m-icon-more-filled[data-v-a8c7110c]:before{content:"\\E537"}.m-icon-settings[data-v-a8c7110c]:before{content:"\\E560"}.m-icon-list[data-v-a8c7110c]:before{content:"\\E562"}.m-icon-bars[data-v-a8c7110c]:before{content:"\\E563"}.m-icon-loop[data-v-a8c7110c]:before{content:"\\E565"}.m-icon-paperclip[data-v-a8c7110c]:before{content:"\\E567"}.m-icon-eye[data-v-a8c7110c]:before{content:"\\E568"}.m-icon-arrowup[data-v-a8c7110c]:before{content:"\\E580"}.m-icon-arrowdown[data-v-a8c7110c]:before{content:"\\E581"}.m-icon-arrowleft[data-v-a8c7110c]:before{content:"\\E582"}.m-icon-arrowright[data-v-a8c7110c]:before{content:"\\E583"}.m-icon-arrowthinup[data-v-a8c7110c]:before{content:"\\E584"}.m-icon-arrowthindown[data-v-a8c7110c]:before{content:"\\E585"}.m-icon-arrowthinleft[data-v-a8c7110c]:before{content:"\\E586"}.m-icon-arrowthinright[data-v-a8c7110c]:before{content:"\\E587"}.m-icon-pulldown[data-v-a8c7110c]:before{content:"\\E588"}.m-icon-scan[data-v-a8c7110c]:before{content:"\\E612"}',""])},"1a64":function(t,e,n){"use strict";n.r(e);var a=n("a79c"),o=n("f901");for(var c in o)"default"!==c&&function(t){n.d(e,t,function(){return o[t]})}(c);n("8a70");var i=n("2877"),r=Object(i["a"])(o["default"],a["a"],a["b"],!1,null,"6a9c5869",null);e["default"]=r.exports},"4cc0":function(t,e,n){"use strict";n.r(e);var a=n("ead7"),o=n("a6e1");for(var c in o)"default"!==c&&function(t){n.d(e,t,function(){return o[t]})}(c);n("9289");var i=n("2877"),r=Object(i["a"])(o["default"],a["a"],a["b"],!1,null,"555d3e20",null);e["default"]=r.exports},"50cc":function(t,e,n){"use strict";var a=n("e9a4"),o=n.n(a);o.a},"64e7":function(t,e,n){var a=n("96d5");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=n("4f06").default;o("11e7b694",a,!0,{sourceMap:!1,shadowMode:!1})},"719c":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(n("73e3"));function o(t){return t&&t.__esModule?t:{default:t}}var c={components:{mIcon:a.default},props:{type:String,value:String,placeholder:String,clearable:{type:[Boolean,String],default:!1},displayable:{type:[Boolean,String],default:!1},focus:{type:[Boolean,String],default:!1}},model:{prop:"value",event:"input"},data:function(){return{showPassword:!1,isFocus:!1}},computed:{inputType:function(){var t=this.type;return"password"===t?"text":t},clearable_:function(){return"false"!==String(this.clearable)},displayable_:function(){return"false"!==String(this.displayable)},focus_:function(){return"false"!==String(this.focus)}},methods:{clear:function(){this.$emit("input","")},display:function(){this.showPassword=!this.showPassword},onFocus:function(){this.isFocus=!0},onBlur:function(){var t=this;this.$nextTick(function(){t.isFocus=!1})},onInput:function(t){this.$emit("input",t.target.value)}}};e.default=c},"73e3":function(t,e,n){"use strict";n.r(e);var a=n("aeb5"),o=n("d928");for(var c in o)"default"!==c&&function(t){n.d(e,t,function(){return o[t]})}(c);n("50cc");var i=n("2877"),r=Object(i["a"])(o["default"],a["a"],a["b"],!1,null,"a8c7110c",null);e["default"]=r.exports},"8a70":function(t,e,n){"use strict";var a=n("64e7"),o=n.n(a);o.a},9289:function(t,e,n){"use strict";var a=n("effc"),o=n.n(a);o.a},"961e":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;c(n("f236"));var a=c(n("1a64")),o=c(n("fddb"));function c(t){return t&&t.__esModule?t:{default:t}}var i={components:{mInput:a.default},data:function(){return this,{code_url:"",disableScroll:!0,providerList:[],hasProvider:!1,account:"",password:"",positionTop:0,code:"",webUrl:this.websiteUrl,random_num:0,ishead:!1}},onLoad:function(t){var e=navigator.userAgent.toLowerCase();-1==e.indexOf("micromessenger")?this.ishead=!1:this.ishead=!0,this.random(),this.changeImg()},methods:{navTo:function(){window.location.replace(o.default.webtoUrl)},random:function(){this.random_num=(new Date).getTime()},PageChange:function(t){uni.redirectTo({url:t.currentTarget.dataset.cur})},changeImg:function(){var t=this;this.code_url="",uni.request({url:o.default.websiteUrl+"/agent/login/captcha?refresh=refresh&&time_unid="+this.random_num,header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",dataType:"json",cache:!1,data:{},success:function(e){t.code_url=o.default.websiteUrl+e.data["url"]+"&time_unid="+t.random_num},fail:function(){},complete:function(){}})},initPosition:function(){this.positionTop=uni.getSystemInfoSync().windowHeight-100},bindLogin:function(){var t=this;this.account.length<4?uni.showToast({icon:"none",title:"账号最短为 4 个字符"}):this.password.length<4?uni.showToast({icon:"none",title:"密码最短为 4 个字符"}):uni.request({url:o.default.websiteUrl+"/agent/login/ajax-login",header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",dataType:"json",cache:!1,data:{account:this.account,password:this.password,code:this.code,unid:this.random_num},success:function(e){if(200==e.data.isSuccess)uni.setStorage({key:"agentInfo",data:{id:e.data.result.id,agent_id:e.data.result.agent_id,agent_tel:e.data.result.agent_tel,herf_pic:e.data.result.herf_pic,nickname:e.data.result.nickname,token:e.data.result.token,href:e.data.result.href},success:function(){uni.redirectTo({url:"../tabbar/tabbar"})}});else if(400==e.data.isSuccess){t.code="";var n=t;uni.showModal({showCancel:!1,content:e.data.message,success:function(t){t.confirm&&n.changeImg()}})}else 301==e.data.isSuccess?(t.code="",uni.showToast({icon:"none",duration:2e3,title:e.data.message}),t.changeImg()):302==e.data.isSuccess&&(t.code="",uni.showToast({icon:"none",duration:2e3,title:e.data.message}),t.changeImg())},fail:function(){uni.showToast({icon:"none",title:"网络异常,请稍后重试"})},complete:function(){}})},onReady:function(){this.initPosition()}}};e.default=i},"96d5":function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,".m-input-view[data-v-6a9c5869]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:100%;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;padding:0 %?10?%}.m-input-input[data-v-6a9c5869]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;width:100%}.m-input-icon[data-v-6a9c5869]{width:20px}",""])},a6e1:function(t,e,n){"use strict";n.r(e);var a=n("961e"),o=n.n(a);for(var c in a)"default"!==c&&function(t){n.d(e,t,function(){return a[t]})}(c);e["default"]=o.a},a79c:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"m-input-view"},[n("v-uni-input",{staticClass:"m-input-input",attrs:{focus:t.focus_,type:t.inputType,value:t.value,placeholder:t.placeholder,password:"password"===t.type&&!t.showPassword},on:{input:function(e){e=t.$handleEvent(e),t.onInput(e)},focus:function(e){e=t.$handleEvent(e),t.onFocus(e)},blur:function(e){e=t.$handleEvent(e),t.onBlur(e)}}}),t.clearable_&&!t.displayable_&&t.value.length?n("v-uni-view",{staticClass:"m-input-icon"},[n("m-icon",{attrs:{color:"#666666",type:"clear",size:"20"},on:{click:function(e){e=t.$handleEvent(e),t.clear(e)}}})],1):t._e(),t.displayable_?n("v-uni-view",{staticClass:"m-input-icon"},[n("m-icon",{attrs:{color:t.showPassword?"#666666":"#cccccc",type:"eye",size:"20"},on:{click:function(e){e=t.$handleEvent(e),t.display(e)}}})],1):t._e()],1)},o=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return o})},aeb5:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"m-icon",class:["m-icon-"+t.type],style:{color:t.color,"font-size":t.fontSize},on:{click:function(e){e=t.$handleEvent(e),t.onClick()}}})},o=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return o})},c3c3:function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,".title-bg[data-v-555d3e20]{width:100%;z-index:2;opacity:1;position:absolute;color:#fff}.toptab[data-v-555d3e20]{height:%?60?%}.code-img[data-v-555d3e20]{float:right;margin-right:%?-20?%;height:%?90?%;width:%?180?%}.input-group[data-v-555d3e20]{margin-top:%?-2?%}.text-olive[data-v-555d3e20]{color:#1bb8b7}.primary[data-v-555d3e20]{-webkit-border-radius:%?8?%;border-radius:%?8?%;background:-webkit-gradient(linear,left top,right top,from(#0286f7),to(#1bb8b7));background:-webkit-linear-gradient(left,#0286f7,#1bb8b7);background:-o-linear-gradient(left,#0286f7,#1bb8b7);background:linear-gradient(90deg,#0286f7,#1bb8b7)}.login-btn[data-v-555d3e20]{margin-top:%?50?%;margin-bottom:%?10?%;width:98%;margin-left:1%}.head[data-v-555d3e20]{height:%?230?%;background-color:#f1f1f1}.head-img[data-v-555d3e20]{padding:10%;margin:0 auto}.l-input[data-v-555d3e20]{margin-bottom:%?2?%;width:98%;margin-left:1%}.action-row[data-v-555d3e20]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.action-row uni-navigator[data-v-555d3e20]{color:#007aff;padding:0 %?20?%}.oauth-row[data-v-555d3e20]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;position:absolute;top:0;left:0;width:100%}.oauth-image[data-v-555d3e20]{width:%?100?%;height:%?100?%;border:%?1?% solid #ddd;-webkit-border-radius:%?100?%;border-radius:%?100?%;margin:0 %?40?%;background-color:#fff}.oauth-image uni-image[data-v-555d3e20]{width:%?60?%;height:%?60?%;margin:%?20?%}",""])},d928:function(t,e,n){"use strict";n.r(e);var a=n("e289"),o=n.n(a);for(var c in a)"default"!==c&&function(t){n.d(e,t,function(){return a[t]})}(c);e["default"]=o.a},e289:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={props:{type:String,color:String,size:{type:[Number,String],default:24}},computed:{fontSize:function(){var t=Number(this.size);return t=isNaN(t)?24:t,"".concat(t,"px")}},methods:{onClick:function(){this.$emit("click")}}};e.default=a},e9a4:function(t,e,n){var a=n("0646");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=n("4f06").default;o("306fb785",a,!0,{sourceMap:!1,shadowMode:!1})},ead7:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"content"},[n("v-uni-view",{staticClass:"cu-bar title-bg",style:[{height:t.CustomBar+"px",display:t.ishead}]},[n("v-uni-view",{staticClass:"action",on:{click:function(e){e=t.$handleEvent(e),t.navTo()}}},[n("v-uni-text",{staticClass:"cuIcon-back text-white"}),t._v("游戏大厅")],1),n("v-uni-view",{staticClass:"content title-text"}),n("v-uni-view",{staticClass:"action"})],1),n("v-uni-image",{staticClass:"response",attrs:{src:"../../static/img/login-logo.jpg",mode:"widthFix"}}),n("v-uni-view",{staticClass:"input-group"},[n("v-uni-view",{staticClass:"cu-form-group l-input"},[n("v-uni-text",{staticClass:"cuIcon-my text-olive margin-right-sm"}),n("m-input",{staticClass:"m-input",attrs:{type:"number",clearable:"",placeholder:"请输入手机号或ID"},model:{value:t.account,callback:function(e){t.account=e},expression:"account"}})],1),n("v-uni-view",{staticClass:"cu-form-group l-input"},[n("v-uni-text",{staticClass:"cuIcon-lock text-olive margin-right-sm"}),n("m-input",{staticClass:"m-input",attrs:{type:"password",displayable:"",placeholder:"请输入登录密码"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),n("v-uni-view",{staticClass:"cu-form-group l-input"},[n("v-uni-text",{staticClass:"cuIcon-safe text-olive margin-right-sm"}),n("m-input",{staticClass:"m-input",attrs:{type:"text",clearable:"",placeholder:"输入验证码"},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}}),n("v-uni-image",{staticClass:"code-img",attrs:{src:t.code_url},on:{click:function(e){e=t.$handleEvent(e),t.changeImg()}}})],1)],1),n("v-uni-view",{staticClass:"btn-row login-btn"},[n("v-uni-button",{staticClass:"primary",attrs:{type:"primary"},on:{click:function(e){e=t.$handleEvent(e),t.bindLogin(e)}}},[t._v("登录")])],1),n("v-uni-view",{staticClass:"action-row"},[n("v-uni-navigator",{attrs:{"data-cur":"../login/reg"},on:{click:function(e){e=t.$handleEvent(e),t.PageChange(e)}}},[t._v("注册账号")]),n("v-uni-text",[t._v("|")]),n("v-uni-navigator",{attrs:{"data-cur":"../login/pwd"},on:{click:function(e){e=t.$handleEvent(e),t.PageChange(e)}}},[t._v("忘记密码")])],1)],1)},o=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return o})},effc:function(t,e,n){var a=n("c3c3");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=n("4f06").default;o("49b87f42",a,!0,{sourceMap:!1,shadowMode:!1})},f236:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a="USERS_KEY",o=function(){var t="";return t=uni.getStorageSync(a),t||(t="[]"),JSON.parse(t)},c=function(t){var e=o();e.push({id:t.id,agent_id:t.agent_id,agent_tel:t.agent_tel}),uni.setStorageSync(a,JSON.stringify(e))},i={getUsers:o,addUser:c};e.default=i},f901:function(t,e,n){"use strict";n.r(e);var a=n("719c"),o=n.n(a);for(var c in a)"default"!==c&&function(t){n.d(e,t,function(){return a[t]})}(c);e["default"]=o.a},fddb:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=new Array;a[0]="http://admin.xkegame.com",a[1]="http://testadmin.xkegame.com",a[2]="http://192.168.0.199:8081";var o=new Array;o[0]="http://h5.xkegame.com",o[1]="http://test.xkegame.com";var c=a[0],i=o[0],r={websiteUrl:c,webtoUrl:i};e.default=r}}]);