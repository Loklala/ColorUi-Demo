<template name="components">
	<view class="bg-white">
		<scroll-view scroll-y class="page">
			<image src="../../static/img/login-logo.jpg" mode="widthFix" class="response" ></image>
			<view class="bg-gray">
				<view class="cu-list menu uni-badge-warning top bg-white" :class="[0?'sm-border':'',0?'card-menu ':'']">
					<view class="nav-list top" style="margin-top: 50upx;">
						<navigator hover-class="none" :url="'../share/shareway'" class="nav-li" redirectTo :class="'bg-olive'"
						:style="[{animation: 'show ' + ((0+1)*0.2+0.1) + 's 1'}]" >
							<view class="nav-title">推广中心</view>
							<view class="nav-name">_</view>
							<text :class="'cuIcon-share'"></text>
						</navigator>
						<navigator hover-class="none" :url="'../share/hasplayer'" class="nav-li" redirectTo :class="'bg-cyan'"
						:style="[{animation: 'show ' + (0.4) + 's 1'}]" >
							<view class="nav-title">已邀请玩家</view>
							<view class="nav-name">_</view>
							<text :class="'cuIcon-addressbook'"></text>
						</navigator>
						<navigator hover-class="none" :url="''" class="nav-li" redirectTo :class="'bg-green'"
						:style="[{animation: 'show ' + (0.4) + 's 1'}]" >
							<view class="nav-title">俱乐部</view>
							<view class="nav-name">_</view>
							<text :class="'cuIcon-addressbook'"></text>
						</navigator>
						<navigator hover-class="none" :url="''" class="nav-li" redirectTo :class="'bg-brown'"
						:style="[{animation: 'show ' + (0.4) + 's 1'}]" >
							<view class="nav-title">我的俱乐部</view>
							<view class="nav-name">_</view>
							<text :class="'cuIcon-addressbook'"></text>
						</navigator>
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
