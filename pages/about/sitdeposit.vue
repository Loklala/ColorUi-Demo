<template>
	<view  class="content">
		<view class="cu-bar bg-gradual-blue search" :style="[{height:CustomBar + 'px'}]">
			<view class="action" @click="navTo()"><text class="cuIcon-back"></text>返回</view>
			<view class="content">
				设置提现账号
			</view>
			<view class="action">
			</view>
		</view>
		<form @submit="formSubmit" @reset="formReset">
		<view class="cu-list menu" :class="[menuBorder?'':'',1?'card-menu margin-top':'']" style="border-radius:4upx ;">
			
			<view class="cu-bar bg-white solid-bottom bg-white">
				<view class="action">
					<text class='cuIcon-newsfill text-blue icon-title'></text>
					账号信息(手机号:{{tel}})
				</view>
				<view>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class='cuIcon-peoplelist text-blue icon-title margin-right-sm'></text>
				<text class="title">账户姓名:</text>
				<text class=" content" >
					<input type="text" class="text-black" name="name" :value="name" maxlength="40"/>
				</text>
			</view>
			<view class="cu-item" :class="1?'arrow':''" @click="PickerChange()">
				<text class='cuIcon-shake text-blue icon-title margin-right-sm'></text>
					<text class="title">账户类型:</text>
					<text class=" content" >
						<text class="text-black"  name='payname'>{{payname}}</text>
						<input type="text" class="hide" name="payname" :value="payname" maxlength="40"/>
						<input type="number" class="hide" name="payType" :value="payType" maxlength="40"/>
					</text>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class='cuIcon-brand text-blue icon-title margin-right-sm'></text>
				<text class="title">收款账号:</text>
				<text class=" content" >
					<input type="text" class="text-black" name="payaccount" placeholder="输入提现账号" :value="payaccount" maxlength="19"/>
				</text>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class='cuIcon-lock text-blue icon-title margin-right-sm'></text>
				<text class="title">设置密码:</text>
				<text class=" content" >
					<input type="password" class="text-black" name="paypassword" placeholder="请设置提现密码" :value="paypassword" maxlength="19"/>
				</text>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" style="display: none;">
				<text class='cuIcon-mobile text-blue icon-title margin-right-sm'></text>
				<text class="title">手机号：</text>
				<text class=" content" >
					<input type="number" class="text-black" name="tel" :value="tel" placeholder="请填写手机号码" maxlength="100" disabled="disabled"/>
				</text>
			</view>
			
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class='cuIcon-safe text-blue icon-title margin-right-sm'></text>
					<view class="title">验证码：</view>
					<input type="number" class="text-black" name="code" :value="code" placeholder="验证码" maxlength="6"/>
					<button class="cu-btn bg-gradual-blue shadow" type="button" :disabled="disabled" @click="sendcode" style="width: 240upx;">{{ btntxt }}</button>
				
			</view>
			<view>
				<button class="cu-btn bg-blue margin-tb-sm lg btn"  formType="submit" type="primary">保存</button>
			</view>
		</view>
		</form>
			<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
			 @onConfirm="onConfirm" @onCancel="onConfirm" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script> 
	import helper from '../../common/helper.js';  
	import mpvuePicker from '../../components/mpvuePicker.vue'; 
	import mpvueCityPicker from '../../components/mpvueCityPicker.vue';
	import cityData from '../../common/city.data.js';
		var  graceChecker = require("../../common/graceChecker.js");
