<template>
	<view class="common_block" style="padding-bottom: 10px;">
		<view style="display: flex;align-items: center;padding: 20px;padding-bottom: 0;">
			<view style="flex:18%">
				<template v-if="!info.logo || info.logo==''">
					<view :style="$theme.setImageSize(80)"
						style="background-color:#2d2c62;text-align: center;line-height: 80rpx;color: #FFFFFF;border-radius: 8px;font-size: 18px;">
						{{info && info.name? info.name[0]:''}}
					</view>
				</template>
				<template v-else>
					<image v-if="info.logo" :src="getlogo()" mode="aspectFit" :style="$theme.setImageSize(80)"
						style="border-radius: 8px;"></image>
				</template>
			</view>
			<view style="flex:72%">
				<view style="margin-bottom: 2px;">
					<text
						style="font-weight: 700;font-size: 32rpx;padding:1px 6px;border-radius: 4px;">{{info.name}}</text>
				</view>
				<view style="color:#FFF;"> {{info.ct_name}} {{info.number_code}}</view>
			</view>
			<view style="flex:10%;text-align: right;" @click="handleUnFollow(info.gid)">
				<image :src="`/static/${info.is_collected==1?'stock_follow':'stock_unfollow'}.png`"
					:style="$theme.setImageSize(40)"></image>
			</view>
		</view>

		<view
			style="display: flex;align-items: center;padding: 10px 20px;padding-bottom: 0;justify-content:space-between;"
			:style="$theme.setStockRiseFall(info.rate>0)">
			<view style="font-size: 20px; font-weight: 700;">
				{{$util.formatNumber(info.current_price)}} {{$lang.CURRENCY_UNIT}}
			</view>
			<view style="text-align: right; font-size: 20px; font-weight: 700;">
				{{$util.formatNumber(info.rate_num)}}
			</view>
			<view style="text-align: right; font-size: 20px; font-weight: 700;">
				<image :src="`/static/arrow_${info.rate>0?'rise':'fall'}.png`" mode="aspectFit"
					:style="$theme.setImageSize(32)" style="margin-right: 10px;"></image>
				{{$util.formatNumber(info.rate)}}%
			</view>
		</view>

		<!-- 股票信息一些数值的布局方式 之  一行一项 -->
		<view style="background-color: #F8F8F8;padding: 0;margin:10px;">
			<view
				style="display: flex;align-items: center;justify-content: space-between; background-color: #FFF9EB;border-top-left-radius: 10px;border-top-right-radius: 10px;line-height: 30px;padding:0 10px;">
				<view style="color: #666666;">{{$lang.STOCK_INFO_TITLES[0]}}</view>
				<view style="color: #333333;font-size: 14px;font-weight: 700;">
					{{$util.formatNumber(info.info.open)}}{{$lang.CURRENCY_UNIT}}
				</view>
			</view>
			<view
				style="display: flex;align-items: center;justify-content: space-between;line-height: 30px;padding:0 10px;">
				<view style="color: #666666;">{{$lang.STOCK_INFO_TITLES[2]}}</view>
				<view style="color: #333333;font-size: 14px;font-weight: 700;">
					{{$util.formatNumber(info.info.high)}}{{$lang.CURRENCY_UNIT}}
				</view>
			</view>
			<view
				style="display: flex;align-items: center;justify-content: space-between;background-color: #FFF9EB;line-height: 30px;padding:0 10px;">
				<view style="color: #666666;">{{$lang.STOCK_INFO_TITLES[4]}}</view>
				<view style="color: #333333;font-size: 14px;font-weight: 700;">
					{{$util.formatNumber(info.info.volume/10000)}}
				</view>
			</view>
			<view
				style="display: flex;align-items: center;justify-content: space-between;line-height: 30px;padding:0 10px;">
				<view style="color: #666666;">{{$lang.STOCK_INFO_TITLES[1]}}</view>
				<view style="color: #333333;font-size: 14px;font-weight: 700;">
					{{$util.formatNumber(info.info.prev_close)}}{{$lang.CURRENCY_UNIT}}
				</view>
			</view>
			<view
				style="display: flex;align-items: center;justify-content: space-between;background-color: #FFF9EB;line-height: 30px;padding:0 10px;">
				<view class="t2">{{$lang.STOCK_INFO_TITLES[3]}}</view>
				<view style="color: #333333;font-size: 14px;font-weight: 700;">
					{{$util.formatNumber(info.info.low)}}{{$lang.CURRENCY_UNIT}}
				</view>
			</view>
			<view
				style="display: flex;align-items: center;justify-content: space-between;line-height: 30px;padding:0 10px;">
				<view style="color: #666666;">{{$lang.STOCK_INFO_TITLES[5]}}</view>
				<view style="color: #333333;font-size: 14px;font-weight: 700;">
					{{$util.formatNumber(info.info.volume_valued/10000)}}{{$lang.CURRENCY_UNIT}}
				</view>
			</view>
		</view>

		<!-- 股票信息一些数据的布局方式 之 一行两项 -->
		<!-- <view style="padding: 10px 10px;padding-top: 4px;">
			<view style="background-color: #FFFFFF;padding:6px;border-radius: 6px;">
				<view
					style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 6px;">
					<view
						style="flex:31%;margin:0 6px;background-color: #f9fcfe;padding:4px 6px;border-radius: 4px;">
						<view style="color:#e48a88;">
							{{$util.formatNumber(info.info.open)}}{{$lang.CURRENCY_UNIT}}
						</view>
						<view style="color:#999">{{$lang.STOCK_INFO_TITLES[0]}}</view>
					</view>
					<view
						style="flex:31%;margin:0 6px;background-color: #f9fcfe;padding:4px 6px;border-radius: 4px;">
						<view style="color:#e48a88;text-align: right;">
							{{$util.formatNumber(info.info.prev_close)}}{{$lang.CURRENCY_UNIT}}
						</view>
						<view style="color:#999;text-align: right;">{{$lang.STOCK_INFO_TITLES[1]}}</view>
					</view>
				</view>
				<view
					style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 6px;">
					<view
						style="flex:31%;margin:0 6px;background-color: #f9fcfe;padding:4px 6px;border-radius: 4px;">
						<view style="color:#666;">
							{{$util.formatNumber(info.info.high)}}{{$lang.CURRENCY_UNIT}}
						</view>
						<view style="color:#999;">{{$lang.STOCK_INFO_TITLES[2]}}</view>
					</view>
					<view
						style="flex:31%;margin:0 6px;background-color: #f9fcfe;padding:4px 6px;border-radius: 4px;">
						<view style="color:#666;text-align: right;">
							{{$util.formatNumber(info.info.low)}}{{$lang.CURRENCY_UNIT}}
						</view>
						<view style="color:#999;text-align: right;">{{$lang.STOCK_INFO_TITLES[3]}}</view>
					</view>
				</view>
			
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<view
						style="flex:31%;margin:0 6px;background-color: #f9fcfe;padding:4px 6px;border-radius: 4px;">
						<view style="color:#666;">
							{{$util.formatNumber(info.info.volume/10000)}}
						</view>
						<view style="color:#999;">{{$lang.STOCK_INFO_TITLES[4]}}</view>
					</view>
					<view
						style="flex:31%;margin:0 6px;background-color: #f9fcfe;padding:4px 6px;border-radius: 4px;">
						<view style="color:#666;text-align: right;">
							{{$util.formatNumber(info.info.volume_valued/10000)}}{{$lang.CURRENCY_UNIT}}
						</view>
						<view style="color:#999;text-align: right;">{{$lang.STOCK_INFO_TITLES[5]}}</view>
					</view>
				</view>
			</view>
		</view> -->

	</view>
</template>

<script>
	import {
		BASE_URL
	} from '@/common/http.js';
	export default {
		name: 'StockInfo',
		props: {
			info: {
				type: Object,
				default: {}
			}
		},

		methods: {
			getlogo() {
				return BASE_URL + this.info.logo
			},
			// 取关
			async handleUnFollow(id) {
				const result = await this.$http.post(`api/user/collect_edit`, {
					gid: id,
				})
				this.info.is_collected = this.info.is_collected == 1 ? 0 : 1
			},
		}
	}
</script>

<style>
</style>