(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mains-childagent"],{2520:function(t,e,a){"use strict";var i=a("2d3a"),n=a.n(i);n.a},"2d3a":function(t,e,a){var i=a("534e");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("f2d0ee4a",i,!0,{sourceMap:!1,shadowMode:!1})},5137:function(t,e,a){"use strict";a.r(e);var i=a("f443"),n=a("f4c1");for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);a("2520");var l=a("2877"),o=Object(l["a"])(n["default"],i["a"],i["b"],!1,null,"3b254eb0",null);e["default"]=o.exports},"534e":function(t,e,a){e=t.exports=a("2350")(!1),e.push([t.i,".cu-text[data-v-3b254eb0]{width:100%}.idnet-text[data-v-3b254eb0]{margin-left:%?30?%;font-size:%?25?%}.time[data-v-3b254eb0]{width:100%;text-align:center;-webkit-border-radius:%?30?%;border-radius:%?30?%}.bg-c[data-v-3b254eb0]{color:#000}.show[data-v-3b254eb0]{display:block}.hide[data-v-3b254eb0]{display:none}.header[data-v-3b254eb0]{height:%?100?%;border-top:2px solid #eee}.hander1[data-v-3b254eb0]{border-top:2px solid #1ab7b9}.cu-list[data-v-3b254eb0]{padding:%?0?% %?0?%;margin-top:%?10?%}.person-text[data-v-3b254eb0]{color:#000;background:none;float:left;font-size:%?30?%;margin-top:%?5?%;text-align:center;width:50%}.list-text[data-v-3b254eb0]{text-align:left}.list-text1[data-v-3b254eb0]{text-align:left;width:10%}.list-text1_5[data-v-3b254eb0]{text-align:left;width:15%}.list-text2[data-v-3b254eb0]{text-align:left;width:20%}.list-text3[data-v-3b254eb0]{text-align:left;width:30%}.list-text4[data-v-3b254eb0]{text-align:left;width:40%}.list-text5[data-v-3b254eb0]{text-align:left;width:50%}.list-text6[data-v-3b254eb0]{text-align:left;width:60%}.list-text7[data-v-3b254eb0]{text-align:left;width:70%}.list-text8[data-v-3b254eb0]{text-align:left;width:80%}.list-text9[data-v-3b254eb0]{text-align:left;width:90%}",""])},6309:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=s(a("803e")),n=s(a("a080"));s(a("6de2"));function s(t){return t&&t.__esModule?t:{default:t}}function l(t){var e=new Date,a=(e.getFullYear(),e.getMonth(),e.getDate(),new Date(e));a.setDate(e.getDate()-t);var i=a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate();return i}function o(t){var e=new Date,a=e.getFullYear(),i=e.getMonth()+1,n=e.getDate();return"start"===t?a-=60:"end"===t?a=a:"1month"==t?i-=1:"3month"==t&&(i-=3),i=i>9?i:"0"+i,n=n>9?n:"0"+n,"".concat(a,"-").concat(i,"-").concat(n)}var c={components:{MescrollUni:n.default},data:function(){return{CustomBar:this.CustomBar,mescroll:null,date1:o({format:!0}),date2:o({format:!0}),endDate:o("end"),token:"",pageNum:1,pageSize:20,curPageData:[],totalPage:0,isDisable0:!1,isDisable1:!1,isDisable2:!1,isDisable3:!1,isDisable4:!1}},onLoad:function(){var t=uni.getStorageSync("agentInfo");t&&(this.token=t.token)},onReachBottom:function(){this.mescroll&&this.mescroll.onReachBottom()},onPageScroll:function(t){this.mescroll&&this.mescroll.onPageScroll(t)},methods:{navTo:function(){uni.redirectTo({url:"../tabbar/tabbar?page=mains"})},ontoday:function(){var t=this;this.isDisable0=!0,setTimeout(function(){t.isDisable0=!1},1e3);var e=o({format:!0}),a=o({format:!0});this.date1=a,this.date2=e,this.mescroll.triggerDownScroll()},onseven:function(){var t=this;this.isDisable1=!0,setTimeout(function(){t.isDisable1=!1},1e3);var e=o({format:!0}),a=l(7);this.date1=a,this.date2=e,this.mescroll.triggerDownScroll()},ononemonth:function(){var t=this;this.isDisable2=!0,setTimeout(function(){t.isDisable2=!1},1e3);var e=o({format:!0}),a=o("1month");this.date1=a,this.date2=e,this.mescroll.triggerDownScroll()},onthreemonth:function(){var t=this;this.isDisable3=!0,setTimeout(function(){t.isDisable3=!1},1e3);var e=o({format:!0}),a=o("3month");this.date1=a,this.date2=e,this.mescroll.triggerDownScroll()},loadlist:function(){var t=this;this.isDisable4=!0,setTimeout(function(){t.isDisable4=!1},1e3),this.date1>this.date2?uni.showToast({icon:"none",title:"开始时间应小于于结束时间"}):this.mescroll.triggerDownScroll()},DateChange1:function(t){this.date1=t.detail.value},DateChange2:function(t){this.date2=t.detail.value},changeSN:function(t){for(var e=0;e<this.curPageData.length;++e)this.curPageData[e].isDisplay=t===e&&!this.curPageData[t].isDisplay},mescrollInit:function(t){this.mescroll=t},downCallback:function(t){this.curPageData=[],t.resetUpScroll()},upCallback:function(t){var e=this;this.pageNum=t.num,this.pageSize=t.size,uni.request({url:i.default.websiteUrl+"/agent/earnings/ajax-child-agent",header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",dataType:"json",cache:!1,data:{token:this.token,time1:this.date1+" 00:00:00",time2:this.date2+" 23:59:59",pageNum:this.pageNum,pageSize:this.pageSize},success:function(t){var a=t,i=a.data;if(200==i.code){for(var n=i.data.list,s=0;s<n.length;s++){var l=n[s].status;l&&"1"==l?(l="正常",n[s].status=l):l&&"2"==l?(l="未通过",n[s].status=l):l&&"-1"==l&&(l="禁用",n[s].status=l)}e.totalPage=i.data.totalPage,e.mescroll.endByPage(n.length,e.totalPage),1==e.mescroll.num&&(e.dataList=[]),e.curPageData=e.curPageData.concat(n),e.curPageData.length>0&&e.mescroll.endSuccess()}else 400==i.code?(e.curPageData=i.data.list,e.totalPage=i.data.totalPage,e.mescroll.endByPage(e.curPageData.length,e.totalPage),1==e.mescroll.num&&(e.dataList=[]),e.dataList=e.dataList.concat(e.curPageData)):-200==i.code&&uni.showModal({showCancel:!1,content:"用户信息已失效，请重新登陆",success:function(t){t.confirm&&uni.redirectTo({url:"../login/login"})}})},fail:function(){uni.showToast({icon:"none",title:"网络异常,请稍后重试"})},complete:function(){}})}}};e.default=c},f443:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("v-uni-view",{staticClass:"cu-bar bg search bg-gradual-blue fixed"},[a("v-uni-view",{staticClass:"action",on:{click:function(e){e=t.$handleEvent(e),t.navTo()}}},[a("v-uni-text",{staticClass:"cuIcon-back text-white"})],1),a("v-uni-view",{staticClass:" title-text text-center text-xl"},[t._v("代理列表")]),a("v-uni-view",{staticClass:"action"})],1),a("v-uni-view",{staticClass:"bg-white nav text-center fixed",style:[{top:t.CustomBar+"px"}]},[a("v-uni-view",{staticClass:"cu-item text-blue cu-text hander "},[a("v-uni-view",{staticClass:"grid margin-bottom text-center col-4"},[a("v-uni-view",[a("v-uni-button",{staticClass:"cu-btn round",attrs:{disabled:t.isDisable0},on:{click:function(e){e=t.$handleEvent(e),t.ontoday()}}},[t._v("查询今天")])],1),a("v-uni-view",[a("v-uni-button",{staticClass:"cu-btn round",attrs:{disabled:t.isDisable1},on:{click:function(e){e=t.$handleEvent(e),t.onseven()}}},[t._v("最近7天")])],1),a("v-uni-view",[a("v-uni-button",{staticClass:"cu-btn round",attrs:{disabled:t.isDisable2},on:{click:function(e){e=t.$handleEvent(e),t.ononemonth()}}},[t._v("近1个月")])],1),a("v-uni-view",[a("v-uni-button",{staticClass:"cu-btn round",attrs:{disabled:t.isDisable3},on:{click:function(e){e=t.$handleEvent(e),t.onthreemonth()}}},[t._v("近3个月")])],1)],1)],1),a("v-uni-view",{staticClass:"cu-bar search bg-white hander1"},[a("v-uni-text",{staticClass:"idnet-text"},[t._v("收益日期：")]),a("v-uni-view",{staticClass:"search-form round bg-white"},[a("v-uni-picker",{staticClass:"time ",attrs:{mode:"date",value:t.date1,end:t.endDate},on:{change:function(e){e=t.$handleEvent(e),t.DateChange1(e)}}},[a("v-uni-view",{staticClass:"picker"},[t._v(t._s(t.date1))])],1)],1),t._v("—"),a("v-uni-view",{staticClass:"search-form round bg-white"},[a("v-uni-picker",{staticClass:"time ",attrs:{mode:"date",value:t.date2,end:t.endDate},on:{change:function(e){e=t.$handleEvent(e),t.DateChange2(e)}}},[a("v-uni-view",{staticClass:"picker"},[t._v(t._s(t.date2))])],1)],1),a("v-uni-view",{staticClass:"action"},[a("v-uni-button",{staticClass:"cu-btn bg-gradual-blue shadow-blur round",attrs:{disabled:t.isDisable4},on:{click:function(e){e=t.$handleEvent(e),t.loadlist()}}},[t._v("查询")])],1)],1)],1),a("mescroll-uni",{attrs:{top:"300",bottom:"50"},on:{down:function(e){e=t.$handleEvent(e),t.downCallback(e)},up:function(e){e=t.$handleEvent(e),t.upCallback(e)},init:function(e){e=t.$handleEvent(e),t.mescrollInit(e)}}},t._l(t.curPageData,function(e,i){return a("v-uni-view",{key:i,staticClass:"cu-list menu padding-xl radius shadow-warp bg-white ",class:["","card-menu "],staticStyle:{"border-radius":"4upx"}},[a("v-uni-view",{on:{click:function(e){e=t.$handleEvent(e),t.changeSN(i)}}},[a("v-uni-view",{staticClass:"cu-item",class:"bg-white"},[a("v-uni-view",{staticClass:"flex"},[a("v-uni-view",{staticClass:"flex-sub  padding-sm  radius"},[a("v-uni-text",{staticClass:"list-text3"},[t._v("日期:")]),a("v-uni-text",{staticClass:"list-text7"},[t._v(t._s(e.create_time))])],1),a("v-uni-view",{staticClass:"flex-sub  padding-sm  radius "},[a("v-uni-text",{staticClass:"list-text4"},[t._v("ID:")]),a("v-uni-text",{staticClass:"list-text3"},[t._v(t._s(e.agent_id))])],1)],1)],1),a("v-uni-view",{staticClass:"cu-item ",class:"bg-white"},[a("v-uni-view",{staticClass:"flex"},[a("v-uni-view",{staticClass:"flex-sub  padding-sm  radius"},[a("v-uni-text",{staticClass:"list-text3"},[t._v("姓名:")]),a("v-uni-text",{staticClass:"list-text3"},[t._v(t._s(e.nickname))])],1),a("v-uni-view",{staticClass:"flex-sub  padding-sm  radius "},[a("v-uni-text",{staticClass:"list-text3"},[t._v("状态:")]),a("v-uni-text",{staticClass:"list-text3"},[t._v(t._s(e.status))])],1)],1)],1)],1)],1)}),1)],1)},n=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})},f4c1:function(t,e,a){"use strict";a.r(e);var i=a("6309"),n=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);e["default"]=n.a}}]);