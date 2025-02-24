<template>
	<view>
		<template v-if="!list || list.length<=0">
			<EmptyData img="search"></EmptyData>
		</template>
		<template v-else>
			<block v-for="(item,index) in list" :key="index">
				<view style="background-image: url(/static/sakura.png); background-position:top  right; background-repeat: no-repeat; background-size: 40%;">
					<view class="text-center" style="padding: 10px 20px;">
						<view style="background-color: #09d2a0;width: 70px;border-radius: 5px;color: #fff;">{{item.zt}}
						</view>
						<!-- <view>{{item.name}}</view> -->
					</view>
					<view class="bold" style="padding: 0px 20px;">
						<view>{{$lang.TRADE_DAY_BUY_AMOUNT}}</view>
						<view style="margin-top: 5px;">{{$util.formatMoney(item.money)}}</view>
					</view>
					<view style="margin:24rpx;padding: 20rpx; background-color: #f6f8fc;border-radius: 28rpx;">
						<!-- <view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
						<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_DAY_ORDER_STATUS}}</view>
						<view style="font-size: 28rpx;" :style="{color:$theme.PRIMARY}">
							{{item.zt}}
						</view>
					</view> -->

						<view
							style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
							<view :style="{color:$theme.LOG_LABEL}">
								{{$lang.TRADE_DAY_BUY_PRICE}}
							</view>
							<view style="font-size: 36rpx;" :style="{color:$theme.LOG_VALUE}">
								{{$util.formatMoney(item.price)}}
							</view>
						</view>

						<!-- 
					<view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
						<view :style="{color:$theme.LOG_LABEL}">
							{{$lang.TRADE_DAY_BUY_AMOUNT}}
						</view>
						<view style="font-size: 36rpx;" :style="{color:$theme.LOG_VALUE}">
							{{$util.formatMoney(item.money)}}
						</view>
					</view> -->
						<view
							style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
							<view :style="{color:$theme.LOG_LABEL}">
								{{$lang.TRADE_DAY_SUCCESS_AMOUNT}}
							</view>
							<view style="font-size: 36rpx;" :style="{color:$theme.LOG_VALUE}">
								{{$util.formatMoney(item.success)}}
							</view>
						</view>
						<view
							style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
							<view :style="{color:$theme.LOG_LABEL}">
								{{$lang.TRADE_DAY_ORDER_SN}}
							</view>
							<view style="font-size: 24rpx;" :style="{color:$theme.LOG_VALUE}">
								{{item.ordersn}}
							</view>
						</view>
						<view
							style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
							<view :style="{color:$theme.LOG_LABEL}">
								{{$lang.TRADE_DAY_CREATE_TIME}}
							</view>
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
		name: 'ApprovalRecord',
		components: {
			EmptyData,
		},
		data() {
			return {
				list: [],
			}
		},
		created() {
			this.getList();
		},
		methods: {
			// 申请列表
			async getList() {
				uni.showLoading({
					title: this.$lang.REQUEST_DATA,
				});
				const result = await this.$http.get(`api/rinei/order_list`);
				this.list = !result || result.length <= 0 ? [] : result;
			},
		}
	}
</script>

<style>
</style>