<template>
	<view>
		<view style="display: flex;align-items: center;justify-content: space-between;"
			:style="$theme.setFlexRowReverse(isRtl)">
			<view style="line-height: 48rpx;height: 48rpx;" :style="$theme.setDirection(isRtl)">
				<view style="color:#FFFFFF;font-size: 32rpx;display: inline-block;" :style="setLabelStyle">
					{{labels[0]}}
					<!-- [{{this.$CURRENCY}}] -->
				</view>
				<image mode="aspectFit" :src="`/static/${showAmount?'show':'hide'}.png`" @click.stop="toggleData()"
					:style="$theme.setImageSize(32)">
				</image>
			</view>
			<view>
				<view
					style="background-color: #FFFFFF;color:#157EFB;border-radius: 12rpx;padding:12rpx;font-size: 20rpx;"
					@click="linkTradeLog()">
					{{$lang.CARD_BTN_TREAD_LOG}}
				</view>
			</view>
		</view>
		<view style="color:#FFFFFF;font-size: 56rpx;font-weight:500;line-height: 2;"
			:style="$theme.setDirection(isRtl)">
			{{showAmount?$util.formatMoney(info.value1):hideAmount}}
		</view>
		<view style="color:#FFFFFF;" :style="{textAlign:isRtl?'right':'left'}">
			<template v-if="isRtl">
				<text
					style="font-size: 36rpx;font-weight:100;">{{showAmount?$util.formatMoney(info.value2):hideAmount}}</text>
				<text style="font-size: 30rpx;" :style="setLabelStyle">USD</text>
			</template>
			<template v-else>
				<text style="font-size: 30rpx;" :style="setLabelStyle">USD</text>
				<text
					style="font-size: 36rpx;font-weight:100;">{{showAmount?$util.formatMoney(info.value2):hideAmount}}</text>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		// 
		name: 'CardItemSecond',
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
				hideAmount: '********', // 隐藏金额
			}
		},
		computed: {
			isRtl() {
				return this.$util.isRtl();
			},
			// 设置label的位置
			setLabelStyle() {
				return {
					padding: this.isRtl ? '0 0 0 20rpx' : '0 20rpx 0 0',
				}
			},
		},
		methods: {
			// 机密数据显隐控制
			toggleData() {
				this.showAmount = !this.showAmount;
			},
			// 跳转到交易记录
			linkTradeLog() {
				uni.navigateTo({
					url: this.$paths.TRANSACTION
				})
			},
		}
	}
</script>

<style>
</style>