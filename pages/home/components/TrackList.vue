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
<!-- 
<view style="background-color: #FFFFFF; padding: 20px   0   10px  0;	border-radius: 24px 24px 10px 10px;">
	<view class="menu">
		<view class="menu-item" @click="linkmarket()">
			<image src="/static/btn_7.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
			<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;"> 株式取引</view>
		</view>
		<view class="menu-item" @click="$u.route({url:'/pages/trade/day/CoinIndex'});">
			<image src="/static/btn_1.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
			<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;"> 急騰株取引</view>
		</view>

		<view class="menu-item" @click="$u.route({url:'/pages/trade/large/CoinIndex'});">

			<image src="/static/btn_2.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
			<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;"> ブロック取引</view>
		</view>
		<view class="menu-item" @click="$u.route({url:'/pages/trade/ipo/CoinIndex'});">
			<image src="/static/btn_0.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
			<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;"> 新規公開株式</view>
		</view>
		<view class="menu-item" @click="$u.route({url:'/pages/trade/issuance/CoinIndex'});" style="margin-top: 12px;">
			<image src="/static/btn_4.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
			<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;"> 機関IPO</view>
		</view>
		<view class="menu-item" @click="$u.route({url:'/pages/trade/ea/CoinIndex'});" style="margin-top: 12px;">
			<image src="/static/btn_3.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
			<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;"> AI資産運用</view>
		</view>
		<view class="menu-item" @click="linkMarketOV()" style="margin-top: 12px;">
			<image src="/static/btn_5.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
			<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;"> マーケット</view>
		</view>
		<view class="menu-item" @click="$u.route({url:'/pages/deposit/index'});" style="margin-top: 12px;">
			<image src="/static/btn_6.png" mode="aspectFit" :style="$theme.setImageSize(100)"></image>
			<view style="margin-top: 8px;color: black;font-size: 14px;font-weight: 500;">サポート</view>
		</view>
	</view>
	<view style="text-align: center;padding-top: 6px;">
		<image src="/static/banner.png" mode="widthFix" style="width: 90%;"></image>
	</view>
</view> -->


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