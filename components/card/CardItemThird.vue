<template>
	<view>
		<view style="display: flex;align-items: center;">
			<image src="/static/card_icon_3.png" mode="aspectFit" :style="$theme.setImageSize(120)"
				style="padding-right: 40rpx;"></image>
			<view>
				<view style="display: flex;align-items: center;line-height: 1.6;">
					<view style="color:#666666;font-size: 32rpx;">
						{{labels[0]}}
					</view>
					<image mode="aspectFit" :src="`/static/${showAmount?'show':'hide'}_dark.png`"
						@click.stop="handleShowAmount" :style="$theme.setImageSize(40)" style="margin-left: 20rpx;">
					</image>
				</view>
				<view style="font-size: 48rpx;font-weight: 500;line-height: 1.6;" :style="{color:$theme.SECOND}">
					{{showAmount?$util.formatMoney(info.value1):hideAmount}}
				</view>
			</view>
		</view>
		<view style="display: flex;align-items: center;font-size: 28rpx;margin-top: 28rpx;">
			<view style="flex:1 0 50%;">
				<view style="color:#666666;">{{labels[1]}}</view>
				<view :style="{color:$theme.SECOND}">{{showAmount?$util.formatMoney(info.value2):hideAmount}}</view>
			</view>
			<view style="flex:1 0 50%;text-align: right;">
				<view style="color:#666666;">{{labels[2]}}</view>
				<view :style="{color:$theme.SECOND}">{{showAmount?$util.formatMoney(info.value3):hideAmount}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'CardItemThird',
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
		}
	}
</script>

<style>
</style>