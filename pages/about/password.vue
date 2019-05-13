<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">修改密码</block>
			</cu-custom>

		<scroll-view scroll-x class="bg-white nav">
			<view class="cu-item" :class="0==TabCur?' text-blue text-bold cur':'text-black'" @tap="tabSelect" data-id="0">
				<!-- <text class="cuIcon-camerafill"></text> -->
				登录密码
			</view>
			<view class="cu-item" :class="1==TabCur?'text-blue text-bold cur':'text-black '" @tap="tabSelect" data-id="1">
				提现密码
			</view>
		</scroll-view>
		<view class="bg-gray" :class="TabCur==0?'show':'hide'">
			<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
				<view class="cu-form-group l-input">
					<view class="title">原密码：</view>
					<m-input class="m-input" type="password" displayable v-model="ypassword" placeholder="输入原密码"></m-input>
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
				<button class="cu-btn bg-blue margin-tb-sm lg btn"  formType="submit" type="primary">提交</button>
			</view>
		</view>
		
		<view class="bg-gray" :class="TabCur==1?'show':'hide'">
			<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">

				<view class="cu-form-group l-input">
					<view class="title">手机号：</view>
					<input class="input" type="number"  v-model="tstel" :disabled="isdisabled" :value="tstel" placeholder="输入手机号码"></input>
				</view>
				<view class="cu-form-group l-input">
					<view class="title">验证码：</view>
					<m-input class="m-input" placeholder="输入验证码" type="number" clearable focus v-model="code"></m-input>
					<button class="cu-btn bg-gradual-blue shadow" type="button" :disabled="disabled" @click="sendcode">{{ btntxt }}</button>
				</view>
				<view class="cu-form-group l-input">
					<view class="title">新密码：</view>
					<m-input class="m-input" type="password" displayable v-model="tsnpassword" placeholder="输入新密码"></m-input>
				</view>
				<view class="cu-form-group l-input">
					<view class="title">确认密码：</view>
					<m-input class="m-input" type="password" displayable v-model="tsrepassword" placeholder="重新输入密码"></m-input>
				</view>
			</view>
			<view>
				<button class="cu-btn bg-blue margin-tb-sm lg btn"  formType="submit" type="primary">提交</button>
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
				
				ypassword:"",
				npassword:"",
				repassword:"",
				
				tstel:"17607126635",
				code:"",
				tsnpassword:"",
				tsrepassword:"",
				
				menuBorder: false,
				menuArrow: false,
				menuCard: true,
				disabled: false,
				isdisabled:true,
			};
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 80
			},
			//验证手机号码部分
			sendcode() {
				var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				//var url="/nptOfficialWebsite/apply/sendSms?mobile="+this.ruleForm.phone;
				if (this.tstel == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号码'
					});
				} else if (!reg.test(this.tstel)) {
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
