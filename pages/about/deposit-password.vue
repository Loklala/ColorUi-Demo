<template>
	<view>
		<view class="cu-bar bg-gradual-blue search" :style="[{height:CustomBar + 'px'}]">
			<view class="action" @click="navTo()"><text class="cuIcon-back"></text></view>
			<view class="content">
				修改提现密码
			</view>
			<view class="action">
			</view>
		</view>
		<view class="bg-gray" :class="1?'show':'hide'">
			<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">

				<view class="cu-form-group l-input">
					<view class="title">手机号：</view>
					<input class="input" type="number"  v-model="tel" :disabled="isdisabled" :value="tel" placeholder="输入手机号码"></input>
				</view>
				<view class="cu-form-group l-input">
					<view class="title">验证码：</view>
					<m-input class="m-input" placeholder="输入验证码" type="number" clearable focus v-model="code"></m-input>
					<button class="cu-btn bg-gradual-blue shadow" type="button" :disabled="disabled" @click="sendcode">{{ btntxt }}</button>
				</view>
				<view class="cu-form-group l-input">
					<view class="title">新密码：</view>
					<m-input class="m-input" type="password" displayable v-model="npassword" placeholder="输入新密码"></m-input>
				</view>
				<view class="cu-form-group l-input">
					<view class="title">确认密码：</view>
					<m-input class="m-input" type="password" displayable v-model="repassword" placeholder="重新输入密码"></m-input>
				</view>
			</view>
			<view>
				<button class="cu-btn bg-blue margin-tb-sm lg btn"  formType="submit" type="primary" @click="changerDeposit()">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
		import helper from '../../common/helper.js';  
	import mInput from '../../components/m-input.vue'
	export default {
		components: {
		    mInput
		},
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				btntxt: '获取验证码',
				
				tel:"",
				code:"",
				npassword:"",
				repassword:"",
				token:'',
				
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				disabled: false,
				isdisabled:true,
				last_tel:'',
			};
		},
		onLoad() {
			const agentInfo = uni.getStorageSync('agentInfo');
			if (agentInfo) {
				this.token=agentInfo.token;
				this.tel=agentInfo.agent_tel;
			}
			const last_tel = uni.getStorageSync('last_tel');
			if (last_tel) {
				this.last_tel=last_tel;
				console.log(last_tel);
			}
			uni.request({
				url:helper.websiteUrl+'/agent/agent/last-sms-time',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				dataType: 'json',
				cache: false,
				data: {
					token:this.token,
					last_tel: this.last_tel,
					sms_type: 3,
				},
				success: res => {
					let lists = res;
					let data = lists.data
					if (data.code == 200) {
						this.time = 60 - parseInt(data.data);
						this.disabled = true;
						this.timer();
					} else if(data.code==400) {
						this.time = 0;
						this.disabled = false;
					} else if(data.code=-200){
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
				fail: () => {
					uni.showToast({
						icon: 'none',
						title: '网络异常,请稍后重试'
					});
				},
				complete: () => {}
			});
		},
		methods: {
			navTo:function(){
				uni.redirectTo({
					url: '../tabbar/tabbar?page=about'
				});
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 80
			},
			changerDeposit(){
				if(this.code==''){
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					});
					return;
				}else if(this.npassword==''){
					uni.showToast({
						icon: 'none',
						title: '请输入新密码'
					});
					return;
				}else if(this.npassword.length<4){
					uni.showToast({
						icon: 'none',
						title: '密码最短为4位'
					});
					return;
				}else if(this.repassword==''){
					uni.showToast({
						icon: 'none',
						title: '请输入再次密码'
					});
					return;
				}
				uni.request({
					url:helper.websiteUrl+'/agent/agent/ajax-deposit-pwd',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					dataType: 'json',
					cache: false,
					data: {
						token:this.token,
						npassword:this.npassword,
						repassword:this.repassword,
						code:this.code,
						tel:this.tel,
						sms_type:3,
					},
					success: res => {
						this.list=res;
						let data=this.list.data;
						console.log(data);
						if(data.code==200){
							uni.showToast({
								icon: 'none',
								title: data.data,
							});
						}else if(data.code==400){
							uni.showToast({
								icon: 'none',
								title: data.data,
							});
						}else if(data.code==-200){
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
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '网络异常,请稍后重试'
						});
					},
					complete: () => {}
					});
			},
			//获取验证码
			sendcode() {
				if (this.tel == '') {
					uni.showToast({
						icon: 'none',
						title: '手机号码为空'
					}, 2000);
					return;
				} 
				uni.request({
					url:helper.websiteUrl+'/agent/agent/ajax-send-sms',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
						},
					method: 'POST',
					dataType: 'json',
					cache: false,
					data: {
						token:this.token,
						tel: this.tel,
						sms_type: 3,
					},
					success: res => {
						this.list = res;
						let data = this.list.data;
						let msg = data.data;
						if (data.code == 200) {
							this.time = 60;
							this.disabled = true;
							uni.showToast({
								icon: 'none',
								title: msg,
							}, 2000);
							let self = this;
							//记录,成功发送验证码手机号
							uni.setStorageSync('last_tel', this.tel);
							this.timer();
						}
						if (data.code == 400) {
							uni.showToast({
								icon: 'none',
								title: "请稍候再试",
							}, 2000);
							this.time = 0;
							setTimeout(this.timer, 1000);
							this.disabled = false;
						}
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '网络异常,请稍后重试'
						});
					},
					complete: () => {}
				});
			},
			//倒计时
			timer() {
				if (this.time > 0) {
					this.time--;
					this.btntxt = this.time + 's后获取';
					setTimeout(this.timer, 1000);
				} else {
					this.time = 0;
					this.btntxt = '获取验证码';
					this.disabled = false;
				}
			},
		}
	}
</script>

<style>

	.tabpage{
		height: 100%;
		width: 100%;
	}
	.show{
		display: block;
	}
	.hide{
		display: none;
	}
	.bg-gradual-blue{
		background: linear-gradient(to right,#3396e9,#1ab7b9);
	}
	.nav{
		margin-left: 0%;
		margin-top: 5upx;
		width: 100%;
	}
	.cu-item{
		padding: 0upx 0upx;
		margin: 0upx 0upx;
		text-align: center;
		width: 50%;
	}
	.title{
			color: #444444;
			text-align: left;
			width: 180upx;
	}
	.btn{
		background: linear-gradient(to right,#3396e9,#1ab7b9);
		margin-top: 50upx;
		width: 96%;
		margin-left: 2%;
	}
</style>
