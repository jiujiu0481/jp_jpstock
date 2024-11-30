<!-- 绑定银行卡 -->
<template>
	<view :class="isAnimat?'fade_in':'fade_out'">
		<view class="page">
			<view class="block">

				<view class="head">
					<img @click="$u.route({type:'navigateBack'});" :src="$icon.zjt" class="back">
					<view class="title left_in" style="margin-left: 0px;">金融カード追加</view>
					<view class="back"></view>
				</view>
				<view class="short"></view>
			</view>
			<view class="info-box">
				<view class="text-center"><img src="/static/img/3.9698c7ef.png" class="info-img"></view>
				<view class="info-name">カード名義人名:</view>
				<view class="input-item">
					<input v-model="info.realName" type="text" placeholder="カード所有者の名前を入力してください"></input>
				</view>
				<view class="txt">※通帳、キャッシュカードに記載されているお名前を入力してください</view>
				<view class="info-name">金融カード番号:</view>
				<view class="input-item">
					<input v-model="info.qy_type" type="text" placeholder="金融カード番号を入力してください"></input>
				</view>
				<view class="info-name">金融機関の種類:</view>
				<view class="input-item">
					<input v-model="info.bankName" type="text" placeholder="金融機関の種類を入力してください"></input>
				</view>
				<view class="info-name">支店番号（支店名）:</view>
				<view class="input-item">
					<input v-model="info.bank_sub_name" type="text" placeholder="支店番号（支店名）を入力してください"></input>
				</view>
				<view class="info-name">口座種別</view>
				<view class="input-item">普通</view>
				<view  style="position: fixed;bottom: 0;left: 0;right: 0;background-color: #FFFFFF;padding:10px;z-index: 9999;">
					<view class="btn_com" style="margin-top: 20px;" @click="handleSubmit()">金融カード追加</view>
				</view>
			</view>
		</view>

		<!-- <view style="width: 95%;border-radius: 10px;margin-left: 10px;">
			<view style="background-color: #FFFFFF;padding:40rpx;border-radius: 10px;">
				<TitleSecond :title="$lang.BIND_BANK_CARD_REAL_NAME"> </TitleSecond>
				<view class="common_input_wrapper" style="margin-bottom: 20px;padding-left: 40rpx;">
					<input v-model="info.realName" type="text" :placeholder="$lang.BIND_BANK_CARD_REAL_NAME"
						:placeholder-style="$theme.setPlaceholder()" style="width: 80%;"></input>realName
				</view>

				<TitleSecond :title="$lang.BIND_BANK_CARD_BANK_NAME"> </TitleSecond>
				<view class="common_input_wrapper" style="margin-bottom: 20px;padding-left: 40rpx;">
					<input v-model="info.bankName" type="text" :placeholder="$lang.BIND_BANK_CARD_BANK_NAME"
						:placeholder-style="$theme.setPlaceholder()" style="width: 80%;"></input>
				</view>
				<TitleSecond :title="$lang.BIND_BANK_CARD_BANK_SUB_NAME"> </TitleSecond>
				<view class="common_input_wrapper" style="margin-bottom: 20px;padding-left: 40rpx;">
					<input v-model="info.bank_sub_name" type="text" :placeholder="$lang.BIND_BANK_CARD_BANK_SUB_NAME"
						:placeholder-style="$theme.setPlaceholder()" style="width: 80%;"></input>bank_sub_name
				</view>
				
				<TitleSecond :title="$lang.BIND_BANK_CARD_TYPE"> </TitleSecond>
				<view class="common_input_wrapper" style="margin-bottom: 20px;padding-left: 40rpx;">
					<input v-model="info.qy_type" type="text" :placeholder="$lang.BIND_BANK_CARD_TYPE"
						:placeholder-style="$theme.setPlaceholder()" style="width: 80%;"></input>qy_type
				</view>

				<TitleSecond :title="$lang.BIND_BANK_CARD_ID"> </TitleSecond>
				<view class="common_input_wrapper" style="margin-bottom: 20px;padding-left: 40rpx;">
					<input v-model="info.cardSN" type="text" :placeholder="$lang.BIND_BANK_CARD_ID"
						:placeholder-style="$theme.setPlaceholder()"></input>
				</view>
			</view>
		</view> -->

	</view>
</template>

