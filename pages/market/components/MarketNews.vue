<template>
	<view style="min-height: 96vh;">
		<scroll-view :scroll-x="true" style="white-space: nowrap;width: 96%;padding:0 10px 0 10px;" @touchmove.stop>
			<block v-for="(item,index) in $lang.MARKET_NEWS_TABS" :key='index'>
				<view :class="setClass(curTab==index)" @click="changeTab(index)">
					<view style="position: relative;height: 80rpx;padding: 0 20px;color: transparent;">
						{{item}}
						<template v-if="curTab==index">
							<view
								style="position: absolute;left: 0;right: 0;height: 8rpx;width: 80%; background-image:linear-gradient(90deg,#f1bb8f,#f1bb8f);border-radius: 16rpx;margin:0 auto;margin-top: 6px;">
							</view>
						</template>
						<view
							style="position: absolute;top:16rpx;left: 0;right: 0;font-size: 32rpx;font-weight: 800;width: 100%;text-align: center;"
							:style="{color:curTab==index?$theme.SECOND:'#898996'}">
							{{item}}
						</view>
					</view>
				</view>
			</block>
		</scroll-view>

		<view style="margin-top: 20px;padding: 0 10px;">
			<block v-for="(item,index) in list" :key="index">
				<view @click="open(item.url)"
					style="display: flex;align-items: center;margin-bottom: 10px;padding-bottom: 10px;border-bottom: 1px solid #e5e5e5;">
					<template v-if="curTab==0">
						<view style="flex:60%;padding-right: 30px;padding-top: 10px;color: #121212;">
							<view>{{item.title}}</view>
							<view style="margin:6px;margin-top: 16px;"><text style="padding: 4px 0;"
									:style="{color:$theme.LOG_VALUE}">{{$util.formatDate(item.updated_at,false)}}</text>
							</view>
						</view>
						<!-- <image :src="item.pic" :style="$theme.setImageSize(200,150)" mode="scaleToFill"
							style="border-radius: 10px;"></image> -->
					</template>
					<template v-else>
						<view style="flex:100%;">
							<view style="color: #121212;">{{item.title}}</view>
							<view style="margin:6px;margin-top: 16px;text-align: right;"
								:style="{color:$theme.LOG_VALUE}">
								{{$util.formatDate(item.updated_at,false)}}
							</view>
						</view>
					</template>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import TabsFifth from '@/components/tabs/TabsFifth.vue';
	export default {
		name: 'MarketNews',
		components: {
			TabsFifth,
		},
		data() {
			return {
				list: [],
				curTab: 0,
			}
		},
		created() {
			this.getData();
		},
		methods: {
			// 设置样式
			setClass(val) {
				return `item ${val?'item_act':''}`
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
			open(url) {
				window.open(url)
			},
			changeTab(val) {
				this.curTab = val;
				this.getData();
			},
			async getData() {
				// uni.showLoading({
				// 	title: this.$lang.REQUEST_DATA,
				// });
				const result = await this.$http.get(`api/goods/get_news`, {
					current: this.curTab
				})
				console.log(result);
				this.list = !result || result.length <= 0 ? [] : result.map(item => {
					return {
						title: item.title,
						url: item.url,
						updated_at: item.updated_at,
						pic: item.pic,
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		display: inline-block;
		border-radius: 16rpx;
		text-align: center;
		font-size: 32rpx;
		line-height: 1.8;
		color: #818181;
		min-width: 80rpx;
	}

	.item_act {
		color: #121212;
	}
</style>