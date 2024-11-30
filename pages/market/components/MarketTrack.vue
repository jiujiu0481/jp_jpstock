<template>
	<view>
		
		<template v-if="list.length<=0">
			<EmptyData></EmptyData>
		</template>
		<template v-else>
			<block v-for="(item,index) in list" :key="index">
				<view
					style="padding:10px;margin:20rpx;align-items: center;background-color: #fef7f7;border-radius: 10px;"
					@click="linkInfo(item.code)">
					<!-- <view style="text-align: center;padding-right: 20rpx;">
					<CustomLogo :logo="item.logo" :name="item.name"></CustomLogo>
					</view> -->

					<view class="flex">
						<view class="flex-1">
							<view style=" width: 95px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
								{{item.name}}</view>
							<view style=" font-size: 28rpx;" :style="{color:$theme.LOG_LABEL}">
								{{item.code}}
							</view>
						</view>

						<view class="flex-1">
							<image :src="`/static/line_${item.rate*1>0?'rise':'fall'}.png`" mode="scaleToFill"
								:style="$theme.setImageSize(180,60)"></image>
						</view>

						<view class="flex-1">
							<view style=" font-size: 32rpx;text-align: center;"
								:style="$theme.setStockRiseFall(item.rate*1>0)">
								{{$util.formatMoney(item.price)}}
							</view>
							<view style="text-align: center;" :style="$theme.setStockRiseFall(item.rate*1>0)">
								<image :src="`/static/arrow_${item.rate*1>0?'rise':'fall'}.png`" mode="aspectFit"
									:style="$theme.setImageSize(16)" style="padding-right: 12rpx;"></image>
								{{$util.formatNumber(item.rate,2)}}%
							</view>
						</view>

						<view>
							<image src="/static/xing.png" mode="widthFix" style="width: 15px;"></image>
						</view>

					</view>
					<!-- <view style="flex:1 0 86%;">
						<view :style="{color:$theme.PRIMARY}" style="font-size: 32rpx;line-height: 1.6;">
							{{item.name}}
						</view>
						<view style="display: flex;align-items: center;">
							<view style="width: 120rpx;" :style="{color:$theme.LOG_LABEL}">{{item.code}}</view>
							<view style="flex:1 0 40%; font-size: 32rpx;text-align: center;"
								:style="$theme.setStockRiseFall(item.rate*1>0)">
								{{$util.formatMoney(item.price)}}
							</view>
							<view style="margin-left: auto;" :style="$theme.setStockRiseFall(item.rate*1>0)">
								<image :src="`/static/arrow_${item.rate*1>0?'rise':'fall'}.png`" mode="aspectFit"
									:style="$theme.setImageSize(16)" style="padding-right: 12rpx;"></image>
								{{$util.formatNumber(item.rate,2)}}%
							</view>
						</view>
					</view> -->
				</view>
			</block>

			<!-- <template v-if="list.length<=10">
				<view
					style="background-color: #F8F8FA;border-radius: 24rpx;padding:20rpx 0;margin:40rpx auto;width: 80%;">
					<view style="display: flex;align-items: center;justify-content: center;" @tap="linkStock()">
						<image src="/static/icon_add.png" mode="aspectFit" :style="$theme.setImageSize(40)"
							style="padding-right: 60rpx;"></image>
						<view :style="{color:$theme.LOG_LABEL}">{{$lang.MARKET_INDEX_TIP_GO_STOCK}}</view>
					</view>
				</view>
			</template> -->

		</template>
	</view>
</template>

<script>
	import EmptyData from '@/components/EmptyData.vue';
	import CustomLogo from '@/components/CustomLogo.vue';
	export default {
		name: 'MarketTrack',
		components: {
			EmptyData,
			CustomLogo
		},
		data() {
			return {
				list: [],
				socket: null, // websocket
			}
		},
		computed: {

		},
		created() {
			this.getList();
		},
		methods: {
			linkStock() {
				console.log(11);
				this.$emit('action', 1);
			},

			setStyle(val) {
				return {
					backgroundColor: val ? this.$theme.RISE : this.$theme.FALL,
					borderRadius: `44rpx`,
					padding: `8rpx`,
					width: `160rpx`,
					textAlign: `center`,
				}
			},

			// 跳转到详情
			linkInfo(val) {
				uni.navigateTo({
					url: this.$paths.STOCK_OVERVIEW + `?code=${val}`
				})
			},
			async getList() {
				// uni.showLoading({
				// 	title: this.$lang.REQUEST_DATA,
				// });
				// api未替换
				const result = await this.$http.get(`api/user/collect_list`);
				console.log('result:', result);
				if (!result) return false;
				this.list = result.list.map(item => {
					return {
						logo: item.goods.logo,
						name: item.goods.name,
						code: item.goods.code,
						price: item.goods.current_price,
						rate: item.goods.rate
					}
				});
			}
		}
	}
</script>