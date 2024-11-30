<template>
	<view style="padding:20rpx;background-color: #FFFFFF;margin-top: 20rpx;" v-if="list.length>0">
		<view style="padding:0 20rpx;">
			<TitleSecond :title="$lang.MARKET_INDEX_TAB_TRACK">
				<view style="font-size: 13px;margin-left: auto;" @click="linkTrack()" :style="{color:$theme.SECOND}">
					{{$lang.MORE}}
					<view class="arrow rotate_45" :style="$theme.setImageSize(12)"></view>
				</view>
			</TitleSecond>
		</view>
		<view style="height: 1px;background-color:#E5E5E5;"></view>

		<scroll-view :scroll-x="true" style="white-space: nowrap;padding: 0 10px 0 0;" @touchmove.stop>
			<block v-for="(item,index) in list" :key="index">
				<view class="common_block"
					style="width: 360rpx;display: inline-block; padding:10px;margin-right:10rpx;border-radius: 6px;text-align: center;"
					:style="{backgroundColor:item.rate>0?'#FFF6F7':'#F0FEFB'}" @click="link(item.code)">
					<view style="display: flex;align-items: center;">
						<view style="width: 90rpx;text-align: center;">
							<CustomLogo :logo="item.logo" :name="item.name"></CustomLogo>
						</view>
						<view style="padding-left: 6px;font-size: 36rpx;">
							<view style="color:#333333"> {{setText(item.name)}}</view>
							<view :style="{color:$theme.LABEL}" style="font-size: 24rpx;">{{item.code}}</view>
						</view>

					</view>

					<view style="display: flex;align-items: center;justify-content: space-between;">
						<view style="font-size: 32rpx;font-weight: 100;" :style="$theme.setStockRiseFall(item.rate>0)">
							{{$util.formatNumber(item.price)}}
						</view>
						<view :style="$theme.setStockRiseFall(item.rate>0)">
							<image :src="`/static/arrow_${item.rate>0?'rise':'fall'}.png`" mode="aspectFit"
								:style="$theme.setImageSize(24)"></image>
							{{($util.formatNumber($util.formatMathABS(item.rate),2))}}%
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	import EmptyData from '@/components/EmptyData.vue';
	import CustomLogo from '@/components/CustomLogo.vue';
	import TitleSecond from '@/components/title/TitleSecond.vue';
	export default {
		name: 'TrackList',
		components: {
			TitleSecond,
			EmptyData,
			CustomLogo
		},
		data() {
			return {
				list: [],
			}
		},
		created() {
			this.getList();
		},
		methods: {
			// 文字超出一行。转换为...
			setText(val) {
				let temp = '';
				return temp = val.length <= 9 ? val : val.slice(0, 9) + '...'
			},
			linkTrack() {
				uni.switchTab({
					url: this.$paths.MARKET_INDEX + `?type=0`
				})
			},
			// 跳转到股票详情
			link(code) {
				if (!code || code == '') return false;
				uni.navigateTo({
					url: `${this.$paths.STOCK_OVERVIEW}?code=${code}`
				});
			},
			async getList() {
				// uni.showLoading({
				// 	title: this.$lang.REQUEST_DATA,
				// });
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

<style>
</style>