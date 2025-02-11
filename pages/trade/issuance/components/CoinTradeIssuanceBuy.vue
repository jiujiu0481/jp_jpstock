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
					<u--input
					    placeholder="購入数を入力してください。"
					    border="surround"
					    v-model="num" style="background-color: #f7f7f7;"
					  ></u--input>
					  
				</view>
				<view style="display: flex;align-items: center;justify-content: space-between;line-height:2;">
					<text :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_ISSUANCE_MODAL_0}}</text>
					<text style="font-size: 32rpx;font-weight: 700;" :style="{color:$theme.PRIMARY}">
						{{$util.formatNumber(info.price,2)}}{{$lang.CURRENCY_UNIT}}</text>
				</view>

				<view style="display: flex;align-items: center;justify-content: space-between;line-height: 2;">
					<text :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_ISSUANCE_MODAL_1}}</text>
					<text style="font-size: 32rpx;font-weight: 700;" :style="{color:$theme.PRIMARY}">
						{{$util.formatNumber(info.price*1*num)}}{{$lang.CURRENCY_UNIT}}</text>
				</view>

				<view style="display: flex;align-items: center;justify-content: space-between;line-height: 2;">
					<text :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_ISSUANCE_MODAL_2}}</text>
					<text style="font-size: 32rpx;font-weight: 700;" :style="{color:$theme.PRIMARY}">
						{{$util.formatNumber(info.fa_amount)}}{{$lang.CURRENCY_UNIT}}</text>
				</view>

				<view style="display: flex;align-items: center;justify-content: space-between;line-height: 2;">
					<text :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_ISSUANCE_MODAL_3}}</text>
					<text :style="{color:$theme.PRIMARY}">
						{{!info.online_date? $lang.TRADE_ISSUANCE_MODAL_NULL_DATE  :info.shengou_date}}</text>
				</view>

				<view style="display: flex;align-items: center;justify-content: space-between;line-height: 2;">
					<text :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_ISSUANCE_MODAL_4}}</text>
					<text :style="{color:$theme.PRIMARY}">
						{{!info.gb_date? $lang.TRADE_ISSUANCE_MODAL_NULL_DATE  :info.gb_date}}</text>
				</view>

				<view style="display: flex;align-items: center;justify-content: space-between;line-height: 2;">
					<text :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_ISSUANCE_MODAL_5}}</text>
					<text :style="{color:$theme.PRIMARY}">
						{{!info.rj_date? $lang.TRADE_ISSUANCE_MODAL_NULL_DATE  :info.rj_date}}</text>
				</view>

				<view style="display: flex;align-items: center;justify-content: space-between;line-height: 2;">
					<text :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_ISSUANCE_MODAL_6}}</text>
					<text :style="{color:$theme.PRIMARY}">
						{{!info.online_date? $lang.TRADE_ISSUANCE_MODAL_NULL_DATE  :info.online_date}}</text>
				</view>

				<view class="btn_com" style="margin: 30rpx auto;width: 80%;background-color: #f3564a;padding: 10px 15; font-size: 18px; color: #fff;border-radius: 30px;" @tap.stop="handleConfirm()">
					{{$lang.BTN_CONFIRM}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'TradeIssuanceBuy',
		props: {
			info: {
				type: Object,
				default: {},
			},
		},
		data() {
			return {
				num:"",
				isShow: false, // 购买前二次确认的弹层
				// amount: '', // 金额
				// password: '', // 支付密码
				// leverList: [], // 杠杆值数组
				// current: 0,
				// availBal: 0,
			}
		},

		computed: {
			// // 当前杠杆值。无论是否显示杠杆，此处都无需注释
			// curLever() {
			// 	return this.leverList[this.current];
			// },
			// // 金额计算
			// buyAmount() {
			// 	return !this.curLever ? 0 : this.info.price * this.amount / Number(this.curLever.index);
			// },
		},

		// created() {
		// 	this.gerUserInfo();
		// },

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
			async buy() {
				const result = await this.$http.post(`api/goods-scramble/doOrder`, {
					id: this.info.id,
					num: this.num,
					ganggan: 1,
				});
				console.log(result);

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