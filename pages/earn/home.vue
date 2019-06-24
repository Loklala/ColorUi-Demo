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
			<view class="cu-list menu uni-badge-warning bg-black" :class="[0?'sm-border':'',0?'card-menu margin-top':'']" >
				<view class="icon-text bg-black">
					<text class="cuIcon-notification text-white text-xl "></text>
				</view>
				<view class="solle-text bg-gray bg-black">
					<swiper autoplay="true" circular="true" interval="3000">
						<swiper-item v-for="(item, index) in msg" :key="index">
							<navigator class="text-white">{{item}}</navigator>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="cu-list menu solid-top " :class="[1?'sm-border':'',0?'margin-top':'']" style="margin-top: 0upx;">
				<view class="cu-list grid bg-cyan" :class="['col-' + 2,gridBorder?'':'no-border']">
					<view class="cu-item ">
						<view class="money-title text-black">房卡总收益&yen;</view><view class="money-css text-black text-xxl">{{fkmoney}}</view>
					</view>
					<view class="cu-item">
						<view class="money-title text-black">充值总收益&yen;</view><view class="money-css text-black text-xxl">{{czmoney}}</view>
					</view>
					<view class="cu-item ">
						<view class="money-title text-black">今日房卡收益&yen;</view><view class="money-css text-black text-xxl">{{today_fkmoney}}</view>
					</view>
					<view class="cu-item">
						<view class="money-title text-black">今日充值收益&yen;</view><view class="money-css text-black text-xxl">{{today_czmoney}}</view>
					</view>
					
				</view>
			</view>	
			<view class="bg-gray">
				<view class="cu-list menu" :class="[menuBorder?'sm-border':'',0?'card-menu margin-top':'']" >
				<view class="cu-list menu   margin-bottom-sm shadow-lg">
					<view class="cu-item arrow">
						<view class="content" data-cur="../earn/roomearn" @click="PageChange">
							<text class="cuIcon-news text-grey"></text>
							<text class="text-grey">房卡收益记录</text>
						</view>
					</view>
					<view class="cu-item arrow " data-cur="../earn/rechearn"  @click="PageChange">
						<view class="content">
							<text class="cuIcon-moneybag text-grey"></text>
							<text class="text-grey">充值收益记录</text>
						</view>
					</view>
					<!-- <view class="cu-item arrow " data-cur="../earn/clubearn"  @click="PageChange">
						<view class="content">
							<text class="cuIcon-moneybagfill text-grey"></text>
							<text class="text-grey">俱乐部收益记录</text>
						</view>
					</view> -->
					<view class="cu-item arrow  " data-cur="../earn/depositresult"  @click="PageChange">
						<view class="content">
							<text class="cuIcon-sponsor text-grey"></text>
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
		import helper from '../../common/helper.js';  
	export default {
		name: "components",
		data() {
			return {
				fkmoney:'0.00',
				czmoney:'0.00',
				jlbmoney:'0.00',
				
				today_fkmoney:'0.00',
				today_czmoney:'0.00',
				
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
				msg : [
					'代理通过多种方式邀请玩家均会获得收益',
					'邀请好友！绑定代理账户就可以获得收益！',
					'随时随地查看当前收益金额，随时随地提现到账',
					'收益到达一定额度，即可提交提现申请'
				],
			};
		},
		//加载金额
		created:function(){
			if(uni.getStorageSync('agentInfo')){
					const agentInfo=JSON.parse(this.utils.decrypt(uni.getStorageSync('agentInfo'),'abcdefgabcdefg12'));
					if (agentInfo) {
						this.token = agentInfo.token;
					}
			}
			uni.request({
					url: helper.websiteUrl+'/agent/earnings/ajax-earn',
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
							this.czmoney=data.data.zcmoney;
							this.jlbmoney=data.data.jlbmoney;
							this.today_fkmoney=data.data.today_fkmoney;
							this.today_zcmoney=data.data.today_zcmoney;
						}else{
							this.fkmoney=0.00;
							this.czmoney=0.00;
							this.jlbmoney=0.00;
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
		height: 80upx;
		margin-top: 50upx;
		color: red;
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
