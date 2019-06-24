<template>
	<view  class="content">
		<view class="cu-bar bg-gradual-blue search" :style="[{height:CustomBar + 'px'}]">
			<view class="action" @click="navTo()"><text class="cuIcon-back"></text>返回</view>
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
					<text class="text-grey">{{agent_id}}</text>
				</text>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class="title">昵 称：</text>
				<text class=" content" >
					<text class="text-grey">{{nackName}}</text>
				</text>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class="title">性 别：</text>
				<text class=" content" >
					<text class="text-grey">{{sex}}</text>
				</text>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<text class="title">邮 箱：</text>
				<text class=" content" >
					<text class="text-grey">{{email}}</text>
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
		import helper from '../../common/helper.js';  
export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				
				agent_id:'',
				token:'',
				name:'',
				tel:'',
				nackName:'',
				sex:'',
				email:'',
				qq:'',
				area:'',
				address:'',
				list:[],
			};
		},
		onLoad() {
			if(uni.getStorageSync('agentInfo')){
					const value=JSON.parse(this.utils.decrypt(uni.getStorageSync('agentInfo'),'abcdefgabcdefg12'));
					if (value) {
						this.token=value.token;
					}
				}
			uni.request({
				url:helper.websiteUrl+'/agent/agent/ajax-agent-info',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				dataType: 'json',
				cache: false,
				data: {
					token:this.token,
				},
				success: res => {
					this.list=res;
					let data=this.list.data;
					if(data.code==200){
						this.name=data.data.agent_name;
						this.tel=data.data.agent_tel;
						this.nackName=data.data.nickname;
						if(data.data.sex=='0'){
							this.sex='男';
						}else if(data.data.sex=='1'){
							this.sex='女';
						}
						this.agent_id=data.data.agent_id;
						
						if(data.data.email==null){
							this.email='-暂未填写-';
						}else{
							this.email=data.data.email;
						}
						
						if(data.data.qq==null){
							this.qq='-暂未填写-';
						}else{
							this.qq=data.data.qq;
						}
						
						if(data.data.area==null){
							this.area='-暂未选择-';
						}else{
							this.area=data.data.area;
						}
						if(data.data.address==null){
							this.address='-暂未填写-';
						}else{
							this.address=data.data.address;
						}
						
					}else if(data.code==-200){
						uni.showModal({
								showCancel:false,
								content: '用户信息已失效，请重新登陆',
								success: function (res) {
									if (res.confirm) {
											uni.redirectTo({
												url: '../login/login?lout=1'
											});
									}
								}
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
		},
		methods: {
			ToPage: function() {
					uni.redirectTo({
						url: '../about/editinfo'
					});
			},
			navTo:function(){
				uni.redirectTo({
					url: '../tabbar/tabbar?page=about'
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