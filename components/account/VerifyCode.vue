<template>
	<view @click="actionEvent()"
		style="width: 160rpx;background-color:#242424;color:#F1F1F1; text-align: center;padding: 6rpx;border-radius: 6rpx;">
		{{label}}
	</view>
</template>

<script>
	export default {
		name: 'VerifyCode', // 验证码。邮箱获取验证码，附带倒计时
		props: {
			info: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				label: this.$lang.TIP_VERIFY_CODE, // 获取验证码，以及倒计时
				timer: null, // 验证码倒计时	
				count: 180, // 从180倒计时
				code: '', // 获取到的验证码
			}
		},
		mounted() {
			console.log('child mounted', this.timer);
		},
		deactivated() {
			console.log('child deactivated', this.timer);
			this.clearTimer();
		},
		methods: {
			// 获取验证码
			async actionEvent() {
				if (!this.$util.checkEmail(this.label)) {
					uni.$u.toast(this.$lang.TIP_ENTER_EMAIL);
					return false;
				}
				if (typeof(this.label) === 'number') return false;

				uni.showLoading({
					title: this.$lang.API_SEND_CODE,
				})
				const result = await this.$http.post(`api/app/sendSmsCode`, {
					mobile: this.label,
				});
				console.log('result:', result);
				// 如果需要校验发送及输入的验证码一致性，需在此赋值。提交表单时调用。
				// this.code=
				uni.hideLoading();
				if (result && result.code == 0) {
					uni.$u.toast(this.$lang.API_SEND_CODE_SUCCESS);
					this.onSetTimeout();
				} else {
					uni.$u.toast(result.message || this.$lang.API_HTTP_ERROR);
				}
			},
			onSetTimeout() {
				this.timer = setInterval(() => {
					console.log("setInterval");
					if (this.count <= 180 && this.count > 0) {
						this.label = this.count;
						this.count--;
					} else {
						this.clearTimer(); // 倒计时结束
						this.label = this.$lang.TIP_VERIFY_CODE;
						this.count = 180;
					}
					console.log(this.label);
				}, 1000);
			},
			clearTimer() {
				// clearTime
				if (this.timer) {
					clearInterval(this.timer);
					this.timer = null;
					console.log('clearTimer', this.timer);
				}
			},
		}
	}
</script>

<style>
</style>