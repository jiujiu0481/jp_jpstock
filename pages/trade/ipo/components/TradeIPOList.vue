<template>
	<view>
		<EmptyData v-if="list.length<=0"></EmptyData>
		<block v-for="(item,index) in list" :key="index">

			<view class="item"
				style="background-image: url(/static/sakura.png); background-position:top  right; background-repeat: no-repeat; background-size: 40%;margin: 0 10px;border-radius: 6px;">
				<!-- 顶部区域 -->
				<view class="item-top" style="margin-left: 16px;">
					<view class="item-top-name">
						{{item.name}}
						<span>{{item.code}}</span>
					</view>
				</view>

				<!-- 底部区域 -->
				<view style="padding: 0 16px 10px  16px; ">
					<view
						style="display: flex;align-items: center;justify-content: space-between;font-size: 14px;font-weight: 350;margin: 6px 0;">
						<view>発行価格：</view>
						<view class="item-middle" style="font-size: 16px;margin-left: 16px;">
							{{$util.formatMoney(item.price)}}
						</view>
					</view>
					<view
						style="display: flex;align-items: center;justify-content: space-between;font-size: 14px;font-weight: 350;margin: 6px 0;">
						<view>発行数</view>
						<view>{{$util.formatNumber(item.fa_amount*1)}}</view>
					</view>

					<view
						style="display: flex;align-items: center;justify-content: space-between;font-size: 14px;font-weight: 350;margin: 6px 0;">
						<view>上場日：</view>
						<view>{{item.online_date}}</view>
					</view>
					<view
						style="display: flex;align-items: center;justify-content: space-between;font-size: 14px;font-weight: 350;margin: 6px 0;">
						<view>最低申し込み数量</view>
						<view>
							<span>{{$util.formatNumber(item.min_num*1)}}</span>
						</view>
					</view>
					<view
						style="display: flex;align-items: center;justify-content: space-between;font-size: 14px;font-weight: 350;margin: 6px 0;">
						<view>最大申し込み数量</view>
						<view>
							<span>{{$util.formatNumber(item.max_num*1)}}</span>
						</view>
					</view>
					<view
						style="display: flex;align-items: center;justify-content: space-between;font-size: 14px;font-weight: 350;margin: 6px 0;">
						<view>申し込み時間</view>
						<view>{{item.shengou_date}}</view>
					</view>

					<view
						style="background-color: #f3564a;padding: 5px 20px;border-radius: 10px;color: #fff;display: flex;align-items: center;justify-content: center;"
						@click="handleDetail(item)">申し込み</view>
				</view>
			</view>
		</block>

		<template v-if="isShow">
			<TradeIPOBuy :info="itemInfo" @action="handleClose"></TradeIPOBuy>
		</template>
	</view>
</template>

<script>
	import EmptyData from '@/components/EmptyData.vue';
	import CustomLogo from '@/components/CustomLogo.vue';
	import TradeIPOBuy from './TradeIPOBuy.vue';
	export default {
		name: 'TradeIPOList',
		components: {
			EmptyData,
			CustomLogo,
			TradeIPOBuy,
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
			setStyle() {
				return {
					...this.$theme.LG_PRIMARY,
					color: '#FFFFFF',
					borderRadius: `8rpx`,
					minWidth: `60rpx`,
					padding: `8rpx 16rpx`,
					fontSize: `24rpx`,
					textAlign: `center`,
				}
			},
			// 不跳页面，按钮弹层，二次确认购买
			handleDetail(val) {
				console.log('val:', val);
				// this.handleShowModal();
				this.isShow = true;
				this.itemInfo = val;
			},
			// 关闭弹层
			handleClose(val) {
				console.log('val:', val);
				this.isShow = false;
			},
			// // 平仓/卖出
			// async handleShowModal() {
			// 	const result = await uni.showModal({
			// 		title: this.$lang.TRADE_IPO_MODAL_TITLE,
			// 		content: this.$lang.TRADE_IPO_MODAL_CONTENT,
			// 		cancelText: this.$lang.BTN_CANCEL,
			// 		confirmText: this.$lang.BTN_CONFIRM,
			// 		confirmColor: this.$theme.PRIMARY,
			// 		cancelColor: '#999999',
			// 	});
			// 	console.log('异步弹层:', result);
			// 	if (result[1].confirm) {
			// 		this.purchase();
			// 	}
			// },



			// 获取列表
			async getList() {
				uni.showToast({
					title: this.$lang.REQUEST_DATA,
					icon: 'loading'
				});
				const result = await this.$http.get(`api/goods-shengou/calendar`, {
					type: 1, // 传参 1或2
				})
				console.log(result);
				this.list = result.map(item => {
					return {
						id: item.id,
						logo: item.goods.logo,
						name: item.goods.name,
						code: item.goods.code,
						price: item.price,
						shengou_date: item.shengou_date,
						fa_amount: item.fa_amount,
						min_num: item.min_num,
						max_num: item.max_num,
						online_date: item.online_date,
						// rate: item.goods.rate,
						// rate_num: item.goods.rate_num,
					}
				})
			},
		}

	}
</script>

<style>
	.item {
		background: #fff;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .36);
		margin-bottom: 7px;
		padding: 0 8px
	}

	.item .item-top {
		padding: 8px 0;
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

	.item .item-top .item-top-name {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-weight: 600;
		font-size: 14px;
		color: #333;
		line-height: 17px
	}

	.item .item-top .item-top-name span {
		height: 24px;
		background: #ec4d78;
		border-radius: 5px;
		padding: 0 11px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-weight: 400;
		font-size: 11px;
		color: #fff;
		margin-left: 14px
	}

	.item .item-top .item-top-btn1 {
		min-width: 98px;
		height: 24px;
		background: #e4013e;
		border-radius: 5px;
		padding: 0 5px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-weight: 100;
		font-size: 11px;
		color: #fff
	}

	.item .item-top .item-top-btn2 {
		min-width: 98px;
		height: 24px;
		background: #adc1bb;
		border-radius: 5px;
		padding: 0 5px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-weight: 100;
		font-size: 11px;
		color: #fff
	}

	.item .item-middle {
		height: 29px;
		font-weight: 500;
		font-size: 13px;
		color: #e04e50;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.item .item-foot {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-wrap: wrap;
		flex-wrap: wrap;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between
	}

	.item .item-list {
		width: calc(50% - 7px);
		font-weight: 300;
		font-size: 12px;
		color: #666;
		line-height: 17px;
		padding: 6px 0;
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

	.item .item-list span {
		font-weight: 500;
		font-size: 12px;
		color: #333
	}
</style>