<template>
	<view :class="isAnimat?'fade_in':'fade_out'">
		<view>
			<view class="flex" style="padding:30px  20px;">
				<view class="flex-1" style="background-color: #fff;border-radius: 20px;padding: 5px 10px;">
					<view class="flex" @click="shouye()">
						<image src="/static/search_dark.png" mode="widthFix" style="width: 15px;"></image>
						<view style="margin-left: 5px;font-size: 10px;color: #999;">銘柄名/コードを入力してください</view>
					</view>
					
				</view>
				<view>
					<image src="/static/service.png" mode="widthFix" style="width: 25px;margin-left: 20px;" @click="kefu()"></image>
				</view>
			</view>

			<view style="position: relative;margin-top: -10px;">
				<view style="display: flex;align-items: center;width: 95%;margin-left: 10px;">
					<image src="/static/sytongqian.png" mode="heightFix" :style="$theme.setImageSize(300,300)">
					</image>
				</view>
				<view class="flex" style="position: absolute;bottom: 75%;left: 25px;width: 90%;">
					<view class="bold" style="font-size: 16px;">
						{{$lang.ACCOUNT_AMOUNT_AVAILABLE}}
					</view>
					<view style="width: 65%;justify-content: flex-end; display: flex;" @click.stop="handleShowAmount">
						<image mode="aspectFit" :src="`/static/${showAmount?'zhenyan':'yanjin'}.png`"
							:style="$theme.setImageSize(40)">
						</image>
					</view>
				</view>

				<view style="font-weight: 500;position: absolute;bottom: 46%;left: 25px;width: 90%;color: #f25049;">

					<view class="flex">
						<view style="font-size: 50rpx;font-weight: 700;color: #f3c193;">
							{{showAmount?$util.formatMoney(available):hideAmount}}
						</view>
						<!-- <view class="bold" style="margin-left: 5px;font-size: 35rpx;color: #000;">JPY</view> -->
					</view>
					<!-- <view class="flex">
						<view style="font-size: 32rpx;font-weight: 700;line-height: 1;color: #f0a03a;">
							{{showAmount?$util.formatMoney(userInfo.usd):hideAmount}}
						</view>
						<view class="bold" style="margin-left: 5px;font-size: 12px;color: #000;">USD</view>
					</view> -->
				</view>

				<view class="justify-center flex"
					style="font-weight: 500;position: absolute;bottom: 10%;left: 25px;width: 90%;color: #fff;">
					<view style="background-color: #f2bb8f;padding: 5px 40px;border-radius: 30px;font-size: 18px;"
						@click="linkWithdraw()">
						{{$lang.WITHDRAW_TITLE}}
					</view>
					<view style="width: 50px;">.</view>
					<view style="background-color: #f0a039;padding: 5px 40px;border-radius: 30px;font-size: 18px;"
						@click="linkDeposit()">
						{{$lang.DEPOSIT_TITLE}}
					</view>

				</view>
			</view>
		</view>

		<view style="">
			<template v-if="userInfo">
				<AccountTradeInfo :info="userInfo"></AccountTradeInfo>
			</template>
		</view>


		<view style="border-radius:16rpx;width: 95%;margin-left: 10px;">
			<TabsSeventh :tabs="tabs" @action="changeTab" :acitve="curTab"> </TabsSeventh>
			<view style="min-height: 80vh;padding-bottom: 200rpx;">
				<template v-if="!list || list.length<=0">
					<EmptyData></EmptyData>
				</template>

				<template v-else>
					<block v-for="(item,index) in list" :key="index">
						<view style="padding: 5px 0px;">
						<view class="" style="padding:20rpx;border-radius: 8px;border: 1px #f2bd8f solid;"
							@tap="handleShowModal(item)">
							<view style="display: flex;align-items: center;justify-content: space-between;">
								<view class="bold"
									style="font-size: 36rpx;line-height: 1.6;width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
									{{item.name}}
								</view>
								<view>
									<view style="font-size: 10px;" :style="{color:$theme.LOG_LABEL}">
										利益総額
									</view>
									<template v-if="item.status==1">
										<view class="bold" style="font-size: 18px;"
											:style="{color:$theme.setStockRiseFall(item.buyProfitRate*1>0)}">
											{{$util.formatMoney(item.buyProfit*1)+` ${$lang.CURRENCY_UNIT}`}}
										</view>
									</template>
									<template v-if="item.status==2">
										<view class="bold" style="font-size: 18px;"
											:style="{color:$theme.setStockRiseFall(item.sellProfitRate*1>0)}">
											{{$util.formatMoney(item.sellProfit*1)+` ${$lang.CURRENCY_UNIT}`}}
										</view>
									</template>
								</view>
							</view>

							<!-- <view :style="item.typeId==1?'background-color:antiquewhite;':'background-color: aqua;'"
								style="width: 10%;text-align: center;font-size: 12px;" class="padding-5 ">
								{{item.typeId==1?'JPY':'USD'}}
							</view> -->
                            <view class="flex" style="justify-content: space-between; ">
							<view
								style="align-items: center;padding-top: 10rpx;">
								<view :style="{color:$theme.LOG_LABEL}">購入数量</view>
								<text :style="{color:$theme.LOG_VALUE}">
									{{$util.formatNumber(item.buyQTY)+` ${$lang.QUANTITY_UNIT}`}}
								</text>
							</view>

							<view
								style="padding-top: 10rpx;">
								<view :style="{color:$theme.LOG_LABEL}">購入総額</view>
								<text :style="{color:$theme.LOG_VALUE}">
									{{$util.formatMoney(item.total)+` ${$lang.CURRENCY_UNIT}`}}</text>
							</view>
							<view
								style="align-items: center;justify-content: space-between;">
								<view :style="{color:$theme.LOG_LABEL}">利益率</view>
								<template v-if="item.status==1">
									<view :style="{color:$theme.setStockRiseFall(item.buyProfitRate*1>0)}">
										{{$util.formatNumber(item.buyProfitRate,2)}}%
									</view>
								</template>
								<template v-if="item.status==2">
									<view :style="{color:$theme.setStockRiseFall(item.sellProfitRate*1>0)}">
										{{$util.formatNumber(item.sellProfitRate,2)}}%
									</view>
								</template>
							</view>
							</view>
							
							
							
							<view class="flex" style="justify-content: space-between; ">
								<view
									style="align-items: center;justify-content: space-between;padding-top: 10rpx;">
									<view :style="{color:$theme.LOG_LABEL}">購入価格</view>
									<text :style="{color:$theme.LOG_VALUE}">
										{{$util.formatMoney(item.buyPrice)+` ${$lang.CURRENCY_UNIT}`}}</text>
								</view>
								
								<view
									style="align-items: center;justify-content: space-between;padding-top: 10rpx;">
									<view :style="{color:$theme.LOG_LABEL}">{{item.status==2?'販売価格':'最新価格'}}</view>
									<template v-if="item.status==1">
										<text :style="{color:$theme.LOG_VALUE}">
											{{$util.formatMoney(item.currentPrice)+` ${$lang.CURRENCY_UNIT}`}}</text>
									</template>
									<template v-if="item.status==2">
										<text :style="{color:$theme.LOG_VALUE}">
											{{$util.formatMoney(item.sellPrice)+` ${$lang.CURRENCY_UNIT}`}}</text>
									</template>
								</view>
							</view>

							<view
								style="display: flex;align-items: center;justify-content: space-between;padding-top: 10rpx;">
								<view :style="{color:$theme.LOG_LABEL}">
									{{item.status==2?'販売時間':'購入時間'}}
								</view>
								<text :style="{color:$theme.LOG_VALUE}">
									{{item.status==2?item.sellCT:item.buyCT}}
								</text>
							</view>
						</view>
						</view>
					</block>
				</template>
			</view>
		</view>

		<template v-if="isShow">
			<view class="common_mask" @click="handleClose()"></view>
			<view class="common_popup" style="min-height:55vh;padding-bottom: 80rpx;width: 95%;border-radius: 10px;">
				<view class="" style="display: flex;align-items: center;margin-right: 20px;margin-top: 20px;">
					<view class="flex-1">
						<text class="bold" style="font-size: 36rpx;padding: 0px 20px;">{{detail.name}}</text>
						<view style="padding: 0px 40px;">{{detail.code}}</view>
					</view>
					<image src="/static/close.png" :style="$theme.setImageSize(20)" @click="handleClose()"></image>
				</view>

				<view style="width: 95%;border-radius: 10px;margin-left: 10px;">
					<view class="item" style="margin-top: 20px;">
						<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_MODAL_BUY_TIME}}</view>
						<view :style="{color:$theme.LOG_VALUE}">{{detail.buyCT}}</view>
					</view>
					<template v-if="detail.status==2">
						<view class="item">
							<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_MODAL_SELL_TIME}}
							</view>
							<view :style="{color:$theme.LOG_VALUE}"> {{detail.sellCT}} </view>
						</view>
					</template>
					<view class="item">
						<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_MODAL_FLOAT_PROFIT}}
						</view>
						<view :style="{color:$theme.LOG_VALUE}">
							{{$util.formatMoney(detail.status==2?detail.sellFloatProfit: detail.buyFloatProfit)+` ${$lang.CURRENCY_UNIT}`}}
						</view>
					</view>
					<view class="item">
						<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_MODAL_LEVER}}
						</view>
						<view :style="{color:$theme.LOG_VALUE}">
							x {{detail.lever}}
						</view>
					</view>

					<view class="item">
						<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_MODAL_PROFIT}}
						</view>
						<view :style="{color:$theme.LOG_VALUE}">
							{{$util.formatMoney(detail.status==2?detail.sellProfit: detail.buyProfit)+` ${$lang.CURRENCY_UNIT}`}}
						</view>
					</view>
					<view class="item">
						<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_MODAL_BUY_PRICE}}
						</view>
						<view :style="{color:$theme.LOG_VALUE}">
							{{$util.formatMoney(detail.buyPrice)+` ${$lang.CURRENCY_UNIT}`}}
						</view>
					</view>

					<view class="item">
						<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_MODAL_BUY_QTY}}
						</view>
						<view :style="{color:$theme.LOG_VALUE}">
							{{$util.formatNumber(detail.buyQTY)+` ${$lang.QUANTITY_UNIT}`}}
						</view>

					</view>
					<view class="item">
						<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_MODAL_FEE}}
						</view>
						<view :style="{color:$theme.LOG_VALUE}">
							{{$util.formatMoney(detail.status==2?detail.sellFee: detail.buyFee)+` ${$lang.CURRENCY_UNIT}`}}
						</view>
					</view>
					<view class="item">
						<view style="flex: 30%;" :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_MODAL_BUY_AMOUNT}}
						</view>
						<view :style="{color:$theme.LOG_VALUE}">
							{{$util.formatMoney(detail.buyAmont)+` ${$lang.CURRENCY_UNIT}`}}
						</view>
					</view>

				</view>
				<template v-if="detail.status==1">
					<view style="display: flex;justify-content: space-between;margin:30rpx 70rpx;">
						<view class=""
							style="background-color: #09d2a0;border-radius: 30px;padding: 10px 45px;color: #fff;"
							@tap="linkStockInfo(detail.code)">
							{{$lang.BTN_DETAIL}}
						</view>
						<view class=""
							style="background-color: #f2bb8f;border-radius: 30px;padding: 10px 50px;color: #fff;"
							@tap.stop="handleSell(detail.id)">
							{{$lang.BTN_SELL}}
						</view>
					</view>
				</template>
			</view>
		</template>

	</view>
