<template>
	<view>
		<template v-if="!list || list.length<=0">
			<EmptyData></EmptyData>
		</template>

		<template v-else>
			<block v-for="(item,index) in list" :key="index">
				<view class="common_block" style="padding:30rpx;background-color: #F7F9FF;border-radius: 8rpx;"
					@tap="handleShowModal(item)">
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<view class="bold" style="font-size: 36rpx;line-height: 1.6;">
							{{item.name}}
						</view>
						<view>
							<view style="font-size: 10px;" :style="{color:$theme.LOG_LABEL}">
								{{$lang.TRADE_HOLD_LABEL_PROFIT_AMOUNT}}
							</view>
							<view class="bold" style="font-size: 18px;"
								:style="{color:$theme.setStockRiseFall(item.profitRate*1>0)}">
								{{$util.formatMoney(item.profit*1)+` ${$lang.CURRENCY_UNIT}`}}
							</view>
						</view>
					</view>
					<view :style="item.typeId==1?'background-color:antiquewhite;':'background-color: aqua;'"
						style="width: 10%;text-align: center;font-size: 12px;" class="padding-5 ">
						{{item.typeId==1?'JPY':'USD'}}
					</view>
					<view
						style="display: flex;align-items: center;justify-content: space-between;padding-top: 30rpx;line-height: 1.8;">
						<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_HOLD_LABEL_PROFIT_RATE}}</view>
						<view :style="{color:$theme.setStockRiseFall(item.profitRate*1>0)}">
							{{$util.formatNumber(item.profitRate1,2)}}%
						</view>
					</view>

					<!-- <view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
						<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_HOLD_LABEL_PROFIT_AMOUNT}}</view>
						<view :style="{color:$theme.setStockRiseFall(item.profitRate*1>0)}">
							{{$util.formatMoney(item.profit*1)+` ${$lang.CURRENCY_UNIT}`}}
						</view>
					</view> -->

					<view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
						<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_HOLD_LABEL_BUY_AMOUNT}}</view>
						<text :style="{color:$theme.LOG_VALUE}">
							{{$util.formatNumber(item.buyNum)+` ${$lang.QUANTITY_UNIT}`}}
						</text>
					</view>

					<view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
						<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_HOLD_LABEL_TOTAL_PRICE}}</view>
						<text :style="{color:$theme.LOG_VALUE}">
							{{$util.formatMoney(item.totalPrice)+` ${$lang.CURRENCY_UNIT}`}}</text>
					</view>

					<view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
						<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_HOLD_LABEL_BUY_PRICE}}</view>
						<text :style="{color:$theme.LOG_VALUE}">
							{{$util.formatMoney(item.buyPrice)+` ${$lang.CURRENCY_UNIT}`}}</text>
					</view>

					<view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
						<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_HOLD_LABEL_CUR_PRICE}}</view>
						<text :style="{color:$theme.LOG_VALUE}">
							{{$util.formatMoney(item.currentPrice)+` ${$lang.CURRENCY_UNIT}`}}</text>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
						<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_MODAL_BUY_TIME}}</view>
						<text :style="{color:$theme.LOG_VALUE}">
							{{item.buyCreateTime}}</text>
					</view>

				</view>
			</block>
		</template>

		<template v-if="isShow">
			<AccountTradeHoldInfo :info="itemInfo" @action="handleClose"></AccountTradeHoldInfo>
		</template>
	</view>
</template>

<script>
	import CustomTitle from '@/components/CustomTitle.vue';
	import EmptyData from '@/components/EmptyData.vue';
	import AccountTradeHoldInfo from './AccountTradeHoldInfo.vue';
	export default {
		name: 'AccountTradeHoldList',
		components: {
			CustomTitle,
			EmptyData,
			AccountTradeHoldInfo,
		},
		data() {
			return {
				list: [], // 持有列表
				isShow: false, // 是否显示弹层
				itemInfo: {}, // 单条数据详情
				curPage: 1, // 当前页码
				maxPage: 1, // 最大页码
			}
		},
		created() {
			this.getList();
		},
		methods: {
			handleShowModal(val) {
				this.isShow = true;
				uni.hideTabBar(); // 隐藏tabBar
				this.itemInfo = val;
			},
			// 关闭弹层
			handleClose(val) {
				console.log('val:', val);
				this.isShow = false;
				uni.showTabBar(); // 显示tabBar
				this.curPage = 1;
				this.list = [];
				this.getList();
			},

			async getList() {
				// uni.showLoading({
				// 	title: this.$lang.REQUEST_DATA,
				// });
				const result = await this.$http.post(`api/user/order`, {
					page: this.curPage,
					status: 1, // 1持仓，2历史
					gp_index: 0,
				});
				if (!result) return false;
				console.log(`hold result:`, result);
				this.maxPage = result.last_page; // 記錄最大頁碼
				// 过滤保留合法数据
				const temp = !result.data || result.data.length <= 0 ? [] :
					result.data.filter(item => item.order_buy && item.order_buy.id > 0);

				const tempList = temp.length <= 0 ? [] : temp.map(item => {
					return {
						name: item.goods_info.name,
						// 持仓盈利率 =（最终价 - 买入价） / 买入价 *100%
						profitRate: (item.current_price * 1 - item.order_buy.price * 1) /
							item.order_buy.price * 100,
							
						profitRate1: (item.goods_info.current_price * 1 - item.order_buy.price * 1) /
							item.order_buy.price * 100,
							
						profit: item.order_buy.yingkui, // 盈利额							
						buyNum: item.order_buy.num, // 购买数量							
						totalPrice: item.order_buy.price * 1 * item.order_buy.num, // 购买总价
						buyPrice: item.order_buy.price, // 买入单价
						currentPrice: item.goods_info.current_price, // 最新价格
						// 弹层所需数据
						buyCreateTime: item.order_buy.created_at,
						lever: item.order_buy.double,
						buyFee: item.order_buy.buy_fee,
						amount: item.order_buy.amount,
						code: item.goods_info.number_code,
						id: item.id,
						typeId: item.goods_info.project_type_id,
						floatProfit: item.order_buy.float_yingkui * 1, // 浮动盈亏
					}
				})
				if (tempList.length > 0) {
					this.list.push(...tempList);
				}
				console.log(this.list, this.list.length);
			},
		},
	}
</script>

<style>
</style>