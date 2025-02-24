<template>
	<view>
		<template v-if="!list || list.length<=0">
			<EmptyData></EmptyData>
		</template>
		<template v-else>
			<block v-for="(item,index) in list" :key="index">
				<view class="common_block" style="border-radius:8px;padding: 10px;margin-top: 10px;">
					<view style="display: flex;align-items: center;">
						<view style="padding-right: 10rpx;font-size: 28rpx;" :style="{color:$theme.SECOND}">
							{{item.name}}
						</view>
						<view
							style="background-color: #F3F3F3;font-size: 22rpx;border-radius: 8rpx;padding:6rpx 16rpx;margin:0 20rpx;"
							:style="{color:$theme.FALL}">
							{{item.lever+` X`}}
						</view>
						<view
							style="background-color: #F3F3F3;font-size: 22rpx;border-radius: 8rpx;padding:6rpx 16rpx;margin:0 20rpx;"
							:style="{color:item.fx==1?'#6D41FF':$theme.SECOND}">
							{{item.fxText}}
						</view>
						<view style="margin-left: auto;display: flex; align-items: center;text-align: center;">
							<view class="common_tag" style="padding: 4px 6px;border-radius: 8px	;" :style="setStyle(item.direct)">
								{{item.directText}}
							</view>
						</view>
					</view>
					<view
						style="display: flex;align-items: center;justify-content: space-between;margin-top: 20rpx;line-height: 1.4;">
						<view style="flex:33.33%">
							<view style="font-size: 24rpx;" :style="{color:$theme.LOG_LABEL}">
								購入価格
							</view>
							<view style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">
								{{$util.formatCurrency(item.price)}}
							</view>
						</view>
						<view style="flex:33.33%;text-align: center;">
							<view style="font-size: 24rpx;" :style="{color:$theme.LOG_LABEL}">
								購入数量
							</view>
							<view style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">
								{{$util.formatCurrency(item.quantity)}}
							</view>
						</view>
						<view style="flex:33.33%;margin-left:auto;text-align: right;">
							<view style="font-size: 24rpx;" :style="{color:$theme.LOG_LABEL}">
								購入合計
							</view>
							<view style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">
								{{$util.formatCurrency(item.amount)}}
							</view>
						</view>
					</view>
					<view
						style="display: flex;align-items: center;justify-content: space-between;margin-top: 20rpx;line-height: 1.4;">
						<view style="flex:33.33%">
							<view style="font-size: 24rpx;" :style="{color:$theme.LOG_LABEL}">
								現在の価格
							</view>
							<view style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">
								{{$util.formatCurrency(item.curPrice)}}
							</view>
						</view>
						<view style="flex:33.33%;text-align: center;">
							<view style="font-size: 24rpx;" :style="{color:$theme.LOG_LABEL}">
								手数料
							</view>
							<view style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">
								{{$util.formatCurrency(item.fee)}}
							</view>
						</view>
						<view style="flex:33.33%;margin-left:auto;text-align: right;">
							<view style="font-size: 24rpx;" :style="{color:$theme.LOG_LABEL}">
								利益または損失
							</view>
							<view style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">
								{{$util.formatCurrency(item.direct==1? item.profitLossBuy:item.profitLossSell)}}
							</view>
						</view>
					</view>

					<view
						style="display: flex;align-items: center;justify-content: space-between;margin-top: 20rpx;line-height: 1.4;">
						<view style="flex:33.33%">
							<view style="font-size: 24rpx;" :style="{color:$theme.LOG_LABEL}">
								利益確定
							</view>
							<view style="font-size: 28rpx;" :style="$theme.setStockRiseFall(true)">
								{{item.profit=='--'?item.profit:$util.formatCurrency(item.profit)}}
							</view>
						</view>
						<view style="flex:33.33%;text-align: center;">
							<view style="font-size: 24rpx;" :style="{color:$theme.LOG_LABEL}">
								損失限定
							</view>
							<view style="font-size: 28rpx;" :style="$theme.setStockRiseFall(false)">
								{{item.loss=='--'?item.loss:$util.formatCurrency(item.loss)}}
							</view>
						</view>
						<view style="flex:33.33%;margin-left:auto;text-align: right;">
							<view style="font-size: 24rpx;" :style="{color:$theme.LOG_LABEL}">
								浮動損益
							</view>
							<view style="font-size: 28rpx;"
								:style="$theme.setCoinRiseFallB(item.floatPLBuy>0||item.floatPLSell>0)">
								{{$util.formatCurrency(item.direct==1? item.floatPLBuy:item.floatPLSell)}}
							</view>
						</view>
					</view>


					<view style="display: flex;align-items: center;justify-content: space-between; line-height:2.4;">
						<view style="font-size: 24rpx;" :style="{color:$theme.LOG_LABEL}">
							<!-- {{item.sn}} -->
						</view>
						<view style="font-size: 26rpx;" :style="{color:$theme.LOG_LABEL}">
							{{item.created_at}}
						</view>
					</view>

					<view style="display: flex; align-items: center;justify-content:space-between;">
						<view
							style="background-color: #00C4E3;color:#FFFFFF;padding:16rpx 32rpx;border-radius: 50rpx;font-size: 24rpx;text-align: center;"
							@tap="openProfitLossModal(item)">
							利益確定と損失限定
						</view>
						<view
							style="background-color: #6D41FF;color:#FFFFFF;padding:16rpx 32rpx;border-radius: 50rpx;font-size: 24rpx;text-align: center;"
							@tap="openCloseModal(item)">
							ポジションを決済する
						</view>
					</view>
				</view>
			</block>
		</template>

		<template v-if="isShowProfitLoss">
			<ProfitLoss :info="infoData" @action="handleProfitLossClose"></ProfitLoss>
		</template>
		<template v-if="isShowClose">
			<CloseModal :info="infoData" @action="handleClose"></CloseModal>
		</template>
	</view>
