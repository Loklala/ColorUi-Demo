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
			<view style="background-image: url('../../static/img/login-logo.jpg');height: 350upx;background-size: 100%;"></view>
			
			<!-- card-menu -->
			<view class="cu-list menu  margin-top-xs margin-bottom-sm shadow-lg">
				<view class="cu-item arrow">
					<view class="content" data-cur="../share/shareway" @click="PageChange">
						<text class="cuIcon-share text-grey"></text>
						<text class="text-grey">分享中心</text>
					</view>
				</view>
				<view class="cu-item arrow margin-top-xs" data-cur="../share/hasplayer"  @click="PageChange">
					<view class="content">
						<text class="cuIcon-group_fill text-grey"></text>
						<text class="text-grey">邀请列表</text>
					</view>
				</view>
				<view class="cu-item arrow margin-top-xs" data-cur=""  @click="PageChange">
					<view class="content">
						<text class="cuIcon-crown text-grey"></text>
						<text class="text-grey">俱乐部中心</text>
					</view>
				</view>
				<view class="cu-item arrow margin-top-xs" data-cur=""  @click="PageChange">
					<view class="content">
						<text class="cuIcon-crownfill text-grey"></text>
						<text class="text-grey">我的俱乐部</text>
					</view>
				</view>
				<view class="cu-item arrow margin-top-xs" data-cur=""  @click="PageChange">
					<view class="content">
						<text class="cuIcon-noticefill text-grey"></text>
						<text class="text-grey">公告</text>
					</view>
				</view>
			</view>
				<!-- <view class="cu-list grid margin-top-xs" :class="['col-' + 4,0?'':'no-border']" style="padding: 0upx;">
					<view class="cu-item ">
						<view class="money-title" data-cur="../share/shareway" @click="PageChange">
							<text class="cuIcon-share text-green"></text>
						</view>
						<view class="money-css text-green">分享中心</view>
					</view>
					<view class="cu-item " data-cur="../share/hasplayer"  @click="PageChange">
						<view class="money-title ">
							<text class="cuIcon-group_fill"></text>
						</view>
						<view class="money-css text-green">邀请列表</view>
					</view>
					<view class="cu-item " data-cur=""  @click="PageChange">
						<view class="money-title ">
							<text class="cuIcon-crown"></text>
						</view>
						<view class="money-css text-green">俱乐部</view>
					</view>
					<view class="cu-item " data-cur=""  @click="PageChange">
						<view class="money-title">
							<text class="cuIcon-addressbook"></text>
						</view>
						<view class="money-css text-green">我的俱乐部</view>
					</view>
				</view> -->
				<view class="cu-bar bg-white  margin-top-sm ">
					<view class="action">
						<text class="cuIcon-title text-green"></text>
						<text>公告(测试)</text>
					</view>
				</view>
			<view class="bg-gray">
				<view class="cu-list menu uni-badge-warning top bg-white " :class="[0?'sm-border':'',0?'card-menu ':'']">
					<view class="nav-list ">
						<view class="cu-timeline ">
							<view class="cu-time">06-17</view>
							<view class="cu-item">
								<view class="content">
									<view class="cu-capsule radius">
										<view class="cu-tag bg-cyan">上午</view>
										<view class="cu-tag line-cyan">10:00</view>
									</view>
									<view class="margin-top">皮蛋游戏推广后台上线，代理可通过推广获得相应收益</view>
								</view>
							</view>
						</view>
					</view>
					<view class="nav-list ">
						<view class="cu-timeline ">
							<view class="cu-time">06-17</view>
							<view class="cu-item">
								<view class="content">
									<view class="cu-capsule radius">
										<view class="cu-tag bg-cyan">上午</view>
										<view class="cu-tag line-cyan">10:00</view>
									</view>
									<view class="margin-top">皮蛋游戏推广后台上线，代理可通过推广获得相应收益</view>
								</view>
							</view>
						</view>
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
