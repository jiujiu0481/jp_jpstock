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
		name: 'ListThird',
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
			},
			// 取关
			async handleUnFollow(id) {
				const result = await this.$http.post(`api/user/collect_edit`, {
					gid: id,
				})
				this.$emit('action', 1);
			},
		}
	}
</script>