</template>

<script>
	import EmptyData from '@/components/EmptyData.vue';
	import ProfitLoss from './ProfitLoss.vue';
	import CloseModal from './CloseModal.vue';
	export default {
		name: 'HoldRecord',
		components: {
			EmptyData,
			ProfitLoss,
			CloseModal,
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
				// 傳入彈層的數據
				infoData: {},
				isShowProfitLoss: false, // 止盈止損彈層
				isShowClose: false, // 平倉彈層
			}
		},
		created() {},
		mounted() {
			// uni.showToast({
			// 	title: JSON.stringify(this.list[0]),
			// 	icon:'none'
			// })
		},
		methods: {
			// 過濾出當前coin的數據
			filterCoin(e) {
				this.isShowCurCoin = e;
				// 通知父组件
				this.$emit('action', this.isShowCurCoin);
			},
			openProfitLossModal(val) {
				console.log(`pl:`, val);
				uni.hideTabBar(); // 隐藏tabBar
				this.isShowProfitLoss = true;
				this.infoData = val;
			},
			handleProfitLossClose(val) {
				this.isShowProfitLoss = false;
				uni.showTabBar(); // 显示tabBar
				// 通知父组件
				this.$emit('action', this.isShowCurCoin);
			},
			openCloseModal(val) {
				console.log(`close:`, val);
				uni.hideTabBar(); // 隐藏tabBar
				this.isShowClose = true;
				this.infoData = val;
			},

			handleClose(val) {
				this.isShowClose = false;
				uni.showTabBar(); // 显示tabBar
				// 通知父组件
				this.$emit('action', this.isShowCurCoin);
			},

			setStyle(val) {
				const temp = val == 1 ? this.$theme.FALL : this.$theme.RISE;
				return {
					backgroundColor: this.$theme.RGBConvertToRGBA(temp, 20),
					color: temp,
				}
			},
		}
	}
</script>

<style>
</style>