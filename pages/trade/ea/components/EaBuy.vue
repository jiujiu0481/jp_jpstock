<template>
	<view>
		<view class="common_mask" @click="actionEvent()"></view>
		<view class="common_popup" style="min-height:35vh;margin:auto">
			<view class="popup_header" style="">
				{{info.name}}
				<image src="/static/close.png" mode="aspectFit" :style="$theme.setImageSize(40)"
					style="position: absolute;top:50%;right: 30px;transform: translateY(-50%);" @click="actionEvent()">
				</image>
			</view>
			<view style="padding: 30rpx;">
				<view
					style="display: flex;flex-wrap: nowrap;align-items: center;justify-content:space-between;margin-top: 10px;">
					<text :style="{color:$theme.LOG_LABEL}">収益率</text>
					<text style="color: #E82D28;"> {{info.syl }}</text>
				</view>
				<view
					style="display: flex;align-items: center;justify-content:space-between;line-height: 1.4;color:#8f8f8f;margin-top: 10px;">
					<view>最低申請資金</view>
					<view>{{$util.formatMoney(info.min_price)}}</view>
				</view>

				<view class="common_input_wrapper"
					style="padding-left: 20px;margin:30rpx 40rpx;background-color: #FFFFFF;">
					<input v-model="amount" placeholder="購入金額" type="number" style="width: 80%;"
						:placeholder-style="$theme.setPlaceholder()"></input>
					<!-- <view style="padding:0 4px;color: #999;">{{$lang.QUANTITY_UNIT}}</view> -->
				</view>

				<view style="display: flex;flex-wrap: nowrap;align-items: center;justify-content:space-between;">
					<text :style="{color:$theme.LOG_LABEL}">{{$lang.TIP_AMOUNT_AVAIL}}</text>
					<text :style="{color:'#FF6700'}">
						{{availBal}} {{$lang.CURRENCY_UNIT}}</text>
				</view>

				<view class="common_btn" style="margin: 30rpx auto;width: 80%;" @tap.stop="handleBuy()">
					{{$lang.BTN_CONFIRM}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'EaBuy',
		props: {
			info: {
				type: Object,
				default: {}
			},
		},
		data() {
			return {
				isShow: true,
				amount: "", // 金额
				availBal: 0,
			}
		},
		computed: {},
		created() {
			this.getAccountInfo();
		},
		methods: {
			actionEvent() {
				this.isShow = false;
				this.$emit('action', 1);
			},

			async handleBuy() {
				if (this.amount == '' || this.amount <= 0) {
					uni.showToast({
						title: this.$lang.TRADE_EA_BUY_AMOUNT,
						icon: 'none'
					});
					return false;
				}
				uni.showLoading({
					title: this.$lang.API_DATA_SUBMIT,
				});
				const result = await this.$http.post(`api/jijin/buy`, {
					id: this.info.id,
					ganggan: 1,
					price: this.amount,
				});
				if (!result) return false;
				uni.showToast({
					title: this.$lang.API_POST_SUCCESS,
					icon: 'success'
				});
				this.actionEvent();
			},
			async getAccountInfo() {
				uni.showLoading({
					title: this.$lang.API_GET_ACCOUNT_INFO
				});
				const result = await this.$http.get(`api/user/info`);
				if (!result) return false;
				this.availBal = this.$util.formatNumber(result.money);
				this.leverList = [{
					name: 1,
					index: 1
				}];
			},
		}
	}
</script>

<style>
</style>