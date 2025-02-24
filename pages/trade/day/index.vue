<template>
	<view :class="isAnimat?'fade_in':'fade_out'" class="page_bg_sec">
		<CustomHeaderSecond title="急騰株取引"></CustomHeaderSecond>
		
		<view class="nav-box">
			<view class="nav-item" :class="inv==0?'active':''" @click="qiehuan(0)">株式</view>
			<view class="nav-item" @click="$u.route({url:'/pages/trade/day/record'});">申請記録</view>
		</view>

		<view
			style="background-color: #FFFFFF;min-height: 90vh;padding:20rpx;width: 85%;border-radius: 10px;margin-left: 10px;">
			<TradeDayBuy></TradeDayBuy>
		</view>
	</view>
</template>

<script>
	import HeaderThird from '@/components/header/HeaderThird.vue';
	import TradeDayBuy from './components/TradeDayBuy.vue';

	export default {
		components: {
			HeaderThird,
			TradeDayBuy,

		},
		data() {
			return {
				isAnimat: false, // 页面动画
				inv: 0,
			}
		},
		onShow() {
			this.isAnimat = true;

			if (this.$refs.log && inv == 1)
				this.$refs.log.getList();

		},
		onHide() {
			this.isAnimat = false;
		},
		methods: {
			qiehuan(num) {
				this.inv = num;
				if (num == 1) {
					this.$refs.log.getList();
				}
			},
			linkRecord() {
				uni.navigateTo({
					url: this.$paths.TRADE_DAY_RECORD
				})
			}
		},
	}
</script>
<style>
	.nav-box {
		height: 49px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		background: #f7f9f8;
		box-sizing: border-box
	}

	.nav-box .nav-item {
		width: calc(50% - 22px);
		margin: 0 11px;
		height: 28px;
		background: #fff;
		border-radius: 5px;
		border: 1px solid #f3564a;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-weight: 500;
		font-size: 11px;
		color: #e4013e
	}

	.nav-box .active {
		background: #f3564a;
		color: #fff
	}
</style>