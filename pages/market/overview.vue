<template>
<<<<<<< HEAD
	<view :class="isAnimat?'fade_in':'fade_out'" class="page_bg">
		<CustomHeaderSecond title="株式市場"></CustomHeaderSecond>
=======
	<view :class="isAnimat?'fade_in':'fade_out'" class="page_bg_sec">
		<CustomHeaderSecond title="マーケット"></CustomHeaderSecond>

>>>>>>> e0e038695daddae3de796d5b9a7ee826e37c6889
		<TabsSeventh :tabs="$lang.MARKET_TABS" @action="changeTab" :acitve="curTab"> </TabsSeventh>
		<view style="padding-bottom: 20px;background-color: #FFFFFF;">
			<TabOne v-if="curTab==0" ref="tab0"></TabOne>
			<!-- <MarketHot v-if="curTab==1"></MarketHot> -->
			<!-- <MarketKPI v-if="curTab==2"></MarketKPI> -->
			<MarketNews v-if="curTab==1"></MarketNews>
		</view>
	</view>
</template>

<script>
	import HeaderPrimary from '@/components/header/HeaderPrimary.vue';
	import TabsSeventh from '@/components/tabs/TabsSeventh.vue';
	import TabOne from './components/TabOne.vue'
	import MarketHot from './components/MarketHot.vue'
	import MarketKPI from './components/MarketKPI.vue'
	import MarketNews from './components/MarketNews.vue';

	export default {
		components: {
			HeaderPrimary,
			TabsSeventh,
			TabOne,
			MarketHot,
			MarketKPI,
			MarketNews
		},
		data() {
			return {
				isAnimat: false, // 页面动画
				curTab: 0,
				// timer: null,
			}
		},
		onLoad(op) {
			if (op.type) {
				this.curTab = Number(op.type) || 0;
				// this.changeTab(this.curTab);
			}
		},
		onShow() {
			this.isAnimat = true;
			console.log('onShow', this.$refs.tab0);
			if (this.$refs.tab0) {
				this.$refs.tab0.onSetTimeout();
			}
			this.changeTab(this.curTab);
		},
		onReady() {
			console.log('onReady', this.$refs.tab0);
		},
		onHide() {
			this.isAnimat = false;
			console.log('onHide', this.$refs.tab0);
			if (this.$refs.tab0) {
				this.$refs.tab0.clearTimer();
			}
		},
		deactivated() {
			console.log('deactivated', this.$refs.tab0);
			if (this.$refs.tab0) {
				this.$refs.tab0.clearTimer();
			}
		},

		methods: {
			changeTab(val) {
				if (this.$refs.tab0) {
					this.$refs.tab0.clearTimer();
				}
				this.curTab = val;
				if (this.curTab == 0) {
					if (this.$refs.tab0) {
						this.$refs.tab0.onSetTimeout();
					}
				}
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
			setStyle(val) {
				return {
					padding: `12rpx 24rpx`,
					color: val ? this.$theme.SECOND : '#CBCBCB',
					textAlign: 'center',
					fontSize: `36rpx`,
					fontWeight: `700`,
					borderBottom: `4rpx solid ${val? this.$theme.SECOND :this.$theme.TRANSPARENT }`
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
		justify-content: space-between;
		padding-top: 30px;

		/* background-image: linear-gradient(180deg, #F5B71C, transparent); */
		.left {
			margin-right: auto;
		}



		.header {
			height: 70px;
			padding: 0 8px;
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-align: center;
			-webkit-align-items: center;
			align-items: center;
			-webkit-box-pack: justify;
			-webkit-justify-content: space-between;
			justify-content: space-between;
			background: #fff
		}

		.header .header-left {
			width: 61px;
			height: 70px;
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-align: center;
			-webkit-align-items: center;
			align-items: center
		}

		.header .header-img {
			width: 159px;
			height: 52px;
			object-fit: contain
		}

		.header .header-right {
			width: 61px;
			height: 70px;
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

		.header .header-ring {
			width: 20px;
			height: 20px
		}

		.header .header-search {
			width: 19px;
			height: 19px
		}

		.header .header-setting {
			width: 21px;
			height: 21px;
			margin-left: 20px
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
</style>