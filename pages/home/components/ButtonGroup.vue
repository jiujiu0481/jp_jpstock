<template>
	<view class="btns " style="">
		<block v-for="(item,index) in btnConfig" :key="index">
			<view class="item" @click="actionEvent(item.url,index)">
				<image mode="aspectFit" :src="`/static/${item.icon}.png`" :style="$theme.setImageSize(60)"></image>
				<text style="padding-top: 6px;">{{item.name}}</text>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		name: "ButtonGroup",
		computed: {
			btnConfig() {
				// 根据客户需求，调整位置，注释不需要要显示的项
				const temp = [
					// {
					// 	name: this.$lang.TRADE_DAY_TITLE, // 日内交易
					// 	url: this.$paths.TRADE_DAY,
					// },
					{
						name: this.$lang.AI, // 日内
						url: this.$paths.TRADE_DAY,
					},
					{
						name: this.$lang.TRADE_LARGE_TITLE, // 大宗
						url: this.$paths.TRADE_LARGE,
					},
					{
						name: this.$lang.TRADE_IPO_TITLE, // IPO
						url: this.$paths.TRADE_IPO,
					},
					{
						name: '取引履歴', // 配售
						url: '/pages/transaction/index',
					},
					// {
					// 	name: this.$lang.TRADE_VIP_TITLE, // VIP
					// 	url: this.$paths.TRADE_VIP,
					// },
					
					{
						name: this.$lang.DEPOSIT_TITLE, // 入金/充值
						url: this.$paths.ACCOUNT_DEPOSIT,
					}, {
						name: this.$lang.WITHDRAW_TITLE, // 出金/提款
						url: this.$paths.ACCOUNT_WITHDRAW,
					}, 
					{
						name: this.$lang.AUTH_TITLE, // 实名认证
						url: this.$paths.ACCOUNT_AUTH,
					}, 
					{
						name: '市場', 
						url: '/pages/market/overview',
					},
					// {
					// 	name: this.$lang.ACCOUNT_SERVICE, // 客服
					// 	url: this.$paths.SERVICE,
					// },
				].map((item, index) => {
					return {
						name: item.name,
						icon: `top${index}`,
						url: item.url
					}
				});
				return temp;
			}
		},

		methods: {
			actionEvent(url, index) {
				if (url.includes('pages')) {
					uni.reLaunch({
						url: url
					})
				} else {
					this.$emit('action', index);
				}
			},
		}
	}
</script>

<style lang="scss">
	.btns {
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 6px;
		padding: 10px 0;

		.item {
			width: 25%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: #000;
			padding: 4px 0;
		}
	}
</style>