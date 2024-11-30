<template>
	<view :class="isAnimat?'fade_in':'fade_out'" :style="$theme.setBGSize(`520rpx`,`bg_1`)">
		<HeaderThird :title="$lang.TRADE_ISSUANCE_TITLE" color="#FFFFFF">
			<view style="color:#FFFFFF;width: 70px;" @click="linkRecord()">{{$lang.TRADE_LARGE_RECORD}}</view>
		</HeaderThird>

	<view class="flex" style="width: 90%;margin-left: auto;margin-top: 20px;">
			  <view class="flex-1 bold" style="font-size: 23px;color: #FFFFFF;">機関建玉取引</view>
			  <image src="/static/AI.png" mode="widthFix" style="width: 100px;"></image>
	</view>

		<view style="background-color: #FFFFFF;padding:40rpx;width: 85%;border-radius: 10px;margin-left: 10px;">
			<TradeIssuanceList ref="list"></TradeIssuanceList>
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