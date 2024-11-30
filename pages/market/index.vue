<template>
	<view class="page">
		<view class="block">
			<view class="head">
				<img :src="$icon.laba" class="head-ring" @click="$u.route({url:'/pages/notification'});">
				<view class="head-search" @click="$u.route({url:'/pages/search/index'});">
					<img :src="$icon.sousuo">
				</view>
				<img :src="$icon.chilun" class="head-setting" @click="$u.route({url:'/pages/account/center'});">
			</view>
		</view>
		<view class="nav-box">
			<view class="nav-item" :class="inv==0?'active':''" @click="dianji(0)">株式市場</view>
			<view class="nav-item" :class="inv==1?'active':''" @click="dianji(1)">オプション</view>
		</view>
		<view class="marBox">
			<view class="home-menu" style="background-color: #EEEEEE;">
				<view class="home-menu-item" style="border-radius: 6px;"    :class="item.rate>=0?'red':'green'" v-for="(item,index) in list"
					:key="index" @click="link(item.code)" v-if="index<6">
					<view class="home-menu-item-title"><span>{{item.name}}</span>
						<img :src="item.is_collected==1?$icon.ysc:$icon.sc"
							@click.stop.capture="handleUnFollow(item.code)">
					</view>
					<view class="home-menu-item-tip1">
						{{item.code}}<span>{{item.rate_num}}</span><span>{{$util.formatNumber(item.rate,2)}}%</span>
					</view>
					<div class="home-menu-item-tip2">{{$util.formatMoney(item.close*1,2)}}
						<img :src="item.rate>=0?$icon.up:$icon.down">
					</div>
				</view>

			</view>

			<view style="display: flex;align-items: center;justify-content: space-between;padding: 0 12rpx;">
				<view style="flex:0 0 48%;border-radius: 12rpx;">
					<view
						style="background-image: url(/static/banner_market_a.png);
						background-position:center;background-repeat: no-repeat;
						background-size: 100%;width: 100%;height: 80px;border-radius: 24rpx;">
					</view>
				</view>
				<view style="flex:0 0 48%;border-radius: 12rpx;">
					<view
						style="background-image: url(/static/banner_market_b.png);
						background-position:center ;background-repeat: no-repeat;
						background-size: 100%;width: 100%;height: 80px;border-radius: 24rpx;">
					</view>
				</view>
			</view>

			<view class="box" style="margin:0 10px">
				<view class="box-item" v-for="(item,index) in list" :key="index" @click="link(item.code)">
					<view class="item-title">
						<img :src="item.is_collected==1?$icon.ysc:$icon.sc"
							@click.stop.capture="handleUnFollow(item.code)">
						<view class="name-title">{{item.name}}<span style="font-size: 12px;color: #e33262;">{{item.code}}</span></view>
					</view>
					<view class="item-price">{{$util.formatMoney(item.close*1,2)}}
						<img :src="item.rate>=0?$icon.up:$icon.down">
					</view>
					<view class="item-num" :class="item.rate>=0?'red':'green'">
						{{item.rate_num}}<span>{{$util.formatNumber(item.rate,2)}}%</span>
					</view>
				</view>
			</view>
		</view>


		<!-- <view  style="height: 120px;" >
			<header  style="padding-top: 60rpx;">
				<scroll-view :scroll-x="true" style="white-space: nowrap;width: 96%;"
					@touchmove.stop>
					<view style="display: flex;margin:0 10rpx;">
						<block v-for="(item,index) in tabs" :key='index'>
							<view :style="setStyle(curTab ==index)" @click="changeTab(index)">
								{{item}}
							</view>
						</block>
					</view>
				</scroll-view>
			</header>
			<view class="justify-center flex" style="padding: 30px 0px;">
				<view style="color: #FFFFFF;font-size: 20px;">株式市場</view>
			</view>
		</view> -->


		<!-- <template v-if="curTab==0">
				<MarketTrack ref="track" @action="linkStock"></MarketTrack>
			</template>
			<template v-else-if="curTab==1">
				<MarketStockList ref="all"></MarketStockList>
			</template> -->
		<!-- <template v-else-if="curTab==2">
				<MarketHot ref="hot"></MarketHot>
			</template>
			<template v-else>
				<MarketKPI ref="kpi"></MarketKPI>
			</template> -->
	</view>
	</view>
</template>

