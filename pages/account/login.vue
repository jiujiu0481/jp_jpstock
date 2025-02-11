<template>

	<view class="page" style="background-image:url(/static/background_login.png);background-repeat: no-repeat;position:0 0;background-size: cover;min-height: 100vh; ">
		<view class="block">
			<!-- <view class="head">
				<img @click="$u.route({type:'navigateBack'});" :src="$icon.zjt" class="back">

				<view class="title left_in" style="margin-left: 0px;">ログイン</view>
				<view class="back"></view>
			</view> -->
		</view>
		<view class="box" style="padding-top: 60px;" ><img src="/static/sign_in_icon.png"  class="box-top" :style="$theme.setImageSize(260,300)" >
			<view class="box-info" style="margin-left: 0px;background-color: rgba(255, 255, 255, 0.9); margin-top: 30px; padding: 10px;">
			<!-- 	<view class="box-title">ログイン</view> -->
				<!-- <view class="box-name">ログインID（電話番号）</view> -->
				<view class="box-list">
					<view class="box-input">
						<view style="padding-right: 24rpx;">
							<image src="/static/sign_user.svg" mode="aspectFit" :style="$theme.setImageSize(46)"></image>
						</view>
						<input  style="font-size: 16px;" v-model="user" type="number" placeholder="携帯電話番号を入力してください" maxlength="11"
							:placeholder-style="$theme.setPlaceholder()"></input>
						<view style="height: 20px;width: 20px;" @click="user=''">×</view>
					</view>
				</view>
				<view style="padding-top: 30px;"></view>
			<!-- 	<view class="box-name">パスワード</view> -->
				<view class="box-list">
					<view class="box-input">
						<view style="padding-right: 24rpx;">
							<image src="/static/sign_pwd.svg" mode="aspectFit" :style="$theme.setImageSize(46)"></image>
						</view>
						<input style="font-size:16px;" v-model="password" :password="isMask" placeholder="パスワードを入力してください" :placeholder-style="$theme.setPlaceholder()"></input>
						<img :src="`/static/mask_${isMask?`hide`:`show`}.svg`" :style="$theme.setImageSize(40)" mode="aspectFit" @click="toggleMask()">
					</view>
				</view>
				<view style="margin-top: 14px;"  class="box-middle" @click="$u.toast('それを取得するには、カスタマー サービスに連絡してください。');">
					<span>パスワードがご不明の方</span><span>お問い合わせ</span>
				</view>
				<view style="margin-top: 14px;" class="btn_com" @click="handleConfirm()">ログインする</view>
				<view class="box-foot" @click="$u.route({url:'/pages/account/register'});"> 新規アカウント作成はこちら<img
						src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFGmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjQtMTAtMDJUMTI6MDQ6MDUrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDI0LTEwLTAyVDEyOjQwOjMxKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTEwLTAyVDEyOjQwOjMxKzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI5OTMyYjRkLTlkYzEtNGJmMS05YmJhLWZmZjkzZWY1NTZiMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyOTkzMmI0ZC05ZGMxLTRiZjEtOWJiYS1mZmY5M2VmNTU2YjIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyOTkzMmI0ZC05ZGMxLTRiZjEtOWJiYS1mZmY5M2VmNTU2YjIiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjI5OTMyYjRkLTlkYzEtNGJmMS05YmJhLWZmZjkzZWY1NTZiMiIgc3RFdnQ6d2hlbj0iMjAyNC0xMC0wMlQxMjowNDowNSswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+tOBA/gAAAsNJREFUaIHt2k9olEccxvHPuyTRGkQRRPFQpGpbKKGHgoYEgq2xIEJAi9CDlELTSw+l9NBTa1DxICK5eFFoRVoVERRUsLT0Dx7ioQcpEVvahsaS0qUimFCqQW08jNTNuO5us++7+6bs97TvM7O/mWdn3pnfvO8mE0kfdGMPurBSekziAPZVqbcIJ7EF7TXG/hOj2IWRZCLp68YIkrn1tSZewLUK5e/j4Bxjz6C3IIxEliags0r5kjpiJ9hdEKZTlhzHd1XqHMF4HW10JRNJ30wkDuCXOoKWcgt/1Fh3AZ5HR5myp3FMhZFtK6ON4YcaG0+TaXxfRl+FE6pMz0IWPUqRFfgaayN9PK6YZyPL8RWei/Sr2B5XLje18sAyfCks26X8iE3C/TSLPI7IUnyBFyP9Z7wibISPkTcji/E5Xor0XwUTT1wB82SkExexIdJ/w8uYqPTlvBh5ChfQG+m/CyNxvVqAPBhZiHPYGOlFwcRYLUGabaQDZ9Af6TeE1emnWgM100g7Tgupeyk3BROVsuVJIev997pZRtqE88dApN/CZuGcUYkpHC25Hm7GhljAp3gt0qfwKq7UGOctfIzbuNJoIwXhl3w90v8Spli1dD9mpDRwo0hwGG9E+t/YWtqpudBII4cwGGl3hPvkUr3BG2VkGO9E2jS2CRlu3TTCyH68F2l3sUPIq1IhayN78UGk3RNu9vNpNpTlqvUuPoy0+9gp7Ob1svphG1My3kc+iq7/wZs4lULsNnwjmIH1WU6tyZLPM3gbn6UUe41HJqA/SyODwoGoKOwdn6QYO36s2p7l1PoWz2QYfxbNTuNTo2Ukb7SM5I2WkbzRMpI3WkbyRstI3mgZyRv/GyPlDlbPyr/BdbHQJhxFS/8RdLZh3UmPYkH1R/jzgdEChsx+aTLfmMFQAZfRI7ygLza1S/+NotDnHlx+AIHkdV95ad2hAAAAAElFTkSuQmCC">
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	// import Translate from '@/components/Translate.vue';
	import TabsSeventh from '@/components/tabs/TabsSeventh.vue';
	export default {
		components: {
			// Translate,
			TabsSeventh,
		},
		data() {
			return {
				isAnimat: false, // 页面动画
				isMask: null,
				user: "", // 账户
				password: '', // 密码
				verifyPassword: '', // 确认密码
				emailCode: '', // 邮箱验证码（印度）
				code: '', // 邀请码
				curTab: 0,
				isRemember: true, // 记住密码
				isAgree: false, // 同意隐私协议
				inv: 0
			};
		},
		computed: {
			// current is signin
			isSignIn() {
				return this.curTab < 1;
			},
			setTabs() {
				return [this.$lang.SIGN_IN_TITLE, this.$lang.SIGN_UP_TITLE]
			}
		},

		onShow() {
			this.isAnimat = true;
			// 读取缓存中的页面信息
			this.getStorageData();
			this.isMask = uni.getStorageSync('masking');
			this.changeRemember(this.isRemember);
			this.changeAgree(this.isAgree);
		},
		onHide() {
			this.isAnimat = false;
			// 缓存页面信息
			this.setStorageData();
		},
		methods: {
			toggleMask() {
				this.isMask = !this.isMask;
				this.$util.setDataMask(this.isMask);
			},
			
			bian(num) {
				this.inv += num
				if (this.inv < 0) {
					this.inv = 4;
				} else if (this.inv > 4) {
					this.inv = 0;
				}
			},
			// 切换当前 登录或注册
			changeTab(val) {
				// this.isSignIn = !this.isSignIn;
				this.curTab = val;
				this.setStorageData();
				this.getStorageData();
			},
			// 设置页面缓存信息
			setStorageData() {
				uni.setStorageSync('user', this.user);
				uni.setStorageSync('pwd', this.password);
				uni.setStorageSync('pwd1', this.verifyPassword);
				uni.setStorageSync('code', this.code);
				uni.setStorageSync('remember', this.isRemember);
				uni.setStorageSync('agree', this.isAgree);
			},
			// 获取页面缓存信息
			getStorageData() {
				this.user = uni.getStorageSync('user') || '';
				this.password = uni.getStorageSync('pwd') || '';
				this.verifyPassword = uni.getStorageSync('pwd1') || '';
				this.code = uni.getStorageSync('code') || '';
				this.isRemember = uni.getStorageSync('remember') || false;
				this.isAgree = uni.getStorageSync('agree') || false;
			},
			// 设置 激活样式
			setStyle(val) {
				return {
					backgroundColor: val ? this.$theme.SECOND : '#FFFFFF',
					color: val ? '#FFFFFF' : '#A8A8A8',
					padding: `16rpx 32rpx`,
					borderRadius: `44rpx`,
					minWidth: `120rpx`,
					textAlign: `center`,
				}
			},
			// 切换密码显隐
			toggleShow() {
				this.isShow = !this.isShow;
			},
			// 勾选记住密码
			changeRemember(e) {
				console.log(e);
				this.isRemember = e;
				uni.setStorageSync('remember', this.isRemember);
			},

			// 勾选用户隐私协议
			changeAgree(e) {
				console.log(e);
				this.isAgree = e;
				uni.setStorageSync('agree', this.isAgree);
			},

			// 用户隐私协议
			linkPact() {
				this.setStorageData();
				uni.navigateTo({
					url: this.$paths.PRVITE_PACT,
				})
			},

			handleConfirm() {
				if (this.checkForm()) {
					if (this.isSignIn) {
						this.signIn();
					} else {
						this.register();
					}
				}
			},
			checkForm() {
				if (this.user == '') {
					uni.showToast({
						title: this.$lang.TIP_ENTER_ACCOUNT_NAME,
						icon: 'none',
					});
					return false;
				}
				// 以下通用
				if (this.password == '') {
					uni.showToast({
						title: this.$lang.TIP_ENTER_ACCOUNT_PASSWORD,
						icon: 'none',
					});
					return false;
				}
				if (!this.isSignIn && this.verifyPassword == '') {
					uni.showToast({
						title: this.$lang.TIP_ENTER_VERIFY_ACCOUNT_PASSWORD,
						icon: 'none',
					});
					return false;
				}
				if (!this.isSignIn && this.verifyPassword != this.password) {
					uni.showToast({
						title: this.$lang.TIP_PWD_NOEQUAL,
						icon: 'none',
					});
					return false;
				}
				if (!this.isSignIn && !this.code) {
					uni.showToast({
						title: this.$lang.TIP_ENTER_INVITATION_CODE,
						icon: 'none',
					});
					return false;
				}

				return true;
			},

			async signIn() {
				uni.showLoading({
					title: this.$lang.API_SIGN_IN_NOW,
				});
				const result = await this.$http.post(`api/app/login`, {
					username: this.user,
					password: this.password,
				});
				console.log('result:', result);
				if (!result) return false;
				const token = result.token.access_token || '';
				uni.setStorageSync('token', token);
				uni.showToast({
					title: this.$lang.TIP_SUCCESS_SIGNIN,
					icon: 'success',
				});
				this.setStorageData();
				setTimeout(() => {
					uni.switchTab({
						url: this.$paths.HOME,
					});
				}, 1000);
			},
			async register() {
				uni.showLoading({
					title: this.$lang.API_SIGN_UP_NOW,
				});
				const result = await this.$http.post(`api/app/register`, {
					mobile: this.user,
					password: this.password,
					confirmpass: this.verifyPassword,
					invite: this.code,
					code: 123456,
				});
				console.log('result:', result);
				if (!result) return false;
				uni.showToast({
					title: this.$lang.TIP_SUCCESS_REGISTER,
					icon: 'success',
				});
				this.setStorageData();
				this.signIn();
			},
		}
	}
