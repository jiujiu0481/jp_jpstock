<template>
	<view>
		<view class="mask" @click="handleClose()"></view>
		<view class="modal_wrapper">
			<view
				style="background-color: #FFFFFF;border-radius: 44rpx 44rpx 0 0;padding-top:40rpx;padding-bottom: 20rpx;">
				<view style="text-align: center;font-size: 32rpx;font-weight: 700;position: relative;">
					利益確定と損失限定
					<view style="position: absolute;top: -20rpx; right: 32rpx;" @click="handleClose()">
						<image src="/static/close.svg" mode="aspectFit" :style="$theme.setImageSize(36)"></image>
					</view>
				</view>
				<view style="padding: 40rpx;">
					<view style="display: flex;align-items: center;">
						<view style="padding-right: 10rpx;font-size: 28rpx;" :style="{color:$theme.SECOND}">
							{{info.name}}
						</view>
						<view
							style="background-color: #F3F3F3;font-size: 22rpx;border-radius: 8rpx;padding:6rpx 16rpx;margin:0 20rpx;"
							:style="{color:$theme.FALL}">
							{{info.lever+` X`}}
						</view>
						<view
							style="background-color: #F3F3F3;font-size: 22rpx;border-radius: 8rpx;padding:6rpx 16rpx;margin:0 20rpx;"
							:style="{color:info.fx==1?'#6D41FF':$theme.SECOND}">
							{{info.fxText}}
						</view>
						<view style="margin-left: auto;">
							<view class="common_tag" style="padding: 4px 6px;border-radius: 8px	;"  :style="setStyle(info.direct)">
								{{info.directText}}
							</view>
						</view>
					</view>

					<!--  -->
					<view
						style="display: flex;align-items: center;justify-content: space-between;line-height: 2.4;margin-top: 20rpx;">
						<view style="font-size: 24rpx;" :style="{color:$theme.LOG_LABEL}">
							購入価格
						</view>
						<view>{{$util.formatCurrency(info.price)}}</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;line-height:  2.4;">
						<view style="font-size: 24rpx;" :style="{color:$theme.LOG_LABEL}">
							購入数量
						</view>
						<view>{{$util.formatCurrency(info.quantity)}}</view>
					</view>
					<view
						style="display: flex;align-items: center;justify-content: space-between;line-height:  2.4;margin-bottom: 20rpx;">
						<view style="font-size: 24rpx;" :style="{color:$theme.LOG_LABEL}">
							購入合計
						</view>
						<view>{{$util.formatCurrency(info.total)}}</view>
					</view>

					<TitleSecond :title="'利益金額'"></TitleSecond>

					<view class="common_input_wrapper"
						style="background-color:#F5F6FB;border-radius: 8rpx;height: 32rpx;padding-left: 20rpx;margin:0 20rpx 20rpx 0;">
						<input v-model="profitAmount" type="digit" :placeholder="'利益金額'"
							:placeholder-style="$theme.setPlaceholder()" @blur="checkProfitAmount"></input>
					</view>

					<view style="font-size: 24rpx;margin-bottom: 40rpx;" :style="{color:$theme.LOG_LABEL}">
						{{'推定利益'+ `: `+$util.formatCurrency(estimatedProfit)+ ` USDT`}}
					</view>

					<TitleSecond :title="'損失金額'"></TitleSecond>
					<view class="common_input_wrapper"
						style="background-color:#F5F6FB;border-radius: 8rpx;height: 32rpx;padding-left: 20rpx;margin:0 20rpx 20rpx 0;">
						<input v-model="lossAmount" type="digit" :placeholder="'損失金額'"
							:placeholder-style="$theme.setPlaceholder()" @blur="checkLossAmount"></input>
					</view>
					<view style="font-size: 24rpx;" :style="{color:$theme.LOG_LABEL}">
						{{'推定損失'+ `: `+$util.formatCurrency(estimatedLoss)+ ` USDT`}}
					</view>
				</view>

				<view class="common_btn" style="margin: 60rpx auto; width: 80%;" @tap="handleSubmit()">
					確認
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import TitleSecond from '@/components/title/TitleSecond.vue';
	export default {
		name: 'ProfitLoss',
		components: {
			TitleSecond
		},
		props: {
			info: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				isShow: false,
				profitAmount: '', // 止盈輸入金額
				lossAmount: '', // 止損輸入金額
				estimatedProfit: '', // 预估盈
				estimatedLoss: '', // 预估损
			}
		},
		computed: {
			// direct   1:买涨 买入 买多；2：买跌 卖出 卖少
			isBuy() {
				if (this.info) {
					return this.info.direct == 1;
				}
			},
		},
		methods: {
			handleClose() {
				this.isShow = false;
				this.$emit('action', 1);
			},

			// check 止盈输入值 并计算预估止盈值
			checkProfitAmount() {
				console.log(`checkProfitAmount:`, this.profitAmount);
				if (this.profitAmount == '') return false;
				if (!this.$util.checkInputNumber(this.profitAmount)) return false;
				this.profitAmount = this.$util.checkInputNumber(this.profitAmount);

				// 买涨：止盈>price 
				if (this.isBuy) {
					if (this.profitAmount < this.info.price * 1) {
						uni.showToast({
							title: '利益は価格より大きくなければなりません',
							icon: 'none'
						});
						return false;
					}
				} else {
					// 买跌：止盈 < price
					if (this.profitAmount > this.info.price * 1) {
						uni.showToast({
							title:'利益は価格より小さくなければなりません',
							icon: 'none'
						});
						return false;
					}
				}
				// 计算预估盈
				// 止盈设置10000，买入价9000，如果买涨，就是1000;如果买跌，就是-1000
				this.estimatedProfit = this.isBuy ?
					this.$util.formatNumber(this.profitAmount - this.info.price * 1, 4) :
					this.$util.formatNumber(this.info.price * 1 - this.profitAmount, 4);

				return true;
			},
			checkLossAmount() {
				console.log(`checkLossAmount:`, this.lossAmount);
				if (this.lossAmount == '') return false;
				if (!this.$util.checkInputNumber(this.lossAmount)) return false;
				this.lossAmount = this.$util.checkInputNumber(this.lossAmount);

				// 买涨：止损<price
				if (this.isBuy) {
					if (this.lossAmount > this.info.price * 1) {
						uni.showToast({
							title: '損失は価格より小さくなければなりません',
							icon: 'none'
						});
						return false;
					}
				} else {
					//  买跌：止损>price
					if (this.lossAmount < this.info.price * 1) {
						uni.showToast({
							title: '損失は価格より大きくなければなりません',
							icon: 'none'
						});
						return false;
					}
				}
				// 计算预估损
				// 止损设置8000，买入价是9000，如果买涨，就是-1000;  如果买跌，就是1000
				this.estimatedLoss = this.isBuy ?
					this.$util.formatNumber(this.lossAmount - this.info.price * 1, 4) :
					this.$util.formatNumber(this.info.price * 1 - this.lossAmount, 4);

				return true;
			},

			async handleSubmit() {
				// console.log(`profitAmount:`, this.profitAmount);
				// console.log(`lossAmount:`, this.lossAmount);
				// 两个输入框全都未输入时，提示用户输入
				if (this.profitAmount == '' && this.lossAmount == '') {
					uni.showToast({
						title: '有効な値を入力してください',
						icon: 'none'
					});
					return false;
				}
				let isCheck = false; // 当前带提交表单数据是否验证合法
				// 如果止盈输入框有内容，判断起合法性
				if (this.profitAmount != '') {
					// console.log(`止盈验证 profitAmount:`, this.profitAmount);
					isCheck = this.checkProfitAmount();
				}
				if (this.lossAmount != '') {
					// console.log(`止损验证 profitAmount:`, this.profitAmount);
					isCheck = this.checkLossAmount();
				}
				console.log(`验证结果:`, isCheck);
				if (!isCheck) return false;
				// 如果验证无误，执行提交事件
				uni.showLoading({
					title: '送信中',
					icon: 'loading'
				});
				// 止盈止损是可以设置一个,没有设置值的为'',
				const result = await this.$http.post(`api/user/yingsun`, {
					id: this.info.id,
					zhiying: this.profitAmount > 0 ? this.profitAmount : '',
					zhisun: this.lossAmount > 0 ? this.lossAmount : '',
				});
				if (!result) return false;
				console.log(`result:`, result);
				uni.showToast({
					title: result.message,
					icon: 'success'
				});
				setTimeout(() => {
					this.$emit('action', 1);
				}, 1000);
			},

			setStyle(val) {
				const temp = val == 1 ? this.$theme.RISE : this.$theme.FALL;
				return {
					backgroundColor: this.$theme.RGBConvertToRGBA(temp, 20),
					color: temp,
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 1111;
		background-color: rgba(0, 0, 0, 0.6);
		cursor: pointer;
	}

	.modal_wrapper {
		position: fixed;
		bottom: 0;
		left: 50%;
		right: 0;
		z-index: 11113;
		width: 100%;
		background-color: transparent;
		animation: popopUp 300ms forwards;
		transform: translateX(-50%);
	}
</style>