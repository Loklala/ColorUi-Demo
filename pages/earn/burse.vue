<template>
	<view>
		<view class="cu-bar bg search bg-gradual-blue fixed">
			<view class="action" @tap="navTo()" :style="[{height:CustomBar + 'px'}]">
				<text class="cuIcon-back text-white"></text>
			</view>
			<view class="content title-text">钱包</view>
			<view class="action">
			</view>
		</view>
	
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',1?'card-menu margin-top':'']" :style="[{marginTop:CustomBar +10+ 'px'}]">
			<view class="cu-list grid bg" :class="['col-' + 2,gridBorder?'':'no-border']">
				<view class="cu-item">
					<view class="money-title"></view><view class="text-white text-xl">累计提现</view>
				</view>
				<view class="cu-item">
					<view class="money-title"></view><view class="text-white text-bold text-xxl">{{ztsmoney}}</view>
				</view>
				<view class="cu-item">
					<view class="money-title"></view><view class="text-white text-xl">当前余额</view>
				</view>
				<view class="cu-item">
					<view class="money-title"></view><view class="text-white text-bold text-xxl">{{thismoney}}</view>
				</view>
				<view class="cu-item">
					<view class="money-title"></view><view class="text-white  text-xl">可提金额</view>
				</view>
				<view class="cu-item">
					<view class="money-title"></view><view class="text-white text-bold text-xxl">{{ktmoney}}</view>
				</view>
			</view>
		</view>	
		<view class="cu-list menu  " :class="[menuBorder?'sm-border':'',menuCard?'card-menu ':'']" style="margin-top: 15upx;">
			<view class="cu-item " :class="0?'arrow':''">
					<text class="title text-gray">tips：</text>
					<text class=" content text-gray">
						温馨提示
					</text>
			</view>
			<view class="cu-item" :class="0?'arrow':''">
					<view class=" content text-gray ">
						<view>{{text1}}</view>
						<view>{{text2}}</view>
						<view>{{text3}}</view>
						<view>审核通过后将对您所提交提现订单的账户转账汇款，请耐心等待！</view>
					</view>
			</view>
		</view>
		<view class="cu-list menu  " :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']" style="margin-top: 15upx;">
			<view class="cu-item " :class="0?'arrow':''">
					<text class="title">金额：</text>
						<m-input class="m-input" type="digit" clearable focus v-model="money" placeholder="输入金额"></m-input>
			</view>
			<view class="cu-item " :class="0?'arrow':''">
					<text class="title">密码：</text>
						<m-input class="m-input" type="password" displayable v-model="password" placeholder="输入密码"></m-input>
			</view>
		</view>
		<view class="cu-item" :class="0?'arrow':''">
				<button class="cu-btn bg-white margin-tb-sm lg deposit" @click="ontsmoney()">申请提现</button>
		</view>
		
	
	</view>
</template>

<script>
	import mInput from '../../components/m-input.vue';
	export default {
		components: {
			mInput
		},
		//加载金额
		onLoad() {
			const agentInfo = uni.getStorageSync('agentInfo');
			if (agentInfo) {
				this.token=agentInfo.token;
			}
			this.getMoney()
		},
		data() {
			return {
				ztsmoney:'0.00',
				thismoney:'0.00',
				ktmoney:'0.00',
				minmoney:'100',
				maxmoney:'1000',
				text1:"",
				text2:"",
				text3:"",
				
				id:0,
				money:'',
				password:'',
				
				modalName: null,
				gridCol: 3,
				gridBorder: true,
				
				menuBorder: true,
				menuArrow: true,
				menuCard: true,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				skin: false,
				listTouchStart: 0,
				listTouchDirection: null,
				token:'',
			};
		},
		methods: {
			navTo() {
				uni.redirectTo({
					url: '../tabbar/tabbar'
				});
			},
			initPosition() {
			    this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			// 点击提现
			ontsmoney(){
				uni.request({
					url: 'http://192.168.0.199:8080/agent/earnings/ajax-apply-deposit',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						dataType: 'json',
						cache: false,
						data: {
							token:this.token,
							money:this.money,
							password:this.password,
						},
						success: res => {
							let list=res;
							if(list.data.code==200){
								let data=list.data;
								console.log(data);
								uni.showToast({
									icon: 'none',
									title: '提现成功'
								});
								
								this.getMoney()
							}else{
								let data=list.data;
								console.log(data);
								uni.showToast({
									icon: 'none',
									title: data.msg
								});
							}
						},
						fail: () => {},
						complete: () => {}
					});
			},
			getMoney(){
				uni.request({
					url: 'http://192.168.0.199:8080/agent/earnings/ajax-burse-money',
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
							if(res.data.code==200){
								let data=res.data.data;
								this.ztsmoney=data.alltsMoney;
								this.thismoney=data.thisMoney;
								this.ktmoney=data.ktMoney;
								let configval=JSON.parse(data.configval);
									if(configval[0].status==0){
										let minPrice=configval[0].minPrice
										this.text1="每次提现范围:"+configval[0].minPrice+"<金额<"+configval[0].maxPrice+"，最多可提现"+configval[0].num+"次，2~24小时到账";
									}else if(configval[1].status==0){
										let minPrice=configval[1].minPrice
										this.text2="每次提现范围:"+configval[1].minPrice+"<金额<"+configval[1].maxPrice+"，最多可提现"+configval[1].num+"次，每周五24:00前提交的提现申请将在下周一前17:00结算";
									}else if(configval[2].status==0){
										let minPrice=configval[2].minPrice
										this.text3="每次提现范围:"+configval[2].minPrice+"<金额<"+configval[2].maxPrice+"，最多可提现"+configval[2].num+"次，每月最后一天24:00前提交的提现申请将在下月第一个工作日17:00结算";
									}
							}else{
								console.log('请设置提现密码再提现')
							}
						},
						fail: () => {},
						complete: () => {}
					});
			},
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
		},
		onReady() {
		    this.initPosition();
		}
	}
</script>

<style>
	.deposit{
		margin-left:5%;
		width: 90%;
		margin-top: 100upx;
		color: #007AFF;
	}
	.ye{
		min-height: 130upx;
	}
	.title-text{
		color: #fff;
	}
	.bg{
		background: linear-gradient(to right,#319ee9,#1bb9b7);
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
