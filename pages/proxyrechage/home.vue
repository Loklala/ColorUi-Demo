<template>
	<view>
		<view class="cu-bar bg search bg-gradual-blue fixed">
			<view class="action" @tap="navTo()" :style="[{height:CustomBar + 'px'}]">
				<text class="cuIcon-back text-white"></text>返回
			</view>
			<view class="content title-text">代理代充</view>
			<view class="action">
			</view>
		</view>
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',1?'padding paddrad':'']"  :style="[{paddingTop:CustomBar +10+ 'px'}] ">
			<view class="cu-list menu solid-top bg" :class="[1?'sm-border':'',0?'margin-top':'']" style="margin-top: 0upx;">
				<view class="cu-list grid bg-cyan bg" :class="['col-' + 2,gridBorder?'':'no-border']">
					<view class="cu-item " >
						<view class="money-css text-black text-xs padding-top-xs">钻石余额</view>
					</view>
					<view class="cu-item">
						<view class="money-css text-black text-xxl padding-top-xs">{{diamond}}</view>
					</view>
				</view>
			</view>	
			<view class="cu-item " :class="1?'arrow':''" style="margin-top: 20upx;">
					<text class="title">代充记录</text>
			</view>
		</view>	
		<view class="cu-list menu  " :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']" style="margin-top: 10upx;border-radius:4upx;">
			<view class="cu-item" :class="1?'arrow':''" @click="PickerChange()">
					<text class="title">充值类型:</text>
					<text class=" content" >
						<text class="text-black"  name='payname'>{{payname}}</text>
						<input type="text" class="hide" name="payname" :value="payname" maxlength="40"/>
						<input type="number" class="hide" name="payType" :value="payType" maxlength="40"/>
					</text>
			</view>
			<view class="cu-item" :class="0?'arrow':''" >
					<text class="title">充值数量:</text>
					<text class=" content" >
						<m-input class="m-input" type="number" clearable  v-model="diamondnum"  placeholder="请输入充值数量"></m-input>
					</text>
			</view>
			<view class="cu-item" :class="0?'arrow':''" >
					<text class="title">玩家ID:</text>
					<text class=" content">
						<m-input class="m-input" type="number" clearable  v-model="userid"  placeholder="请输入玩家"></m-input>
					</text>
			</view>
		</view>
		<view class="cu-item" :class="0?'arrow margin-top-xs':''">
				<button class="cu-btn bg-white margin-tb-sm lg deposit" @click="ontrechage()">充值</button>
		</view>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
			 @onConfirm="onConfirm" @onCancel="onConfirm" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	import mInput from '../../components/m-input.vue';
		import helper from '../../common/helper.js';  
			import mpvuePicker from '../../components/mpvuePicker.vue'; 
					var  graceChecker = require("../../common/graceChecker.js");
	export default {
		components: {
			mpvuePicker,
			mInput
		},
		data() {
			return {
				themeColor: '#007AFF',
				diamond:'00',
				payname:'钻石',
				payType:1,
				diamondnum:"",
				userid:"",
				
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
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray:[],
				pickerSingleArray: [
					{
						label: '钻石',
						value: 1
					},
					{
						label: '金币',
						value: 2
					}
				],
				list: [],
			};
		},
		created:function(){
		if(uni.getStorageSync('agentInfo')){
				const agentInfo=JSON.parse(this.utils.decrypt(uni.getStorageSync('agentInfo'),'abcdefgabcdefg12'));
				if (agentInfo) {
					this.token = agentInfo.token;
				}
		}
		this.getDiamond()
		},
		methods: {
			// 单列
			PickerChange() {
				this.pickerValueArray = this.pickerSingleArray
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},
			onBackPress() {
				if (this.$refs.mpvuePicker.showPicker) {
					this.$refs.mpvuePicker.pickerCancel();
				  return true;
				}
			},
			onUnload() {
				if (this.$refs.mpvuePicker.showPicker) {
					this.$refs.mpvuePicker.pickerCancel()
				}
			},
			//判断选中的类型
			onConfirm(e) {
				this.payname = e.label;
				this.payType=e.value[0];
				this.payaccount="";
			},
			navTo(){
				uni.redirectTo({
					url: '../tabbar/tabbar?page=earn'
				});
			},
			initPosition() {
			    this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			// 点击充值
			ontrechage(){
				if(this.diamondnum==null){
					uni.showToast({
						icon: 'none',
						title: '请输入充值数量'
					});
					return;
				}
				if(parseInt(this.diamondnum)!=parseFloat(this.diamondnum)){
					uni.showToast({
						icon: 'none',
						title:'充值数量必须为整数',
					});
					return;
				}
				uni.request({
					url:helper.websiteUrl+'/agent/agent/ajax-player-recharge',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						dataType: 'json',
						cache: false,
						data: {
							token:this.token,
							userid:this.userid,
							buy_num:this.diamondnum,
							payname:this.payname,
							production_type:this.payType,
						},
						success: res => {
							let list=res;
							if(list.data.code==200){
								let data=list.data;
								uni.showToast({
									icon: 'none',
									title: '提现成功'
								});
								this.getDiamond();
							}else if(list.data.code==400){
								let data=list.data;
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
													url: '../login/login?lout=1'
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
			//获取当前余额
			getDiamond(){
				uni.request({
					url:helper.websiteUrl+'/agent/agent/ajax-agent-diamond',
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
								this.diamond=res.data.data.diamond;
							}else if(res.data.code==-200){
								uni.showModal({
										showCancel:false,
										content: '用户信息已失效，请重新登陆',
										success: function (res) {
											if (res.confirm) {
													uni.redirectTo({
														url: '../login/login?lout=1'
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
	.title{
		min-width: 160upx;
	}
	.hide{
		display: none;
	}
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
