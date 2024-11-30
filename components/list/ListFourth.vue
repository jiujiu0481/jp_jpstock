<template>
	<view>
		<template v-if="list.length<=0">
			<EmptyData></EmptyData>
		</template>
		<template v-else>
			<block v-for="(item,index) in list" :key="index">
				<view class="common_block"
					style="display: flex;align-items: center;padding:10px;background-color: #3F3384;border-radius: 8rpx;box-shadow: none;"
					@click="link(item.code)">

					<view style="width: 90rpx;text-align: center;">
						<CustomLogo :logo="item.logo" :name="item.name"></CustomLogo>
					</view>
					<view style="font-size: 32rpx;color: #FFFFFF;flex:50%;padding-left: 10px;">
						{{item.name}}
						<!-- <image :src="`/static/arrow_${item.rate>0?'rise':'fall'}.png`" mode="aspectFit"
							:style="$theme.setImageSize(28)" style="padding-left: 20rpx;"></image> -->
					</view>
					<view style="font-size: 28rpx;color: #CBCBCF;flex: 30%;text-align: right;">
						{{$util.formatNumber(item.price)}}
					</view>
					<view :style="$theme.setStockRiseFall(item.rate>0)" style="margin-left: auto;padding-left: 32rpx;">
						{{($util.formatNumber($util.formatMathABS(item.rate),2))}}%
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
		name: 'ListFourth',
		components: {
			EmptyData,
			CustomLogo,
		},
		props: {
			// 列表数据
			list: {
				type: Array,
				default: []
			},
		},

		methods: {
			// 跳转到股票详情
			link(code) {
				if (!code || code == '') return false;
				uni.navigateTo({
					url: `${this.$paths.STOCK_OVERVIEW}?code=${code}`
				});
			}
		}
	}
</script>