<template>
	<view :class="isAnimat?'fade_in':'fade_out'" class="page_bg">
		<!-- <HeaderThird :title="$lang.TRADE_ISSUANCE_TITLE" color="#FFFFFF">
			<view style="color:#FFFFFF;width: 70px;" @click="linkRecord()">{{$lang.TRADE_LARGE_RECORD}}</view>
		</HeaderThird> -->
		<view>
			<CustomHeaderSecond title=" 機関建玉取引" />
			<!-- <view class="flex" style="width: 90%;margin-left: auto;margin-top: 20px;">
				<view class="flex-1 bold" style="font-size: 23px;color: #FFFFFF;color: #424242;">機関建玉取引</view>
				<image src="/static/AI.png" mode="widthFix" style="width: 100px;"></image>
			</view> -->
			<view style="display: flex;align-items: center;justify-content: center;">
				<!-- <image src="/static/banner_ipo.png"  mode="heightFix" :style="$theme.setImageSize(360)">
			</image> -->
			</view>


			<view style="display: flex;align-items: center;justify-content: space-between;margin:  10px 10px 20px; ">
				<view
					style="padding: 8px 30px; background-color:#d7060f;color: #FFFFFF;border-radius: 20px;font-size: 14px;margin-left: 20px;"
					@click="$u.route({url:'/pages/trade/issuance/record'});">申請記録</view>
				<view
					style="padding: 8px 30px; background-color:#d7060f;color: #FFFFFF;border-radius: 20px;font-size: 14px;margin-right: 20px;"
					@click="$u.route({url:'/pages/trade/issuance/record?curTab=1'});">成功の記録</view>
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