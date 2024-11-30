<template>
	<scroll-view :scroll-x="true" style="white-space: nowrap;" scroll-left="270" @touchmove.stop>
		<view class="home_card_bg home_card_bg_1" @click="linkTradeAI()">
			<CardItemPrimary :info="cardFirst" :labels="cardFirstLabels"></CardItemPrimary>
		</view>
		<view class="home_card_bg home_card_bg_2" @click="linkAccountCenter()">
			<CardItemPrimary :info="cardSecond" :labels="cardSecondLables"></CardItemPrimary>
		</view>
		<view class="home_card_bg home_card_bg_3" @click="linkWithdraw()">
			<CardItemPrimary :info="cardThird" :labels="cardThirdLabels"></CardItemPrimary>
		</view>
	</scroll-view>
</template>

<script>
	import CardItemPrimary from '@/components/card/CardItemPrimary.vue';
	export default {
		// 横向滚动，三个card 资产信息
		name: 'CardPrimary',
		components: {
			CardItemPrimary
		},
		data() {
			return {
				userInfo: {}, // 账户信息
				cardFirst: {}, // 卡片一 AI交易相关
				cardSecond: {}, // 卡片二 总资产
				cardThird: {}, // 卡片三 其他资产
			}
		},
		computed: {
			cardFirstLabels() {
				return [this.$lang.TRADE_AI_AMOUNT, this.$lang.TRADE_AI_PROFIT, this.$lang.TRADE_AI_AMOUNT_TOTAL];
			},
			cardSecondLables() {
				return [this.$lang.ACCOUNT_AMOUNT_TOTAL, this.$lang.ACCOUNT_REPAY, this.$lang.ACCOUNT_AMOUNT_AVAILABLE];
			},
			cardThirdLabels() {
				return [this.$lang.ACCOUNT_TOTAL_PROFIT, this.$lang.ACCOUNT_COLD_AMOUNT, this.$lang
					.ACCOUNT_AMOUNT_AVAILABLE
				];
			}
		},
		created() {
			this.getAccountInfo();
		},
		methods: {
			// 跳转到个人中心
			linkAccountCenter() {
				uni.switchTab({
					url: this.$paths.ACCOUNT_CENTER
				})
			},
			// 跳转到AI交易 当前项目不含有AI交易
			linkTradeAI() {
				return false;
				// uni.navigateTo({
				// 	url: this.$paths.TRADE_AI,
				// })
			},
			// 跳转到提款页面
			linkWithdraw() {
				uni.navigateTo({
					url: this.$paths.ACCOUNT_WITHDRAW,
				})
			},

			// 获取账户信息
			async getAccountInfo() {
				uni.showLoading({
					title: this.$lang.API_GET_ACCOUNT_INFO
				});
				const result = await this.$http.get(`api/user/info`);
				if (!result) return false;
				this.userInfo = result;
				// 手动拼装三个card的数据
				this.cardFirst = {
					value1: this.userInfo.aiMoney,
					value2: this.userInfo.aiShouyi,
					value3: this.userInfo.aiZong
				};
				this.cardSecond = {
					value1: this.userInfo.totalZichan,
					value2: this.userInfo.huibao,
					value3: this.userInfo.money,
				};
				this.cardThird = {
					value1: this.userInfo.totalYingli, // 总盈利
					value2: this.userInfo.freeze, // 冻结
					value3: this.userInfo.money, // 可提
				};
			},
		}
	}
</script>