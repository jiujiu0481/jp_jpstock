<template>
	<view style="background-color: #FFFFFF;font-size: 14px;">
		<!-- <view
			style="display: flex;align-items: center;flex-wrap: wrap; margin-bottom: 6rpx;line-height:1.8;margin: 6px 0;background-color: #F8F7FF;">
			<block v-for="(item,index) in $lang.STOCK_BASE_INFO" :key="index">
				<view style="flex:99%;margin:0 6px;padding-top:10px;">
					<view :style="{textAlign:index%2==0?'left':'right',color:$theme.LOG_LABEL }">{{item}}</view>
					<view style="color:"
						:style="{color:setStyle[index]!=''? setStyle[index]:$theme.LOG_VALUE,textAlign:index%2==0?'left':'right' }">
						{{setData[index]}}
					</view>
				</view>
			</block>
		</view> -->

		<!-- 股票 概况 数值 布局 之 一行一项 -->
		<view style="line-height:1.6;padding:20rpx;border-radius: 5px;box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;">
			<view style="display:flex;align-items: center;padding:4px 0;">
				<view style="flex:30%;" :style="{color:$theme.TITLE}">前日終値</view>
				<view style="flex:70%;text-align: right;"><text style="padding:0 0 0 10px;"
						:style="{color:$theme.PRIMARY}">{{info.mainStocksDetail.detail.previousPrice}}</text></view>
			</view>
			<view style="display:flex;align-items: center;padding:4px 0;">
				<view style="flex:30%;" :style="{color:$theme.TITLE}">始値</view>
				<view style="flex:70%;text-align: right;"><text
						style="padding:0 0 0 10px;">{{info.mainStocksDetail.detail.openPrice}}</text></view>
			</view>
			<view style="display:flex;align-items: center;padding:4px 0;">
				<view style="flex:30%;" :style="{color:$theme.TITLE}">高値</view>
				<view style="flex:70%;text-align: right;">{{info.mainStocksDetail.detail.highPrice}}
				</view>
			</view>
			<view style="display:flex;align-items: center;padding:4px 0;">
				<view style="flex:30%;" :style="{color:$theme.TITLE}">安値</view>
				<view style="flex:70%;text-align: right;">{{info.mainStocksDetail.detail.lowPrice}}
				</view>
			</view>
			<view style="display:flex;align-items: center;padding:4px 0;">
				<view style="flex:20%;" :style="{color:$theme.TITLE}">出来高</view>
				<view style="flex:30%;text-align: right;">{{info.mainStocksDetail.detail.volume}}
				</view>
			</view>
			<view style="display:flex;align-items: center;padding:4px 0;">
				<view style="flex:30%;" :style="{color:$theme.TITLE}">売買代金</view>
				<view style="flex:20%;text-align: right;">{{info.mainStocksDetail.detail.tradingValue}}</view>
			</view>
			<view style="display:flex;align-items: center;padding:4px 0;">
				<view style="flex:20%;" :style="{color:$theme.TITLE}">値幅制限</view>
				<view style="flex:30%;text-align: right;" >
					{{info.mainStocksDetail.detail.priceLimit}}
				</view>
			</view>
			
		</view>
		<!-- 布局 之 一行两项 -->
		<view style="background-color: #FFFFFF;border-radius: 6px;margin-top: 10px;">
			<view
				style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 6px;line-height:1.8;margin: 6px 0;">
				<view
					style="flex:31%;margin:0 6px;background-color: #F6F6F6;padding:10px;border-radius: 8px;text-align: center;">
					<view style="color:#999">時価総額</view>
					<view>
						{{info.mainStocksDetail.referenceIndex.totalPrice}} 百万円
					</view>
				</view>
				<view
					style="flex:31%;margin:0 6px;background-color: #F6F6F6;padding:10px;border-radius: 8px;text-align: center;">
					<view style="color:#999;">発行済株式数</view>
					<view style="color:#e48a88;">
						{{info.mainStocksDetail.referenceIndex.sharesIssued}} 株
					</view>
				</view>
			</view>
			<view
				style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 6px;line-height:1.8;margin: 6px 0;">
				<view
					style="flex:31%;margin:0 6px;background-color: #F6F6F6;padding:10px;border-radius: 8px;text-align: center;">
					<view style="color:#999;">配当利回り</view>
					<view style="color:#666;">
						{{info.mainStocksDetail.referenceIndex.shareDividendYield}}%
					</view>
				</view>
				<view
					style="flex:31%;margin:0 6px;background-color: #F6F6F6;padding:10px;border-radius: 8px;text-align: center;">
					<view style="color:#999;">1株配当</view>
					<view style="color:#666;">
						{{info.mainStocksDetail.referenceIndex.dps}} 円
					</view>
				</view>
			</view>

			<view
				style="display: flex;align-items: center;justify-content: space-between;line-height:1.8;margin: 6px 0;">
				<view
					style="flex:31%;margin:0 6px;background-color: #F6F6F6;padding:10px;border-radius: 8px;text-align: center;">
					<view style="color:#999;">PER</view>
					<view style="color:#666;">
						{{info.mainStocksDetail.referenceIndex.per}} 倍

					</view>
				</view>
				<view
					style="flex:31%;margin:0 6px;background-color: #F6F6F6;padding:10px;border-radius: 8px;text-align: center;">
					<view style="color:#999;">PBR</view>
					<view style="color:#666;">
						{{info.mainStocksDetail.referenceIndex.pbr}} 倍
					</view>
				</view>
			</view>
			<view
				style="display: flex;align-items: center;justify-content: space-between;line-height:1.8;margin: 6px 0;">
				<view
					style="flex:31%;margin:0 6px;background-color: #F6F6F6;padding:10px;border-radius: 8px;text-align: center;">
					<view style="color:#999;">EPS</view>
					<view style="color:#666;">
						{{info.mainStocksDetail.referenceIndex.eps}}
					</view>
				</view>
				<view
					style="flex:31%;margin:0 6px;background-color: #F6F6F6;padding:10px;border-radius: 8px;text-align: center;">
					<view style="color:#999;">BPS</view>
					<view style="color:#666;" :style="{color:$theme.PRIMARY}">
						{{info.mainStocksDetail.referenceIndex.bps}}
					</view>
				</view>
			</view>
			
			<view
				style="display: flex;align-items: center;justify-content: space-between;line-height:1.8;margin: 6px 0;">
				<view
					style="flex:31%;margin:0 6px;background-color: #F6F6F6;padding:10px;border-radius: 8px;text-align: center;">
					<view style="color:#999;">ROE</view>
					<view style="color:#666;">
						{{info.mainStocksDetail.referenceIndex.roe}}%
					</view>
				</view>
				<view
					style="flex:31%;margin:0 6px;background-color: #F6F6F6;padding:10px;border-radius: 8px;text-align: center;">
					<view style="color:#999;">自己資本比率</view>
					<view style="color:#666;" >
						{{info.mainStocksDetail.referenceIndex.equityRatio}} %
					</view>
				</view>
			</view>
			
			<view
				style="display: flex;align-items: center;justify-content: space-between;line-height:1.8;margin: 6px 0;">
				<view
					style="flex:31%;margin:0 6px;background-color: #F6F6F6;padding:10px;border-radius: 8px;text-align: center;">
					<view style="color:#999;">最低購入代金</view>
					<view style="color:#666;">
						{{info.mainStocksDetail.referenceIndex.minPurchasePrice}}
					</view>
				</view>
				<view
					style="flex:31%;margin:0 6px;background-color: #F6F6F6;padding:10px;border-radius: 8px;text-align: center;">
					<view style="color:#999;">単元株数</view>
					<view style="color:#666;" >
						{{info.mainStocksDetail.referenceIndex.shareUnit}} 
					</view>
				</view>
			</view>
			
			
			<view
				style="display: flex;align-items: center;justify-content: space-between;line-height:1.8;margin: 6px 0;">
				<view
					style="flex:31%;margin:0 6px;background-color: #F6F6F6;padding:10px;border-radius: 8px;text-align: center;">
					<view style="color:#999;">年初来高値</view>
					<view style="color:#666;">
						{{info.mainStocksDetail.referenceIndex.yearHighPrice}}
					</view>
				</view>
				<view
					style="flex:31%;margin:0 6px;background-color: #F6F6F6;padding:10px;border-radius: 8px;text-align: center;">
					<view style="color:#999;">年初来安値</view>
					<view style="color:#666;" >
						{{info.mainStocksDetail.referenceIndex.yearLowPrice}} 
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'StockInfoBase',
		props: {
			info: {
				type: Object,
				default: {}
			}
		},
		computed: {
			// 数据可能需要不同的颜色,数据返回太慢，分开写
			setStyle() {
				return [this.$theme.PRIMARY, '#e48a88', '', '', '', '', this.$theme.RISE, this.$theme.FALL];
			},

			setData() {
				
			},
		}
	}
</script>

<style>
</style>