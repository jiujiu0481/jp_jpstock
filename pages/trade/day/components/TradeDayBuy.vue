<template>
	<view style="font-size: 14px;">
		<view>
			<view style="font-weight: 800;border-bottom:2px solid #ffcdd5;width: 70px;" :style="{color:$theme.LOG_VALUE}">
				{{$lang.TRADE_DAY_TIP_INPUT_AMOUNT}}
			</view>

			<view class="common_input_wrapper">
				<input v-model="amount" type="number" :placeholder="$lang.TRADE_DAY_TIP_INPUT_AT"
					:placeholder-style="$theme.setPlaceholder()" style="width: 80%;margin-left: 10px;"></input>
				<view style="color:#999;">{{$lang.CURRENCY_UNIT}}</view>
			</view>
			<view style="display: flex;align-items: center;justify-content: flex-end;"
				:style="{color:$theme.LOG_LABEL}">
				<view style="padding-right: 10px;">{{$lang.ACCOUNT_AMOUNT_AVAILABLE}}:</view>
				<view :style="{color:$theme.LOG_VALUE}">{{available}}</view>
				<view style="padding-left: 10px;" :style="{color:$theme.PRIMARY}" @click="linkDeposit">
					{{$lang.DEPOSIT_TITLE}}
				</view>
			</view>
		</view>
         
		 <view style="font-weight: 800;border-bottom:2px solid #ffcdd5;width: 70px;" :style="{color:$theme.LOG_VALUE}">
		 	取引説明
		 </view>
		<view style="padding:10px 0px;border-radius: 10px;"
			:style="{color:$theme.LOG_VALUE}">
			<view style="padding-bottom: 6px;">{{$lang.TRADE_DAY_TIP}}:</view>
			<block v-for="(item,index) in $lang.TRADE_DAY_TIP_TEXT" :key="index">
				<view style="padding-bottom: 6px;">{{item}}</view>
			</block>
		</view>

		<view style="position: fixed;bottom: 0;left: 0;right: 0;background-color: #FFFFFF;padding:40rpx">
			<view class="btn_com"  @click="handleBuy()">
				{{$lang.TRADE_DAY_BUY}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'TradeDayBuy',
		data() {
			return {
				amount: '',
				available: '',
			}
		},
		created() {
			this.getAccountInfo();
		},
		methods: {
			// 跳转到充值页面
			linkDeposit() {
				uni.navigateTo({
					url: this.$paths.ACCOUNT_DEPOSIT
				})
			},

			// 购买
			async handleBuy() {
				if (this.amount == '' || this.amount <= 0) {
					uni.showToast({
						title: this.$lang.TRADE_DAY_TIP_INPUT_AT,
						icon: 'none'
					});
					return false;
				}
				// 弹层
				const result = await uni.showModal({
					title: '',
					content: this.$lang.TRADE_DAY_MODAL_CONTENT,
					cancelText: this.$lang.BTN_CANCEL,
					confirmText: this.$lang.BTN_CONFIRM,
					confirmColor: this.$theme.PRIMARY,
					cancelColor: this.$theme.MODAL_CANCEL,
				});
				console.log('异步弹层:', result);
				if (result[1].confirm) {
					this.buy();
				}
			},

			async buy() {
				uni.showLoading({
					title: this.$lang.API_DATA_SUBMIT,
				});
				const result = await this.$http.post(`api/rinei/buy`, {
					money: this.amount,
				});
				console.log(result);
				if (!result) return false;
				uni.showToast({
					title: this.$lang.API_POST_SUCCESS,
					icon: 'success'
				});
				setTimeout(() => {
					this.amount = '';
					uni.navigateTo({
						url: this.$paths.TRADE_DAY_RECORD
					})
				}, 1000);
			},
			async getAccountInfo() {
				uni.showLoading({
					title: this.$lang.API_GET_ACCOUNT_INFO
				});
				const result = await this.$http.get(`api/user/fastInfo`);
				if (!result) return false;
				console.log(result);
				this.available = this.$util.formatNumber(result.money) || 0;
			},
		}
	}
</script>