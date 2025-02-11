<template>
	<view>
		<template v-if="!list || list.length<=0">
			<EmptyData img="search"></EmptyData>
		</template>
		<template v-else>
			<block v-for="(item,index) in list" :key="index">
				<view style="border-bottom: 1px solid #E5E5E5;padding-top: 28rpx;box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;padding: 15px;font-size: 14px;margin: 10px;border-radius: 6px;">
					<view :style="{color:$theme.SECOND}"  class="bold">{{item.goods.name}}</view>
					<view style="display: flex;align-items: center;line-height: 1.8;margin-top: 10px;" class="gap10">
						
						<template v-if="item.message &&item.message.length>0">
							<view style="background-color:#db2129 ;color: #fff;padding: 0px 10px;border-radius: 15px;" > {{item.message}} </view>
						</template>
						
						
					</view>
					
					<view class="flex flex-b" style="margin-top: 10px;">
						<view>購入価格</view>
						<view>{{$util.formatMoney(item.price)}}</view>
					</view>
					
					<view class="flex flex-b" style="margin-top: 10px;">
						<view>{{$lang.TRADE_IPO_RECORD_APPLY_AMOUNT}}</view>
						<view>{{$util.formatMoney(item.apply_amount)}}</view>
					</view>
					
					<view class="flex flex-b" style="margin-top: 10px;">
						<view>注文番号</view>
						<view>{{item.order_sn}}</view>
					</view>
					<view class="flex flex-b" style="margin-top: 10px;">
						<view>{{$lang.TRADE_IPO_RECORD_CREATETIME}}</view>
						<view>{{item.created_at}}</view>
					</view>

					<!-- <view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
						<view :style="{color:$theme.LOG_LABEL}">
							{{$lang.TRADE_IPO_RECORD_PRICE}}
						</view>
						<view style="font-size: 36rpx;" :style="{color:$theme.PRIMARY}">
							{{$util.formatMoney(item.price)+` ${$lang.CURRENCY_UNIT}`}}
						</view>
					</view> -->
				
				</view>
			</block>
		</template>
	</view>
</template>

<script>
	import EmptyData from '@/components/EmptyData.vue';
	export default {
		name: "ApplyRecord",
		components: {
			EmptyData,
		},
		data() {
			return {
				list: [],
			};
		},
		created() {
			this.getList();
		},
		methods: {
			setStyle() {
				return {
					// backgroundColor: this.$theme.RGBConvertToRGBA(this.$theme.PRIMARY, 9),
					color: this.$theme.PRIMARY,
					// borderRadius: `12rpx`,
					// minWidth: `60rpx`,
					// padding: `6rpx 16rpx`,
					fontSize: `26rpx`,
					// textAlign: `center`,
				}
			},
			async getList() {
				uni.showLoading({
					title: this.$lang.REQUEST_DATA,
				});
				const result = await this.$http.get(`api/goods-shengou/user-apply-log`);
				console.log(result);
				this.list = result || [];
			},
		},
	}
</script>