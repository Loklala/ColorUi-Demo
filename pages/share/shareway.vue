<template>
	<view class="content" >
		<view class="cu-bar bg search bg-gradual-blue fixed">
			<view class="action" @tap="navTo()">
				<text class="cuIcon-back text-white"></text>
			</view>
			<view class=" title-text text-center text-xl bg-none">推广</view>
			<view class="action">
			</view>
		</view>
	<view class="top"></view>
	<view class="banner ">
		<view class="ths"></view>
		<view class="img">
			<image src="../../static/img/ewm.jpg" mode=""></image>
		</view>
		<view class="tgtit">推广链接：<text class="tugurl">http://sishuquan.com?id=3228969</text></view>
		<view class="sharbuttn">
			<view class="btn" @click="save">保存二维码</view>
			<view class="btn" @click="sharurl">复制推广链接</view>
		</view>
		<view class="text-center text-bold text-xxl bg-gradual-green" style="height: 5upx;margin-top: 20upx;"></view>
		<view class="sharbuttn">
			<!-- <view class="btn" @click="save">预览链接</view> -->
			<view class="bgs text-bold text-xxl textma bg-white text-orange"><text class=" text-bold text-green">推广码：</text>1234</view>
			<view class="btn" @click="sharurl">复制推广码</view>
		</view>
		<!-- <button class="btn" @click="share">分享</button> -->
		<view class="shartitle"><view>可分享至</view></view>
		<view class="sharapk" >
			<!-- @click="share" -->
			<view><image src="../../static/img/weact.png"></image></view>
			<view><image src="../../static/img/shar.png"></image></view>
			<view><image src="../../static/img/qq.png"></image></view>
		</view>
		<view class="text-center">
			<view class="con">1.好友识别二维码通过手机号进行注册</view>
			<view class="con">2.也可分享此页面到微信或QQ邀请好友注册</view>
			<view class="con">3.注册完成后该注册的玩家将绑定到您的代理ID下,您将获得该玩家产生的收益</view>
		</view>
		
		
		<view class="bottom">
			<!-- <ul>
				<li>1、好友识别二维码通过手机号进行注册</li>
				<li>2、也可分享此页面到微信或QQ邀请好友注册</li>
				<li>3、注册完成后您即可得到相应的积分</li>
			</ul> -->
		</view>
	</view>
	
	</view>
</template>

<script>
	export default {
		data(){
			return {
				providerList:[],				
				sourceLink: 'http://yunzhujiao.cn/bind_pub/index.html',		
				type:0,
			}
		},
		// onLoad() {
		// 	// this.version = plus.runtime.version;
		// 	uni.getProvider({
		// 		service: 'share',
		// 		success: (e) => {
		// 			let data = [];
		// 			for (let i = 0; i < e.provider.length; i++) {
		// 				switch (e.provider[i]) {
		// 					case 'weixin':
		// 						data.push({
		// 							name: '分享到微信好友',
		// 							id: 'weixin'
		// 						})
		// 						data.push({
		// 							name: '分享到微信朋友圈',
		// 							id: 'weixin',
		// 							type: 'WXSenceTimeline'
		// 						})
		// 						break;
		// 					case 'qq':
		// 						data.push({
		// 							name: '分享到QQ',
		// 							id: 'qq'
		// 						})
		// 						break;
		// 					default:
		// 						break;
		// 				}
		// 			}
		// 			this.providerList = data;
		// 		},
		// 		fail: (e) => {
		// 			console.log('获取登录通道失败'+ JSON.stringify(e));
		// 		}
		// 	});
		// },
		// 
		methods:{
			navTo() {
				uni.redirectTo({
					url: '../index/index'
				});
			},
			//复制分享链接
			
			// sharurl(){
			// 	uni.setClipboardData({
			// 		data: 'http://sishuquan.com?id=3228969',
			// 		success: function () {
			// 			console.log('success');
			// 			uni.showModal({
			// 				title: '复制成功',
			// 				content: '内容已复制到粘贴板，可前往其他应用粘贴查看。', 
			// 				showCancel:false,
			// 				success: function(res) {
			// 					if (res.confirm) {											 
			// 						//console.log('用户点击确定');
			// 					} else if (res.cancel) {
			// 						//console.log('用户点击取消');
			// 					}
			// 				}
			// 			});
			// 		}
			// 	});
			// },
			// 
			//保存图片到相册
			
			save(){
			// 	uni.showActionSheet({
			// 		itemList:['保存图片到相册'],
			// 		success: () => {
			// 			plus.gallery.save('http://pds.jyt123.com/wxtest/logo.png', function() {
			// 				uni.showToast({
			// 					title:'保存成功',
			// 					icon:'none'
			// 				})
			// 			}, function() {
			// 				uni.showToast({
			// 					title:'保存失败，请重试！',
			// 					icon:'none'
			// 				})
			// 			});
			// 		}
			// 	})
			},
			
			
			
			share(e) {
			// 	if (this.providerList.length === 0) {
			// 		uni.showModal({
			// 			title: '当前环境无分享渠道!',
			// 			showCancel: false
			// 		})
			// 		return;
			// 	}
			// 	let itemList = this.providerList.map(function (value) {
			// 		return value.name
			// 	})
			// 	 
			// 	console.log(itemList)
			// 	
			// 	uni.showActionSheet({
			// 		itemList: itemList,
			// 		success: (res) => {
			// 			console.log(this.providerList[res.tapIndex].id)
			// 			if(this.providerList[res.tapIndex].id=='qq'){
			// 				this.type=1
			// 			}else{
			// 				this.type=0
			// 			}
			// 			 uni.share({
			// 			 	provider: this.providerList[res.tapIndex].id,
			// 			 	scene: this.providerList[res.tapIndex].type && this.providerList[res.tapIndex].type === 'WXSenceTimeline' ? 'WXSenceTimeline' : "WXSceneSession",
			// 			 	type: this.type,
			// 			 	title:'耘助教',
			// 			 	summary: '耘助教是一个在线教育应用平台',
			// 			 	imageUrl:'http://pds.jyt123.com/wxtest/logo.png',
			// 			 	href:"https://m3w.cn/uniapp",
			// 			 	success: (res) => {
			// 			 		console.log("success:" + JSON.stringify(res));
			// 			 	},
			// 			 	fail: (e) => {
			// 			 		uni.showModal({
			// 			 			content: e.errMsg,
			// 			 			showCancel:false
			// 			 		})
			// 			 	}
			// 			 });
			// 		}
			// 	})
			//  
			},
			openLink() {
				// plus.runtime.openWeb(this.sourceLink)
			}
		}
	}
	
	
