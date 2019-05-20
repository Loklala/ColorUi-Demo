<template>
	<view  class="content">
		<view class="cu-bar bg-gradual-blue search" :style="[{height:CustomBar + 'px'}]">
			<view class="action" @click="navTo()"><text class="cuIcon-back"></text></view>
			<view class="content">
				个人信息
			</view>
			<view class="action">
			</view>
		</view>
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class="title">姓 名：</text>
				<text class="content" >
					<text class="text-grey">{{name}}</text>
				</text>
			</view>
			<view class="cu-item" :class="0?'arrow':''">					
			<text class="title">手机号：</text>
				<text class=" content" >
					<text class="text-grey">{{tel}}</text>
				</text>
				<!-- <text class=" btn-bg shadow" type="text">修改</text> -->
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
					<text class="text-grey">{{nackName}}</text>
				</text>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class="title">姓 别：</text>
				<text class=" content" >
					<text class="text-grey">{{sex}}</text>
				</text>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class="title">邮 箱：</text>
				<text class=" content" >
					<text class="text-grey">{{email}}.cn</text>
				</text>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class="title">Q Q ：</text>
				<text class=" content" >
					<text class="text-grey">{{qq}}</text>
				</text>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class="title">地 区：</text>
				<text class=" content" >
					<text class="text-grey">{{area}}</text>
				</text>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class="title">地 址：</text>
				<text class=" content" >
					<text class="text-grey">{{address}}</text>
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
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				id:'',
				name:'李白',
				tel:'17777777777',
				nackName:'111',
				sex:'男',
				email:'123@qq.com',
				qq:'17777777',
				area:'北京市-市辖区-东城区',
				address:'北京市-市辖区-东城区',
				list:[],
			};
		},
		onLoad() {
			const value = uni.getStorageSync('agentInfo');
			if (value) {
				this.id=value.id;
			}
			uni.request({
				url: 'http://192.168.0.199:8080/agent/agent/ajax-agent-info',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				dataType: 'json',
				cache: false,
				data: {
					token:this.token,
					id:this.id,
				},
				success: res => {
					this.list=res;
					let data=this.list.data;
					console.log(data);
					if(data.isSuccess==200){
						this.name=data.result.agent_name;
						this.tel=data.result.agent_tel;
						this.nackName=data.result.nickname;
						if(data.result.sex=='0'){
							this.sex='男';
						}else if(data.result.sex=='1'){
							this.sex='女';
						}
						this.email=data.result.email;
						this.qq=data.result.qq;
						this.area=data.result.area;
						this.address=data.result.address;
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
		},
		methods: {
			ToPage: function() {
					uni.redirectTo({
						url: '../about/editinfo'
					});
			},
			navTo:function(){
				uni.redirectTo({
					url: '../tabbar/tabbar'
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