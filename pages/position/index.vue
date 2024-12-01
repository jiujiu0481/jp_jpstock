<template>
	<view :class="isAnimat?'fade_in':'fade_out'" class="page_bg">
		<CustomHeader />
		<view class="page">
			<view class="page-card" style="background-image: url(/static/center_backimg.png);	background-position: 0 0 ;background-repeat: no-repeat;
						background-size:120%;width: 100%;height:auto;">
				<view class="top">
					<view class="top-left">
						<view class="top-left-top">残高
							<img :src="showAmount?$icon.yanjing:$icon.biyan" @click="showAmount=!showAmount">
						</view>
						<view class="top-left-foot">{{showAmount?$util.formatMoney(userInfo.totalZichan):hideAmount}}
						</view>
					</view>
					<view class="top-right">
						<view class="top-chart" v-if="curTab==1">
							<qiun-data-charts type="pie" :opts="$icon.opts" :chartData="chartData" />
						</view>
						<view class="top-chart" v-if="curTab==2">
							<qiun-data-charts type="pie" :opts="$icon.opts" :chartData="chartData1" />
						</view>
						<view class="top-mask"></view>
					</view>
				</view>

				<view class="foot">
					<view class="foot-item" v-if="curTab==1">
						<view class="foot-left"><span class="foot-ball color1"></span>損益総額</view>
						<view class="foot-right">{{showAmount?$util.formatMoney(userInfo.holdYingli):hideAmount}}
						</view>
					</view>
					<view class="foot-item" v-if="curTab==1">
						<view class="foot-left"><span class="foot-ball color2"></span>時価総額</view>
						<view class="foot-right">{{showAmount?$util.formatMoney(userInfo.frozen):hideAmount}}</view>
					</view>

					<view class="foot-item" v-if="curTab==2">
						<view class="foot-left"><span class="foot-ball color1"></span>売却損益</view>
						<view class="foot-right">{{showAmount?$util.formatMoney(userInfo.totalYingli):hideAmount}}
						</view>
					</view>
					<view class="foot-item" v-if="curTab==2">
						<view class="foot-left"><span class="foot-ball color2"></span>売り市場価格</view>
						<view class="foot-right">{{showAmount?$util.formatMoney(userInfo.Sellamount):hideAmount}}
						</view>
					</view>


					<view class="foot-item">
						<view class="foot-left"><span class="foot-ball color3"></span>買付余力</view>
						<view class="foot-right">
							{{showAmount?$util.formatMoney(userInfo.money):hideAmount}}
						</view>
					</view>
				</view>

			</view>



			<view style="display: flex;flex: 1;align-items: center;justify-content: space-between;">
				<view
					style=" box-shadow: 0 0 4px #AAA; background-image: linear-gradient(#ffdfdf ,#FFFFFF);    display: flex;align-items: center;justify-content: center;    border-radius: 6px;padding: 10px 18px;margin: 10px 10px 10px 20px;font-size: 12px;width: 100px;"
					@click="linkDeposit">
					<image src="/static/deposit.png" mode="aspectFit" style="width:  30px;height: 30px;"></image>
					<view style="margin-left: 30px;font-size: 14px;">入金</view>
				</view>
				<view
					style=" box-shadow: 0 0 4px #AAA; background-image: linear-gradient(#dfe5ff ,#FFFFFF);    display: flex;align-items: center;justify-content: center;border-radius: 6px;padding: 10px 18px;margin: 10px 20x 10px  10px;margin-right: 20px;  font-size: 12px;width: 100px;"
					@click="linkWithdraw">
					<image src="/static/withdraw.png" mode="aspectFit" style="width: 30px;height: 30px;"></image>
					<view style="margin-left: 30px;font-size: 14px;">出金</view>
				</view>
			</view>



			<TabsThird :tabs="tabs" @action="changeTab" :acitve="curTab"> </TabsThird>

			<view class="abox">
				<view class="abox-list" v-for="(item,index) in list" :key="index">
					<view class="abox-title gap5">
						<view class="abox-name">{{item.name}}<span>{{item.code}}</span></view>
						<view class="abox-have" v-if="item.status==1">保有中</view>
						<view class="abox-not" v-if="item.status==2">決済済み</view>
					</view>
					<view class="abox-foot"
						style="background-image: url(/static/sakura.png); background-position:top  right; background-repeat: no-repeat; background-size: 40%;">
						<view class="foot-item">
							<view class="abox-foot-title">購入記録</view>
							<view class="abox-foot-list">
								購入株数<span>{{$util.formatNumber(item.buyQTY)}}</span></view>
							<view class="abox-foot-list">購入価格<span>{{$util.formatMoney(item.buyPrice)}}</span></view>
							<view class="abox-foot-list">手数料<span>{{item.status==2?item.sellFee:item.buyFee}}</span>
							</view>
							<view class="abox-foot-list">購入総額<span>{{$util.formatMoney(item.total)}}</span></view>
							<view class="abox-foot-list">
								{{item.status==2?'販売時間':'購入時間'}}<span>{{item.status==2?item.sellCT:item.buyCT}}</span>
							</view>
						</view>
						<view class="foot-item" v-if="item.status==1">
							<view class="abox-foot-title">最新の記録</view>
							<view class="abox-foot-list">
								ロット数<span class="red">{{$util.formatNumber(item.buyQTY/100)}}</span>
							</view>
							<view class="abox-foot-list">最新価格<span
									class="red">{{$util.formatMoney(item.currentPrice,2)}}</span></view>
							<view class="abox-foot-list">最近の変動率<span
									class="red">{{$util.formatMoney(item.buyProfitRate,2)}}%</span></view>
							<view class="abox-foot-list">最新の市場価格<span
									class="red">{{$util.formatMoney(item.currentPrice*1*item.buyQTY,2)}}</span></view>
							<view class="abox-foot-list">最新の利益<span
									class="red">{{$util.formatMoney(item.buyProfit*1)}}</span></view>
						</view>

						<view class="foot-item" v-if="item.status==2">
							<view class="abox-foot-title">最新の記録</view>
							<view class="abox-foot-list">
								ロット数<span class="red">{{$util.formatNumber(item.buyQTY/100)}}</span>
							</view>
							<view class="abox-foot-list">売却価格<span
									class="red">{{$util.formatMoney(item.sellPrice)}}</span></view>
							<view class="abox-foot-list">売却時の変動<span
									class="red">{{$util.formatMoney(item.sellProfitRate,2)}}%</span></view>
							<view class="abox-foot-list">売却時価総額<span
									class="red">{{$util.formatMoney(item.sellAmont)}}</span></view>
							<view class="abox-foot-list">売却利益<span
									class="red">{{$util.formatMoney(item.sellProfit*1)}}</span></view>
						</view>

					</view>
					<view class="abox-bottom">
						<view class="btn1" @click="info_link(item)" v-if="item.status==1">保有詳細</view>
						<view class="btn2" @tap="handleSell(item.id)" v-if="item.status==1">売却</view>
					</view>
				</view>
			</view>
		</view>



	</view>