</template>

<script>
	import HeaderPrimary from '@/components/header/HeaderPrimary.vue';
	import TabsSeventh from '@/components/tabs/TabsSeventh.vue';
	import TitlePrimary from '@/components/title/TitlePrimary.vue';
	import AccountTradeInfo from './components/AccountTradeInfo.vue';
	import EmptyData from '@/components/EmptyData.vue';
	export default {
		components: {
			HeaderPrimary,
			TabsSeventh,
			TitlePrimary,
			AccountTradeInfo,
			EmptyData,
		},
		data() {
			return {
				isAnimat: false, // 页面动画
				curTab: 0, // 
				showAmount: false, // 显示金额
				hideAmount: '******', // 隐藏金额
				usd: '',
				available: '', // 可用額
				userInfo: null,
				list: [], // 

				curPage: 1, // 当前页码
				maxPage: 1, // 最大页码
				isShow: false, // 是否显示弹层
				detail: null, // 单条数据详情
				// isClose:false, // 
			}
		},
		computed: {
			tabs() {
				return [
					this.$lang.TRADE_HOLD_LIST,
					this.$lang.TRADE_HISTORY_LIST,
				]
			},
			// 切换tab的动效
			setClass() {
				return this.curTab % 2 === 0 ? 'right_in' : 'left_in'
			},
		},

		onLoad() {},
		onShow() {
			this.getAccountInfo();
			this.isAnimat = true;
			this.changeTab(this.curTab);
		},
		onHide() {
			this.isAnimat = false;
		},
		// 觸底加載
		onReachBottom() {
			console.log(`onReachBottom`)
			if (this.curPage < this.maxPage) {
				this.curPage++;
				this.getList();
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			this.getAccountInfo();
			this.curPage = 1;
			this.list = [];
			this.getList();
			uni.stopPullDownRefresh();
		},

		methods: {
			// tab切换
			changeTab(val) {
				console.log(val)
				this.curTab = val;
				this.curPage = 1;
				this.list = [];
				this.getList();
			},
			handleShowModal(item) {
				this.isShow = true;
				uni.hideTabBar(); // 隐藏tabBar
				this.detail = item;
				console.log(this.detail);

			},
			// 关闭弹层
			handleClose() {
				this.isShow = false;
				uni.showTabBar(); // 显示tabBar	
				// this.curPage = 1;
				// this.list = [];
				// this.getList();
			},
			// 跳转到股票详情
			linkStockInfo(code) {
				uni.navigateTo({
					url: `${this.$paths.STOCK_OVERVIEW}?code=${code}`
				});
			},
			// 平仓/卖出
			async handleSell(id) {
				const result = await uni.showModal({
					title: this.$lang.SELL_TIP,
					cancelText: this.$lang.BTN_CANCEL,
					confirmText: this.$lang.BTN_CONFIRM,
					confirmColor: this.$theme.PRIMARY,
					cancelColor: '#999999',
				});
				console.log('异步弹层:', result);
				if (result[1].confirm) {
					this.confirmSell(id);
				}
			},
			// 平仓功能
			async confirmSell(id) {
				const result = await this.$http.post(`api/user/sell`, {
					id
				});
				console.log(result);
				this.isShow = false;
				uni.showTabBar(); // 显示tabBar	
				this.curPage = 1;
				this.list = [];
				this.curTab = 1;
				this.changeTab(this.curTab);
			},

			// 获取持有及历史数据
			async getList() {
				console.log(`curPage:`, this.curPage);
				const result = await this.$http.post(`api/user/order`, {
					page: this.curPage,
					status: this.curTab + 1, // 1持仓，2历史
					gp_index: 0,
				});
				if (!result) return false;
				console.log(`sell result:`, result);
				this.maxPage = result.last_page; // 記錄最大頁碼
				let filterData = [];
				if (this.curTab == 0) {
					filterData = result.data.filter(item => item.goods_info && item.order_buy);
				} else if (this.curTab == 1) {
					filterData = result.data.filter(item => item.goods_info && item.order_buy && item.order_sell);
				}
				console.log(`filterData`, filterData);
				const temp = filterData.map(item => {
					return {
						id: item.id,
						typeId: item.goods_info.project_type_id,
						code: item.goods_info.number_code,
						status: item.status, // 1买 2卖
						name: item.goods_info.name, // 名称
						// 持仓盈利率 =（最终价 - 买入价） / 买入价 *100%
						buyProfitRate: (item.goods_info.current_price * 1 - item.order_buy.price * 1) /
							(item.order_buy.price * 1) * 100,
						// 卖出盈利率计算： 盈利比=（卖出价 - 买入价） / 买入价 *100% 
						sellProfitRate: item.status == 2 ? (item.order_sell.price * 1 - item.order_buy
							.price * 1) / item.order_buy.price * 100 : '',
						buyPrice: item.order_buy.price, // 买入价
						sellPrice: item.status == 2 ? item.order_sell.price : '', // 卖出价
						currentPrice: item.goods_info.current_price, // 最新价
						buyQTY: item.order_buy.num, // 买入数量
						sellQTY: item.status == 2 ? item.order_sell.num : '', // 卖出数量
						buyProfit: item.order_buy.yingkui, // 买入盈亏额
						sellProfit: item.status == 2 ? item.order_sell.yingkui : '', // 卖出盈亏额
						buyAmont: item.order_buy.amount,
						lastPrice: item.goods_info.last_price,
						total: item.order_buy.num * 1 * (item.order_buy.price * 1), // 个股买入总金额 
						buyFee: item.order_buy.buy_fee, // 买入手续费
						sellFee: item.status == 2 ? item.order_sell.fee : '', // 卖出手续费
						lever: item.order_buy.double, // 杠杆
						buyCT: item.order_buy.created_at, // 买入时间
						sellCT: item.status == 2 ? item.order_sell.created_at : '', // 卖出时间
						buyFloatProfit: item.order_buy.float_yingkui * 1, // 买入浮动盈亏
						// 卖出浮动盈亏
						sellFloatProfit: item.status == 2 ? item.order_sell.float_yingkui * 1 : '',
					}
				});
				if (this.list.length > 0) {
					this.list.push(...temp);
				} else {
					this.list = temp;
				}
				console.log(this.list, this.list.length);
			},

			// 总资产显隐控制
			handleShowAmount() {
				this.showAmount = !this.showAmount;
			},
			// 提款
			linkWithdraw() {
				uni.navigateTo({
					url: this.$paths.ACCOUNT_WITHDRAW
				})
			},
			linkDeposit() {
				uni.navigateTo({
					url: this.$paths.ACCOUNT_DEPOSIT
				})
			},
			linkSearch() {
				uni.navigateTo({
					url: this.$paths.SEARCH
				})
			},
			linkService() {
				this.$util.linkCustomerService();
			},

			// 设置样式
			setStyle(val, w = 120) {
				return {
					width: `${w}rpx`,
					padding: `12rpx 32rpx`,
					color: val ? this.$theme.SECOND : '#CBCBCB',
					textAlign: 'center',
					fontSize: `36rpx`,
					fontWeight: `700`,
					borderBottom: `4rpx solid ${val? this.$theme.SECOND :this.$theme.TRANSPARENT }`
				}
			},

			// available
			async getAccountInfo() {
				// uni.showLoading({
				// 	title: this.$lang.API_GET_ACCOUNT_INFO,
				// })
				const result = await this.$http.get(`api/user/info`);
				if (!result) return false;
				console.log(`result info:`, result);
				this.userInfo = result;
				this.available = !result.money ? 0 : result.money * 1; // 可提
			},
		},
	}
</script>


<style lang="scss" scoped>
	.header_bg {
		background-image: url(/static/bg_1.png);
		background-position: center center;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 100%;
		height: 500rpx;
		position: relative;
	}

	.common_header {
		padding: 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 30px;

		/* background-image: linear-gradient(180deg, #F5B71C, transparent); */
		.left {
			margin-right: auto;
		}

		.right {
			margin-left: auto;
		}

		.center {
			color: #FFFFFF;
			font-size: 36rpx;
			font-weight: 700;
			// flex: 70%;
			text-align: center;
		}
	}

	.item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12rpx;
		margin: 0 20rpx;
		line-height: 1.8;
	}
</style>