<template>
	<view style="padding-bottom: 20px;">
		<!-- 股票基本信息 -->
		<template v-if="stockInfo">
			<StockInfoBase :info="stockInfo"></StockInfoBase>
			<StockIndustry :info="stockInfo"></StockIndustry>
		</template>
	</view>
</template>

<script>
	import StockInfoBase from './StockInfoBase.vue';
	import StockIndustry from './StockIndustry.vue';

	export default {
		name: 'StockDetail',
		props: ['code', 'id'],
		components: {
			StockInfoBase,
			StockIndustry,
		},
		data() {
			return {
				stockInfo: null, // 单股概况
			}
		},
		computed: {},
		created() {
			this.getStockInfo();
		},

		methods: {
			// 获取股票信息
			async getStockInfo() {
				// uni.showLoading({
				// 	title: this.$lang.REQUEST_DATA,
				// });
				const result = await this.$http.get(`api/product/info_two`, {
					code: this.code,
					stock_id: this.id,
				});
				console.log(`result:`, result);
				if (!result) return false;
				this.stockInfo = result;
			},
		},
	}
</script>