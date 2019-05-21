<template>
	<view class="content">
		<view class="cu-bar bg search bg-gradual-blue fixed">
			<view class="action" @tap="navTo()">
				<text class="cuIcon-back text-white"></text>
			</view>
			<view class=" title-text text-center text-xl bg-none">推广</view>
			<view class="action">
			</view>
		</view>
		<view class="top"></view>
		<view class="banner bg-white">
			<view class="ths bg-white"></view>
			<view class="img bg-white">
				<image :src="src" mode="" @tap="showPhoto" data-target="Image"></image>
			</view>
			<view class="tgtit">推广链接：<text class="tugurl">{{url}}</text></view>
			<view class="sharbuttn">
				<view class="btn" @tap="showPhoto" data-target="Image">查看推广图</view>
				<view class="btn" @click="copyurl">复制推广链接</view>
			</view>

			<view class="cu-modal" :class="modalName=='Image'?'show':''">
				<view class="cu-dialog">
					<view class="bg-img">
						<text class="text-left ">长按图片复制，或长按识别二维码</text>
						<view class="action close-btn" @tap="hideModal">
							<text class="cuIcon-close text-black"></text>
						</view>
						<image :src="src" class="shareimg"></image>
					</view>
					<view class="cu-bar bg-white">
						<view class="action margin-0 flex-sub  solid-left text-black" @tap="hideModal">关闭</view>
					</view>
				</view>
			</view>



			<view class="text-center text-bold text-xxl bg-gradual-green" style="height: 5upx;margin-top: 20upx;"></view>
			<view class="sharbuttn">
				<!-- <view class="btn" @click="save">预览链接</view> -->
				<view class="bgs text-bold text-xxl textma bg-white text-orange">
					<text class=" text-bold text-green">推广码：</text>{{code}}</view>
				<button class="btn" @click="copyid">复制推广码</button>
			</view>
			<!-- <button class="btn" @click="share">分享</button> -->
			<view class="text-center margin-top-xl">可分享至</view>
			<view class="shartitle"></view>

			<view class="sharapk">
				<!-- @click="share" -->
				<view>
					<image src="../../static/img/weact.png"></image>
				</view>
				<view>
					<image src="../../static/img/shar.png"></image>
				</view>
				<view>
					<image src="../../static/img/qq.png"></image>
				</view>
			</view>
			<!-- <view class="text-center">
			<view class="con">1.好友识别二维码通过手机号进行注册</view>
			<view class="con">2.也可分享此页面到微信或QQ邀请好友注册</view>
			<view class="con">3.注册完成后该注册的玩家将绑定到您的代理ID下,您将获得该玩家产生的收益</view>
		</view> -->

			<view class="bottom">
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
				code: '',
				token: '',
				src: '',

				modalName: null,
				providerList: [],
				type: 0,
			}
		},
		onLoad() {
			const agentInfo = uni.getStorageSync('agentInfo');
			if (agentInfo) {
				this.token = agentInfo.token;
				this.url = agentInfo.href + 'inviterId=' + agentInfo.agent_id + '&agentId=' + agentInfo.agent_id;
				this.code = agentInfo.agent_id;
			}
			uni.request({
				url: this.COMMON.httpUrl+ '/agent/tuiguang/ajax-share-photo',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				dataType: 'json',
				cache: false,
				data: {
					token: this.token,
				},
				success: res => {
					if (res.data.code == 200) {
						this.src = this.COMMON.httpUrl+'/agent/tuiguang/' + res.data.data.src;
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			navTo() {
				uni.redirectTo({
					url: '../tabbar/tabbar?page=mains'
				});
			},
			showPhoto(e) {
				this.savephoto();
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			copyurl() {
				uni.setClipboardData({
					data: this.url,
					success: function(data) {
						uni.showToast({
							icon: 'none',
							title: '复制成功'
						});
					},
					fail: function(err) {
						uni.showToast({
							icon: 'none',
							title: '网络异常,请稍后重试'
						});
					},
					complete: function(res) {

					},
				})
			},
			copyid() {
				uni.setClipboardData({
					data: this.code,
					success: function(data) {
						uni.showToast({
							icon: 'none',
							title: '复制成功'
						});
					},
					fail: function(err) {
						uni.showToast({
							icon: 'none',
							title: '网络异常,请稍后重试'
						});
					},
					complete: function(res) {

					},
				})
			},
			savephoto() {
				uni.saveImageToPhotosAlbum({
					filePath: this.src,
					success: function() {
						console.log('save success');
					},
				})
			}

		}
	}
</script>

<style>
	.text-ds {
		color: #000000;
	}

	.close-btn {
		float: right;
		margin-right: 10upx;
	}

	.img-title {
		height: 5%;
		background-color: #EBEEF5;
	}

	.shareimg {
		background-size: cover;
		width: 100%;
		height: 95%;
	}

	.cu-modal {
		height: 100%;
	}

	.cu-dialog {
		height: 90%;
	}

	.bg-img {
		background-color: #ffffff;
		height: 100%;
	}

	.ths {
		background-color: #ffffff;
		height: 70upx;
	}

	.bg-none {
		background-color: none;
	}

	.con {
		text-align: left;
		width: 70%;
		margin-left: 15%;
	}

	.textma {
		margin-top: 0upx;
	}

	.tugurl {
		color: #999;
	}

	.sharbuttn {
		display: flex;
		justify-content: center;
	}

	.shartitle {
		width: 80%;
		text-align: center;
		margin-left: 10%;
		border-bottom: 1px solid #dddddd;
		position: relative;
		height: 20upx;
	}

	.tgtit {
		text-align: center;
	}

	.shartitle view {
		height: 50upx;
		line-height: 50upx;
		font-size: 28upx;
		color: #fff;
		width: 120upx;
		margin: 32upx auto;
		position: absolute;
		background: #fff;
		left: 50%;
		margin-left: -60upx;
	}

	.sharapk {
		display: flex;
		justify-content: center;
		margin: 20upx auto
	}

	.sharapk view {
		margin: 40upx;
	}

	.sharapk view image {
		height: 80upx;
		width: 80upx;
	}

	.content {
		width: 100%;
		background-color: #ffffff;
	}

	.top {
		width: 100%;
		height: 0upx;
		background-size: 100%;
		background-position: center center;
	}

	.banner {
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 0upx 0upx 0 0;
		margin-top: 0upx;
	}

	.banner dl {
		margin-top: 0upx;
	}

	.banner dl dt {
		text-align: center;
	}

	.banner dl dt image {
		width: 0upx;
		height: 0upx;
		border-radius: 80%;
	}

	.banner dl dd {
		text-align: center;
	}

	.img {
		width: 300upx;
		height: 430upx;
		background-color: #FFFFFF;
		margin: 0 auto;
		margin-top: 50upx;
		margin-bottom: 50upx;
	}

	.img image {
		width: 100%;
		height: 100%;
	}

	.btn {
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

	.bgs {
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

	.bottom {
		width: 100%;
		height: 100upx;
		/* 	background: url(../../static/img/beij.png) no-repeat; */
		background-position: left bottom;
		/* 设置背景图片位置 */
		background-size: 20%;
	}

	.bottom ul {
		padding-left: 40upx;
		box-sizing: border-box;
	}

	.bottom ul li {
		width: 100%;
		height: 60upx;
	}
</style>
