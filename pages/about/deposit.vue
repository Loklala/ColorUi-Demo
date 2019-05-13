<template>
	<view  class="content">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">提现账号</block>
			<block slot="right"></block>
		</cu-custom>
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
			<view class="cu-bar bg-white solid-bottom bg">
				<view class="action">
					<text class='cuIcon-newsfill text-blue icon-title'></text>
					账号信息
				</view>
				<view>
					<button type="default" class="edit-btn" @click="editdeposit">编辑</button>
				</view>
			</view>
			<view class="cu-item" :class="0?'arrow':''">
				<text class='cuIcon-peoplelist text-blue icon-title'></text>
			<text class="title">姓名：</text>
				<text class=" content" >
					<text class="text-grey">{{name}}</text>
				</text>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class='cuIcon-shake text-blue icon-title'></text>
				<text class="title">类型：</text>
				<text class="content" >
					<text class="text-grey">{{payname}}</text>
				</text>
			</view>
			
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class='cuIcon-brand text-blue icon-title'></text>
				<text class="title">账号：</text>
				<text class=" content" >
					<text class="text-grey">{{payaccount}}</text>
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
						<text class=" content ">
							<text class="tip-text">
								1.确保姓名为本人真实姓名。
							</text >
							<text class="tip-text">
								2.确保账号为可转账账号。
							</text>
							<text class="tip-text">
								3.确保账户类型和账号一致。
							</text>
						</text>
					</view>	
				</view> 

	</view>
</template>

<script>
export default {
		data() {
			return {
				name:"李白",
				payname:"微信",
				payaccount:"LIBAI001WEIXIN",
				
				menuBorder: true,
				menuArrow: false,
				menuCard: true,
			};
		},
		methods: {
			editdeposit: function() {
					uni.navigateTo({
						url: '../about/editdeposit'
					});
			}
			
		}
	}
</script>

<style>
	.tips{
		/* text-indent:5upx; */
		color: red;
	}
	.tip-text{
		color: #444444;
		text-indent:20%;
		display: block;
		width: 100%;
	}
	.edit-btn{
		background: linear-gradient(to right,#1cbbb4,#1cbbb4);
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
		background: linear-gradient(to right,#3396e9,#1ab7b9);
		width: 96%;
		margin-left: 2%;
		margin-top: 50upx;
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