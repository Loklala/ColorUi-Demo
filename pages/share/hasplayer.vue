<template>
	
	
	<view>
		<!-- 已邀请的玩家标题 -->
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="backText"></block>
				<block slot="content">邀请列表</block>
				<block slot="right"></block>
		</cu-custom>
		<view class="bg-white nav text-center fixed" :style="[{top:CustomBar+ 'px'}]">
			<view class="cu-item text-blue cu-text hander">
				<view class="person-text">已邀请：2 人</view>
				<view class="person-text">本周新增：2 人</view>
			</view>
			<view class="cu-bar search bg-white hander1">
				<text class="idnet-text">注册日期：</text>
				<view class="search-form round bg-white">
					<picker class="time " mode="date" :value="date1"  :end="endDate" @change="DateChange1">
						<view class="picker">
							{{date1}}
						</view>
					</picker>
				</view>
				—
				<view class="search-form round bg-white">
				<picker class="time " mode="date" :value="date2" :end="endDate" @change="DateChange2">
					<view class="picker">
						{{date2}}
					</view>
				</picker>
				</view>
				
				<view class="action">
					<button class="cu-btn bg-gradual-blue shadow-blur round">查询</button>
				</view>
			</view>
			
			
		</view>
		
		<mescroll-uni top="204" bottom="50" @down="downCallback" @up="upCallback" @init="mescrollInit">
			<!-- 分页的数据列表 -->
		<view class="cu-list menu padding-xl radius shadow-warp bg-white margin-top" :class="[0?'sm-border':'',0?'card-menu margin-top':'']" v-for="(pd,k) in pdList" :key="k">
			<view class="cu-item " :class="pd.isDisplay?'bg-c bg-grey':'bg-white'" @tap="changeSN(k)" >
					<text class="list-text1">ID:</text>
					<text class="list-text2">{{pd.id}}</text>
					<text class="list-text1">昵称:</text>
					<text class="list-text5">{{pd.pdName}}</text>
				<text class='cuIcon-unfold text-blue icon-title' :class="pd.isDisplay?' hide':'show'"></text>
				<text class='cuIcon-fold text-blue icon-title' :class="pd.isDisplay?'show':'hide'"></text>
			</view>
			<view :class="pd.isDisplay?'cu-item show bg-c bg-grey':'hide bg-white'">
						<text class="list-text2">注册时间:</text>
						<text class="list-text3">{{endDate}}</text>
						<text class="list-text2">最后登陆:</text>
						<text class="list-text3">{{endDate}}</text>
			</view>
		</view>
		</mescroll-uni>
	</view>
</template>

