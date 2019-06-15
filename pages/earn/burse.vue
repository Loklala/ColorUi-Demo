<template>
	<view>
		<view class="cu-bar bg search bg-gradual-blue fixed">
			<view class="action" @tap="navTo()" :style="[{height:CustomBar + 'px'}]">
				<text class="cuIcon-back text-white"></text>
			</view>
			<view class="content title-text">提现</view>
			<view class="action">
			</view>
		</view>
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',1?'padding paddrad':'']"  :style="[{paddingTop:CustomBar +10+ 'px'}] ">
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
<!-- 				<view class="cu-item">
					<view class="money-title"></view><view class="text-white  text-xl">可提金额</view>
				</view>
				<view class="cu-item">
					<view class="money-title"></view><view class="text-white text-bold text-xxl">{{ktmoney}}</view>
				</view> -->
			</view>
		</view>	
		<view class="cu-list menu  " :class="[menuBorder?'':'',menuCard?'card-menu ':'']" style="margin-top: -18upx;border-radius: 4upx;">
			<view class="cu-item" :class="0?'arrow':''">
					<view class=" content text-gray ">
						<view>提现规则：</view>
						<view>1.{{text1}}</view>
						<view>2.{{text2}}</view>
						<view>3.{{text3}}</view>
					</view>
			</view>
		</view>
		<view class="cu-list menu  " :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']" style="margin-top: 15upx;border-radius:4upx;">
			<view class="cu-item " :class="0?'arrow':''">
					<text class="title">提现金额：</text>
						<m-input class="m-input" type="number" @blur="change(money)" clearable  v-model="money" @input="change(money)"  placeholder="输入金额"></m-input>
			</view>
			<view class="cu-item " :class="0?'arrow':''">
					<text class="title">提现密码：</text>
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
		import helper from '../../common/helper.js';  
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
				text4:"",
				
				
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
			change(val) {
                val = val.replace(/(^\s*)|(\s*$)/g, "")
                if(!val) {
                    this.money = "";
                    return
                }
                var reg = /[^\d]/g
                // 只能是数字和小数点，不能是其他输入
                val = val.replace(reg, "");
				this.money='';
				console.log(val);
                this.money = val;
            },
			navTo() {
				uni.redirectTo({
					url: '../tabbar/tabbar?page=earn'
				});
			},
			initPosition() {
			    this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			// 点击提现
			ontsmoney(){
				if(this.money==""){
					uni.showToast({
						icon: 'none',
						title: '请输入提现金额'
					});
					return;
				}
				if(this.password==""){
					uni.showToast({
						icon: 'none',
						title: '请输入提现密码'
					});
					return;
				}
				uni.request({
					url:helper.websiteUrl+'/agent/earnings/ajax-apply-deposit',
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
								uni.showToast({
									icon: 'none',
									title: '提现成功'
								});
								this.getMoney()
							}else if(list.data.code==400){
								let data=list.data;
								console.log(data);
								uni.showToast({
									icon: 'none',
									title: data.msg
								});
							}else if(list.data.code==-200){
								uni.showModal({
									showCancel:false,
									content: '用户信息已失效，请重新登陆',
									success: function (res) {
										if (res.confirm) {
												uni.redirectTo({
													url: '../login/login'
												});
										}
									}
								});
							}
						},
						fail: () => {},
						complete: () => {}
					});
			},
			getMoney(){
				uni.request({
					url:helper.websiteUrl+'/agent/earnings/ajax-burse-money',
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
								let list=[];
								let str = "周" + "日一二三四五六".charAt(new Date().getDay());
								let title='';
								let kt='';
								for (let j=0;j<configval.length;j++) {
									if(configval[j].status==0){
										title+=configval[j].name+'，'
									}
								}
								title = title.slice(0, title.length - 1);
								for(let i=0;i<configval.length;i++){
									if(configval[i].name==str){
										if(configval[i].status==0){
											this.text1="每日可提现"+configval[i].num+"次"
											this.text2='每'+title+'可提现';
											this.text3="今日提现范围：最少"+configval[i].minPrice+"，不超过"+configval[i].maxPrice;
										}else{
											this.text1="每日可提现"+configval[i].num+"次"
											this.text2='每'+title+'可提现';
											this.text3="单次提现范围：最少"+configval[i].minPrice+"，不超过"+configval[i].maxPrice;
										}
									}
								}
								
							}else{
								uni.showModal({
									showCancel:false,
									content: '请先设置提现账号',
									success: function (res) {
										if (res.confirm) {
												uni.redirectTo({
													url: '../about/editdeposit'
												});
										}
									}
								});
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
	.paddrad{
		border-radius: 8upx;
	}
	.deposit{
		margin-left:5%;
		width: 90%;
		margin-top: 60upx;
		color: #ffffff;
		border-radius: 8upx;
		background: linear-gradient(to right,#319ee9,#1bb9b7);
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
