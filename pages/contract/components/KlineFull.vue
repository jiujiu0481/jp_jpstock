<template>
	<view style="position: fixed;width: 100vw;height: 100vh;top:0;left: 0;background-color: #FFFFFF;z-index: 9999;">
		<view style="display: flex;align-items: center; padding:12rpx;">
			<view style="margin-left: auto;" @click="zoomOut()">
				<image src="/static/zoom-out.svg" mode="aspectFit" :style="$theme.setImageSize(32)"></image>
			</view>
		</view>

		<view class="chart" id="kline-full" style="width: 100%;height: 100vh;"> </view>

	</view>

</template>

<script>
	import {
		init,
		dispose
	} from '@/common/klinecharts.min.js';
	export default {
		name: 'KlineFull',
		props: {
			list: {
				type: Array,
				default: []
			},
			config: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				kLineChart: null, // Kline实例化
				indicator: null, // 创建技术指标，移除时需使用
			}
		},
		computed: {
			chartData() {
				return this.list;
			},
			curTime() {
				return this.config.time;
			},
			curIndicator() {
				return this.config.indicator;
			},
			curCandle() {
				return this.config.candle;
			}
		},
		beforeMount() {
			this.renderInit();
			console.log(`>??`, this.config)
		},
		unmounted() {
			dispose("kline-full");
		},
		destroyed() {
			dispose('kline-full');
		},
		methods: {
			zoomOut() {
				this.$emit('action', 1);
			},

			renderInit() {
				setTimeout(() => {
					this.genKline();
				}, 1000)
			},

			clearData() {
				if (this.indicator) {
					this.kLineChart.removeIndicator(this.indicator);
					this.indicator = null;
				}
				if (this.kLineChart) this.kLineChart.clearData();
			},

			genKline() {
				this.clearData();
				if (!this.kLineChart) {
					this.kLineChart = init('kline-full');
				}
				// 显示技术指标
				if (!this.indicator) {
					this.indicator = this.kLineChart.createIndicator(this.config.indicator);
				}

				this.kLineChart.setStyles({
					indicator: {
						tooltip: {
							showRule: "always",
							showType: 'standard',
						}
					},
					candle: {
						type: `candle_` + this.config.candle,
						tooltip: {
							showRule: "always",
							showType: 'standard',
						},
						area: {
							lineSize: 2,
							lineColor: this.$theme.PRIMARY,
							value: 'close',
							backgroundColor: [{
								offset: 0,
								color: '#ffbfb9'
							}, {
								offset: 1,
								color: this.$theme.PRIMARY,
							}]
						},
						bar: {
							upColor: '#00aa99',
							downColor: '#F92855',
							noChangeColor: '#888888',
							upBorderColor: '#00aa99',
							downBorderColor: '#F92855',
							noChangeBorderColor: '#888888',
							upWickColor: '#00aa99',
							downWickColor: '#F92855',
							noChangeWickColor: '#888888'
						},
					},
				});
				// 显示技术指标
				if (!this.indicator) {
					this.indicator = this.kLineChart.createIndicator(this.curIndicator);
				}
				this.kLineChart.applyNewData(this.chartData)
			},
		},
	}
</script>

<style>
</style>