<template>
	<view>
		<view style="display: flex;align-items: center;">
			<view style="flex:6%">
				<CustomLogo :logo="item.logo" :name="item.name"></CustomLogo>
			</view>
			<view style="flex:94%;">
				<view style="padding-left: 10px;font-size: 36rpx;font-weight: 700;color:#FFFFFF;">
					{{item.name}}
				</view>
				<view style="display: flex;align-items: center;">
					<text style="font-size: 28rpx;padding-left: 10px;flex:70%"
						:style="{color:$theme.LOG_LABEL}">{{item.code}}</text>
					<view class="common_btn" @click="stockInfo(item)" style="padding:4rpx 6rpx;border-radius: 12rpx;">
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
</template>

<script>
	import CustomLogo from '@/components/CustomLogo.vue';
	export default {
		name: 'TradeStockItem',
		components: {
			CustomLogo,
		},
		props: {
			// 交易类型页面产品列表中的单个产品
			item: {
				type: Object,
				default: {}
			},
		},
		data() {
			return {};
		},
		computed: {
			// // 当前是否为IPO。后续可能需要用该值做渲染的逻辑判断。
			// isIPO() {
			// 	return this.role == 'ipo';
			// }

			// 根据当前角色，构建所需数据的labels对象。目前，大宗与折价共享LABELS
			// setLabels(){
			// 	const common ={
			// 		price:this.$lang.TRADE_LARGE_PRICE,					
			// 	}

			// 	if(this.role=='ipo'){

			// 	}
			// }
		},
		methods: {
			stockInfo(val) {
				console.log('stock info:', val);
				this.$emit('action', val);
			}
		}
	}
</script>

<style>
</style>