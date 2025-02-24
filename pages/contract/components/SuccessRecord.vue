<template>
	<view>
		<template v-if="!list || list.length<=0">
			<EmptyData></EmptyData>
		</template>
		<template v-else>
			<block v-for="(item,index) in list" :key="index">
				<view class="common_block" style="border-radius: 16rpx;">
					<view style="display: flex;align-items: center;">
						<view style="padding-right: 30rpx;font-size: 28rpx;" :style="{color:$theme.SECOND}">
							{{item.name}}
						</view>
						<view
							style="background-color: #F3F3F3;font-size: 22rpx;border-radius: 8rpx;padding:6rpx 16rpx;margin:0 30rpx">
							{{item.mode==0? '市場':'指値'}}
						</view>
						<view :style="setStyle(item.type)">
							{{item.type==0?'購入':'売却'}}
						</view>
						<view style="margin-left: auto;" :style="{color:'#B8B8B8'}">
							 取引
						</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;line-height:1.8;">
						<view :style="{color:$theme.LOG_LABEL}">現在の価格</view>
						<view style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">0.1358</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;line-height:1.8;">
						<view :style="{color:$theme.LOG_LABEL}">現在の数量</view>
						<view style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">0.55</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;line-height: 1.8;">
						<view :style="{color:$theme.LOG_LABEL}">現在の合計</view>
						<view style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">1.3547</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;line-height:1.8;">
						<view :style="{color:$theme.LOG_LABEL}">取引価格</view>
						<view style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">0.1358</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;line-height:1.8;">
						<view :style="{color:$theme.LOG_LABEL}">取引量</view>
						<view style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">0.55</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;line-height:1.8;">
						<view style="font-size: 24rpx;" :style="{color:$theme.LOG_LABEL}">
							{{item.sn}}
						</view>
						<view style="font-size: 26rpx;" :style="{color:$theme.LOG_VALUE}">
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
		name: 'SuccessRecord',
		components: {   
			EmptyData
		},
		data() {
			return {
				list: [{
					name: 'BTC/USDT',
					mode: 0, // market or limit
					type: 0,
					ct: new Date(),
					sn: 'SN-13587946821312345678',
					status: 0, // submit
				}, {
					name: 'ETH/USDT',
					mode: 1,
					type: 1,
					ct: new Date(),
					sn: 'SN-13587946821312345678',
					status: 1, // canceled
				}]
			}
		},
		created() {
			this.getList();
		},
		methods: {
			async getList() {
				// const result = await this.$http.get(`api/...`);
				// if(!result) return false;
				// console.log(`result:`,result);
				uni.showToast({
					title: '暫無接口',
					icon: 'none'
				})
			},

			setStyle(val) {
				const temp = val == 0 ? this.$theme.RISE : this.$theme.FALL;
				return {
					backgroundColor: this.$theme.RGBConvertToRGBA(temp, 20),
					color: temp,
					borderRadius: `8rpx`,
					minWidth: `60rpx`,
					padding: `6rpx 16rpx`,
					fontSize: `22rpx`,
					textAlign: `center`,
				}
			},
		}
	}
</script>

<style>
</style>