<template>
	<view  class="content">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">个人信息</block>
			<block slot="right"></block>
		</cu-custom>
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class="title">姓 名：</text>
				<text class="content" >
					<text class="text-grey">李白</text>
				</text>
			</view>
			<view class="cu-item" :class="0?'arrow':''">					
			<text class="title">手机号：</text>
				<text class=" content" >
					<text class="text-grey">17777777777</text>
				</text>
				<text class=" btn-bg shadow" type="text">修改</text>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class="title">I D ：</text>
				<text class=" content" >
					<text class="text-grey">1231</text>
				</text>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class="title">昵 称：</text>
				<text class=" content" >
					<text class="text-grey">AAAAAA</text>
				</text>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class="title">姓 别：</text>
				<text class=" content" >
					<text class="text-grey">男</text>
				</text>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class="title">邮 箱：</text>
				<text class=" content" >
					<text class="text-grey">AAAAAA@qq.cn</text>
				</text>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class="title">Q Q ：</text>
				<text class=" content" >
					<text class="text-grey">17777777</text>
				</text>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class="title">地 区：</text>
				<text class=" content" >
					<text class="text-grey">北京市-市辖区-东城区</text>
				</text>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class="title">地 址：</text>
				<text class=" content" >
					<text class="text-grey">北京市-市辖区-东城区</text>
				</text>
			</view>
			
			<view>
				<button class="cu-btn bg-blue margin-tb-sm lg btn" type="button" @click="ToPage">编辑</button>
			</view>
		</view>
			
	</view>
</template>

<script>
export default {
		data() {
			return {
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
			};
		},
		methods: {
			ToPage: function() {
					uni.navigateTo({
						url: '../about/editinfo'
					});
			}
		}
	}
</script>

<style>
	.menu{
		margin-top: 10upx;
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
		width: 120upx;
	}
	.btn-bg{
		background: #fff;
		color: #007AFF;
	}

</style>