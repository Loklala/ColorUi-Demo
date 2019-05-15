<template name="components">
	<view>
		<scroll-view scroll-y class="page">
			<cu-custom bgColor="" class="bg title-text" :isBack="false">
				<block slot="backText"></block>
				<block slot="content">收益</block>
			</cu-custom>
			<view class="cu-list menu uni-badge-warning bg-black" :class="[0?'sm-border':'',0?'card-menu margin-top':'']" >
				<view class="icon-text bg-black">
					<text class="cuIcon-notification text-white text-xl "></text>
				</view>
				<view class="solle-text bg-gray bg-black">
					<swiper autoplay="true" circular="true" interval="3000">
						<swiper-item v-for="(item, index) in msg" :key="index">
							<navigator class="text-white">{{item}}</navigator>
						</swiper-item>
					</swiper>
				</view>
			</view>
					<view class="cu-list menu" :class="[menuBorder?'sm-border':'',1?'card-menu margin-top':'']" >
				<view class="cu-list grid bg" :class="['col-' + 3,gridBorder?'':'no-border']">
					<view class="cu-item ">
						<view class="money-title text-white">房卡总收益&yen;</view><view class="money-css text-white text-xxl">{{fkmoney}}</view>
					</view>
					<view class="cu-item">
						<view class="money-title text-white">充值总收益&yen;</view><view class="money-css text-white text-xxl">{{czmoney}}</view>
					</view>
					<view class="cu-item">
						<view class="money-title text-white">俱乐部总收益&yen;</view><view class="money-css text-white text-xxl">{{jlbmoney}}</view>
					</view>
				</view>
			</view>	
			<view class="bg-gray">
				<view class="cu-list menu uni-badge-warning top bg-gray" :class="[0?'sm-border':'',0?'card-menu ':'']">
					
					<view class="nav-list top" style="margin-top: 50upx;">
						<navigator hover-class="none" class="nav-li" redirectTo :class="'bg-olive'" :url="'../earn/roomearn'"
						:style="[{animation: 'show ' + ((0+1)*0.2+0.1) + 's 1'}]" >                 
							<view class="nav-title">房卡收益</view>                                 
							<view class="nav-name">_</view>                                         
							<text :class="'cuIcon-share'"></text>                                   
						</navigator>                                                                
						<navigator hover-class="none" class="nav-li" redirectTo :class="'bg-green'" :url="'../earn/rechearn'"
						:style="[{animation: 'show ' + (0.4) + 's 1'}]" >                           
							<view class="nav-title">充值收益</view>                                 
							<view class="nav-name">_</view>                                         
							<text :class="'cuIcon-addressbook'"></text>                             
						</navigator>                                                                
						<navigator hover-class="none" class="nav-li" redirectTo :class="'bg-cyan'" :url="'../earn/clubearn'"
						:style="[{animation: 'show ' + (0.4) + 's 1'}]" >                          
							<view class="nav-title">俱乐部收益</view>                               
							<view class="nav-name">_</view>                                        
							<text :class="'cuIcon-addressbook'"></text>                            
						</navigator>                                                               
						<navigator hover-class="none" class="nav-li"  :class="'bg-brown'" redirectTo :url="'../earn/depositresult'"
						:style="[{animation: 'show ' + (0.4) + 's 1'}]" >
							<view class="nav-title">提现记录</view>
							<view class="nav-name">_</view>
							<text :class="'cuIcon-addressbook'"></text>
						</navigator>
					</view>
				</view>
				
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "components",
		data() {
			return {
				fkmoney:'0.00',
				czmoney:'0.00',
				jlbmoney:'0.00',
				
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				src:'',
				title:"滚动公告",
				msg : [
					'皮蛋游戏大厅推广系统正式上线啦！',
					'代理通过多种方式邀请玩家均会获得收益',
					'邀请好友！绑定代理账户就可以获得收益！',
					'随时随地查看当前收益金额，随时随地提现到账',
					'收益到达一定额度，即可提交提现申请'
				],
				
								modalName: null,
				gridCol: 3,
				gridBorder: true,
				
				menuBorder: true,
				menuArrow: true,
				menuCard: true,
				
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
				dotStyle: true,
				towerStart: 0,
				direction: ''
			};
		},
		//加载金额
		beforeCreate:function(){//beforeCreate
			const value = uni.getStorageSync('agentInfo');
			if (value) {
				var id=value.id;
			uni.request({
				url: 'http://192.168.0.199:8080/agent/earnings/ajax-earn',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					dataType: 'json',
					cache: false,
					data: {
						id:id,
					},
					success: res => {
						console.log(res.data.isSuccess);
						if(res.data.isSuccess==200){
							let data=res.data.result;
							console.log(data);
							this.fkmoney=data.fkmoney;
							this.zcmoney=data.zcmoney;
							this.jlbmoney=data.jlbmoney;
						}else{
							console.log('请设置提现密码再提现')
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		methods: {
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},	
		}
	}
</script>

<style>
	.money-css{
		min-height: 50upx;
	}
	.lables{
		font-size: 30upx;
	}
	.list-btn{
		width: 50%;float: left;border-right: 1px solid #dddddd;text-align: center;
	}
	.list-btn1{
		width: 50%;float: left;text-align: center;border-left: 1px solid #dddddd;
	}
	.top{
		margin-top: 5upx;
	}
	.title-text{
		color: #fff;
	}
	.bg{
		background: linear-gradient(to right,#3396a6,#33966a);
	}
	.bg-1{
		background-color:#33966a;
	}
	.bg1{
		background: linear-gradient(to bottom,#33966a,#ffffff);
	}
	.icon-xl{
		font-size: 50upx;
	}
	.icon-text{
		width: 10%;float: left;text-align: right;line-height: 60upx;
	}
	.solle-text{
		height: 50upx;width: 90%;float: left;text-align: center;line-height: 60upx;
	}
	.tip-text{
		width: 100%;
		text-indent: 45upx;
	}
	.page {
		height: 100vh;
	}
	.Title-text{
		font-size: 23upx;
	}
	.cardTitle {
		color: #fff;
		padding: 90upx 60upx;
		font-size: 40upx;
		font-weight: 300;
		position: relative;
		text-shadow: 0px 0px 6upx rgba(0, 0, 0, 1)
	}

</style>
