<template>
	<view>

		<view class="block">
			<view class="head">
				<img @click="$u.route({type:'navigateBack'});" :src="$icon.zjt" class="back">
				<view class="title left_in" style="margin-left: 0px;">銘柄詳細</view>
				<view class="back"></view>
			</view>
		</view>

		<view>

			<template v-if="stockInfo">
				<view style="padding: 20px;">
					<view :style="{color:$theme.TITLE}">
						<view class="bold" :style="{color:$theme.LOG_VALUE}" style="font-size: 14px;">{{stockInfo.name}}
						</view>
					</view>
					<view class="flex" style="padding: 10px;font-size: 16px;">

						<view class="flex-1" :style="{color:$theme.LOG_LABEL}">
							{{stockInfo.code}}
						</view>

						<view class="flex-1" :style="$theme.setStockRiseFall(stockInfo.rate>0)">
							{{$util.formatMoney(stockInfo.current_price)}} {{` ${$lang.CURRENCY_UNIT}`}}
						</view>

						<view :style="$theme.setStockRiseFall(stockInfo.rate>0)">
							<image :src="`/static/arrow_${stockInfo.rate>0?'rise':'fall'}.png`" mode="aspectFit"
								:style="$theme.setImageSize(24)"></image>
							{{$util.formatMathABS(stockInfo.rate)}}%
						</view>
					</view>
				</view>


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
					<view class="text-center"
						style="background-color: #e4013e;padding:10px;border-radius: 10px;color: #fff; font-size: 16px;"
						@click="info_show=true">
						{{$lang.BTN_BUY}}
					</view>
				</view>
			</template>
		</view>


		<view class="u-drawer" style="z-index:100;" v-show="info_show">
			<view class="u-mask u-mask-zoom u-mask-show"
				style="background-color: rgba(0, 0, 0, 0.6); z-index: 10073; transition: 0.25s ease-in-out; transform: scale(1, 1);" @click="info_show=false">
			</view>
			<view class="u-drawer-content u-drawer-bottom u-drawer-content-visible"
				style="width: 100%; height: auto; transform: translate3d(0px, 100%, 0px); z-index: 10075; transition: 0.25s linear;">
				<uni-scroll-view class="u-drawer__scroll-view">
					<div class="uni-scroll-view">
						<div class="uni-scroll-view" style="overflow: hidden auto;">
							<div class="uni-scroll-view-content"><!---->
								<div class="minilayer-min">
									<div class="uni-title">{{stockInfo.name}}/{{stockInfo.code}}</div><!---->
									<div class="uni-content">
										<div class="uni-content-tit">指値価格</div>
										<div class="uni-content-tit">{{$util.formatMoney(stockInfo.current_price)}}
										</div>
									</div>
									<div class="uni-content">
										<div class="uni-content-tit">株数</div>
										<div class="uni-content-tit">{{quantity}}</div>
									</div>
									<div class="uni-content">
										<div class="uni-content-tit">複数のレバレッジ</div>
										<div class="uni-content-tit">1</div>
									</div>
									<div class="uni-content">
										<div class="uni-content-tit">金額</div>
										<div class="uni-content-tit">{{$util.formatMoney(stockInfo.current_price*curQuantity/curLever)}}</div>
									</div>
									<div class="uni-content">
										<div class="uni-content-tit">現在価格</div>
										<div class="uni-content-tit">{{$util.formatMoney(stockInfo.current_price)}}</div>
									</div>
									<div class="uni-content">
										<div class="uni-content-tit">手数料</div>
										<div class="uni-content-tit">{{$util.formatMoney(stockInfo.current_price*curQuantity/curLever*fee)}}</div>
									</div>
									<div class="uni-content">
										<div class="uni-content-tit">合計</div>
										<div class="uni-content-tit">{{$util.formatMoney(stockInfo.current_price*curQuantity/curLever*1+stockInfo.current_price*curQuantity/curLever*fee*1)}}</div>
									</div>
									<div class="uni-content">
										<div class="uni-content-tit">買付余力</div>
										<div class="uni-content-tit">{{$util.formatMoney(userInfo.money)}}</div>
									</div>
									<div class="uni-btn" @click="placeOrder()">送信</div>
								</div>
							</div>
						</div>
					</div>
				</uni-scroll-view>
				<view class="u-close u-close--top-right"></view>
			</view>
		</view>

	</view>
</template>

