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
				<m-input class="m-input" type="number" clearable v-model="account" placeholder="请输入手机号或ID"></m-input>
			</view>
			<view class="cu-form-group l-input">
				<!-- <view class="title">密码：</view> -->
				<text class="cuIcon-lock text-olive margin-right-sm"></text>
				<m-input class="m-input" type="password" displayable v-model="password" placeholder="请输入登录密码"></m-input>
			</view>
			<view class="cu-form-group l-input">
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
				// page_url:'',
            }
        },
		onLoad:function(e){
		var ua = navigator.userAgent.toLowerCase();
        if(ua.indexOf("micromessenger") ==  -1){
            // "不是微信端";
			this.ishead=false;
        }else{
			this.ishead=true;
			// "是微信端";
		}
			this.random();
			this.changeImg();
		},
        methods: {
			navTo(){
				window.location.replace(helper.webtoUrl);
			},
			random(){
				this.random_num=new Date().getTime();
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
				uni.request({
					url:helper.websiteUrl+'/agent/login/ajax-login',//
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
					},
					success: res => {
						if(res.data.isSuccess==200){
							//缓存
							uni.setStorage({
								key: 'agentInfo',
								data: {
								id:res.data.result.id,
								agent_id:res.data.result.agent_id,
							    agent_tel:res.data.result.agent_tel,
								herf_pic:res.data.result.herf_pic,
								nickname:res.data.result.nickname,
								token:res.data.result.token,
								href:res.data.result.href
							},
								success: function () {
									uni.redirectTo({
										url: '../tabbar/tabbar'
									});
								}
							});
						}else if(res.data.isSuccess==400){
							this.code="";
							let self=this;
							uni.showModal({
								showCancel:false,
								content: res.data.message,
								success: function (res) {
									if (res.confirm) {
											self.changeImg();
									}
								}
							});
							// uni.showToast({
							//     icon: 'none',
							// 	duration: 2000,
							//    title: res.data.message
							// });
							
						}else if(res.data.isSuccess==301){
							this.code="";
							uni.showToast({
							    icon: 'none',
								duration: 2000,
							   title: res.data.message
							});
							this.changeImg();
						}else if(res.data.isSuccess==302){
							this.code="";
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
