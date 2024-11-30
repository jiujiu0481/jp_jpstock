<template>
	<view style="display: flex;align-items: center;padding:4px 20px;">
		<image src="/static/kr.png" mode="aspectFit" :style="$theme.setImageSize(60)"
			style="border-radius: 100px;background-color:#bdd8ffa1;padding:6px;"></image>
		<view style="padding-left: 10px;" :style="{color:$theme.TITLE}">KRW</view>
	</view>
	<view style="display: flex;align-items: center;flex-direction: column;margin-top: 30px;">
		<view style="font-size: 28px;font-weight: 900;" :style="{color:$theme.PRIMARY}">
			<text style="margin-right: 20px;">{{showAmount?$util.formatNumber(info.money)+'원':hideAmount}}</text>
			<image mode="aspectFit" :src="`/static/${showAmount?'show':'hide'}.png`" @click="handleShowAmount"
				:style="$theme.setImageSize(40)" style="margin-left: auto;">
			</image>
		</view>
		<view style="padding:20px;" :style="{color:$theme.TIP}">{{$lang.TIP_AMOUNT_AVAIL}}</view>
		<view class="common_btn" style="width: 60%;margin:auto;" @click="linkCustomer()">
			{{$lang.BTN_SEND_SERVICE}}
		</view>
	</view>
</template>

<script>
	export default {
		// desc:入金模式 之 仅提供跳转客服按钮
		name: 'DepositSecond',
		data() {
			return {
				info: {},
				showAmount: false, // 显示金额
				hideAmount: '******', // 隐藏金额
			};
		},
		created() {
			this.getAccountInfo()
		},
		methods: {
			// 资产显隐控制
			handleShowAmount() {
				this.showAmount = !this.showAmount;
			},
			async linkCustomer() {
				this.$util.linkCustomerService();
			},
			//用户信息
			async getAccountInfo() {
				uni.showLoading({
					title: this.$lang.API_GET_ACCOUNT_INFO
				});
				const result = await this.$http.get(`api/user/info`);
				if (!result) return false;
				this.info = result;
			},
		},
	}
</script>

<style>
</style>