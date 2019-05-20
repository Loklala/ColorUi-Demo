<template>
	<view  class="content">
		<view class="cu-bar bg-gradual-blue search" :style="[{height:CustomBar + 'px'}]">
			<view class="action" @click="navTo()"><text class="cuIcon-back"></text></view>
			<view class="content">
				编辑提现账号
			</view>
			<view class="action">
			</view>
		</view>
			
			
		<form @submit="formSubmit" @reset="formReset">
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
			<view class="cu-bar bg-white solid-bottom bg-white">
				<view class="action">
					<text class='cuIcon-newsfill text-blue icon-title'></text>
					账号信息
				</view>
				<view>
				</view>
			</view>
			<view class="cu-item" :class="0?'arrow':''">
				<text class='cuIcon-peoplelist text-blue icon-title'></text>
			<text class="title">姓名：</text>
				<text class=" content" >
					<input type="text" class="text-black" name="name" placeholder="输入姓名" :value="name" maxlength="40"/>
				</text>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" @click="PickerChange">
				<text class='cuIcon-shake text-blue icon-title'></text>
				<text class="title">类型：</text>
				<text class="content" >
					<text class="text-black"  name='payname'>{{payname}}</text>
					<input type="text" class="hide" name="payname" :value="payname" maxlength="40"/>
					<input type="number" class="hide" name="payType" :value="payType" maxlength="40"/>
				</text>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class='cuIcon-brand text-blue icon-title'></text>
				<text class="title">账号：</text>
				<text class=" content" >
					<input type="text" class="text-black" name="payaccount" placeholder="输入账号" :value="payaccount" maxlength="19"/>
				</text>
			</view>
			<view class="cu-form-group l-input">
				<view class="title">手机号：</view>
				<input class="input" type="number"  v-model="tel" disabled="true" :value="tel" ></input>
			</view>
			<view class="cu-form-group l-input">
				<view class="title">验证码：</view>
				<m-input class="m-input" placeholder="输入验证码" type="number" clearable focus v-model="code"></m-input>
				<button class="cu-btn bg-gradual-blue shadow" type="button" :disabled="disabled" @click="sendcode">{{ btntxt }}</button>
			</view>
		</view>
		
			<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
					<view class="cu-item" :class="menuArrow?'arrow':''">
						<text class='cuIcon-notice text-blue icon-title'></text>
						<text class="title">温馨提示：</text>
						<text class=" content" ></text>
					</view>	
					<view class="cu-item" :class="menuArrow?'arrow':''">
						<text class=" content tips">
							此帐号将作为收益转账账户，以防止收益不到账的情况发生，请确保您所填信息真实有效，请认真填写账号信息.
						</text>
					</view>	
				</view> 
			<view>
				<button class="cu-btn bg-blue margin-tb-sm lg btn"  formType="submit" type="primary" @click="saveDeposit()">保存</button>
			</view>
			</form>
			<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
			 @onConfirm="onConfirm" @onCancel="onConfirm" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	import mpvuePicker from '../../components/mpvuePicker.vue'
	import mInput from '../../components/m-input.vue'
		var  graceChecker = require("../../common/graceChecker.js");
export default {
	components: {
		mpvuePicker,
		 mInput
	},
		data() {
			return {
				name:"李白",
				payname:"微信",
				payType:1,
				payaccount:"LIBAI001WEIXIN",
				code:'',
				tel:'17700000000',
				
				btntxt: '获取验证码',
				
				disabled:false,
				menuBorder: true,
				menuArrow: false,
				menuCard: true,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				themeColor: '#007AFF',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray:[],
				pickerSingleArray: [{
						label: '微信',
						value: 0
					},
					{
						label: '支付宝',
						value: 1
					},
					{
						label: '银行卡',
						value: 2
					}
				],
				list: [],
				token:'',
			};
		},
		onLoad() {
			const value = uni.getStorageSync('agentInfo');
			if (value) {
				console.log(value);
				this.token=value.token;
				this.tel=value.agent_tel
			}
			const last_tel = uni.getStorageSync('last_tel');
			if (last_tel) {
				console.log(last_tel);
			}
			uni.request({
				url: 'http://192.168.0.199:8080/agent/agent/last-sms-time',
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
			navTo(){
				uni.navigateTo({
					url: 'deposit'
				});
			},
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
			//选中省男女
			onConfirm(e) {
				//JSON.stringify(e)
				this.payname = e.label;
				this.payType=e.value[0];
				this.payaccount="";
				console.log(this.payType);
			},
			formSubmit: function (e) {
				//将下列代码加入到对应的检查位置
				//定义表单规则
				var rule = [
					{name:"name", checkType : "string", checkRule:"0,20",  errorMsg:"姓名应为0-20个字符之内"},
					{name:"payname", checkType : "in", checkRule:"微信,支付宝，银行卡",  errorMsg:"请选择账号类型"},
					{name:"payaccount", checkType : "string", checkRule:"0,30",  errorMsg:"请正确填写账号"},
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if(checkRes){

					uni.request({
						url: 'http://192.168.0.199:8080/agent/agent/ajax-edit-deposit',
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							method: 'POST',
							dataType: 'json',
							cache: false,
							data: {
								token:this.token,
								name:formData['name'],
								payType:formData['payType'],
								payaccount:formData['payaccount'],
							},
							success: res => {
								this.list = res;
								let data = this.list.data;
								let msg = data.result;
								if(data.isSuccess == 200){
									uni.showToast({title:"修改成功!", icon:"none"});
									setTimeout(function() {
										uni.redirectTo({
											url: '../about/deposit'
										});
									}, 2000);
								}
							},
							fail: () => {},
							complete: () => {}
						});
					}
			},
			//获取验证码
			sendcode() {
				var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				if (this.tel == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号码'
					}, 2000);
					return;
				} else if (!reg.test(this.tel)) {
					uni.showToast({
						icon: 'none',
						title: '手机格式不正确'
					}, 2000);
					return;
				}
				uni.request({
					url: 'http://192.168.0.199:8080/agent/agent/ajax-send-sms',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
						},
					method: 'POST',
					dataType: 'json',
					cache: false,
					data: {
						tel: this.tel,
						sms_type: 2,
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
			formReset: function (e) {
				console.log("清空数据")
				this.chosen = ''
			}
		}
	}
</script>

<style>
	.tips{
		/* text-indent:5upx; */
		color: red;
	}
	.edit-btn{
		background: linear-gradient(to right,#4dbf92,#1cbbb4);
		font-size: 25upx;
		margin-right: 15upx;
		color: #555555;
	}
	.bg{
		background: linear-gradient(to right,#4dbf92,#1cbbb4);
	}
	.menu{
		margin-top: 30upx;
	}
	.btn{
		background: linear-gradient(to right,#0286f7,#19b5ba);
		width: 94%;
		margin-left: 3%;
		margin-top: 50upx;
	}
	.hide{
		display: none;
	}
	.page {
		height: 100Vh;
		width: 100vw;
	}
	.title{
		color: #777777;
		text-align: left;
		width: 160upx;
	}
	.icon-title{
		color: #777777;
		text-align: left;
		width: 60upx;
	}
	.btn-bg{
		background: #fff;
		color: #007AFF;
	}

</style>