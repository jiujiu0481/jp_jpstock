<template>
	<view style="margin-top: 130px; " class="page">
		<!-- <view style="display: flex;align-items: center;justify-content: center; ">
				<img src="/static/1head.png" class="banner" @click="$u.route({url:'/pages/market/overview'});">
			</view> -->
		<!-- 	<view class="title">機能</view> -->
		<view style="background-color: #FFFFFF; padding: 20px   0   10px  0;	border-radius: 24px 24px 10px 10px;">
			<view class="menu">
				<view class="menu-item" @click="linkmarket()">
					<image src="/static/btn_7.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
					<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;"> 株式取引</view>
				</view>
				<view class="menu-item" @click="$u.route({url:'/pages/trade/day/CoinIndex'});">
					<image src="/static/btn_1.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
					<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;"> 急騰株取引</view>
				</view>

				<view class="menu-item" @click="$u.route({url:'/pages/trade/large/CoinIndex'});">
					
					<image src="/static/btn_2.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
					<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;"> ブロック取引</view>
				</view>
				<view class="menu-item" @click="$u.route({url:'/pages/trade/ipo/CoinIndex'});">
					<image src="/static/btn_0.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
					<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;"> 新規公開株式</view>
				</view>
				<view class="menu-item" @click="$u.route({url:'/pages/trade/issuance/CoinIndex'});"
					style="margin-top: 12px;">
					<image src="/static/btn_4.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
					<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;"> 機関IPO</view>
				</view>
				<view class="menu-item" @click="$u.route({url:'/pages/trade/ea/CoinIndex'});" style="margin-top: 12px;">
					<image src="/static/btn_3.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
					<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;"> AI資産運用</view>
				</view>
				<view class="menu-item" @click="linkMarketOV()" style="margin-top: 12px;">
					<image src="/static/btn_5.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
					<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;"> マーケット</view>
				</view>
				<view class="menu-item" @click="$u.route({url:'/pages/deposit/index'});" style="margin-top: 12px;">
					<image src="/static/btn_6.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
					<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;">サポート</view>
				</view>
			</view>
			<view style="text-align: center;padding-top: 6px;">
				<image src="/static/banner.png" mode="widthFix" style="width: 90%;"></image>
			</view>
		</view>

		<view style="display: flex;align-items: center;justify-content: space-around;padding: 10px;">
			<view style="padding: 10px 6px;background-color: #FFFFFF;border-radius: 10px;text-align: center;" @click="$u.route({url:'/pages/coin/index'});" >
				<view style="font-size: 12px;">BTC/USDT</view>
				<view>104909.57</view>
				<view style="margin-top: -20px;">
					<image src="/static/line_fall.png" mode="aspectFit" :style="$theme.setImageSize(160)"></image>
				</view>
				<view
					style="display: flex;margin-top: -30px;font-size: 12px;align-items: center;justify-content: space-between;">
					<view>-640.49</view>
					<view>-0.6%</view>
				</view>
			</view>
			<view style="padding: 10px 6px;background-color: #FFFFFF;border-radius: 10px;text-align: center;"@click="$u.route({url:'/pages/coin/index'});" >
				<view style="font-size: 12px;">BTC/USDT</view>
				<view>104909.57</view>
				<view style="margin-top: -20px;">
					<image src="/static/line_fall.png" mode="aspectFit" :style="$theme.setImageSize(160)"></image>
				</view>
				<view
					style="display: flex;margin-top: -30px;font-size: 12px;align-items: center;justify-content: space-between;">
					<view>-640.49</view>
					<view>-0.6%</view>
				</view>
			</view>
			<view style="padding: 10px 6px;background-color: #FFFFFF;border-radius: 10px;text-align: center;" @click="$u.route({url:'/pages/coin/index'});" >
				<view style="font-size: 12px;">BTC/USDT</view>
				<view>104909.57</view>
				<view style="margin-top: -20px;">
					<image src="/static/line_fall.png" mode="aspectFit" :style="$theme.setImageSize(160)"></image>
				</view>
				<view
					style="display: flex;margin-top: -30px;font-size: 12px;align-items: center;justify-content: space-between;">
					<view>-640.49</view>
					<view>-0.6%</view>
				</view>
			</view>

		</view>

		<view style="display: flex;align-items: center;justify-content: space-between;padding: 12px 20px;background-color: #FFFFFF;border-bottom: 1px solid #979797;">
			<view style="display: flex;align-items: center;" @click="$u.route({url:'/pages/coin/index'});" >
				<image src="/static/btc.png" mode="aspectFit" :style="$theme.setImageSize(60)"></image>
				<view style="padding-left: 6px;">
					BTC/USDT
				</view>
			</view>
			<view>
				104909.57
			</view>
			<view style="padding: 10px; background-color: red; border-radius: 10px;color: #FFFFFF;">
				-0.6%
			</view>
		</view>
		<view style="display: flex;align-items: center;justify-content: space-between;padding: 12px 20px;background-color: #FFFFFF;border-bottom: 1px solid #979797;">
			<view style="display: flex;align-items: center;" @click="$u.route({url:'/pages/coin/index'});" >
				<image src="/static/btc.png" mode="aspectFit" :style="$theme.setImageSize(60)"></image>
				<view style="padding-left: 6px;">
					BTC/USDT
				</view>
			</view>
			<view>
				104909.57
			</view>
			<view style="padding: 10px; background-color: red; border-radius: 10px;color: #FFFFFF;">
				-0.6%
			</view>
		</view>
		<view style="display: flex;align-items: center;justify-content: space-between;padding: 12px 20px;background-color: #FFFFFF;border-bottom: 1px solid #979797;">
			<view style="display: flex;align-items: center;" @click="$u.route({url:'/pages/coin/index'});" >
				<image src="/static/btc.png" mode="aspectFit" :style="$theme.setImageSize(60)"></image>
				<view style="padding-left: 6px;">
					BTC/USDT
				</view>
			</view>
			<view>
				104909.57
			</view>
			<view style="padding: 10px; background-color: red; border-radius: 10px;color: #FFFFFF;">
				-0.6%
			</view>
		</view>






		<!-- <HeaderPrimary isSearch :title="$lang.TABBAR_HOME" color="#FFFFFF"> </HeaderPrimary> -->



		<!-- <TrackList></TrackList> -->

		<!-- <MarketNews></MarketNews> -->



		<!-- <view>
			<view style="padding:0 20rpx;">
			</view>

			<MarketHot ref="hot"></MarketHot>
		</view> -->

		<!-- IPO申购成功弹层 -->
		<!-- <IPOSuccessAlert></IPOSuccessAlert> -->

	</view>
	</view>
