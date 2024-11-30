<template>
	<view>
		<!-- <view style="display: flex;align-items: center;justify-content: center;margin-top: 40rpx;">
			<view class="common_card_bg" style="width: 640rpx;background-color: #FFFFFF;">
				<CardItemThird :info="cardData" :labels="cardLabels"></CardItemThird>
			</view>
		</view>

		<view style="display: flex;justify-content: space-between;margin:30rpx 60rpx;">
			<view :style="setStyle(false)" @click="linkDeposit()">
				<view style="display: flex;align-items: center;justify-content: center;">
					<image src="/static/center_left.png" mode="aspectFit" :style="$theme.setImageSize(40)"></image>
					<view style="font-size: 32rpx;font-weight: 600;padding-left: 20rpx;">{{$lang.DEPOSIT_TITLE}}</view>
				</view>
			</view>
			<view :style="setStyle(true)" @click="linkWithdraw()">
				<view style="display: flex;align-items: center;justify-content: center;">
					<image src="/static/center_right.png" mode="aspectFit" :style="$theme.setImageSize(40)"></image>
					<view style="font-size: 32rpx;font-weight: 600;padding-left: 20rpx;">{{$lang.WITHDRAW_TITLE}}</view>
				</view>
			</view>
		</view> -->

		<view style="padding: 5px;">
			<view class="margin-left-15">
				<TitleSecond :title="$lang.TRADE_TITLE"> </TitleSecond>
				<view style="border-bottom:3px solid #eecda5;width: 30px;"></view>
			</view>

			<view style="display: flex;align-items: center;margin: 20rpx 0;line-height: 1.5;">
				<view style="flex: 1 0 48%;border-radius: 20rpx;background-color: #fff7ee;">
					<view class="flex" style="padding: 15px 10px;">
						<image src="/static/chicang_top1.png" mode="widthFix" style="width: 40px;"></image>
					    <view>
							<view class="bold" style="font-size: 32rpx;text-align: center;" :style="{color:$theme.LOG_VALUE}">
								{{$util.formatMoney(info.frozen)}}
							</view>
							<view style="text-align: center;" :style="{color:$theme.LOG_LABEL}">
								{{$lang.TRADE_TOTAL_BUY_AMOUNT}}
							</view>
						</view>
					</view>
				</view>
				
				
				
				<view style="flex: 1 0 48%; border-radius:20rpx;background-color: #f5fdfc;">
					<view class="flex" style="padding: 15px 10px;">
						<image src="/static/chicang_top2.png" mode="widthFix" style="width: 40px;"></image>
						<view>
							<view class="bold" style="font-size:32rpx;text-align: center;" :style="{color:$theme.LOG_VALUE}">
								{{$util.formatMoney(info.holdYingli)}}
							</view>
							<view style="text-align: center;" :style="{color:$theme.LOG_LABEL}">
								{{$lang.TRADE_VALUATION_GAIN_LOSS}}
							</view>
						</view>
					</view>
				</view>
			</view>

			<view style="display: flex;align-items: center;margin-bottom: 20rpx;line-height: 1.5;">
				<view style="flex: 1 0 48%;border-radius: 20rpx;background-color: #fff7ee;">
					<view class="flex" style="padding: 15px 10px;">
						<image src="/static/chicang_top3.png" mode="widthFix" style="width: 35px;"></image>
						<view>
							<view class="bold" style="font-size: 32rpx;text-align: center;" :style="{color:$theme.LOG_VALUE}">
								{{$util.formatMoney(info.totalZichan)}}
							</view>
							<view style="text-align: center;" :style="{color:$theme.LOG_LABEL}">
								{{$lang.ACCOUNT_AMOUNT_TOTAL}}
							</view>
						</view>
					</view>
				</view>
				<view style="flex: 1 0 48%;border-radius: 20rpx;background-color: #f5fdfc;">
					<view class="flex" style="padding: 15px 10px;">
						<image src="/static/chicang_top4.png" mode="widthFix" style="width: 40px;"></image>
						<view>
							<view class="bold" style="font-size:32rpx;text-align: center;" :style="{color:$theme.LOG_VALUE}">
								{{$util.formatMoney(info.totalYingli)}}
							</view>
							<view style="text-align: center;" :style="{color:$theme.LOG_LABEL}">
								{{$lang.TRADE_TOTAL_GAIN}}
							</view>
						</view>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import TitleSecond from '@/components/title/TitleSecond.vue';
	export default {
		name: 'AccountTradeInfo',
		components: {
			TitleSecond,
		},
		props: {
			info: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				showAmount: false, // 显示金额
				hideAmount: '******', // 隐藏金额
			}
		},
		created() {},
		methods: {
			// 入金 提款 按钮样式
			setStyle(val) {
				return {
					backgroundColor: val ? this.$theme.SECOND : '#FFFFFF',
					color: val ? '#F8F8F8' : this.$theme.SECOND,
					borderRadius: `24rpx`,
					padding: `24rpx 0`,
					width: `280rpx`,
				}
			},

			// 总资产显隐控制
			handleShowAmount() {
				this.showAmount = !this.showAmount;
			},
			// 提款
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
<style lang="scss" scoped>
	.charts {
		// width: 720rpx;
		// height: 500rpx;
		width: 680upx;
		height: 500upx;
	}
</style>