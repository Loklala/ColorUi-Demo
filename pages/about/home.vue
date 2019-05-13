<template name="about">
	<scroll-view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''">
			<view class="padding img"  @click="PageChange" data-cur="../about/info">
				<image class="cu-avatar xl round margin-left head bg-white" :src="src"></image>
				<view class="content flex-sub">
					<text class="flex">昵称:{{name}}</text>
					<text class="flex"> ID:{{id}}</text>
				</view>
			</view>

		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
			
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<button class="cu-btn content" @click="PageChange" data-cur="../about/info">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">个人信息</text>
				</button>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<button class="cu-btn content"  @click="PageChange" data-cur="../about/deposit">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">提现设置</text>
				</button>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<button class="cu-btn content"  @click="PageChange" data-cur="../about/password">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">密码设置</text>
				</button>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<button class="cu-btn content"  @click="PageChange" data-cur="../about/feedback">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">反馈</text>
				</button>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<button class="cu-btn content"  @click="PageChange" data-cur="../about/about">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">关于</text>
				</button>
			</view>
			
		</view>
			<button class="cu-btn bg-white margin-tb-sm lg logout" @click="PageChange" data-cur="../login/login">退出</button>
	</scroll-view>
	
</template>

<script>
	var self;
	export default {
		data() {
			return {
				src:'../../static/logo.png',
				name:"",
				id:"",
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
		created:function(){//beforeCreate
			const value = uni.getStorageSync('agentInfo');
			if (value) {
				this.id=value.agent_id;
				this.name=value.nickname;
				console.log(value.id.toString());
			}
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
			//页面跳转
			PageChange: function(e) {
				uni.navigateTo({
					url:e.currentTarget.dataset.cur
					});
			},
		
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
		color: red;
	}
</style>