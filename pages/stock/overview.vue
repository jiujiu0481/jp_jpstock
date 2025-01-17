<template>
	<view class="page_bg_sec" style="background-size: 100% 240px;">
		<header style="display: flex;align-items: center;padding: 24px 28rpx;">
			<view style="margin-right: auto;">
				<image src="/static/arrow_left.png" @click="$util.goBack()" mode="aspectFit" style="width: 16px;height: 16px;">
				</image>
			</view>
			<view style=" flex:60%">
				<view style="height: 56rpx;line-height: 56rpx;text-align: center;color:#FCFCFC;font-size: 28rpx;">
					銘柄詳細
				</view>
			</view>
			<view style="margin-left: auto;">
				<template v-if="stockInfo">
					<image :src="stockInfo.is_collected==1?$icon.ysc:$icon.sc" mode="aspectFit" style="width: 20px;height: 20px;"
						@click="handleUnFollow(stockInfo.code)"></image>
				</template>
			</view>
		</header>


		<template v-if="stockInfo">
			<view class="common_block"
				style="padding:24rpx;background-image: url(/static/sakura.png); background-position:top  right; background-repeat: no-repeat; background-size: 40%;">
				<view style="display: flex;align-items: center; justify-content: space-between;">
					<view style="font-size: 28rpx;font-weight: 700;">{{stockTitle}}</view>

				</view>

				<view style="display: flex;align-items: center; justify-content: space-between;line-height: 1.8;">
					<view style="padding: 4rpx 8rpx;border-radius: 2px;line-height: 1.1;"
						:style="$theme.setStockRiseFall(stockInfo.rate>0,true)">{{stockInfo.code}}</view>
					<view style="font-size: 27px;font-weight: 700;">{{$util.formatMoney(stockInfo.current_price)}}
					</view>
					<view style="font-weight: 700;" :style="$theme.setStockRiseFall(stockInfo.rate>0)">({{stockInfo.rate}}%)
					</view>
				</view>
				<view style="font-size: 24rpx;text-align: right;">({{currentTime}})</view>
			</view>
		</template>


		<view class="common_block" style="padding-bottom: 20px;margin-top:20px;">
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

					<template v-if="curTab==1">
						<StockDetail :code='code' :id='stockInfo.stock_id'></StockDetail>
					</template>

					<template v-if="curTab==2">
						<StockNews :code='code' :id='stockInfo.stock_id'></StockNews>
					</template>
				</view>
			</template>
		</view>

		<template v-if="curTab==0">
			<view style="position: fixed;bottom: 0;left: 0;right: 0;background-color: #FFFFFF;padding:10px;z-index: 9;">
				<view class="btn_com" @click="linkBuy">
					{{$lang.BTN_BUY}}
				</view>
			</view>
		</template>

		<template v-if="showBuy">
			<view class="common_mask" @click="handleClose()"></view>
			<view class="common_popup" style="padding-bottom: 30rpx;width: 100%;border-radius: 10px;">
				<view class="" style="display: flex;align-items: center;padding:24rpx;border-bottom: 0.5px solid #ffb2d18f;">
					<view style="width: 40rpx;"></view>
					<view class="flex-1" style="font-size: 36rpx;padding: 0px 20px;text-align: center;font-weight: bold;">
						{{$lang.BTN_BUY}}
					</view>
					<image src="/static/close.png" :style="$theme.setImageSize(40)" @click="handleClose()"></image>
				</view>

				<view
					style="background-color: #f7f9ff;width: 95%;border-radius: 10px;margin-left: 10px;background-image: url(/static/sakura.png); background-position:top  right; background-repeat: no-repeat; background-size: 40%;">
					<CustomTitle :title="$lang.STOCK_BUY_QUANTITY"></CustomTitle>

					<view style="display: flex;flex-wrap:wrap;padding:0 10px;">
						<block v-for="(item,index) in quantityList" :key="index">
							<view style="border-radius: 5px;width:20%;margin:20rpx;padding:10rpx 20rpx;text-align: center;"
								:style="setStyle(curQuantity==item)" @click="chooseQTY(item)">
								{{$util.formatNumber(item)}}
							</view>
						</block>
					</view>

					<view class="common_input_wrapper" style="padding: 10px;margin: 10rpx 40rpx;">
						<input v-model="quantity" type="number" :placeholder="$lang.STOCK_BUY_TIP_QUANTITY"
							@input="handleInput"></input>
					</view>

					<!-- 杠杆数组大于1，视为开启杠杆功能 -->
					<template v-if="leverList.length>1">
						<CustomTitle :title="$lang.LEVER"></CustomTitle>
						<view style="display: flex;flex-wrap:wrap;padding:10px;">
							<block v-for="(item,index) in leverList" :key="index">
								<view
									style="border-radius: 8rpx;width:18%;margin:10rpx;padding:8rpx 10rpx;line-height: 1.6;text-align: center;"
									:style="setStyle(curLever==item)" @click="chooseLever(item)">
									{{item}}
								</view>
							</block>
						</view>
					</template>
					<view
						style="font-size: 28rpx;display: flex;align-items: center;justify-content: space-between;line-height: 1.8;padding:0 40rpx;"
						:style="{color:$theme.LOG_LABEL}">
						<view>{{$lang.STOCK_BUY_QUANTITY}}</view>
						<view :style="{color:$theme.LOG_VALUE}">
							{{$util.formatNumber(quantity)}}
						</view>
						<template v-if="leverList.length>1">
							<view>{{$lang.LEVER}}</view>
							<view :style="{color:$theme.LOG_VALUE}">
								{{curLever}}
							</view>
						</template>
					</view>

					<view
						style="font-size: 28rpx;display: flex;align-items: center;justify-content: space-between;line-height: 1.8;padding:0 40rpx;"
						:style="{color:$theme.LOG_LABEL}">
						<view>{{$lang.STOCK_BUY_AMOUNT}}</view>
						<view :style="$theme.setStockRiseFall(stockInfo.rate>0)">
							{{$util.formatMoney(stockInfo.current_price*curQuantity/curLever)}}
						</view>
					</view>
					<view
						style="font-size: 28rpx;display: flex;align-items: center;justify-content: space-between;line-height: 1.8;padding:0 40rpx;"
						:style="{color:$theme.LOG_LABEL}">
						<view>{{$lang.STOCK_BUY_FEE}}</view>
						<view :style="$theme.setStockRiseFall(stockInfo.rate>0)">
							{{$util.formatMoney(stockInfo.current_price*curQuantity/curLever*fee)}}
						</view>
					</view>

					<view style="background-color: #FFFFFF;padding:30rpx">
						<view class="btn_com" @click="placeOrder()">
							{{$lang.BTN_BUY}}
						</view>
					</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	import HeaderSecond from '@/components/header/HeaderSecond.vue';
	import TabsThird from '@/components/tabs/TabsThird.vue';
	import TabsFourth from '@/components/tabs/TabsFourth.vue';
	import StockDetail from './components/StockDetail.vue'
	import StockNews from './components/StockNews.vue';
	import StockInfoPrimary from './components/StockInfoPrimary.vue';
	import CustomTitle from '@/components/CustomTitle.vue';
	import {
		init,
		registerLocale,
		dispose,
		utils
	} from '@/common/klinecharts.min.js';

	export default {
		components: {
			HeaderSecond,
			TabsThird,
			TabsFourth,
			StockDetail,
			StockNews,
			StockInfoPrimary,
			CustomTitle,
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
				isConnected: false, // 是否链接socket
				lishi: [], // k綫數據
				currentTime: "",
				showBuy: false, // 是否显示购买弹层
				quantityList: [100, 300, 500, 1000, 2500, 5000], // 预置数量
				curQuantity: 100, // 当前选中预置数量
				quantity: 100, // 数量输入框 
				leverList: [], // 杠杆值数组
				curLever: 1, // 当前选中杠杆值
				userInfo: {},
				fee: 1, // 手续费
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
			this.getAccountInfo();
			this.getConfig();
			if (this.socket) this.disconnect();
			this.connect();
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
			// 弹出关闭
			handleClose() {
				this.showBuy = false;
			},

			// 选择数量
			chooseQTY(val) {
				this.curQuantity = val;
				this.quantity = this.curQuantity;
			},
			// 选择杠杆
			chooseLever(val) {
				this.curLever = val;
			},
			// 获取配置
			async getConfig() {
				const result = await this.$http.get(`api/app/config`);
				console.log(`config result:`, result);
				if (!result) return false;
				const temp = result.reduce((map, item) => {
					map.set(item.key, item.value);
					return map;
				}, new Map());
				this.fee = temp.get('TransRate') || this.fee;
			},
			// 输入值
			handleInput(e) {
				this.curQuantity = Number(e.detail.value)
			},

			//购买
			async placeOrder() {
				const money = this.$util.formatNumber(this.stockInfo.current_price * this.curQuantity * 1)
				const result = await uni.showModal({
					title: this.$lang.STOCK_BUY_CONFIRM,
					content: `${this.stockInfo.name} ${this.$util.formatNumber(this.curQuantity)} ${this.$lang.QUANTITY_UNIT} 、${this.$lang.STOCK_BUY_AMOUNT} ${money} ${this.$lang.CURRENCY_UNIT}`,
					cancelText: this.$lang.BTN_CANCEL,
					confirmText: this.$lang.BTN_CONFIRM,
					showCancel: true, // 是否显示取消按钮，默认为 true
					confirmColor: '#f96643',
					cancelColor: '#999999',
				});
				console.log('异步弹层:', result);
				if (result[1].confirm) {
					this.buy();
				}
			},
			async buy() {
				if (this.quantity == '' || this.quantity <= 0) {
					uni.showToast({
						title: this.$lang.STOCK_BUY_TIP_QUANTITY,
						icon: 'none'
					});
					return false;
				}
				uni.showLoading({
					title: this.$lang.API_DATA_SUBMIT,
				});
				const result = await this.$http.post(`api/product/purchase`, {
					num: this.quantity,
					gid: this.stockInfo.gid,
					price: this.stockInfo.current_price,
					ganggan: this.curLever,
				});
				if (!result) return false;
				uni.showToast({
					title: this.$lang.API_POST_SUCCESS,
					icon: 'success'
				});
				this.handleClose();
				setTimeout(() => {
					uni.switchTab({
						url: this.$paths.POSITION,
					});
				}, 1000)
			},
			// 获取账户信息
			async getAccountInfo() {
				uni.showLoading({
					title: this.$lang.API_GET_ACCOUNT_INFO
				});
				const result = await this.$http.get(`api/user/info`);
				console.log('info result：', result);
				if (!result) return false;
				this.userInfo = result;
				if (this.userInfo.ganggan) {
					this.leverList = this.$util.leverList(this.userInfo.ganggan);
				}
			},

			async handleUnFollow(code) {
				this.stockInfo.is_collected = this.stockInfo.is_collected == 1 ? 0 : 1

				const result = await this.$http.post(`api/user/collect_edit`, {
					code: code,
				})
				// this.getData();
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
				if (this.socket) {
					const result = this.socket.close();
					console.log('disconnect result:', result);
					this.socket = null;
				}
				//创建webSocket
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
						// onsole.log('data:', data);
						if (this.stockInfo && this.stockInfo.stock_id == data.pid) {
							console.log(this.stockInfo.stock_id, `ws data:`, data);
							this.stockInfo.current_price = parseFloat(data.last.replace(",", ''));
							this.stockInfo.rate = parseFloat(data.pcp.replace("%", ''));
							this.stockInfo.rate_num = data.pc;
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
				this.kLineChart.customApi = {
					formatDate: (dateTimeFormat, timestamp) => {
						if (this.curKLine == 0) {
							return utils.formatDate(
								dateTimeFormat,
								timestamp,
								"HH:mm"
							)
						} else {
							return utils.formatDate(
								dateTimeFormat,
								timestamp,
								'YYYY-MM-DD'
							)
						}
					}
				};
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
				// uni.navigateTo({
				// 	url: `${this.$paths.STOCK_BUY}?code=${this.code}`
				// });
				this.showBuy = true;
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
							this.kLineChart = init('chart-type-k-line', {
								customApi: {
									formatDate: (dateTimeFormat, timestamp) => {
										if (this.curKLine == 0) {
											return utils.formatDate(
												dateTimeFormat,
												timestamp,
												"HH:mm"
											)
										} else {
											return utils.formatDate(
												dateTimeFormat,
												timestamp,
												'YYYY-MM-DD'
											)
										}
									},
								},
								styles: {
									candle: {
										tooltip: {
											custom: [{
													title: 'Date: ',
													value: '{time}'
												},
												{
													title: 'open',
													value: '{open}'
												},
												{
													title: 'high',
													value: '{high}'
												},
												{
													title: 'low',
													value: '{low}'
												},
												{
													title: 'close',
													value: '{close}'
												},
												{
													title: 'volume',
													value: '{volume}'
												},
											],
											text: {
												marginTop: 58,
												marginLeft: 16,
											},
										},
									},
								},
							});
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


				this.kLineChart.setPriceVolumePrecision(2, 0);
				this.kLineChart.setTimezone(`Asia/Tokyo`);
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