<template>
	<view>
		<view class="page">
			<view class="block">
				<view class="head">
					<img @click="$u.route({type:'navigateBack'});" :src="$icon.zjt" class="back">
					<view class="title left_in" style="margin-left: 0px;">ポジションの詳細</view>
					<view class="back"></view>
				</view>
				<view class="short"></view>
			</view>
			<view class="top">
				<view class="top-header">
					<view class="top-name">{{item.name}}<span v-if="item.status==1">保有中</span></view><span
						class="red">{{(item.status==2?item.sellProfitRate:item.buyProfitRate).toFixed(2)}}%</span>
				</view>
				<view class="top-foot">{{item.code}}<span>利益</span></view>
			</view>
			<view class="title">基本情報</view>
			<view class="list-item">
				<view class="item-left">売買タイプ</view>
				<view class="item-right">買い占め</view><!---->
			</view>
			<view class="list-item">
				<view class="item-left">注文番号</view>
				<view class="item-right">{{item.order_sn}}</view>
			</view>
			<view class="list-item">
				<view class="item-left">時間を買う</view>
				<view class="item-right">{{item.buyCT}}</view>
			</view>

			<view class="list-item" v-if="item.status==2">
				<view class="item-left">販売時間</view>
				<view class="item-right">{{item.sellCT}}</view>
			</view>

			<view class="list-item">
				<view class="item-left">購入価格</view>
				<view class="item-right">{{$util.formatMoney(item.buyPrice)}}</view>
			</view>

			<view class="list-item" v-if="item.status==2">
				<view class="item-left">販売価格</view>
				<view class="item-right">{{$util.formatMoney(item.sellPrice)}}</view>
			</view>

			<view class="list-item">
				<view class="item-left">保有額</view>
				<view class="item-right">{{$util.formatNumber(item.buyQTY)}}</view>
			</view>
			<view class="list-item">
				<view class="item-left">元の入金</view>
				<view class="item-right">{{$util.formatNumber(item.buyAmont)}}</view>
			</view>
			<view class="list-item">
				<view class="item-left">複数のレバレッジ</view>
				<view class="item-right">{{item.lever}}</view>
			</view>
			<view class="list-item">
				<view class="item-left">市場価値</view>
				<view class="item-right">{{$util.formatNumber(item.buyAmont)}}</view>
			</view>
			<view class="list-item">
				<view class="item-left">タイプ</view>
				<view class="item-right">指値</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {

				item: null, // 单条数据详情
				// isClose:false, // 
			}
		},


		onLoad(op) {
			if (op.data) {
				const array = decodeURIComponent(op.data);

				this.item = JSON.parse(array);

				console.log(2222, this.item);

			}
		},
		onShow() {},
		onHide() {},
		// 觸底加載
		onReachBottom() {},
		//下拉刷新
		onPullDownRefresh() {},

		methods: {},
	}
</script>


<style lang="scss" scoped>
	@charset "UTF-8";

	/* uni.scss */
	.page {
		background: #f8f8f8;
		min-height: 100vh
	}

	.top {
		height: 58px;
		background: #fff;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .36);
		padding: 0 10px;
		margin-top: 10px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center
	}

	.top .top-header {
		width: 100%;
		height: 24px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between
	}

	.top .top-header .top-name span {
		margin-left: 10px
	}

	.top .top-header .top-header-name {
		height: 24px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-weight: 600;
		font-size: 12px;
		color: #333
	}

	.top .top-header .top-header-name span {
		height: 24px;
		background: #adc1bb;
		border-radius: 5px;
		padding: 0 8px;
		font-weight: 400;
		font-size: 11px;
		color: #fff;
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

	.top .top-header .red {
		font-weight: 600;
		font-size: 12px;
		color: #e04e50
	}

	.top .top-header .green {
		font-weight: 600;
		font-size: 12px;
		color: #37927d
	}

	.top .top-foot {
		height: 17px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		font-weight: 400;
		font-size: 9px;
		color: #333
	}

	.top .top-foot span {
		font-weight: 400;
		font-size: 12px;
		color: #333
	}

	.title {
		height: 39px;
		padding: 0 6px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-weight: 600;
		font-size: 13px;
		color: #212121
	}

	.list-item {
		height: 38px;
		background: #fff;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		border-bottom: 1px solid #ebebeb;
		padding: 0 10px
	}

	.list-item .item-left {
		font-weight: 400;
		font-size: 12px;
		color: #999
	}

	.list-item .item-right {
		font-weight: 600;
		font-size: 12px;
		color: #333
	}
</style>