<template>
	<view>
		<template v-if="list.length<=0">
			<EmptyData></EmptyData>
		</template>
		<template v-else>
			<block v-for="(item,index) in list" :key="index">
				<view
					style="padding:10px;margin:20rpx;display: flex;align-items: center;border-bottom:1px solid #F3F3F3;"
					@click="linkInfo(item.code)">
					<view style="text-align: center;padding-right: 20rpx;">
						<CustomLogo :logo="item.logo" :name="item.name"></CustomLogo>
					</view>
					<view style="flex:1 0 86%;">
						<view :style="{color:$theme.PRIMARY}" style="font-size: 32rpx;line-height: 1.6;">
							{{item.name}}
						</view>
						<view style="display: flex;align-items: center;">
							<view style="width: 120rpx;" :style="{color:$theme.LOG_LABEL}">{{item.code}}</view>
							<view style="flex:1 0 40%; font-size: 32rpx;text-align: center;"
								:style="$theme.setStockRiseFall(item.rate*1>0)">
								{{$util.formatMoney(item.price)}}
							</view>
							<view style="margin-left: auto;" :style="$theme.setStockRiseFall(item.rate*1>0)">
								<image :src="`/static/arrow_${item.rate*1>0?'rise':'fall'}.png`" mode="aspectFit"
									:style="$theme.setImageSize(16)" style="padding-right: 12rpx;"></image>
								{{$util.formatNumber($util.formatMathABS(item.rate,2),2)}}%
							</view>
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
		name: 'MarketStockList',
		components: {
			EmptyData,
			CustomLogo
		},
		data() {
			return {
				list: [],
				socket: null, // websocket
			}
		},
		computed: {

		},
		created() {
			this.getList();
		},
		methods: {
			setStyle(val) {
				return {
					backgroundColor: val ? this.$theme.RISE : this.$theme.FALL,
					borderRadius: `44rpx`,
					padding: `8rpx`,
					width: `160rpx`,
					textAlign: `center`,
				}
			},

			// 跳转到详情
			linkInfo(val) {
				uni.navigateTo({
					url: this.$paths.STOCK_OVERVIEW + `?code=${val}`
				})
			},
			async getList() {
				// uni.showLoading({
				// 	title: this.$lang.REQUEST_DATA,
				// });
				// api未替换
				const result = await this.$http.get(`api/goods/list`);
				console.log('result:', result);
				const temp = !result || result.length <= 0 ? [] : result.filter(item => item.stock_id && item
					.stock_id > 0);
				this.list = !temp || temp.length <= 0 ? [] : result.map(item => {
					return {
						logo: item.logo || '',
						name: item.ko_name || '',
						code: item.code || '',
						price: item.close || 0,
						rate: item.returns || 0,
						type_id: item.project_type_id || 0,
					}
				});
				console.log(this.list);
			}
		}
	}
</script>

<style>
</style>