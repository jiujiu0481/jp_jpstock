<template>
	<view>

		<view class="block">
			<view class="header">
				<img @click="$u.route({type:'navigateBack'});" :src="$icon.zjt" class="back">
				<view class="title left_in" style="margin-left: 0px;">銘柄詳細</view>
				<template v-if="stockInfo">
					<img :src="stockInfo.is_collected==1?$icon.ysc:$icon.sc" class="have"
						@click="handleUnFollow(stockInfo.code)">
				</template>
			</view>
		</view>
		<template v-if="stockInfo">
			<view class="top">
				<view class="top-name">{{stockTitle}}<span>({{currentTime}})</span></view>
				<view class="top-code">{{stockInfo.code}}<span class="red">{{stockInfo.rate_num}}</span></view>
				<view class="top-foot">{{$util.formatMoney(stockInfo.current_price)}}
					<img :src="stockInfo.rate>0?$icon.up:$icon.down">
					<span :class="stockInfo.rate>0?'red':'green'">({{stockInfo.rate}}%)</span>
				</view>
			</view>
		</template>


		<view style="padding-bottom: 20px;margin-top: 10px;">
			<template v-if="stockInfo">
				<view
					style="background-color: #FFFFFF; min-height: 60vh;margin-top: 10px;width: 95%;border-radius: 10px;margin-left: 10px;">

					<TabsThird :tabs="$lang.STOCK_OVERVIEW_TABS" @action="changeTab" :acitve="curTab"
						v-show="stockInfo.project_type_id==1"> </TabsThird>

					<view :style="{display:curTab==0?'block':'none' }">


						<TabsThird :tabs="$lang.STOCK_OVERVIEW_KLINE_TABS" @action="handleShowKLine" :acitve="curKLine">
						</TabsThird>

						<view style="padding:20rpx;">
							<view class="chart" id="chart-type-k-line" style="width: 100%;height: 500px;">
							</view>
						</view>
					</view>
					<template v-if="curTab==0">
						<view
							style="position: fixed;bottom: 0;left: 0;right: 0;background-color: #FFFFFF;padding:10px;z-index: 9999;">
							<view class="btn_com" @click="linkBuy">
								{{$lang.BTN_BUY}}
							</view>
						</view>
					</template>

					<template v-if="curTab==1">
						<StockDetail :code='code' :id='stockInfo.stock_id'></StockDetail>
					</template>

					<template v-if="curTab==2">
						<StockNews :code='code' :id='stockInfo.stock_id'></StockNews>
					</template>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	import HeaderSecond from '@/components/header/HeaderSecond.vue';
	import TabsThird from '@/components/tabs/TabsThird.vue';
	import TabsFourth from '@/components/tabs/TabsFourth.vue';
	import StockDetail from './components/StockDetail.vue'
	import StockNews from './components/StockNews.vue';
	import StockInfoPrimary from './components/StockInfoPrimary.vue';

	import {
		init,
		registerLocale,
		dispose
	} from '@/common/klinecharts.min.js';

	export default {
		components: {
			HeaderSecond,
			TabsThird,
			TabsFourth,
			StockDetail,
			StockNews,
			StockInfoPrimary,
		},
		data() {
			return {
				isAnimat: false, // 页面动画
				curTab: 0, // 当前tab
				code: '', // 股票代码 在外部点击进入是，参数携带
				stockInfo: null, // 单股信息，
				kLineChart: null, // Kline实例化
				curKLine: 1, // 当前显示的Kline数据图标
				timer: null,
				socket: null,
				lishi: [], // k綫數據
				currentTime: ""
			};
		},
		computed: {
			stockTitle() {
				return this.stockInfo && this.stockInfo.name ?
					this.stockInfo.name : this.$lang.STOCK_OVERVIEW_TITLE
			}
		},

		onLoad(option) {
			this.code = option.code || '';
			this.getData();

		},
		onShow() {
			this.isAnimat = true;
			const now = new Date();
			this.currentTime = now.toLocaleTimeString('ja-JP', {
				hour12: false,
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			});
			// this.connect()
		},
		onHide() {
			this.isAnimat = false;
			if (this.timer) this.clearTimer();
			if (this.socket) this.disconnect();
		},
		onUnload() {
			if (this.timer) this.clearTimer();
			if (this.socket) this.disconnect();
		},
		deactivated() {
			if (this.timer) this.clearTimer();
			if (this.socket) this.disconnect();
		},
		methods: {
			async handleUnFollow(code) {
				this.stockInfo.is_collected = this.stockInfo.is_collected == 1 ? 0 : 1

				const result = await this.$http.post(`api/user/collect_edit`, {
					code: code,
				})
				// this.getData();
			},
			// sockets() {
			// 	//创建webSocket
			// 	this.webSocketTask = uni.connectSocket({
			// 		url: this.$http.WssUrl,
			// 		header: {
			// 			'content-type': 'application/json'
			// 		},
			// 		success(res) {
			// 			console.log('成功', res);
			// 		},
			// 	})
			// 	// 监听WebSocket连接打开事件
			// 	this.webSocketTask.onOpen((res) => {
			// 		console.info("监听WebSocket连接打开事件", res)
			// 	});
			// 	// 监听WebSocket错误
			// 	uni.onSocketError((res) => {
			// 		console.info("监听WebSocket错误" + res)
			// 	});
			// 	var that = this;
			// 	// 接收websocket消息及处理
			// 	this.webSocketTask.onMessage((res) => {
			// 		var data = JSON.parse(res.data);
			// 		console.log(data);
			// 		if (that.stockInfo) {
			// 			if (that.stockInfo.stock_id == data.pid) {
			// 				console.log(2222);

			// 				let current_price = data.last.replace(",", '')
			// 				// current_price=current_price.replace("+",'')

			// 				that.stockInfo.current_price = current_price;
			// 				let rate = data.pcp.replace("+", '')
			// 				rate = rate.replace("%", '')

			// 				that.stockInfo.rate = rate;

			// 				that.stockInfo.rate_num = data.pc;
			// 				// that.qiehuan()
			// 				this.lishi[this.lishi.length - 1].close = current_price;

			// 				this.kLineChart.applyNewData(this.lishi)

			// 			}
			// 		}

			// 	});
			// },
			// websocket链接
			connect() {
				// websocket is connect ok?
				console.log(`ws:`, this.$http.WssUrl);
				this.socket = uni.connectSocket({
					url: this.$http.WssUrl,
					header: {
						'content-type': 'application/json'
					},
					success(res) {
						console.info(`success res:`, res);
					},
					fail: (res) => {
						console.info(`fail res:`, res);
					}
				});
				console.log(`socket:`, this.socket);

				if (this.socket) {
					// 监听WebSocket连接打开事件
					this.socket.onOpen((res) => {
						console.info("监听WebSocket连接打开事件", res)
					});
					// 监听WebSocket错误
					uni.onSocketError((res) => {
						console.info("监听WebSocket错误" + res)
					});
					// 接收websocket消息及处理
					this.socket.onMessage((res) => {
						const data = JSON.parse(res.data);
						// console.log(`ws data:`, data, this.stockInfo);
						if (this.stockInfo.stock_id == data.pid) {
							this.stockInfo.current_price = parseFloat(data.last.replace(",", ''));
							this.stockInfo.rate = parseFloat(data.pcp.replace("%", ''));
							this.stockInfo.rate_num = data.pc;
							// 
							// this.stockInfo.info.ask = data.ask ? data.ask * 1 : 0;
							// this.stockInfo.info.last = data.last ? data.last * 1 : 0;
							// this.stockInfo.info.high = data.high ? data.high * 1 : 0;
							// this.stockInfo.info.low = data.low ? data.low * 1 : 0;
							// this.stockInfo.info.turnover = data.turnover ? data.turnover * 1 : 0;

							if (this.curKLine == 0) {
								this.lishi[this.lishi.length - 1].close = parseFloat(data.last.replace(",", ''));
								this.kLineChart.applyNewData(this.lishi)
							}
						}
					});
				}
			},
			// 关闭 websocket链接
			disconnect() {
				if (this.socket) {
					const result = this.socket.close();
					this.socket = null;
				}
			},

			setStyle(val) {
				return {
					...val ? this.$theme.LG_PRIMARY : this.$theme.LG_SECOND,
					color: val ? '#FFFFFF' : this.$theme.PRIMARY,
					borderRadius: `44rpx`,
					border: `1px solid ${val? this.$theme.TRANSPARENT:'#5A5A5A'}`,
				}
			},
			changeTab(val) {
				this.curTab = val;
			},
			handleShowKLine(val) {
				console.log(val);

				this.curKLine = val;
				this.genKLineData();
			},

			kLineInit() {
				this.kLineChart.setStyles({
					"candle": {
						"type": "candle_solid",
						"tooltip": {
							"showRule": "none",
						},
						area: {
							lineSize: 2,
							lineColor: this.$theme.PRIMARY,
							value: 'close',
							backgroundColor: [{
								offset: 0,
								color: '#ffbfb919'
							}, {
								offset: 1,
								color: this.$theme.PRIMARY,
							}]
						},
						bar: {
							upColor: '#e4013e',
							downColor: '#37927d',
							noChangeColor: '#ffbfb9',
							upBorderColor: '#e4013e',
							downBorderColor: '#37927d',
							noChangeBorderColor: '#ffbfb9',
							upWickColor: '#e4013e',
							downWickColor: '#37927d',
							noChangeWickColor: '#ffbfb9'
						},
					},
				});
				this.kLineChart.createIndicator('MA', false);
			},

			// 买入
			linkBuy() {
				uni.navigateTo({
					url: `${this.$paths.STOCK_BUY}?code=${this.code}`
				});
			},
			onSetTimeout() {
				this.timer = setInterval(() => {
					console.log("setInterval");
					this.getData();
				}, 5000);
			},

			clearTimer() {
				if (this.timer) {
					clearInterval(this.timer);
					this.timer = null;
					console.log('clearTimer', this.timer);
				}
			},

			// 产品详情
			async getData() {
				// uni.showLoading({
				// 	title: this.$lang.REQUEST_DATA,
				// });
				const result = await this.$http.get(`api/product/info`, {
					code: this.code,
					time_index: this.curKLine
				});
				if (!result) return false;
				console.log(`info:`, result);
				this.stockInfo = result[0];
				if (!this.timer) {
					// 延时,等DOM渲染
					setTimeout(() => {
						if (!this.kLineChart) {
							this.kLineChart = init('chart-type-k-line');
							this.kLineInit(); // 初始化Kline
						}
						this.genKLineData(); // 获取并生成KLine数据	
					}, 50);
				}



				if (this.curKLine == 0) {
					if (this.lishi.length > 10) {
						this.lishi[this.lishi.length - 1].close = this.stockInfo.current_price;
						this.kLineChart.applyNewData(this.lishi)
					}

				}
				// 每5s執行該函數時，處理定時器
				if (this.timer) this.clearTimer();
				this.onSetTimeout();
			},

			// 获取并生成KLine数据
			async genKLineData() {
				console.log(`??`, this.stockInfo);
				const result = await this.$http.post(`api/product/lishi`, {
					stock_id: this.stockInfo.stock_id,
					ac_time: this.curKLine,
					project_type_id: this.stockInfo.project_type_id,
					code: this.stockInfo.code
				})
				// this.kLineChart.setStyles({
				// 	"candle": {
				// 		"type": this.curKLine == 0 ? "area" : "candle_solid",
				// 	},
				// });
				console.log(`kline:`, result);
				if (!result) return false;
				this.lishi = result;
				if (this.stockInfo.current_price) {
					this.lishi[this.lishi.length - 1].close = this.stockInfo.current_price;
					this.kLineChart.applyNewData(this.lishi)
				}


				this.kLineChart.setPriceVolumePrecision(2, 0)
				this.kLineChart.applyNewData(result);
			},
		},
	}
