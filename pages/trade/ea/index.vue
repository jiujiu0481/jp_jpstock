<template>
	<view>
		<view :class="isAnimat?'fade_in':'fade_out'" class="page_bg">
			<CustomHeaderSecond title=" AI資産運用"></CustomHeaderSecond>
			<!-- <view class="block">
				<view class="head">
					<img @click="$util.goBack()" :src="$icon.zjt" class="back">
					<view class="title left_in" style="margin-left: 0px;">クオンツトレーディング</view>
					<view class="back"></view>
				</view>
			</view> -->
		</view>
<<<<<<< HEAD
		<view style="display: flex;align-items: center;justify-content: center;">
			<!-- <image src="/static/banner_ai.png"  mode="heightFix" :style="$theme.setImageSize(360)">
			</image> -->
=======

		<view class="trade_ea" style="display: flex;align-items: center;">
			<view style="padding-left: 20px;font-size: 14px;line-height: 1.6;">
				<view>1 日の合計利益</view>
				<view style="font-weight: 700;font-size: 16px;" :style="{color:$theme.PRIMARY}">
					{{!detail?'':$util.formatMoney(detail.today)}}
				</view>
				<view>ポジションからの合計利益</view>
				<view style="font-weight: 700;font-size: 16px;" :style="{color:$theme.PRIMARY}">
					{{!detail?'':$util.formatMoney(detail.total)}}
				</view>
			</view>
>>>>>>> e0e038695daddae3de796d5b9a7ee826e37c6889
		</view>

		<!-- 韩国似乎没有EA介绍 -->
		<TabsPrimary :tabs="[`マーケット`,`取引履歴`]" @action="changeTab" :acitve="curTab"></TabsPrimary>

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
				detail: null,
			};
		},
		onShow() {
			this.isAnimat = true;
			this.getDetail();
		},
		onHide() {
			this.isAnimat = false;
		},
		methods: {
			// tab切换
			changeTab(val) {
				this.curTab = val;
			},
			async getDetail() {
				const result = await this.$http.get(`api/jijin/profitInfo`);
				if (!result) return false;
				console.log(result);
				this.detail = result;
			}
		}
	}
</script>

<style>
</style>