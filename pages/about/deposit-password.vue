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
				
				tel:"17607126635",
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
			};
		},
		onLoad() {
			const agentInfo = uni.getStorageSync('agentInfo');
			if (agentInfo) {
				this.token=agentInfo.token;
			}
		},
		methods: {
			navTo:function(){
				uni.redirectTo({
					url: '../tabbar/tabbar'
				});
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 80
			},
			changerDeposit(){
				if(this.npassword==''){
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
					url: 'http://192.168.0.199:8080/agent/***/***',
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
					},
					success: res => {
						
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
					uni.showToast({
						icon: 'none',
						title: '验证码已发出，请注意查收'
					});
					uni.request({
						url: '',
						method: 'GET',
						data: {
							
						},
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
			}
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
		background: linear-gradient(to right,#3396a6,#33966a);
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
