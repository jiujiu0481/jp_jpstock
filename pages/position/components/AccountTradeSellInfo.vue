<template>
	<view class="common_mask" @click="actionEvent()">
		<view class="common_popup" style="min-height:55vh;padding-bottom: 80rpx;width: 95%;border-radius: 10px;">
			<view class="" style="display: flex;align-items: center;margin-right: 20px;margin-top: 20px;">
				<view class="flex-1">
					<text class="bold" style="font-size: 36rpx;padding: 0px 20px;">{{info.name}}</text>
					<view style="padding: 0px 40px;">{{info.code}}</view>
				</view>
				<image src="/static/close.png" :style="$theme.setImageSize(20)" @click="actionEvent()"></image>
			</view>

			<view style="margin-top: 20px;background-color: #f7f9ff;width: 95%;margin-left: 10px;border-radius: 10px;">
				<view class="item">
					<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_MODAL_BUY_TIME}}
					</view>
					<view :style="{color:$theme.LOG_VALUE}">
						{{info.buyCT}}
					</view>
				</view>
				<view class="item">
					<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_MODAL_SELL_TIME}}
					</view>
					<view style="flex: 70%;text-align: right;" :style="{color:$theme.LOG_VALUE}">
						{{info.sellCT}}
					</view>
				</view>
				<view class="item">
					<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_MODAL_FLOAT_PROFIT}}
					</view>
					<view :style="{color:$theme.LOG_VALUE}">
						{{$util.formatMoney(info.sellFloatProfit)+` ${$lang.CURRENCY_UNIT}`}}
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
						{{$util.formatMoney(info.sellProfit)+` ${$lang.CURRENCY_UNIT}`}}
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
						{{$util.formatMoney(info.sellFee)+` ${$lang.CURRENCY_UNIT}`}}
					</view>
				</view>
				<view class="item">
					<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_MODAL_BUY_AMOUNT}}
					</view>
					<view :style="{color:$theme.LOG_VALUE}">
						{{$util.formatMoney(info.buyAmont)+` ${$lang.CURRENCY_UNIT}`}}
					</view>
				</view>

			</view>

		</view>
	</view>
</template>

<script>
	export default {
		name: 'AccountTradeSellInfo',
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
			actionEvent() {
				this.isShow = false;
				this.$emit('action', 1);
			},
		},
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