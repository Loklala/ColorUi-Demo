<template>
	<view>
		<view class="cu-bar bg-gradual-blue search" :style="[{height:CustomBar + 'px'}]">
			<view class="action" @click="navTo()"><text class="cuIcon-back"></text></view>
			<view class="content">
				修改登录密码
			</view>
			<view class="action">
			</view>
		</view>
		<view class="bg-gray " :class="1?'show':'hide'">
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
				<button class="cu-btn bg-blue margin-tb-sm lg btn"  formType="submit" type="primary" @click="editpwd()">提交</button>
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
			
				ypassword:"",
				npassword:"",
				repassword:"",
				
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				disabled: false,
				isdisabled:true,
				token:'',
				list:[],
			};
		},
		onLoad() {
			const value = uni.getStorageSync('agentInfo');
			if (value) {
				this.token=value.token;
				this.tel=value.agent_tel
			}
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
			editpwd:function(){
				if (this.ypassword == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入原密码'
					});
					return;
				} else if (this.ypassword==this.npassword) {
					uni.showToast({
						icon: 'none',
						title: '原密码和新密码相同'
					});
					return;
				}else if (this.npassword== '') {
					uni.showToast({
						icon: 'none',
						title: '请输入新密码'
					});
					return;
				}else if (this.repassword== '') {
					uni.showToast({
						icon: 'none',
						title: '请再次输入新密码'
					});
					return;
				}else if (this.repassword!=this.npassword) {
					uni.showToast({
						icon: 'none',
						title: '两次输入的新密码不一致'
					});
					return;
				}
				uni.request({
					url:this.COMMON.httpUrl+'/agent/agent/ajax-login-pwd',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					dataType: 'json',
					cache: false,
					data: {
						token:this.token,
						ypassword:this.ypassword,
						npassword:this.npassword,
						repassword:this.repassword,
					},
					success: res => {
						if(res.data.code==200){
							uni.showModal({
								showCancel:false,
								content: '登录密码已修改，请重新登陆',
								success: function (res) {
									if (res.confirm) {
											uni.redirectTo({
												url: '../login/login'
											});
									}
								}
							});
						}else  if(res.data.code==400){
							uni.showToast({
								icon: 'none',
								title: data.data,
							});
						}else if(res.data.code==-200){
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
						console.log('11111')
						uni.showToast({
							icon: 'none',
							title: '网络异常,请稍后重试'
						});
					},
					complete: () => {}
					});
				
				
				
				
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
