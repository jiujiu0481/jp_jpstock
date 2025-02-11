<template>
	<view style="background-image: url(/static/trade_head.png);
	background-position: 0 0;
	background-size: 100% 260px ;
	background-repeat: no-repeat;padding-bottom:-330px; background-color:#ededed ;">
		<header style="display: flex;align-items: center;padding: 24px 28rpx;">
			<view style="margin-right: auto;">
				<image src="/static/arrow_left.png" @click="$util.goBack()" mode="aspectFit"
					style="width: 16px;height: 16px;"></image>
			</view>
			<view style=" flex:60%">
				<view style="height: 56rpx;line-height: 56rpx;text-align: center;color:#FCFCFC;font-size: 28rpx;">
					銘柄詳細
				</view>
			</view>	
		</header>
		<view style="border-radius: 20px 20px 0 0;pa">
			<template >
				<view class="common_header" style="padding-bottom: 0;">
					
					<view class="center">
						<text style="padding-right:20rpx;" >BTC/USDT</text>
						<image src="/static/coin_choose.png" mode="aspectFit" style="padding-left: 20rpx;"
							:style="$theme.setImageSize(30)" @tap="chooseCoin()"></image>
					</view>
					<view class="right">
						<view @click="linkCoinInfo()">
							<image src="/static/cantract_detail.png" mode="aspectFit" style="padding-right: 30rpx;"
								:style="$theme.setImageSize(32)">
							</image>
						</view>
					</view>
					<view class="right">
						<view @click="handleUnFollow(info.gid)">
							<image :src="`/static/${info && info.is_collected==1?'stock_follow':'stock_unfollow'}.png`"
								:style="$theme.setImageSize(32)"></image>
						</view>
					</view>
				</view>
				<template >
					<view style="margin:20rpx 60rpx;display: flex;align-items: center;justify-content: space-between;">
						<text style="font-size: 28rpx;"
							:style="$theme.setStockRiseFall(info.rate>0)">{{$util.formatNumber(info.current_price)}}111</text>
						<text style="font-size: 26rpx;padding:0 40rpx;"
							:style="$theme.setStockRiseFall(info.rate>0)">{{$util.formatPercentage(info.rate)}}</text>
					</view>
				</template>
			</template>

			<view class="common_block"
				style="border-radius: 24rpx;padding:0;padding-bottom:20rpx;display: flex;align-items: center;justify-content: space-between;">
				<view style="flex:0 0 60%;">
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<block v-for="(item,index) in tabs" :key="index">
							<view :style="setStyle(curTab ==index)" @click="changeTab(index)">
								{{item}}
							</view>
						</block>
					</view>
					<view style="padding:20rpx;">
						<u-radio-group v-model=" radiovalue1" placement="row" @change="groupChange">
							<u-radio :customStyle="{marginRight: '48rpx'}" v-for="(item, index) in radioList"
								:key="index" :label="item.name" :name="item.name" @change="radioChange"
								:activeColor="curTab==0?$theme.RISE:$theme.FALL" labelSize="28rpx"
								:labelColor="item.name==radiovalue1?curTab==0?$theme.RISE:$theme.FALL:'#CFCFCF' ">
							</u-radio>
						</u-radio-group>
					</view>

					<!-- 限价模式，输入金额 -->
					<template v-if="isShowAmountInput">
						<view style="margin:20rpx; ">
							<view class="common_input_wrapper"
								style="background-color:#1a1a1a;border-radius: 16rpx;height: 32rpx;padding-left: 20rpx;">
								<input v-model="amount" type="digit" :placeholder="$lang.COIN_BUY_TIP_ENTER_PRICE"
									:placeholder-style="$theme.setPlaceholder()" style="color: #fff;"></input>
							</view>
						</view>
					</template>
					<template v-else>
						<view style="margin:20rpx;">
							<template v-if="info">
								<view class="common_input_wrapper"
									style="background-color:#1a1a1a;border-radius: 16rpx;height: 32rpx;padding-left: 20rpx;"
									:style="{color:$theme.LOG_LABEL}">
									{{info.current_price}}
								</view>
							</template>
						</view>
					</template>

					<view style="margin:20rpx; ">
						<view class="common_input_wrapper"
							style="background-color:#1a1a1a;border-radius: 16rpx;height: 32rpx;padding-left: 20rpx;">
							<input v-model="quantity" type="digit" :placeholder="$lang.COIN_BUY_TIP_ENTER_QTY"
								:placeholder-style="$theme.setPlaceholder()" style="color: #fff;"></input>
						</view>
					</view>
					<template v-if="info">
						<view style="text-align: right;font-size: 24rpx;padding-right: 20rpx;line-height: 1.6;"
							:style="{color:$theme.LOG_LABEL}">
							{{$lang.COIN_BUY_BALANCE}}{{`: ${$util.formatNumber(userInfo.money)} ${curTab==0?'USDT':info.number_code}`}}
						</view>
						<view style="text-align: right;font-size: 24rpx;padding-right: 20rpx;line-height: 1.6;"
							:style="{color:$theme.LOG_LABEL}" v-if="curTab==0">
							{{$lang.COIN_BUY_MAX_QTY}} {{`: ${$util.formatNumber(curMaxQTY,4)} ${info.number_code}`}}
						</view>
					</template>

					<view
						style="display: flex;align-items: center;justify-content: space-between;margin:20rpx 20rpx;line-height: 1.8;">
						<view style="font-size: 24rpx;" :style="{color:$theme.LOG_LABEL}">
							{{$lang.COIN_BUY_TOTAL_AMOUNT}}
						</view>
						<view style="font-size: 26rpx;" :style="{color:$theme.LOG_VALUE}">
							{{totalAmount+` USDT`}}
						</view>
					</view>

					<view class="common_btn" style="margin:20rpx auto;width: 60%;padding: 12rpx;"
						:style="{backgroundColor:curTab==0?$theme.RISE:$theme.FALL}" @click="placeOrder()">
						{{tabs[curTab]}}
					</view>
				</view>
				<view style="flex:0 0 40%;">
					<template v-if="asks && asks.length>0">
						<view
							style="display: flex;align-items: center;justify-content: space-between;padding: 20rpx 20rpx 0 20rpx;">
							<view style="font-size: 24rpx;" :style="{color:$theme.LOG_LABEL}">
								{{$lang.COIN_BUY_TITLE_PRICE}}
							</view>
							<view style="font-size: 24rpx;" :style="{color:$theme.LOG_LABEL}">
								{{$lang.COIN_BUY_TITLE_QTY}}
							</view>
						</view>
						<AskList :list="asks" :max="asksMax"></AskList>
						<BidList :list="bids" :max="bidsMax" to="right"></BidList>
					</template>
				</view>
			</view>

			<view style="padding:0 36rpx;">
				<TitleSecond :title="$lang.COIN_RECORD_HISTORY">
					<view style="font-size: 13px;" @click="linkRecord()" :style="{color:$theme.SECOND}">
						{{$lang.COIN_TRADE_RECORD}}
						<view class="arrow rotate_45" :style="$theme.setImageSize(12)"></view>
					</view>
				</TitleSecond>
			</view>

			<HistoryRecord :code="code" ref="history"></HistoryRecord>

			<!-- Coin  選擇器 -->
			<u-picker :show="isShowCoinList" :columns="[coinList]" @change="changeCoin" @cancel="isShowCoinList=false"
				@confirm="confirmCoin" :cancelText="$lang.COMMON_CANCEL" :confirmText="$lang.COMMON_CONFIRM"
				:cancelColor="$theme.MODAL_CANCEL" :confirmColor="$theme.PRIMARY" keyName="label"
				visibleItemCount="9"></u-picker>
		</view>

	<!-- 	<FooterSmall code="position" /> -->
	</view>
