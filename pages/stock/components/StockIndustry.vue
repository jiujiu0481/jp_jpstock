<template>
	<view>
		<CustomTitle title="信用取引情報" style="font-size: 14px;margin-left: -40rpx;">
			<view :style="{color:$theme.LOG_VALUE}"> </view>
		</CustomTitle>
		<view
			style="padding:10px;font-size: 14px;border-radius: 5px;box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;">
			<view style="padding: 8rpx 12rpx;">
				<view style="display: flex;align-items: center; justify-content: space-between;">
					<view :style="{color:$theme.LOG_LABEL}">信用買残</view>
					<view :style="{color:$theme.LOG_VALUE}">
						{{info.mainStocksDetail.marginTransactionInfo.marginTransactionBuy}}
					</view>
				</view>
			</view>

			<view style="padding:8rpx 12rpx;">
				<view style="display: flex;align-items: center; justify-content: space-between;">
					<view :style="{color:$theme.LOG_LABEL}">前週比</view>
					<view :style="{color:$theme.LOG_VALUE}">
						{{info.mainStocksDetail.marginTransactionInfo.marginTransactionBuyChange}}
					</view>
				</view>
			</view>

			<view style="padding:8rpx 12rpx;">
				<view style="display: flex;align-items: center; justify-content: space-between;">
					<view :style="{color:$theme.LOG_LABEL}">信用売残</view>
					<view :style="{color:$theme.LOG_VALUE}">
						{{info.mainStocksDetail.marginTransactionInfo.marginTransactionSell}}
					</view>
				</view>
			</view>
			<view style="padding:8rpx 12rpx;">
				<view style="display: flex;align-items: center; justify-content: space-between;">
					<view :style="{color:$theme.LOG_LABEL}">前週比</view>
					<view :style="{color:$theme.LOG_VALUE}">
						{{info.mainStocksDetail.marginTransactionInfo.marginTransactionSellChange}}
					</view>
				</view>
			</view>
			<view style="padding:8rpx 12rpx;">
				<view style="display: flex;align-items: center; justify-content: space-between;">
					<view :style="{color:$theme.LOG_LABEL}">信用買残</view>
					<view :style="{color:$theme.LOG_VALUE}">
						{{info.mainStocksDetail.marginTransactionInfo.marginTransactionBuy}}
					</view>
				</view>
			</view>
			<view style="padding:8rpx 12rpx;">
				<view style="display: flex;align-items: center; justify-content: space-between;">
					<view :style="{color:$theme.LOG_LABEL}">信用倍率</view>
					<view :style="{color:$theme.LOG_VALUE}">
						{{info.mainStocksDetail.marginTransactionInfo.marginCreditMagnification}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import CustomTitle from '@/components/CustomTitle.vue';
	export default {
		name: 'StockIndustry',
		components: {
			CustomTitle,
		},
		props: {
			info: {
				type: Object,
				default: {}
			}
		},
		computed: {
			formatData() {
				return [{
					value0: this.info.marketcap_rank,
					unit0: ` ${this.$lang.UNIT_POS}`,
					value1: this.info.marketcap,
					unit1: ` ${this.$lang.UNIT_BILION}`,
					value2: this.info.marketcap_avg,
					unit2: ` ${this.$lang.UNIT_BILION}`,
				}, {
					value0: this.info.net_income_growth_rank,
					unit0: ` ${this.$lang.UNIT_POS}`,
					value1: this.info.net_income_growth,
					unit1: ` %`,
					value2: this.info.net_income_growth_avg,
					unit2: ` %`,
				}, {
					value0: this.info.debt_ratio_rank,
					unit0: ` ${this.$lang.UNIT_POS}`,
					value1: this.info.debt_ratio,
					unit1: ` %`,
					value2: this.info.debt_ratio_avg,
					unit2: ` %`,
				}, {
					value0: this.info.per_rank,
					unit0: ` ${this.$lang.UNIT_POS}`,
					value1: this.info.per,
					unit1: ` 배`,
					value2: this.info.per_avg,
					unit2: ` 배`,
				}, {
					value0: this.info.pbr_rank,
					unit0: ` ${this.$lang.UNIT_POS}`,
					value1: this.info.pbr,
					unit1: ` 배`,
					value2: this.info.pbr_avg,
					unit2: ` 배`,
				}, {
					value0: this.info.roe_rank,
					unit0: ` ${this.$lang.UNIT_POS}`,
					value1: this.info.roe,
					unit1: ` %`,
					value2: this.info.roe_avg,
					unit2: ` %`,
				}];
			},
		}
	}
</script>