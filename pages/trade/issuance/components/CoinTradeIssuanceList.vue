<template>
	<view>
		<view >
			<EmptyData v-if="list.length<=0"></EmptyData>
			<block v-for="(item,index) in list" :key="index">
				<view >

					<view style="background-color: #f6f8fc;padding: 15px 15px;border-radius: 10px;margin-top: 10px;background-image: url(/static/sakura.png); background-position:top  right; background-repeat: no-repeat; background-size: 40%;">

						<view style="display: flex;align-items: center;justify-content: space-between;margin: 10px 4px;"  >
							<view
								style="font-size: 18px;width: 120px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
								{{item.name}}</view>
							<view style="color: #f3564aaa;">{{item.code}}</view>
						</view>
						<view
							style="font-size: 20px;color: #f3564a;display: flex;align-items: center;justify-content: right;margin: 10px 4px;">
							{{$util.formatMoney(item.price)+` ${$lang.CURRENCY_UNIT}`}}</view>

						<template v-if="item.shengou_date">
							<view
								style="display: flex;align-items: center;justify-content: space-between;margin-top:4px;margin: 10px 4px;">
								<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_IPO_SUB_CT}}</view>
								<view :style="{color:$theme.LOG_VALUE}">{{item.shengou_date}}</view>
							</view>
						</template>
						<view style="background-color: #f3564a;padding: 5px 20px;border-radius: 10px;color: #fff;display: flex;align-items: center;justify-content: center;"
							@click="handleDetail(item)">{{$lang.BTN_BUY}}</view>
					</view>




					<!-- 	<view style="display: flex;align-items: center;">
						<view style="flex:6%">
							<CustomLogo :logo="item.logo" :name="item.name"></CustomLogo>
						</view>
						<view style="flex:94%;">
							<view style="padding-left: 10px;font-size: 36rpx;color:#121212;">
								{{item.name}}
							</view>
							<view style="display: flex;align-items: center;">
								<text style="font-size: 28rpx;padding-left: 10px;flex:70%"
									:style="{color:$theme.LOG_LABEL}">{{item.code}}</text>
								<view :style="setStyle()" @click="handleDetail(item)">
									{{$lang.BTN_BUY}}
								</view>
							</view>
						</view>
					</view>

					<view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
						<view :style="{color:$theme.LOG_LABEL}">
							{{$lang.TRADE_LARGE_PRICE}}
						</view>
						<view style="font-size: 36rpx;" :style="{color:$theme.PRIMARY}">
							{{$util.formatMoney(item.price)+` ${$lang.CURRENCY_UNIT}`}}
						</view>
					</view> 
				 <view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
						<view :style="{color:$theme.LOG_LABEL}">
							{{$lang.TRADE_IPO_POST_QTY}}
						</view>
						<view style="font-size: 36rpx;" :style="{color:$theme.LOG_VALUE}">
							{{$util.formatNumber(item.fa_amount*1)+` ${$lang.QUANTITY_UNIT}`}}
						</view>
					</view> 
					<view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
						<view :style="{color:$theme.LOG_LABEL}">
							{{$lang.TRADE_LARGE_MIN_QTY}}
						</view>
						<view style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">
							{{item.min_num*1+` ${$lang.QUANTITY_UNIT}`}}
						</view>
					</view> 
				 <view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
						<view :style="{color:$theme.LOG_LABEL}">
							{{$lang.TRADE_LARGE_MAX_QTY}}
						</view>
						<view style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">
							{{item.max_num*1+` ${$lang.QUANTITY_UNIT}`}}
						</view>
					</view> -->


				</view>
			</block>
		</view>

		<template v-if="isShow">
			<TradeIssuanceBuy :info="itemInfo" @action="handleClose"></TradeIssuanceBuy>
		</template>
	</view>
</template>

<script>
	import CustomLogo from '@/components/CustomLogo.vue';
	import TradeIssuanceBuy from './TradeIssuanceBuy.vue';
	export default {
		name: 'TradeIssuanceList',
		components: {
			CustomLogo,
			TradeIssuanceBuy,
		},
		data() {
			return {
				list: [],
				isShow: false, // 是否显示弹层
				itemInfo: {}, // 单条数据详情
			}
		},

		created() {
			this.getList();
		},
		methods: {
			setStyle() {
				return {
					...this.$theme.LG_PRIMARY,
					color: '#FFFFFF',
					borderRadius: `8rpx`,
					minWidth: `60rpx`,
					padding: `8rpx 16rpx`,
					fontSize: `24rpx`,
					textAlign: `center`,
				}
			},
			// 不跳页面，按钮弹层，二次确认购买
			handleDetail(val) {
				console.log('val:', val);
				this.isShow = true;
				this.itemInfo = val;
				// this.curId = val;
				// this.show = true;
			},
			// 关闭弹层
			handleClose(val) {
				console.log('val:', val);
				this.isShow = false;
			},

			async getList() {
				this.list = []; // 请求前清除数据。
				const result = await this.$http.get(`api/goods-scramble/calendar`, {
					type: 2, // 传参 1或2
				})
				console.log(result);
				// 过滤掉不合格数据，当前以【gid】字段来判定。
				const temp = !result || result.filter(item => item.gid && item.gid > 0);
				this.list = !temp || temp.length <= 0 ? [] : temp.map(item => {
					return {
						id: item.id,
						logo: item.goods.logo,
						name: item.goods.name,
						code: item.goods.code,
						price: item.goods.current_price,
						shengou_date: item.shengou_date,
						fa_amount: item.fa_amount,
						min_num: item.min_num,
						max_num: item.max_num,
					}
				});
			},
		}
	}
</script>