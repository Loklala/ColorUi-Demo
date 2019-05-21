<template>
	
	
	<view>
		<view class="cu-bar bg search bg-gradual-blue fixed">
			<view class="action" @tap="navTo()">
				<text class="cuIcon-back text-white"></text>
				返回
			</view>
			<view class="content title-text">俱乐部收益</view>
			<view class="action">
			</view>
		</view>
		<view class="bg-white nav text-center fixed" :style="[{top:CustomBar+ 'px'}]">
			<view class="cu-item text-blue cu-text hander ">
				<view class="grid margin-bottom text-center col-4">
					<view><button class="cu-btn round" @click="ontoday()">查询今天</button></view>
					<view><button class="cu-btn round" @click="onseven()">最近7天</button></view>
					<view><button class="cu-btn round" @click="ononemonth()">近1个月</button></view>
					<view><button class="cu-btn round" @click="onthreemonth()">近3个月</button></view>
				</view>
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
		<view class="cu-list menu padding-xl radius shadow-warp bg-white " :class="[0?'sm-border':'',1?'card-menu ':'']" v-for="(pd,k) in curPageData" :key="k">
			<view class=""  @tap="changeSN(k)">
				<view class="cu-item" :class="pd.isDisplay?'bg-c bg-grey':'bg-white'">
					<view class="flex">
						<view class="flex-sub  padding-sm  radius">
							<text class="list-text3">日期:</text>
							<text class="list-text7">{{pd.create_time}}</text>
						</view>
						<view class="flex-sub  padding-sm  radius ">
							<text class="list-text4">房间id:</text>
							<text class="list-text3">{{pd.room_id}}</text>
						</view>
						<view class="  padding-sm  radius"></view>
					</view>
				</view>
				<view class="cu-item " :class="pd.isDisplay?'bg-c bg-gray':'bg-white'" >
					<view class="flex">
						<view class="flex-sub  padding-sm  radius">
							<text class="list-text3">收益:</text>
							<text class="list-text3">{{pd.profit_money}}</text>
						</view>
						<view class="flex-sub  padding-sm  radius ">
							<text class="list-text3">游戏:</text>
							<text class="list-text3">{{pd.gametype}}</text>
						</view>
						<view class="  padding-sm  radius">
							<text class='cuIcon-unfold text-blue icon-title' :class="pd.isDisplay?' hide':'show'"></text>
							<text class='cuIcon-fold text-blue icon-title' :class="pd.isDisplay?'show':'hide'"></text>
						</view>
					</view>
				</view>
			</view>
			
			<view :class="pd.isDisplay?'show bg-c bg-gray solids-top':'hide bg-white'">
				<view class="flex">
					<view class="flex-sub  padding-sm  radius">
						<text class="list-text3">支付类型:</text>
						<text class="list-text3">{{pd.pay_mode}}</text>
					</view>
					<view class="flex-sub  padding-sm  radius ">
						<text class="list-text3">房费类型:</text>
						<text class="list-text3">{{pd.room_money_mode}}</text>
					</view>
					<view class="  padding-sm  radius"></view>
				</view>
				<view class="flex">
					<view class="flex-sub  padding-sm  radius">
						<text class="list-text3">消耗数量:</text>
						<text class="list-text3">{{pd.room_fee}}</text>
					</view>
					<view class="flex-sub  padding-sm  radius ">
						<text class="list-text3">提成比例:</text>
						<text class="list-text3">{{pd.profit_fee_ratio *100}}%</text>
					</view>
					<view class="  padding-sm  radius"></view>
				</view>
				<view class="flex">
					<view class="flex-sub  padding-sm  radius">
						<text class="list-text2">玩家:</text>
						<text class="list-text3">{{pd.players}}</text>
					</view>
				</view>
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
		} else if(type=='7day'){
			day=day-7;
		} else if(type=='1month'){
			month=month-1;
		} else if(type=='3month'){
			month=month-3;
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

				}
		},
		onLoad() {
			const agentInfo = uni.getStorageSync('agentInfo');
			if (agentInfo) {
				this.token=agentInfo.token;
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
			navTo() {
				uni.redirectTo({
					url: '../tabbar/tabbar?page=earn'
				});
			},
			ontoday(){
				let time2=getDate({format: true})
				let time1=getDate({format: true})
				this.date1 =time1;
				this.date2 =time2;
				this.loadlist();				
			},
			onseven(){
				let time2=getDate({format: true})
				let time1=getDate('7day');
				this.date1 =time1;
				this.date2 =time2;
				this.loadlist();
			},
			ononemonth(){
				let time2=getDate({format: true})
				let time1=getDate('1month');
				this.date1 =time1;
				this.date2 =time2;
				this.loadlist();
			},
			onthreemonth(){
				let time2=getDate({format: true})
				let time1=getDate('3month');
				this.date1 =time1;
				this.date2 =time2;
				this.loadlist();
			},
			loadlist(){
				uni.request({
				url:this.COMMON.httpUrl+'/agent/earnings/ajax-rult-earns',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					dataType: 'json',
					cache: false,
					data: {
						token:this.token,
						earnType:3,
						time1:this.date1+' 00:00:00',
						time2:this.date2+' 23:59:59',
						pageNum:this.pageNum,
						pageSize:this.pageSize,
					},
					success: res => {
						let lists = res;
						let data = lists.data
						if (data.code == 200) {
							// 接口返回的当前页数据列表 (数组)
							this.curPageData =data.data.list;
							for (let i=0;i < this.curPageData.length;i++) {
								let playerList=this.curPageData[i].players;
								if(playerList && playerList != ""){
									playerList = JSON.parse(playerList);
									let players = "";
									for(let j = 0; j < playerList.length; j++){
										players += playerList[j].nickName + "	 /     ";
									}
									this.curPageData[i].players= players;
								}
							}
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
				url: this.COMMON.httpUrl+'/agent/earnings/ajax-result-earns',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					dataType: 'json',
					cache: false,
					data: {
						token:this.token,
						earnType:3,
						time1:this.date1+' 00:00:00',
						time2:this.date2+' 23:59:59',
						pageNum:this.pageNum,
						pageSize:this.pageSize,
					},
					success: res => {
						let lists = res;
						let data = lists.data
						if (data.code == 200) {
							// 接口返回的当前页数据列表 (数组)
							this.curPageData =data.data.list;
							for (let i=0;i < this.curPageData.length;i++) {
								let playerList=this.curPageData[i].players;
								if(playerList && playerList != ""){
									playerList = JSON.parse(playerList);
									let players = "";
									for(let j = 0; j < playerList.length; j++){
										players += playerList[j].nickName + "	 /     ";
									}
									this.curPageData[i].players= players;
								}
							}
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
							this.totalPage =data. data.totalPage; 
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