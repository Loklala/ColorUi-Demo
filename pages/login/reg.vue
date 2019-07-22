<template>
	<view class="content">
			<view class="cu-bar bg search bg-gradual-blue" :style="[{height:CustomBar + 'px'}]">
				<view class="action" @tap="navTo()">
					<text class="cuIcon-back text-white"></text>
					返回
				</view>
				<view class="content title-text">
					注册
				</view>
				<view class="action">
				</view>
			</view>
		<view class="bg-white margin-top-xs">
			<view class="cu-steps ">
				<view class="cu-item" :class="'' ? '' : 'text-blue'" v-for="(item, index) in basicsList" :key="index">
					<text :class="'cuIcon-' + item.icon"></text>
					{{ item.name }}
				</view>
			</view>
		</view>
		<view class="input-group">
			<view class="cu-form-group l-input">
				<view class="title">真实姓名：</view>
				<m-input class="m-input" type="text" clearable  v-model="name" placeholder="输入真实姓名"></m-input>
			</view>
			
			<view class="cu-form-group l-input">
				<view class="title">密 码：</view>
				<m-input class="m-input" type="password" displayable v-model="password" placeholder="输入密码"></m-input>
			</view>
			<view class="cu-form-group l-input">
				<view class="title">确认密码：</view>
				<m-input class="m-input" type="password" displayable v-model="repassword" placeholder="输入确认密码"></m-input>
			</view>
			<view class="cu-form-group l-input">
				<view class="title">手机号：</view>
				<!-- <text class="cuIcon-my text-olive"></text> -->
				<m-input class="m-input" type="number" clearable  v-model="tel" placeholder="输入手机号码"></m-input>
				<view class="cu-capsule radius">
					<view class="cu-tag bg-gradual-blue ">+86</view>
					<view class="cu-tag line-blue">中国大陆</view>
				</view>
			</view>
			<view class="cu-form-group l-input">
				<view class="title">验证码：</view>
				<m-input class="m-input" placeholder="输入验证码" type="number" clearable  v-model="code"></m-input>
				<button class="cu-btn bg-gradual-blue shadow" type="button" :disabled="disabled" @tap="sendcode">{{ btntxt }}</button>
			</view>
			<!-- <view class="cu-form-group l-input">
				<view class="title">身份证号：</view>
				<m-input class="m-input" type="idcard" clearable  v-model="idcard" placeholder="输入身份证号"></m-input>
			</view> -->
		</view>
		<view class="btn-rows" style="margin-top: 120upx;">
			<checkbox-group class="block" @change="CheckboxChange">
				<checkbox class="round" :class="checkbox[0].checked ? 'checked' : ''" :checked="checkbox[0].checked ? true : false"
				 value="A"></checkbox>
				<text class=" texy">我已阅读并同意<text class="ruls shadow" @tap="showModal" data-target="Modal">《皮蛋娱乐大厅协议》</text></text>
			</checkbox-group>
		</view>


		<view class="btn-row"><button type="primary" class="primary" @tap="register" :disabled="isdisabledFn">注册</button></view>


		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">皮蛋娱乐推广合作协议</view>
					<view class="action" @tap="hideModal"><text class="cuIcon-close text-red"></text></view>
				</view>
				<view class="padding-xl">
					<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
					 @scroll="scroll">
						<view class="xy-text">
							<text class="text-center">《皮蛋娱乐推广合作协议》</text>
							<text class="text-top">欢迎您注册/登录使用“皮蛋娱乐”的推广系统（下称“本系统”）。请您在注册/登录本系统前仔细阅读《皮蛋娱乐推广合作协议》（下称“本协议”）的所有内容，特别是有关推广员的义务的条款，以及免除、限制我方责任的条款。本协议是侠客网络科技有限公司（下称我方）与皮蛋娱乐推广员（下称“推广员”或“你方”）所约定的规范双方权利、义务关系的电子合同（买卖合同）。</br>
							<text class="text-top">如您对本协议任何内容有异议，请不要注册及登录/使用本系统。当您点击确认键注册或者登录或使用本系统相关服务，则视为您已仔细阅读本协议所有内容，同意接受本协议的所有规定及我方相关政策的约束，成为推广员，获得推广员链接。</text>
								<text>一、合作内容</text></br>
								<text>
									1、协助我方提升本平台的钻石销售数量，提升本游戏的玩家规模。</br>
									2、为实现前述目的，你方可通过线下场所或线上渠道（Q群、QQ、贴吧、论坛、空间、微信、微博等）、自身人际关系、非官方网络资源等各种合法方式和渠道，推广本平台，我方将提供必要的支持和协助。</br>
									3、为实现前述目的，双方共同将为本游戏做正面宣传，扩大本游戏的知名度和美誉度。</br>
								</text>
								<text>二、推广员的权利和义务</text></br>
								<text>
									1、推广员利用推广员链接推广游戏，我方按其推广链接内游戏钻石的使用数量发放提成（佣金）。</br>
									2、推广员有权参与我方组织的市场推广活动，并从我方获得相应的奖励。</br>
									3、推广员不享有本游戏在任何区域的独家合作资格。</br>
									4、推广员不得恶意扰乱、阻扰其他推广员的对游戏的推广。</br>
									5、推广员不得对用户歧视性销售，不得捆绑销售、搭便车销售。</br>
									6、在合作推广过程中，推广员的任何行为均不得包含有虚假、诱骗、违反国家法律法规的内容，也不得做出有悖于皮蛋娱乐对外公布的相关公告、协议内容的承诺或行为，不得通过组织、参与违法活动来追求销售业绩。如有发现，你方独自承担一切法律后果，且我方有权向国家有关机关做举报。</br>
									7、推广员有义务积极维护和宣传我方的品牌、业务和政策，不煽动、不参与任何形式的不利于我方品牌、业务、政策的活动。你方不可假冒和改变我方的商标、标志、商业信息等，不得故意造成与我方产品或服务的混淆，不得以我方公司或员工名义对外从事任何活动。</br>
									8、推广员须保证在进行本游戏推广之前已经获得线上或者线下场所的许可，并遵守相应的线上线下法律规章制度，否则由此产生的纠纷和可能导致的一切责任由推广员本人承担；推广员同意我方对此免责。</br>
									9、推广员理解并认可，推广员在注册和使用本系统过程中所提供的个人资料及相关信息是我方判断你方身份的重要依据，你方应根据要求尽可能提供详尽的信息，并确保信息的完整性、合法性和真实性。如推广员提交的资料有任何变动，必须在本系统中及时更新,必要时以电话或邮件形式告知我方管理人员，以保证其资料准确性。如果推广员不能提供准确完整的个人信息、未及时更新相关信息或者提供相关的资料，将导致我方无法准确判断推广员的身份，从而影响到推广收益发放等操作。因此给推广员造成的损失，我方不承担任何责任。</br>
									10、如因推广员提交的信息资料不真实、不准确、不完整、不合法从而导致我方作出错误判断、遭受直接或间接经济损失的，我方有权立即取消该推广员的资格并追究推广员的法律责任。</br>
									11、推广员仅能依据本协议约定的内容，从事皮蛋娱乐游戏的推广活动，不得将本协议约定的权利、义务转让给任何第三方，不得擅自委托第三方从事本游戏的推广行为。</br>
									12、推广员拥有自主的权利，可单方面随时决定终止与我方的合作、并停止使用本系统相关服务。如我方对本协议内容或相关服务等作出任何变更，而推广员不同意有关变更内容的，推广员应立即终止与我方的合作、并停止使用本系统相关服务。</br>
								</text>
								<text>三、皮蛋娱乐的权利和义务</text></br>
								<text>
									1、皮蛋娱乐会对推广员提交的注册信息和资料进行及时审核，并有权根据公司业务发展需要，做出通过或不通过的决定。</br>
									2、皮蛋娱乐有权了解推广员的推广情况，获得与推广员信息和推广业绩相关的必要的资料、数据和有关证据。</br>
									3、皮蛋娱乐会根据推广员的销售业绩和公司政策，将推广员应得的收益及时支付到位。</br>
									4、皮蛋娱乐将通过本系统的消息通知、电子邮件等方式，将最新的公司政策（包括但不限于优惠政策、对推广员的销售业绩要求等）下发给推广员。推广员有义务遵守、配合公司的各项政策。</br>
									5、皮蛋娱乐有权根据实际需要随时修改本协议，并通过公告、系统消息或邮件等形式公布，修改自公告公布之日、或消息送达推广员邮箱之日起生效。推广员如有异议，可立即停止本协议，并与我方协商结算事宜。</br>
									6、皮蛋娱乐有权单方随时变更、中断或终止本系统及相关服务，且不需对玩家或任何第三方负责。除本协议另有约定外，皮蛋娱乐将以电话、短信、系统消息/页面或者电子邮件方式通知推广员。终止合作通知自发出之时即视为送达。如因推广员资料中登记的联络方式不正确、不完整或者不真实而导致联络失败的，皮蛋娱乐无需对因此导致的任何损失或损害承担法律责任。</br>
									7、皮蛋娱乐有权根据公司业务发展需要，终止本协议涉及的合作。在此情况下，皮蛋娱乐应通过发布公告等形式通知推广员，协议的终止自公告发布之日起生效。</br>
									8、皮蛋娱乐将竭力保证本游戏相关系统和数据的稳定，但因技术问题或第三方原因导致产品宕机、数据丢失等问题，我方不向你方或其他第三方承担赔偿、补偿的法律义务。</br>
									9、皮蛋娱乐有权要求推广员配合我方的相关推广工作，以保证推广本游戏的效果和效率。</br>
									10、尊重个人隐私是皮蛋娱乐的重要政策。在未经授权的情况下，皮蛋娱乐不会公开或向第三方透露推广员在申请时提交的个人资料。但如根据法律规定或政府有权部门的有效命令，或在以下三种情况下，皮蛋娱乐可不经授权而向相关部门或第三方公开或透露推广员的个人信息：</br>
								</text>
								• (1)在紧急情况下维护推广员个人、第三人或社会大众的财产或人身安全；</br>
								• (2)保持、维护皮蛋娱乐的知识产权或其它合法权益；</br>
								• (3)根据皮蛋娱乐游戏服务的相关规则、制度、条款，应当公开或披露的。</br>
								<text>四、推广收益</text></br>
								推广员按照皮蛋娱乐相关规定申领推广收益。发放规则如有变动以公司的通知为准。</br>
								<text>五、声明</text></br>
								皮蛋娱乐与推广员在此声明：双方不会因根据本协议产生的推广合作，构成任何形式的劳动合同关系或劳务关系。推广员不隶属于皮蛋娱乐，不受皮蛋娱乐内部规章制度的约束。皮蛋娱乐除向推广员支付本协议约定的推广收益外，不承担推广员的任何其他费用，包括但不限于因推广员因推广活动所产生的成本、社会保险、福利和医疗保险费用等。</br>
								皮蛋娱乐与推广员共同在此声明：本协议不包含任何可能理解为双方之间设立一种代理关系的内容。推广员无权代表皮蛋娱乐对外缔结合同。推广员不得以皮蛋娱乐的名义开展任何与本协议约定推广活动无关的活动，或者从事违法犯罪活动，否则一切后果由推广员自行承担，皮蛋娱乐并保留追究其法律责任的权利。</br>
								<text>六、违约责任</text></br>
								如推广员有违反本协议第二条第4、5、6、7、8、9、10、11款之规定的行为，皮蛋娱乐有权根据推广员的违约事实和严重程度，对其采取扣发推广收益、停止发放推广收益、暂停推广合作资格、停止推广合作资格等措施，并有权向推广员追讨其通过不当行为所获得的利益。</br>
								推广员对此充分理解并认可。</br>
								<text>七、不可抗力</text></br>
								<text>
									1、一方因不可抗力不能履行本协议的，根据不可抗力的影响，可以部分或者全部免除违约责任。但一方迟延履行后发生不可抗力的，不能免除责任。</br>
									2、一方因不可抗力不能履行本协议的，应当及时通知对方，以减轻可能给对方造成的损失，并在合理期限内提供证明。未及时通知的，对因迟延通知而造成的扩大损失依然承担赔偿责任。</br>
									3、一方因不可抗力不能履行合同，但尚未造成对本协议根本违约的，另一方应该在履约时间上给予对方适当的宽限；如果因不可抗力导致不能实现本协议目的的，双方均有权解除本协议。</br>
								</text>
								<text>八、协议的生效和终止</text></br>
								<text>
									1、协议的生效：本协议自您登录推广系统并点击“我已同意《皮蛋娱乐推广合作协议》”时生效。</br>
									2. 下列情形之一出现时，本协议终止：</br>
								</text>
								• （1）本协议约定的合作期限届满；</br>
								• （2）本游戏终止运营；</br>
								• （3）在本协议有效期内，推广员被依法追究刑事责任的，皮蛋娱乐有权单方面终止本协议；</br>
								• （4）其他按照法律规定以及本协议约定的终止情况</br>
								<text>九、其他约定</text></br>
								本协议未尽事宜，可由双方另行签订补充协议予以明确。补充协议的内容与本协议的内容有冲突的，优先适用补充协议的规定。</br>
								推广员与皮蛋娱乐在合作中产生的争议，应当友好协商解决；协商不成的，任何一方均有权向被告所在地有管辖权的法院提起诉讼.
							</text>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';  
	import service from '../../service.js';
	import mInput from '../../components/m-input.vue';
	export default {
		components: {
			mInput
		},
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				CustomBar: this.CustomBar,
				modalName: null,
				tel: '',
				password: '',
				repassword: '',
				code: '',
				name: '',
				idcard: '',
				parent_agent_id:'',
				radio: 'A',
				disabled: false,
				isdisabledFn: true,
				time: 0,
				btntxt: '获取验证码',
				checkbox: [{
						value: 'A',
						checked: false
					},
					{
						value: 'B',
						checked: true
					},
					{
						value: 'C',
						checked: false
					}
				],
				basicsList: [{
						icon: 'exit',
						name: '提交'
					},
					{
						icon: 'expressman',
						name: '审核'
					},
					{
						icon: 'friend',
						name: '登录'
					},
					{
						icon: 'share',
						name: '推广'
					},
					{
						icon: 'redpacket',
						name: '收益'
					}
				],
				list: [],
			};
		},
		onLoad(e) {
			var last_tels="";
			if(e.parent_agent_id && e.parent_agent_id!=''){
				this.parent_agent_id=e.parent_agent_id;
			}else{
				this.parent_agent_id='';
			}
			let last_tel = uni.getStorageSync('last_tel');
			if (last_tel&&last_tel!=null) {
				last_tels=last_tel;
			}else{
				last_tels=''
			}
			uni.request({
				url:helper.websiteUrl+'/agent/login/last-sms-time',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				dataType: 'json',
				cache: false,
				data: {
					last_tel: last_tels,
					sms_type: 0,
				},
				success: res => {
					let lists = res;
					let data = lists.data
					if (data.isSuccess == 200) {
						this.time = 60 - parseInt(data.result);
						
						this.disabled = true;
						this.timer();
					} else {
						this.time = 0;
						this.disabled = false;
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
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			//阅读协议
			CheckboxChange(e) {
				var items = this.checkbox,
					values = e.detail.value;
				if (values.length >= 1) {
					this.isdisabledFn = false;
				} else {
					this.isdisabledFn = true;
				}
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].value == values[j]) {
							items[i].checked = true;
							break;
						}
					}
				}
			},
			// 注册
			register() {
				var reg = 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/;
				if (this.tel == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号码'
					});
					return;
				}if (!reg.test(this.tel)) {
					uni.showToast({
						icon: 'none',
						title: '手机格式不正确'
					});
					return;
				}
				if (this.tel.length < 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号格式不正确'
					});
					return;
				}
				if (this.code == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					});
					return;
				}
				if (this.password.length < 4) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 4 个字符'
					});
					return;
				}
				if (this.password != this.repassword) {
					uni.showToast({
						icon: 'none',
						title: '两次密码不一致'
					});
					return;
				}
				if (this.name.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入姓名'
					});
					return;
				}if (this.name.length == 20) {
					uni.showToast({
						icon: 'none',
						title: '姓名字段超出'
					});
					return;
				}
				uni.request({
					url:helper.websiteUrl+'/agent/login/ajax-agent-reg',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					dataType: 'json',
					cache: false,
					data: {
						sms_type: 0,
						agent_tel: this.tel,
						agent_pwd: this.password,
						sms_code: this.code,
						name: this.name,
						idcard: this.idcard,
						parent_agent_id:this.parent_agent_id,
					},
					success: res => {
						let lists = res;
						let data = lists.data
						if (data.isSuccess == 200) {
							let self = this;
							uni.showModal({
									title: '注册成功',
									content: data.message,
									showCancel:false,
									success: function (res) {
										if (res.confirm) {
											self.navTo();
											}
									}
								});
						} else {
							uni.showToast({
								icon: 'none',
								duration: 2000,
								title: data.message
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
			//获取验证码
			sendcode() {
				var reg = 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/;
				if (this.tel == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号码'
					}, 2000);
					return;
				} else if (!reg.test(this.tel)) {
					uni.showToast({
						icon: 'none',
						title: '手机格式不正确'
					}, 2000);
					return;
				}
				uni.request({
					url: helper.websiteUrl+'/agent/login/ajax-reg-code',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
						},
					method: 'POST',
					dataType: 'json',
					cache: false,
					data: {
						tel: this.tel,
						sms_type: 0,
					},
					success: res => {
						this.list = res;
						let data = this.list.data;
						let msg = data.result;
						if (data.isSuccess == 200) {
							this.time = 60;
							this.disabled = true;
							uni.showToast({
								icon: 'none',
								title: msg,
							}, 2000);
							let self = this;
							//记录成功发送验证码手机号
							uni.setStorage({
								key: 'last_tel',
								data: this.tel,
								success: function() {
									self.timer();
								}
							});
						}
						if (data.isSuccess == 400) {
							uni.showToast({
								icon: 'none',
								title: data.result,
							}, 2000);
							this.time = 0;
							setTimeout(this.timer, 1000);
							this.disabled = false;
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
			//倒计时
			timer() {
				if (this.time > 0) {
					this.time--;
					this.btntxt = this.time + 's后获取';
					setTimeout(this.timer, 1000);
				} else {
					this.time = 0;
					this.btntxt = '获取验证码';
					this.disabled = false;
				}
			},
			navTo() {
				uni.redirectTo({
					url: 'login'
				});
			}
		}
	};
</script>

<style>
	.xy-text {
		text-align: left;
	}

	.cu-btn {
		border-radius: 8upx;
	}

	.cu-tag {
		height: 55upx;
	}

	.padding-xl {
		padding: 0upx 10upx;
	}

	.scroll-Y {
		height: 1000upx
	}

	.ruls {
		color: #007AFF;
	}

	.title {
		width: 180upx;
	}

	.cu-item {
		line-height: 15upx;
		height: 110upx;
	}

	.btn-rows {
		margin-top: 60upx;
	}

	.round {
		float: left;
		height: 40supx;
		width: 40upx;
	}

	.block {
		margin: 0 auto;
		padding-left: 55upx;
		height: 30upx;
		width: 550upx;
	}

	.texy {
		text-align: center;
		line-height: 50upx;
	}

	.btn-row {
		margin-top: 30upx;
	}

	.primary {
		background: linear-gradient(to right, #0286f7, #1bb8b7);
		width: 90%;
		margin-left: 5%;
	}

	.l-input {
		width: 98%;
		margin-left: 1%;
		margin-bottom: 2upx;
	}

	.input-group {
		margin-top: 10upx;
	}
</style>