<script>
	import HeaderSecond from '@/components/header/HeaderSecond.vue';
	import CustomTitle from '@/components/CustomTitle.vue';
	import CardItemPrimary from '@/components/card/CardItemPrimary.vue';
	import CustomLogo from '@/components/CustomLogo.vue';
	export default {
		components: {
			HeaderSecond,
			CustomTitle,
			CardItemPrimary,
			CustomLogo,
		},
		data() {
			return {
				info_show: false,
				isAnimat: false, // 页面动画
				showAmount: false, // 显示金额
				hideAmount: '******', // 隐藏金额
				quantityList: [100, 300, 500, 1000, 2500, 5000], // 预置数量
				curQuantity: 100, // 当前选中预置数量
				quantity: 100, // 数量输入框 
				leverList: [], // 杠杆值数组
				curLever: 1, // 当前选中杠杆值
				show: false,
				stockInfo: null,
				userInfo: {},
				fee: 1, // 手续费
				cardData: {}, // 资产信息
				code: '', // url上的code
				socket: null,
			};
		},
		computed: {
			cardLabels() {
				return [this.$lang.ACCOUNT_AMOUNT_AVAILABLE,
					this.$lang.ACCOUNT_COLD_AMOUNT,
					this.$lang.ACCOUNT_AMOUNT_TOTAL
				];
			},
		},
		onLoad(option) {
			this.code = option.code || '';
			this.getConfig();
			this.getStockDetail();
			this.getAccountInfo();
		},
		onShow() {
			this.isAnimat = true;
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
			// 		// console.log(data);


			// 		if (that.productDetails) {
			// 			if (that.productDetails.stock_id == data.pid) {

			// 				let current_price = data.last.replace(",", '')
			// 				// current_price=current_price.replace("+",'')

			// 				that.productDetails.current_price = current_price;
			// 				let rate = data.pcp.replace("+", '')
			// 				rate = rate.replace("%", '')

			// 				that.productDetails.rate = rate;

			// 				that.productDetails.rate_num = data.pc;

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
					this.socket = null;
				}
			},
			// 总资产显隐控制
			handleShowAmount() {
				this.showAmount = !this.showAmount;
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
			setStyle(val) {
				return {
					backgroundColor: val ? '#e4013e' : '',
					color: val ? '#FFFFFF' : this.$theme.PRIMARY,
					border: `1px solid ${val? this.$theme.TRANSPARENT:'#f96643'}`,
				}
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

			// 产品详情
			async getStockDetail() {
				const result = await this.$http.get(`api/product/info`, {
					code: this.code,
				})
				console.log(`stock info:`, result);
				if (!result) return false;
				this.stockInfo = result[0];
				this.connect();
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
				this.cardData = {
					value1: this.userInfo.money, // 可提
					value2: this.userInfo.freeze, // 冻结
					value3: this.userInfo.totalZichan, // 总资产
				};
				if (this.userInfo.ganggan) {
					this.leverList = this.$util.leverList(this.userInfo.ganggan);
				}
			},
		},
	}
</script>
<style type="text/css">
	@charset "UTF-8";

	/* uni.scss */
	.u-drawer {
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden
	}

	.u-drawer-content {
		display: block;
		position: absolute;
		z-index: 1003;
		-webkit-transition: all .25s linear;
		transition: all .25s linear
	}

	.u-drawer__scroll-view {
		width: 100%;
		height: 100%
	}

	.u-drawer-left {
		top: 0;
		bottom: 0;
		left: 0;
		background-color: #fff
	}

	.u-drawer-right {
		right: 0;
		top: 0;
		bottom: 0;
		background-color: #fff
	}

	.u-drawer-top {
		top: 0;
		left: 0;
		right: 0;
		background-color: #fff
	}

	.u-drawer-bottom {
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff
	}

	.u-drawer-center {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-webkit-flex-direction: row;
		flex-direction: row;
		flex-direction: column;
		bottom: 0;
		left: 0;
		right: 0;
		top: 0;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		opacity: 0;
		z-index: 99999
	}

	.u-mode-center-box {
		min-width: 52px;
		min-height: 52px;
		display: block;
		position: relative;
		background-color: #fff
	}

	.u-drawer-content-visible.u-drawer-center {
		-webkit-transform: scale(1);
		transform: scale(1);
		opacity: 1
	}

	.u-animation-zoom {
		-webkit-transform: scale(1.15);
		transform: scale(1.15)
	}

	.u-drawer-content-visible {
		-webkit-transform: translate3D(0px, 0px, 0px) !important;
		transform: translate3D(0px, 0px, 0px) !important
	}

	.u-close {
		position: absolute;
		z-index: 3
	}

	.u-close--top-left {
		top: 15px;
		left: 15px
	}

	.u-close--top-right {
		top: 15px;
		right: 15px
	}

	.u-close--bottom-left {
		bottom: 15px;
		left: 15px
	}

	.u-close--bottom-right {
		right: 15px;
		bottom: 15px
	}


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


	/* uni.scss */
	.u-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		-webkit-transition: -webkit-transform .3s;
		transition: -webkit-transform .3s;
		transition: transform .3s;
		transition: transform .3s, -webkit-transform .3s
	}

	.u-mask-show {
		opacity: 1
	}

	.u-mask-zoom {
		-webkit-transform: scale(1.2);
		transform: scale(1.2)
	}
</style>