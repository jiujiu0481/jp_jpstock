<template>
	<view style="background-color: #FFFFFF;margin:10rpx;min-height: 100vh;">
		<view style="padding: 10px;">
			<template v-if="!list|| list.length<=0">
				<EmptyData></EmptyData>
			</template>
			<template v-else>
				<block v-for="(item,index) in list" :key="index">
					<view
						style="margin:20px 10rpx;padding: 20rpx; background-color: #FFFFFF;border-radius: 8px;box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;">
						<view
							style="display: flex;align-items: center;justify-content: space-between;line-height: 2.4;">
							<view style="flex:80%;">
								<view style="padding-left: 10px;font-size: 16px;color:#121212;font-weight: 800;">
									{{item.name}}
								</view>
								<view style="display: flex;align-items: center;">
									<text style="font-size: 28rpx;padding-left: 10px;flex:70%"
										:style="{color:$theme.LOG_LABEL}">{{item.code}}</text>
								</view>
							</view>

						</view>
						<view
							style="display: flex;align-items: center;justify-content: space-between;font-weight: 700;line-height: 2.4;">
							<view style="color: #E82D28;font-size:40rpx;padding-left: 10px;"> {{item.syl }} </view>
							<view style="color: #E82D28;font-size: 32rpx;margin-right: 10px; ">{{item.zhouqi +` Day`}}
							</view>
						</view>

						<!-- <view
							style="display: flex;align-items: center;justify-content: space-between;line-height: 1.4;color:#8f8f8f;padding-left: 10px;">
							<view>{{$lang.TRADE_EA_HIGHEST_RETURN}}</view>
							<view></view>
						</view> -->
						<view class="common_btn" @click="handleDetail(item)" style="padding:4px;font-size: 16px;margin-top: 10px;">
							{{$lang.BTN_BUY}}
						</view>
					</view>
				</block>
			</template>
		</view>

		<template v-if="isShow">
			<EaBuy :info="itemInfo" @action="handleClose"></EaBuy>
		</template>
	</view>
</template>

<script>
	import EmptyData from '@/components/EmptyData.vue';
	import EaBuy from './EaBuy.vue';
	export default {
		name: 'EaMarket',
		components: {
			EmptyData,
			EaBuy,
		},
		data() {
			return {
				list: [],
				isShow: false, // 是否显示弹层
				itemInfo: {}, // 单条数据详情
			}
		},
		created() {
			this.getList();
		},
		methods: {
			handleDetail(val) {
				console.log('val:', val);
				this.isShow = true;
				this.itemInfo = val;
				// this.curId = val;
				// this.show = true;
			},
			// 关闭弹层
			handleClose(val) {
				console.log('val:', val);
				this.isShow = false;
			},

			async getList() {
				uni.showLoading({
					title: this.$lang.REQUEST_DATA,
				});
				const result = await this.$http.get(`api/jijin/list`);
				if (!result) return false;
				console.log(result);
				this.list = result.jj_list || [];
			},
		}
	}
</script>

<style>
</style>