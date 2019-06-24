<template>
	<view  class="content">
		<view class="cu-bar bg-gradual-blue search" :style="[{height:CustomBar + 'px'}]">
			<view class="action" @click="navTo()"><text class="cuIcon-back"></text>返回</view>
			<view class="content">
				提现账号
			</view>
			<view class="action">
			</view>
		</view>
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu ':'',isaccount?'show':'hide']" style="border-radius:4upx ;">
			<view class="cu-bar bg-white solid-bottom bg-grey">
				<view class="action">
					<text class='cuIcon-newsfill text-blue icon-title'></text>
					账号信息
				</view>
				<view>
					<button type="default" class="edit-btn " style="border-radius:4upx ;" @click="editdeposit()">编辑</button>
				</view>
			</view>
				<view class="cu-item" :class="0?'arrow':''">
					<text class='cuIcon-peoplelist text-blue icon-title'></text>
					<text class="title">账户姓名：</text>
					<text class=" content" >
						<text class="text-grey">{{name}}</text>
					</text>
				</view>
				<view class="cu-item" :class="menuArrow?'arrow':''">
					<text class='cuIcon-shake text-blue icon-title'></text>
					<text class="title">账户类型：</text>
					<text class="content" >
						<text class="text-grey">{{payname}}</text>
					</text>
				</view>
				<view class="cu-item" :class="menuArrow?'arrow':''">
					<text class='cuIcon-brand text-blue icon-title'></text>
					<text class="title">收款账号：</text>
					<text class=" content" >
						<text class="text-grey">{{payaccount}}</text>
					</text>
				</view>
				<view class="cu-bar bg-white solid-bottom bg-grey margin-top-xs">
					<view class="action">
						<text class='cuIcon-newsfill text-blue icon-title'></text>
						提现密码
					</view>
					<view>
						<button type="default" class="edit-btn " style="border-radius:4upx ;" @click="editdepositpwd()">修改</button>
					</view>
				</view>
					<view class="cu-item" :class="0?'arrow':''">
						<text class='cuIcon-peoplelist text-blue icon-title'></text>
						<text class="title">提现密码：</text>
						<text class=" content" >
							<text class="text-grey">**************</text>
						</text>
					</view>
		</view>
		
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu ':'',isaccount?'hide':'show']">
			<view class="cu-bar bg-white solid-bottom bg-grey">
				<view class="action">
					<text class='cuIcon-newsfill text-blue icon-title '></text>
					账号信息
				</view>
				<view>
				</view>
			</view>
			<view class="cu-item text-xxl" :class="0?'arrow':''" >
				<text class="content cuIcon-emoji text-center text-xxl emoji" style="height: 300upx;font-size: 200upx;width: 100%;"></text>
			</view>
			<view class="cu-item text-xxl" :class="0?'arrow':''" >
				<text class="content  text-center text-xxl emoji">
					暂无账号信息请先添加账号
				</text>
			</view>
			<view class="cu-bar bg-white solid-bottom bg-grey margin-top-xs">
			<view class="action">
					<text class='cuIcon-newsfill text-blue icon-title'></text>
					提现密码
				</view>
				<view>
					<button type="default" class="edit-btn " style="border-radius:4upx ;" ></button>
				</view>
			</view>
				<view class="cu-item" :class="0?'arrow':''">
					<text class='cuIcon-peoplelist text-blue icon-title'></text>
					<text class="title">提现密码：</text>
					<text class=" content" >
						<text class="text-grey">暂未设置</text>
					</text>
			</view>
			<view class=" margin-top-xl bg-gray" :class="0?'arrow':''">
					<button class="cu-btn bg-gradual-blue margin-tb-sm lg deposit-btn" @click="adddeposit()">添加提现账号信息</button>
			</view>
		</view>
		
	</view>
</template>

<script>
		import helper from '../../common/helper.js';  
export default {
		data() {
			return {
				name:" ",
				payname:" ",
				payaccount:" ",
				
				token:'',
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				menuBorder: false,
				menuArrow: false,
				menuCard: true,
				
				isaccount:true,
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
				url:helper.websiteUrl+'/agent/agent/ajax-get-info',
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
						if(res.data.code==200){
							let data=res.data.data;
							if(data){
								if(data.current_paytype==null ||data.current_paytype==''){
									this.isaccount=false;
								}
								this.name=data.current_payname;
								if(data.current_paytype=='0'){
									this.payname='微信';
									this.payaccount=data.wechat_num;
								}else if(data.current_paytype=='1'){
									this.payname='支付宝';
									this.payaccount=data.alipay_num;
								}else if(data.current_paytype=='2'){
									this.payname='中国银行';
									this.payaccount=data.bank_num;
								}else if(data.current_paytype=='3'){
									this.payname='招商银行';
									this.payaccount=data.bank_num;
								}else if(data.current_paytype=='4'){
									this.payname='建设银行';
									this.payaccount=data.bank_num;
								}else if(data.current_paytype=='5'){
									this.payname='农业银行';
									this.payaccount=data.bank_num;
								}else if(data.current_paytype=='6'){
									this.payname='工商银行';
									this.payaccount=data.bank_num;
								}else if(data.current_paytype=='其他'){
									this.isaccount=false;
								}
							}
						}else if(res.data.code==-200){
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
					fail: () => {},
					complete: () => {}
				});
		},
		methods: {
			editdeposit: function() {
					uni.redirectTo({
						url: '../about/editdeposit'
					});
			},
			editdepositpwd:function(){
				uni.redirectTo({
					url: '../about/deposit-password'
				});
			},
			adddeposit:function(){
				let page="../about/deposit"
				uni.redirectTo({
					url: "../about/sitdeposit?page="+page
				});
			},
			navTo(){
				uni.redirectTo({
					url: '../tabbar/tabbar?page=about'
				});
			}
		}
		
	}
</script>

<style>
	.deposit-btn{
		width: 100%;
	}
	.show{
		display: block;
	}
	.hide{
		display: none;
	}
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