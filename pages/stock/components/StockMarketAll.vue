<template>
	<view>
		<template v-if="list.length<=0">
			<EmptyData></EmptyData>
		</template>

		<template v-else>
			<!-- card 模式 数据 -->

			<!-- 列表 模式 数据 -->
			<block v-for="(item,index) in list" :key="index">
				<view class="common_block" style="display: flex;align-items: center;padding:10px;"
					@click="link(item.code)">
					<view style="width: 90rpx;text-align: center;">
						<CustomLogo :logo="item.logo" :name="item.name"></CustomLogo>
					</view>
					<view style="flex: 0 0 50%;padding-left: 6px;">
						<view style="font-size: 32rpx;color:#FFFFFF;">{{item.name}}</view>
						<view style="font-size: 24rpx;color: #CFCFCF;">{{item.code}}</view>
					</view>
					<view style="margin-left: auto;text-align: right;font-size: 28rpx;">
						<view :style="$theme.setStockRiseFall(item.rate>0)">
							<image :src="`/static/arrow_${item.rate>0?'rise':'fall'}.png`" mode="aspectFit"
								:style="$theme.setImageSize(24)" style="padding-right: 20rpx;"></image>
							{{($util.formatNumber($util.formatMathABS(item.rate),2))}}%
						</view>
						<view style="font-size: 32rpx;color: #CBCBCF;">
							{{$util.formatNumber(item.price)}}{{$lang.CURRENCY_UNIT}}
						</view>
					</view>
				</view>
			</block>
		</template>
	</view>
</template>

<script>
	import EmptyData from '@/components/EmptyData.vue';
	import CustomLogo from '@/components/CustomLogo.vue';
	export default {
		name: 'StockMarketAll',
		components: {
			EmptyData,
			CustomLogo,
		},
		data() {
			return {
				list: [],
				gpIndex: 0,
				curPage: 1, // 当前页码
				timer: null,
			};
		},
		computed: {
			// best() {
			// 	// 取最高三条数据为顶部 card 展示
			// 	return this.list.sort((a, b) => b.goods.rate - a.goods.rate).slice(0, 3);
			// }
		},
		created() {
			console.log('child created', this.timer);
			this.getData();
		},
		mounted() {
			console.log('child mounted', this.timer);
			this.onSetTimeout();
		},
		deactivated() {
			console.log('child deactivated', this.timer);
			this.clearTimer();
		},
		methods: {
			onSetTimeout() {
				this.timer = setInterval(() => {
					console.log("setInterval");
					this.getData();
				}, 3000);
			},
			clearTimer() {
				if (this.timer) {
					clearInterval(this.timer);
					this.timer = null;
					console.log('clearTimer', this.timer);
				}
			},

			// 跳转到股票详情
			link(code) {
				if (!code || code == '') return false;
				uni.navigateTo({
					url: `${this.$paths.STOCK_OVERVIEW}?code=${code}`
				});
			},

			async getData() {
				uni.showLoading({
					title: this.$lang.LOADING_GET_DATA
				});
				const result = await this.$http.get(`api/goods/list`, {
					page: this.curPage,
					gp_index: this.gpIndex
				});
				uni.hideLoading();
				console.log(result);
				console.log('result.data:', result.data);
				if (result && result.code == 0) {
					const temp = !result.data ||
						result.data.length <= 0 ? [] : result.data;

					this.list = temp.length <= 0 ? [] : temp.map(item => {
						if (item.stock_id && item.stock_id > 0) {
							return {
								logo: item.logo || '',
								name: item.ko_name || '',
								code: item.code || '',
								price: item.close || 0,
								rate: item.returns || 0,
								type_id: item.project_type_id || 0,
							}
						}
					});
					console.log('list:', this.list);
				} else {
					uni.showToast({
						title: result.message || this.$lang.API_HTTP_ERROR,
						icon: 'none'
					})
				}
			},
		},
	}
</script>

<style>
</style>