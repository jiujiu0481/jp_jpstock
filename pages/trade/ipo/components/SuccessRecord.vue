<template>
	<view>
		<template v-if="!list || list.length<=0">
			<EmptyData img="search"></EmptyData>
		</template>
		<template v-else>
			<block v-for="(item,index) in list" :key="index">
<<<<<<< HEAD
				<view style="border-bottom: 1px solid #E5E5E5;padding-top: 28rpx;box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;padding: 15px;font-size: 14px;margin: 10px;border-radius: 6px;">
						<view class="bold">{{item.goods.name}}</view>
					<view style="display: flex;align-items: center;line-height: 1.8;margin-top: 10px;" class="gap10">
						<template v-if="item.status==2">
							<view  style="background-color: #db2129;border-radius: 5px;"  :style="setStyle()" @click="subscription(item.id)">{{$lang.TRADE_IPO_SUCCESS_SUB}}
=======
				<view
					style="border-bottom: 1px solid #E5E5E5;padding-top: 28rpx;box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;padding: 15px;font-size: 14px;background-image: url(/static/sakura.png); background-position:top  right; background-repeat: no-repeat; background-size: 40%;margin: 10px;border-radius: 6px;">
					<view class="bold">{{item.goods.name}} <text
							style="display: inline-block;background-color: #ec4d78;padding:4px 8px;margin-left: 12px;border-radius: 6px;color: #E5E5E5;">{{item.goods.code}}</text>
					</view>
					<view style="display: flex;align-items: center;line-height: 1.8;margin-top: 10px;" class="gap10">
						<template v-if="item.status==2">
							<view style="background-color: #f3564aaa;" :style="setStyle()"
								@click="subscription(item.id)">{{$lang.TRADE_IPO_SUCCESS_SUB}}
>>>>>>> e0e038695daddae3de796d5b9a7ee826e37c6889
							</view>
						</template>

					</view>

					<view class="flex flex-b" style="margin-top: 10px;">
						<view>当選価格</view>
						<view>{{$util.formatMoney(item.price)}}</view>
					</view>

					<view class="flex flex-b" style="margin-top: 10px;">
						<view>{{$lang.TRADE_IPO_SUCCESS_QUANTITY}}</view>
						<view>{{$util.formatNumber(item.success)}}</view>
					</view>
					<view class="flex flex-b" style="margin-top: 10px;">
						<view>購入価格</view>
						<view>{{$util.formatMoney(item.success_num_amount)}}</view>
					</view>
					<view class="flex flex-b" style="margin-top: 10px;">
						<view> 支払い済み金額</view>
						<view>{{$util.formatMoney(item.freeze)}}</view>
					</view>
					<view class="flex flex-b" style="margin-top: 10px;">
						<view> 未支払い金額</view>
						<view>{{$util.formatMoney((item.success_num_amount*1-item.freeze*1).toFixed(2))}}</view>
					</view>

					<view class="flex flex-b" style="margin-top: 10px;">
						<view>上場日</view>
						<view>{{item.goods_shengou.online_date}}</view>
					</view>

					<view class="flex flex-b" style="margin-top: 10px;">
						<view>取引番号</view>
						<view>{{item.order_sn}}</view>
					</view>

					<view class="flex flex-b" style="margin-top: 10px;">
						<view>{{$lang.TRADE_IPO_SUCCESS_CT}}</view>
						<view>{{item.created_at}}</view>
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
					// ...this.$theme.LG_PRIMARY,
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
				const result = await this.$http.get(`api/goods-shengou/user-success-log`);
				console.log(result);
				this.list = result || [];
			},

			async subscription(id) {
				const result = await this.$http.post(`api/goods-shengou/pay`, {
					id
				});
				console.log('result:', result);
				// if (result.code == 0) {
				// 	uni.$u.toast(result.message);
				// 	if (result.success == 0) {
				// 		setTimeout(() => {
				// 			this.$util.linkCustomerService();
				// 		}, 500)
				// 	} else {
				// 		uni.redirectTo({
				// 			url: TRADE_IPO_SUCCESS,
				// 		});
				// 		this.$router.go(0)
				// 	}
				// } else {
				// 	uni.$u.toast(result.message || this.$lang.API_HTTP_ERROR);
				// }
			},
		},
	}
</script>