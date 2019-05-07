<template>
    <view class="content">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">忘记密码</block>
		</cu-custom>
        <view class="input-group">
            <view class="cu-form-group l-input">
            	<view class="title">邮箱：</view>	
            <!-- <text class="cuIcon-command text-olive"></text> -->
            	<m-input class="m-input" type="text" displayable v-model="email" placeholder="请输入邮箱"></m-input>
            </view>
        </view>

        <view class="btn-row">
            <button type="primary" class="primary" @tap="findPassword">提交</button>
        </view>
    </view>
</template>

<script>
    import service from '../../service.js';
    import mInput from '../../components/m-input.vue';

    export default {
        components: {
            mInput
        },
        data() {
            return {
                email: ''
            }
        },
        methods: {
            findPassword() {
                /**
                 * 仅做示例
                 */
                if (this.email.length < 3 || !~this.email.indexOf('@')) {
                    uni.showToast({
                        icon: 'none',
                        title: '邮箱地址不合法',
                    });
                    return;
                }
                uni.showToast({
                    icon: 'none',
                    title: '已发送重置邮件至注册邮箱，请注意查收。',
                    duration: 3000
                });
            }
        }
    }
</script>

<style>
.btn-row{
	margin-top: 30upx;
}
.primary{
		background:linear-gradient(to right,#0286f7,#1bb8b7);
		margin-top: 30upx;
		width: 90%;
		margin-left: 5%;
	}
	.l-input{
		width: 98%;
		margin-left: 1%;
		margin-bottom: 2upx;
	}
	.input-group{
		margin-top: 10upx;
	}
</style>
