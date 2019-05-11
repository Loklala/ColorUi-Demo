<template>
	<view>
		<!-- 控制视图跳跳转 -->
<!-- 			<basics v-if="PageCur=='basics'"></basics>
			<components v-if="PageCur=='component'"></components>
			<plugin v-if="PageCur=='plugin'"></plugin>
			<about v-if="PageCur=='about'"></about> -->
			<basics v-if="PageCur=='basics'"></basics>
			<components v-if="PageCur=='component'"></components>
			<share v-if="PageCur=='share'"></share>
			<burse v-if="PageCur=='burse'"></burse>
			<about v-if="PageCur=='about'"></about>


		<!-- <view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="basics">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/basics' + [PageCur=='basics'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='basics'?'text-green':'text-gray'">元素</view>
			</view>

			<view class="action" @click="NavChange" data-cur="component">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/component' + [PageCur == 'component'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='component'?'text-green':'text-gray'">组件</view>
			</view>
			<view class="action" @click="NavChange" data-cur="plugin">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/plugin' + [PageCur == 'plugin'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='plugin'?'text-green':'text-gray'">扩展</view>
			</view>
			<view class="action" @click="NavChange" data-cur="about">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/about' + [PageCur == 'about'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='about'?'text-green':'text-gray'">我的</view>
			</view>
		</view> -->
		
		
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="basics">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/basics' + [PageCur=='basics'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='basics'?'text-green':'text-gray'">元素</view>
			</view>

			<view class="action" @click="NavChange" data-cur="component">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/component' + [PageCur == 'component'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='component'?'text-green':'text-gray'">组件</view>
			</view>
<!-- 			<view class="action" @click="NavChange" data-cur="plugin">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/plugin' + [PageCur == 'plugin'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='plugin'?'text-green':'text-gray'">扩展</view>
			</view> -->
			
			<view class="action" @click="NavChange" data-cur="share">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/share' + [PageCur == 'share'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='share'?'text-green':'text-gray'">推广</view>
			</view>
			
			<view class="action" @click="NavChange" data-cur="burse">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/burse' + [PageCur == 'burse'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='burse'?'text-green':'text-gray'">钱包</view>
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
				PageCur: 'basics'
			}
		},
		methods: {
			NavChange: function(e) {
				console.log(e.currentTarget.dataset.cur);
				this.PageCur = e.currentTarget.dataset.cur
			},
		},
		onLoad() {
			// this.WeixinJSBridge.call('hideToolbar');
			// if (typeof WeixinJSBridge == "undefined"){
			// 	if( document.addEventListener ){
			// 		document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
			// 	}else if (document.attachEvent){
			// 		document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
			// 		document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
			// 	}
			// }else{
			// 	onBridgeReady();
			// }
		}
	}
</script>

<style>

</style>
