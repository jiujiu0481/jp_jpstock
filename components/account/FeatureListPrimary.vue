<template>
	<view style="display: flex;flex-wrap: wrap;justify-content: space-between;margin: 10rpx 0rpx;">
		<block v-for="(item,index) in list" :key="index">
			<view style="width: 99%;">
				<view style="display: flex;align-items: center;margin:10rpx;padding:20rpx 30rpx;border-radius: 8rpx;border-bottom: 1px #f1f1f1 solid;"
					@click="actionEvent(item,index)">
					<image mode="aspectFit" :src="`/static/${item.icon}.png`" :style="$theme.setImageSize(50)"></image>
					<text style="font-size: 28rpx;color: #666666;padding:0 20rpx;">{{item.name}}</text>
					<view class="arrow" style="border-color: #666666;" :style="setStyle">
					</view>
				</view>
			</view>
		</block>
		<view style="background-color: #fff;color: #fff;margin-left: 20px;">.</view>
	</view>
</template>

<script>
	export default {
		// 功能列表：一行一项 [icon title arrow] 支持RTL模式
		name: 'FeatureListPrimary',
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
			// 设置箭头的样式 兼容 RTL模式
			setStyle() {
				const temp = 'marginLeft';
				return {
					...this.$theme.setImageSize(12),
					[`${temp}`]: 'auto',
					transform: `rotate(${45 }deg)`,
				}
			},

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

				return [...temp, 
				
				 //   {
					// 	name: '通貨両替',
					// 	url: this.$paths.ACCOUNT_ZHUANHUAN,
					// 	icon: 'account_bank_card',
					// 	mode: 'link',
					// },
				   {
						name: this.$lang.SIGNIN_PASSWORD_TITLE,
						url: this.$paths.ACCOUNT_PASSWORD,
						icon: 'account_signin_pwd',
						mode: 'link',
					},
					{
						name: this.$lang.PAY_PASSWORD_TITLE,
						url: this.$paths.ACCOUNT_PASSWORD + `?role=pay`,
						icon: 'account_pay_pwd',
						mode: 'link',
					},
					{
						name: this.$lang.BIND_BANK_CARD_TITLE,
						url: this.$paths.ACCOUNT_BANK_CARD,
						icon: 'account_bank_card',
						mode: 'link',
					}, {
						name: this.$lang.TRANSACTION_TITLE,
						url: this.$paths.TRANSACTION,
						icon: 'account_capital_deatil',
						mode: 'link',
					},
					{
						name: this.$lang.PRVITE_PACT_TITLE,
						url: this.$paths.PRVITE_PACT,
						icon: 'account_pact',
						mode: 'link',
					},
					// {
					// 	name: this.$lang.ABOUT_US_TITLE,
					// 	url: this.$paths.ABOUT_US,
					// 	icon: 'about',
					// 	mode: 'link',
					// },
				];
			},
		},

		methods: {
			actionEvent(item, index) {
				uni.navigateTo({
					url: item.url,
				})
			},
		}
	}
</script>

<style>
</style>