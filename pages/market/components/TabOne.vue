<template>
	<view style="padding:10px;">
		<view
			style="display: flex;align-items: center;justify-content: space-between;background-color: #f2bb8f;border-radius: 5px;padding: 5px;">
			<block v-for="(item,index) in top1" :key="index" v-if="index<=2">
				<view
					style="border-radius: 6px;border:2px solid rgba(0, 0, 0, 0);text-align: center;flex-basis: calc(50% - 12px);box-sizing: border-box;margin: 5px;"
					:style="{backgroundColor:item.change_ratio>0?'#FFF6F7':'#F0FEFB',border:`1px solid ${stockId==index?(item.change_ratio>0?$theme.RISE:$theme.FALL) :'#FFFFFF'}` }"
					@click='handleChangeType(index)'>
					<view class="bold" :style="{color: stockId==index?'#121212':'#121212'}"
						style="text-align: center;margin-top: 5px;">
						{{item.financial_item.name}}
					</view>
					<view :class="item.change_ratio>0?'red':'green'" style="text-align: center;margin-top:5px;"
						:style="$theme.setStockRiseFall(item.change_ratio>0)">{{item.d_price}}</view>
					<view class="t1 " :class="item.change_ratio>0?'red':'green'" style="text-align: center;"
						:style="$theme.setStockRiseFall(item.change_ratio>0)">{{(item.change_ratio)}}%</view>
					<view style="text-align: center;">
						<image :src="`/static/line_${item.change_ratio*1>0?'rise':'fall'}.png`" mode="scaleToFill"
							:style="$theme.setImageSize(120,50)"></image>
					</view>
				</view>

			</block>
		</view>
		<!-- <view style="margin: 10px;padding:10px 0">
			<view class="chart" id="chart-type-k-line" style="width: 100%;height: 300rpx;">
			</view>
		</view> -->

		<!-- 	<view class="flex padding-10">
			<image src="/static/hot.png" mode="widthFix" style="width: 30px;"></image>
			<view class="font-size-17 bold margin-left-5">{{$lang.MARKET_TABS[1]}}</view>
		</view> -->

		<view style="height: 1px;background-color: #f2bb8f;margin:0 20rpx;"></view>
		<MarketHotTop></MarketHotTop>

		<view style="padding:10px 0;">
			<view style="font-size:14px;display: flex;align-items: center;justify-content: center;padding: 10px;"
				@click="handleHot()" :style="{color:$theme.PRIMARY}">
				<view>{{$lang.MARKET_MORE_HOT_TITLE}}</view>
				<view class="arrow rotate_45" style="border-color:#F5B71C" :style="$theme.setImageSize(12)"></view>
			</view>
		</view>


		<view style="height: 20rpx;background-color: #F4F4F4;margin:0 -20rpx;"></view>
		<view style="display: flex;align-items: center;padding:0 40rpx;">
			<view style="font-size: 32rpx;font-weight: 700;line-height: 2.4;">{{$lang.MARKET_TABS[3]}}</view>
			<view style="font-size: 13px;margin-left: auto;" @click="linkMarketNews()" :style="{color:$theme.PRIMARY}">
				{{$lang.MORE}}
				<view class="arrow rotate_45" :style="$theme.setImageSize(12)"></view>
			</view>
		</view>
		<view style="height: 1px;background-color: #E5E5E5;margin:0 20rpx;"></view>

		<view style="display: flex;align-items: center;flex-wrap: wrap;">
			<block v-for="(item,index) in article" v-if="index<=3" :key="index">
				<view @click="open(item.url)" style="flex: 40%;height: 150px;margin: 10px;position: relative;">
					<image :src="item.pic" mode="aspectFill" style="border-radius: 8px;width: 100%;height: 130px;">
					</image>
					<view
						style="position: absolute;bottom:20px;left:0;width: 100%;background-color: rgba(0, 0, 0, 0.5);border-radius: 0 0 8px 8px;">
						<view style="margin:4px 6px;color: #FFFFFF;">{{item.title}}</view>
					</view>

					<view style="padding-left: 10px;" :style="{color:$theme.LOG_VALUE}">
						{{item.created_at}}
					</view>
				</view>
			</block>
		</view>

		<view style="height: 20rpx;background-color: #F4F4F4;margin:0 -20rpx;"></view>
		<view style="font-size: 32rpx;font-weight: 700;padding-left: 40rpx;line-height: 2.4;">
			{{$lang.MARKET_NEWS_TABS[3]}}</view>
		<view style="height: 1px;background-color: #E5E5E5;margin:0 20rpx 20rpx 20rpx;"></view>

		<view style="padding:0 20rpx;">
			<block v-for="(item,index) in industryList" :key="index">
				<view
					style="display: flex;align-items: center;line-height: 1.8;padding:10px;border-bottom: 1px solid #4b4b97;">
					<view style="font-size: 28rpx;flex:40%" :style="{color:$theme.LOG_VALUE}">{{item.name}}</view>
					<view style="font-size: 28rpx;text-align: right;padding-right: 30rpx;flex:20%;"
						:style="$theme.setStockRiseFall(item.avg_returns*1>0)">
						{{item.avg_returns}}
					</view>
					<view style="font-size: 24rpx;text-align: right;margin-left: auto;"
						:style="{color:$theme.LOG_VALUE}">
						{{item.dt.slice(0,10)}}
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {
		init,
		registerLocale,
		dispose
	} from '@/common/klinecharts.min.js';
	import uCharts from '@/common/u-charts.js';
	import TabsFifth from '@/components/tabs/TabsFifth.vue';
	import TabsSecond from '@/components/tabs/TabsSecond.vue'
	import CustomTitle from '@/components/CustomTitle.vue';
	import MarketHotTop from './MarketHotTop.vue';
	var uChartsInstance = {};
	export default {
		name: 'TabOne',
		components: {
			TabsFifth,
			TabsSecond,
			CustomTitle,
			MarketHotTop
		},
		data() {
			return {
				timer: null,
				curTab: 0, // 国内走势ITEM 
				stockId: 141, // 股票ID,折线图所需股票ID，用于获取该股数据
				top111: {
					141: "코스닥",
					17470: "코스피 200",
					255: "코스피",
					157: "다우",
					155: "S&P500",
					144: "나스닥",
					16709: "비트코인",
					16710: "이더리움",
					16714: "리플",
				},
				current: 0,
				top1: [],
				kLineChart: null,
				current1: 0,
				current2: 0,
				current3: 0,
				current33: 0,
				article: [],
				industryList: [],
			}
		},
		created() {
			this.getData();
		},
		mounted() {
			console.log('child mounted', this.timer);
			this.onSetTimeout();
		},
		deactivated() {
			console.log('child deactivated', this.timer);
			this.clearTimer();
		},

		methods: {
			setStyle(val) {
				return {
					...val ? this.$theme.LG_PRIMARY : this.$theme.LG_SECOND,
					color: val ? '#FFFFFF' : this.$theme.PRIMARY,
					borderRadius: `44rpx`,
					border: `1px solid ${val? this.$theme.TRANSPARENT:'#5A5A5A'}`,
				}
			},
			onSetTimeout() {
				this.timer = setInterval(() => {
					console.log("setInterval");
					this.getData();
				}, 3000);
			},
			clearTimer() {
				// clearTime
				if (this.timer) {
					clearInterval(this.timer);
					this.timer = null;
					console.log('clearTimer', this.timer);
				}
			},
			changeTab(val) {
				this.current1 = val;
				this.curTab = val;
				this.getData()
			},
			handleChangeTabHot(val) {
				console.log('top:', val);
				this.current2 = val;
				this.top_two()
			},
			handleChangeType(val) {
				this.stockId = val;
				this.getData()
			},

			open(url) {
				window.open(url)
			},

			// 点击查看股票详情
			handleStockInfo(code) {
				uni.navigateTo({
					url: `${this.$paths.STOCK_OVERVIEW}?code=${code}`,
				})
			},

			handleHot() {
				uni.reLaunch({
					url: `${this.$paths.MARKET_OVERVIEW}?type=1`,
				})
			},
			linkMarketNews() {
				uni.reLaunch({
					url: `${this.$paths.MARKET_OVERVIEW}?type=3`,
				})
			},

			async getData() {
				// uni.showLoading({
				// 	title: this.$lang.REQUEST_DATA,
				// });
				const result = await this.$http.get(`api/goods/top1`, {
					current1: this.current1,
					stockid: this.stockId
				});
				console.log('getData:', result);
				if (!result) return false;
				this.top1 = result
				// this.article = result.article;
				// this.industryList = result.bottom;

				// if (!this.kLineChart) {
				// 	this.kLineChart = init('chart-type-k-line')
				// 	this.kLineChart.setStyles({
				// 		"candle": {
				// 			"type": "area",
				// 			"tooltip": {
				// 				"showRule": "none",
				// 			}
				// 		},
				// 	});
				// }
				// this.kLineChart.applyNewData(result.kline)
			},
		},
	}
