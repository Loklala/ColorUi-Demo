<template name="components">
	<view>
		<scroll-view scroll-y class="page">
			<view class="cu-bar bg-gradual-blue search" :style="[{height:CustomBar + 'px'}]">
				<view class="action"></view>
				<view class="content">
					收益
				</view>
				<view class="action">
				</view>
			</view>
			
			<view class="cu-list menu solid-top " :class="[1?'sm-border':'',0?'margin-top':'']" >
				<view class="cu-list grid bg-cyan" :class="['col-' + 3,gridBorder?'':'no-border']">
					<view class="cu-item ">
						<view class="money-title text-black">房卡总收益&yen;</view><view class="money-css text-black text-xxl">{{fkmoney}}</view>
					</view>
					<view class="cu-item">
						<view class="money-title text-black">充值总收益&yen;</view><view class="money-css text-black text-xxl">{{czmoney}}</view>
					</view>
					<view class="cu-item">
						<view class="money-title text-black">俱乐部总收益&yen;</view><view class="money-css text-black text-xxl">{{jlbmoney}}</view>
					</view>
				</view>
			</view>	
			<view class="bg-gray">
				<view class="cu-list menu" :class="[menuBorder?'sm-border':'',0?'card-menu margin-top':'']" >
				<view class="cu-list menu   margin-bottom-sm shadow-lg">
					<view class="cu-item arrow">
						<view class="content" data-cur="../earn/roomearn" @click="PageChange">
							<text class="cuIcon-card text-grey"></text>
							<text class="text-grey">房卡收益记录</text>
						</view>
					</view>
					<view class="cu-item arrow " data-cur="../earn/rechearn"  @click="PageChange">
						<view class="content">
							<text class="cuIcon-rechargefill text-grey"></text>
							<text class="text-grey">充值收益记录</text>
						</view>
					</view>
					<view class="cu-item arrow " data-cur="../earn/clubearn"  @click="PageChange">
						<view class="content">
							<text class="cuIcon-moneybagfill text-grey"></text>
							<text class="text-grey">俱乐部收益记录</text>
						</view>
					</view>
					<view class="cu-item arrow  " data-cur="../earn/depositresult"  @click="PageChange">
						<view class="content">
							<text class="cuIcon-sponsorfill text-grey"></text>
							<text class="text-grey">提现记录</text>
						</view>
					</view>
				</view>
				</view>
				<button class="cu-btn bg-white margin-tb-sm lg deposit" @click="PageChange" data-cur="../earn/burse">提现</button>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "components",
		data() {
			return {
				fkmoney:'0.00',
				czmoney:'0.00',
				jlbmoney:'0.00',
				
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				src:'',
				
				modalName: null,
				gridCol: 3,
				gridBorder: true,
				
				menuBorder: true,
				menuArrow: true,
				menuCard: true,
				
				cardCur: 0,
				dotStyle: true,
				towerStart: 0,
				direction: '',
				token:'',
			};
		},
		//加载金额
		created:function(){
			const agentInfo = uni.getStorageSync('agentInfo');
			if (agentInfo) {
				this.token=agentInfo.token;
			}
			uni.request({
				url: 'http://192.168.0.199:8080/agent/earnings/ajax-earn',
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
						let data=res.data;
						if(data.code==200){
							this.fkmoney=data.data.fkmoney;
							this.zcmoney=data.data.zcmoney;
							this.jlbmoney=data.data.jlbmoney;
						}
					},
					fail: () => {},
					complete: () => {}
				});

		},
		methods: {
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},	
			//页面跳转
			PageChange: function(e) {
				if(e.currentTarget.dataset.cur==""){
					uni.showToast({
						icon: 'none',
						title: '暂未开放'
					},1000);
				}else{
					uni.redirectTo({
						url:e.currentTarget.dataset.cur
					});
				}
			},
		}
	}
</script>

<style>
	.deposit{
		margin-left:5%;
		width: 90%;
		margin-top: 50upx;
		color: #3396e6;
	}
	.depositres{
		margin-left:5%;
		width: 90%;
		
		color: #3396e6;
	}
	.money-css{
		min-height: 50upx;
	}
	.lables{
		font-size: 30upx;
	}
	.list-btn{
		width: 50%;float: left;border-right: 1px solid #dddddd;text-align: center;
	}
	.list-btn1{
		width: 50%;float: left;text-align: center;border-left: 1px solid #dddddd;
	}
	.top{
		margin-top: 5upx;
	}
	.title-text{
		color: #fff;
	}
	.bg{
		background: linear-gradient(to right,#0388f5,#1bb9b7);
	}
	.bg-1{
		background-color:#33966a;
	}
	.bg1{
		background: linear-gradient(to bottom,#0388f5,#ffffff);
	}
	.icon-xl{
		font-size: 50upx;
	}
	.icon-text{
		width: 10%;float: left;text-align: right;line-height: 60upx;
	}
	.solle-text{
		height: 50upx;width: 90%;float: left;text-align: center;line-height: 60upx;
	}
	.tip-text{
		width: 100%;
		text-indent: 45upx;
	}
	.page {
		height: 100vh;
	}
	.Title-text{
		font-size: 23upx;
	}
	.cardTitle {
		color: #fff;
		padding: 90upx 60upx;
		font-size: 40upx;
		font-weight: 300;
		position: relative;
		text-shadow: 0px 0px 6upx rgba(0, 0, 0, 1)
	}

</style>
