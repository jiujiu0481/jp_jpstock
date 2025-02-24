<template>
	<view>
		<template v-if="!list || list.length<=0">
			<EmptyData></EmptyData>
		</template>
		<template v-else>
			<block v-for="(item,index) in list" :key="index">
				<view style="padding: 16px;margin-top: 16px; border-radius: 10px;box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;">
					<view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
						<view :style="{color:$theme.SECOND}" style="font-size: 36rpx;">{{item.goods.name}}</view>
						<template v-if="item.message &&item.message.length>0">
							<view :style="setStyle()"> {{item.message}} </view>
						</template>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
						<view :style="{color:$theme.LOG_LABEL}">
							{{$lang.TRADE_IPO_RECORD_PRICE}}
						</view>
						<view style="font-size: 36rpx;" :style="{color:$theme.PRIMARY}">
							{{$util.formatMoney(item.price)+` ${$lang.CURRENCY_UNIT}`}}
						</view>
					</view>
					<view style="border-radius: 12rpx;background-color: #F7F9FF;padding:20rpx;margin-bottom: 28rpx;">
						<view
							style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
							<view :style="{color:$theme.LOG_LABEL}">
								{{$lang.TRADE_IPO_RECORD_APPLY_AMOUNT}}
							</view>
							<view style="font-size: 32rpx;" :style="{color:$theme.LOG_VALUE}">
								{{$util.formatNumber(item.apply_amount)+` ${$lang.QUANTITY_UNIT}`}}
							</view>
						</view>
						<view style="display: flex;align-items: center;justify-content: space-between;margin-top:4px;">
							<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_IPO_RECORD_CREATETIME}}</view>
							<view :style="{color:$theme.TIP}">{{item.created_at}}</view>
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
				const result = await this.$http.get(`api/goodsscramble/userApplyLog`);
				console.log(result);
				this.list = result || [];
			},
		},
	}
</script>