</script>

<style lang="scss">
	.yinying-red {
		box-shadow: #ffcfd7 0px 1px 6px 0px;
	}

	.yinying-blue {
		box-shadow: #d1e0ff 0px 1px 6px 0px;
	}

	.container {
		display: flex;
		align-items: center;
		/* 垂直居中 */
		justify-content: center;
		/* 水平居中 */
	}

	.left-element {
		/* 左边元素的样式，可以指定宽度和高度 */
		width: 50px;
		/* 例如 */
		height: 50px;
		/* 例如 */
		display: flex;
		align-items: center;
		/* 内部元素垂直居中 */
		justify-content: center;
		/* 内部元素水平居中 */
	}

	.right-text {
		/* 右边文本的样式，可以指定宽度和行高 */
		width: auto;
		/* 自动宽度 */
		text-align: center;
		/* 文本水平居中 */
		line-height: normal;
		/* 根据需要设置行高 */
	}

	.container1 {
		display: flex;
		flex-wrap: wrap;
		max-width: 100%;

		/* 或者设置具体的宽度 */
		.item {
			flex: 0 0 calc(33.333% - 20px);
			/* 假设容器宽度能均匀容纳3个元素，并且留有一定间隙 */
			margin: 10px;
			/* 元素之间的间隙 */
			box-sizing: border-box;
			/* 确保元素宽度包含内边距和边框 */
		}
	}



	.charts {
		width: 100%;
		height: 200px;
		margin: 10px;

	}




	.more {
		padding: 10px 0;
		color: #333;

		.icon {
			margin-left: 5px;
		}
	}



	.lists {
		padding: 0 10px;

		.item {
			margin-bottom: 16px;
		}

		.t {
			font-size: 19px;
			font-weight: 700;
			color: #333;
			margin-right: 10px;
		}

		.name {
			font-size: 14px;
			font-weight: 600;
			color: #333;
			margin-bottom: 5px;
		}

		.code {
			background: #f0f3fa;
			border-radius: 5px;
			padding: 5px 10px;
			font-size: 12px;
			font-family: Roboto;
			font-weight: 400;
			color: #333;
		}

		.nums {
			background: #f7e8e8;
			border-radius: 10px;
			padding: 5px 10px;
			-webkit-box-flex: 1;
			-webkit-flex: 1;
			flex: 1;

			.t1 {
				font-size: 14px;
				font-family: Roboto;
				font-weight: 400;
				color: #f24639;
			}
		}
	}
</style>