<script>
	// 自定义的mescroll-meituan.vue
	import MescrollUni from "mescroll-uni/mescroll-uni.vue";
	// 模拟数据
	import mockData from "../../common/pdlist.js";
	
	function getDate(type) {
		const date = new Date();
	
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
	
		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
	
		return `${year}-${month}-${day}`;
	}
	export default {
		components: {
			MescrollUni
		},
		data() {
			return {
					CustomBar: this.CustomBar,
					mescroll: null, //mescroll实例对象
					pdList: [], // 数据列表
					date1: getDate({
						format: true
					}),
					date2: getDate({
						format: true
					}),
					endDate:getDate('end'),
				}
		},
		//注册滚动到底部的事件,用于上拉加载
		onReachBottom() {
			this.mescroll && this.mescroll.onReachBottom();
		},
		//注册列表滚动事件,用于下拉刷新
		onPageScroll(e) {
			this.mescroll && this.mescroll.onPageScroll(e);
		},
		methods: {
			DateChange1(e) {
				this.date1 = e.detail.value
			},
			DateChange2(e) {
				this.date2 = e.detail.value
			},
			changeSN(e){
				for (var i = 0; i < this.pdList.length; ++i) {
					if (e === i) {
						this.pdList[i].isDisplay = !this.pdList[e].isDisplay;
					} else {
						this.pdList[i].isDisplay = false;
					}
				}
			},
			// mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			// 下拉刷新的回调
			downCallback(mescroll){
				mescroll.resetUpScroll() // 重置列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				
				
				
				
				
				
				// 此时mescroll会携带page的参数:
					let pageNum = mescroll.num; // 页码, 默认从1开始
					let pageSize = mescroll.size; // 页长, 默认每页10条
					uni.request({
						url: 'xxxx?pageNum='+pageNum+'&pageSize='+pageSize,
						success: (data) => {
							// 接口返回的当前页数据列表 (数组)
							let curPageData = data.xxx; 
							// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
							let totalPage = data.xxx; 
							// 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
							let totalSize = data.xxx; 
							// 接口返回的是否有下一页 (true/false)
							let hasNext = data.xxx; 
							
							// 成功隐藏下拉加载状态
							//方法一(推荐): 后台接口有返回列表的总页数 totalPage
							// mescroll.endByPage(curPageData.length, totalPage); 1
							
							//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
							//mescroll.endBySize(curPageData.length, totalSize); 
							
							//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
							//mescroll.endSuccess(curPageData.length, hasNext); 
							
							//设置列表数据
							if(mescroll.num == 1) this.dataList = []; //如果是第一页需手动置空列表
							this.dataList = this.dataList.concat(curPageData); //追加新数据
						},
						fail: () => {
							// 失败隐藏下拉加载状态
							mescroll.endErr()
						}
					})
				
				
				
				
				
				
				//联网加载数据
				mescroll.size=20;
				this.getListDataFromNet(mescroll.num, mescroll.size, (curPageData)=>{
					//curPageData=[]; //打开本行注释,可演示列表无任何数据empty的配置
					
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					//mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
					console.log("第" + mescroll.num +"页"+ ", 每页" + mescroll.size +"条"+ ", 当前页数据条数=" + curPageData.length);

					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					//mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)

					//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
					//mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)

					//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
					//mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)

					//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,
					//则需翻到第三页才会知道无更多数据,如果传了hasNext,则翻到第二页即可显示无更多数据.
					mescroll.endSuccess(curPageData.length);

					//设置列表数据
					if(mescroll.num == 1) this.pdList = []; //如果是第一页需手动制空列表
					this.pdList=this.pdList.concat(curPageData); //追加新数据
				}, () => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				})
			},
			/*联网加载列表数据
			在您的实际项目中,请参考官方写法: http://www.mescroll.com/uni.html#tagUpCallback
			请忽略getListDataFromNet的逻辑,这里仅仅是在本地模拟分页数据,本地演示用
			实际项目以您服务器接口返回的数据为准,无需本地处理分页.
			* */
			getListDataFromNet(pageNum,pageSize,successCallback,errorCallback) {
				//延时一秒,模拟联网
				setTimeout(()=> {
					try{
						//模拟分页数据
						var listData=[];
						for (var i = (pageNum-1)*pageSize; i < pageNum*pageSize; i++) {
							if(i==mockData.length) break;
							listData.push(mockData[i]);
						}
						//联网成功的回调
						successCallback && successCallback(listData);
					} catch (e) {
						//联网失败的回调
						errorCallback && errorCallback();
					}
				},1000)
			}
		}
	}
</script>

<style>
	.cu-text{
		width: 100%;
	}
	.idnet-text{
		margin-left: 30upx;
		font-size: 25upx;
	}
	.time{
		width: 100%;
		text-align: center;
		border-radius:30upx ;
	}
	.bg-c{
		color: #000;
	}
	.show{
		display: block;
	}
	.hide{
		display: none;
	}
	.header{
		height: 100upx;
		border-top: 2px solid #eeeeee;
	}
	.hander1{
		border-top: 2px solid #1AB7B9;
	}
	.cu-list{
		padding: 0upx 0upx;
		margin-top:10upx;
	}
	.person-text{
		color: #000;
		background:none;
		float: left;
		font-size: 30upx;
		margin-top: 5upx;
		text-align: center;
		width: 50%;
	}
	.list-text{
		text-align: left;
	}
	.list-text1{
		text-align: left;
		width:10%;
	}
	.list-text1_5{
		text-align: left;
		width: 15%;
	}
	.list-text2{
		text-align: left;
		width: 20%;
	}
	.list-text3{
		text-align: left;
		width: 30%;
	}
	.list-text4{
		text-align: left;
		width: 40%;
	}
	.list-text5{
		text-align: left;
		width: 50%;
	}
	.list-text6{
		text-align: left;
		width: 60%;
	}
	.list-text7{
		text-align: left;
		width:70%;
	}
	.list-text8{
		text-align: left;
		width:80%;
	}
	.list-text9{
		text-align: left;
		width:90%;
	}
</style>
