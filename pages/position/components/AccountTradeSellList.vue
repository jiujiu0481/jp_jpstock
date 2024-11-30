<template>
	<view>
		<template v-if="list && list.length<=0">
			<EmptyData></EmptyData>
		</template>

		<template v-else>
			<block v-for="(item,index) in list" :key="index">
				<view class="common_block" style="padding:30rpx;background-color: #F7F9FF;border-radius: 8rpx;"
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
							<view class="bold" style="font-size: 18px;"
								:style="{color:$theme.setStockRiseFall(item.sellProfitRate*1>0)}">
								{{$util.formatMoney(item.sellProfit*1)+` ${$lang.CURRENCY_UNIT}`}}
							</view>
						</view>
					</view>

					<view :style="item.typeId==1?'background-color:antiquewhite;':'background-color: aqua;'"
						style="width: 10%;text-align: center;font-size: 12px;" class="padding-5 ">
						{{item.typeId==1?'JPY':'USD'}}
					</view>

					<view style="display: flex;align-items: center;justify-content: space-between;padding-top: 20rpx;">
						<view :style="{color:$theme.LOG_LABEL}">利益率</view>
						<view :style="{color:$theme.setStockRiseFall(item.sellProfitRate*1>0)}">
							{{$util.formatNumber(item.sellProfitRate,2)}}%
						</view>
					</view>

					<view style="display: flex;align-items: center;justify-content: space-between;padding-top: 10rpx;">
						<view :style="{color:$theme.LOG_LABEL}">購入数量</view>
						<text :style="{color:$theme.LOG_VALUE}">
							{{$util.formatNumber(item.buyQTY)+` ${$lang.QUANTITY_UNIT}`}}
						</text>
					</view>

					<view style="display: flex;align-items: center;justify-content: space-between;padding-top: 10rpx;">
						<view :style="{color:$theme.LOG_LABEL}">購入総額</view>
						<text :style="{color:$theme.LOG_VALUE}">
							{{$util.formatMoney(item.total)+` ${$lang.CURRENCY_UNIT}`}}</text>
					</view>

					<view style="display: flex;align-items: center;justify-content: space-between;padding-top: 10rpx;">
						<view :style="{color:$theme.LOG_LABEL}">購入価格</view>
						<text :style="{color:$theme.LOG_VALUE}">
							{{$util.formatMoney(item.buyPrice)+` ${$lang.CURRENCY_UNIT}`}}</text>
					</view>

					<view style="display: flex;align-items: center;justify-content: space-between;padding-top: 10rpx;">
						<view :style="{color:$theme.LOG_LABEL}">販売価格</view>
						<text :style="{color:$theme.LOG_VALUE}">
							{{$util.formatMoney(item.sellPrice)+` ${$lang.CURRENCY_UNIT}`}}</text>
					</view>

					<view style="display: flex;align-items: center;justify-content: space-between;padding-top: 10rpx;">
						<view :style="{color:$theme.LOG_LABEL}">販売時間</view>
						<text :style="{color:$theme.LOG_VALUE}">
							{{item.sellCT}}</text>
					</view>
				</view>
			</block>
		</template>
		<template v-if="isShow">
			<AccountTradeSellInfo :info="itemInfo" @action="handleClose"></AccountTradeSellInfo>
		</template>
	</view>
</template>

<script>
	import CustomTitle from '@/components/CustomTitle.vue';
	import EmptyData from '@/components/EmptyData.vue';
	import AccountTradeSellInfo from './AccountTradeSellInfo.vue';
	export default {
		name: 'AccountTradeSellList',
		components: {
			CustomTitle,
			EmptyData,
			AccountTradeSellInfo,
		},
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				// list: [], // 持有列表
				isShow: false, // 是否显示弹层
				itemInfo: {}, // 单条数据详情
			}
		},
		methods: {
			handleShowModal(item) {
				this.isShow = true;
				uni.hideTabBar(); // 隐藏tabBar
				this.itemInfo = item;
				console.log(this.itemInfo);
			},
			// 关闭弹层
			handleClose(val) {
				console.log('val:', val);
				this.isShow = false;
				uni.showTabBar(); // 显示tabBar
			},

			// async getSellList() {
			// 	uni.showLoading({
			// 		title: this.$lang.REQUEST_DATA,
			// 	});
			// 	const result = await this.$http.post(`api/user/order`, {
			// 		page: this.curPage,
			// 		status: 2, // 1持仓，2历史
			// 		gp_index: 0,
			// 	});
			// 	if (!result) return false;
			// 	console.log(`sell result:`, result);
			// 	this.maxPage = result.last_page; // 記錄最大頁碼
			// 	// 过滤保留合法数据
			// 	const temp = !result.data || result.data.length <= 0 ? [] :
			// 		result.data.filter(item => item.order_buy && item.order_buy.id > 0 &&
			// 			item.order_sell && item.order_sell.id > 0);

			// 	console.log('filter:', temp);

			// 	const tempList = temp.length <= 0 ? [] : temp.map(item => {
			// 		return {
			// 			name: item.goods_info.name,
			// 			// 盈利率计算： 盈利比=（卖出价 - 买入价） / 买入价 *100% 
			// 			profitRate: (item.order_sell.price * 1 - item.order_buy.price * 1) / item.order_buy
			// 				.price * 100,
			// 			profit: item.order_sell.yingkui, // 盈利额
			// 			buyNum: item.order_buy.num, // 购买数量

			// 			// totalPrice: item.order_sell.price * 1 * item.order_buy.num, // 

			// 			totalPrice: item.order_buy.price * 1 * item.order_buy.num, // 购买总价
			// 			buyPrice: item.order_buy.price, // 买入单价
			// 			sellPrice: item.order_sell.price, // 卖出单价

			// 			// currentPrice: item.goods_info.current_price, // 最新价格
			// 			// 弹层所需数据
			// 			buyCreateTime: item.order_buy.created_at,
			// 			double: item.order_buy.double,
			// 			sellFee: item.order_sell.sell_fee,
			// 			amount: item.order_buy.amount,
			// 			code: item.goods_info.number_code,
			// 			id: item.id,
			// 			typeId: item.goods_info.project_type_id,
			// 			sellCreateTime: item.order_sell.created_at,
			// 			floatProfit: item.order_sell.float_yingkui * 1, // 浮动盈亏
			// 		}
			// 	});
			// 	if (tempList.length > 0) {
			// 		this.list.push(...tempList);
			// 	}
			// 	console.log(this.list, this.list.length);
			// },
		},
	}
</script>

<style>
</style>