<template>
	<view>
		<template v-if="!list || list.length<=0">
			<EmptyData img="search"></EmptyData>
		</template>
		<template v-else>
			<block v-for="(item,index) in list" :key="index">
				
				<!-- <view class="text-center" style="padding:10px 20px;">
					<view style="background-color: #09d2a0;width: 50px;border-radius: 5px;color: #fff;">{{item.zt}}</view>
				</view> -->
			
				
				
				<view style="margin:10rpx;padding: 20rpx; background-color: #f6f8fc;border-radius:10rpx;font-size: 12px;box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;background-image: url(/static/sakura.png); background-position:top  right; background-repeat: no-repeat; background-size: 40%;">
					<!-- <view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
						<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_DAY_ORDER_STATUS}}</view>
						<view :style="setStyle(item.status)"> {{item.zt}} </view>
					</view> -->

					<!-- <view style="display: flex;align-items: center;justify-content: space-between; line-height: 1.8;">
						<view :style="{color:$theme.LOG_LABEL}">
							{{$lang.TRADE_DAY_BUY_AMOUNT}}
						</view>
						<view  :style="{color:$theme.LOG_VALUE}">
							{{$util.formatMoney(item.money)}}
						</view>
					</view> -->
					
					<view style="display: flex;align-items: center;justify-content: space-between; line-height: 1.8;">
						<view :style="{color:$theme.LOG_LABEL}">
							{{$lang.TRADE_DAY_BUY_AMOUNT}}
						</view>
						<view  :style="{color:$theme.PRIMARY}">
							{{$util.formatMoney(item.money)}}
						</view>
					</view>
					
					<view style="display: flex;align-items: center;justify-content: space-between; line-height: 1.8;">
						<view :style="{color:$theme.LOG_LABEL}">
							{{$lang.TRADE_DAY_SUCCESS_AMOUNT}}
						</view>
						<view  :style="{color:$theme.PRIMARY}">
							{{$util.formatMoney(item.success)}}
						</view>
					</view>

					<view style="display: flex;align-items: center;justify-content: space-between; line-height: 1.8;">
						<view :style="{color:$theme.LOG_LABEL}">
							{{$lang.TRADE_DAY_ORDER_SN}}
						</view>
						<view style="font-size: 24rpx;" :style="{color:$theme.LOG_VALUE}">
							{{item.ordersn}}
						</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between; line-height: 1.8;">
						<view :style="{color:$theme.LOG_LABEL}">
							{{$lang.TRADE_DAY_CREATE_TIME}}
						</view>
						<view style="font-size: 24rpx;" :style="{color:$theme.LOG_VALUE}">
							{{item.created_at}}
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
		name: 'ApplyRecord',
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
		
				this.getList();
		},
		changeTab(val) {
			this.getList();
		},
		methods: {
			// 申请状态样式
			setStyle(val) {
				// 背景色
				const tempBG = [
					this.$theme.RGBConvertToRGBA('#FFB044', 9),
					this.$theme.RGBConvertToRGBA(this.$theme.PRIMARY, 9),
					this.$theme.RGBConvertToRGBA(this.$theme.THIRD, 9),
				];
				// 文字色
				const tempColor = [
					this.$theme.PRIMARY, '#09D2A0', this.$theme.THIRD,
				];
				return {
					// PRIMARY
					// backgroundColor: tempBG[val],
					color: tempColor[val],
					// borderRadius: `12rpx`,
					// border: `1px solid ${val? this.$theme.PRIMARY:'#F1F1F1'}`
					// minWidth: `80rpx`,
					// padding: `6rpx 16rpx`,
					fontSize: `26rpx`,
					textAlign: `center`,
				}
			},

			// 申请列表
			async getList() {
				uni.showLoading({
					title: this.$lang.REQUEST_DATA,
				});
				const result = await this.$http.get(`api/rinei/sq_list`);
				console.log(result);
				this.list = !result || result.length <= 0 ? [] : result.map((item, index) => {
					return {
						...item,
						// 状态值明文、icon
						...this.$theme.setStatusPrimary(item.status),
						// 状态值 样式:字号、字色、背景等
						style: this.$theme.setStatusPrimary(item.status),
					}
				});
			},
			
		}
	}
</script>