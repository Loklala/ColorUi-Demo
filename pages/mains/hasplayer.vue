<template>
	
	
	<view>
		<view class="cu-bar bg search bg-gradual-blue fixed">
			<view class="action" @tap="navTo()">
				<text class="cuIcon-back text-white"></text>
			</view>
			<view class=" title-text text-center text-xl">邀请列表</view>
			<view class="action">
			</view>
		</view>
		
		<view class="bg-white nav text-center fixed" :style="[{top:CustomBar+ 'px'}]">
			<view class="cu-item text-blue cu-text hander">
				<view class="person-text">已邀请：{{allnum}}人</view>
				<view class="person-text">本周新增：{{weeknum}}人</view>
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
					<button class="cu-btn bg-gradual-blue shadow-blur round" @click="loadlist()">查询</button>
				</view>
			</view>
		</view>
		
		<mescroll-uni top="280" bottom="50" @down="downCallback" @up="upCallback" @init="mescrollInit">
			<!-- 分页的数据列表 -->
		<view class="cu-list menu padding-xl radius shadow-warp bg-white margin-top" :class="[0?'sm-border':'',0?'card-menu margin-top':'']" v-for="(pd,k) in curPageData" :key="k">
			<view class="cu-item " :class="pd.isDisplay?'bg-c bg-grey':'bg-white'" @tap="changeSN(k)" >
					<text class="list-text1">ID:</text>
					<text class="list-text2">{{pd.userid}}</text>
					<text class="list-text1">昵称:</text>
					<text class="list-text5">{{pd.nickName}}</text>
				<text class='cuIcon-unfold text-blue icon-title' :class="pd.isDisplay?' hide':'show'"></text>
				<text class='cuIcon-fold text-blue icon-title' :class="pd.isDisplay?'show':'hide'"></text>
			</view>
			<view :class="pd.isDisplay?'cu-item show bg-c bg-grey':'hide bg-white'">
						<text class="list-text2">注册时间:</text>
						<text class="list-text3">{{pd.registerTime}}</text>
						<text class="list-text2">最后登陆:</text>
						<text class="list-text3">{{pd.last_modify_time}}</text>
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
			year = year;
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
					date1: getDate({
						format: true
					}),
					date2: getDate({
						format: true
					}),
					endDate:getDate('end'),
					agent_id:null,
					pageNum:1,
					pageSize:20,
					
					curPageData:[],
					totalPage:0,
					token:'',
					allnum:'0',
					weeknum:'0',
				}
		},
		onLoad() {
			const agentInfo = uni.getStorageSync('agentInfo');
			if (agentInfo) {
				this.token=agentInfo.token;
			}
			this.loadPersonNum();
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
			navTo() {
				uni.redirectTo({
					url: '../tabbar/tabbar'
				});
			},
			loadPersonNum(){
				console.log(this.agent_id);
				uni.request({
					url: 'http://192.168.0.199:8080/agent/tuiguang/ajax-player-num',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					dataType: 'json',
					cache: false,
					data: {
						token:this.token,
					},
					success: res => {
						let lists = res;
						let data = lists.data
						if (data.code == 200) {
							this.allnum=data.data.allnum;
							this.weeknum=data.data.weeknum;
						}
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '网络异常,请稍后重试'
						});
					},
					complete: () => {}
				});
			},
			loadlist(){
				uni.request({
					url: 'http://192.168.0.199:8080/agent/tuiguang/ajax-has-player',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					dataType: 'json',
					cache: false,
					data: {
						token:this.token,
						time1:this.date1+' 00:00:00',
						time2:this.date2+' 23:59:59',
						pagenum:this.pageNum,
						pageSize:this.pageSize,
					},
					success: res => {
						let lists = res;
						let data = lists.data
						if (data.code == 200) {
							// 接口返回的当前页数据列表 (数组)
							this.curPageData =data.data.list;
							// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
							this.totalPage = data.data.totalPage; 
							this.mescroll.endByPage(this.curPageData.length, this.totalPage);
							if(this.mescroll.num == 1) this.dataList = []; //如果是第一页需手动置空列表
							
							this.dataList = this.dataList.concat(this.curPageData); //追加新数据
							if(this.dataList.length>0){
								this.mescroll.endSuccess()
							}
							
						} else {
							// 接口返回的当前页数据列表 (数组)
							this.curPageData =data.data.list;
							// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
							this.totalPage = data.data.totalPage; 
							this.mescroll.endByPage(this.curPageData.length, this.totalPage);
							if(this.mescroll.num == 1) this.dataList = []; //如果是第一页需手动置空列表
							this.dataList = this.dataList.concat(this.curPageData); //追加新数据
						}
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '网络异常,请稍后重试'
						});
					},
					complete: () => {}
				});
			},
			DateChange1(e) {
				this.date1 = e.detail.value
			},
			DateChange2(e) {
				this.date2 = e.detail.value
			},
			changeSN(e){
				for (var i = 0; i < this.curPageData.length; ++i) {
					if (e === i) {
						this.curPageData[i].isDisplay = !this.curPageData[e].isDisplay;
					} else {
						this.curPageData[i].isDisplay = false;
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
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认20 */
			upCallback(mescroll) {
				
				// 此时mescroll会携带page的参数:
					this.pageNum = mescroll.num; // 页码, 默认从1开始
					this.pageSize = mescroll.size; // 页长, 默认每页10条
				uni.request({
					url: 'http://192.168.0.199:8080/agent/tuiguang/ajax-has-player',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					dataType: 'json',
					cache: false,
					data: {
						token:this.token,
						time1:this.date1+' 00:00:00',
						time2:this.date2+' 23:59:59',
						pagenum:this.pageNum,
						pageSize:this.pageSize,
					},
					success: res => {
						let lists = res;
						let data = lists.data
						if (data.code == 200) {
							// 接口返回的当前页数据列表 (数组)
							this.curPageData =data.data.list;
							// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
							this.totalPage = data.data.totalPage; 
							
							// // 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
							// let totalSize = data.data.totalSize; 
							// // 接口返回的是否有下一页 (true/false)
							// let hasNext = data.data.hasNext; 
							mescroll.endByPage(this.curPageData.length, this.totalPage);
							if(mescroll.num == 1) this.dataList = []; //如果是第一页需手动置空列表
							this.dataList = this.dataList.concat(this.curPageData); //追加新数据
						} else {
							// 接口返回的当前页数据列表 (数组)
							this.curPageData =data.data.list;
							// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
							this.totalPage = data.data.totalPage; 
							
							// // 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
							// let totalSize = data.data.totalSize; 
							// // 接口返回的是否有下一页 (true/false)
							// let hasNext = data.data.hasNext; 
							mescroll.endByPage(this.curPageData.length, this.totalPage);
							if(mescroll.num == 1) this.dataList = []; //如果是第一页需手动置空列表
							this.dataList = this.dataList.concat(this.curPageData); //追加新数据
						}
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '网络异常,请稍后重试'
						});
					},
					complete: () => {}
				});
					
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