</template>

<script>
	import HeaderSecond from '@/components/header/HeaderSecond.vue';
	import TitleSecond from '@/components/title/TitleSecond.vue';
	import HistoryRecord from './components/HistoryRecord.vue';
	export default {
		components: {
			HeaderSecond,
			TitleSecond,
			HistoryRecord,
		},
		data() {
			return {
				isAnimat: false, // 页面动画
				code: '', // url ?code=
				curTab: 0, // buy or sell
				asks: [],
				bids: [],
				asksMax: 0, // asks 當前最大數量
				bidsMax: 0, // bids 當前最大數量
				socket: null,
				isConnected: false, // 是否链接socket
				quantity: '', // 数量输入框 
				show: false,
				info: null,
				userInfo: {},
				radiovalue1: this.$lang.COIN_PRICE_TYPE_MARKET,
				amount: 1, // 限价模式 输入金额
				isShowCoinList: false, // 是否顯示 coin選擇器
				coinList: null, // coin 選項組
				isUpdate: true, // 强刷
			};
		},
		computed: {
			// header title
			setTitle() {
				if (this.info) {
					return this.info.name || '';
				}
			},
			tabs() {
				return [this.$lang.COIN_VIEW_BTN_BUY, this.$lang.COIN_VIEW_BTN_SELL]
			},

			// 单选项的选项组
			radioList() {
				return [{
					name: this.$lang.COIN_PRICE_TYPE_MARKET,
					disabled: false
				}, {
					name: this.$lang.COIN_PRICE_TYPE_LIMIT,
					disabled: false
				}];
			},
			// 当前交易模式
			isShowAmountInput() {
				return this.radiovalue1 == this.radioList[1].name;
			},
			// 當前最大可買或可買數量
			curMaxQTY() {
				// 市價模式： 餘額/單價。 限價模式：餘額/輸入值
				if (this.info) {
					const temp = this.isShowAmountInput ? this.amount : this.info.current_price;
					// console.log(`curMaxQty:`, temp);
					return temp * 1 > 0 ? this.userInfo.money / temp : '';
				}
			},
			// 计算总价
			totalAmount() {
				if (!this.info || isNaN(this.quantity) || this.quantity * 1 <= 0) {
					return 0;
				}
				// console.log(this.info.current_price);
				const temp = this.isShowAmountInput ? this.amount : this.info.current_price;
				const temmTotal = temp * 1 * this.quantity * 1;
				// console.log(`total amount:`, temmTotal);
				const result = temmTotal.toString().split('.')[1]?.length || 0;
				return result < 3 ? temmTotal : Number(temmTotal.toFixed(4));
			},
		},
		onLoad(opt) {
			console.log(opt);
			this.code = opt.code || 'btcusdt'; // 默認 pambusdt
			this.curTab = opt.tag || 0;
		},
		onShow() {
			this.isAnimat = true;
			if (this.socket) this.disconnect();
			this.getData();
			this.connect();
			if (this.$refs.history) this.$refs.history.getList();
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
			// 强刷的方案。
			refreshPage() {
				this.isUpdate = false;
				this.$nextTick(() => {
					this.isUpdate = true;
				})
			},
			actionEvent() {
				// 默认回退一级
				uni.navigateBack({
					delta: 1,
				})
			},
			// 選擇一種coin
			chooseCoin() {
				// 請求數據。
				this.getCoinList();
			},
			changeCoin(e) {
				console.log(`changeMode e:`, e);
			},
			// coin選擇器確認事件
			confirmCoin(e) {
				console.log(`confirmMode e:`, e);
				this.code = e.value[0].code;
				this.isShowCoinList = false;
				// 重置一些值
				this.quantity = '';
				this.getData();
			},
			// 在切換coin時，需請求列表，製作coin選擇器數組
			async getCoinList() {
				uni.showLoading({
					title: this.$lang.REQUEST_DATA,
					icon: 'loading'
				});
				const result = await this.$http.get(`api/goods/list`);
				if (!result) return false;
				console.log(result);
				this.coinList = Object.values(result).map(item => {
					return {
						label: item.name,
						code: item.code
					}
				});
				// 獲取數據之後，顯示選擇器
				this.isShowCoinList = true;
			},

			// 跳轉到 詳情頁面
			linkCoinInfo() {
				uni.navigateTo({
					url: this.$CONSTANTS.COIN_DETAIL + `?code=${this.code}`
				});
			},
			// 设置样式
			setStyle(val, w = 120) {
				const temp = this.curTab == 0 ? this.$theme.RISE : this.$theme.FALL;
				return {
					minWidth: `${w}rpx`,
					margin: '16rpx',
					padding: `12rpx 20rpx`,
					borderRadius: `16rpx`,
					textAlign: 'center',
					backgroundColor: val ? temp : '#F6F8FC',
					color: val ? '#FFFFFF' : '#666666',
					borderRadius: `44rpx`,
				}
			},
			changeTab(val) {
				this.curTab = val;
				this.getAccountAssets();
				// if (this.socket) this.disconnect();
				// this.getData();
			},
			linkRecord() {
				uni.navigateTo({
					url: this.$CONSTANTS.CION_RECORD + `?code=${this.code}`
				})
			},
			groupChange(n) {
				console.log('groupChange', n);
				this.radiovalue1 = n;
			},
			radioChange(n) {
				console.log('radioChange', n);
				this.radiovalue1 = n;
			},

			// 产品详情
			async getData() {
				if (this.socket) this.disconnect();
				uni.showLoading({
					title: this.$lang.REQUEST_DATA,
					icon: 'loading'
				});
				const result = await this.$http.post(`api/product/info`, {
					code: this.code,
				});
				if (!result) return false;
				console.log(`info:`, result);
				this.info = result[0];
				this.getDepthList();
				this.getAccountAssets();
				this.amount = this.info.current_price;
				this.refreshPage();
			},

			checkFrom() {
				if (this.quantity == '' || this.quantity <= 0) {
					uni.$u.toast(this.$lang.COIN_BUY_TIP_ENTER_QTY);
					return false;
				}
				const temp = this.quantity.toString();
				if (temp.includes('.')) {
					if (temp.split('.')[1].length > 4) {
						uni.$u.toast(this.$lang.COIN_BUY_TIP_ENTER_POINT);
						return false;
					}
				}

				if (this.isShowAmountInput) {
					if (this.amount == '' || this.amount <= 0) {
						uni.$u.toast(this.$lang.COIN_BUY_TIP_ENTER_PRICE);
						return false;
					}
				}
				// const temp1 = this.amount.toString();
				// if (temp1.includes('.')) {
				// 	if (temp1.split('.')[1].length > 4) {
				// 		uni.$u.toast(this.$lang.COIN_BUY_TIP_ENTER_POINT);
				// 		return false;
				// 	}
				// }

				return true;
			},

			// 買賣
			async placeOrder() {
				if (this.checkFrom()) {
					// const result = await uni.showModal({
					// 	title: '',
					// 	content: `${this.info.name} Quantity ${this.quantity}`,
					// 	cancelText: this.$lang.COIN_MODAL_CANCEL,
					// 	confirmText: this.$lang.COIN_MODAL_COMFIRM,
					// 	showCancel: true, // 是否显示取消按钮，默认为 true
					// 	confirmColor: this.$theme.SECOND,
					// 	cancelColor: this.$theme.MODAL_CANCEL,
					// });
					// if (result[1].confirm) {
					if (this.curTab == 0) {
						this.buy();
					} else if (this.curTab == 1) {
						this.sell();
					}
					// }
				}
			},
			async buy() {
				let formData = {
					num: this.quantity,
					gid: this.info.gid,
					fx: this.isShowAmountInput ? 2 : 1, // 1市价 2限价
				}
				if (this.isShowAmountInput) {
					formData.price = this.amount;
				}
				uni.showLoading({
					title: this.$lang.API_DATA_SUBMIT,
				});
				// product/purchase
				const result = await this.$http.post(`api/product/bi_buy`, formData);
				if (!result) return false;
				uni.showToast({
					title: result.message,
					icon: 'success'
				});
				this.quantity = '';
				setTimeout(() => {
					uni.navigateTo({
						url: this.$CONSTANTS.CION_RECORD + `?code=${this.code}`,
					});
				}, 1000)
			},

			async sell() {
				let formData = {
					num: this.quantity,
					code: this.info.code,
					fx: this.isShowAmountInput ? 2 : 1, // 1市价 2限价
				}
				if (this.isShowAmountInput) {
					formData.price = this.amount;
				}
				uni.showLoading({
					title: this.$lang.API_DATA_SUBMIT,
				});
				const result = await this.$http.post(`api/user/sell_bi`, formData);
				if (!result) return false;
				uni.showToast({
					title: result.message,
					icon: 'success'
				});
				this.quantity = '';
				setTimeout(() => {
					uni.navigateTo({
						url: this.$CONSTANTS.CION_RECORD + `?code=${this.code}`,
					});
				}, 1000)
			},

			// 获取账户 資產 信息 (每次切換買賣時，都調用一次該函數)
			async getAccountAssets() {
				const result = await this.$http.post(`api/user/assets`, {
					type: 2, // 資產賬戶
					name: this.curTab == 0 ? 'USDT' : this.info.number_code,
				});
				if (!result) return false;
				// console.log(`assets:`, result);
				this.userInfo = result[0];
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
							// this.reconnectWebSocket();
						}
					});

					this.socket.onError((err) => {
						console.log(`onError:`, err);
						this.isConnected = false;
						// this.reconnectWebSocket();
					});
					this.socket.onMessage((res) => {
						const data = JSON.parse(res.data);
						if (this.info && this.info.code == data.market && data.lastPrice > 0) {
							// console.log('data:', data);
							this.info.current_price = data.lastPrice || 0;
							this.info.rate = data.rate || 0;
							// this.info.rate_num = data.rate_num || 0;
							// this.info.vol = data.vol || 0;
						}
						// 當前買賣盤的數據
						if (this.info && this.info.code == data.market && data.type == "depth") {
							// 直接提取前五條，替換數據		
							const tempAsk = data.ask.slice(0, 5);
							const tempBid = data.bid.slice(0, 5);
							// console.log('data depth:', data);
							this.asks = tempAsk.map(item => [item.price, item.quantity]);
							this.bids = tempBid.map(item => [item.price, item.quantity]);
							// 當前數組中，數量最大值， *1.01(餘量，避免求出100%)
							this.asksMax = Math.max(...this.asks.map(item => item[1])) * 1.01;
							// 當前數組中，數量最大值， *1.01(餘量，避免求出100%)
							this.bidsMax = Math.max(...this.bids.map(item => item[1])) * 1.01;
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
		},
	}
</script>

<style lang="scss" scoped>
	.common_header {
		padding: 40rpx;
		display: flex;
		align-items: center;
		padding-top: 0px;

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
			flex: 1 1 auto;
			text-align: left;
		}
	}
</style>