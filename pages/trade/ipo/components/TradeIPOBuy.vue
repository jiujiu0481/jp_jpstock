<template>
	<view>
		<view class="common_mask" @click="actionEvent()"></view>
		<view class="common_popup" style="min-height:35vh;margin:auto;border-radius: 10px;">
			<view class="popup_header" style="background-color: #f3564a;border-radius: 10px 10px 0px 0px;">
				{{info.name}}
				<image src="/static/close.png" mode="aspectFit" :style="$theme.setImageSize(50)"
					style="position: absolute;top:50%;right: 30px;transform: translateY(-50%);" @click="actionEvent()">
				</image>
			</view>
			<view style="padding:30rpx;">
				<view class="bold" style="font-size: 16px;">購入数量</view>
				<view style="margin-top: 5px;">
					<u--input placeholder="購入数を入力してください。" border="surround" v-model="num"
						style="background-color: #f7f7f7;"></u--input>
				</view>

				<view style="display: flex;align-items: center;justify-content: space-between;line-height: 2;">
					<text :style="{color:$theme.LOG_LABEL}">購入価格</text>
					<text style="font-size: 32rpx;font-weight: 700;" :style="{color:$theme.PRIMARY}">
						{{$util.formatNumber(info.price*1*num)}}{{$lang.CURRENCY_UNIT}}</text>
				</view>
				<view style="display: flex;align-items: center;justify-content: space-between;line-height: 2;">
					<text :style="{color:$theme.LOG_LABEL}">最低申し込み数量</text>
					<view :style="{color:$theme.LOG_VALUE}">{{info.min_num}}</view>
				</view>

				<view style="display: flex;align-items: center;justify-content: space-between;line-height:2;">
					<text :style="{color:$theme.LOG_LABEL}">IPO価格</text>
					<text style="font-size: 32rpx;font-weight: 700;" :style="{color:$theme.PRIMARY}">
						{{$util.formatNumber(info.price,2)}}{{$lang.CURRENCY_UNIT}}</text>
				</view>

				<view style="display: flex;align-items: center;justify-content: space-between;line-height: 2;">
					<text :style="{color:$theme.LOG_LABEL}">発行数</text>
					<text style="font-size: 32rpx;font-weight: 700;" :style="{color:$theme.PRIMARY}">
						{{$util.formatNumber(info.fa_amount)}}{{$lang.CURRENCY_UNIT}}</text>
				</view>

				<view style="display: flex;align-items: center;justify-content: space-between;line-height: 2;">
					<text :style="{color:$theme.LOG_LABEL}">上場日</text>
					<text :style="{color:$theme.PRIMARY}">
						{{!info.online_date? $lang.TRADE_ISSUANCE_MODAL_NULL_DATE  :info.online_date}}</text>
				</view>
				<view class="btn_com"
					style="margin: 30rpx auto;width: 80%;background-color: #f3564a;padding: 10px 15; font-size: 18px; color: #fff;border-radius: 30px;"
					@tap.stop="purchase()">
					{{$lang.BTN_CONFIRM}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "TradeIPOBuy",
		props: {
			info: {
				type: Object,
				default: {},
			},
		},
		data() {
			return {
				num: "",
				isShow: false, // 购买前二次确认的弹层
			}
		},

		computed: {},

		methods: {
			actionEvent() {
				this.isShow = false;
				this.$emit('action', 1);

			},
			// 选择杠杆
			chgangeLever(val) {
				this.current = val;
			},

			handleConfirm() {
				this.buy();
			},
			// 点击申购 一个账号只能申购一次。
			async purchase() {
				uni.showLoading({
					title: this.$lang.API_DATA_SUBMIT,
				});
				const result = await this.$http.post(`api/goods-shengou/doOrder`, {
					num: this.num,
					id: this.info.id,
					// price: this.price
				})
				if (!result) return false;
				uni.showToast({
					title: result.message,
					icon: 'success'
				});
				setTimeout(() => {
					this.actionEvent();
				}, 1000);
			},
		}
	}
</script>

<style>
</style>