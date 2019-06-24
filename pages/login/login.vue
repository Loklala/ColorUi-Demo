<template>
    <view class="content">
		<view class="cu-bar title-bg" :style="[{height:CustomBar + 'px',display:ishead}]">
			<view class="action" @tap="navTo()">
				<text class="cuIcon-back text-white"></text>
				游戏大厅
			</view>
			<view class="content title-text">
			</view>
			<view class="action">
			</view>
		</view>
		<image src="../../static/img/login-logo.jpg" 
		 mode="widthFix" class="response"></image>
        <view class="input-group">
			<view class="cu-form-group l-input">
				<!-- <view class="title">账号：</view> -->
				<text class="cuIcon-my text-olive margin-right-sm"></text>
				<m-input class="m-input" type="number" clearable v-model="account" @input="change()" placeholder="请输入手机号或ID"></m-input>
			</view>
			<view class="cu-form-group l-input">
				<!-- <view class="title">密码：</view> -->
				<text class="cuIcon-lock text-olive margin-right-sm"></text>
				<m-input class="m-input" type="password"  v-model="password" placeholder="请输入登录密码"></m-input>
			</view>
			<view :class="autologin ?'cu-form-group l-input hide':'cu-form-group l-input'">
				<text class="cuIcon-safe text-olive margin-right-sm"></text>
			<m-input class="m-input" type="text" clearable  v-model="code" placeholder="输入验证码"></m-input>
				<image :src="code_url" class="code-img" @click="changeImg()"></image>	
			</view>
        </view>
        <view class="btn-row login-btn">
            <button type="primary"  class="primary" @tap="bindLogin">登录</button>
        </view>
        <view class="action-row">
            <navigator  @click="PageChange" data-cur="../login/reg" >注册账号</navigator>
            <text>|</text>
            <navigator  @click="PageChange" data-cur="../login/pwd" >忘记密码</navigator>
        </view>
    </view>
</template>

