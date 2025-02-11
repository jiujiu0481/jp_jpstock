<template>
	<view>
		<EmptyData v-if="list.length<=0"></EmptyData>
		<block v-for="(item,index) in list" :key="index">
			<view style="padding: 5px 0px;">
				<view style="border-radius: 10px;box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;font-size: 12px;padding: 10px 5px;">
					<view class="flex">
						<view class="bold flex-1" style="padding: 10px 15px;">
							<view>出金額</view>
							<view style="padding:10px 0px ;font-size: 16px;">-{{$util.formatMoney(item.money)}}</view>
						</view>
						<template v-if="item.status==0">
							<view class="text-center"
								style="color:#fff;padding:6px 5px;background-color: #2D54AB;width: 70px;margin: 10px;border-radius: 5px;"
								@click="handleCancel(item.id)">
								{{$lang.BTN_CANCEL}}
							</view>
						</template>
						<template v-else-if="item.status==2">
							<view class="text-center"
								style="color:#fff;padding:4rpx 16rpx;background-color: #e4013e;width: 70px;margin: 10px;border-radius: 5px;"
								@click="handleService()">
								{{$lang.BTN_SEND_SERVICE}}
							</view>
						</template>
					</view>



					<view style="border-radius: 28rpx;line-height: 1.8;margin:0 20px 20px 20px;">
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<!-- <view :style="{color:item.status==2?'#2D54AB': $theme.RISE}">
						{{item.desc_type}}
					</view> -->
							<!-- <template v-if="item.status==0"> -->
							<!-- <view style="color:#FC4C76;margin-left: auto;padding:4rpx 16rpx;background-color: #FC4C7611;"
					@click="handleCancel(item.id)">
					{{$lang.BTN_CANCEL}}
				</view> -->
							<!-- </template> -->

							<!-- <template v-else-if="item.status==2"> -->
							<!-- <view style="color:#2D54AB;margin-left: auto;padding:4rpx 16rpx;background-color: #2D54AB11;"
					@click="handleService()">
					{{$lang.BTN_SEND_SERVICE}}
				</view> -->
							<!-- </template> -->
							<!-- <template v-else> -->
							<!-- <template v-if="item.text">
							<view :style="item.style"> {{item.text}} </view>
						</template> -->
							<!-- </template> -->
						</view>


						<!-- <view style="display: flex;align-items: center;justify-content: space-between;">
					<view :style="{color:$theme.LOG_LABEL}">{{$lang.LOG_WITHDRAW_AMOUNT}}</view>
					<view style="font-size: 36rpx;" :style="{color:$theme.PRIMARY}">
						{{$util.formatMoney(item.money)}}
					</view>
				</view> -->
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<view :style="{color:$theme.LOG_LABEL}">詳細</view>
							<view :style="{color:$theme.LOG_LABEL}">
								{{item.desc_type}}
							</view>
						</view>
						<view
							style="display: flex;align-items: center;justify-content: space-between;margin-top: 10px;">
							<view :style="{color:$theme.LOG_LABEL}">{{$lang.LOG_TRADE_ORDER_SN}}</view>
							<view :style="{color:$theme.LOG_LABEL}">
								{{item.order_sn}}
							</view>
						</view>
						<view
							style="display: flex;align-items: center;justify-content: space-between;margin-top: 10px;">
							<view :style="{color:$theme.LOG_LABEL}">{{$lang.LOG_TRADE_CREATE_TIME}}</view>
							<view :style="{color:$theme.LOG_LABEL}">
								{{item.created_at}}
							</view>
						</view>
						<template v-if="item.reason&&item.reason.length>0">
							<view style="display: flex;align-items: center;justify-content: space-between;">
								<view :style="{color:$theme.LOG_LABEL}">{{$lang.LOG_TRADE_DW_DESC}}</view>
								<view :style="{color:$theme.LOG_LABEL}">
									{{item.reason}}
								</view>
							</view>
						</template>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import EmptyData from '@/components/EmptyData.vue';
	export default {
		name: "CoinWithdrawalRecord",
		components: {
			EmptyData,
		},
		data() {
			return {
				list: [],
			};
		},
		created() {
			this.getList()
		},
		methods: {
			// 联系客服
			handleService() {
				this.$util.linkCustomerService();
			},

			// 取消提现
			async handleCancel(id) {
				const result = await uni.showModal({
					title: this.$lang.TRADE_LOG_TIP_MODAL_TITLE,
					cancelText: this.$lang.BTN_CANCEL,
					confirmText: this.$lang.BTN_CONFIRM,
					confirmColor: this.$theme.PRIMARY,
					cancelColor: this.$theme.MODAL_CANCEL,
				});
				console.log('异步弹层:', result);
				if (result[1].confirm) {
					this.cancelWithdraw(id);
				}
			},

			async cancelWithdraw(id) {
				uni.showToast({
					title: this.$lang.API_DATA_SUBMIT,
					icon: 'none',
				});
				const result = await this.$http.post(`api/app/qx`, {
					id
				});
				if (!result) return false;
				uni.showToast({
					title: this.$lang.API_POST_SUCCESS,
					icon: 'success'
				});
				this.getList();
			},
			async getList() {
				uni.showLoading({
					title: this.$lang.API_DATA_SUBMIT,
				});
				const result = await this.$http.get(`api/user/withdraw`);
				console.log(result);
				this.list = !result || result.length <= 0 ? [] : result;
				// this.list = !result || result.length <= 0 ? [] : result.map(item => {
				// 	return {
				// 		...item,
				// 		// ...this.$theme.setStatusPrimary(item.status),
				// 		// style: this.$theme.setStatusPrimary(item.status),
				// 	}
				// })
				console.log(this.list);
			},
		}
	}
</script>

<style>

</style>