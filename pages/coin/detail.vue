<template>
	<view style="min-height: 100vh;background-color: #000;">
		<template v-if="info">
			<header class="common_header">
				<view class="left" @click="$util.goBack()">
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

			<view style="margin:0 20rpx;padding:20rpx;">
				<view class="flex flex-b">
					<view>
						<view style="font-size: 16px;">{{setTitle}}</view>
						<view class="flex gap5">
							<view style="font-size: 22px;" :style="$theme.setStockRiseFall(info.info.rate>0)">{{$util.formatNumber(info.info.lastPrice,info.shudian) }}</view>
							<view style="font-size: 26rpx;" :style="$theme.setStockRiseFall(info.info.rate>0)">
								{{`${info.info.rate>0?'+':'-'} `+ $util.formatPercentage($util.formatNumber($util.formatMathABS(info.info.rate),2))}}
							</view>
						</view>
					</view>
					<view>
						<view class="flex flex-b gap10	">
							<template v-if="info.info && info.info.open">
								<view style="">
									<view style="color: #999999;font-size: 12px;">{{$lang.COIN_VIEW_OPEN}}:</view>
									<view :style="{color:$theme.LOG_VALUE}" style="font-size: 13px;">
										{{$util.formatCoin(info.info.open)}}
									</view>
								</view>
							</template>
							<template v-if="info.info && info.info.close">
								<view style="">
									<view style="color: #999999;font-size: 12px;">{{$lang.COIN_VIEW_CLOSE}}</view>
									<view :style="{color:$theme.LOG_VALUE}" style="font-size: 13px;">
										{{$util.formatCoin(info.info.close)}}
									</view>
								</view>
							</template>
						</view>
						
						<view class="flex flex-b gap10	">
							<template v-if="info.info && info.info.open">
								<view style="">
									<view style="color: #999999;font-size: 12px;">{{$lang.COIN_VIEW_HIGH}}:</view>
									<view :style="{color:$theme.LOG_VALUE}" style="font-size: 13px;">
										{{$util.formatCoin(info.info.high)}}
									</view>
								</view>
							</template>
							<template v-if="info.info && info.info.close">
								<view style="">
									<view style="color: #999999;font-size: 12px;">{{$lang.COIN_VIEW_LOW}}</view>
									<view :style="{color:$theme.LOG_VALUE}" style="font-size: 13px;">
										{{$util.formatCoin(info.info.low)}}
									</view>
								</view>
							</template>
						</view>
				
					</view>
				</view>
				<view style="display: flex;align-items: center;margin-top: 10px;">
					<!-- <template v-if="info.logo">
						<view style="flex:0 0 auto;">
							<CustomLogo :logo="info.logo" :name="info.name"></CustomLogo>
						</view>
					</template> -->
					<view style="flex:1 1 auto;">
						<view style="" :style="{color:$theme.LOG_LABEL}">
							<!-- <text>24H: {{$util.formatNumber(info.info.vol,0)}}</text> -->
							<view
								style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;"
								:style="$theme.setStockRiseFall(info.info.rate>0)">
								<view style="font-size: 32rpx;">
									<!-- {{$util.formatNumber(info.info.lastPrice,info.shudian) }} -->
									24H: {{$util.formatNumber(info.info.vol,0)}}
								</view>
								<view style="font-size: 32rpx;">{{$util.formatNumber(info.info.rate_num,info.shudian) }}
								</view>
								<view style="font-size: 32rpx;">
									{{`${info.info.rate>0?'+':'-'} `+ $util.formatPercentage($util.formatNumber($util.formatMathABS(info.info.rate),2))}}
								</view>
							</view>
						</view>
					</view>
				</view>

			</view>
			
			<view class="flex" style="padding: 10px 20px;">
				<view class="flex flex-b flex-3">
					<view  v-for="(item,index) in $lang.TABS_TIMES" :style="curTime==item?'color:#1d70c8':'color:#5f5f5f'" v-if="index<=4" @click="confirmTime1(item)" >{{item}}</view>
					<view style="color: #9cb9d5;" class="flex align-center" @click="chooseTime()">
						{{$lang.COMMON_MORE}}
						<image src="/static/arrow_down_solid.png" mode="widthFix" style="width: 8px;height: 8px;margin-left: 3px;" ></image>
						<image src="/static/Zoom-in.svg" mode="aspectFit" :style="$theme.setImageSize(32)" style="margin-left: 30px;filter: invert(100%) sepia(0%) saturate(0%) brightness(200%);"  @click.stop="zoomIn()"></image>
					</view>
						
				</view>
			</view>
			
			<view style="padding:12rpx 5px;">
				<!-- <view style="display: flex;align-items: center; padding:12rpx;">
					<view style="padding-right: 12rpx;font-size: 20rpx;">{{$lang.TXT_TIME}}:</view>
					<view style="padding-right: 24rpx;color:#038ef8;" @click="chooseTime()"> {{curTime}} </view>
					<view style="padding-right: 12rpx;font-size: 20rpx;">{{$lang.INDICATOR_TITLE}}:</view>
					<view style="padding-right: 24rpx;color:#038ef8;" @click="chooseIndicator()">
						{{curIndicator}}
					</view>
					<view style="padding-right: 12rpx;font-size: 20rpx;">{{$lang.CANDLE_TITLE}}:</view>
					<view style="padding-right: 24rpx;color:#038ef8;" @click="chooseCandle()">
						{{curCandle}}
					</view>
					<view style="margin-left: auto;" @click="zoomIn()">
						<image src="/static/Zoom-in.svg" mode="aspectFit" :style="$theme.setImageSize(32)"></image>
					</view>
				</view> -->
				<view class="chart" id="kline-norm" style="width: 100%;height:500px;">
				</view>
			</view>
			
			<view class="flex flex-b" style="padding: 10px 30px;">
					<view  v-for="(item,index) in indicatorType" :style="curIndicator==item?'color:#1d70c8':'color:#5f5f5f'"@click="confirmIndicator(item)" >{{item}}</view>
					
					<view v-for="(item,index) in indicatorType1" :style="curIndicator1==item?'color:#1d70c8':'color:#5f5f5f'"@click="confirmIndicator1(item)" >{{item}}</view>
					
			</view>
			

			<!-- 
			<KLineChart :name="code" /> -->


			<view style="padding:12rpx 10px;border-radius: 24rpx;padding-bottom: 200rpx;">
				<view style="display: flex;">
					<block v-for="(item,index) in listTabs" :key="index">
						<view :style="setStyle(curTab ==index)" @click="changeList(index)" style="text-align: center; margin-right: 10px;">
							{{item}}
							<view style="background-color: #038ef8;height: 2px;width: 40%;margin-left: 30%;margin-top: 5px;" v-if="curTab ==index"></view>
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
						<block v-for="(item,index) in asks" :key="index">
							<view style="display: flex;align-items: center;line-height: 2.4;margin:10rpx 0;">
								<view style="flex:0 0 50%;" :style="$theme.depathAsksBG(item[1],asksMax)">
									<view
										style="display: flex;align-items: center;justify-content: space-between;padding-right:10rpx;">
										<view>{{$util.formatCurrency($util.formatNumber(item[1],4))}}</view>
										<view :style="$theme.setStockRiseFall(true)">
											{{$util.formatCurrency($util.formatNumber(item[0],4))}}
										</view>
									</view>
								</view>
								<view style="flex:0 0 50%;" :style="$theme.depathBidsBG(bids[index][1],bidsMax)">
									<view
										style="display: flex;align-items: center;justify-content: space-between;padding-left:10rpx;">
										<view :style="$theme.setStockRiseFall(false)">
											{{$util.formatCurrency($util.formatNumber(bids[index][0],4))}}
										</view>
										<view>{{$util.formatCurrency($util.formatNumber(bids[index][1],4))}}</view>
									</view>
								</view>
							</view>
						</block>
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
									{{$util.formatCurrency(item.price)}}
								</view>
								<view style="margin-left: auto;">
									{{$util.formatCurrency($util.formatNumber(item.amount,4))}}
								</view>
							</view>
						</block>
					</template>
				</template>
			</view>

			<view style="position: fixed;bottom: 0;left: 0;right: 0;z-index: 999;background-color: #1e1e1e;">
				<view style="display: flex; align-items: center;justify-content: space-around;">
					<view class="common_btn" style="margin:20px auto; width:40%;" :style="{backgroundColor:$theme.RISE}"
						@click="linkIndex(0)">
						{{isContract?$lang.CONTRACT_DETAIL_BNT_BUY: $lang.COIN_VIEW_BTN_BUY}}
					</view>
					<view class="common_btn" style="margin:20px auto; width: 40%;"
						:style="{backgroundColor:$theme.FALL}" @click="linkIndex(1)">
						{{isContract?$lang.CONTRACT_DETAIL_BTN_SELL: $lang.COIN_VIEW_BTN_SELL}}
					</view>
				</view>
			</view>
		</template>

		<!-- Time选择器 -->
		<u-picker :show="isShowTime" :columns="[$lang.TABS_TIMES]" @change="changeTime" @cancel="isShowTime=false"
			@confirm="confirmTime" :cancelText="$lang.COMMON_CANCEL" :confirmText="$lang.COMMON_CONFIRM"
			:cancelColor="$theme.MODAL_CANCEL" :confirmColor="$theme.PRIMARY" visibleItemCount="9"></u-picker>

		<!-- 技术指标 选择器 -->
		<u-picker :show="isShowIndicator" :columns="[indicatorType]" @change="changeIndicator"
			@cancel="isShowIndicator=false" @confirm="confirmIndicator" :cancelText="$lang.COMMON_CANCEL"
			:confirmText="$lang.COMMON_CONFIRM" :cancelColor="$theme.MODAL_CANCEL" :confirmColor="$theme.PRIMARY"
			visibleItemCount="9"></u-picker>

		<!--  主图显示 样式类型 -->
		<u-picker :show="isShowCandle" :columns="[candleType]" @change="changeCandle" @cancel="isShowCandle=false"
			@confirm="confirmCandle" :cancelText="$lang.COMMON_CANCEL" :confirmText="$lang.COMMON_CONFIRM"
			:cancelColor="$theme.MODAL_CANCEL" :confirmColor="$theme.PRIMARY" visibleItemCount="9"></u-picker>

		<!-- 全屏显示图表 -->
		<template v-if="showFullScreen">
			<KlineFull :list="klineList" :config="klineFullConfig" @action="handleClose" />
		</template>
	</view>
