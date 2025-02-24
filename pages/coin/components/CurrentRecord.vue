<template>
	<view>
		<view style="
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 40rpx;
      ">
			<view style="padding-right: 12rpx" :style="{ color: $theme.LOG_LABEL }">{{ $lang.COIN_RECORD_TIP_CUR_COIN }}
			</view>
			<u-checkbox-group>
				<u-checkbox shape="circle" :activeColor="$theme.SECOND" label="" v-model="isShowCurCoin"
					labelColor="#999" labelSize="24rpx" @change="filterCoin" :checked="isShowCurCoin"
					iconColor="#FFFFFF"></u-checkbox>
			</u-checkbox-group>
		</view>
		<template v-if="!list || list.length <= 0">
			<EmptyData></EmptyData>
		</template>
		<template v-else>
			<block v-for="(item, index) in list" :key="index">
				<view class="common_block" style="border-radius: 16rpx">
					<view style="display: flex; align-items: center">
						<view style="padding-right: 30rpx; font-size: 28rpx" :style="{ color: $theme.SECOND }">
							{{ item.name }}
						</view>
						<view style="
                background-color: #f3f3f3;
                font-size: 22rpx;
                border-radius: 8rpx;
                padding: 6rpx 16rpx;
                margin: 0 30rpx;
              " :style="{ color: item.fx == 1 ? '#6D41FF' : $theme.SECOND }">
							{{ item.fxText }}
						</view>
						<view :style="setStyle(item.direct)">
							{{ item.directText }}
						</view>
						<view style="margin-left: auto" @tap="handleCanel(item.id)">
							<view :style="setBtnStyle()">{{
                $lang.COIN_CURRENT_BTN_CANCEL
              }}</view>
						</view>
					</view>
					<view style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              line-height: 2;
            ">
						<view style="flex: 33.33%">
							<view :style="{ color: $theme.LOG_LABEL }">{{
                $lang.COIN_CURRENT_PRICE
              }}</view>
							<view style="font-size: 28rpx" :style="{ color: $theme.LOG_VALUE }">{{ item.price }}</view>
						</view>
						<view style="flex: 33.33%; text-align: center">
							<view :style="{ color: $theme.LOG_LABEL }">{{
                $lang.COIN_CURRENT_QTY
              }}</view>
							<view style="font-size: 28rpx" :style="{ color: $theme.LOG_VALUE }">{{ item.quantity }}
							</view>
						</view>
						<view style="flex: 33.33%; margin-left: auto; text-align: right">
							<view :style="{ color: $theme.LOG_LABEL }">{{
                $lang.COIN_CURRENT_TOTAL
              }}</view>
							<view style="font-size: 28rpx" :style="{ color: $theme.LOG_VALUE }">{{ item.total }}</view>
						</view>
					</view>
					<view style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              line-height: 1.8;
            ">
						<view style="font-size: 24rpx" :style="{ color: $theme.LOG_LABEL }">
							{{ item.sn }}
						</view>
						<view style="font-size: 26rpx" :style="{ color: $theme.LOG_VALUE }">
							{{ item.created_at }}
						</view>
					</view>
				</view>
			</block>
		</template>
	</view>
</template>

<script>
	export default {
		name: "CurrentRecord",
		props: {
			code: {
				type: String,
				default: "",
			},
		},
		data() {
			return {
				isShowCurCoin: true, // 是否僅顯示當前coin
				list: [],
			};
		},
		created() {
			console.log(`current record code:`, this.code);
			this.getList();
		},

		methods: {
			// 過濾出當前coin的數據
			filterCoin(e) {
				this.isShowCurCoin = e;
				this.getList(); // 重新請求數據
			},
			async handleCanel(val) {
				const result = await this.$http.post(`api/product/cancel`, {
					id: val,
				});
				if (!result) return false;
				console.log(`result:`, result);
				this.getList();
			},

			async getList() {
				let formData = {
					status: 0,
				};
				if (this.isShowCurCoin) {
					formData.code = this.code;
				}
				uni.showLoading({
					title: this.$lang.REQUEST_DATA,
				});
				const result = await this.$http.post(`api/user/order_bi`, formData);
				if (!result) return false;
				console.log(`result:`, result);
				const temp = !Array.isArray(result) || result.length < 0 ?
					[] :
					result.filter(
						(item) =>
						item.goods_info &&
						item.goods_info.gid > 0 &&
						item.order_bi_info &&
						item.order_bi_info.gid > 0
					);
				this.list =
					temp.length <= 0 ?
					[] :
					temp.map((item) => {
						return {
							id: item.id,
							name: item.goods_info.name,
							// fx   1市价 2限价
							fx: item.fx,
							fx: item.fx == 1 ?
								this.$lang.COIN_PRICE_TYPE_MARKET :
								this.$lang.COIN_PRICE_TYPE_LIMIT,
							direct: item.direct,
							// direct   1:买涨 买入；2：买跌 卖出
							directText: item.direct == 1 ?
								this.$lang.COIN_VIEW_BTN_BUY :
								this.$lang.COIN_VIEW_BTN_SELL,
							price: item.order_bi_info.price,
							quantity: item.order_bi_info.num,
							total: item.order_bi_info.user_pay,
							sn: item.order_sn,
							created_at: item.order_bi_info.created_at,
						};
					});
			},

			setStyle(val) {
				const temp = val == 1 ? this.$theme.RISE : this.$theme.FALL;
				return {
					backgroundColor: this.$theme.RGBConvertToRGBA(temp, 20),
					color: temp,
					borderRadius: `8rpx`,
					minWidth: `60rpx`,
					padding: `6rpx 16rpx`,
					fontSize: `22rpx`,
					textAlign: `center`,
				};
			},
			// cancel btn style
			setBtnStyle() {
				return {
					backgroundColor: this.$theme.FALL,
					color: "#FFFFFF",
					borderRadius: `44rpx`,
					minWidth: `60rpx`,
					padding: `12rpx 26rpx`,
					fontSize: `24rpx`,
					textAlign: `center`,
				};
			},
		},
	};
</script>

<style></style>