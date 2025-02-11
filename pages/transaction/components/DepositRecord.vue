<template>
	<view>
		<template v-if="!list || list.length<=0">
			<EmptyData img="search"></EmptyData>
		</template>
		<block v-for="(item,index) in list" :key="index">
			<view style="padding: 10px;">
				<view
					style="border-radius: 10px;box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;font-size: 12px;padding: 10px 5px;">
					<view class="flex">
						<view class="bold flex-1" style="padding: 10px 15px;">
							<view>入金額</view>
							<view style="padding:10px 0px ;font-size: 16px;">+{{$util.formatMoney(item.money)}}</view>
						</view>
						<template v-if="item.status==2">
							<view class="text-center"
								style="color:#fff;padding:4rpx 16rpx;background-color: #585b58;width: 50px;margin: 10px;border-radius: 5px;"
								@click="handleCancel(item.id)">
								{{$lang.BTN_CANCEL}}
							</view>
						</template>
						<template v-else-if="item.status==0">
							<view class="text-center"
								style="color:#fff;padding:4rpx 16rpx;background-color:#585b58;width: 90px;margin: 10px;border-radius: 5px;"
								@click="handleService()">
								チャージ完了
							</view>
						</template>
					</view>



					<view style="border-radius: 28rpx;line-height: 1.8;margin:0 20px 20px 20px;">
						<!-- <view style="text-align: right;" :style="{color:$theme.RISE}">
					{{item.desc_type}}
				</view> -->
						<!-- <view style="display: flex;align-items: center;justify-content: space-between;">
					<view :style="{color:$theme.LOG_LABEL}">
						{{$lang.LOG_TRADE_DW}}
					</view>
					<view :style="{color:$theme.PRIMARY}" style="font-size: 18px;">
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

						<!-- <view style="display: flex;align-items: center;justify-content: space-between;">
					<view style="flex:6%;">
						<image :src="item.icon" :style="$theme.setImageSize(24)"></image>
					</view>
					<text style="flex:97%;white-space:pre-wrap;" :style="{color:item.color}">{{item.text}}</text>
				</view> -->
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import EmptyData from '@/components/EmptyData.vue';
	export default {
		name: "DepositRecord",
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
			async getList() {
				uni.showLoading({
					title: this.$lang.API_DATA_SUBMIT,
				});
				const result = await this.$http.get(`api/user/recharge`);
				this.list = result || [];
			},
		}
	}
</script>

<style>

</style>