</script>

<style>
	.ths{
		height: 70upx;
	}
	.bg-none{
		background-color: none;
	}
	.con{
		text-align: left;
		width: 70%;
		margin-left: 15%;
	}
	.textma{
		margin-top: 0upx;
	}
	.tugurl{
		color: #999;
	}
	.sharbuttn{
		display: flex;
		justify-content: center;
	}
	.shartitle{
		    width: 80%;
			text-align: center;
			margin-left: 10%;
			border-bottom: 1px solid #dddddd;
			position: relative;
			height: 60upx;
	}
	.tgtit{
		text-align: center;
	}
	.shartitle view{
		    height: 50upx;
			line-height: 50upx;
			font-size: 28upx;
			color: #999;
			width: 120upx;
			margin: 32upx auto;
			position: absolute;
			background: #fff;
			left: 50%;
			margin-left: -60upx;
	}
	.sharapk{
	 display: flex;
	 justify-content: center;
	 margin: 20upx auto
	}
	.sharapk view{
		margin: 40upx;
	}
	.sharapk view image{
		height: 80upx;
		width: 80upx;
	}
	.content{
		width: 100%;
		background-color: #ffffff;
	}
	.top{
		width: 100%;
		height:0upx;
		background: url(http://pds.jyt123.com/wxtest/banner.png) no-repeat ;
		background-size:100% ;
		background-position:center center;
	}
	.banner{
		width: 100% ;
		background-color: #FFFFFF;
		border-radius:0upx 0upx 0 0;
		margin-top: 0upx;
	}
	.banner dl{
		margin-top: 0upx;
	}
	.banner dl dt{
		text-align: center;
	}
	.banner dl dt image{
		width: 0upx;
		height: 0upx;
		border-radius:80% ;
	}
	.banner dl dd{
		text-align: center;
	}
	.img{
		width: 300upx;
		height: 300upx;
		background-color: red;
		margin: 0 auto;
		margin-top: 50upx;
	}
	.img image{
		width: 100%;
		height: 100%;
	}
	.btn{
		width: 260upx;
		height: 60upx;
		line-height: 60upx;
		margin: 0 auto;
		margin-top: 60upx;
		border-radius: 40upx;
		border: 0;
		font-size: 26upx;
		outline: 0;
		background: #33b17b;
		color: #FFFFFF;
		text-align: center;
	}
	
	.bgs{
		border: 1px solid #33b17b;
		width: 260upx;
		height: 60upx;
		line-height: 60upx;
		margin: 0 auto;
		margin-top: 60upx;
		border-radius: 40upx;
		font-size: 33upx;
		outline: 0;
		text-align: center;
	}
	
	.bottom{
		width: 100%;
		height: 100upx;
	/* 	background: url(../../static/img/beij.png) no-repeat; */
		background-position:left bottom;/* 设置背景图片位置 */
		background-size: 20%;
	}
	.bottom ul{
		padding-left: 40upx;
		box-sizing: border-box;
	}
	.bottom ul li{
		width: 100%;
		height: 60upx;
	}
</style>
