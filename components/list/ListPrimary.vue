<template>
	<view>
		<template v-if="list.length<=0">
			<EmptyData></EmptyData>
		</template>
		<template v-else>
			<block v-for="(item,index) in list" :key="index">
				<view class="common_block" style="display: flex;align-items: center;padding:10px;"
					@click="linkStockInfo(item.code)">
					<template v-if="serial">
						<view style="width: 60rpx; text-align: center;">
							<template v-if="index<=2">
								<image :src="`/static/leve_${index+1}.png`" :style="$theme.setImageSize(48)"
									style="padding-right: 6px;"></image>
							</template>
							<template v-else>
								<view style="padding-right: 6px;text-align: center;" :style="{color:$theme.TITLE}">
									{{index+1}}
								</view>
							</template>
						</view>
					</template>
					<view style="width: 90rpx;text-align: center;">
						<template v-if="!item.logo || item.logo==''">
							<view :style="$theme.setImageSize(80)"
								style="background-color:#2d2c62;text-align: center;line-height: 80rpx;color: #FFFFFF;margin-bottom: 4px;border-radius: 8px;font-size: 18px;">
								{{item.name.slice(0,1)}}
							</view>
						</template>
						<template v-else>
							<image mode="aspectFit" :src="$util.setLogo(item.logo)" :style="$theme.setImageSize(80)"
								style="border-radius: 8px;"></image>
						</template>
					</view>
					<view style="flex: 0 0 40%;padding-left: 6px;" :style="{color:$theme.TITLE}">
						<view :style="{color:$theme.STOCK_NAME}" style="font-size: 32rpx;">{{item.name}}</view>
						<view :style="{color:$theme.LABEL}" style="font-size: 24rpx;">{{item.code}}</view>
					</view>
					<view style="margin-left: auto;text-align: right;font-size: 28rpx;">
						<view :style="$theme.setStockRiseFall(item.rate>0)">
							<image :src="`/static/arrow_${item.rate>0?'rise':'fall'}.png`" mode="aspectFit"
								:style="$theme.setImageSize(24)"></image>
							{{($util.formatNumber($util.formatMathABS(item.rate),2))}}%
						</view>
						<view style="font-weight: 800;font-size: 32rpx;color: #333333;">
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
	export default {
		name: 'ListPrimary',
		components: {
			EmptyData,
		},
		props: {
			// 列表数据
			list: {
				type: Array,
				default: []
			},
			// 是否需要序号
			serial: {
				type: Boolean,
				default: false,
			}
		},

		methods: {
			// 跳转到股票详情
			linkStockInfo(code) {
				if (!code || code == '') return false;
				uni.navigateTo({
					url: `${this.$paths.STOCK_OVERVIEW}?code=${code}`
				});
			}
		}
	}
</script>
