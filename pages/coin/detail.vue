<template>
	<view :class="isAnimat?'fade_in':'fade_out' " style="min-height: 100vh;">
		<template v-if="info">
			<header class="common_header">
				<view class="left" @click="fanhui">
					<image src="/static/arrow_left.png" mode="aspectFit" :style="$theme.setImageSize(32)"></image>
				</view>
				<view class="center">
					<text style="padding:0 30rpx;" :style="{color:$theme.SECOND}">{{setTitle}}</text>
					<image src="/static/coin_choose.png" mode="aspectFit" :style="$theme.setImageSize(24)"
						@tap="linkSearch()"></image>
				</view>
				<view class="right">
					<!-- <view @click="handleUnFollow(info.gid)">
						<image :src="`/static/${info && info.is_collected==1?'stock_follow':'stock_unfollow'}.png`"
							:style="$theme.setImageSize(32)"></image>
					</view> -->
				</view>
			</header>

			<view style="margin:0 20rpx;background-color: #FFFFFF;border-radius: 24rpx;padding:20rpx;">
				<view style="display: flex;align-items: center;">
					<template v-if="info.logo">
						<view style="flex:0 0 auto;">
							<CustomLogo :logo="info.logo" :name="info.name"></CustomLogo>
						</view>
					</template>
					<view style="flex:1 1 auto;">
						<view style="padding-left:20rpx;" :style="{color:$theme.LOG_LABEL}">
							<text>24H: {{$util.formatNumber(info.info.vol,0)}}</text>
							<view
								style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;"
								:style="$theme.setStockRiseFall(info.info.rate>0)">
								<view style="font-size: 32rpx;">
									{{$util.formatNumber(info.info.lastPrice,info.shudian) }}
								</view>
								<view style="font-size: 32rpx;">{{$util.formatNumber(info.info.rate_num,info.shudian) }}
								</view>
								<view style="font-size: 32rpx;">
									{{`${info.info.rate>0?'+':'-'} `+ ($util.formatNumber($util.formatMathABS(info.info.rate),2))}}%
								</view>
							</view>
						</view>
					</view>
				</view>


				<template v-if="info.info && info.info.open">
					<view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.6;">
						<view :style="{color:$theme.LOG_LABEL}">{{$lang.COIN_VIEW_OPEN}}</view>
						<view :style="{color:$theme.LOG_VALUE}">
							{{$util.formatCoin(info.info.open)}}
						</view>
					</view>
				</template>
				<template v-if="info.info && info.info.close">
					<view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.6;">
						<view :style="{color:$theme.LOG_LABEL}">{{$lang.COIN_VIEW_CLOSE}}</view>
						<view :style="{color:$theme.LOG_VALUE}">
							{{$util.formatCoin(info.info.close)}}
						</view>
					</view>
				</template>
				<template v-if="info.info && info.info.high">
					<view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.6;">
						<view :style="{color:$theme.LOG_LABEL}">{{$lang.COIN_VIEW_HIGH}}</view>
						<view :style="{color:$theme.LOG_VALUE}">
							{{$util.formatCoin(info.info.high)}}
						</view>
					</view>
				</template>
				<template v-if="info.info && info.info.low">
					<view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.6;">
						<view :style="{color:$theme.LOG_LABEL}">{{$lang.COIN_VIEW_LOW}}</view>
						<view :style="{color:$theme.LOG_VALUE}">
							{{$util.formatCoin(info.info.low)}}
						</view>
					</view>
				</template>
				<template v-if="info.info && info.info.amount">
					<view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.6;">
						<view :style="{color:$theme.LOG_LABEL}">{{$lang.COIN_VIEW_AMOUNT}}</view>
						<view :style="{color:$theme.LOG_VALUE}">
							{{$util.formatCoin(info.info.amount)}}
						</view>
					</view>
				</template>
			</view>

			<view class="common_block" style="padding:12rpx;border-radius: 24rpx;">
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<block v-for="(item,index) in KlineTabs" :key="index">
						<view :style="setStyle(curKLine ==index)" @click="handleShowKLine(index)">
							{{item}}
						</view>
					</block>
				</view>
				<view class="chart" id="chart-type-k-line" style="width: 99%;height: 500rpx;">
				</view>
			</view>

			<view class="common_block" style="padding:12rpx;border-radius: 24rpx;padding-bottom: 200rpx;">
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<block v-for="(item,index) in listTabs" :key="index">
						<view :style="setStyle(curTab ==index)" @click="changeList(index)">
							{{item}}
						</view>
					</block>
				</view>
				<template v-if="curTab==0">
					<template v-if="!asks || asks.length<=0">
						<EmptyData></EmptyData>
					</template>
					<template v-else>
						<view style="display: flex;align-items: center;padding:20rpx 0;">
							<view style="flex:0 0 auto;text-align: center;" :style="{color:$theme.LOG_LABEL}">
								{{$lang.COIN_VIEW_DEPTH_TITLE_BUY_QTY}}
							</view>
							<view style="flex:1 1 auto;text-align: center;" :style="{color:$theme.LOG_LABEL}">
								{{$lang.COIN_VIEW_TRADE_TITLE_PRICE}}
							</view>
							<view style="margin-left: auto;" :style="{color:$theme.LOG_LABEL}">
								{{$lang.COIN_VIEW_DEPTH_TITLE_SELL_QTY}}
							</view>
						</view>
						<view style="display: flex;align-items: center;">
							<view style="flex:0 0 50%;">
								<AskList :list="asks" :max="asksMax" dir="row-reverse"></AskList>
							</view>
							<view style="flex:0 0 50%;">
								<BidList :list="bids" :max="bidsMax"></BidList>
							</view>
						</view>
					</template>
				</template>
				<template v-else>
					<template v-if="!tradeList || tradeList.length<=0">
						<EmptyData></EmptyData>
					</template>
					<template v-else>
						<view style="display: flex;align-items: center;padding:20rpx 0;">
							<view style="flex:0 0 40%;" :style="{color:$theme.LOG_LABEL}">
								{{$lang.COIN_VIEW_TRADE_TITLE_DATE}}
							</view>
							<view style="flex:0 0 auto; padding-left: 40rpx;" :style="{color:$theme.LOG_LABEL}">
								{{$lang.COIN_VIEW_TRADE_TITLE_PRICE}}
							</view>
							<view style="margin-left: auto;" :style="{color:$theme.LOG_LABEL}">
								{{$lang.COIN_VIEW_TRADE_TITLE_AMOUNT}}
							</view>
						</view>
						<block v-for="(item,index) in tradeList" :key="index">
							<view style="display: flex;align-items: center;line-height: 1.8;">
								<view style="flex:0 0 40%; font-size: 24rpx;" :style="{color:$theme.LOG_LABEL}">
									{{$util.formatDate(item.ts)}}
								</view>
								<view style="flex:0 0 auto; padding-left: 40rpx;"
									:style="$theme.setStockRiseFall(item.dir>0)">
									{{item.price}}
								</view>
								<view style="margin-left: auto;">{{$util.formatNumber(item.amount,4)}}</view>
							</view>
						</block>
					</template>
				</template>
			</view>

			<view style="position: fixed;bottom: 0;left: 0;right: 0;background-color: #FFFFFF;">
				<view style="display: flex; align-items: center;justify-content: space-around;">
					<view class="common_btn" style="margin:20px auto; width:40%;background-color: #6D41FF;"
						@click="linkIndex(0)">
						{{isContract?$lang.CONTRACT_DETAIL_BNT_BUY : $lang.COIN_VIEW_BTN_BUY}}
					</view>
					<view class="common_btn" style="margin:20px auto; width: 40%;" @click="linkIndex(1)">
						{{isContract?$lang.CONTRACT_DETAIL_BTN_SELL :$lang.COIN_VIEW_BTN_SELL}}
					</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	import {
		init,
		dispose
	} from '@/common/klinecharts.min.js';
	import {
		klineCandle
	} from '@/common/klineConfig.js';

	export default {
		data() {
			return {
				isAnimat: false, // 页面动画
				curTab: 0, // depth and latest trade
				code: '', // 股票代码 在外部点击进入是，参数携带
				tradeList: [],
				asks: [],
				bids: [],
				asksMax: 0, // asks 當前最大數量
				bidsMax: 0, // bids 當前最大數量

				info: null, // 单股信息，
				kLineChart: null, // Kline实例化
				curKLine: 0, // 当前显示的Kline数据图标
				socket: null,
				curType: 0, // 当前點擊底部按鈕[0买|1卖]
				modalInfo: {}, // 弹层中的数据
				temp: {},
				isConnected: false, // 是否链接socket

				isContract: false, // 当前详情是否为合约详情
			};
		},
		computed: {
			// header title
			setTitle() {
				if (this.info) {
					return this.info.name || 'Detail';
				}
			},
			KlineTabs() {
				return [this.$lang.COIN_VIEW_TAB_MINUTE,
					this.$lang.COIN_VIEW_TAB_DAILY,
					this.$lang.COIN_VIEW_TAB_MONTHLY
				];
			},
			// 
			listTabs() {
				return [this.$lang.COIN_VIEW_TAB_DEPTH,
					this.$lang.COIN_VIEW_TAB_TRADE,
				]
			}
		},

		onLoad(opt) {
			console.log(opt);
			this.code = opt.code || '';
			this.isContract = opt.tag == 'contract';
		},
		onShow() {
			this.isAnimat = true;
			if (this.socket) this.disconnect();
			this.getData();
		},
		onHide() {
			this.isAnimat = false;
			if (this.socket) this.disconnect();
		},
		onUnload() {
			if (this.socket) this.disconnect();
		},
		deactivated() {
			if (this.socket) this.disconnect();
		},
		methods: {
			fanhui() {
				uni.switchTab({
					url: "/pages/market/index"
				})
			},
			linkSearch() {
				if (this.socket) this.disconnect();
				uni.switchTab({
					url: this.$CONSTANTS.MARKET_INDEX
				})
			},
			// 买入 卖出
			linkIndex(val) {
				// 0:币买入 1:币卖出
				console.log(`val:`, val);
				this.curType = val;
				// 合约买卖页面
				if (this.isContract) {
					uni.reLaunch({
						url: `${ this.$CONSTANTS.CONTRACT_INDEX}?code=${this.code}&tag=${this.curType}`
					});
					return false;
				}
				uni.reLaunch({
					url: `${ this.$CONSTANTS.COIN_INDEX}?code=${this.code}&tag=${this.curType}`
				});
			},
			// // 取关
			// async handleUnFollow(id) {
			// 	const result = await this.$http.post(`api/user/collect_edit`, {
			// 		gid: id,
			// 	})
			// 	this.info.is_collected = this.info.is_collected == 1 ? 0 : 1;
			// },
			// 设置样式
			setStyle(val, w = 120) {
				return {
					minWidth: `${w}rpx`,
					margin: '16rpx',
					padding: `12rpx 20rpx`,
					borderRadius: `16rpx`,
					textAlign: 'center',
					backgroundColor: val ? this.$theme.SECOND : '#F6F8FC',
					color: val ? '#FFFFFF' : this.$theme.SECOND,
					borderRadius: `44rpx`,
				}
			},
			// 列表切換
			changeList(val) {
				this.curTab = val;
				if (this.curTab == 1) {
					this.getTradeList();
				} else {
					this.getDepthList();
				}
			},

			// websocket 断线重连
			reconnectWebSocket() {
				// 连接中，并且非手动关闭
				if (this.isConnected) return;
				console.log(`reconnect!`, this.isConnected);
				this.socket = null;
				console.log(`reconnect! socket:`, this.socket);
				this.connect();
			},

			// websocket链接
			connect() {
				//创建webSocket
				this.socket = uni.connectSocket({
					url: this.$http.WS_COIN_URL,
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
					this.isConnected = true; // 已连接
					this.socket.onOpen((res) => {
						console.info("socket onOpen:", res)
					});
					this.socket.onClose((res) => {
						// code:1000(手动关闭) 1006(异常关闭) 
						console.log(`onClose:`, res);
						this.isConnected = false;
						if (res.code !== 1000) {
							this.reconnectWebSocket();
						}
					});

					this.socket.onError((err) => {
						console.log(`onError:`, err);
						this.isConnected = false;
						this.reconnectWebSocket();
					});
					this.socket.onMessage((res) => {
						const data = JSON.parse(res.data);

						// 當前買賣盤的數據
						if (this.info.code == data.market && data.type == "depth") {
							// console.log('data depth:', data);
							if (this.curTab == 0) {
								// 直接提取前五條，替換數據
								const tempAsk = data.ask.slice(0, 5);
								const tempBid = data.bid.slice(0, 5);
								this.asks = tempAsk.map(item => [item.price, item.quantity]);
								this.bids = tempBid.map(item => [item.price, item.quantity]);
								// 當前數組中，數量最大值， *1.01(餘量，避免求出100%)
								this.asksMax = Math.max(...this.asks.map(item => item[1])) * 1.01;
								// 當前數組中，數量最大值， *1.01(餘量，避免求出100%)
								this.bidsMax = Math.max(...this.bids.map(item => item[1])) * 1.01;
							}
						}
						// 更新當前最新交易記錄
						if (this.info.code == data.market && data.type == "tradelog" && data.num * 1 > 0) {
							// console.log('data trade:', data);
							if (this.curTab == 1) {
								this.tradeList.unshift({
									amount: data.num,
									price: data.price,
									ts: data.id,
									dir: data.trade_type, // 1買 2 賣
								});
								this.tradeList.pop();
							}
						}
						// console.log('data:', this.info.locate, data);
						if (data.type == "ticker" && this.info.code == data.market && data.lastPrice > 0) {
							// console.log('data:', this.info.code, data);
							this.info.info.lastPrice = data.lastPrice * 1;
							this.info.info.rate = data.rate * 1;
							this.info.info.rate_num = data.rate_num * 1;
							
							// 获取图标上的数据
							const dataList = this.kLineChart.getDataList();
							// 数据数组的最后一个元素
							const lastData = dataList[dataList.length - 1];
							// 建新数据
							const newData = {
								...lastData
							}
							
							newData.close = data.lastPrice * 1;
							newData.rate = data.rate * 1;
							newData.rate_num = data.rate_num * 1;
							
							this.kLineChart.updateData(newData);
							
						}

						// 	当前k线更新	
						if (
							data.type == "kline" && this.info.code == data.market) {
							// console.log('data code:', this.info.code, data);
							this.info.info.high = data.high * 1;
							this.info.info.close = data.close * 1;
							this.info.info.open = data.open * 1;
							// this.info.info.high = data.high;
							this.info.info.low = data.low * 1;
							this.info.info.amount = data.amount * 1;
							this.info.info.vol = data.vol;
							// 获取图标上的数据
							const dataList = this.kLineChart.getDataList();
							// 数据数组的最后一个元素
							const lastData = dataList[dataList.length - 1];
							// 建新数据
							const newData = {
								...lastData
							}
							newData.close = data.close * 1;
							newData.high = data.high * 1;
							newData.low = data.low * 1;
							newData.volume = data.vol * 1;
							newData.open = data.open * 1;
							newData.rate = data.rate * 1;
							newData.rate_num = data.rate_num * 1;
							// 当前ws时间戳 - 最后一个元素时间戳，>指定秒数，追加一根蜡烛
							if (data.time - newData.timestamp > 60000)
								newData.timestamp = data.time;
							this.kLineChart.updateData(newData);
						}
					});
				}
			},
			// 关闭 websocket链接
			disconnect() {
				if (this.socket) {
					const result = this.socket.close();
					console.log('disconnect result:', result);
					this.socket = null;
				}
			},

			handleShowKLine(val) {
				this.disconnect();
				this.curKLine = val;
				this.getData();
			},

			// 产品详情
			async getData() {
				uni.showLoading({
					title: this.$lang.REQUEST_DATA,
				});
				const result = await this.$http.post(`api/product/info`, {
					code: this.code,
					time_index: this.curKLine
				});
				console.log(result);
				if (!result) return false;
				this.info = result[0];
				console.log(`info:`, this.info);
				console.log(this.info.project_type_id);

				this.changeList(this.curTab);
				// 当前实时更新模式
				this.connect();

				// 延时,等DOM渲染
				setTimeout(() => {
					this.genKLineData(); // 获取并生成KLine数据	
				}, 50);
			},

			// 获取并生成KLine数据
			async genKLineData() {
				if (!this.kLineChart) {
					this.kLineChart = init('chart-type-k-line');
					this.kLineChart.createIndicator('MA', false);
				}
				const temp = uni.getStorageSync('lang');
				const tz = this.$util.LANGUAGE_LIST.filter(item => item.lang == temp);
				console.log(`tz.timeZone:`, tz[0].timeZone);
				this.kLineChart.setTimezone(tz[0].timeZone);

				const result = await this.$http.post(`api/product/lishi`, {
					ac_time: this.curKLine,
					project_type_id: this.info.project_type_id,
					code: this.info.code
				})
				console.log('k data:', result);
				if (!result) return false;
				this.kLineChart.setStyles({
					indicator: {
						tooltip: {
							showRule: "always",
							showType: 'standard',
						}
					},
					candle: {
						type: `candle_solid`,
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
				this.kLineChart.setPriceVolumePrecision(this.info.shudian, 0)
				this.kLineChart.applyNewData(result);
			},

			// latest trading list
			async getTradeList() {
				const response = await uni.request({
					url: `https://api.huobi.pro/market/history/trade`,
					method: 'GET',
					data: {
						symbol: this.info.locate,
						size: 10,
					},
				});
				const [err, res] = response;
				console.log('err:', err, 'res:', res);
				if (res && res.data.status == 'ok') {
					const temp = res.data.data;
					console.log(`trade temp:`, temp);
					this.tradeList = temp.map(item => {
						return {
							...item.data[0],
							dir: item.data[0].direction == 'buy' ? 1 : 2,
						}
					});
				}
				console.log(`tradeList:`, this.tradeList);
			},

			async getDepthList() {
				const response = await uni.request({
					url: `https://api.huobi.pro/market/depth`,
					method: 'GET',
					data: {
						symbol: this.info.locate,
						depth: 5,
						type: 'step0'
					},
				});
				const [err, res] = response;
				console.log('err:', err, 'res:', res);
				if (res && res.data.status == 'ok') {
					const temp = res.data;
					this.asks = res.data.tick.asks;
					this.bids = res.data.tick.bids;
					// 當前數組中，數量最大值， *1.01(餘量，避免求出100%)
					this.asksMax = Math.max(...this.asks.map(item => item[1])) * 1.01;
					// 當前數組中，數量最大值， *1.01(餘量，避免求出100%)
					this.bidsMax = Math.max(...this.bids.map(item => item[1])) * 1.01;
				}
				console.log('asks:', this.asks);
				console.log('bids:', this.bids);
			}
		},
	}
</script>
<style lang="scss" scoped>
	.common_header {
		padding: 40rpx;
		display: flex;
		align-items: center;
		padding-top: 30px;

		.left {
			flex: 0 0 auto;
		}

		.right {
			flex: 0 0 auto;
		}

		.center {
			color: #FFFFFF;
			font-size: 36rpx;
			font-weight: 500;
			padding-left: 40rpx;
			flex: 1 1 auto;
			text-align: left;
		}
	}
</style>