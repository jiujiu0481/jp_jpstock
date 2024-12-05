<template>
	
		<view :class="isAnimat?'fade_in':'fade_out'" class="page_bg_sec">
			<CustomHeaderSecond title="機関IPO"></CustomHeaderSecond>
		<!-- view class="block">
			<view class="head">
				<img @click="$util.goBack()" :src="$icon.zjt" class="back">
				<view class="title left_in" style="margin-left: 0px;">クオンツトレーディング</view>
				<view class="back"></view>
			</view> -->
		</view>

	
	
</template>

<script>

	export default {
		components: {
		},
		data() {
			return {
				isAnimat: false, // 页面动画
				curTab: 0,
			};
		},
		onShow() {
			this.isAnimat = true;
		},
		onHide() {
			this.isAnimat = false;
		},
		methods: {
			// tab切换
			changeTab(val) {
				this.curTab = val;
			},
		}
	}
</script>

<style>
</style>