<script>
	var self;
    import service from '../../service.js?v=1.0';
    import mInput from '../../components/m-input.vue'
	import helper from '../../common/helper.js?v=1.0';  
    export default {
        components: {
            mInput
        },
        data() {
			lists:[],
			self=this
            return {
				code_url:'',
				disableScroll:true,
                providerList: [],
                hasProvider: false,
                account: '',
                password: '',
                positionTop: 0,
				code:'',
				webUrl:this.websiteUrl,
				random_num:0,
				ishead:false,
				autologin:false,
				lofinURL:'/agent/login/ajax-login',
				islogin:'0',
				sign:"",
            }
        },
		onLoad:function(e){
			this.random();
			this.changeImg();
			 const account=this.utils.decrypt(uni.getStorageSync('account'),"abcdefgabcdefg12")
			 const password=this.utils.decrypt(uni.getStorageSync('password'),'abcdefgabcdefg12')
			 var newtime = new Date().getTime(); 
			if(account && account!=null){
				this.account=account;
			}
			if(password && password!=null){
				this.password=password;
			}
			if(e.lout){
				// console.log('退出登录');
				uni.clearStorage();
				this.autologin=false;
				this.lofinURL="/agent/login/ajax-login"
			}else{
				if(uni.getStorageSync('agentInfo')&& uni.getStorageSync('agentInfo')!=undefined){
					const agentInfo=JSON.parse(this.utils.decrypt(uni.getStorageSync('agentInfo'),'abcdefgabcdefg12'));
					if(agentInfo.sign){
						this.sign=agentInfo.sign;
						this.islogin=agentInfo.auto_login;
					}
					// console.log(agentInfo);
					let times=newtime-(agentInfo.timer+24*60*60*1000)
					// console.log(times);
					if(agentInfo && times<0){
						// console.log('自动登录')//隐藏验证码
						this.autologin=true;
						this.lofinURL="/agent/login/ajax-auto-login"
					}else{
						uni.clearStorage();
						// console.log('手动登录')//显示验证码
						this.autologin=false;
						this.lofinURL="/agent/login/ajax-login"
					}
				}else{
					uni.clearStorage();
					// console.log('手动登录')//显示验证码
					this.autologin=false;
					this.lofinURL="/agent/login/ajax-login"
				}
			}
			
		},
        methods: {
			navTo(){
				window.location.replace(helper.webtoUrl);
			},
			random(){
				this.random_num=new Date().getTime();
			},
			change(){
				if(uni.getStorageSync('agentInfo')){
					var agentdata=JSON.parse(this.utils.decrypt(uni.getStorageSync('agentInfo'),'abcdefgabcdefg12'));
					if(agentdata.agent_id&&this.account!=agentdata.agent_id){
						// console.log('手动登录')//显示验证码
						this.autologin=false;
						this.lofinURL="/agent/login/ajax-login"
					}
				}
				console.log(agentdata);
			},
			//页面跳转
			PageChange: function(e) {
				uni.redirectTo({
					url:e.currentTarget.dataset.cur
					});
			},
			//获取验证码
			changeImg(){
				this.code_url='';
				uni.request({
					url:helper.websiteUrl+'/agent/login/captcha?refresh=refresh&&time_unid='+this.random_num,
					header: {
						'content-type':'application/x-www-form-urlencoded'
					},
					method: 'POST',
					dataType: 'json',
					cache: false,
					data: {},
					success: res => {
						this.code_url=helper.websiteUrl+res.data['url']+'&time_unid='+this.random_num;
						},
					fail: () => {
					},
					complete: () => {}
				});
			},
			//使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
			// 反向使用 top 进行定位，可以避免此问题。
			initPosition() {
                this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
            },
			//登录
			bindLogin() {

                if (this.account.length < 4) {
                    uni.showToast({
                        icon: 'none',
                        title: '账号最短为 4 个字符'
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
				if(!this.autologin){
					if (this.code.length <=0) {
					    uni.showToast({
					        icon: 'none',
					        title: '请输入验证码'
					    });
					    return;
					}
				}
				uni.showLoading({
					title: '登录中'
				});
				this.login();
			},
			login(){
				uni.request({
					url:helper.websiteUrl+this.lofinURL,//
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					dataType: 'json',
					cache: false,
					data: {
						account:this.account,
						password:this.password,
						code:this.code,
						unid:this.random_num,
						autologin:this.islogin,
						sign:this.sign,
					},
					success: res => {
						var curtime = new Date().getTime(); 
						console.log(curtime)
						if(res.data.isSuccess==200){
							console.log(res.data.result);
							uni.setStorageSync('account', this.utils.encrypt(this.account,'abcdefgabcdefg12'));
							uni.setStorageSync('password', this.utils.encrypt(this.password,'abcdefgabcdefg12'));
							if(res.data.result.auto_login!=null&&res.data.result.auto_login!=""){
								this.autologin=res.data.result.auto_login;
							}else{
								this.autologin=0;
							}
							//缓存
							let data={
									id:res.data.result.id,
									agent_id:res.data.result.agent_id,
								    agent_tel:res.data.result.agent_tel,
									herf_pic:res.data.result.herf_pic,
									nickname:res.data.result.nickname,
									token:res.data.result.token,
									href:res.data.result.href,
									timer:curtime,
									auto_login:res.data.result.auto_login,
									sign:res.data.result.sign,
							};
							let encryptdata=this.utils.encrypt(JSON.stringify(data),'abcdefgabcdefg12');
							// console.log(encryptdata)
							uni.setStorage({
								key: 'agentInfo',
								data:encryptdata,
								success: function () {
									setTimeout(function () {
										uni.hideLoading();
									}, 1000);
									uni.redirectTo({
										url: '../tabbar/tabbar'
									});
									
								}
							});
						}else if(res.data.isSuccess==400){
							uni.hideLoading();
							uni.clearStorage();
							this.autologin=false;
							this.account="";
							this.password="";
							this.code="";
							let self=this;
							this.lofinURL="/agent/login/ajax-login"
							uni.showModal({
								showCancel:false,
								content: res.data.message,
								success: function (res) {
									if (res.confirm) {
											self.changeImg();
									}
								}
							});
						}else if(res.data.isSuccess==301){
							uni.hideLoading();
							uni.clearStorage();
							this.autologin=false;
							this.lofinURL="/agent/login/ajax-login"
							this.code="";
							uni.showToast({
							    icon: 'none',
								duration: 2000,
							   title: res.data.message
							});
							this.changeImg();
						}else if(res.data.isSuccess==302){
							uni.clearStorage();
							uni.hideLoading();
							this.lofinURL="/agent/login/ajax-login"
							this.autologin=false;
							this.account="";
							this.password="";
							this.code="";
							uni.showToast({
							    icon: 'none',
								duration: 2000,
							   title: res.data.message
							});
							this.changeImg();
						}else if(res.data.isSuccess==101){
							uni.hideLoading();
							uni.clearStorage();
							this.autologin=false;
							this.lofinURL="/agent/login/ajax-login"
							this.account="";
							this.password="";
							this.code="";
							uni.showToast({
							    icon: 'none',
								duration: 2000,
							   title: res.data.message
							});
							this.changeImg();
						}else if(res.data.isSuccess==100){
							uni.hideLoading();
							uni.clearStorage();
							this.account="";
							this.password="";
							this.code="";
							this.autologin=false;
							uni.showToast({
							    icon: 'none',
								duration: 2000,
							   title: res.data.message
							});
							this.changeImg();
						}
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '网络异常,请稍后重试'
						});
						uni.clearStorage();
					},
					complete: () => {
					}
				});
			},
			
        onReady() {
            this.initPosition();
        }
    },
}
</script>

<style>
	.show{
		display: block;
	}
	.hide{
		display: none;
	}
	.title-bg{
		width: 100%;
		z-index: 2;
		opacity:1;
		position:absolute;
		color:#FFFFFF; 
	}
	.toptab{
		height: 60upx;
	}
	.code-img{
		float: right;
		margin-right: -20upx;
		height: 90upx;
		width: 180upx;
	}
	.input-group{
		margin-top: -2upx;
	}
	.text-olive{
		color: #1bb8b7;
	}
	.primary{
		border-radius:8upx ;
		background:linear-gradient(to right,#0286f7,#1bb8b7);
	}
	.login-btn{
		margin-top: 50upx;
		margin-bottom: 10upx;
		width:98%;
		margin-left: 1%;
	}
	.head{
		height: 230upx;
		background-color: #f1f1f1;
	}
	.head-img{
		padding: 10%;
		margin:0 auto;
	}
	.l-input{
		margin-bottom: 2upx;
		width: 98%;
		margin-left: 1%;
	}
    .action-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .action-row navigator {
        color: #007aff;
        padding: 0 20upx;
    }

    .oauth-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }

    .oauth-image {
        width: 100upx;
        height: 100upx;
        border: 1upx solid #dddddd;
        border-radius: 100upx;
        margin: 0 40upx;
        background-color: #ffffff;
    }

    .oauth-image image {
        width: 60upx;
        height: 60upx;
        margin: 20upx;
    }
</style>
