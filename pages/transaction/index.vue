<template>
	<view :class="isAnimat?'fade_in':'fade_out'" style="background-image: url(/static/trade_head.png);
	background-position: 0 0;
	background-size: 100% ;
	background-repeat: no-repeat;padding-bottom:-330px; background-color:#ededed ;">
		<view class="header"
			style="display: flex;align-items: center;justify-content: center;font-size: 18px;color: #FFF;font-weight: 900;">
			<view> 出入金履歴 </view>
		</view>
		<view style="display: flex; padding: 0 40px;">
			<view
				style="border: 2px #FFFFFF solid;border-radius: 20px;width: 100%;display: flex;text-align: center; font-weight: 700;">
				<view style="padding: 5px;border-radius: 20px 0 20px 20px;flex: 50%;"
					:style="currentTab === 0 ? 'background-color: #FFFFFF; color: #da0e16;' : 'background-color: transparent; color: #FFFFFF;'"
					:class="{'active': currentTab === 0}" @click="currentTab = 0">株式市場</view>
				<view style="padding: 5px;border-radius: 0px 20px 20px 20px;flex: 50%;"
					:style="currentTab === 1 ? 'background-color: #FFFFFF; color: #da0e16;' : 'background-color: transparent; color: #FFFFFF;'"
					:class="{'active': currentTab === 1}" @click="currentTab = 1">暗号通貨</view>
			</view>
		</view>
		<view>
			<view>
				<view class="assets_card" v-if="currentTab === 0">
					<view style="text-align: center;padding-top:  20px;">総資産
						<image :src="showAmount?$icon.yanjing:$icon.biyan" mode="aspectFit"
							:style="$theme.setImageSize(32)" @click="showAmount=!showAmount"></image>
					</view>
					<view style="text-align: center;font-size: 20px;font-weight: 900;">
						{{showAmount?$util.formatMoney(userInfo.totalZichan):hideAmount}}
					</view>

					<view
						style="display: flex;align-items: center;justify-content: space-between;padding: 20px;gap:8px;">
						<view style="flex:1;">
							<view style="padding-bottom: 8px;font-size: 16px;font-weight: 500;">利用可能な資金</view>
							<view>{{showAmount?$util.formatMoney(userInfo.money):hideAmount}}</view>
						</view>

						<!-- <view style="text-align: center;flex:1;">
						<view>株式時価総額</view>
						<view>{{showAmount?$util.formatMoney(userInfo.frozen):hideAmount}}</view>
					</view>

					<view style="text-align: right;flex:1;">
						<view>変動損益</view>
						<view :style="{color:$theme.LOG_VALUE}">
							{{showAmount?$util.formatMoney(userInfo.totalYingli):hideAmount}}
						</view>
					</view> -->

						<view style="text-align: right;flex:1;">
							<view style="padding-bottom: 8px;font-size: 16px;font-weight: 500;">資金を凍結する</view>
							<view> {{showAmount?$util.formatMoney(userInfo.frozen):hideAmount}}</view>
						</view>
					</view>
				</view>
				<view class="assets_card" v-if="currentTab === 1">
					<view style="text-align: center;padding-top:  20px;">総資産
						<image :src="showAmount?$icon.yanjing:$icon.biyan" mode="aspectFit"
							:style="$theme.setImageSize(32)" @click="showAmount=!showAmount"></image>
					</view>
					<view style="text-align: center;font-size: 20px;font-weight: 900;margin-top: 20px;">
						{{showAmount?$util.formatMoney(userInfo.usd)+ 'USDT':hideAmount}}
					</view>

				</view>

				<view v-if="currentTab === 0"
					style="background-color: #FFFFFF; padding: 20px   0   10px  0;margin-top: 10px;">
					<view class="menu">
						<view class="menu-item" @click="linkmarket()">
							<image src="/static/btn_7.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
							<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;"> 株式取引</view>
						</view>
						<view class="menu-item" @click="$u.route({url:'/pages/trade/day/index'});">
							<image src="/static/btn_1.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
							<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;"> 急騰株取引</view>
						</view>

						<view class="menu-item" @click="$u.route({url:'/pages/trade/large/index'});">
							<image src="/static/btn_2.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
							<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;"> ブロック取引</view>
						</view>
						<view class="menu-item" @click="$u.route({url:'/pages/trade/ipo/index'});">
							<image src="/static/btn_0.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
							<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;"> 新規公開株式</view>
						</view>
						<view class="menu-item" @click="$u.route({url:'/pages/trade/issuance/index'});"
							style="margin-top: 12px;">
							<image src="/static/btn_4.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
							<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;"> 機関IPO</view>
						</view>
						<view class="menu-item" @click="$u.route({url:'/pages/trade/ea/index'});"
							style="margin-top: 12px;">
							<image src="/static/btn_3.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
							<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;"> AI資産運用</view>
						</view>
						<view class="menu-item" @click="linkMarketOV()" style="margin-top: 12px;">
							<image src="/static/btn_5.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
							<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;"> マーケット</view>
						</view>
						<view class="menu-item" @click="$u.route({url:'/pages/deposit/index'});"
							style="margin-top: 12px;">
							<image src="/static/btn_6.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
							<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;">サポート</view>
						</view>
					</view>

				</view>
				<view v-if="currentTab === 1"
					style="background-color: #FFFFFF; padding: 20px   0   10px  0;margin-top: 10px;">
					<view class="menu">
						<view class="menu-item" @click="linkmarketCoin()">
							<image src="/static/btn_7.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
							<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;">暗号取引</view>
						</view>
						<view class="menu-item" @click="$u.route({url:'/pages/contract/index'});">
							<image src="/static/btn_2.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
							<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;">大口取引</view>
						</view>
						<view class="menu-item" @click="$u.route({url:'/pages/transfer/cointransfer'});">
							<image src="/static/btn_4.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
							<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;">両替</view>
						</view>
						<view class="menu-item" @click="$u.route({url:'/pages/deposit/index'});">
							<image src="/static/btn_6.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
							<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;">サポート</view>
						</view>
					</view>

				</view>
			</view>

			<view style="text-align: center;padding-top: 6px;margin: 12px  0;">
				<image src="/static/trade_bnner.png" mode="widthFix" style="width: 90%;"></image>
			</view>

			<view class="page">

				<view style="background-color: #FFFFFF;padding: 20rpx 10px;min-height:96vh;border-radius: 10px;">
					<TabsThird :tabs="tabLabels" @action="changeTab" :acitve="curTab"></TabsThird>

					<template v-if="curTab == 0">
						<TradeRecord></TradeRecord>
					</template>

					<template v-if="curTab == 1">
						<DepositRecord></DepositRecord>
					</template>

					<template v-if="curTab == 2">
						<WithdrawalRecord></WithdrawalRecord>
					</template>

				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import HeaderSecond from '@/components/header/HeaderSecond.vue';
	import TabsThird from '@/components/tabs/TabsThird.vue';
	import TradeRecord from './components/TradeRecord.vue';
	import DepositRecord from './components/DepositRecord.vue';

	import WithdrawalRecord from './components/WithdrawalRecord.vue';
	export default {
		components: {
			HeaderSecond,
			TabsThird,
			TradeRecord,
			DepositRecord,
			WithdrawalRecord,

		},
		data() {
			return {
				isAnimat: false, // 页面动画
				curTab: 0,
				showAmount: false, // 显示金额
				hideAmount: '******', // 隐藏金额
				usd: '',
				available: '', // 可用額
				userInfo: null,
				list: [], // 
				currentTab: 0,
				curPage: 1, // 当前页码
				maxPage: 1, // 最大页码
				isShow: false, // 是否显示弹层
				detail: null, // 单条数据详情
				chartData: "",
				chartData1: "",
				// isClose:false, // 
			};
		},
		computed: {
			// tabs的明文
			tabLabels() {
				return [
					'取引',
					'入金履歴',
					'出金履歴'
				];
			}
		},
		onLoad(opt) {
			console.log(opt);
			this.curTab = Number(opt.code) || 0;
		},
		onShow() {
			this.isAnimat = true;
			this.getAccountInfo();
			this.changeTab(this.curTab);
		},
		onHide() {
			this.isAnimat = false;
		},
		methods: {
			changeTab(val) {
				this.curTab = val;
			},

			linkmarket() {
				uni.switchTab({
					url: `/pages/market/index`
				})
			},

			linkmarketCoin() {
				// 跳转到市场页面
				uni.switchTab({
					url: `/pages/market/index?inv=${this.inv}`
				});

			},


			linkMarketOV() {
				uni.navigateTo({
					url: `/pages/market/overview`
				})
			},

			// 总资产显隐控制
			handleShowAmount() {
				this.showAmount = !this.showAmount;
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
							"color": "#FF9600"
						}, {
							"name": "時価総額",
							"value": Math.abs(result.frozen),
							"color": "#76e4e4"
						}, {
							"name": "評価損益",
							"value": Math.abs(result.money),
							"color": "#e36067"
						}]
					}]
				};
				this.chartData = JSON.parse(JSON.stringify(res));


				let res1 = {
					series: [{
						data: [{
							"name": "売却損益",
							"value": Math.abs(result.totalYingli),
							"color": "#FF9600"
						}, {
							"name": "売り市場価格",
							"value": Math.abs(result.Sellamount),
							"color": "#76e4e4"
						}, {
							"name": "評価損益",
							"value": Math.abs(result.money),
							"color": "#e36067"
						}]
					}]
				};
				this.chartData1 = JSON.parse(JSON.stringify(res1));

			},
			fanhui() {
				uni.switchTab({
					url: '/pages/home/index'
				})
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

	.menu {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-wrap: wrap;
		flex-wrap: wrap;
		padding: 0 1px;
		align-items: center;
		justify-content: space-between;
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