</template>

<script>
	// import KLineChart from './components/KLineChart.vue';
	import CustomLogo from '@/components/CustomLogo.vue';
	import EmptyData from '@/components/EmptyData.vue';
	import KlineFull from './components/KlineFull.vue';
	import {
		init,
		// registerLocale,
		dispose
	} from '@/common/klinecharts.min.js';

	export default {
		components: {
			EmptyData,
			CustomLogo,
			KlineFull,
			// KLineChart
		},
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

				klineData: null, // kline 数据
				indicator: null,

				// time选择器
				isShowTime: false,
				curTime: '', // 当前选择时间
				// 技术指标
				isShowIndicator: false,
				curIndicator: '', // 当前选择技术指标
				curIndicator1: '', // 当前选择技术指标
				// 主位图表显示样式
				isShowCandle: false,
				curCandle: 'solid',

				showFullScreen: false, // 是否全屏
				kLineChartFull: null, // Kline实例化

				klineList: [],

				isContract: false, // 当前详情是否为合约详情
				time_index:0,
			};
		},
		computed: {
			// header title
			setTitle() {
				if (this.info) {
					return this.info.name || 'Detail';
				}
			},

			// 图表数据
			klineDataResult() {
				return this.klineList && this.klineList.length > 0 ?
					this.klineList : []
			},
			// 显示图表
			isShowKline() {
				return this.klineDataResult.length > 0
			},
			// 全屏所需配置项
			klineFullConfig() {
				return {
					candle: this.curCandle,
					indicator: this.curIndicator,
					indicator1: this.curIndicator1,
					time: this.curTime,
				}
			},

			// 技术指标类型备选组
			indicatorType() {
				// klinecharts 支持的技术指标
				return ['MA', 'EMA', 'BOLL']
			},
			
			indicatorType1() {
				// klinecharts 支持的技术指标
				return ['VOL', 'MACD', 'KDJ',  'RSI','WR']
			},
			
			// 主位的图表数据显示style
			candleType() {
				return ['solid', 'stroke', 'up_stroke', 'down_stroke', 'ohlc', 'area']
			},
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
			this.$util.checkToken();
			if (this.socket) this.disconnect();
			this.getData();
			this.curTime = this.$lang.TABS_TIMES[0];
			this.curIndicator = this.indicatorType[0];
			this.curIndicator1 = this.indicatorType1[0];
			this.curCandle = this.candleType[0];
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
			handleClose() {
				this.showFullScreen = false;
			},
			zoomIn() {
				this.showFullScreen = true;
				this.handleShowKLine(this.curKLine);
			},
			// 選擇一个时间
			chooseTime() {
				this.isShowTime = true;
			},
			changeTime(e) {
				console.log(`changeMode e:`, e);
			},
			confirmTime(e) {
				console.log(`confirmMode e:`, e);
				// this.code = e.value[0].code;
				this.curTime = e.value[0];
				this.handleShowKLine(e.value[0]);
				this.isShowTime = false;
			},
			
			confirmTime1(e) {
				console.log(e);

				// this.code = e.value[0].code;
				this.curTime = e;
				this.handleShowKLine(e);
			},
			
			

			// 選擇一个技术指标
			chooseIndicator() {
				this.isShowIndicator = true;
			},
			changeIndicator(e) {
				console.log(`changeMode e:`, e);
			},
			confirmIndicator(e) {
				console.log(`confirmMode e:`, e);
				// this.code = e.value[0].code;
				this.kLineChart.removeIndicator('candle_pane', this.curIndicator);
				
				this.curIndicator = e;
				// this.handleShowKLine(this.curKLine);
				
				
				this.indicator = this.kLineChart.createIndicator(this.curIndicator,false,{
					id: 'candle_pane', // 指定将指标添加到主图
				});
			},
			
			confirmIndicator1(e) {
				console.log(`confirmMode e:`, e);
				// this.code = e.value[0].code;
				this.kLineChart.removeIndicator(this.indicator1,this.curIndicator1);
				
				this.curIndicator1 = e;
				// this.handleShowKLine(this.curKLine);
				
				
				this.indicator1 = this.kLineChart.createIndicator(this.curIndicator1);
			},
			

			// 选择一个显示类型
			chooseCandle() {
				this.isShowCandle = true;
			},
			changeCandle(e) {
				console.log(`changeMode e:`, e);
			},
			confirmCandle(e) {
				console.log(`confirmMode e:`, e);
				// this.code = e.value[0].code;
				this.curCandle = e.value[0];
				this.handleShowKLine(this.curKLine);
				this.isShowCandle = false;
			},


			linkSearch() {
				if (this.socket) this.disconnect();
				uni.navigateTo({
					url: this.$paths.SEARCH
				})
			},
			// 买入 卖出
			linkIndex(val) {
				// 0:币买入 1:币卖出
				console.log(`val:`, val);
				this.curType = val;
				// 合约买卖页面
				if (this.isContract) {
					uni.navigateTo({
						url: `/pages/contract/index?code=${this.code}&tag=${this.curType}`
					});
					return false;
				}
				uni.navigateTo({
					url: `/pages/coin/index?code=${this.code}&tag=${this.curType}`
				});
			},
			// 取关
			async handleUnFollow(id) {
				const result = await this.$http.post(`api/user/collect_edit`, {
					gid: id,
				})
				this.info.is_collected = this.info.is_collected == 1 ? 0 : 1;
			},
			// 设置样式
			setStyle(val, w = 120) {
				return {
					minWidth: `${w}rpx`,
					padding: `12rpx 0rpx`,
					color: val ? '#FFFFFF' : "#999999",
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
				const result = await this.$http.get(`api/product/info`, {
					code: this.code,
					time_index: this.curKLine
				});
				console.log(result);
				if (!result) return false;
				this.info = result[0];
				console.log(`info:`, this.info);
				console.log(this.info.project_type_id);

				this.changeList(this.curTab);

				this.connect();

				// 延时,等DOM渲染
				setTimeout(() => {
					this.genKLineData(); // 获取并生成KLine数据	
				}, 50);
			},

			clearData() {
				if (this.indicator) {
					this.kLineChart.removeIndicator(this.indicator);
					this.indicator = null;
				}
				if (this.kLineChart) this.kLineChart.clearData();
			},

			// 获取并生成KLine数据
			async genKLineData() {
				if (!this.kLineChart) {
					this.kLineChart = init(`kline-norm`);
					const temp = uni.getStorageSync('lang');
					const tz = this.$util.LANGUAGE_LIST.filter(item => item.lang == temp);
					console.log(`tz.timeZone:`, tz[0].timeZone);
					this.kLineChart.setTimezone('Europe/Istanbul');
				}
				const result = await this.$http.get(`api/product/coin_lishi`, {
					ac_time: this.curKLine,
					project_type_id: this.info.project_type_id,
					// 此处用code ，用locate报错
					code: this.info.code
				})
				console.log('k data:', result);
				if (!result) return false;
				this.clearData();
				
				this.klineList = result;
				this.kLineChart.setStyles({
					grid: {
					    show: true,
					    horizontal: {
						  show: true,
						  color: '#303030',
						},
						vertical: {
						  show: true,
						  color: '#303030',
						}
					},
					indicator: {
						tooltip: {
							showRule: "always",
							showType: 'standard',
						}
					},
					candle: {
						type: `candle_` + this.curCandle,
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
				// const temp = {
				// 	close: result[result.length - 1].close,
				// 	high: result[result.length - 1].high,
				// 	low: result[result.length - 1].low,
				// 	open: result[result.length - 1].open,
				// 	timestamp: result[result.length - 1].timestamp,
				// 	turnover: result[result.length - 1].turnover,
				// };
				// this.temp = temp;
				this.kLineChart.setPriceVolumePrecision(this.info.shudian, 0)
				this.kLineChart.applyNewData(this.klineList)
				this.$forceUpdate()
				// this.kLineChart.setTimezone();
				// 显示技术指标
				if (!this.indicator) {
					this.indicator1 = this.kLineChart.createIndicator(this.curIndicator1);
					this.indicator = this.kLineChart.createIndicator(this.curIndicator,false,{
						id: 'candle_pane', // 指定将指标添加到主图
					});
				}
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