<script>
	import HeaderSecond from '@/components/header/HeaderSecond.vue';
	import TitleSecond from '@/components/title/TitleSecond.vue';
	export default {
		components: {
			HeaderSecond,
			TitleSecond,
		},
		data() {
			return {
				isAnimat: false, // 页面动画
				info: {},
			};
		},
		computed: {
			isRtl() {
				return this.$util.isRtl();
			},
		},
		onLoad() {

		},
		onShow() {
			this.getAccountInfo()
			this.isAnimat = true;
		},
		onHide() {
			this.isAnimat = false;
		},
		methods: {
			// 检查表单
			checkForm() {
				if (this.info.realName == '') {
					uni.showToast({
						title: this.$lang.TIP_BIND_BANK_CARD_REAL_NAME,
						icon: 'none'
					});
					return false;
				}
				if (this.info.bankName == '') {
					uni.showToast({
						title: this.$lang.TIP_BANK_NAME,
						icon: 'none'
					});
					return false;
				}
				if (this.info.cardSN == '') {
					uni.showToast({
						title: this.$lang.TIP_BANK_CARD,
						icon: 'none'
					});
					return false;
				}
				if (this.info.bank_sub_name == '') {
					uni.showToast({
						title: this.$lang.BIND_BANK_CARD_BANK_SUB_NAME,
						icon: 'none'
					});
					return false;
				}
				// if (this.info.zd_number == '') {
				// 	uni.showToast({
				// 		title: this.$lang.BIND_BANK_CARD_BANK_SUB_CODE,
				// 		icon: 'none'
				// 	});
				// 	return false;
				// }
				if (this.info.qy_type == '') {
					uni.showToast({
						title: this.$lang.BIND_BANK_CARD_TYPE,
						icon: 'none'
					});
					return false;
				}
				return true;
			},
			// 提交事件
			handleSubmit() {
				if (this.checkForm()) {
					this.bindCard();
				}
			},

			// 换绑银行卡
			async bindCard() {
				uni.showToast({
					title: this.$lang.API_DATA_SUBMIT,
					icon: 'loading',
				});
				const result = await this.$http.post(`api/user/bindBankCard`, {
					realname: this.info.realName,
					bank_name: this.info.bankName,
					// card_sn: this.info.cardSN,
					zd_number: this.info.bank_sub_name,
					// zd_number: this.info.zd_number,
					card_sn: this.info.qy_type,
				})
				console.log(result);
				if (!result) return false;
				uni.showToast({
					title: this.API_POST_SUCCESS,
					icon: 'success',
				});
				setTimeout(() => {
					uni.redirectTo({
						url: this.$paths.ACCOUNT_CENTER
					});
				}, 1000)
			},

			//用户信息
			async getAccountInfo() {

				const result = await this.$http.get(`api/user/fastinfo`);
				if (!result) return false;
				// 未有真实姓名，跳转到实名认证
				if (!result.real_name) {
					uni.navigateTo({
						url: this.$paths.ACCOUNT_AUTH,
					})
				}
				if (result.bank_card_info) {
					this.info = {
						realName: result.bank_card_info.realname || '',
						bankName: result.bank_card_info.bank_name || '',
						// cardSN: result.bank_card_info.card_sn || '',
						bank_sub_name: result.bank_card_info.zd_number || '',
						// zd_number: result.bank_card_info.zd_number || '',
						qy_type: result.bank_card_info.card_sn || '',
					}
				}
			},
		},
	}
</script>
<style>
	@charset "UTF-8";

	/* uni.scss */
	.info-box {
		padding: 11px 22px 22px 22px;
		/* display: flex;
	  flex-direction: column;
	  align-items: center; */
		box-sizing: border-box
	}

	.info-box .info-img {
		width: 300px;
		height: 224px
	}

	.info-box .info-title {
		width: 100%;
		height: 34px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-weight: 600;
		font-size: 17px;
		color: #2a2a2a
	}

	.info-box .info-name {
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

	.info-box .input-item {
		width: 100%;
		height: 35px;
		border-radius: 3px;
		border: 1px solid #bcbcbc;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 0 9px;
		box-sizing: border-box
	}

	.info-box .input-item uni-input {
		width: 100%;
		height: 33px;
		line-height: 33px;
		background: transparent;
		border: 0;
		font-size: 12px;
		font-weight: 400;
		color: #333
	}

	.info-box .input-item img {
		width: 16px;
		height: 12px;
		margin-left: 7px
	}

	.info-box .txt {
		margin: 5px 0;
		font-size: 12px;
		color: #777
	}

	.uni-input-input {
		font-size: 12px;
		font-weight: 400;
		color: #333
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
</style>