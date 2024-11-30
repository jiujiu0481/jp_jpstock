<template>
	<view style="margin-top: 30rpx;">
		<CustomTitle title="信用取引情報">
			<view style="margin-left: auto;" :style="{color:$theme.LOG_LABEL}">
				
			</view>
		</CustomTitle>
		<view style="height: 1px;background-color: #E5E5E5;margin:0 40rpx;"></view>
		<view style="padding:10px 0;">
			<block v-for="(item,index) in 5" :key="index">
				<view style="background-color: #F8F7FF;margin:20rpx;border-radius: 20rpx;">
					<view style="padding-left: 30rpx;font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">
						{{item}}
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 30rpx;">
						<block v-for="(subItem,subIndex) in $lang.STOCK_TRADE_TREND_INFO_TITLE" :key="subIndex">
							<view style="flex:33%;padding: 4px;text-align: center;line-height: 1.6;">
								<view :style="{color:$theme.LOG_VALUE}">2222222</view>
								<view :style="$theme.setStockRiseFall(1>0)">
									123123
								</view>
							</view>
						</block>
					</view>
				</view>				
			</block>
		</view>
	</view>
</template>

<script>
	import CustomTitle from '@/components/CustomTitle.vue';
	export default {
		name: 'StockTrend',
		components: {
			CustomTitle,
		},
		props: {
			info: {
				type: Object,
				default: {}
			},
		},
		computed: {
			formatData() {
				return [
					[this.info['net_volume'].net_vol_individual,
						this.info['net_volume'].net_vol_institutional,
						this.info['net_volume'].net_vol_foreigner,
					],
					[
						this.info['cum_volume'].cum_vol_individual,
						this.info['cum_volume'].cum_vol_institutional,
						this.info['cum_volume'].cum_vol_foreigner,
					]
				]
			}
		}
	}
</script>