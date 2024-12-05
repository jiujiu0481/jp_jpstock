<template>
	<view>
		<view :class="isAnimat?'fade_in':'fade_out'" class="page_bg_sec">
			<CustomHeaderSecond title=" AI資産運用"></CustomHeaderSecond>
			<!-- <view class="block">
				<view class="head">
					<img @click="$util.goBack()" :src="$icon.zjt" class="back">
					<view class="title left_in" style="margin-left: 0px;">クオンツトレーディング</view>
					<view class="back"></view>
				</view>
			</view> -->
		</view>

		<!-- 韩国似乎没有EA介绍 -->
		<TabsPrimary :tabs="$lang.TRADE_EA_TABS.slice(1,3)" @action="changeTab" :acitve="curTab"></TabsPrimary>

		<!-- <template v-if="curTab ==0">
			<EaIntroduce></EaIntroduce>
		</template> -->

		<template v-if="curTab==0">
			<EaMarket></EaMarket>
		</template>
		<template v-else>
			<EaOrder></EaOrder>
		</template>
	</view>
</template>

<script>
	import HeaderSecond from '@/components/header/HeaderSecond.vue';
	import TabsPrimary from '@/components/tabs/TabsPrimary.vue';
	import EaIntroduce from './components/EaIntroduce.vue';
	import EaMarket from './components/EaMarket.vue';
	import EaOrder from './components/EaOrder.vue';

	export default {
		components: {
			HeaderSecond,
			TabsPrimary,
			EaIntroduce,
			EaMarket,
			EaOrder,
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