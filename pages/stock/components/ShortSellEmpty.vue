<template>
	<view >
		<CustomTitle :title="$lang.STOCK_TRADE_SELL_EMPTY_TITLE"></CustomTitle>
		<block v-for="(item,index) in formatSellEmpty" :key="index">
			<view
				style="margin:20rpx 24rpx;line-height: 2;padding:10px;border-bottom: 1px solid #4b4b97;background-color: #2D54AB1A;border-radius: 16rpx 16rpx 0 0;">
				<view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
					<view style="font-size: 28rpx;font-weight: 700;color:#121212;">{{item.title}}</view>
					<view style="font-size: 28rpx;font-weight: 700;" :style="{color:$theme.PRIMARY}">
						{{$util.formatNumber(item.close)}}
					</view>
				</view>
				<view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
					<view style="font-size: 32rpx;" :style="{color:$theme.PRIMARY}">
						{{$util.formatNumber(item.amount)}}{{$lang.QUANTITY_UNIT}}
					</view>
					<view style="font-size:32rpx;" :style="$theme.setStockRiseFall(item.rate>0)">
						{{$util.formatNumber(item.rate,2)}}%
					</view>
				</view>
				<view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.5;"
					:style="{color:$theme.LOG_VALUE}">
					<view style="font-size: 24rpx;">{{item.desc}}</view>
					<view style="font-size: 24rpx;">{{item.dt}}</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import CustomTitle from '@/components/CustomTitle.vue';
	export default {
		name: 'ShortSellEmpty',
		components: {
			CustomTitle,
		},
		props: {
			info: {
				type: Array,
				default: []
			}
		},
		computed: {
			// 格式化卖空相关
			formatSellEmpty() {
				// 卖空的labels
				const titles = [
					this.$lang.STOCK_TRADE_SELL_EMPTY_TITLE,
					this.$lang.STOCK_TRADE_SELL_EMPTY_TITLE_BALANCE,
				];
				// 卖空的desc
				const descs = [
					this.$lang.STOCK_TRADE_SELL_EMPTY_ITEM_DESC_1ST,
					this.$lang.STOCK_TRADE_SELL_EMPTY_ITEM_DESC_2ND,
				];
				let temp = [];
				this.info.forEach((item, index) => {
					// 此处卖空只需要两条数据的值，也就是按照日期的最近卖空
					if (index < 2) {
						temp.push({
							title: titles[index], // 卖空的labels
							desc: descs[index], // 卖空的desc
							amount: this.info[index].short_volume,
							rate: this.info[index].short_volume_weight,
							dt: this.info[index].dt,
							close: this.info[index].close,
						})
					}
				})
				return temp;
			}
		}
	}
</script>

<style>
</style>