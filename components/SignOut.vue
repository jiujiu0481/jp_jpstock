<template>
	<view class="text-center bold"
		style="margin:40rpx auto; width: 80%;background-color: #f2bd8f;border-radius: 30px;border:none;color:#FFFFFF;padding: 15px;font-size: 16px;"
		@click="handleSignOut()">
		{{$lang.BTN_SIMGN_OUT}}
	</view>
</template>

<script>
	export default {
		name: 'SignOut',
		methods: {
			// 登出
			handleSignOut() {
				try {
					let version = uni.getStorageSync('version')
					uni.removeStorageSync('token');
					uni.setStorageSync('version', version);
				} catch (e) {
					// error
				}
				uni.$u.toast(this.$lang.TIP_SIGN_OUT_SUCCESS);
				setTimeout(() => {
					uni.navigateTo({
						url: this.$paths.ACCOUNT_ACCESS
					});
					this.$router.go(0)
				}, 500)
			}
		}
	}
</script>

<style>
</style>