</template>

<script>
	import HeaderPrimary from '@/components/header/HeaderPrimary.vue';
	import TabsThird from '@/components/tabs/TabsThird.vue';
	import TitlePrimary from '@/components/title/TitlePrimary.vue';
	import AccountTradeInfo from './components/AccountTradeInfo.vue';
	import EmptyData from '@/components/EmptyData.vue';
	export default {
		components: {
			HeaderPrimary,
			TabsThird,
			TitlePrimary,
			AccountTradeInfo,
			EmptyData,
		},
		data() {
			return {
				isAnimat: false, // 页面动画
				curTab: 1, // 
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
				chartData: "",
				chartData1: "",
				// isClose:false, // 
			}
		},

		computed: {
			tabs() {
				return [
					'購入申込',
					'進行中',
					'終了',
				]
			},
			// 切换tab的动效
			setClass() {
				return this.curTab % 2 === 0 ? 'right_in' : 'left_in'
			},
		},

		onLoad() {

		},
		onShow() {
			this.getAccountInfo();
			this.isAnimat = true;
			this.changeTab(this.curTab);
		},
		onHide() {
			this.isAnimat = false;
		},


		// 提款
		linkWithdraw() {
			uni.navigateTo({
				url: this.$paths.ACCOUNT_WITHDRAW
			})
		},
		// 存金
		linkDeposit() {
			uni.navigateTo({
				url: this.$paths.ACCOUNT_DEPOSIT
			})
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

			info_link(val) {

				let arrayString = JSON.stringify(val);
				uni.navigateTo({
					url: "/pages/position/info?data=" + encodeURIComponent(arrayString)
				})
			},
			// tab切换
			changeTab(val) {
				console.log(val)

				this.curTab = val;
				this.curPage = 1;
				this.list = [];
				if (val == 0) {
					return
				}
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
				this.curTab = 2;
				this.changeTab(this.curTab);
			},

			// 获取持有及历史数据
			async getList() {
				console.log(`curPage:`, this.curPage);
				const result = await this.$http.post(`api/user/order`, {
					page: this.curPage,
					status: this.curTab, // 1持仓，2历史
					gp_index: 0,
				});
				if (!result) return false;
				console.log(`sell result:`, result);
				this.maxPage = result.last_page; // 記錄最大頁碼
				let filterData = [];
				if (this.curTab == 1) {
					filterData = result.data.filter(item => item.goods_info && item.order_buy);
				} else if (this.curTab == 2) {
					filterData = result.data.filter(item => item.goods_info && item.order_buy && item.order_sell);
				}
				console.log(`filterData`, filterData);
				const temp = filterData.map(item => {
					return {
						id: item.id,
						order_sn: item.order_sn,
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
						sellAmont: item.status == 2 ? item.order_sell.amount : '', // 卖出盈亏额,
						lastPrice: item.goods_info.last_price,
						total: item.order_buy.num * 1 * (item.order_buy.price * 1), // 个股买入总金额 
						buyFee: item.order_buy.buy_fee, // 买入手续费
						sellFee: item.status == 2 ? item.order_sell.sell_fee : '', // 卖出手续费
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

				console.log(333, Math.abs(result.Sellamount * 1));

				let res = {
					series: [{
						data: [{
							"name": "損益総額",
							"value": Math.abs(result.holdYingli),
							"color": "#adc1bb"
						}, {
							"name": "時価総額",
							"value": Math.abs(result.frozen),
							"color": "#c3a9ee"
						}, {
							"name": "評価損益",
							"value": Math.abs(result.money),
							"color": "#f4b4b7"
						}]
					}]
				};
				this.chartData = JSON.parse(JSON.stringify(res));


				let res1 = {
					series: [{
						data: [{
							"name": "売却損益",
							"value": Math.abs(result.totalYingli),
							"color": "#adc1bb"
						}, {
							"name": "売り市場価格",
							"value": Math.abs(result.Sellamount),
							"color": "#c3a9ee"
						}, {
							"name": "評価損益",
							"value": Math.abs(result.money),
							"color": "#f4b4b7"
						}]
					}]
				};
				this.chartData1 = JSON.parse(JSON.stringify(res1));

			},
		},
	}
</script>


<style lang="scss" scoped>
	@charset "UTF-8";

	.page {
		background: #f7f9f8;
		min-height: 100vh;
		box-sizing: border-box;
		padding-bottom: 67px
	}

	.page-card {
		height: 180px;
		background: #fff;
		padding: 7px 15px 7px 15px;
		box-sizing: border-box;
		margin-top: 10px
	}

	.page-card .top {
		height: 83px;
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

	.page-card .top .top-left {
		height: 83px;
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

	.page-card .top .top-left .top-left-top {
		height: 16px;
		font-weight: 500;
		font-size: 11px;
		color: #333;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 0 3px
	}

	.page-card .top .top-left .top-left-top img {
		width: 19px;
		height: 14px;
		margin-left: 5px
	}

	.page-card .top .top-left .top-left-foot {
		height: 36px;
		font-weight: 400;
		font-size: 26px;
		color: #e4013e;
		line-height: 36px;
		margin-top: 4px
	}

	.page-card .top .top-right {
		width: 83px;
		height: 83px;
		position: relative
	}

	.page-card .top .top-right .top-chart {
		width: 100px;
		height: 100px
	}

	.page-card .top .top-right .top-mask {
		width: 83px;
		height: 83px;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 10
	}

	.page-card .foot {
		height: 88px;
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

	.page-card .foot .foot-item {
		height: 21px;
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

	.page-card .foot .foot-left {
		height: 21px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-weight: 400;
		font-size: 11px;
		color: #333
	}

	.page-card .foot .foot-right {
		font-weight: 600;
		font-size: 13px;
		color: #333
	}

	.page-card .foot .foot-ball {
		width: 13px;
		height: 13px;
		margin-right: 3px;
		border-radius: 50%;
		display: block
	}

	.page-card .foot .color1 {
		background: #adc1bb
	}

	.page-card .foot .color2 {
		background: #c3a9ee
	}

	.page-card .foot .color3 {
		background: #f4b4b7
	}

	.page-card .page-box {
		height: 28px;
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

	.page-card .page-box .btn1 {
		width: 105px;
		height: 28px;
		background: #e4013e;
		border-radius: 5px;
		font-weight: 400;
		font-size: 11px;
		color: #fff;
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

	.page-card .page-box .btn2 {
		width: 105px;
		height: 28px;
		border-radius: 5px;
		border: 1px solid #e4013e;
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

	.pageNav {
		height: 49px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		background: #f7f9f8;
		margin: 0 11px
	}

	.pageNav .nav-item {
		width: 32%;
		height: 28px;
		background: #fff;
		border-radius: 5px;
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
		font-size: 10px;
		color: #e4013e;
		box-sizing: border-box
	}

	.pageNav .active {
		background: #e4013e;
		color: #fff
	}

	.abox .abox-list {
		background: #fff;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .36);
		margin-bottom: 8px;
		padding: 0 10px 9px 10px
	}

	.abox .abox-title {
		height: 41px;
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

	.abox .abox-name {
		font-weight: 600;
		font-size: 12px;
		color: #333;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.abox .abox-name span {
		height: 24px;
		background: #ec4d78;
		border-radius: 5px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		padding: 0 11px;
		font-weight: 400;
		font-size: 11px;
		color: #fff;
		margin-left: 14px
	}

	.abox .abox-have {
		min-width: 126px;
		height: 24px;
		background: #e4013e;
		border-radius: 5px;
		font-weight: 100;
		font-size: 11px;
		color: #fff;
		padding: 0 5px;
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

	.abox .abox-not {
		min-width: 126px;
		height: 24px;
		background: #fabec5;
		border-radius: 5px;
		font-weight: 100;
		font-size: 11px;
		color: #fff;
		padding: 0 5px;
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

	.abox .abox-foot {
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

	.abox .abox-foot .foot-item {
		width: calc(50% - 7px)
	}

	.abox .abox-foot .abox-foot-title {
		height: 31px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-weight: 500;
		font-size: 13px;
		color: #333
	}

	.abox .abox-foot .abox-foot-list {
		width: 100%;
		height: 29px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		font-weight: 300;
		font-size: 12px;
		color: #666
	}

	.abox .abox-foot .abox-foot-list span {
		font-weight: 500;
		font-size: 12px;
		color: #333
	}

	.abox .abox-foot .abox-foot-list .red {
		color: #e04e50
	}

	.abox .abox-foot .abox-foot-list .green {
		color: #37927d
	}

	.abox .abox-bottom {
		height: 28px;
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

	.abox .abox-bottom .btn1 {
		width: 105px;
		height: 28px;
		background: #e4013e;
		border-radius: 5px;
		font-weight: 400;
		font-size: 11px;
		color: #fff;
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

	.abox .abox-bottom .btn2 {
		width: 105px;
		height: 28px;
		background: #fff;
		border-radius: 5px;
		border: 1px solid #e4013e;
		font-weight: 400;
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

	.fbox .fbox-item {
		background: #fff;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .36);
		margin-top: 10px;
		padding: 0 10px
	}

	.fbox .fbox-item .fbox-item-top {
		height: 45px;
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

	.fbox .fbox-item .fbox-item-name {
		height: 45px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-weight: 600;
		font-size: 12px;
		color: #333
	}

	.fbox .fbox-item .fbox-item-name span {
		height: 24px;
		background: #adc1bb;
		border-radius: 5px;
		margin-left: 14px;
		padding: 0 5px;
		white-space: nowrap;
		font-weight: 400;
		font-size: 11px;
		color: #fff;
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

	.fbox .fbox-item .fobx-item-type {
		height: 24px;
		background: #e4013e;
		border-radius: 5px;
		padding: 0 5px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-weight: 100;
		font-size: 11px;
		color: #fff
	}

	.fbox .fbox-item .fbox-item-middle {
		padding: 0 8px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-wrap: wrap;
		flex-wrap: wrap;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between
	}

	.fbox .fbox-item .fbox-item-list {
		width: calc(50% - 7px);
		padding: 6px 0;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		font-weight: 300;
		font-size: 12px;
		color: #666
	}

	.fbox .fbox-item .fbox-item-list span {
		font-weight: 500;
		font-size: 12px;
		color: #333;
		padding-left: 5px
	}

	.fbox .fbox-item .fbox-item-list .red {
		color: #e04e50
	}

	.fbox .fbox-item .fbox-item-full {
		padding: 6px 8px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-weight: 300;
		font-size: 12px;
		color: #666
	}

	.fbox .fbox-item .fbox-item-full span {
		font-weight: 500;
		font-size: 12px;
		color: #333;
		padding-left: 11px
	}
</style>