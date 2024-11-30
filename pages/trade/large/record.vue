<template>
	<view :class="isAnimat?'fade_in':'fade_out'" :style="$theme.setBGSize(`240rpx`,`bg_1`)">
		
		<HeaderSecond :title="$lang.TRADE_LARGE_RECORD" color="#FFFFFF"></HeaderSecond>
		<view style="padding:20rpx 32rpx; background-color: #FFFFFF;min-height: 96vh;width: 85%;border-radius: 10px;margin-left: 10px;">
			<TradeLargeRecord></TradeLargeRecord>
		</view>
	</view>
</template>

<script>
	import HeaderSecond from '@/components/header/HeaderSecond.vue';
	import TradeLargeRecord from './components/TradeLargeRecord.vue';
	export default {
		components: {
			HeaderSecond,
			TradeLargeRecord,
		},
		data() {
			return {
				isAnimat: false, // 页面动画
			}
		},
		computed: {},
		onShow() {
			this.isAnimat = true;
		},
		onHide() {
			this.isAnimat = false;
		},
		methods: {},
	}
</script>

<style>
</style>