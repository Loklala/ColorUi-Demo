<template>
	<view>
		<scroll-view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''">
			<!-- <cu-custom bgColor="" class="bg title-text" :isBack="false">
				<block slot="backText"></block>
				<block slot="content">钱包</block>
			</cu-custom> -->
			<view class="cu-bar bg search">
				<!-- <view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg);"></view> -->
				<view class="content title-text">
					钱包
				</view>
				<view class="action">
					<!-- <text class="cuIcon-more"></text> -->
				</view>
			</view>
			
			
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',1?'card-menu margin-top':'']" style="margin-top: 30upx;">
			<view class="cu-list grid bg" :class="['col-' + gridCol,gridBorder?'':'no-border']">
				<view class="cu-item ">
					<view class="money-title">房卡总收益</view><view class="money-css">0.00</view>
				</view>
				<view class="cu-item">
					<view class="money-title">充值总收益</view><view class="money-css">0.00</view>
				</view>
				<view class="cu-item">
					<view class="money-title">俱乐部总收益</view><view class="money-css">0.00</view>
				</view>
				<view class="cu-item">
					<view class="money-title">总提现</view><view class="money-css">0.00</view>
				</view>
				<view class="cu-item">
					<view class="money-title">余额</view><view class="money-css">0.00</view>
				</view>
				<view class="cu-item">
					<view class="money-title">可提余额</view><view class="money-css">0.00</view>
				</view>
			</view>
		</view>	
		<view class="cu-list menu  " :class="[menuBorder?'sm-border':'',menuCard?'card-menu ':'']">
			<!-- <view class="cu-item " :class="0?'arrow':''">
					<text class="title text-gray">tips：</text>
					<text class=" content text-gray">
						温馨提示
					</text>
			</view> -->
			<!-- <view class="cu-item" :class="0?'arrow':''">
					<text class=" content text-gray">
						每天单次提现金额大于100
						每天单次提现金额小于1000可提，
						审核通过后将对您所提交提现订单的账户转账汇款，请耐心等待！
					</text>
			</view> -->
		</view>
		<view class="cu-list menu  " :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']" >
			<view class="cu-item " :class="0?'arrow':''">
					<text class="title">金额：</text>
					<text class=" content" >
						<m-input class="m-input" type="digit" clearable focus v-model="money" placeholder="输入金额"></m-input>
					</text>
			</view>
			<view class="cu-item " :class="0?'arrow':''">
					<text class="title">密码：</text>
					<text class=" content" >
						<m-input class="m-input" type="password" displayable v-model="password" placeholder="输入密码"></m-input>
					</text>
			</view>
		</view>
		<view class="cu-item" :class="0?'arrow':''">
				<button type="default" class="primary bg">申请提现</button>
		</view>
		
		</scroll-view>
	</view>
</template>

<script>
	import mInput from '../../components/m-input.vue';
	export default {
		components: {
			mInput
		},
		created:function(){//beforeCreate
			const value = uni.getStorageSync('agentInfo');
			if (value) {
				var id=value.id;
				console.log(value.id);
			}
		},
		data() {
			return {
				money:'',
				password:'',
				modalName: null,
				gridCol: 3,
				gridBorder: true,
				
				menuBorder: true,
				menuArrow: true,
				menuCard: true,
				
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
			}
		}
	}
</script>

<style>
	.title-text{
		color: #fff;
	}
	.bg{
		background: linear-gradient(to right,#3396a6,#33966a);
	}
	.primary{
		margin-top: 50upx;
		width: 92%;
		color:#fff;
	}
	.money-title{
		color: #F8F8F8;
		font-size: 25upx;
	}
	.money-title1{
		color: #fff;
		font-size: 30upx;
	}
	.money-css{
		font-size: 40upx;
		color: #fff;
	}
	.money-css1{
		font-size: 40upx;
		width: 75%;
	}
	.page {
		height: 100Vh;
		width: 100vw;
	}

	.page.show {
		overflow: hidden;
	}

	.switch-sex::after {
		content: "\e716";
	}

	.switch-sex::before {
		content: "\e7a9";
	}

	.switch-music::after {
		content: "\e66a";
	}

	.switch-music::before {
		content: "\e6db";
	}
</style>
