<template>
	<view class="page_bg">
		<view class="header">
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<view class="nav-item" :class="inv==0?'active':''" @click="dianji(0)"
					:style="{borderBottom:`4px solid ${inv===0?`#FFF`:$theme.TRANSPARENT}`}"
					style="font-size: 14px; color: rgb(255, 255, 255); padding-bottom: 3px; margin-right: 24px;;">株式市場
				</view>
				<view class="nav-item" :class="inv==1?'active':''" @click="dianji(1)"
					:style="{borderBottom:`4px solid ${inv===1?`#FFF`:$theme.TRANSPARENT}`}"
					style="font-size: 14px; color: rgb(255, 255, 255); padding-bottom: 3px; margin-right: 24px;">オプション
				</view>
				<view class="nav-item" :class="inv==2?'active':''" @click="dianji(2)"
					:style="{borderBottom:`4px solid ${inv===2?`#FFF`:$theme.TRANSPARENT}`}"
					style="font-size: 14px; color: rgb(255, 255, 255); padding-bottom: 3px; margin-right: 24px;;">暗号市場
				</view>
				<!-- <img src="/static/logo.png" class="header-img"> -->
			</view>
			<view style="padding: 6px 10px;">
				<view style="display: flex;align-items: center; background-color: rgba(255,255,255,0.3);
					padding: 6px 12px;text-align: center; border-radius: 30px;" @click="$u.route({url:'/pages/search/index'});">
					<img src="/static/search.svg" draggable="false" :style="$theme.setImageSize(32)"
						style="background-position: center center; background-size: contain; background-repeat: no-repeat;"
						@click="$u.route({url:'/pages/search/index'});">
					<text style="font-size: 14px;padding-left: 8px;color: rgba(255, 255, 255, 0.3);">検索</text>
				</view>
			</view>
		</view>
		<view style="margin-top: 10px;" v-if="inv === 0 || inv === 1">
			<view
				style="display: flex;align-items: center;justify-content: space-around;background-color: #fff;padding-bottom: 20px;flex-wrap: wrap;">
				<view
					style=" padding: 16px 0px;  border-radius: 10px;text-align: center;box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;margin-top: 10px;"
					:style="{backgroundColor:item.rate>= 0 ?'#f9d9da':'#d9f2e7'}" @click="linkToStock(item.code)"
					v-for="(item,index) in list" :key="index" v-if="index<6">
					<view style="font-size: 14px;width: 110px;white-space: nowrap;overflow: hidden;">{{item.name}}
					</view>
					<view style="padding-top: 8px;">{{item.current_price}}</view>
					<view>{{$util.formatMoney(item.close*1,2)}}</view>
					<view style="margin-top: -6px;">
						<image style="transform: scaleX(-1);"
							:src="item.rate>=0?'/static/line_fall.png':'/static/line_rise.png'" mode="widthFix"
							:style="$theme.setImageSize(220)"></image>
					</view>
					<view
						style="display: flex;margin-top: -30px;font-size: 12px;align-items: center;justify-content: space-between;padding: 0  6px;">
						<view>{{item.code}}</view>
						<view>{{item.rate_num}}</view>
						<view>{{item.rate}}%</view>
					</view>
				</view>
			</view>

			<view style="display: flex;padding-top: 20rpx;padding-bottom: 12px;">
				<view style="margin-left: 28rpx; font-size: 14px; font-weight: 700;">ホットプレート</view>
			</view>
			<view class="box" style="margin:0 10px">
				<view v-for="(item,index) in list"
					style="background-color: #FFFFFF;border-radius: 6PX  6px  0 0 ;padding: 0 10px;margin: 6px 0;padding-bottom: 8px;border-bottom: 1px solid #979797;"
					@click="linkToStock(item.code)">
					<view
						style="display: flex; align-items: center;justify-content: space-between;margin: 4px 0;margin: 4px  0; ">
						<view style="font-size: 14px;">
							{{item.name}}
						</view>
					</view>
					<view
						style="display: flex; align-items: center; justify-content: space-between; margin: 4px 0;">
						<view style="display: flex;align-items: center;text-align: center;">
							<img style="margin-right: 6px;" :src="item.is_collected==1?$icon.ysc:$icon.sc"
								:style="$theme.setImageSize(38)" @click.stop="handleUnFollow(item.code)">
							<span style=" font-size: 14px;">{{item.code}}</span>
						</view>
						<view style="font-size: 14px;text-align:center;  margin-left: auto; padding-right: 20px;">
							{{item.close}}
						</view>
						<view
							style="text-align: right;font-size: 14px;padding: 6px 8px;box-sizing: border-box;width: 72px;border-radius: 6px;text-align: right;"
							:style="$theme.setStockRiseFallBG(item.rate>0)">
					
							<span>{{item.rate}}%</span>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view v-else-if="inv === 2">
			<view
				style="display: flex;align-items: center;justify-content: space-around;background-color: #fff;padding-bottom: 20px;margin-top: 10px;">
				<view
					style=" padding: 16px 0px;  border-radius: 10px;text-align: center;box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;"
					:style="{backgroundColor:item.rate>= 0 ?'#d9f2e7':'#f9d9da'}"
					@click="linkToCoin(item.code)" v-for="(item,index) in list" :key="index"
					v-if="index<3">
					<view style="font-size: 14px;">{{item.name}}</view>
					<view style="padding-top: 8px;">{{item.current_price}}</view>
					<view style="margin-top: -6px;">
						<image :src="item.rate>=0?'/static/line_rise.png':'/static/line_fall.png'" mode="widthFix"
							:style="$theme.setImageSize(220)"></image>
					</view>
					<view
						style="display: flex;margin-top: -30px;font-size: 12px;align-items: center;justify-content: space-between;padding: 0  6px;">
						<view>{{item.rate_num}}</view>
						<view>{{item.rate}}%</view>
					</view>
				</view>

			</view>
			<view style="padding-top: 16px;margin-left: 16px; font-size: 18px;font-weight: 900;">人気株111</view>
			<view style="margin: 0 10px;">
				<view v-for="(item,index) in list"
					style="background-color: #FFFFFF;border-radius: 6PX  6px  0 0 ;padding: 0 10px;margin: 6px 0;padding-bottom: 8px;border-bottom: 0.5px solid #97979799;"
					@click="linkToCoin(item.code)">
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<view style="display: flex;align-items: center;">
							<image :src="item.logo" :style="$theme.setImageSize(60)">
								<view style="padding-left: 10px;"> {{item.number_code}}</view>
						</view>
						<view style="display: flex;align-items: center;">
							<view style="padding-right: 20px;">{{item.current_price}}</view>
							<view
								style=" padding: 6px 12px;box-sizing: border-box;width: 72px;border-radius: 6px;text-align: right;"
								:style="$theme.setCoinRiseFall(item.rate>0)">
								<span>{{item.rate}}%</span>
							</view>
						</view>
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
				tabs: [`株式市場`, `オプション`],
				curTab: 0, // 当前默认放在Coin
				list: [],
				inv: 0,

			}
		},

		created() {
			this.getList();
			// this.getList1()
		},
		onPullDownRefresh() {
			this.getList();
		},
		 onLoad(options) {
		    // options 包含 URL 中的查询参数
		    this.inv = options.inv ? Number(options.inv) : 0; // 获取传递的 inv 参数
		  },
		mounted() {
		  this.linkToStock(); // 组件加载时跳转
		  this.linkToCoin();    // 组件加载时跳转
		},
		methods: {
			// changeTab(val) {
			// 	this.curTab = val;
			// 	if (this.curTab == 1) this.getData();
			// 	if (this.curTab == 0) this.getList();
			// 	this.inv = val;
			// },
			dianji(num) {
				this.inv = num
				if (num == 1) {
					this.getData();
				}
				if (num == 2) {
					this.getList1()
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

			toggleShow() {
				this.isShow = !this.isShow;
			},
			// 跳转到股票详情
			linkToStock(code) {
				if (!code || code == '') return false;
				uni.navigateTo({
					url: `${this.$paths.STOCK_OVERVIEW}?code=${code}`
				});
			},
			// 跳转到币详情
			linkToCoin(code) {
				if (!code || code == '') return false;
				uni.navigateTo({
					url: `${this.$paths.COIN_OVERVIEW}?code=${code}`
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

			async getList1() {
				// uni.showLoading({
				// 	title: this.$lang.REQUEST_DATA,
				// });
				const result = await this.$http.get(`api/goods/topbi`, {
					current: this.curTab
				})
				this.list = result
				// 对数据按 current_price 从高到低排序
				this.list.sort((a, b) => {
					return b.current_price - a.current_price; // 从高到低排序
				});
				if (!result || result.length <= 0) return false;
				this.list = result
				console.log(this.list1)
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
			setStyle(val) {
				return {
					padding: `12rpx 32rpx`,
					color: val ? '#FFFFFF' : '#f2463999',
					textAlign: 'center',
					fontSize: `32rpx`,
					fontWeight: `700`,
					// borderBottom: `4rpx solid ${!val? '#f2463999' :this.$theme.TRANSPARENT }`,
					backgroundColor: val ? `#f2463999` : this.$theme.TRANSPARENT,
					borderRadius: `12rpx 12rpx 0 0`,
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
		// background: #f7f9f8;
		// min-height: 100vh;
		box-sizing: border-box;
		padding-bottom: 67px
	}

	.marBox {
		padding-top: 52px
	}

	.nav-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 24rpx 0;
	}

	.nav-box .nav-item {
		width: calc(33.3333333333% - 22px);
		margin: 0 11px;
		height: 28px;
		// background: #fff;
		border-radius: 5px;
		border: 1px solid #f24639;
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
		color: #f24639
	}

	.nav-box .active {
		background: #f24639;
		color: #fff;
	}

	.home-menu {
		height: 190px;
		// background: #fff;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-wrap: wrap;
		flex-wrap: wrap;
		padding: 4px 5px 10px 5px
	}

	.home-menu .home-menu-item {
		width: calc(33.3333333333% - 5px);
		height: 90px;
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
		background-color: #f7d9da;
		// transform: scaleX(-1);

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