</template>

<script>
	// import HeaderPrimary from '@/components/header/HeaderPrimary.vue';

	import TitleSecond from '@/components/title/TitleSecond.vue';

	// import MarketNews from './components/MarketNews.vue';
	// import MarketHot from './components/MarketHot.vue';
	// import IPOSuccessAlert from './components/IPOSuccessAlert.vue';

	import {
		init,
		registerLocale,
		dispose
	} from '@/common/klinecharts.min.js';

	export default {
		name: 'CoinIndex',
		components: {
			// HeaderPrimary,


			// MarketNews,
			// MarketHot,
			// IPOSuccessAlert,
		},
		data() {
			return {
				currentTab: 0,
				isAnimat: false, // 页面动画	
				yan_show: true,
				userInfo: {},
				zhibiao_show: false,
				kLineChart: null, // Kline实例化
				lishi: [], // k綫數據
				list: [],
				kline_data: "",
				top3_list: "",
				dz33: "",
				zhibiao_name: '日経225',
				columns: [
					['日経225', '東証株価指数', 'TOPIX 100 Index',
						'TOPIX 500 Index', 'TOPIX 1000 Index', 'TOPIX Large 70 Index', 'TOPIX Mid 400 Index',
						'TOPIX Small Index', 'USD/JPY'
					]
				],
				dz33_show: false,
				news: "",
				timer: null,
			}
		},
		computed: {
			// 今日
			setToday() {
				return this.$util.formatToday(new Date());
			}
		},

		onLoad() {
			setTimeout(() => {
				if (!this.kLineChart) {
					this.kLineChart = init('chart-type-k-line');
					this.kLineInit(); // 初始化Kline
				}
				this.genKLineData(); // 获取并生成KLine数据	
			}, 50);
			this.getNews()

		},
		onShow() {
			this.getAccountInfo()
			this.getToplishi()
			this.getList()
			this.top3()
			this.onSetTimeout()
			this.isAnimat = true;
		},
		onReady() {},
		onHide() {
			this.isAnimat = false;
			this.closeAll();
			if (this.timer) this.clearTimer();

		},
		onUnload() {
			this.closeAll();
			if (this.timer) this.clearTimer();
		},
		deactivated() {
			this.closeAll();
			if (this.timer) this.clearTimer();
		},

		methods: {
			linkcoin() {
				uni.switchTab({
					url: `/pages/coin/index`
				})
			},
			onSetTimeout() {
				this.timer = setInterval(() => {
					console.log("setInterval");
					this.getToplishi()
					this.getList()
					this.top3()
				}, 5000);
			},
			clearTimer() {
				if (this.timer) {
					clearInterval(this.timer);
					this.timer = null;
					console.log('clearTimer', this.timer);
				}
			},

			linkmarket() {
				uni.switchTab({
					url: `/pages/market/index`
				})
			},
			linkMarketOV() {
				uni.navigateTo({
					url: `/pages/market/overview`
				})
			},

			open(url) {
				window.open(url)
			},
			dz33_show_click() {
				this.dz33_show = !this.dz33_show
				this.$forceUpdate()
			},



			setStyle(val) {
				return {
					...val ? this.$theme.LG_PRIMARY : this.$theme.LG_SECOND,
					color: val ? '#FFFFFF' : this.$theme.PRIMARY,
					borderRadius: `44rpx`,
					border: `1px solid ${val? this.$theme.TRANSPARENT:'#5A5A5A'}`,
				}
			},
			zhibiao_click(e) {
				console.log(e)
				this.zhibiao_name = e.value[0]
				this.zhibiao_show = false
				this.getToplishi()
			},
			// 关闭子組件 websocket 及定時器
			closeAll() {
				if (this.$refs.hot) this.$refs.hot.disconnect();
			},
			async getAccountInfo() {
				// uni.showLoading({
				// 	title: this.$lang.API_GET_ACCOUNT_INFO
				// });
				const result = await this.$http.get(`api/user/info`);
				if (!result) return false;
				this.userInfo = result;
				this.cardData = {
					value1: this.userInfo.totalZichan || 0,
					value2: this.userInfo.money || 0,
					value3: this.userInfo.freeze || 0,
				};
			},
			async getToplishi() {

				const result = await this.$http.post(`api/Product/lishis`, {
					name: this.zhibiao_name
				});
				if (!result) return false;



				console.log(`kline:`, result);
				this.lishi = result.kline;
				this.kLineChart.setPriceVolumePrecision(2, 0)
				this.kLineChart.applyNewData(result.kline);
				this.kline_data = result.data
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
							downColor: '#17b780',
							upColor: '#ea4445',
							noChangeColor: '#ffbfb9',
							downBorderColor: '#17b780',
							upBorderColor: '#ea4445',
							noChangeBorderColor: '#ffbfb9',
							upWickColor: '#ea4445',
							downWickColor: '#17b780',
							noChangeWickColor: '#ffbfb9'
						},
					},
				});
				// this.kLineChart.createIndicator('MA', false);
			},
			async handleUnFollow(code) {
				const result = await this.$http.post(`api/user/collect_edit`, {
					code: code,
				});
				this.getList();
			},
			// 跳转到股票详情
			link(code) {
				if (!code || code == '') return false;
				uni.navigateTo({
					url: `${this.$paths.STOCK_OVERVIEW}?code=${code}`
				});
			},
			zichan() {
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: '/pages/transaction/index'
				});
			},
			shouye() {
				uni.navigateTo({
					url: '/pages/search/index'
				})
			},
			kefu() {
				uni.navigateTo({
					url: '/pages/service'
				})
			},
			linkDeposit() {
				uni.navigateTo({
					url: this.$paths.ACCOUNT_DEPOSIT
				})
			},
			linkWithdraw() {
				uni.navigateTo({
					url: this.$paths.ACCOUNT_WITHDRAW
				})
			},
			linkAuth() {
				uni.navigateTo({
					url: this.$paths.ACCOUNT_AUTH
				})
			},
			linkService() {
				this.$util.linkCustomerService();
			},

			// 跳转到市场的热门股票
			linkAllList() {
				uni.reLaunch({
					url: this.$paths.MARKET_OVERVIEW + `?type=1`,
				})
			},
		},
	}
