<template name="components">
	<view class="">

		<scroll-view scroll-y class="page">
			<view class="cu-bar bg-gradual-blue search">
				<!-- <view class="cu-avatar round"></view> -->
				<view class="content">
					首页
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
			<view style="background-image: url('../../static/img/login-logo.jpg');height: 350upx;background-size: 100%;"></view>
			
			<!-- card-menu -->
			<view class="cu-list menu   margin-bottom-sm shadow-lg">
				<view class="cu-item arrow">
					<view class="content" data-cur="../mains/shareway" @click="PageChange">
						<text class="cuIcon-share text-grey"></text>
						<text class="text-grey">分享中心</text>
					</view>
				</view>
				<view class="cu-item arrow " data-cur="../mains/hasplayer"  @click="PageChange">
					<view class="content">
						<text class="cuIcon-group_fill text-grey"></text>
						<text class="text-grey">邀请列表</text>
					</view>
				</view>
				<view class="cu-item arrow " data-cur=""  @click="PageChange">
					<view class="content">
						<text class="cuIcon-crown text-grey"></text>
						<text class="text-grey">俱乐部中心</text>
					</view>
				</view>
				<view class="cu-item arrow " data-cur=""  @click="PageChange">
					<view class="content">
						<text class="cuIcon-crownfill text-grey"></text>
						<text class="text-grey">我的俱乐部</text>
					</view>
				</view>
				<view class="cu-item arrow " data-cur=""  @click="PageChange">
					<view class="content">
						<text class="cuIcon-noticefill text-grey"></text>
						<text class="text-grey">公告</text>
					</view>
				</view>
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
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				src:'',
				title:"滚动公告",
				msg : [
					'皮蛋游戏大厅推广系统正式上线啦！',
					'代理通过多种方式邀请玩家均会获得收益',
					'邀请好友！绑定代理账户就可以获得收益！',
					'随时随地查看当前收益金额，随时随地提现到账',
					'收益到达一定额度，即可提交提现申请'
				],
				elements: [{
						title: '推广方式',
						name: '推广',
						color: 'pink',
						icon: 'share'
					},
					{
						title: '已邀请玩家',
						name: '玩家',
						color: 'mauve',
						icon: 'friendfill'
					},
					
				],
				
				
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
				dotStyle: true,
				towerStart: 0,
				direction: ''
			};
		},
		created:function(){//beforeCreate
			const value = uni.getStorageSync('agentInfo');
			if (value) {
				this.src="../../static/logo.png";
			}else{
				this.src="";
			}
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
			
		},
	}
</script>

<style>
	.imgs{
		height: 350upx;
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
		background: linear-gradient(to right,#3396a6,#33966a);
	}
	.bg-1{
		background-color:#33966a;
	}
	.bg1{
		background: linear-gradient(to bottom,#33966a,#ffffff);
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
