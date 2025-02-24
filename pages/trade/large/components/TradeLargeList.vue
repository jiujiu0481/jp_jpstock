<template>
	<view>
		<view class="th">
			<view class="th-td width-33">銘柄</view>
			<view class="th-td width-33">価格</view>
			<view class="th-td width-33">銘柄コード</view>
		</view>

		<EmptyData v-if="list.length<=0" img="search"></EmptyData>
		<view class="list-item" v-for="(item,index) in list" @click="handleDetail(item)">
			<view class="shares-name-box width-33"><span class="shares-name">{{item.name}}</span></view>
			<view class="shares-name-box width-33"><span
					class="shares-price-num">{{$util.formatMoney(item.price)}}</span></view>
			<view class="shares-name-box width-33"><span class="shares-name">{{item.code}}</span></view>
		</view>

		<template v-if="isShow">
			<TradeLargeBuy :info="itemInfo" @action="handleClose"></TradeLargeBuy>
		</template>
	</view>
</template>

<script>
	import CustomTitle from '@/components/CustomTitle.vue';
	import EmptyData from '@/components/EmptyData.vue';
	import TradeLargeBuy from './TradeLargeBuy.vue';
	import CustomLogo from '@/components/CustomLogo.vue';
	export default {
		name: 'TradeLargeList',
		components: {
			CustomTitle,
			EmptyData,
			TradeLargeBuy,
			CustomLogo,
		},
		data() {
			return {
				list: [], // 持有列表
				isShow: false, // 是否显示弹层
				itemInfo: {}, // 单条数据详情
			}
		},
		computed: {},
		created() {
			this.getList();
		},
		onLoad() {
			this.getList(); // 确保在这里调用 getList
		},
		methods: {
			setStyle() {
				return {
					// backgroundColor: this.$theme.PRIMARY,
					...this.$theme.LG_PRIMARY,
					color: '#FFFFFF',
					borderRadius: `8rpx`,
					minWidth: `60rpx`,
					padding: `8rpx 16rpx`,
					fontSize: `24rpx`,
					textAlign: `center`,
				}
			},

			handleDetail(val) {
				this.isShow = true;
				this.itemInfo = val;
			},
			// 关闭弹层
			handleClose(val) {
				console.log('val:', val);
				this.isShow = false;
			},

			async getList() {
				uni.showLoading({
					title: this.$lang.REQUEST_DATA,
				});
				const result = await this.$http.get(`api/goods-bigbill/list`);
				console.log(result);
				// 过滤掉不合格数据，当前以【gid】字段来判定。
				const temp = !result || result.filter(item => item.gid && item.gid > 0);
				this.list = !temp || temp.length <= 0 ? [] : temp.map(item => {
					return {
						logo: item.goods.logo,
						name: item.goods.name,
						code: item.goods.code,
						id: item.id,
						price: item.price,
						rate_num: item.goods.rate_num,
						rate: item.goods.rate,
						min_num: item.min_num,
						max_num: item.max_num,
					}
				});
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