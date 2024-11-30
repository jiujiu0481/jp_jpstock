<template>
	<view style="display: flex;flex-wrap: wrap;justify-content: space-between;margin: 10rpx 20rpx;">
		<block v-for="(item,index) in list" :key="index">
			<view style="width: 49%;">
				<view
					style="display: flex;align-items: center;margin:10rpx;background-color: #3F3384;padding:20rpx 30rpx;border-radius: 8rpx;"
					@click="actionEvent(item,index)">
					<image mode="aspectFit" :src="`/static/${item.icon}.png`" :style="$theme.setImageSize(80)"></image>
					<text style="font-size: 28rpx;color: #FFFFFF;padding-left: 20rpx;">{{item.name}}</text>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		// 一行两个元素
		name: 'AccountCenterList',
		props: {
			code: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {};
		},

		computed: {
			// 功能列表
			list() {
				const temp = this.$lang.ACCOUNT_AUTH_STATUS.map((item, index) => {
					return {
						name: item,
						url: this.$paths.ACCOUNT_AUTH,
						icon: 'authentication',
						code: index == 0 ? -1 : index == 1 ? 0 : 2,
					}
				}).filter(item => item.code == this.code);
				console.log(temp);

				return [...temp, {
						name: this.$lang.ACCOUNT_CHANGE_PWD,
						url: this.$paths.ACCOUNT_PWD,
						icon: 'account_signin_pwd',
						mode: 'link',
					},
					// {
					// 	name: this.$lang.ACCOUNT_CHANGE_PAY_PWD,
					// 	url: this.$paths.ACCOUNT_PWD_PAY,
					// 	icon: 'account_pay_pwd',
					// 	mode: 'link',
					// },
					{
						name: this.$lang.ACCOUNT_BANK_CARD,
						url: this.$paths.ACCOUNT_BANK_CARD,
						icon: 'account_bank_card',
						mode: 'link',
					}, {
						name: this.$lang.TRANSACTION_TITLE,
						url: this.$paths.TRANSACTION,
						icon: 'account_capital_deatil',
						mode: 'link',
					},
					// {
					// 	name: this.$lang.ACCOUNT_AUTH,
					// 	url: this.$paths.ACCOUNT_AUTH,
					// 	icon: 'account_auth',
					// 	mode: 'link',
					// },
					{
						name: this.$lang.ACCOUNT_ABOUT_US,
						url: this.$paths.ABOUT_US,
						icon: 'about',
						mode: 'link',
					},
					{
						name: this.$lang.ACCOUNT_CREDIT_SCORE,
						url: this.$paths.ACCOUNT_CREDIT_SCORE,
						icon: 'account_auth',
						mode: 'link',
					},
					{
						name: this.$lang.ACCOUNT_NOMINEE,
						url: this.$paths.ACCOUNT_NOMINEE,
						icon: 'account_nominee',
						mode: 'link',
					},
					{
						name: this.$lang.SIMGN_OUT,
						url: '',
						icon: 'account_sign_out',
						mode: 'sign_out',
					}
				];
			},
		},

		methods: {
			actionEvent(item, index) {
				if (item.mode == 'sign_out') {
					this.signOut();
					return false;
				}
				uni.navigateTo({
					url: item.url,
				})
			},
			// 登出
			async signOut() {
				const result = await this.$http.get(`api/app/logout`);
				try {
					let version = uni.getStorageSync('version')
					uni.removeStorageSync('token');
					uni.setStorageSync('version', version)
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