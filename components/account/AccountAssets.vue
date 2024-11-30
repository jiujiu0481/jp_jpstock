<template>
	<view>
		<!-- <view style="position: absolute;right: 10px;top:10px;">
			<image :src="`/static/${icon}.png`" mode="aspectFit" :style="$theme.setImageSize(160)"></image>
		</view> -->
		<view style="display: flex;align-items: center;line-height: 1.8;">
			<view style="padding-left: 10px;color:#FFFFFF;font-size: 32rpx;">
				{{$lang.WITHDRAW_AMOUNT}}[{{$lang.CURRENCY_UNIT}}]
			</view>
			<image mode="aspectFit" :src="`/static/${showAmount?'show':'hide'}.png`" @click.stop="handleShowAmount"
				:style="$theme.setImageSize(40)" style="margin-left: 10px;">
			</image>
		</view>
		<view style="font-size: 64rpx;font-weight: 700;color:#FFFFFF;line-height: 1.8;">
			{{showAmount?$util.formatNumber(info.totalZichan):hideAmount}}
		</view>

		<!-- <view
			style="display: flex;align-items: center;justify-content: space-betweenline-height: 2.4;color:#FFFFFF;font-size: 28rpx;justify-content: space-between;">
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<image src="/static/account_wallet.png" mode="aspectFit" :style="$theme.setImageSize(80)"></image>
				<view style="padding-left: 10px;">
					<view>{{$lang.TIP_AMOUNT_AVAIL}}</view>
					<view>{{showAmount?$util.formatNumber(info.money):hideAmount}}</view>
				</view>
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<image src="/static/account_cold.png" mode="aspectFit" :style="$theme.setImageSize(80)"></image>
				<view style="padding-left: 10px;">
					<view>{{$lang.ACCOUNT_COLD_AMOUNT}}</view>
					<view>{{showAmount?$util.formatNumber(info.freeze):hideAmount}}</view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		name: 'AccountAssets',
		props: {
			info: {
				type: Object,
				default: {}
			},
			// 装饰图
			icon: {
				type: String,
				default: 'account_assets',
			}
		},
		data() {
			return {
				showAmount: false, // 显示金额
				hideAmount: '******', // 隐藏金额
			}
		},
		methods: {
			// 总资产显隐控制
			handleShowAmount() {
				this.showAmount = !this.showAmount;
			},
		}
	}
</script>