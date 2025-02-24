<template>
	<view>
		<view class="mask" @click="handleClose()"></view>
		<view class="modal_wrapper">
			<view
				style="background-color: #FFFFFF;border-radius: 44rpx 44rpx 0 0;padding-top:40rpx;padding-bottom: 20rpx;">
				<view style="text-align: center;font-size: 32rpx;font-weight: 700;position: relative;">
					ポジションを決済する
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
							<view :style="setStyle(info.direct)">
								{{info.directText}}
							</view>
						</view>
					</view>

					<!-- 市價 or  限價 -->
					<view style="margin:40rpx 0;">
						<u-radio-group v-model="radiovalue1" placement="row" @change="groupChange">
							<u-radio :customStyle="{marginRight: '24rpx'}" v-for="(item, index) in radioList"
								:key="index" :label="item.name" :name="item.name" @change="radioChange"
								:activeColor="$theme.RISE" labelSize="28rpx"
								:labelColor="item.name==radiovalue1?$theme.RISE:'#CFCFCF' ">
							</u-radio>
						</u-radio-group>
					</view>

					<template v-if="isMarket">
						<view class="common_input_wrapper"
							style="background-color:#F5F6FB;border-radius: 8rpx;height: 32rpx;padding-left: 20rpx;margin:0 20rpx 20rpx 0;">
							<input v-model="amount" type="digit" :placeholder="'金額を入力してください'"
								:placeholder-style="$theme.setPlaceholder()"></input>
						</view>
					</template>
					<template v-else>
						<view class="common_input_wrapper"
							style="background-color:#F5F6FB;border-radius: 8rpx;height: 32rpx;padding-left: 20rpx;margin:0 20rpx 20rpx 0;"
							:style="{color:$theme.LOG_LABEL}">
							{{$util.formatCurrency(info.curPrice)}}
						</view>
					</template>


					<TitleSecond :title="$lang.CONTRACT_CLOSE_QTY"></TitleSecond>
					<view class="common_input_wrapper"
						style="background-color:#F5F6FB;border-radius: 8rpx;height: 32rpx;padding-left: 20rpx;margin:20rpx 20rpx 20rpx 0;">
						<input v-model="quantity" type="digit" :placeholder="'数量を入力してください'"
							:placeholder-style="$theme.setPlaceholder()"></input>
					</view>
					<view style="margin-right: 20rpx;background-color: #F5F6FB;">
						<view style="border-radius: 12rpx;display: flex;align-items: center;">
							<view style="flex:1;">
								<u-slider v-model="sliderVal" min="0" max="100" :showValue="true" @change="changeSlider"
									:activeColor="$theme.PRIMARY" :blockColor="$theme.PRIMARY"></u-slider>
							</view>
							<view style="padding-right: 8rpx;">%</view>
							<view style="padding-right: 8rpx;color:#6D41FF;" @click="sliderValMax()">Max</view>
						</view>
						<view style="display: flex;align-items: center;justify-content: space-between;padding:0 12rpx;">
							<block v-for="(v,k) in percentOpt" :key="k">
								<view style="text-align: center;" :style="{color:v==curPercent?'#6D41FF':'#303133'}"
									@click="changePercent(v)">{{v}}%</view>
							</block>
						</view>
					</view>

					<view
						style="text-align: right;font-size: 24rpx;padding-right: 20rpx;line-height: 1.8;margin-top: 20rpx;"
						:style="{color:$theme.LOG_LABEL}">
						<template v-if="userInfo">
							残高{{`: ${$util.formatCurrency(userInfo.money)} USDT`}}
						</template>
					</view>

					<view
						style="font-size: 24rpx;line-height: 1.8;margin-top: 20rpx;text-align: right;padding-right: 20rpx;"
						:style="{color:$theme.LOG_LABEL}">
						数量:{{` ${$util.formatCurrency(info.quantity)} `}}
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
		name: 'CloseModal',
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
				radiovalue1:'市場',
				quantity: '', // 数量输入框
				amount: '', // 限价模式 输入金额
				userInfo: null, // 合約資產
				curLever: 1, // 杠桿
				sliderVal: 100, // 滑块滑动值
				curPercent: -1,
			}
		},
		computed: {
			// 单选项的选项组
			radioList() {
				return [{
					name:'市場',
					disabled: false
				}, {
					name: '指値',
					disabled: false
				}];
			},
			// 当前交易模式
			isMarket() {
				return this.radiovalue1 == this.radioList[1].name;
			},
			percentOpt() {
				return [25, 50, 75, 100]
			},
			// // 當前最大可買或可買數量
			// curMaxQTY() {
			// 	// 市價模式： 餘額/單價。 限價模式：餘額/輸入值
			// 	if (this.info) {
			// 		// info.quantity 

			// 		// 市價或限價模式下的單價
			// 		const temp = this.isMarket ? this.amount : this.info.curPrice;
			// 		// console.log(`curMaxQty:`, temp);
			// 		return temp * 1 > 0 ? this.$util.formatNumber(this.userInfo.money * this.curLever / temp, 4) : '';
			// 	}
			// },
		},
		beforeMount() {
			this.getAccountAssets();
			this.changeSlider(this.sliderVal);
		},
		methods: {
			// quantity 值计算
			calculateQTY() {
				this.quantity = this.$util.formatNumber(this.info.quantity * (this.sliderVal * 0.01), 4);
			},
			// 百分数值切换
			changePercent(val) {
				console.log(val);
				this.curPercent = val;
				this.sliderVal = this.curPercent;
				this.calculateQTY();
			},
			// 滑块一键最大值
			sliderValMax() {
				this.sliderVal = 100;
				this.changePercent(this.sliderVal);
				this.calculateQTY();
			},
			// 滑块滑动值变更
			changeSlider(e) {
				console.log(`e:`, e);
				console.log(`e:`, this.sliderVal);
				this.changePercent(this.sliderVal);
				this.calculateQTY();
			},
			// 模式
			groupChange(n) {
				console.log('groupChange', n);
				this.radiovalue1 = n;
			},
			radioChange(n) {
				console.log('radioChange', n);
				this.radiovalue1 = n;
			},

			handleClose() {
				this.isShow = false;
				this.$emit('action', 1);
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
				}
			},
			async handleSubmit() {
				if (this.quantity == '' || this.quantity <= 0) {
					uni.showToast({
						title: '数量を入力してください',
						icon: 'none'
					});
					return false;
				}
				if (!this.$util.checkInputNumber(this.quantity)) return false;

				// const temp = this.quantity.toString();
				// if (temp.includes('.')) {
				// 	if (temp.split('.')[1].length > 4) {
				// 		uni.showToast({
				// 			title: this.$lang.COMMON_TIP_ENTER_POINT_PREFIX + defaultPoint + this.$lang
				// 				.COMMON_TIP_ENTER_POINT_SUFFIX,
				// 			icon: 'none'
				// 		});
				// 		return false;
				// 	}
				// }
				let formData = {
					num: this.quantity,
					id: this.info.id,
					fx: this.isMarket ? 2 : 1, // 1市价 2限价
					// direct: 1, // direct   1买多    2卖少
					// ganggan: this.curLever, // 杠桿
				}
				if (this.isMarket) {
					formData.price = this.amount;
				}
				uni.showLoading({
					title: '送信中',
					icon: 'loading'
				});
				const result = await this.$http.get(`api/user/sell_heyue`, formData);
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

			// 获取账户 資產 信息 (每次切換買賣時，都調用一次該函數)
			async getAccountAssets() {
				const result = await this.$http.post(`api/user/assets`, {
					type: 2, // 合約賬戶
					name: 'USDT',
				});
				console.log(`assets:`, result);
				if (!result) return false;
				this.userInfo = result[0];
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