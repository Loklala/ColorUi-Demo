<template>
    <view class="content">
<!-- 		<cu-custom class="toptab" bgColor="bg-gradual-blue" :isBack="false">
			<block slot="backText"></block>
			<block slot="content">皮蛋游戏代理系统</block>
			<block slot="right"></block>
		</cu-custom> -->

<!-- 		<view class="cu-form-group head"> 
				<view class="cu-avatar xl round margin-left head-img" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
		</view> -->
		<image src="../../static/img/login-logo.jpg" 
		 mode="widthFix" class="response"></image>
        <view class="input-group">
			<view class="cu-form-group l-input">
				<!-- <view class="title">账号：</view> -->
				<text class="cuIcon-my text-olive"></text>
				<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></m-input>
			</view>
			<view class="cu-form-group l-input">
				<!-- <view class="title">密码：</view> -->
				<text class="cuIcon-lock text-olive"></text>
				<m-input class="m-input" type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
			<view class="cu-form-group l-input">
				<!-- <view class="title">验证码：</view> -->
				<!-- <text class="cuIcon-mark text-olive"></text> -->
				<text class="cuIcon-safe text-olive"></text>
			<m-input class="m-input" type="text" clearable focus v-model="code" placeholder="输入验证码"></m-input>
				<image :src="code_url" class="code-img" @click="changeImg"></image>	
			</view>
        </view>
        <view class="btn-row login-btn">
            <button type="primary"  class="primary" @tap="bindLogin">登录</button>
        </view>
        <view class="action-row">
            <navigator url="../login/reg" >注册账号</navigator>
            <text>|</text>
            <navigator url="../login/pwd" >忘记密码</navigator>
        </view>
        <view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
            <view class="oauth-image" v-for="provider in providerList" :key="provider.value">
                <image :src="provider.image" @tap="oauth(provider.value)"></image>
            </view>
        </view>
    </view>
</template>

<script>
	var self;
    import service from '../../service.js';
    import mInput from '../../components/m-input.vue'
	
    export default {
        components: {
            mInput
        },
        data() {
			lists:[],
			self=this
            return {
				code_url:'http://192.168.0.199:8080/agent/login/captcha?',
				disableScroll:true,
                providerList: [],
                hasProvider: false,
                account: '',
                password: '',
                positionTop: 0,
				code:'',
				
				random_num:0,
            }
        },
		onLoad:function(){
			this.random_num=new Date().getTime();
			console.log('random_num'+this.random_num);
			this.changeImg();
		},
        methods: {
			//获取验证码
			changeImg(){
				this.code_url="";
				var rand= new Date().getTime();
				this.random_num= this.random_num+1;
				uni.request({
					url: 'http://192.168.0.199:8080/agent/login/captcha?refresh= ',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					dataType: 'json',
					cache: false,
					data: {},
					success: res => {
						console.log(res);
						this.code_url='http://192.168.0.199:8080'+res.data['url'];
						console.log(this.code_url)
					},
					fail: () => {},
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
				uni.request({
					url: 'http://192.168.0.199:8080/agent/login/ajax-login',
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
					},
					success: res => {
						console.log(res)
						if(res.data.isSuccess==200){
							const data = {
								id:res.data.result.id,
								agent_id:res.data.result.agent_id,
							    agent_tel:res.data.result.agent_tel,
								nickname:res.data.result.nickname,
							}
							window["KeyValueManager"] = {};
							window["KeyValueManager"]["playerInfo"] = {
								id:data.id,
								agent_id:data.agent_id,
								agent_tel:data.agent_tel,
								nickname:data.nickname,
							};
							//缓存
							uni.setStorage({
								key: 'agentInfo',
								data: {
									id:data.id,
									agent_id:data.agent_id,
									agent_tel:data.agent_tel,
									nickname:data.nickname,
								},
								success: function () {
									uni.redirectTo({
										url: '../index/index'
									});
								}
							});
							
							
							// service.addUser(data);
						}else{
							uni.showToast({
							    icon: 'none',
							   title: res.data.message
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
				
				
				
				
                /**
                 * 下面简单模拟下服务端的处理
                 * 检测用户账号密码是否在已注册的用户列表中
                 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
                 */
    //             const data = {
    //                 account: this.account,
    //                 password: this.password,
				// 	
    //             };
    //             const validUser = service.getUsers().some(function (user) {
    //                 return data.account === user.account && data.password === user.password;
    //             });
				// console.log(validUser);
    //             if (validUser) {
    //                 this.toMain(this.account);
				// 	// uni.redirectTo({
				// 	// 	url: '../index/index?account='+this.account
				// 	// });
				// 	
    //             } else {
    //                 uni.showToast({
    //                     icon: 'none',
    //                     title: '用户账号或密码不正确',
    //                 });
    //             }
            },
			login(){
				uni.request({
					url: 'http://192.168.0.199/agent/login/ajax-login',
					method: 'POST',
					dataType: 'json',
					cache: false,
					data: {
						username:this.account,
						pwd:this.password,
						verify_code:this.code,
					},
					success: res => {
						console.log(res)
						if(res.data.isSuccess==200){
							uni.showToast({
							    icon: 'none',
							    title: res.data.message
							});
							
							
							
						}else{
							uni.showToast({
							    icon: 'none',
							   title: res.data.message
							});
						}
					},
					fail: () => {
						
					},
					complete: () => {}
				});
			},
            toMain(userName) {
                this.login(userName);
                /**
                 * 强制登录时使用reLaunch方式跳转过来
                 * 返回首页也使用reLaunch方式
                 */
                if (this.forcedLogin) {
                    // uni.reLaunch({
                    //     url: '../main/main',
                    // });
					uni.redirectTo({
						url: '../index/index?account='+this.account
					});
                } else {
                    uni.navigateBack();
                }

            }
        },
        onReady() {
            this.initPosition();
            this.initProvider();
        }
    }
</script>

<style>
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
