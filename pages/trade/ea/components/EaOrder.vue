<template>
	<view style="padding: 10px;background-color: #FFFFFF;min-height: 100vh;">
		<EmptyData v-if="list.length<=0"></EmptyData>
		<block v-for="(item,index) in list" :key="index">
<<<<<<< HEAD
			<view style="margin:20rpx 10rpx;padding: 20rpx; background-color: #FFFFFF;border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;">
=======
			<view
				style="margin:20rpx 10rpx;padding: 20rpx; background-color: #FFFFFF;border-radius: 6px; background-image: url(/static/sakura.png); background-position:top  right; background-repeat: no-repeat; background-size: 40%;box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);">
>>>>>>> e0e038695daddae3de796d5b9a7ee826e37c6889
				<!-- <TradeStockItem :item="item" @action="handleDetail"></TradeStockItem> -->
				<view style="display: flex;align-items: center;justify-content: space-between;line-height: 2.4;">
					<view style="flex:80%;">
						<view style="padding-left: 10px;font-size: 28rpx;color:#f24a3d;">
							{{item.goodname}}
						</view>
					</view>

					<template v-if="item.status==1">
						<view class="access_btn" @click="handleDetail(item.id)"
							style="padding:6rpx 24rpx;margin:0;font-size: 28rpx;line-height: 1.4;">
							{{$lang.BTN_SELL}}
						</view>
					</template>
				</view>

				<view
					style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;color:#8f8f8f;">
					<view>購入数量</view>
					<view style="color:#121212;">{{$util.formatNumber(item.price)}} </view>
				</view>

				<view
					style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;color:#8f8f8f;">
					<view>保有期間 </view>
					<view style="color:#121212;"> {{item.zhouqi+` Day`}} </view>
					<view>収益率 </view>
					<view style="color:#121212;">{{item.fudu+` %`}} </view>
				</view>

				<!-- <view
					style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;color:#8f8f8f;">
					<view>{{$lang.TRADE_EA_ORDER_SN}}</view>
					<view style="color:#121212;">{{item.ordersn}} </view>
				</view> -->

				<!-- <view
					style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;color:#8f8f8f;">
					<view>{{$lang.TRADE_EA_ORDER_LEVER}}</view>
					<view style="color:#121212;">{{item.ganggan}} </view>
				</view> -->

				<!-- <view
					style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;color:#8f8f8f;">
					<view>{{$lang.TRADE_EA_ORDER_RATE}}</view>
					<view style="color:#121212;">{{item.fudu+` %`}} </view>
				</view> -->

				<view
					style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;color:#8f8f8f;">
					<view>購入日 </view>
					<view style="color:#121212;">{{item.cretime}} </view>
				</view>

				<view
					style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;color:#8f8f8f;">
					<view>決済日 </view>
					<view style="color:#121212;">{{item.endtime}} </view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import EmptyData from '@/components/EmptyData.vue';
	export default {
		name: 'EaOrder',
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
			async handleDetail(id) {
				const result = await uni.showModal({
					title: '',
					content: this.$lang.TRADE_EA_MODAL_CONTENT,
					cancelText: this.$lang.BTN_CANCEL,
					confirmText: this.$lang.BTN_CONFIRM,
					confirmColor: this.$theme.PRIMARY,
					cancelColor: '#999999',
				});
				console.log('异步弹层:', result);
				if (result[1].confirm) {
					this.handleSell(id);
				}
			},
			async handleSell(id) {
				uni.showLoading({
					title: this.$lang.API_DATA_SUBMIT,
				});
				const result = await this.$http.post(`api/jijin/buy`, {
					id
				});
				if (!result) return false;
				uni.showToast({
					title: result,
					icon: 'none'
				});
				this.getList();
			},

			async getList() {
				uni.showLoading({
					title: this.$lang.REQUEST_DATA,
				});
				const result = await this.$http.get(`api/jijin/list`);
				console.log(result);
				this.list = result.order || [];
			}
		}
	}
</script>

<style>
</style>