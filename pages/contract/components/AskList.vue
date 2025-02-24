<template>
	<view>
		<block v-for="(item,index) in list" :key="index">
			<view style="display: flex;align-items: center;line-height:1.6;margin:10rpx 0;">
				<view style="flex:0 0 100%;" :style="$theme.depathAsksBG(item[1],max)">
					<view style="display: flex;align-items: center;justify-content: space-between;padding-right:20rpx;">
						<view style="font-size: 26rpx;" :style="$theme.setCoinRiseFallB(true)">
							{{$util.formatCurrency($util.formatNumber(item[0],4))}}
						</view>
						<view style="font-size: 26rpx;">{{$util.formatCurrency($util.formatNumber(item[1],4))}}</view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		name: 'AskList',
		props: {
			list: {
				type: Array,
				default: []
			},
			max: {
				type: Number,
				default: 100
			}
		},
	}
</script>

<style>
</style>