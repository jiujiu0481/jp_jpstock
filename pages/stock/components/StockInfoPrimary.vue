<template>
	<!-- <view style="padding-bottom: 20rpx;background-color:#fff ;width: 95%;margin-left: 10px;border-radius: 10px;">
		<view style="padding-bottom: 10px;">
			<view style="align-items: center;padding: 20px;padding-bottom: 0;"> -->
			<!-- 	<view style="flex:18%">
					<CustomLogo :logo="info.logo" :name="info.name"></CustomLogo>
				</view> -->
				
				<!-- <view class="flex"> -->
					<!-- <view  class="bold" style="margin-bottom: 2px;font-size: 35rpx;width: 120px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" :style="{color:'#000'}">
						{{info.name}}</view>
						<view style="color: #c8c8c8;"> ( {{info.number_code}} {{info.ct_name}})</view> -->
						<!-- <image :src="`/static/arrow_${info.rate>0?'rise':'fall'}.png`" mode="aspectFit"
							:style="$theme.setImageSize(20)" style="margin-left: 10px;"></image> --><!-- 
					<image :src="`/static/line_${info.rate>0?'rise':'fall'}.png`" mode="aspectFit"
						:style="$theme.setImageSize(200,80)" style="margin-left: auto;"></image>
				</view>
				
				<view class="flex bold text-center">
					<view class="flex-1">
						<view class="bold" style="font-size: 25px;padding-right: ;">{{(info.current_price) .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</view>
						<view class="flex " style="width: 90px;">
							<image :src="`/static/arrow_${info.rate>0?'rise':'fall'}.png`" mode="aspectFit"
								:style="$theme.setImageSize(20)"></image>
							<view :style="$theme.setStockRiseFall(info.rate>0)" style="margin-left: 10px;">{{$util.formatNumber(info.rate)}}%</view>
						</view>
					</view> -->
					<!-- <view class="flex-1" ></view>
					
					<view class="flex-1">
						<view style="font-size: 10px;">最高値</view>
						<view :style="$theme.setStockRiseFall(info.rate>0)" style="color: #000;font-size: 18px;">{{$util.formatMoney(setInfo.high) + ` ` + this.$lang.CURRENCY_UNIT}}</view>
					</view>
					<view style="padding: 10px  30px;">
						<view style="background-color: #ccc;height: 30px;color: #ccc;">.</view>
					</view>
					
					<view>
						<view style="font-size: 10px;">最低値</view>
						<view :style="$theme.setStockRiseFall(info.rate>0)" style="color: #000;font-size: 18px;">{{$util.formatMoney(setInfo.low) + ` ` + this.$lang.CURRENCY_UNIT}}</view>
					</view> -->
					
				</view>
				
				
				
				
				
				
				
				
				
				<!-- <view >
					<view  style="margin-bottom: 2px;font-size: 30rpx;width: 120px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" :style="{color:'#000'}">
						{{info.name}}
						<image :src="`/static/arrow_${info.rate>0?'rise':'fall'}.png`" mode="aspectFit"
							:style="$theme.setImageSize(54)" style="margin-left: 0px;"></image>
					</view>
					
					<view > {{info.number_code}} {{info.ct_name}}</view>
				</view> -->
				
			<!-- </view> -->
			<!-- <view
				style="display: flex;align-items: center;padding: 10px 20px;padding-bottom: 0;justify-content:space-between;"
				:style="$theme.setStockRiseFall(info.rate>0)">
				<view style="font-size: 32rpx;">
					{{$util.formatNumber(info.current_price)}} {{$lang.CURRENCY_UNIT}}
				</view>
				<view style="text-align: right;font-size: 32rpx;">
					{{$util.formatNumber(info.rate_num)}}
				</view>
				<view style="text-align: right;font-size: 32rpx;">
					{{$util.formatNumber(info.rate)}}%
				</view>
			</view> -->
		<!-- </view> -->
		
		
		
		
		<!-- <view style="margin:0 10rpx;padding:0 20rpx;line-height: 1.8;">
			<template v-if="setInfo.open>0">
				<view style="display: flex;align-items: center;">
					<view style="color:#FFFFFF;">{{$lang.STOCK_INFO_OPEN}}</view>
					<view>{{$util.formatMoney(setInfo.open) + ` ` + this.$lang.CURRENCY_UNIT}}</view>
				</view>
			</template>

			<template v-if="setInfo.close>0">
				<view style="display: flex;align-items: center;">
					<view style="color:#FFFFFF;">{{$lang.STOCK_INFO_CLOSE}}</view>
					<view>{{$util.formatMoney(setInfo.close) + ` ` + this.$lang.CURRENCY_UNIT}}</view>
				</view>
			</template>

			<template v-if="setInfo.high>0">
				<view style="display: flex;align-items: center;">
					<view style="color:#FFFFFF;">{{$lang.STOCK_INFO_HIGH}}</view>
					<view>{{$util.formatMoney(setInfo.high) + ` ` + this.$lang.CURRENCY_UNIT}}</view>
				</view>
			</template>
			<template v-if="setInfo.low>0">
				<view style="display: flex;align-items: center;">
					<view style="color:#FFFFFF;">{{$lang.STOCK_INFO_LOW}}</view>
					<view>{{$util.formatMoney(setInfo.low) + ` ` + this.$lang.CURRENCY_UNIT}}</view>
				</view>
			</template>

			<template v-if="setInfo.volume>0">
				<view style="display: flex;align-items: center;">
					<view style="color:#FFFFFF;">{{$lang.STOCK_INFO_VOLUME}}</view>
					<view>{{setInfo.volume}}</view>
				</view>
			</template>
		</view> -->
	<!-- </view> -->
</template>

<script>
	import CustomLogo from '@/components/CustomLogo.vue';
	export default {
		name: 'StockInfoPrimary',
		components: {
			CustomLogo
		},
		props: {
			info: {
				type: Object,
				default: {}
			}
		},

		computed: {
			setInfo() {
				return {
					// 这个你要判断下，有的没有，没有的就不显示
					open: this.info.info.ask,
					close: this.info.info.last,
					high: this.info.info.high,
					low: this.info.info.low,
					volume: this.info.info.turnover,
				}
			}
		},

		methods: {
			// 取关
			async handleUnFollow(id) {
				const result = await this.$http.post(`api/user/collect_edit`, {
					gid: id,
				})
				console.log(`result:`, result);
				// uni.showToast({
				// 	title: result.message,
				// 	icon: 'none'
				// });
				this.info.is_collected = this.info.is_collected == 1 ? 0 : 1;
			},
		}
	}
</script>

<style>
</style>