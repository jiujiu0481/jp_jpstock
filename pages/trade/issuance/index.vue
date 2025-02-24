<template>
	<view :class="isAnimat?'fade_in':'fade_out'" class="page_bg_sec">
		<view>
			<CustomHeaderSecond title="機関IPO" />

			<view style="display: flex;align-items: center;justify-content: space-between;margin:  10px 10px 20px; ">
				<view
					style="padding: 8px 30px; background-color:#f3564a;color: #FFFFFF;border-radius: 6px;font-size: 14px;margin-left: 20px;"
					@click="$u.route({url:'/pages/trade/issuance/record'});">申し込み履歴</view>
				<view
					style="padding: 8px 30px; background-color:#f3564a;color: #FFFFFF;border-radius: 6px;font-size: 14px;margin-right: 20px;"
					@click="$u.route({url:'/pages/trade/issuance/record?curTab=1'});">購入履歴</view>
			</view>

			<view style="border-radius: 10px;margin: 0 20px;">
				<TradeIssuanceList ref="list"></TradeIssuanceList>
			</view>

		</view>
	</view>
</template>

<script>
	import HeaderThird from '@/components/header/HeaderThird.vue';
	import TradeIssuanceList from './components/TradeIssuanceList.vue';
	export default {
		components: {
			HeaderThird,
			TradeIssuanceList,
		},
		data() {
			return {
				isAnimat: false, // 页面动画
			}
		},
		onShow() {
			this.isAnimat = true;
			if (this.$refs.list)
				this.$refs.list.getList();
		},
		onHide() {
			this.isAnimat = false;
		},
		methods: {
			linkRecord() {
				uni.navigateTo({
					url: this.$paths.TRADE_ISSUANCE_RECORD
				})
			}
		},
	}
</script>

<style>
</style>