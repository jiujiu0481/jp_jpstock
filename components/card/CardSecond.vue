<template>
	<view style="display: flex;align-items: center;justify-content: center;width: 100%;">
		<view class="common_card_bg card_bg_0" style="width: 90%;">
			<CardItemSecond :info="info" :labels="cardLabels"></CardItemSecond>
		</view>
	</view>
</template>

<script>
	import CardItemSecond from '@/components/card/CardItemSecond.vue';
	export default {
		// 单个，资产信息卡
		name: 'CardSecond',
		components: {
			CardItemSecond
		},
		data() {
			return {
				info: {}, // 
			}
		},
		computed: {
			cardLabels() {
				return [this.$lang.CARD_ASSETS_TOTAL];
			},
		},
		created() {
			this.getAccountInfo();
		},
		methods: {
			async getAccountInfo() {
				uni.showLoading({
					title: this.$lang.API_GET_ACCOUNT_INFO
				});
				const result = await this.$http.get(`api/user/info`);
				if (!result) return false;
				this.info = {
					value1: result.totalZichan || 0, // 总资产
					value2: result.money || 0, // 可用资产
				};
			}
		}
	}
</script>