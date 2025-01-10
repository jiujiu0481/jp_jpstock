<template>
	<view>
		<view class="common_mask" @click="actionEvent()"></view>
		<view class="common_popup" style="min-height:35vh;margin:auto">
			<view class="popup_header" style="font-size: 11px;background-color: #e4013e;">
				{{info.name}}


				<image src="/static/close.png" mode="aspectFit"
					style="position: absolute;top:50%;right: 30px;transform: translateY(-50%);width: 15px;"
					@click="actionEvent()" />

			</view>
			<view style="padding-bottom: 30rpx;font-size: 14px;">

				<view class="common_input_wrapper flex-b"
					style="padding-left: 20px;margin:20px 40rpx;margin-bottom: 0;">
					<input v-model="amount" :placeholder="$lang.TRADE_LARGE_TIP_BUY_COUNT" type="number"
						style="width: 80%;font-size: 14px;"></input>
					<view style="color: #999;text-align: right;width: 15%;">{{$lang.QUANTITY_UNIT}}</view>
				</view>
				<view style="padding: 10px 30px;" class="flex flex-b">
					<text :style="{color:$theme.LOG_LABEL}">最小限のアプリケーション</text>
					<text :style="{color:$theme.PRIMARY}">
						{{$util.formatNumber(info.min_num) }}</text>
				</view>
				<!-- min_num -->

				<view style="padding: 10px 30px;" class="flex flex-b">
					<text :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_LARGE_BUY_AMOUNT}}</text>
					<text :style="{color:$theme.PRIMARY}">
						{{$util.formatMoney(info.price) +` `+$lang.CURRENCY_UNIT }}</text>
				</view>

				<!-- 杠杆默认有一个数组，当数组大于1，视为开启杠杆功能 -->
				<template v-if="leverList.length>1">
					<view style="padding-left: 30px;font-size: 14px;font-weight: 800;margin-top: 20px;"
						:style="{color:$theme.LOG_LABEL}">
						{{$lang.LEVER}}
					</view>

					<view style="display: flex;align-items: center;flex-wrap: wrap;margin-left: 30rpx;">
						<block v-for="(item,index) in leverList" :key="index">
							<view
								style="border-radius: 8rpx;width:12%;margin:10rpx;padding:6rpx 10rpx;line-height: 1.6;text-align: center;"
								:style="setStyle(curLever==item)" @click="chgangeLever(item)">
								{{item}}
							</view>
						</block>
					</view>
				</template>

				<view style="padding: 10px 30px;" class="flex flex-b">
					<view :style="{color:$theme.LOG_LABEL}">{{$lang.TRADE_LARGE_BUY_TOTAL_AMOUNT}}</view>
					<view :style="{color:$theme.PRIMARY}">
						{{$util.formatMoney(buyAmount) +` `+$lang.CURRENCY_UNIT }}
					</view>
				</view>

				<!-- <view class="common_input_wrapper" style="margin:30rpx 40rpx;padding-left: 20px;">
					<input v-model="password" :placeholder="$lang.TRADE_LARGE_TIP_BUY_PWD" type="password"
						:placeholder-style="$theme.setPlaceholder()"></input>
				</view> -->

				<view style="padding: 10px 30px;" class="flex flex-b">
					<view style="padding-right: 10px;">{{$lang.ACCOUNT_AMOUNT_AVAILABLE}}:</view>
					<view :style="{color: $theme.SECOND}">{{available +` ` + $lang.CURRENCY_UNIT}}</view>
				</view>

				<view class="bold text-center" @tap.stop="handleConfirm()"
					style="background-color: #e4013e;padding: 10px;border-radius: 5px;color: #fff;font-size: 14px;margin: 20px;">
					{{$lang.BTN_CONFIRM}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'TradeLargeBuy',
		props: {
			info: {
				type: Object,
				default: {}
			},
		},
		data() {
			return {
				isShow: true,
				amount: "", // 金额
				password: '', // 支付密码
				leverList: [], // 杠杆值数组
				curLever: 1, // 当前杠杆值
				available: 0,
			}
		},
		computed: {
			// 金额计算
			buyAmount() {
				return this.info.price * this.amount / this.curLever;
			},
		},
		created() {
			this.getAccountInfo();
		},
		methods: {
			setStyle(val) {
				return {
					...val ? this.$theme.LG_PRIMARY : this.$theme.LG_SECOND,
					color: val ? '#FFFFFF' : '#121212',
					borderRadius: `44rpx`,
					border: `1px solid ${val? this.$theme.TRANSPARENT:'#5A5A5A'}`
				}
			},
			actionEvent() {
				this.isShow = false;
				this.$emit('action', 1);
			},
			// 选择杠杆
			chgangeLever(val) {
				this.curLever = val;
			},

			handleConfirm() {
				if (this.checkForm()) {
					this.buy();
				}
			},
			checkForm() {
				if (this.amount == '') {
					uni.$u.toast(this.$lang.TRADE_LARGE_TIP_BUY_COUNT);
					return false;
				}
				// if (this.password == '') {
				// 	uni.$u.toast(this.$lang.TRADE_LARGE_TIP_BUY_PWD);
				// 	return false;
				// }
				return true;
			},
			async buy() {
				uni.showLoading({
					title: this.$lang.API_DATA_SUBMIT
				});
				const result = await this.$http.post(`api/goods-bigbill/doOrder`, {
					id: this.info.id,
					num: this.amount,
					pay_pass: this.password,
					ganggan: this.curLever,
				});
				if (!result) return false;
				uni.showToast({
					title: result.message,
					icon: 'success'
				});
				setTimeout(() => {
					this.actionEvent();
				}, 1000)
			},
			async getAccountInfo() {
				uni.showLoading({
					title: this.$lang.API_GET_ACCOUNT_INFO
				});
				const result = await this.$http.get(`api/user/fastInfo`);
				if (!result) return false;
				this.available = this.$util.formatMoney(result.money) || 0;
				// 处理杠杆，后端数据返回不一致。
				this.leverList = this.$util.leverList(result.ganggan);
				console.log('leverList:', this.leverList);
			},
		}
	}
</script>