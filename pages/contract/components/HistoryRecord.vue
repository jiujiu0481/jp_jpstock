<template>
	<view>
		<template v-if="!list || list.length<=0">
			<EmptyData></EmptyData>
		</template>
		<template v-else>
			<block v-for="(item,index) in list" :key="index">
				<view class="common_block" style="border-radius: 16rpx;padding: 10px;margin-top: 10px;">
					<view style="display: flex;align-items: center;">
						<view style="padding-right: 30rpx;font-size: 28rpx;" :style="{color:$theme.SECOND}">
							{{item.name}}
						</view>
						<view
							style="background-color: #F3F3F3;font-size: 22rpx;border-radius: 8rpx;padding:6rpx 16rpx;margin:0 30rpx"
							:style="{color:item.fx==1?'#6D41FF':$theme.SECOND}">
							{{item.fxText}}
						</view>
						<view
							style="background-color: #F3F3F3;font-size: 22rpx;border-radius: 8rpx;padding:6rpx 16rpx;margin:0 20rpx;"
							:style="{color:$theme.FALL}">
							{{item.lever+` X`}}
						</view>
						<view class="common_tag" style="margin-left: auto;padding: 4px 6px;border-radius: 8px;" :style="setStyle(item.direct)">
							{{item.directText}}
						</view>
						<!-- <view style="margin-left: auto;" :style="{color:item.status==1? $theme.FALL:'#B8B8B8'}">
							{{item.status==1?$lang.COIN_HISTORY_TIP_CANCEL:$lang.COIN_HISTORY_TIP_TRADE}}
						</view> -->
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;line-height:1.8;">
						<view :style="{color:$theme.LOG_LABEL}">購入手数料</view>
						<view style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">
							{{$util.formatCurrency(item.quantity)}}
						</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
						<view :style="{color:$theme.LOG_LABEL}">購入合計</view>
						<view style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">
							{{$util.formatCurrency(item.baozhengjin)}}
						</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;line-height:1.8;">
						<view :style="{color:$theme.LOG_LABEL}">過去の購入価格</view>
						<view style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">
							{{$util.formatCurrency(item.buyprice)}}
						</view>
					</view>

					<view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
						<view :style="{color:$theme.LOG_LABEL}">過去の販売価格</view>
						<view style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">
							{{$util.formatCurrency(item.price)}}
						</view>
					</view>


					<view style="display: flex;align-items: center;justify-content: space-between;line-height:1.8;">
						<view :style="{color:$theme.LOG_LABEL}">過去の手数料</view>
						<view style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">
							{{$util.formatCurrency(item.fee)}}
						</view>
					</view>


					<view style="display: flex;align-items: center;justify-content: space-between;line-height:1.8;">
						<view :style="{color:$theme.LOG_LABEL}">過去の利益</view>
						<view style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">
							{{$util.formatCurrency(item.interest)}}
						</view>
					</view>

					<view style="display: flex;align-items: center;justify-content: space-between;line-height:1.8;">
						<view :style="{color:$theme.LOG_LABEL}">利益または損失</view>
						<template v-if="item.direct==1">
							<view style="font-size: 28rpx;" :style="$theme.setStockRiseFall(item.buyProfitRate>0)">
								{{$util.formatMoney(item.buyProfitRate)}}{{item.buyProfitRate=='--'?``:`%`}}
							</view>
						</template>
						<template v-else>
							<view style="font-size: 28rpx;" :style="$theme.setStockRiseFall(item.sellProfitRate>0)">
								{{ $util.formatMoney(item.sellProfitRate)}}{{item.sellProfitRate=='--'?``:`%`}}
							</view>
						</template>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;line-height:1.8;">
						<view :style="{color:$theme.LOG_LABEL}">歴史的な日付</view>
						<view style="font-size: 26rpx;" :style="{color:$theme.LOG_VALUE}">
							{{item.created_at}}
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
		name: 'HistoryRecord',
		components: {
			EmptyData
		},
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				isShowCurCoin: true, // 是否僅顯示當前coin
			}
		},
		created() {},

		methods: {
			// 過濾出當前coin的數據
			filterCoin(e) {
				this.isShowCurCoin = e;
				// this.getList(); // 重新請求數據
				this.$emit('action', this.isShowCurCoin);
			},
			setStyle(val) {
				const temp = val == 1 ? this.$theme.RISE : this.$theme.FALL;
				return {
					backgroundColor: this.$theme.RGBConvertToRGBA(temp, 20),
					color: temp,
				}
			},
			// setStyle(val) {
			// 	const temp = val == 1 ? this.$theme.RISE : this.$theme.FALL;
			// 	return {
			// 		backgroundColor: this.$theme.RGBConvertToRGBA(temp, 20),
			// 		color: temp,
			// 		borderRadius: `8rpx`,
			// 		minWidth: `60rpx`,
			// 		padding: `6rpx 16rpx`,
			// 		fontSize: `22rpx`,
			// 		textAlign: `center`,
			// 	}
			// },
		}
	}
</script>

<style>
</style>