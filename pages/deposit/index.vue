<template>
	<view :class="isAnimat?'fade_in':'fade_out'"  class="page_bg" >
		<!-- <HeaderSecond :title="$lang.DEPOSIT_TITLE" color="#FFFFFF"></HeaderSecond> -->
		<CustomHeaderSecond title="入金確認"></CustomHeaderSecond>
		<!-- <view class="block">
			<view class="head">
				<img @click="$util.goBack()" :src="$icon.zjt" class="back">
				<view class="title left_in" style="margin-left: 0px;">入金確認</view>
				<view class="back"></view>
			</view>
		
			<view class="short"></view>
		</view> -->

		<DepositPrimary></DepositPrimary>

	</view>
</template>

<script>
	import HeaderSecond from '@/components/header/HeaderSecond.vue';
	import DepositPrimary from './components/DepositPrimary.vue';
	export default {
		components: {
			HeaderSecond,
			DepositPrimary,
		},
		data() {
			return {
				isAnimat: false, // 页面动画
			};
		},
		onShow() {
			this.isAnimat = true;
		},
		onHide() {
			this.isAnimat = false;
		},
		methods: {
			fanhui(){
				uni.switchTab({
					url:'/pages/home/index'
				})
			},
		}
	}
</script>