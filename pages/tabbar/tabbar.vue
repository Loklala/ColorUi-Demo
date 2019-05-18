<template>
	<view>
		<!-- 控制视图跳跳转 -->
<!-- 			<basics v-if="PageCur=='basics'"></basics> -->
<!-- 			<components v-if="PageCur=='component'"></components> -->
			<mains v-if="PageCur=='mains'"></mains>
			<share v-if="PageCur=='share'"></share>
			<earn v-if="PageCur=='earn'"></earn>
<!-- 			<burse v-if="PageCur=='burse'"></burse> -->
			<about v-if="PageCur=='about'"></about>

		<view class="cu-bar tabbar bg-white shadow foot">
			<!-- <view class="action" @click="NavChange" data-cur="basics">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/basics' + [PageCur=='basics'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='basics'?'text-green':'text-gray'">元素</view>
			</view>
 -->
<!-- 			<view class="action" @click="NavChange" data-cur="component">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/component' + [PageCur == 'component'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='component'?'text-green':'text-gray'">组件</view>
			</view> -->
<!-- 			<view class="action" @click="NavChange" data-cur="plugin">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/plugin' + [PageCur == 'plugin'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='plugin'?'text-green':'text-gray'">扩展</view>
			</view> -->
			
			<view class="action " @click="NavChange" data-cur="mains">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/mains' + [PageCur == 'mains'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='mains'?'text-green':'text-gray'">首页</view>
			</view>
			
			<view class="action" @click="NavChange" data-cur="earn">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/earn' + [PageCur == 'earn'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='earn'?'text-green':'text-gray'">收益</view>
			</view>
			
<!-- 			<view class="action" @click="NavChange" data-cur="burse">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/burse' + [PageCur == 'burse'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='burse'?'text-green':'text-gray'">钱包</view>
			</view> -->
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
				PageCur: 'mains',
				data:'',
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			},
		},
		onLoad(){
			// console.log('*************')
			// console.log(window["KeyValueManager"]);
			try {
				const value = uni.getStorageSync('agentInfo');
				if (value) {
					this.data=value;
					console.log(value);
				}
			} catch (e) {
				// error
			}
		}
	}
</script>

<style>

</style>
