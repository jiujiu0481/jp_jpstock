<template>
	<view>
		<template v-if="!list || list.length<=0">
			<EmptyData></EmptyData>
		</template>
		<template v-else>
			<block v-for="(item,index) in list" :key="index">
				<view style="border-bottom: 1px solid #E5E5E5;padding-top: 28rpx;">
					<view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
						<view :style="{color:$theme.LOG_VALUE}" style="font-size: 36rpx;flex:70%;">{{item.goods.name}}
						</view>
						<template v-if="item.status==2">
							<!-- @click="subscription(item.id)" -->
							<view :style="setStyle()">{{$lang.TRADE_IPO_SUCCESS_SUB}}
							</view>
						</template>
					</view>

					<view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
						<view :style="{color:$theme.LOG_LABEL}">
							{{$lang.TRADE_IPO_SUCCESS_PRICE}}
						</view>
						<view style="font-size: 36rpx;" :style="{color:$theme.PRIMARY}">
							{{$util.formatMoney(item.price)+` ${$lang.CURRENCY_UNIT}`}}
						</view>
					</view>
					<view style="border-radius: 12rpx;background-color: #F7F9FF;padding:20rpx;margin-bottom: 28rpx;">
						<view
							style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
							<view :style="{color:$theme.LOG_LABEL}">申し込み数量</view>
							<view style="font-size: 32rpx;" :style="{color:$theme.LOG_VALUE}">
								{{$util.formatNumber(item.apply_amount)+` ${$lang.QUANTITY_UNIT}`}}
							</view>
						</view>
						<view
							style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
							<view :style="{color:$theme.LOG_LABEL}">
								{{$lang.TRADE_IPO_SUCCESS_QUANTITY}}
							</view>
							<view style="font-size: 32rpx;" :style="{color:$theme.LOG_VALUE}">
								{{$util.formatNumber(item.success)+` ${$lang.QUANTITY_UNIT}`}}
							</view>
						</view>
						
						<view
							style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
							<view :style="{color:$theme.LOG_LABEL}">
								支払金額
							</view>
							<view style="font-size: 32rpx;" :style="{color:$theme.LOG_VALUE}">
								{{$util.formatMoney(item.success*item.price)}}
							</view>
						</view>
						<view
							style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
							<view :style="{color:$theme.LOG_LABEL}">支払い済み金額 </view>
							<view style="font-size: 36rpx;" :style="{color:$theme.PRIMARY}">
								{{$util.formatMoney(item.freeze)}}
							</view>
						</view>
						<view
							style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
							<view :style="{color:$theme.LOG_LABEL}"> 未支払い金額 </view>
							<view style="font-size: 36rpx;" :style="{color:$theme.PRIMARY}">
								{{$util.formatMoney(((item.price*1*item.success)-item.freeze*1).toFixed(2))}}
							</view>
						</view>
						<view
							style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
							<view :style="{color:$theme.LOG_LABEL}">取引番号</view>
							<view style="font-size: 24rpx;" :style="{color:$theme.LOG_VALUE}">
								{{item.order_sn}}
							</view>
						</view>
						<view
							style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
							<view :style="{color:$theme.LOG_LABEL}">取引日</view>
							<view style="font-size: 24rpx;" :style="{color:$theme.LOG_VALUE}">
								{{item.created_at}}
							</view>
						</view>
					</view>
				</view>
			</block>
		</template>
	</view>
</template>

<script>
	import EmptyData from '@/components/EmptyData.vue';
	export default {
		name: 'SuccessRecord',
		components: {
			EmptyData,
		},
		data() {
			return {
				list: [],
			};
		},
		created(option) {
			this.getList()
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
			async getList() {
				uni.showLoading({
					title: this.$lang.REQUEST_DATA,
				});
				const result = await this.$http.get(`api/goodsscramble/userSuccessLog`);
				console.log(result);
				this.list = result || [];
			},

			// async subscription(id) {
			// 	const result = await this.$http.post(`api/goods-shengou/pay`, {
			// 		id
			// 	});
			// 	console.log('result:', result);
			// 	// if (result.code == 0) {
			// 	// 	uni.$u.toast(result.message);
			// 	// 	if (result.success == 0) {
			// 	// 		setTimeout(() => {
			// 	// 			this.$util.linkCustomerService();
			// 	// 		}, 500)
			// 	// 	} else {
			// 	// 		uni.redirectTo({
			// 	// 			url: TRADE_IPO_SUCCESS,
			// 	// 		});
			// 	// 		this.$router.go(0)
			// 	// 	}
			// 	// } else {
			// 	// 	uni.$u.toast(result.message || this.$lang.API_HTTP_ERROR);
			// 	// }
			// },
		},
	}
</script>