<template>
	<view>
		<EmptyData v-if="list.length<=0"></EmptyData>
		<block v-for="(item,index) in list" :key="index">
			<view style="padding: 5px 0px; background-image: url(/static/sakura.png); background-position:top  right; background-repeat: no-repeat; background-size: 40%;  "  >
				<view style="border-radius: 10px;box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;font-size: 12px;">
					
					<view style="padding:20rpx 15rpx;border-radius: 28rpx;line-height: 1.8;margin:0 20rpx 20rpx 20rpx;">
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<view :style="{color:$theme.LOG_LABEL}">
								取引収支
							</view>
							<view style="font-size: 28rpx;color: #e4013e;">
								{{$util.formatMoney(item.money*1)}}
							</view>
						</view>
						
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<view :style="{color:$theme.LOG_LABEL}">
								資産
							</view>
							<view style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">
								{{$util.formatMoney(item.after*1)}}
							</view>
						</view>
						
						<!-- <view style="display: flex;align-items: center;justify-content: space-between;">
							<view :style="{color:$theme.LOG_LABEL}">
								損益 評価
							</view>
							<view style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">
								{{$util.formatMoney(item.profit*1)}}
							</view>
						</view> -->
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<view :style="{color:$theme.LOG_LABEL}">
								変更前の残高
							</view>
							<view style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">
								{{$util.formatMoney(item.before)}}
							</view>
						</view>

						<!-- <view style="display: flex;align-items: center;justify-content: space-between;">
					<view :style="{color:$theme.LOG_LABEL}">
						{{$lang.LOG_TRADE_AMOUNT_BEFORE}}
					</view>
					<view style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">
						{{$util.formatMoney(item.before)}}
					</view>
				</view> -->

						<!-- <view style="display: flex;align-items: center;justify-content: space-between;">
					<view :style="{color:$theme.LOG_LABEL}">
						{{$lang.LOG_TRADE}}
					</view>
					<view style="font-size: 36rpx;" :style="{color:$theme.PRIMARY}">
						{{$util.formatMoney(item.money)}}
					</view>
				</view> -->
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<view :style="{color:$theme.LOG_LABEL}">{{$lang.LOG_TRADE_CREATE_TIME}}</view>
							<view :style="{color:$theme.LOG_VALUE}">
								{{item.created_at}}
							</view>
						</view>

						<view style="display: flex;align-items: center;justify-content: space-between;">
							<view :style="{color:$theme.LOG_LABEL}">詳細</view>
						</view>
						<view style="display: flex;align-items: center;">
							<view style="flex:30%;"></view>
							<text :style="{color:$theme.LOG_VALUE}"
								style="white-space:pre-wrap;text-align: right;">{{item.desc}}</text>
						</view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import EmptyData from '@/components/EmptyData.vue';
	export default {
		name: "TradeRecord",
		components: {
			EmptyData,
		},
		data() {
			return {
				list: [],
			};
		},
		computed: {},
		created() {
			this.getList()
		},
		methods: {
			async getList() {
				uni.showLoading({
					title: this.$lang.API_DATA_SUBMIT,
				});
				const result = await this.$http.get(`api/user/finance`);
				this.list = result || [];
			},
		}
	}
</script>

<style>

</style>