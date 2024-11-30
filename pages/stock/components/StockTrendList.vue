<template>
	<view style="padding: 20rpx;">
		<CustomTitle :title="$lang.STOCK_TRADE_TREND_RECENT_TITLE"></CustomTitle>

		<view style="border-radius:16rpx 16rpx 0 0;background-color: #6f62de;border-bottom: 1px solid #4b4b97;">
			<view style="display: flex;align-items: center;padding:10px;">
				<block v-for="(item,index) in $lang.STOCK_TRADE_TREND_RECENT_LABELS">
					<view :style="{flex:index==0?'20%':'26%',textAlign:index==0?'':'right',color:'#FFFFFF'}">
						1
					</view>
				</block>
			</view>
		</view>
		<block v-for="(item,index) in 5" :key="index">
			<view
				style="display: flex;align-items: center;padding:10px;border-bottom: 1px solid #4b4b97;background-color: #F8F7FF;">
				<view style="flex:20%;font-size: 20rpx;" :style="{color:$theme.LOG_VALUE}">{{item.dt}}</view>
				<view :style="$theme.setStockRiseFall(item.net_vol_individual>0)" style="flex:26%;text-align: right;">
					111
				</view>
				<view :style="$theme.setStockRiseFall(item.net_vol_institutional>0)"
					style="flex:26%;text-align: right;">
					222
				</view>
				
			</view>
		</block>
	</view>
</template>

<script>
	import CustomTitle from '@/components/CustomTitle.vue';
	export default {
		name: 'StockTrendList',
		components: {
			CustomTitle
		},
		props: {
			list: {
				type: Array,
				default: []
			}
		},
	}
</script>