<template>
	<view :class="isAnimat?'fade_in':'fade_out'" class="page_bg">
		<CustomHeaderSecond title="デイトレード"></CustomHeaderSecond>
		<view class="page">
			
			<view class="info-box">
				<view class="info-title">{{role=='pay'?'取引パスワードの変更':'ログインパスワードを変更する'}}</view>
				<view class="info-name">元のパスワード:</view>
				<view class="input-item">
					
					<template v-if="isShow">
						<input v-model="oldPassword" type="text" placeholder="パスワードを入力してください" ></input>
					</template>
					<template v-else>
						<input v-model="oldPassword" type="password" placeholder="パスワードを入力してください"></input>
					</template>
					
					<img :src="isShow?$icon.yanjing:$icon.biyan" @click="isShow=!isShow">
				</view>
				<view class="info-name">新しいパスワード:</view>
				<view class="input-item">
					<template v-if="isShow">
						<input v-model="newPassword" type="text" placeholder="新しいパスワードを入力してください" ></input>
					</template>
					<template v-else>
						<input v-model="newPassword" type="password" placeholder="新しいパスワードを入力してください"></input>
					</template>
					
					<img :src="isShow?$icon.yanjing:$icon.biyan" @click="isShow=!isShow">
				</view>
				<view class="info-name">新しいパスワード:</view>
				<view class="input-item">
					<template v-if="isShow">
						<input v-model="newPassword2" type="text" placeholder="新しいパスワードをもう一度入力してください" ></input>
					</template>
					<template v-else>
						<input v-model="newPassword2" type="password" placeholder="新しいパスワードをもう一度入力してください"></input>
					</template>
					
					<img :src="isShow?$icon.yanjing:$icon.biyan" @click="isShow=!isShow">
				</view>
				<view  style="position: fixed;bottom: 0;left: 0;right: 0;background-color: #FFFFFF;padding:10px;z-index: 9999;">
				<view class="btn_com" @click="handleSubmit()">送信</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import HeaderSecond from '@/components/header/HeaderSecond.vue';
	import TitleSecond from '@/components/title/TitleSecond.vue';
	export default {
		// 变更登入密码、变更支付密码。
		components: {
			HeaderSecond,
			TitleSecond,
		},
		data() {
			return {
				isAnimat: false, // 页面动画
				isShow: false, // 密码显隐
				oldPassword: "", // 旧密码
				newPassword: "", // 新密码
				newPassword2: "", // 验证新密码
				role: '', // 根据当前角色，处理逻辑。
			};
		},
		computed: {
			// 当前页面用于:role=pay视为变更支付密码，否则视为变更登入密码
			isPay() {
				return this.role == 'pay';
			},
			// 当前页面header标题
			setTitle() {
				return this.isPay ? this.$lang.PAY_PASSWORD_TITLE : this.$lang.SIGNIN_PASSWORD_TITLE
			}
		},
		onLoad(opt) {
			console.log(opt.role);
			this.role = opt.role || '';
		},
		onShow() {
			this.isAnimat = true;
		},
		onHide() {
			this.isAnimat = false;
		},
		methods: {
			// 切换密码显隐
			toggleShow() {
				this.isShow = !this.isShow;
			},
			// 检查表单
			checkForm() {
				if (this.oldPassword == '') {
					uni.showToast({
						title: this.$lang.ENTER_OLD_PASSWORD,
						icon: 'none'
					});
					return false;
				}
				if (this.newPassword == '') {
					uni.showToast({
						title: this.$lang.ENTER_NEW_PASSWORD,
						icon: 'none'
					});
					return false;
				}
				if (this.newPassword2 == '') {
					uni.showToast({
						title: this.$lang.ENTER_NEW_PASSWORD,
						icon: 'none'
					});
					return false;
				}
				if (this.newPassword != this.newPassword2) {
					uni.showToast({
						title: this.$lang.ENTER_VERIFY_FAIL,
						icon: 'none'
					});
					return false;
				}
				return true;
			},
			// 提交事件
			handleSubmit() {
				if (this.checkForm()) {
					this.updatePassword();
				}
			},
			//修改密码
			async updatePassword() {
				uni.showToast({
					title: this.$lang.API_DATA_SUBMIT,
					icon: 'loading',
				});
				const temp = this.isPay ? `updatePayPassword` : `updateLoginPassword`
				const result = await this.$http.post(`api/user/${temp}`, {
					oldpass: this.oldPassword,
					newpass: this.newPassword,
					confirmpass: this.newPassword2,
				});
				console.log(result);
				uni.showToast({
					title: this.API_POST_SUCCESS,
					icon: 'success',
				});
				setTimeout(() => {
					uni.switchTab({
						url: this.$paths.ACCOUNT_CENTER
					});
				}, 1000)
			},
		}
	}
</script>

<style>
	@charset "UTF-8";

	/* uni.scss */
	.info-box {
		padding: 11px 22px 22px 22px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.info-box .info-img {
		width: 208px;
		height: 200px
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
		padding: 0 9px
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