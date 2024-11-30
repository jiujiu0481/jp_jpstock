<template>
	<view>
		<view class="common_mask" @click="actionEvent()"></view>
		<view class="common_popup" style="min-height:55vh;padding-bottom: 80rpx;width: 95%;border-radius: 10px;">
			<view class="" style="display: flex;align-items: center;margin-right: 20px;margin-top: 20px;">
				<view class="flex-1">
					<text class="bold" style="font-size: 36rpx;padding: 0px 20px;">{{info.name}}</text>
					<view style="padding: 0px 40px;">{{info.code}}</view>
				</view>
				<image src="/static/close.png" :style="$theme.setImageSize(20)" @click="actionEvent()"></image>
			</view>

			<view style="background-color: #f7f9ff;width: 95%;border-radius: 10px;margin-left: 10px;">
				<view class="item" style="margin-top: 20px;">
					<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_MODAL_BUY_TIME}}</view>
					<view :style="{color:$theme.LOG_VALUE}">{{info.buyCT}}</view>
				</view>
				<view class="item">
					<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_MODAL_FLOAT_PROFIT}}
					</view>
					<view :style="{color:$theme.LOG_VALUE}">
						{{$util.formatMoney(info.buyFloatProfit)+` ${$lang.CURRENCY_UNIT}`}}
					</view>
				</view>
				<view class="item">
					<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_MODAL_LEVER}}
					</view>
					<view :style="{color:$theme.LOG_VALUE}">
						x {{info.lever}}
					</view>
				</view>

				<view class="item">
					<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_MODAL_PROFIT}}
					</view>
					<view :style="{color:$theme.LOG_VALUE}">
						{{$util.formatMoney(info.buyProfit*1)+` ${$lang.CURRENCY_UNIT}`}}
					</view>
				</view>
				<view class="item">
					<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_MODAL_BUY_PRICE}}
					</view>
					<view :style="{color:$theme.LOG_VALUE}">
						{{$util.formatMoney(info.buyPrice)+` ${$lang.CURRENCY_UNIT}`}}
					</view>
				</view>

				<view class="item">
					<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_MODAL_BUY_QTY}}
					</view>
					<view :style="{color:$theme.LOG_VALUE}">
						{{$util.formatNumber(info.buyQTY)+` ${$lang.QUANTITY_UNIT}`}}
					</view>

				</view>
				<view class="item">
					<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_MODAL_FEE}}
					</view>
					<view :style="{color:$theme.LOG_VALUE}">
						{{$util.formatMoney(info.buyFee)+` ${$lang.CURRENCY_UNIT}`}}
					</view>
				</view>
				<view class="item">
					<view style="flex: 30%;" :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_MODAL_BUY_AMOUNT}}
					</view>
					<view :style="{color:$theme.LOG_VALUE}">
						{{$util.formatMoney(info.buyAmont)+` ${$lang.CURRENCY_UNIT}`}}
					</view>
				</view>

			</view>

			<view style="display: flex;justify-content: space-between;margin:30rpx 70rpx;">
				<view class="" style="background-color: #09d2a0;border-radius: 30px;padding: 10px 45px;color: #fff;"
					@tap="linkStockInfo(info.code)">
					{{$lang.BTN_DETAIL}}
				</view>
				<view class="" style="background-color: #f80516;border-radius: 30px;padding: 10px 50px;color: #fff;"
					@tap.stop="handleSell(info.id)">
					{{$lang.BTN_SELL}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'AccountTradeHoldInfo',
		props: {
			info: {
				type: Object,
				default: {}
			},
		},
		data() {
			return {
				isShow: true,
			}
		},

		methods: {
			// 跳转到股票详情
			linkStockInfo(code) {
				uni.navigateTo({
					url: `${this.$paths.STOCK_OVERVIEW}?code=${code}`
				});
			},

			actionEvent() {
				this.isShow = false;
				this.$emit('action', 1);
			},
			// 平仓/卖出
			async handleSell(id) {
				const result = await uni.showModal({
					title: this.$lang.SELL_TIP,
					cancelText: this.$lang.BTN_CANCEL,
					confirmText: this.$lang.BTN_CONFIRM,
					confirmColor: this.$theme.PRIMARY,
					cancelColor: '#999999',
				});
				console.log('异步弹层:', result);
				if (result[1].confirm) {
					this.confirmSell(id);
				}
			},
			// 平仓功能
			async confirmSell(id) {
				const result = await this.$http.post(`api/user/sell`, {
					id
				});
				console.log(result);
				this.actionEvent()
			},
		}
	}
</script>

<style lang="scss">
	.item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12rpx;
		margin: 0 20rpx;
		line-height: 1.8;
	}
</style>