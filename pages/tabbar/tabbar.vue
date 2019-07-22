<template>
	<view>
		<!-- 控制视图跳跳转 -->

			<mains v-if="PageCur=='mains'"></mains>
			<earn v-if="PageCur=='earn'"></earn>
			<about v-if="PageCur=='about'"></about>
			<proxyrechage v-if="PageCur=='proxyrechage'"></proxyrechage>
			
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action " @click="NavChange" data-cur="mains">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/mains' + [PageCur == 'mains'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='mains'?'text-green':'text-gray'">首页</view>
			</view>
			
			<!-- <view class="action" @click="NavChange" data-cur="proxyrechage">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/proxyrechage' + [PageCur == 'proxyrechage'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='proxyrechage'?'text-green':'text-gray'">代理代充</view>
			</view> -->
			
			<view class="action" @click="NavChange" data-cur="earn">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/earn' + [PageCur == 'earn'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='earn'?'text-green':'text-gray'">收益</view>
			</view>
			<view class="action" @click="NavChange" data-cur="about">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/about' + [PageCur == 'about'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='about'?'text-green':'text-gray'">我的</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: 'proxyrechage',
				data:'',
			}
		},
		methods: {
			NavChange: function(e) {
				console.log(e.currentTarget.dataset.cur)
				this.PageCur = e.currentTarget.dataset.cur
			},
		},
		onLoad:function (e) {
			this.PageCur = e.page;
			if(e.page==null){
				this.PageCur ='mains'
			}
		}
	}
</script>

<style>

</style>
