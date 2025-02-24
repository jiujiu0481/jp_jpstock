<template>
	<view :class="isAnimat?'fade_in':'fade_out'"   class="page_bg_sec">
		
		<CustomHeaderSecond title="出金確認"></CustomHeaderSecond>
		<view class="page">
			<view class="block">
				<!-- <view class="head">
					<img @click="$util.goBack()" :src="$icon.zjt" class="back">
					<view class="title left_in" style="margin-left: 0px;">出金確認</view>
					<view class="back"></view>
				</view> -->

				<view class="short"></view>
			</view>
			<view class="card"  style="background-image: url(/static/center_backimg.png);	background-position: 0 0 ;background-repeat: no-repeat;
						background-size:100%;width: auto;height:auto;">口座残高<span>{{$util.formatMoney(userInfo.money)}}</span></view>
			<view class="box" style="margin-top: 30px;">
				<view class="info-name">金融口座</view><!---->
				<view class="input-item" @click="$u.route({url:'/pages/account/bankCard'});">銀行カードをバインドする</view>
				<view class="info-name">出金金額:</view>
				<view class="input-item">
					<input v-model="amount" placeholder="出金金額を入力してください" type="number"></input>
				</view>
				<view class="info-name">取引パスワード:</view>
				<view class="input-item">

					<input v-model="password" type="password" placeholder="ファンドのパスワードを入力してください"></input>
				</view>
				<!-- <view class="btn-big" @click="handleWithdraw()">送信</view> -->
			</view>
			<view class="tip" style="margin-top: 30px;margin: 0 10px;">
				<view class="tip-tit"><span>*</span>ご注意:</view>
				<view class="tip-txt"> • 未成約の注文がある場合は、出金できません。</view>
				<view class="tip-txt"> • 出金を行う前に、本人確認と銀行口座の登録が必要です。</view>
				<view class="tip-txt"> • 出金可能時間は、平日の09:00:00から15:00:00までです。</view>
				<view class="tip-txt"> • 出金の最低額は10000円です。</view>
				<view class="tip-txt"> • 出金を行った場合、通常2時間で口座残高に反映されます。各銀行による入金のタイミングは異なりますが、最遅でも次の営業日の24時までには入金されます。</view>
			</view>
			<view style="position: fixed;bottom: 0;left: 0;right: 0;padding:40rpx;background-color: #fff">
				<view class="btn_com" @click="handleWithdraw()">
					送信
				</view>
			
			</view>
		
		</view>
	
	</view>
</template>

<script>
	export default {

		data() {
			return {
				isAnimat: false, // 页面动画
				isShow: false, // 密码显隐
				showAmount: false, // 显示金额
				hideAmount: '******', // 隐藏金额
				amount: '',
				password: '',
				userInfo: {},
				cardData: {},
			};
		},
		computed: {
			cardLabels() {
				return [this.$lang.ACCOUNT_AMOUNT_AVAILABLE,
					this.$lang.ACCOUNT_COLD_AMOUNT,
					this.$lang.ACCOUNT_AMOUNT_TOTAL
				];
			},
		},
		onShow() {
			this.isAnimat = true;
			this.getAccountInfo();
		},
		onHide() {
			this.isAnimat = false;
		},
		methods: {
			// 切换密码显隐
			toggleShow() {
				this.isShow = !this.isShow;
			},
			fanhui() {
				uni.switchTab({
					url: '/pages/home/index'
				})
			},
			// 总资产显隐控制
			handleShowAmount() {
				this.showAmount = !this.showAmount;
			},
			// handleAllAmount(val) {
			// 	this.amount = val
			// },
			async handleWithdraw() {
				if (this.amount == '' || this.amount <= 0) {
					uni.showToast({
						title: this.$lang.TIP_AMOUNT_WITHDRAW,
						icon: 'none'
					});
					return false;
				}
				const result = await this.$http.post(`api/app/withdraw`, {
					type: 1,
					total: this.amount,
					pay_pass: this.password,
					remakes: "",
				});
				if (!result) return false;
				// uni.showLoading({
				// 	title: this.$lang.API_DATA_SUBMIT,
				// });
				setTimeout(() => {
					uni.switchTab({
						url: this.$paths.TRANSACTION + `?code=2`,
					})
				}, 1000)

			},
			async getAccountInfo() {

				const result = await this.$http.get(`api/user/fastinfo`);
				this.userInfo = result;
				this.cardData = {
					value1: this.userInfo.money || 0, // 可提
					value2: this.userInfo.freeze || 0, // 冻结
					value3: this.userInfo.totalZichan || 0, // 总资产
				};
			},
		},
	}
</script>
<style>
	@charset "UTF-8";

	.page {
		min-height: 100vh;
		box-sizing: border-box;
		background: #f7f9f8;
		padding-bottom: 26px
	}

	.card {
		padding: 30px 0;
		height: 160px;
		background: #fff;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .36);
		margin-top: 10px;
		display: -webkit-box;
		display: -webkit-flex;
	/* 	display: flex; */
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-weight: 400;
		font-size: 14px;
		color: #999
	}

	.card span {
		font-weight: 400;
		font-size: 28px;
		color: #111;
		margin-top: 8px
	}

	.box {
		background: #fff;
		padding: 0 15px;
		margin-top: 8px
	}

	.box .info-name {
		width: 100%;
		height: 37px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-weight: 600;
		font-size: 12px;
		color: #080827;
		letter-spacing: 0.5px;
		padding: 0 3px
	}

	.box .input-item {
		height: 35px;
		border-radius: 3px;
		border: 1px solid #bcbcbc;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 0 9px
	}

	.box .input-item uni-input {
		width: 100%;
		height: 33px;
		line-height: 33px;
		background: transparent;
		border: 0;
		font-size: 12px;
		font-weight: 400;
		color: #333
	}

	.box .input-item img {
		width: 16px;
		height: 12px;
		margin-left: 7px
	}

	.tip {
		padding: 10px
	}

	.tip .tip-tit {
		font-weight: 400;
		font-size: 13px;
		color: #666;
		line-height: 22px;
		margin-bottom: 3px
	}

	.tip .tip-tit span {
		color: #fd4d4c
	}

	.tip .tip-txt {
		font-weight: 400;
		font-size: 13px;
		color: #999;
		line-height: 22px
	}

	.btn-big {
		width: 100%;
		height: 39px;
		background: #e4013e;
		border-radius: 6px;
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
		font-size: 13px;
		color: #fff;
		margin-top: 26px
	}

	.uni-input-input {
		font-size: 12px;
		font-weight: 400;
		color: #333
	}
</style>