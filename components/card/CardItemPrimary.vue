<template>
	<view>
		<view style="background-color: #ddc8af;border-radius: 8px;">
			<view style="display: flex;align-items: center;line-height: 1.6;padding: 0px 5px;">
				<view class="flex-1 flex">
					<view class="bold" style="font-size: 32rpx;">
						総資産
					</view>
					<image mode="aspectFit" :src="`/static/${showAmount?'zhenyan':'yanjin'}.png`" @click.stop="handleShowAmount"
						:style="$theme.setImageSize(40)"  style="margin-left: 10px;">
					</image>
				</view>
				<view style="font-size: 35rpx;font-weight: 700;line-height: 1.6;color: #e49d75;">
					{{showAmount?$util.formatMoney(info.value1):hideAmount}}
				</view>
			</view>
		</view>
		
		
		<view style="display: flex;align-items: center;font-size: 28rpx;padding: 10px 5px;">
			<view style="flex:1 0 50%;">
				<view>{{labels[1]}}</view>
				<view>{{showAmount?$util.formatMoney(info.value2):hideAmount}}</view>
			</view>
			<view style="flex:1 0 50%;text-align: right;">
				<view>{{labels[2]}}</view>
				<view>{{showAmount?$util.formatMoney(info.value3):hideAmount}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'CardItemPrimary',
		props: {
			info: {
				type: Object,
				default: {}
			},
			// label。单独分开，否则会因数据请求慢，导致label未加载
			labels: {
				type: Array,
				default: []
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
			linkWithdraw() {
				uni.navigateTo({
					url: this.$paths.ACCOUNT_WITHDRAW
				})
			},
			linkDeposit() {
				uni.navigateTo({
					url: this.$paths.ACCOUNT_DEPOSIT
				})
			},
		}

	}
</script>