</script>
<style type="text/css">
	@charset "UTF-8";

	/* uni.scss */
	.block {
		padding-top: 45px
	}

	.header {
		height: 46px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		padding: 0 21px;
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		box-sizing: border-box;
		z-index: 10;
		background: #fff;
		border-bottom: 1px solid #ebebeb
	}

	.header .back {
		width: 20px;
		height: 15px;
		display: block
	}

	.header .title {
		font-size: 13px;
		font-weight: 600;
		color: #111;
		letter-spacing: 0.5px;
		-webkit-transition-duration: 1s;
		-moz-transition-duration: 1s;
		-o-transition-duration: 1s;
		margin-left: -208px
	}

	.header .have {
		width: 20px;
		height: 20px;
		display: block
	}



	.top {
		height: 84px;
		border-bottom: 1px solid #ebebeb;
		padding: 0 15px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center
	}

	.top .top-name {
		height: 20px;
		font-weight: 600;
		font-size: 14px;
		color: #333;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between
	}

	.top .top-name span {
		font-weight: 400;
		font-size: 11px;
		color: #333
	}

	.top .top-code {
		height: 19px;
		font-weight: 400;
		font-size: 13px;
		color: #333;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content:space-between
		/* .red {
  	color: #E04E50;
  }

  .green {
  	color: rgba(55, 146, 125, 1);
  } */
	}

	.top .top-code span {
		font-weight: 600;
		font-size: 15px
	}

	.top .top-foot {
		height: 29px;
		font-weight: 600;
		font-size: 27px;
		color: #333;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		justify-content:flex-end
		/* .red {
  	color: #E04E50;
  }

  .green {
  	color: rgba(55, 146, 125, 1);
  } */
	}

	.top .top-foot img {
		width: 10px;
		height: 10px;
		margin-left: 5px
	}

	.top .top-foot span {
		font-weight: 600;
		font-size: 15px;
		margin-left: 12px
	}

	.middle {
		height: 79px;
		border-bottom: 1px solid #ebebeb;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-wrap: wrap;
		flex-wrap: wrap;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		-webkit-align-content: center;
		align-content: center;
		padding: 0 16px
	}

	.middle .middle-item {
		width: calc(50% - 18px);
		height: 19px;
		font-weight: 400;
		font-size: 13px;
		color: #999;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between
	}

	.middle .middle-item span {
		font-weight: 400;
		font-size: 13px;
		color: #333
	}

	.sort {
		height: 62px;
		border-bottom: 1px solid #ebebeb;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		background: #f7f9f8
	}

	.sort .sort-item {
		width: 105px;
		height: 28px;
		border-radius: 5px;
		border: 1px solid #e4013e;
		margin: 0 8px;
		font-weight: 500;
		font-size: 11px;
		color: #e4013e;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center
	}

	.sort .sort-on {
		background: #e4013e;
		color: #fff
	}

	.bottom {
		background: #fff;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .36);
		padding: 0 15px 18px 15px
	}

	.bottom .info-name {
		width: 100%;
		height: 37px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-weight: 600;
		font-size: 12px;
		color: #e4013e;
		letter-spacing: 0.5px;
		padding: 0 3px
	}

	.bottom .input-item {
		width: 100%;
		height: 35px;
		border-radius: 3px;
		border: 1px solid #bcbcbc;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 0 9px
	}

	.bottom .input-item uni-input {
		width: 100%;
		height: 33px;
		line-height: 33px;
		background: transparent;
		border: 0;
		font-size: 12px;
		font-weight: 400;
		color: #333
	}

	.bottom .input-item img {
		width: 16px;
		height: 12px;
		margin-left: 7px
	}

	.bottom .bottom-foot {
		height: 39px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		margin-top: 20px
	}

	.bottom .bottom-foot .bottom-foot-btn1 {
		width: calc(50% - 9px);
		height: 39px;
		background: #e4013e;
		border-radius: 8px;
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
		font-size: 13px;
		color: #fff
	}

	.bottom .bottom-foot .bottom-foot-btn2 {
		width: calc(50% - 9px);
		height: 39px;
		border-radius: 8px;
		border: 1px solid #e4013e;
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
		font-size: 13px;
		color: #e4013e
	}

	.minilayer-min {
		background: #191f27;
		padding-bottom: 15px
	}

	.minilayer-min .uni-title {
		height: 62px;
		border-bottom: 0.5px solid #000;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-size: 15px;
		font-weight: 600;
		color: #fff
	}

	.minilayer-min .uni-content {
		height: 46px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		border-bottom: 0.5px solid #000;
		margin: 0 15px
	}

	.minilayer-min .uni-content .uni-content-tit {
		font-size: 13px;
		font-weight: 400;
		color: #fff
	}

	.minilayer-min .uni-content .uni-content-box {
		background: #666;
		border: 0.5px solid #000;
		padding: 0 15px
	}

	.minilayer-min .uni-content .uni-content-box uni-input {
		font-size: 13px;
		font-weight: 400;
		color: #fff
	}

	.minilayer-min .uni-btn {
		height: 45px;
		background: #e4013e;
		border-radius: 22px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-size: 16px;
		font-weight: 400;
		color: #fff;
		margin: 15px
	}
</style>