<template>
	<view class="content">
		<view class="cu-bar bg search bg-gradual-blue">
			<view class="action" @tap="navTo()">
				<text class="cuIcon-back text-white"></text>
				返回
			</view>
			<view class="content title-text">
				找回密码
			</view>
			<view class="action">
			</view>
		</view>
		<view class="input-group">
			<view class="cu-form-group l-input">
				<view class="title">手机号：</view>
				<!-- <text class="cuIcon-my text-olive"></text> -->
				<m-input class="m-input" type="number" clearable focus v-model="tel" placeholder="输入手机号码"></m-input>
				<view class="cu-capsule radius">
					<view class="cu-tag bg-gradual-blue ">+86</view>
					<view class="cu-tag line-blue">中国大陆</view>
				</view>
			</view>
			<view class="cu-form-group l-input">
				<view class="title">验证码：</view>
				<m-input class="m-input" placeholder="输入验证码" type="number" clearable focus v-model="code"></m-input>
				<button class="cu-btn bg-gradual-blue shadow" type="button" :disabled="disabled" @click="sendcode">{{ btntxt }}</button>
			</view>
			<view class="cu-form-group l-input">
				<view class="title">密 码：</view>
				<m-input class="m-input" type="password" displayable v-model="password" placeholder="输入密码"></m-input>
			</view>
			<view class="cu-form-group l-input">
				<view class="title">确认密码：</view>
				<m-input class="m-input" type="password" displayable v-model="repassword" placeholder="输入确认密码"></m-input>
			</view>
		</view>
		<view class="btn-row"><button type="primary" class="primary" @tap="commit">提交</button></view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import mInput from '../../components/m-input.vue';

	export default {
		components: {
			mInput
		},
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				CustomBar: this.CustomBar,
				modalName: null,

				tel: '',
				password: '',
				repassword: '',
				code: '',

				radio: 'A',
				disabled: false,
				time: 0,
				btntxt: '获取验证码',
				checkbox: [{
						value: 'A',
						checked: false
					},
					{
						value: 'B',
						checked: true
					},
					{
						value: 'C',
						checked: false
					}
				],

			};
		},
		onLoad() {
			const last_tel = uni.getStorageSync('last_tel');
			if (last_tel) {
				console.log(last_tel);
			}
			uni.request({
				url: 'http://192.168.0.199:8080/agent/login/last-sms-time',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				dataType: 'json',
				cache: false,
				data: {
					last_tel: last_tel,
					sms_type: 1,
				},
				success: res => {
					let lists = res;
					let data = lists.data
					if (data.isSuccess == 200) {
						this.time = 60 - parseInt(data.result);
						console.log(this.time)
						this.disabled = true;
						this.timer();
					} else {
						this.time = 0;
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
		methods: {
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			//找回密码
			commit() {
				var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				if (this.tel == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号码'
					});
					return;
				} else if (!reg.test(this.tel)) {
					uni.showToast({
						icon: 'none',
						title: '手机格式不正确'
					});
					return;
				}
				if (this.tel.length < 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号格式不正确'
					});
					return;
				}
				if (this.code == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					});
					return;
				}
				if (this.password.length < 4) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 4 个字符'
					});
					return;
				}
				if (this.password != this.repassword) {
					uni.showToast({
						icon: 'none',
						title: '两次密码不一致'
					});
					return;
				}
				uni.request({
					url: 'http://192.168.0.199:8080/agent/login/ajax-find-pwd',
					method: 'GET',
					data: {
						tel: this.tel,
						smsCode:this.code,
						pwd:this.repassword,
						sms_type: 1,
					},
					success: res => {
						this.list = res;
						let data = this.list.data;
						let msg = data.result;
						if (data.isSuccess == 200) {
							this.time = 60;
							this.disabled = true;
							uni.showToast({
								icon: 'none',
								title: msg,
							}, 2000);
							let self = this;
							//记录成功发送验证码手机号
							uni.setStorage({
								key: 'last_tel',
								data: this.tel,
								success: function() {
									self.timer();
								}
							});
				
						}
						if (data.isSuccess == 400) {
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
			//验证手机号码部分
			sendcode() {
				var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				if (this.tel == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号码'
					});
					return;
				} else if (!reg.test(this.tel)) {
					uni.showToast({
						icon: 'none',
						title: '手机格式不正确'
					});
					return;
				}
				uni.request({
					url: 'http://192.168.0.199:8080/agent/login/ajax-findpwd-code',
					method: 'GET',
					data: {
						tel: this.tel,
						sms_type: 1,
					},
					success: res => {
						this.list = res;
						let data = this.list.data;
						let msg = data.result;
						if (data.isSuccess == 200) {
							this.time = 60;
							this.disabled = true;
							uni.showToast({
								icon: 'none',
								title: msg,
							}, 2000);
							let self = this;
							//记录成功发送验证码手机号
							uni.setStorage({
								key: 'last_tel',
								data: this.tel,
								success: function() {
									self.timer();
								}
							});

						}
						if (data.isSuccess == 400) {
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
			navTo() {
				uni.redirectTo({
					url: 'login'
				});
			}
		}
	};
</script>

<style>
	.xy-text {
		text-align: left;
	}

	.cu-btn {
		border-radius: 8upx;
	}

	.cu-tag {
		height: 55upx;
	}

	.padding-xl {
		padding: 0upx 10upx;
	}

	.scroll-Y {
		height: 1000upx
	}

	.ruls {
		color: #007AFF;
	}

	.title {
		width: 180upx;
	}

	.cu-item {
		line-height: 15upx;
		height: 110upx;
	}

	.btn-rows {
		margin-top: 60upx;
	}

	.round {
		float: left;
		height: 40supx;
		width: 40upx;
	}

	.block {
		margin: 0 auto;
		padding-left: 55upx;
		height: 30upx;
		width: 550upx;
	}

	.texy {
		text-align: center;
		line-height: 50upx;
	}

	.btn-row {
		margin-top: 30upx;
	}

	.primary {
		margin-top: 100upx;
		background: linear-gradient(to right, #0286f7, #1bb8b7);
		width: 90%;
		margin-left: 5%;
	}

	.l-input {
		width: 98%;
		margin-left: 1%;
		margin-bottom: 2upx;
	}

	.input-group {
		margin-top: 10upx;
	}
</style>
