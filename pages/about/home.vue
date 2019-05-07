<template name="about">
	<scroll-view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''">
		
			<view class="padding img">
				<view class="cu-avatar xl round margin-left head" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
				<view class="content flex-sub">
					<text class="flex">昵称:{{name}}</text>
					<text class="flex"> ID:{{id}}</text>
				</view>
			</view>

		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<button class="cu-btn content" open-type="contact">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">个人信息</text>
				</button>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<button class="cu-btn content" open-type="contact">
					<image src="/static/logo.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">图片 + 标题</text>
				</button>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<button class="cu-btn content" open-type="contact">
					<text class="cuIcon-btn text-olive"></text>
					<text class="text-grey">Open-type 按钮</text>
				</button>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<button class="cu-btn content" open-type="contact">
					<text class="cuIcon-discoverfill text-orange"></text>
					<text class="text-grey">Navigator 跳转</text>
				</button>
			</view>
		</view>
			<button class="cu-btn bg-red margin-tb-sm lg logout" @click="NavToPage">退出</button>
	</scroll-view>
	
</template>

<script>
	export default {
		data() {
			return {
				name:'凯尔',
				id:'112236',
				// iconList: [
				// {
				// 	icon: 'cardboardfill',
				// 	color: 'red',
				// 	badge: 120,
				// 	name: 'VR'
				// }, {
				// 	icon: 'recordfill',
				// 	color: 'orange',
				// 	badge: 1,
				// 	name: '录像'
				// }, {
				// 	icon: 'picfill',
				// 	color: 'yellow',
				// 	badge: 0,
				// 	name: '图像'
				// }, {
				// 	icon: 'noticefill',
				// 	color: 'olive',
				// 	badge: 22,
				// 	name: '通知'
				// }, {
				// 	icon: 'upstagefill',
				// 	color: 'cyan',
				// 	badge: 0,
				// 	name: '排行榜'
				// }, {
				// 	icon: 'clothesfill',
				// 	color: 'blue',
				// 	badge: 0,
				// 	name: '皮肤'
				// }, {
				// 	icon: 'discoverfill',
				// 	color: 'purple',
				// 	badge: 0,
				// 	name: '发现'
				// }, {
				// 	icon: 'questionfill',
				// 	color: 'mauve',
				// 	badge: 0,
				// 	name: '帮助'
				// }, {
				// 	icon: 'commandfill',
				// 	color: 'purple',
				// 	badge: 0,
				// 	name: '问答'
				// }, {
				// 	icon: 'brandfill',
				// 	color: 'mauve',
				// 	badge: 0,
				// 	name: '版权'
				// },
				// ],
				modalName: null,
				gridCol: 4,
				gridBorder: true,//宫格列表边框
				menuBorder: false,
				menuArrow: true,
				menuCard: false,
				skin: false,
				listTouchStart: 0,
				listTouchDirection: null,
			};
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			Gridchange(e) {
				this.gridCol = e.detail.value
			},
			Gridswitch(e) {
				this.gridBorder = e.detail.value
			},
			MenuBorder(e) {
				this.menuBorder = e.detail.value
			},
			MenuArrow(e) {
				this.menuArrow = e.detail.value
			},
			MenuCard(e) {
				this.menuCard = e.detail.value
			},
			SwitchSex(e) {
				this.skin = e.detail.value
			},

			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			NavToPage: function() {
					uni.redirectTo({
						url: '../login/login'
							});
			}
			
		}
	}
</script>

<style>
	.page {
		height: 100Vh;
		width: 100vw;
	}
	.img{
		width: 100%;
		height: 280upx;
		background: linear-gradient(to right,#3396a6,#33966a);
	}
	.head{
		margin-top: 45upx;
		margin-left: 25%;
		float: left;
	}
	.flex-sub{
		text-indent:20upx;
		margin-top: 80upx;
	}
	.flex{
		color: white;
	}
	.logout{
		margin-left:5%;
		width: 90%;
		margin-top: 100upx;
	}
</style>