export default {
	components: {
		mpvuePicker,
		mpvueCityPicker
	},
		data() {
			return {
				name:"",
				payname:'中国银行',
				payType:2,
				payaccount:"",
				paypassword:'',
				code:'',
				tel:'',
				
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
				pickerSingleArray: [
					// {
					// 	label: '微信',
					// 	value: 0
					// },
					// {
					// 	label: '支付宝',
					// 	value: 1
					// },
					{
						label: '中国银行',
						value: 2
					},
					{
						label: '招商银行',
						value: 3
					}
					,{
						label: '建设银行',
						value: 4
					},{
						label: '农业银行',
						value: 5
					},{
						label: '工商银行',
						value: 6
					}
				],
				list: [],
				token:'',
				last_tel:'',
				pages:'',
			};
		},
		onLoad(e) {
			this.pages=e.page;
				if(uni.getStorageSync('agentInfo')){
						const value=JSON.parse(this.utils.decrypt(uni.getStorageSync('agentInfo'),'abcdefgabcdefg12'));
						if (value) {
							this.token=value.token;
							this.tel=value.agent_tel;
							this.name=value.agent_name;
							}
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
						last_tel: last_tel,
						sms_type: 2,
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
						} else if(data.code==-200){
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
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '网络异常,请稍后重试'
						});
					},
					complete: () => {}
				});
				
				uni.request({
					url:helper.websiteUrl+'/agent/agent/ajax-get-info',
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
								if(data){
									this.name=data.current_payname;
									if(data.current_payname==null){
										this.name='';
									}
									if(data.current_paytype=='0'){
										this.payname='微信';
										this.payaccount=data.wechat_num;
									}else if(data.current_paytype=='1'){
										this.payname='支付宝';
										this.payaccount=data.alipay_num;
									}else if(data.current_paytype=='2'){
										this.payname='中国银行';
										this.payaccount=data.bank_num;
									}else if(data.current_paytype=='3'){
										this.payname='招商银行';
										this.payaccount=data.bank_num;
									}else if(data.current_paytype=='4'){
										this.payname='建设银行';
										this.payaccount=data.bank_num;
									}else if(data.current_paytype=='5'){
										this.payname='农业银行';
										this.payaccount=data.bank_num;
									}else if(data.current_paytype=='6'){
										this.payname='工商银行';
										this.payaccount=data.bank_num;
									}
								}
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
		methods: {
			navTo(){
				if(this.pages==""){
					this.pages="../about/deposit";
				}
				uni.navigateTo({
					url: this.pages
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
			//判断选中的类型
			onConfirm(e) {
				this.payname = e.label;
				this.payType=e.value[0];
				this.payaccount="";
				console.log(this.payType);
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
						sms_type: 2,
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
			formSubmit: function (e) {
				//将下列代码加入到对应的检查位置
				//定义表单规则
				var rule = [
					{name:"name", checkType : "string", checkRule:"0,20",  errorMsg:"姓名应为0-20个字符之内"},
					{name:"payaccount", checkType : "string", checkRule:"0,30",  errorMsg:"请正确填写账号"},
					{name:"paypassword", checkType : "string", checkRule:"4,30", errorMsg:"密码最短为4个字符"},
					{name:"code", checkType : "notnull", checkRule:"4,30", errorMsg:"验证码不能为空"},
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if(checkRes){
					this.last_tel= uni.getStorageSync('last_tel');
					uni.request({
							url: helper.websiteUrl+'/agent/agent/ajax-add-deposit',
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							method: 'POST',
							dataType: 'json',
							cache: false,
							data: {
								token:this.token,
								name:formData['name'],
								payName:formData['payname'],
								payType:formData['payType'],
								payaccount:formData['payaccount'],
								paypassword:formData['paypassword'],
								code:formData['code'],
								last_tel:this.last_tel,
								sms_type:2,
							},
							success: res => {
								this.list = res;
								let data = this.list.data;
								let msg = data.data;
								if(data.code == 200){
									uni.showToast({title:"修改成功!", icon:"none"});
									setTimeout(function() {
										uni.redirectTo({
											url: '../about/deposit'
										});
									}, 2000);
								}else{
									uni.showToast({title:res.data.data, icon:"none"});
								}
							},
							fail: () => {},
							complete: () => {}
						});
				}else{
					uni.showToast({ title: graceChecker.error, icon: "none" });
				}
			},
			formReset: function (e) {
				this.chosen = ''
			}
		}
	}
</script>

<style>

	.hide{
		display: none;
	}
	.sexpicker{
		width: 90%;
	}
	.picker{
		text-align: left;
	}
	.btn{
		background: linear-gradient(to right,#3396e9,#1ab7b9);
		margin-top: 50upx;
		width: 96%;
		margin-left: 2%;
	}
	.page {
		height: 100Vh;
		width: 100vw;
	}
	.title{
		color: #444444;
		text-align: left;
		width: 160upx;
	}
	.title2{
		color: #444444;
		text-align: left;
		width: 150upx;
	}
	.btn-bg{
		background: #fff;
		color: #007AFF;
	}
.menu{
		margin-top: 10upx;
	}
</style>