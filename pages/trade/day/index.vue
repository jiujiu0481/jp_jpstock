<template>
	<view :class="isAnimat?'fade_in':'fade_out'" class="page_bg">
		<CustomHeaderSecond title="急騰株取引"></CustomHeaderSecond>				
			<!-- <image src="/static/ai_icon.png" style="width: 100%;height: 300px;"></image> -->
		<view class="nav-box" v-if="type==1">
			<view class="nav-item" :class="inv==0?'active':''" @click="qiehuan(0)">株式</view>
			<view class="nav-item" @click="$u.route({url:'/pages/trade/day/record'});">申請記録</view>
		</view>
		<view class="nav-box" v-if="type==2">
			<view class="nav-item" :class="inv==0?'active':''" @click="qiehuan(0)">株式</view>
			<view class="nav-item" @click="$u.route({url:'/pages/trade/day/record'});">申請記録</view>
		</view>
		<view
			style="background-color: #FFFFFF;min-height: 90vh;padding:40rpx;width: 85%;border-radius: 10px;margin-left: 10px;">
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
				type:1,
				
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
		height: 60px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		// position: fixed;
		width: 100%;
		// left: 0;
		// top: 54px;
		background: #f4f4f4;
		// box-sizing: border-box;
		z-index: 10
	}
	
	.nav-box .nav-item {
		width: 45%;
		margin: 0 11px;
		height: 40px;
		background: #fff;
		border-radius: 20px;
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
		font-size: 14px;
		color: #585b58
	}
	
	.nav-box .active {
		background: #666666;
		color: #fff
	}
	
</style>