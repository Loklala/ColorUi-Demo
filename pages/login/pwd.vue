<template>
	<view class="content">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">找回密码</block>
		</cu-custom>
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

		
		
		<view class="btn-row"><button type="primary" class="primary" @tap="register" :disabled="isdisabledFn">注册</button></view>
	
		
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
			isdisabledFn:true,
			time: 0,
			btntxt: '获取验证码',
			checkbox: [
				{
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
		// 客户端对账号信息进行一些必要的校验。
		//实际开发中，根据业务需要进行处理，这里仅做示例。
		register() {
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
				url: '#',
				method: 'POST',
				dataType: 'json',
				cache: false,
				data: {
					agent_tel: this.tel,
					agent_pwd: this.password,
					sms_code: this.code,
				},
				success: res => {
					console.log(res)
					if(res.data.isSuccess==200){
						uni.showToast({
						    icon: 'none',
							duration:2000,
						    title: res.data.message
						});
					}else{
						uni.showToast({
						    icon: 'none',
							duration:2000,
						   title: res.data.message
						});
					}
				},
				fail: () => {
					
				},
				complete: () => {}
			});
			var self = this;
			setTimeout(function() {
				self.navTo();
			}, 2000);
		},
		//验证手机号码部分
		sendcode() {
			var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
			//var url="/nptOfficialWebsite/apply/sendSms?mobile="+this.ruleForm.phone;
			if (this.tel == '') {
				uni.showToast({
					icon: 'none',
					title: '请输入手机号码'
				});
			} else if (!reg.test(this.tel)) {
				uni.showToast({
					icon: 'none',
					title: '手机格式不正确'
				});
			} else {
				this.time = 60;
				this.disabled = true;
				this.timer();
				uni.request({
					url: '',
					method: 'GET',
					data: {},
					success: res => {
					},
					fail: () => {},
					complete: () => {}
				});
			}
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
		query() {
			var formMess = this.formMess;
			Axios.post(api + '/order/select/reception', formMess).then(
				function(res) {
					if (res.data.code == 200) {
						console.log(res.data.data);
						this.productResult = res.data.data;
						this.productResult.length = 3;
					} else if (res.data.code == 400) {
						alert(res.data.message);
					}
				}.bind(this)
			);
		},
		navTo() {
			uni.navigateBack({
				delta: 1,
				animationType: 'none',
				animationDuration: 200
			});
		}
	}
};
</script>

<style>
	.xy-text{
		text-align: left;
	}
	.cu-btn{
		border-radius:8upx ;
	}
	.cu-tag{
		height: 55upx;
	}
	.padding-xl{
		padding:0upx 10upx;
	}
	.scroll-Y{
		height:1000upx
	}
	.ruls{
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
