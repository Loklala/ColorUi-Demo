<template>
	<view  class="content">
		<view class="cu-bar bg-gradual-blue search" :style="[{height:CustomBar + 'px'}]">
			<view class="action" @click="navTo()"><text class="cuIcon-back"></text>返回</view>
			<view class="content">
				修改个人信息
			</view>
			<view class="action">
			</view>
		</view>
		<form @submit="formSubmit" @reset="formReset">
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class="title">昵 称：</text>
				<text class=" content" >
					<input type="text" class="text-black" name="nickname" :value="nickName" maxlength="40"/>
				</text>
			</view>
			<view class="cu-item" :class="1?'arrow':''" @click="PickerChange()">
					<text class="title">性 别：</text>
					<text class=" content" >
						<text class="text-black"  name='gender'>{{sexPickerText}}</text>
						<input type="text" class="hide" name="gender" :value="sexPickerText" maxlength="40"/>
						<input type="text" class="hide" name="sexval" :value="sexPickerVal" maxlength="40"/>
					</text>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class="title">邮 箱：</text>
				<text class=" content" >
					<input type="text" class="text-black"  placeholder="请填写邮箱号" name="email" :value="email" maxlength="40"/>
				</text>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class="title">Q Q ：</text>
				<text class=" content" >
					<input type="number" class="text-black"  placeholder="请填写QQ号" name="qq" :value="qq" maxlength="11"/>
				</text>
			</view>
			<view class="cu-item" :class="1?'arrow':''" @click="showThreePicker()">
				<text class="title">地 区：</text>
				<text class=" content" >
					<text class="text-black"  >{{pickerText}}</text>
					<input type="text" class="hide" name="area" :value="pickerText" maxlength="40"/>
				</text>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class="title">地 址：</text>
				<text class=" content" >
					<input type="text" class="text-black" name="address" :value="address" placeholder="请填写街/区/号" maxlength="100"/>
				</text>
				<text class='cuIcon-locationfill text-orange'></text>
			</view>
			<view>
				<button class="cu-btn bg-blue margin-tb-sm lg btn"  formType="submit" type="primary">保存</button>
			</view>
		</view>
		</form>
			<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
			 @onConfirm="onSexConfirm" @onCancel="onSexConfirm" :pickerValueArray="pickerValueArray"></mpvue-picker>
			 
			<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
			 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
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
				address: "",
				pickerText: '北京市-市辖区-东城区',
				email: "",
				sexPickerText:'',
				sexPickerVal:'',
				nickName: "",
				qq: "",
				
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				
				
				// sexPickerNum:1,
				themeColor: '#007AFF',
				cityPickerValueDefault: [0, 0, 0],
				pickerSingleArray: [{
						label: '男',
						value: 0
					},
					{
						label: '女',
						value: 1
					}
				],
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray:[],
				token:'',
			};
		},
		onLoad() {
			if(uni.getStorageSync('agentInfo')){
				const value=JSON.parse(this.utils.decrypt(uni.getStorageSync('agentInfo'),'abcdefgabcdefg12'));
				if (value) {
					this.token=value.token;
				}
			}
			uni.request({
				url:helper.websiteUrl+'/agent/agent/ajax-agent-info',
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
					this.list=res;
					let data=this.list.data;
					if(data.code==200){
						this.nickName=data.data.nickname;
						if(data.data.sex=='0'){
							this.sexPickerText='男';
							this.sexPickerVal=0;
						}else if(data.data.sex=='1'){
							this.sexPickerText='女';
							this.sexPickerVal=1;
						}
						if(data.data.email==null){
							this.email='';
						}else{
							this.email=data.data.email;
						}
						
						if(data.data.qq==null){
							this.qq='';
						}else{
							this.qq=data.data.qq;
						}
						
						if(data.data.area==null){
							this.area='';
						}else{
							this.area=data.data.area;
						}
						
						if(data.data.address==null){
							this.address='';
						}else{
							this.address=data.data.address;
						}
					}else if(data.code==-200){
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
		},
		methods: {
			navTo: function() {
					uni.redirectTo({
						url: 'info'
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
			showThreePicker() {
				console.log('000000')
				this.$refs.mpvueCityPicker.show();
			},
			onBackPress() {
				if (this.$refs.mpvuePicker.showPicker) {
					this.$refs.mpvuePicker.pickerCancel();
				  return true;
				}
			  if (this.$refs.mpvueCityPicker.showPicker) {
			  	this.$refs.mpvueCityPicker.pickerCancel();
			    return true;
			  }
			},
			onUnload() {
				if (this.$refs.mpvuePicker.showPicker) {
					this.$refs.mpvuePicker.pickerCancel()
				}
				if (this.$refs.mpvueCityPicker.showPicker) {
					this.$refs.mpvueCityPicker.pickerCancel()
				}
			},
			//选中省市区
			onConfirm(e) {
				//JSON.stringify(e)
				this.pickerText = e.label;
			},
			//选中省男女
			onSexConfirm(e) {
				//JSON.stringify(e)
				this.sexPickerText = e.label;
				this.sexPickerVal=e.value[0]
			},
			formSubmit: function (e) {
				//将下列代码加入到对应的检查位置
				//定义表单规则
				var rule = [
					{name:"nickname", checkType : "string", checkRule:"0,20",  errorMsg:"昵称应为0-20个字符之内"},
					{name:"gender", checkType : "in", checkRule:"男,女",  errorMsg:"请选择性别"},
					{name:"sexval", checkType : "in", checkRule:"0,1",  errorMsg:''},
					{name:"email", checkType : "email", checkRule:"",  errorMsg:"邮箱格式不正确"},
					{name:"qq",checkType:"reg",checkRule:"^[1-9]{4,11}$",errorMsg:"QQ号码不正确"}
				];
				//进行表单检查
				var formData = e.detail.value;
				var regemail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if(formData.email.length>0){
					if (!regemail.test(formData.email)) {
					uni.showToast({
						icon: 'none',
						title: '邮箱格式不正确'
					});
					return false;
					}
				}
				if(formData.qq.length>0){
					var regqq = /^[1-9]\d{4,10}$/;
						if (!regqq.test(formData.qq)) {
						uni.showToast({
							icon: 'none',
							title: 'qq号码格式不正确'
						});
						return false;
					}
				}
				var checkRes = graceChecker.check(formData, rule);
				if(checkRes){
					uni.request({
						url:helper.websiteUrl+'/agent/agent/ajax-up-info',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						dataType: 'json',
						cache: false,
						data: {
							token:this.token,
							nickname:formData.nickname,
							sex:formData.sexval,
							qq:formData.qq,
							email:formData.email,
							area:this.pickerText,
							address:formData.address,
						},
						success: res => {
							this.list=res;
							let data=this.list.data;
							if(data.code==200){
								uni.showToast({title:"修改成功!", icon:"none"});
								setTimeout(function() {
									uni.redirectTo({
										url: '../about/info'
									});
								}, 2000);
							}else if(data.code==-200){
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
		width: 120upx;
	}
	.btn-bg{
		background: #fff;
		color: #007AFF;
	}
.menu{
		margin-top: 10upx;
	}
</style>