</script>
<style type="text/css">
	@charset "UTF-8";

	.banner {
		height: 100px;
		width: 100%;

	}

	.title {
		height: 39px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 0 6px;
		font-weight: 600;
		font-size: 20px;
		color: #212121
	}

	.menu {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-wrap: wrap;
		flex-wrap: wrap;
		padding: 0 1px
	}

	.menu .menu-item {
		width: calc(25% - 9px);
		height: 59px;
		border-radius: 6px;
		/* 	margin: 0 4px 6px 4px; */
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-weight: 400;
		font-size: 12px;
		/* 	color: #37927d; */
		color: #e4013e;
		line-height: 16px
	}

	.menu .menu-item img {
		width: 20px;
		height: 20px;
		/* 	margin-bottom: 8px */
	}

	.top {
		background: #fff
	}

	.top .top-header {
		height: 59px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		padding: 0 8px
	}

	.top .top-header .top-one {
		height: 24px;
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

	.top .top-header .top-one .top-select {
		width: 125px;
		height: 24px;
		background: #fff;
		box-shadow: 0 1px 6px 0 rgba(228, 1, 62, .26);
		border-radius: 5px;
		border: 1px solid #e4013e;
		padding: 0 7px;
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

	.top .top-header .top-one .top-select span {
		width: 88px;
		height: 17px;
		font-weight: 400;
		font-size: 12px;
		color: #e4013e;
		line-height: 17px;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap
	}

	.top .top-header .top-one .top-select img {
		width: 16px;
		height: 8px
	}

	.top .top-header .top-one .top-right {
		font-weight: 600;
		font-size: 12px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		justify-content: flex-end
	}

	.top .top-header .top-one .top-right span {
		font-weight: 600;
		font-size: 15px;
		padding-left: 5px
	}

	.top .top-header .top-one .top-right img {
		width: 15px;
		height: 10px;
		margin-left: 7px
	}

	.top .top-header .top-one .red {
		color: #e04e50
	}

	.top .top-header .top-one .red span {
		color: #e04e50
	}

	.top .top-header .top-one .green {
		color: #37927d
	}

	.top .top-header .top-one .green span {
		color: #37927d
	}

	.top .top-header .top-two {
		height: 22px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.top .top-header .top-two span {
		font-weight: 400;
		font-size: 8px;
		color: #333;
		margin-left: 7px
	}

	.top .top-middle {
		width: 100%;
		height: 200px
	}

	.top .top-foot {
		height: 104px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		border-bottom: 1px solid #ebebeb
	}

	.top .top-foot .top-foot-item {
		width: 33.3333333333%;
		height: 104px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.top .top-foot .top-foot-box {
		width: calc(100% - 1px);
		height: 104px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 0 5px;
		box-sizing: border-box
	}

	.top .top-foot .top-foot-line {
		width: 1px;
		height: 81px;
		background: #85a39b
	}

	.top .top-foot .top-foot-name {
		font-weight: 600;
		font-size: 11px;
		color: #000;
		line-height: 15px;
		letter-spacing: 0.5px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		text-align: center
	}

	.top .top-foot .top-foot-price {
		height: 21px;
		font-weight: 400;
		font-size: 15px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		margin-top: 2px
	}

	.top .top-foot .top-foot-price img {
		width: 11px;
		height: 8px;
		margin-left: 1px
	}

	.top .top-foot .top-foot-num {
		height: 13px;
		font-weight: 400;
		font-size: 9px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		margin-top: 5px
	}

	.top .top-foot .green {
		color: #37927d
	}

	.top .top-foot .red {
		color: #e4013e
	}

	.box {
		background: #fff;
		border-top: 1px solid #ebebeb
	}

	.box .box-item {
		padding: 11px 6px;
		border-bottom: 1px solid #ebebeb;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.box .box-item .item-title {
		width: 50%;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.box .box-item .item-title img {
		width: 15px;
		height: 15px;
		margin-right: 7px
	}

	.box .box-item .item-title .name-title {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-weight: 900;
		font-size: 12px;
		color: #333;
		line-height: 17px
	}

	.box .box-item .item-title .name-title span {
		font-weight: 400;
		font-size: 7px;
		color: #333;
		line-height: 10px;
		margin-top: 1px
	}

	.box .box-item .item-price {
		width: 25%;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		justify-content: flex-end;
		font-weight: 500;
		font-size: 17px;
		color: #0f0f0f
	}

	.box .box-item .item-price img {
		width: 10px;
		height: 9px;
		margin-left: 4px
	}

	.box .box-item .item-num {
		width: 25%;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: end;
		-webkit-align-items: flex-end;
		align-items: flex-end;
		font-weight: 600;
		font-size: 11px;
		line-height: 16px
	}

	.box .box-item .item-num span {
		font-weight: 600;
		font-size: 11px
	}

	.box .box-item .green {
		color: #37927d
	}

	.box .box-item .green span {
		color: #37927d
	}

	.box .box-item .red {
		color: #e4013e
	}

	.box .box-item .red span {
		color: #e4013e
	}

	.news {
		background: #fff
	}

	.news .list {
		height: 61px;
		border-bottom: 1px solid #ebebeb;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 0 7px
	}

	.news .list .list-line {
		width: 3px;
		height: 44px;
		background: #e4013e;
		margin-right: 4px
	}

	.news .list .list-info {
		width: calc(100% - 8px);
		height: 60px;
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

	.banner {
		height: 74px
	}

	.title {
		height: 40px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		margin-left: 10px;
		padding: 0 6px;
		font-weight: 600;
		font-size: 14px;
		color: #212121
	}

	.menu {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-wrap: wrap;
		flex-wrap: wrap;
		padding: 0 1px
	}

	.menu .menu-item {
		width: calc(25% - 9px);
		height: 57px;
		background: #fff;
		border-radius: 3px;
		margin: 0 4px 6px 4px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-weight: 400;
		font-size: 11px;
		color: #e4013e;
		line-height: 16px
	}

	/* .menu .menu-item img {
		width: 20px;
		height: 20px;
		margin-bottom: 8px
	} */

	.top {
		background: #fff
	}

	.top .top-header {
		height: 57px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		padding: 0 8px
	}

	.top .top-header .top-one {
		height: 24px;
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

	.top .top-header .top-one .top-select {
		width: 121px;
		height: 24px;
		background: #fff;
		box-shadow: 0 1px 6px 0 rgba(228, 1, 62, .26);
		border-radius: 5px;
		border: 1px solid #e4013e;
		padding: 0 7px;
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

	.top .top-header .top-one .top-select span {
		width: 85px;
		height: 16px;
		font-weight: 400;
		font-size: 12px;
		color: #e4013e;
		line-height: 16px;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap
	}

	.top .top-header .top-one .top-select img {
		width: 15px;
		height: 8px
	}

	.top .top-header .top-one .top-right {
		font-weight: 600;
		font-size: 12px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		justify-content: flex-end
	}

	.top .top-header .top-one .top-right span {
		font-weight: 600;
		font-size: 15px;
		padding-left: 5px
	}

	.top .top-header .top-one .top-right img {
		width: 14px;
		height: 10px;
		margin-left: 7px
	}

	.top .top-header .top-one .red {
		color: #e04e50
	}

	.top .top-header .top-one .red span {
		color: #e04e50
	}

	.top .top-header .top-one .green {
		color: #37927d
	}

	.top .top-header .top-one .green span {
		color: #37927d
	}

	.top .top-header .top-two {
		height: 22px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.top .top-header .top-two span {
		font-weight: 400;
		font-size: 8px;
		color: #333;
		margin-left: 7px
	}

	.top .top-middle {
		width: 100%;
		height: 200px
	}

	.top .top-foot {
		height: 100px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		border-bottom: 1px solid #ebebeb
	}

	.top .top-foot .top-foot-item {
		width: 33.3333333333%;
		height: 100px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.top .top-foot .top-foot-box {
		width: calc(100% - 1px);
		height: 100px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 0 5px;
		box-sizing: border-box
	}

	.top .top-foot .top-foot-line {
		width: 1px;
		height: 78px;
		background: #85a39b
	}

	.top .top-foot .top-foot-name {
		font-weight: 600;
		font-size: 11px;
		color: #000;
		line-height: 15px;
		letter-spacing: 1px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		text-align: center
	}

	.top .top-foot .top-foot-price {
		height: 21px;
		font-weight: 400;
		font-size: 15px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		margin-top: 2px
	}

	.top .top-foot .top-foot-price img {
		width: 11px;
		height: 8px;
		margin-left: 1px
	}

	.top .top-foot .top-foot-num {
		height: 12px;
		font-weight: 400;
		font-size: 9px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		margin-top: 5px
	}

	.top .top-foot .green {
		color: #37927d
	}

	.top .top-foot .red {
		color: #e4013e
	}

	.box {
		background: #fff;
		border-top: 1px solid #ebebeb
	}

	.box .box-item {
		padding: 11px 6px;
		border-bottom: 1px solid #ebebeb;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.box .box-item .item-title {
		width: 50%;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.box .box-item .item-title img {
		width: 15px;
		height: 15px;
		margin-right: 7px
	}

	.box .box-item .item-title .name-title {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-weight: 600;
		font-size: 12px;
		color: #333;
		line-height: 16px
	}

	.box .box-item .item-title .name-title span {
		font-weight: 400;
		font-size: 7px;
		color: #333;
		line-height: 10px;
		margin-top: 1px
	}

	.box .box-item .item-price {
		width: 25%;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		justify-content: flex-end;
		font-weight: 500;
		font-size: 16px;
		color: #0f0f0f
	}

	.box .box-item .item-price img {
		width: 10px;
		height: 9px;
		margin-left: 4px
	}

	.box .box-item .item-num {
		width: 25%;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: end;
		-webkit-align-items: flex-end;
		align-items: flex-end;
		font-weight: 600;
		font-size: 11px;
		line-height: 16px
	}

	.box .box-item .item-num span {
		font-weight: 600;
		font-size: 11px
	}

	.box .box-item .green {
		color: #37927d
	}

	.box .box-item .green span {
		color: #37927d
	}

	.box .box-item .red {
		color: #e4013e
	}

	.box .box-item .red span {
		color: #e4013e
	}

	.news {
		background: #fff
	}

	.news .list {
		height: 59px;
		border-bottom: 1px solid #ebebeb;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 0 7px
	}

	.news .list .list-line {
		width: 3px;
		height: 42px;
		background: #e4013e;
		margin-right: 4px
	}

	.news .list .list-info {
		width: calc(100% - 8px);
		height: 58px;
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

	.news .list .list-title {
		height: 28px;
		font-weight: 400;
		font-size: 12px;
		color: #535353;
		line-height: 14px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		-webkit-line-clamp: 2
	}

	.news .list .list-date {
		font-weight: 400;
		font-size: 11px;
		color: #999;
		line-height: 14px;
		margin-top: 4px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		justify-content: flex-end
	}

	.news .more {
		height: 39px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		justify-content: flex-end;
		padding: 0 14px;
		font-weight: 400;
		font-size: 12px;
		color: #666
	}

	.news .more img {
		width: 6px;
		height: 11px;
		margin-left: 13px
	}

	.foot {
		height: 201px;
		background: #fff;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.foot .foot-left {
		width: calc(100% - 28px);
		height: 201px;
		position: relative
	}

	.foot .foot-left .foot-left-title {
		height: 18px;
		font-weight: 600;
		font-size: 13px;
		color: #e04e50;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		position: absolute;
		left: 5px;
		top: 1px
	}

	.foot .foot-left .foot-left-title span {
		font-weight: 600;
		font-size: 13px;
		color: #37927d;
		padding-left: 26px
	}

	.foot .foot-right {
		width: 28px;
		height: 201px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column
	}

	.foot .foot-right .foot-right-item {
		width: 28px;
		height: 100px;
		background: #9ad3c5;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-weight: 400;
		font-size: 11px;
		color: #e4013e;
		line-height: 16px;
		-webkit-writing-mode: vertical-rl;
		writing-mode: vertical-rl
	}

	.foot .foot-right .foot-right-on {
		background: #ff95b2;
		color: #37927d
	}

	.foot .foot-box {
		height: 201px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 0 6px
	}

	.foot .foot-item {
		/* 	width: 50%; */
		height: 201px
	}

	.foot .foot-redBox {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		height: 100px;
		-webkit-box-align: end;
		-webkit-align-items: flex-end;
		align-items: flex-end
	}

	.foot .foot-redBox .foot-redBox-line {

		background: #e04e50;
		border: 1px solid #000;
		margin: 0 2px;
		display: block
	}

	.foot .foot-redTxt {
		width: 100%;
		height: 100px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		padding-top: 10px;
		box-sizing: border-box
	}

	.foot .foot-redTxt .foot-redTxt-txt {
		font-weight: 400;
		font-size: 11px;
		color: #37927d;
		line-height: 11px;
		margin-right: 13px;
		-webkit-writing-mode: vertical-rl;
		writing-mode: vertical-rl
	}

	.foot .foot-greenBox {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		height: 100px;
		-webkit-box-align: start;
		-webkit-align-items: flex-start;
		align-items: flex-start;
		justify-content: flex-end;
	}

	.foot .foot-greenBox .foot-greenBox-line {

		background: #37927d;
		border: 1px solid #000;
		margin: 0 2px;
		display: block
	}

	.foot .foot-greenTxt {
		width: 100%;
		height: 100px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: end;
		-webkit-align-items: flex-end;
		align-items: flex-end;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		justify-content: flex-end;
		padding-bottom: 10px;
		box-sizing: border-box
	}

	.foot .foot-greenTxt .foot-greenTxt-txt {
		font-weight: 400;
		font-size: 11px;
		color: #e4013e;
		line-height: 11px;
		margin-left: 13px;
		-webkit-writing-mode: vertical-rl;
		writing-mode: vertical-rl
	}

	.foot .foot-long {
		width: 100%;
		height: 201px
	}

	.foot .foot-longBox {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		height: 100px;
		-webkit-box-align: end;
		-webkit-align-items: flex-end;
		align-items: flex-end
	}

	.foot .foot-longBox .foot-redBox-line {
		width: calc(10% - 4px);
		background: #e04e50;
		border: 1px solid #000;
		margin: 0 2px;
		display: block
	}

	.foot .foot-longTxt {
		width: 100%;
		height: 100px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		padding-top: 10px;
		box-sizing: border-box
	}

	.foot .foot-longTxt .foot-redTxt-txt {
		width: calc(10% - 4px);
		font-weight: 400;
		font-size: 11px;
		margin: 0 2px;
		color: #e04e50;
		line-height: 11px;
		-webkit-writing-mode: vertical-rl;
		writing-mode: vertical-rl;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.popMask {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .5);
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 11
	}

	.pop {
		background: #fff;
		width: 100%;
		padding: 10px;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 12
	}

	.pop .pop-list {
		width: 100%;
		height: 46px;
		border-bottom: 1px solid #ebebeb;
		padding: 0 10px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-weight: 600;
		font-size: 12px;
		color: #333
	}

	.home-menu {
		height: 190px;
		background: #fff;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-wrap: wrap;
		flex-wrap: wrap;
		padding: 4px 5px 0 5px
	}

	.home-menu .home-menu-item {
		width: calc(33.3333333333% - 5px);
		height: 77px;
		margin: 5px 2px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		padding: 3px 6px 0 6px;
		box-sizing: border-box
	}

	.home-menu .home-menu-item .home-menu-item-title {
		height: 17px;
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

	.home-menu .home-menu-item .home-menu-item-title span {
		width: calc(100% - 21px);
		height: 17px;
		line-height: 17px;
		font-weight: 400;
		font-size: 12px;
		color: #333;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap
	}

	.home-menu .home-menu-item .home-menu-item-title img {
		width: 15px;
		height: 15px;
		margin-left: 6px
	}

	.home-menu .home-menu-item .home-menu-item-tip1 {
		height: 12px;
		font-weight: 400;
		font-size: 8px;
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

	.home-menu .home-menu-item .home-menu-item-tip1 span {
		font-weight: 400;
		font-size: 8px
	}

	.home-menu .home-menu-item .home-menu-item-tip2 {
		height: 21px;
		font-weight: 600;
		font-size: 15px;
		color: #333;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.home-menu .home-menu-item .home-menu-item-tip2 img {
		width: 10px;
		height: 10px;
		margin-left: 5px
	}

	.home-menu .green {
		background: url(/static/img/green.290586a0.png);
		background-position: bottom;
		background-repeat: no-repeat;
		background-size: 100%;
		background-color: #e9f2dd
	}

	.home-menu .green .home-menu-item-tip1 span {
		color: #37927d
	}

	.home-menu .red {
		background: url(/static/img/red.7825f33b.png);
		background-position: bottom;
		background-repeat: no-repeat;
		background-size: 100%;
		background-color: #f7d9da
	}

	.home-menu .red .home-menu-item-tip1 span {
		color: #e04e50
	}
</style>