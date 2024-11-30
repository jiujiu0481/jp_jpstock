<template>
	<view :class="isAnimat?'fade_in':'fade_out'">
		<HeaderSecond title="" :color="$theme.SECOND"></HeaderSecond>
		<view style="font-size: 36rpx;font-weight: 700;padding-left: 44rpx;" :style="{color:$theme.SECOND}">
			{{$lang.TRADE_VIP_TITLE}}
		</view>

		<view style="padding: 10px;">
			<EmptyData v-if="list.length<=0"></EmptyData>
			<block v-for="(item,index) in list" :key="index">
				<view style="margin:20rpx 10rpx;padding: 20rpx; background-color: #FFFFFF;border-radius: 8rpx;">
					<view style="display: flex;align-items: center;">
						<view style="flex:6%">
							<CustomLogo :logo="item.logo" :name="item.name"></CustomLogo>
						</view>
						<view style="flex:94%;">
							<view style="padding-left: 10px;font-size: 36rpx;font-weight: 700;"
								:style="{color:$theme.SECOND}">
								{{item.name}}
							</view>
							<view style="display: flex;align-items: center;">
								<text style="font-size: 28rpx;padding-left: 10px;flex:70%"
									:style="{color:$theme.LOG_LABEL}">{{item.code}}</text>
								<view class="common_btn" @click="linkStockInfo(item)"
									style="padding:4rpx 6rpx;border-radius: 12rpx;">
									{{$lang.BTN_BUY}}
								</view>
							</view>
						</view>
					</view>
					<template v-if="item.price">
						<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 6px;">
							<text :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_LARGE_PRICE}}</text>
							<text style="font-size: 32rpx;font-weight: 700;" :style="{color:$theme.LOG_VALUE}">
								{{$util.formatNumber(item.price)}} {{$lang.CURRENCY_UNIT}}</text>
						</view>
					</template>
					<template v-if="item.shiying">
						<view style="display: flex;align-items: center;justify-content: space-between;margin-top:4px;">
							<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_IPO_PE_RATE}}</view>
							<view :style="{color:$theme.LOG_VALUE}">{{$util.formatNumber(item.shiying*1)}}
							</view>
						</view>
					</template>
					<template v-if="item.shengou_date">
						<view style="display: flex;align-items: center;justify-content: space-between;margin-top:4px;">
							<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_IPO_SUB_CT}}</view>
							<view :style="{color:$theme.LOG_LABEL}">{{item.shengou_date}}</view>
						</view>
					</template>
					<template v-if="item.fa_amount">
						<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 6px;">
							<text :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_IPO_POST_QTY}}</text>
							<text :style="{color:$theme.LOG_VALUE}">
								{{$util.formatNumber(item.fa_amount*1)}} {{$lang.CURRENCY_UNIT}}</text>
						</view>
					</template>
					<template v-if="item.fa_muji_zijin">
						<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 6px;">
							<text :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_IPO_RAISE_MONEY}}</text>
							<text :style="{color:$theme.LOG_VALUE}">
								{{$util.formatNumber(item.fa_muji_zijin*1)}} {{$lang.CURRENCY_UNIT}}</text>
						</view>
					</template>
					<template v-if="item.rate_num">
						<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 6px;">
							<text :style="{color:$theme.LOG_LABEL}">{{$lang.TEADE_LARGE_RATE_AMOUNT}}</text>
							<text style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">
								{{$util.formatNumber(item.rate_num,2)}} {{$lang.CURRENCY_UNIT}}</text>
						</view>
					</template>
					<template v-if="item.rate">
						<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 6px;">
							<text :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_LARGE_RATE}}</text>
							<text style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">
								{{$util.formatNumber(item.rate,2)}}% </text>
						</view>
					</template>
					<template v-if="item.min_num">
						<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 6px;">
							<text :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_LARGE_MIN_QTY}}</text>
							<text style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">
								{{item.min_num}} {{$lang.QUANTITY_UNIT}}</text>
						</view>
					</template>
					<template v-if="item.max_num">
						<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 6px;">
							<text :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_LARGE_MAX_QTY}}</text>
							<text style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">
								{{item.max_num}} {{$lang.QUANTITY_UNIT}}</text>
						</view>
					</template>
					<template v-if="item.day">
						<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 6px;">
							<text :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_LARGE_MIN_DAY}}</text>
							<text style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">
								{{item.day}}{{$lang.UNIT_DAY}}</text>
						</view>
					</template>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import HeaderSecond from '@/components/header/HeaderSecond.vue';
	import CustomTitle from '@/components/CustomTitle.vue';
	import EmptyData from '@/components/EmptyData.vue';
	import CustomLogo from '@/components/CustomLogo.vue';
	export default {
		components: {
			HeaderSecond,
			CustomTitle,
			EmptyData,
			CustomLogo,
		},
		data() {
			return {
				isAnimat: false, // 页面动画
				list: [], // 持有列表
			}
		},
		onShow() {
			console.log(111)
			this.getList();
			this.isAnimat = true;
		},
		onHide() {
			this.isAnimat = false;
		},
		methods: {
			linkStockInfo(val) {
				uni.navigateTo({
					url: this.$paths.STOCK_OVERVIEW + `?code=${val.number_code}&type=${val.project_type_id}`
				});
			},

			async getList() {
				const result = await this.$http.get('api/goods/zhangdie');
				console.log(result);
				this.list = result || [];
			},
		},
	}
</script>

<style>
</style>