<script>
	import HeaderPrimary from '@/components/header/HeaderPrimary.vue';
	import TabsPrimary from '@/components/tabs/TabsPrimary.vue';
	import MarketTrack from './components/MarketTrack.vue';
	import MarketStockList from './components/MarketStockList.vue';
	import MarketHot from './components/MarketHot.vue';
	import MarketKPI from './components/MarketKPI.vue';
	export default {
		components: {
			HeaderPrimary,
			TabsPrimary,
			MarketTrack,
			MarketStockList,
			MarketHot,
			MarketKPI
		},
		data() {
			return {
				isAnimat: false, // 页面动画
				curTab: 0, // 当前默认放在Coin
				list: [],
				inv: 0
			}
		},

		created() {
			this.getList();
			// this.getList1()
		},
		onPullDownRefresh() {
			this.getList();
		},
		methods: {
			dianji(num) {
				this.inv = num
				if (num == 1) {
					this.getData();
				} else {
					this.getList();
				}
			},
			async getData() {
				this.list = [];
				const result = await this.$http.get(`api/user/collect_list`);
				console.log(1111, result)
				if (result.list.length > 0) {
					this.list = result.list.map(item => {
						return {
							logo: item.goods.logo,
							name: item.goods.name,
							code: item.goods.code,
							close: item.goods.current_price,
							rate: item.goods.rate,
							rate_num: item.goods.rate_num,
							is_collected: 1
						}
					});
				} else {
					this.list = []
				}

			},

			async handleUnFollow(code) {

				const result = await this.$http.post(`api/user/collect_edit`, {
					code: code,
				});
				if (this.inv == 1) {
					this.getData();
				} else {
					this.getList();
				}
			},
			changeTab(val) {
				this.curTab = val;
			},
			toggleShow() {
				this.isShow = !this.isShow;
			},
			link(code) {
				if (!code || code == '') return false;
				uni.navigateTo({
					url: `${this.$paths.STOCK_OVERVIEW}?code=${code}`
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
			changeTab(val) {
				this.getList();
			},
			async getList1() {
				// uni.showLoading({
				// 	title: this.$lang.REQUEST_DATA,
				// });
				const result = await this.$http.get(`api/goods/top2`, {
					current: this.curTab
				})
				if (!result || result.length <= 0) return false;
				this.list = result
				console.log(this.list)
				// this.connect(); // 启动 websocket链接
			},
			async getList() {
				this.list = [];
				// uni.showLoading({
				// 	title: this.$lang.REQUEST_DATA,
				// });
				const result = await this.$http.get(`api/goods/top2`, {
					current: 2
				})
				uni.stopPullDownRefresh()
				if (!result || result.length <= 0) return false;
				this.list = result
				console.log(this.list)
				// this.connect(); // 启动 websocket链接
			},

			// 设置样式
			setStyle(val, w = 120) {
				return {
					width: `${w}rpx`,
					padding: `12rpx 32rpx`,
					color: val ? '#FFFFFF' : '#CBCBCB',
					textAlign: 'center',
					fontSize: `36rpx`,
					fontWeight: `700`,
					borderBottom: `4rpx solid ${val? '#FFFFFF' :this.$theme.TRANSPARENT }`
				}
			},
			linkStock() {
				this.changeTab(1);
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

	.marBox {
		padding-top: 52px
	}

	.nav-box {
		height: 52px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		position: fixed;
		width: 100%;
		left: 0;
		top: 54px;
		background: #f7f9f8;
		box-sizing: border-box;
		z-index: 10
	}

	.nav-box .nav-item {
		width: calc(33.3333333333% - 22px);
		margin: 0 11px;
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
		font-size: 11px;
		color: #e4013e
	}

	.nav-box .active {
		background: #e4013e;
		color: #fff
	}

	.home-menu {
		height: 190px;
		background: #fff;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-wrap: wrap;
		flex-wrap: wrap;
		padding: 4px 5px 10px 5px
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

	.box {
		margin-top: 12px;
		background: #fff
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
		color: #e04e50
	}

	.box .box-item .red span {
		color: #e04e50
	}

	.item {
		background: #fff;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-wrap: wrap;
		flex-wrap: wrap;
		padding: 4px 5px 10px 5px
	}

	.item .home-menu-item {
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

	.item .home-menu-item .home-menu-item-title {
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

	.item .home-menu-item .home-menu-item-title span {
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

	.item .home-menu-item .home-menu-item-title img {
		width: 15px;
		height: 15px;
		margin-left: 6px
	}

	.item .home-menu-item .home-menu-item-tip1 {
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

	.item .home-menu-item .home-menu-item-tip1 span {
		font-weight: 400;
		font-size: 8px
	}

	.item .home-menu-item .home-menu-item-tip2 {
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

	.item .home-menu-item .home-menu-item-tip2 img {
		width: 10px;
		height: 10px;
		margin-left: 5px
	}

	.item .green {
		background: url(/static/img/green.290586a0.png);
		background-position: bottom;
		background-repeat: no-repeat;
		background-size: 100%;
		background-color: #e9f2dd
	}

	.item .green .home-menu-item-tip1 span {
		color: #37927d
	}

	.item .red {
		background: url(/static/img/red.7825f33b.png);
		background-position: bottom;
		background-repeat: no-repeat;
		background-size: 100%;
		background-color: #f7d9da
	}

	.item .red .home-menu-item-tip1 span {
		color: #e04e50
	}

	.item .item-btn {
		width: calc(33.3333333333% - 5px);
		height: 77px;
		border: 0.5px solid #eceded;
		margin: 5px 2px;
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

	.item .item-btn img {
		width: 19px;
		height: 19px
	}
</style>