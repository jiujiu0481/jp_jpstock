<template>
	<view class="bg">
		<view style="padding:20rpx 40rpx;position: relative;line-height: 2.4;">
			<view style="font-size: 32rpx;font-weight: 700;">{{$lang.MARKET_NEWS_TITLE}}</view>
			<view style="position: absolute;right: 30rpx;top:10rpx;" @click="linkMarketNews()">
				<image src="/static/news.png" mode="aspectFit" :style="$theme.setImageSize(160)"></image>
			</view>
		</view>
		<scroll-view :scroll-x="true" style="white-space: nowrap;" scroll-left="10" @touchmove.stop>
			<template v-if="list && list.length>0">
				<block v-for="(item,index) in list" :key="index">
					<view
						style="display: inline-block;height:110rpx;width: 400rpx;margin-left: 10px;background-color: #fefaf5;border-radius: 20rpx;"
						@click="open(item.url)">
						<view style="text-align: center;">
							<!-- <image :src="item.pic" mode="scaleToFill" style="border-radius:  32rpx 32rpx 0 0;"
								:style="$theme.setImageSize(280,160)">
							</image> -->
						</view>
						<view style="width:800rpx;white-space: break-spaces;padding: 10rpx;"
							:style="{color:$theme.SECOND}">
							{{setText(item.title)}}
						</view>
						<!-- <view style="width:400rpx;white-space: break-spaces;padding: 10rpx;"
							:style="{color:$theme.LOG_VALUE}">
							{{setText(item.title.slice(13,item.title.length))}}
						</view> -->
						<view style="padding-right: 10px;color:#999;text-align: right;">
							{{item.updated_at}}
						</view>
					</view>
				</block>
			</template>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: 'MarketNews',
		data() {
			return {
				list: []
			}
		},
		created() {
			this.getList();
		},
		methods: {
			linkMarketNews() {
				uni.reLaunch({
					url: this.$paths.MARKET_OVERVIEW + `?type=3`,
				})
			},

			open(url) {
				window.open(url)
			},
			// 文字超出一行。转换为...
			setText(val) {
				let temp = '';
				return temp = val.length <= 11 ? val : val.slice(0, 11) + '...'
			},

			async getList() {
				const result = await this.$http.get(`api/goods/get_news`, {
					current: 0
				});
				if (!result) return false;
				this.list = result && result.length <= 5 ? result : result.slice(0, 6);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.bg {
		background-image: linear-gradient(180deg, #fff, #fff);
		background-position: center center;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 100%;
		height: 240rpx;
		margin: 20rpx 0;
	}
</style>