<template>
	<view>
		<scroll-view :scroll-x="true" style="white-space: nowrap;width: 96%;padding:0 10px 0 10px;" @touchmove.stop>
			<block v-for="(item,index) in $lang.MARKET_HOT_TABS" :key='index'>
				<view :class="setClass(curTab==index)" @click="changeTab(index)">
					<view style="position: relative;height: 80rpx;padding: 0 20px;color: transparent;">
						{{item}}
						<template v-if="curTab==index">
							<view
								style="position: absolute;left: 0;right: 0;height: 8rpx;width: 80%; background-image:linear-gradient(90deg,#E82D28,#f1bb8f);border-radius: 16rpx;margin:0 auto;margin-top: 6px;">
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

		<template v-if="list.length<=0">
			<EmptyData></EmptyData>
		</template>
		<template v-else>
			<block v-for="(item,index) in list" :key="index">
				<view style="padding:10px;display: flex;align-items: center;border-bottom:1px solid #F3F3F3;"
					@click="link(item.code)">
					<view style="text-align: center;padding-right: 20rpx;">
						<CustomLogo :logo="item.logo" :name="item.name"></CustomLogo>
					</view>
			
					<view style="flex:1 0 86%;">
						<view :style="{color:$theme.SECOND}" style="font-size: 32rpx;line-height: 1.6;">
							{{item.name}}
						</view>
						<view style="display: flex;align-items: center;">
							<view style="flex:1 0 30%; font-size: 28rpx;" :style="{color:$theme.LOG_LABEL}">
								{{item.code}}
							</view>
							<view style="flex:1 0 30%; font-size: 32rpx;text-align: center;"
								:style="$theme.setStockRiseFall(item.rate*1>0)">
								{{item.price}}
							</view>
							<view style="margin-left: auto;" :style="$theme.setStockRiseFall(item.rate*1>0)">
								<image :src="`/static/arrow_${item.rate*1>0?'rise':'fall'}.png`" mode="aspectFit"
									:style="$theme.setImageSize(16)" style="padding-right: 12rpx;"></image>
								{{$util.formatNumber($util.formatMathABS(item.rate),2)}}%
							</view>
						</view>
					</view>
				</view>
			</block>
		</template>
	</view>
</template>

<script>
	import EmptyData from '@/components/EmptyData.vue';
	import CustomLogo from '@/components/CustomLogo.vue';
	export default {
		name: 'MarketHotTop',
		components: {
			EmptyData,
			CustomLogo,
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
			changeTab(val) {
				this.curTab = val;
				this.getData();
			},
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
			// 跳转到股票详情
			link(code) {
				if (!code || code == '') return false;
				uni.navigateTo({
					url: `${this.$paths.STOCK_OVERVIEW}?code=${code}`
				});
			},
			// 取关
			async handleUnFollow(id) {
				const result = await this.$http.post(`api/user/collect_edit`, {
					gid: id,
				});
				this.getData();
			},
			async getData() {
				// uni.showLoading({
				// 	title: this.$lang.REQUEST_DATA,
				// });
				const result = await this.$http.get(`api/goods/top2`, {
					current: this.curTab
				})
				this.list = !result || result.length <= 0 ? [] : result.map(item => {
					return {
						logo: item.logo,
						name: item.name,
						code: item.code,
						price: item.close,
						rate: item.returns,
						follow: item.sc,
						gid: item.gid,
						close: item.close,
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