</script>

<style type="text/css">
	@charset "UTF-8";


	/**
	 * 这里是uni-app内置的常用样式变量
	 *
	 * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量
	 * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App
	 *
	 */
	/**
	 * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能
	 *
	 * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件
	 */
	/* 颜色变量 */
	/* 行为相关颜色 */
	/* 文字基本颜色 */
	/* 背景颜色 */
	/* 边框颜色 */
	/* 尺寸变量 */
	/* 文字尺寸 */
	/* 图片尺寸 */
	/* Border Radius */
	/* 水平间距 */
	/* 垂直间距 */
	/* 透明度 */
	/* 文章场景相关 */
	/* uni.scss */
	.box {
		padding: 1px 20px 0 20px;
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

	.box .box-info {
		width: 100%;
		margin-left: -400%;
		-webkit-transition-duration: 1s;
		-moz-transition-duration: 1s;
		-o-transition-duration: 1s
	}

	.box .box-top {
		width: 208px
	}

	.box .box-title {
		width: 100%;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-size: 17px;
		font-weight: 600;
		color: #2a2a2a;
		line-height: 24px;
		margin-top: 1px
	}

	.box .box-tip {
		width: 100%;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-size: 11px;
		font-weight: 400;
		color: #080827;
		line-height: 15px;
		letter-spacing: 0.5px;
		margin-top: 11px
	}

	.box .box-name {
		width: 100%;
		height: 37px;
		padding: 0 3px;
		font-size: 12px;
		font-weight: 600;
		color: #080827;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.box .box-list {
		height: 35px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.box .box-check {
		width: 78px;
		height: 35px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		justify-content: flex-end;
		font-size: 20px;
		font-weight: 400;
		color: #2a2a2a
	}

	.box .box-check img {
		width: 33px;
		height: 19px;
		margin-left: 2px
	}

	.box .box-input {
		width: calc(100%);
		height: 46px;
		/* border-radius: 3px; */
		border: 1px solid #cfcfcf;
		padding: 0 9px;
		box-sizing: border-box;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.box .box-input uni-input {
		width: 100%;
		height: 33px;
		line-height: 33px;
		background: transparent;
		border: 0;
		font-size: 12px;
		font-weight: 400;
		color: #333
	}

	.box .box-input img {
		width: 16px;
		height: 12px;
		margin-left: 7px
	}

	.box .box-middle {
		height: 43px;
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

	.box .box-middle span {
		font-size: 12px;
		font-weight: 400;
		color: #2a2a2a
	}

	.box .box-foot {
		height: 57px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-size: 11px;
		font-weight: 400;
		color: #000020
	}

	.box .box-foot span {
		font-size: 11px;
		font-weight: 400;
		color: #e4013e;
		margin-left: 9px
	}

	.box .box-foot img {
		width: 13px;
		height: 13px;
		margin-left: 5px
	}

	.uni-input-input {
		font-size: 12px;
		font-weight: 400;
		color: #333
	}
</style>