<template>
	<view  class="content">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">编辑账号信息</block>
		</cu-custom>
			
		<form @submit="formSubmit" @reset="formReset">
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
			<view class="cu-bar bg-white solid-bottom bg">
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
				<button class="cu-btn bg-blue margin-tb-sm lg btn"  formType="submit" type="primary">保存</button>
			</view>
			</form>
			<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
			 @onConfirm="onConfirm" @onCancel="onConfirm" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	import mpvuePicker from '../../components/mpvuePicker.vue'
		var  graceChecker = require("../../common/graceChecker.js");
export default {
	components: {
		mpvuePicker
	},
		data() {
			return {
				name:"李白",
				payname:"微信",
				payType:1,
				payaccount:"LIBAI001WEIXIN",
				
				menuBorder: true,
				menuArrow: false,
				menuCard: true,
				
				themeColor: '#007AFF',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray:[],
				pickerSingleArray: [{
						label: '微信',
						value: 1
					},
					{
						label: '支付宝',
						value: 2
					},
					{
						label: '银行卡',
						value: 3
					}
				],
			};
		},
		methods: {
			editdeposit: function() {
					uni.navigateTo({
						url: '../about/editdeposit'
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
				console.log("666")
				//将下列代码加入到对应的检查位置
				//定义表单规则
				var rule = [
					{name:"name", checkType : "string", checkRule:"0,20",  errorMsg:"姓名应为0-20个字符之内"},
					{name:"payname", checkType : "in", checkRule:"微信,支付宝，银行卡",  errorMsg:"请选择账号类型"},
					{name:"payaccount", checkType : "string", checkRule:"0,20",  errorMsg:"请正确填写账号"},
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if(checkRes){
					console.log(formData);
					uni.showToast({title:"修改成功!", icon:"none"});
					// setTimeout(function() {
					// 	uni.redirectTo({
					// 		url: '../about/deposit'
					// 	});
					// }, 2000);
					
					// uni.request({
					// 	url: '',
					// 	method: 'GET',
					// 	dataType: 'json',
					// 	cache: false,
					// 	data: {
					// 		address:formData.address,
					// 		pickerText:formData.pickerText,
					// 		email:formData.email,
					// 		sexPickerText:formData.sexPickerText,
					// 		nickName:formData.nickName,
					// 		qq: formData.qq,
					// 	},//收到开发者服务成功返回的回调函数
					// 	success: res => {
					// 		
					// 		
					// 		
					// 	},//接口调用失败的回调函数
					// 	fail: () => {
					// 		
					// 	},//接口调用结束的回调函数（调用成功、失败都会执行）
					// 	complete: () => {}
					// });
				}else{
					uni.showToast({ title: graceChecker.error, icon: "none" });
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
		background: linear-gradient(to right,#4dbf92,#1cbbb4);
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