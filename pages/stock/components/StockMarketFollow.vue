<template>
	<view>
		<template v-if="list.length<=0">
			<EmptyData></EmptyData>
		</template>

		<template v-else>
			<!-- card 模式 数据 -->

			<!-- 列表 模式 数据 -->
			<block v-for="(item,index) in list" :key="index">
				<view class="common_block"
					style="display: flex;align-items: center;padding:10px;background-color: #3F3384;border-radius: 8rpx;box-shadow: none;"
					@click="link(item.code)">

					<view style="width: 90rpx;text-align: center;">
						<CustomLogo :logo="item.logo" :name="item.name"></CustomLogo>
					</view>
					<view style="flex: 0 0 70%;padding-left: 6px;">
						<view style="font-size: 32rpx;color: #FFFFFF">
							{{item.name}}
							<image :src="`/static/arrow_${item.rate>0?'rise':'fall'}.png`" mode="aspectFit"
								:style="$theme.setImageSize(28)" style="padding-left: 20rpx;"></image>
						</view>
						<view
							style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
							<view style="font-size: 28rpx;color: #CBCBCF;">
								{{$util.formatNumber(item.price)}}{{$lang.CURRENCY_UNIT}}
							</view>
							<view style="font-size: 26rpx;" :style="$theme.setStockRiseFall(item.rate>0)">
								{{$util.formatNumber(item.close)}}{{$lang.CURRENCY_UNIT}}
							</view>
							<view :style="$theme.setStockRiseFall(item.rate>0)">
								{{($util.formatNumber($util.formatMathABS(item.rate),2))}}%
							</view>
						</view>
					</view>

					<view style="margin-left: auto;">
						<image :src="`/static/stock_${item.follow?'follow':'unfollow'}.png`" mode="aspectFit"
							:style="$theme.setImageSize(52)" @click.stop="handleUnFollow(item.gid)">
						</image>
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
		name: 'StockMarketFollow',
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
				const result = await this.$http.get(`api/user/collect_list`);
				uni.hideLoading();
				console.log(result);
				console.log(result.data);
				if (result && result.code == 0) {
					const temp = !result.data || !result.data.list ||
						result.data.list.length <= 0 ? [] : result.data.list;

					this.list = temp.length <= 0 ? [] : temp.map(item => {
						if (item.gid && item.gid > 0) {
							return {
								id: item.gid,
								logo: item.goods.logo || '',
								name: item.goods.name || '',
								code: item.goods.code || '',
								price: item.goods.current_price || 0,
								rate: item.goods.rate || 0,
								follow: true,
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


			// 取关
			async handleUnFollow(id) {
				const result = await this.$http.post(`api/user/collect_edit`, {
					gid: id,
				})
				if (result && result.code == 0) {
					uni.showToast({
						title: result.message,
						icon: 'none'
					});
					this.getData();

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