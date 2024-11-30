<template>
	<scroll-view :scroll-x="true" style="white-space: nowrap;padding: 0 10px 0 10px;" @touchmove.stop>
		<block v-for="(item,index) in list" :key="index">
			<view class="common_block"
				style="width: 200px;display: inline-block; padding:10px;margin-right: 20px;border-radius: 6px;text-align: center;"
				@click="linkStockInfo(item.code)">
				<view style="display: flex;align-items: center;">
					<view style="width: 90rpx;text-align: center;">
						<template v-if="!item.logo || item.logo==''">
							<view :style="$theme.setImageSize(80)"
								style="background-color:#2d2c62;text-align: center;line-height: 80rpx;color: #FFFFFF;margin-bottom: 4px;border-radius: 10%;font-size: 18px;">
								{{item.name.slice(0,1)}}
							</view>
						</template>
						<template v-else>
							<image mode="aspectFit" :src="$util.setLogo(item.logo)" :style="$theme.setImageSize(80)"
								style="border-radius: 10%;"></image>
						</template>
					</view>
					<view style="padding-left: 6px;font-size: 36rpx;">
						<view style="color:#333333"> {{item.name}}</view>
						<view :style="{color:$theme.LABEL}" style="font-size: 24rpx;">{{item.code}}</view>
					</view>
					<view style="margin-left: auto;text-align: right;">
						<view :style="$theme.setStockRiseFall(item.rate>0)">
							<image :src="`/static/arrow_${item.rate>0?'rise':'fall'}.png`" mode="aspectFit"
								:style="$theme.setImageSize(24)"></image>
							{{($util.formatNumber($util.formatMathABS(item.rate),2))}}%
						</view>
					</view>
				</view>
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<view style="font-size: 32rpx;font-weight: 700;" :style="{color:$theme.TEXT}">
						{{$util.formatNumber(item.price)}}{{$lang.CURRENCY_UNIT}}
					</view>
					<image :src="`/static/line_${item.rate>0?'rise':'fall'}.png`" mode="aspectFit"
						:style="$theme.setImageSize(176,78)"></image>
				</view>
			</view>
		</block>
	</scroll-view>
</template>

<script>
	export default {
		name: 'ListSecond',
		props: {
			// 列表数据
			list: {
				type: Array,
				default: []
			},
		},
		methods: {
			// 跳转到股票详情
			linkStockInfo(code) {
				uni.navigateTo({
					url: `${this.$paths.STOCK_OVERVIEW}?code=${code}`
				});
			}
		}
	}
</script>

<style>
</style>