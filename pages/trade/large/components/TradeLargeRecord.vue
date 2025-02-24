<template>
	<view>

		<template v-if="!list || list.length<=0">
			<EmptyData img="search"></EmptyData>
		</template>
		<template v-else>
			<view class="th">
				<view class="th-td width-20">銘柄</view>
				<view class="th-td width-20">価格</view>
				<view class="th-td width-20">申込量</view>
				<view class="th-td width-20">当選数</view>
				<view class="th-td width-20">{{$lang.TRADE_LARGE_LOG_AMOUNT}}</view>
			</view>

			<EmptyData v-if="list.length<=0"></EmptyData>
			<view class="list-item" v-for="(item,index) in list">
				<view class="shares-name-box width-20"><span class="shares-name">{{item.goods.name}}</span></view>
				<view class="shares-name-box width-20"><span
						class="shares-price-num">{{$util.formatMoney(item.price)}}</span></view>
				<view class="shares-name-box width-20"><span class="shares-name">{{item.num}}</span></view>
				<view class="shares-name-box width-20"><span
						class="shares-name">{{item.admin_status==0?`配分中`:item.success}}</span></view>
				<view class="shares-name-box width-20"><span
						class="shares-name">{{item.admin_status==0?`配分中`:$util.formatMoney(item.total)}}</span></view>

			</view>
		</template>
	</view>
</template>

<script>
	import EmptyData from '@/components/EmptyData.vue';
	export default {
		name: "TradeLargeRecord",
		components: {
			EmptyData,
		},
		data() {
			return {
				list: [],
			};
		},
		created() {
			this.getList();
		},
		methods: {
			async getList() {
				uni.showLoading({
					title: this.$lang.REQUEST_DATA,
				});
				const result = await this.$http.get(`api/goods-bigbill/user-order-log`);
				console.log(result);
				this.list = result || [];
				console.log(this.list);
			},
		},
	}
</script>
<style>
	.th {
		height: 35px;
		border-bottom: 1px solid #ebebeb;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		margin: 0 7px
	}

	.th .th-td {
		font-weight: 600;
		font-size: 12px;
		color: #333;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center
	}

	.list-item {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		height: 69px;
		border-bottom: 1px solid #ebebeb;
		margin: 0 7px
	}

	.list-item .shares-name-box {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center
	}

	.list-item .shares-name-box .shares-name {
		font-size: 12px;
		font-weight: 400;
		color: #333
	}

	.list-item .shares-name-box .shares-number {
		font-size: 10px;
		font-family: FZLanTingHeiT-R-GB;
		font-weight: 400;
		color: #333;
		margin-top: 3px;
		width: 100%;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: start;
		-webkit-justify-content: flex-start;
		justify-content: flex-start
	}

	.list-item .shares-name-box .shares-price-num {
		font-size: 14px;
		font-family: FZCuHei-B03T;
		font-weight: 400;
		color: #f53e3e
	}

	.list-item .shares-name-box .flex-start {
		-webkit-box-pack: start;
		-webkit-justify-content: flex-start;
		justify-content: flex-start
	}

	.list-item .new-price {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		width: 17%
	}

	.list-item .new-price .shares-price-num {
		font-size: 12px;
		font-weight: 500;
		color: #333
	}

	.list-item .shares-price {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		width: 17%
	}

	.list-item .shares-price .shares-price-num {
		font-size: 12px;
		font-weight: 500;
		color: #333
	}

	.list-item .number {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		width: 17%
	}

	.list-item .number .shares-price-num {
		font-size: 12px;
		font-weight: 500;
		color: #333
	}

	.list-item .new-code {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		width: 17%;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		justify-content: flex-end
	}

	.width-100 {
		width: 100%
	}

	.width-20 {
		width: 20%
	}

	.width-33 {
		width: 33.3333333333%
	}

	.btn-blue {
		background: #f0c680;
		border-radius: 26px
	}

	.uni-input-input {
		font-size: 14px;
		font-family: FZLanTingHeiT-R-GB;
		font-weight: 400;
		color: #fff
	}
</style>