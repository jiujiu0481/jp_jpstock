<template>
	<view :class="isAnimat?'fade_in':'fade_out'" class="page_bg">
		<CustomHeaderSecond title="急騰株取引"></CustomHeaderSecond>				
			<!-- <image src="/static/ai_icon.png" style="width: 100%;height: 300px;"></image> -->
		<view class="nav-box">
			<view class="nav-item" :class="inv==0?'active':''" @click="qiehuan(0)">株式</view>
			<view class="nav-item" @click="$u.route({url:'/pages/trade/day/CoinRecord'});">申請記録</view>
		</view>
		<view
			style="background-color: #FFFFFF;min-height: 90vh;padding:40rpx;width: 85%;border-radius: 10px;margin-left: 10px;">
			<view style="font-size: 14px;">
				<view>
					<view style="font-weight: 800;border-bottom:2px solid #d7060f;width: 70px;" :style="{color:$theme.LOG_VALUE}">
						{{$lang.TRADE_DAY_TIP_INPUT_AMOUNT}}
					</view>
			
					<view class="common_input_wrapper">
						<input v-model="amount" type="number" :placeholder="$lang.TRADE_DAY_TIP_INPUT_AT"
							:placeholder-style="$theme.setPlaceholder()" style="width: 80%;margin-left: 10px;"></input>
						<view style="color:#999;">{{$lang.CURRENCY_UNIT}}</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: flex-end;"
						:style="{color:$theme.LOG_LABEL}">
						<view style="padding-right: 10px;">{{$lang.ACCOUNT_AMOUNT_AVAILABLE}}:</view>
						<view :style="{color:$theme.LOG_VALUE}">{{available}}</view>
						<view style="padding-left: 10px;" :style="{color:$theme.PRIMARY}" @click="linkDeposit">
							{{$lang.DEPOSIT_TITLE}}
						</view>
					</view>
				</view>
			     
				 <view style="font-weight: 800;border-bottom:2px solid #d7060f;width: 70px;" :style="{color:$theme.LOG_VALUE}">
				 	取引説明
				 </view>
				<view style="padding:10px 0px;border-radius: 10px;"
					:style="{color:$theme.LOG_VALUE}">
					<view style="padding-bottom: 6px;">{{$lang.TRADE_DAY_TIP}}:</view>
					<block v-for="(item,index) in $lang.TRADE_DAY_TIP_TEXT" :key="index">
						<view style="padding-bottom: 6px;">{{item}}</view>
					</block>
				</view>
			
				<view style="position: fixed;bottom: 0;left: 0;right: 0;background-color: #FFFFFF;padding:40rpx">
					<view class="btn_com"  @click="handleBuy()">
						{{$lang.TRADE_DAY_BUY}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HeaderThird from '@/components/header/HeaderThird.vue';

	export default {
		components: {
			HeaderThird,
		

		},
		data() {
			return {
				isAnimat: false, // 页面动画
				inv: 0,
				amount: '',
				available: '',
			}
		},
		onShow() {
			this.isAnimat = true;

			if (this.$refs.log && inv == 1)
				this.$refs.log.getList();

		},
		onHide() {
			this.isAnimat = false;
		},
		created() {
			this.getAccountInfo();
		},
		methods: {
			
			// 跳转到充值页面
				linkDeposit() {
					uni.navigateTo({
						url: this.$paths.ACCOUNT_DEPOSIT
					})
				},
			
				// 购买
				async handleBuy() {
					if (this.amount == '' || this.amount <= 0) {
						uni.showToast({
							title: this.$lang.TRADE_DAY_TIP_INPUT_AT,
							icon: 'none'
						});
						return false;
					}
					// 弹层
					const result = await uni.showModal({
						title: '',
						content: this.$lang.TRADE_DAY_MODAL_CONTENT,
						cancelText: this.$lang.BTN_CANCEL,
						confirmText: this.$lang.BTN_CONFIRM,
						confirmColor: this.$theme.PRIMARY,
						cancelColor: this.$theme.MODAL_CANCEL,
					});
					console.log('异步弹层:', result);
					if (result[1].confirm) {
						this.buy();
					}
				},
			
				async buy() {
					uni.showLoading({
						title: this.$lang.API_DATA_SUBMIT,
					});
					const result = await this.$http.post(`api/rinei/buy`, {
						money: this.amount,
					});
					console.log(result);
					if (!result) return false;
					uni.showToast({
						title: this.$lang.API_POST_SUCCESS,
						icon: 'success'
					});
					setTimeout(() => {
						this.amount = '';
						uni.navigateTo({
							url: this.$paths.TRADE_DAY_RECORD
						})
					}, 1000);
				},
				async getAccountInfo() {
					uni.showLoading({
						title: this.$lang.API_GET_ACCOUNT_INFO
					});
					const result = await this.$http.get(`api/user/fastInfo`);
					if (!result) return false;
					console.log(result);
					this.available = this.$util.formatNumber(result.money) || 0;
				},
			
			qiehuan(num) {
				this.inv = num;
				if (num == 1) {
					this.$refs.log.getList();
				}
			},
			linkRecord() {
				uni.navigateTo({
					url: this.$paths.TRADE_DAY_RECORD
				})
			}
		},
	}
</script>
<style>
	.nav-box {
		height: 60px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		// position: fixed;
		width: 100%;
		// left: 0;
		// top: 54px;
		background: #f4f4f4;
		// box-sizing: border-box;
		z-index: 10
	}
	
	.nav-box .nav-item {
		width: 45%;
		margin: 0 11px;
		height: 40px;
		background: #fff;
		border-radius: 20px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-weight: 500;
		font-size: 14px;
		color: #585b58
	}
	
	.nav-box .active {
		background: #666666;
		color: #fff
	}
	
</style>