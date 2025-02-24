<template>
	<view :class="isAnimat?'fade_in':'fade_out'" class="page_bg_sec" style="background-size: 100% 80px;">
		<header style="display: flex;align-items: center;padding: 24px 28rpx;padding-bottom: 0;">
			<view style="margin-right: auto;">
				<image src="/static/logo2.jpg" mode="aspectFit" style="width: 32px;height: 32px;"></image>
			</view>
			<view style=" flex:60%">
				<view style="height: 56rpx;line-height: 56rpx;text-align: center;color:#FCFCFC;font-size: 28rpx;">
					マイページ
				</view>
			</view>
			<view style="margin-left: auto;">
				<image src="/static/close.png" mode="aspectFit" style="width: 20px;height: 20px;"
					@click="$util.goBack()"></image>
			</view>
		</header>
		<view class="page-card"
			style="background-image: url(/static/sakura.png); background-position:top  right; background-repeat: no-repeat; background-size: 80%;">
			<view style="display: flex;align-items: center;">
				<image :src="$icon.avatar" mode="aspectFit" style="width: 60px;height: 60px;padding-right: 24rpx;">
				</image>
				<!-- @click="$u.route({url:'/pages/setting'});" -->
				<view style="">
					<!-- <view style="display: flex;align-items: center;"> -->
					<view style="font-size: 32rpx;">{{userInfo.real_name}}</view>
					<!-- <image src="/static/edit.svg" mode="aspectFit"
							style="width: 16px;height: 16px;padding-left: 12rpx;">
						</image> -->
					<!-- </view> -->
					<view v-if="userInfo.mobile" style="color:#666;font-size: 12px;">{{userInfo.mobile}}</view>
				</view>
				<view style="margin-left: auto;text-align: right;">
					<view style="font-size: 12px;">信用スコア:<text style="color:#F24639;">{{userInfo.xinyong}}</text>
					</view>
					<view style="font-size: 12px;" :style="$theme.setStockRiseFall(!userInfo.is_check==1)">
						{{userInfo.is_check==1?'認証済み':(userInfo.is_check==-1?'認証されていません':(userInfo.is_check==2?'拒否する':'審査中'))}}
					</view>
				</view>
			</view>

			<view class="common_block"
				style="margin: 30rpx 0 0 0;padding:24rpx;background-color: rgba(255,255,255,0.3);">
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<view style="display: flex;align-items: center;">
						<view style="font-size: 32rpx;">残高</view>
						<image :src="showAmount?$icon.yanjing:$icon.biyan" mode="aspectFit"
							style="width: 16px;height: 16px;padding-left: 12rpx;" @click="showAmount=!showAmount">
						</image>
					</view>
					<view style="font-size: 36rpx;font-weight: 700;color: #f24639;">
						{{showAmount?$util.formatMoney(userInfo.totalZichan):hideAmount}}
					</view>
				</view>
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<view style="width: 160px; height: 160px; position: relative">
						<view id="main" style="width: 160px; height: 160px;">
							<qiun-data-charts type="pie" :opts="$icon.opts" :chartData="chartData" />
						</view>
						<view></view>
					</view>
					<view style="line-height: 1.3;">
						<view style="font-size: 12px;" :style="{color:$theme.LOG_LABEL}">
							<view style="background-color: #e36067;border-radius: 100%;display: inline-block;"
								:style="$theme.setImageSize(24)"></view>
							<text style="padding-left: 8rpx;">利用可能の金額</text>
						</view>
						<view style="font-size: 28rpx;padding-bottom: 8rpx;" :style="{color:$theme.LOG_VALUE}">
							{{showAmount?$util.formatMoney(userInfo.money):hideAmount}}
						</view>

						<view style="font-size: 12px;" :style="{color:$theme.LOG_LABEL}">
							<view style="background-color: #76e4e4;border-radius: 100%;display: inline-block;"
								:style="$theme.setImageSize(24)"></view>
							<text style="padding-left: 8rpx;">凍結資金</text>
						</view>
						<view style="font-size: 28rpx;padding-bottom: 8rpx;" :style="{color:$theme.LOG_VALUE}">
							{{showAmount?$util.formatMoney(userInfo.frozen):hideAmount}}
						</view>

						<view style="font-size: 12px;" :style="{color:$theme.LOG_LABEL}">
							<view style="background-color: #3F51B5;border-radius: 100%;display: inline-block;"
								:style="$theme.setImageSize(24)"></view>
							<text style="padding-left: 8rpx;">米ドル金額</text>
						</view>
						<view style="font-size: 28rpx;padding-bottom: 8rpx;" :style="{color:$theme.LOG_VALUE}">
							{{showAmount?0.0:hideAmount}}
						</view>

						<view style="font-size: 12px;" :style="{color:$theme.LOG_LABEL}">
							<view style="background-color: #FF9600;border-radius: 100%;display: inline-block;"
								:style="$theme.setImageSize(24)"></view>
							<text style="padding-left: 8rpx;">総利益</text>
						</view>
						<view style="font-size: 28rpx;" :style="{color:$theme.LOG_VALUE}">
							{{showAmount?$util.formatMoney(userInfo.totalYingli):hideAmount}}
						</view>
					</view>
				</view>
			</view>



			<view style="display: flex;flex: 1;align-items: center;justify-content: space-between; margin: 10px  0;">
				<view @click="linkDeposit">
					<image src="/static/deposit.png" mode="heightFix" :style="$theme.setImageSize(130)"></image>

				</view>
				<view @click="linkWithdraw">
					<image src="/static/withdraw.png" mode="heightFix" :style="$theme.setImageSize(130)"></image>

				</view>
			</view>



			<view style="display: flex;flex: 1;align-items: center;justify-content: space-between; margin: 10px  0;">
				<view @click="$u.route({url:'/pages/account/bankCard'});">
					<image src="/static/bank.png" mode="heightFix" :style="$theme.setImageSize(130)"></image>

				</view>
				<view @click="$u.route({url:'/pages/account/auth'});">
					<image src="/static/auth.png" mode="heightFix" :style="$theme.setImageSize(130)"></image>

				</view>
			</view>

		</view>
		<!-- <view style="display: flex;align-items: center;justify-content: space-between;padding: 0 12rpx;">
			<view style="flex:0 0 48%;border-radius: 12rpx;" @click="$u.route({url:'/pages/account/bankCard'});">
				<view style="background-image: url(/static/bank.png);
						background-position:center ;background-repeat: no-repeat;
						background-size: 100%;width: 100%;height: 80px;border-radius: 24rpx;">
				</view>
			</view>
			<view style="flex:0 0 48%;border-radius: 12rpx;" @click="$u.route({url:'/pages/account/auth'});">
				<view style="background-image: url(/static/auth.png);
						background-position:center;background-repeat: no-repeat;
						background-size: 100%;width: 100%;height: 80px;border-radius: 24rpx;">
				</view>
			</view>

		</view> -->

		<view class="page-foot">
			<!-- <view class="list" @click="$u.route({url:'/pages/account/bankCard'});">
					<view class="list-txt"><img src="/static/style/mine/menu1.png" :style="$theme.setImageSize(50)">金融口座
					</view><img :src="$icon.yjt1" class="list-arrow">
				</view> -->
			<view class="list" @click="$u.route({type:'switchTab',url:'/pages/transaction/index'});">
				<view class="list-txt"><img src="/static/style/mine/menu2.png">ファンド記録</view><img :src="$icon.yjt1"
					class="list-arrow">
			</view>
			<!-- <view class="list" @click="$u.route({url:'/pages/account/auth'});">
					<view class="list-txt"><img src="/static/style/mine/menu3.png">本人確認</view><img :src="$icon.yjt1"
						class="list-arrow">
				</view> -->
			<view class="list" @click="$util.linkCustomerService()">
				<view class="list-txt"><img src="/static/img/menu9.7c1a61f2.png">お問合わせ</view><img :src="$icon.yjt1"
					class="list-arrow">
			</view>

			<view class="list" @click="$u.route({url:'/pages/account/password'});">
				<view class="list-txt"><img src="/static/style/mine/menu5.png">ログインパスワード</view><img :src="$icon.yjt1"
					class="list-arrow">
			</view>
			<view class="list" @click="$u.route({url:'/pages/account/password?role=pay'});">
				<view class="list-txt"><img src="/static/style/mine/menu4.png">取引パスワード</view><img :src="$icon.yjt1"
					class="list-arrow">
			</view>
			<!-- <view class="list">
					<view class="list-txt"><img src="/static/style/mine/menu7.png?1">カスタマーサービスセンター</view><img
						:src="$icon.yjt1"
						class="list-arrow">
				</view>
				<view class="list">
					<view class="list-txt"><img src="/static/style/mine/menu6.png?1">言語を切り替える</view><img
						:src="$icon.yjt1"
						class="list-arrow">
				</view> -->
			<!-- <view class="list" @click="handleSignOut">
				<view class="list-txt"><img src="/static/style/mine/menu8.png">アカウントからログアウト</view><img :src="$icon.yjt1"
					class="list-arrow">
			</view> -->
		</view>

		<view style="position: fixed;bottom: 0;left: 0;right: 0;background-color: #FFFFFF;padding:10px;z-index: 9;">
			<view class="btn_com" @click="handleSignOut">
				アカウントからログアウト
			</view>
		</view>
	</view>
</template>

<script>
	// import HeaderPrimary from '@/components/header/HeaderPrimary.vue';
	import Profile from '@/components/account/Profile.vue';
	import FeatureListPrimary from '@/components/account/FeatureListPrimary.vue';
	import AccountAssets from '@/components/account/AccountAssets.vue';
	import SignOut from '@/components/SignOut.vue';
	import CardItemPrimary from '@/components/card/CardItemPrimary.vue';
	export default {
		components: {
			// HeaderPrimary,
			Profile,
			FeatureListPrimary,
			AccountAssets,
			SignOut,
			CardItemPrimary
		},
		data() {
			return {
				isAnimat: false, // 页面动画
				showAmount: false, // 显示金额
				hideAmount: '******', // 隐藏金额
				userInfo: {}, // 基本信息
				cardData: {}, // 资产卡
				chartData: null,
			}
		},
		computed: {
			cardLabels() {
				return [this.$lang.CARD_ASSETS_TOTAL,
					this.$lang.CARD_ASSETS_AVAIL,
					this.$lang.CARD_ASSETS_FREEZE
				]
			},
			setTitle() {
				if (this.userInfo.real_name) {
					return `${this.$lang.HELLO} ` + this.userInfo.real_name;
				} else {
					return this.$lang.ACCOUNT_CENTER_TITLE;
				}
			},
		},
		onShow() {
			this.isAnimat = true;
			this.getAccountInfo()
		},
		onHide() {
			this.isAnimat = false;
		},
		//下拉刷新
		onPullDownRefresh() {
			this.getAccountInfo()
			uni.stopPullDownRefresh()
		},
		methods: {
			handleSignOut() {
				try {
					let version = uni.getStorageSync('version')
					uni.removeStorageSync('token');
					uni.setStorageSync('version', version);
				} catch (e) {
					// error
				}
				uni.$u.toast(this.$lang.TIP_SIGN_OUT_SUCCESS);
				setTimeout(() => {
					uni.navigateTo({
						url: this.$paths.ACCOUNT_ACCESS
					});
					this.$router.go(0)
				}, 500)
			},
			// 总资产显隐控制
			handleShowAmount() {
				this.showAmount = !this.showAmount;
			},
			shouye() {
				uni.navigateTo({
					url: '/pages/search/index'
				})
			},

			// 提款
			linkWithdraw() {
				uni.navigateTo({
					url: this.$paths.ACCOUNT_WITHDRAW
				})
			},
			// 存金
			linkDeposit() {
				uni.navigateTo({
					url: this.$paths.ACCOUNT_DEPOSIT
				})
			},
			linkAuth() {
				uni.navigateTo({
					url: this.$paths.ACCOUNT_AUTH
				})
			},
			linkService() {
				uni.navigateTo({
					url: this.$util.linkCustomerService()
				})
			},

			//用户信息
			async getAccountInfo() {
				uni.showLoading({
					title: this.$lang.API_GET_ACCOUNT_INFO
				});
				const result = await this.$http.get(`api/user/info`);
				if (!result) return false;
				this.userInfo = result;
				this.cardData = {
					value1: this.userInfo.money || 0,
					usd: this.userInfo.usd || 0,
					value3: this.userInfo.freeze || 0,
				};


				let res = {
					series: [{
						data: [{
							"name": "利用可能の金額",
							"value": Math.abs(result.money),
							"color": "#e36067"
						}, {
							"name": "凍結資金",
							"value": Math.abs(result.frozen),
							"color": "#76e4e4"
						}, {
							"name": "米ドル金額",
							"value": 0,
							"color": "#3F51B5"
						}, {
							"name": "総利益",
							"value": Math.abs(result.totalYingli),
							"color": "#FF9600"
						}]
					}]
				};
				this.chartData = JSON.parse(JSON.stringify(res));

			},
		},
	}
</script>


<style lang="scss" scoped>
	@charset "UTF-8";

	/* uni.scss */
	.page {
		background: #f8f8f8
	}

	.page-head {
		height: 56px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		padding: 0 15px
	}

	.page-head .logo {
		width: 115px;
		height: 38px;
		object-fit: contain
	}

	.page-head .back {
		width: 15px;
		height: 15px
	}

	.page-top {
		height: 76px;
		background: #f6e0e5;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		padding: 0 15px
	}

	.page-top .page-top-left {
		height: 76px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.page-top .page-top-left img {
		width: 35px;
		height: 35px;
		margin-right: 7px
	}

	.page-top .page-top-name {
		height: 76px;
		font-weight: 500;
		font-size: 13px;
		color: #000;
		line-height: 19px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center
	}

	.page-top .page-top-name span {
		font-weight: 400;
		font-size: 13px;
		color: #000;
		line-height: 19px
	}


	.page-card {
		// height: 260px;
		// background: #fff;
		padding: 10px 15px 10px 15px;
		box-sizing: border-box
	}

	.page-card .top {
		height: 83px;
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

	.page-card .top .top-left {
		height: 83px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center
	}

	.page-card .top .top-left .top-left-top {
		height: 16px;
		font-weight: 500;
		font-size: 11px;
		color: #333;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 0 3px
	}

	.page-card .top .top-left .top-left-top img {
		width: 19px;
		height: 14px;
		margin-left: 5px
	}

	.page-card .top .top-left .top-left-foot {
		height: 36px;
		font-weight: 400;
		font-size: 26px;
		color: #e4013e;
		line-height: 36px;
		margin-top: 4px
	}

	.top-mask {
		width: 83px;
		height: 83px;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 10
	}

	.page-card .foot {
		height: 110px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center
	}

	.page-card .foot .foot-item {
		height: 21px;
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

	.page-card .foot .foot-left {
		height: 21px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-weight: 400;
		font-size: 11px;
		color: #333
	}

	.page-card .foot .foot-right {
		font-weight: 600;
		font-size: 13px;
		color: #333
	}

	.page-card .foot .foot-ball {
		width: 13px;
		height: 13px;
		margin-right: 3px;
		border-radius: 50%;
		display: block
	}

	.page-card .foot .color1 {
		background: #195546
	}

	.page-card .foot .color2 {
		background: #9668e0
	}

	.page-card .foot .color3 {
		background: #e36067
	}

	.page-card .foot .color4 {
		background: #76e4e4
	}

	.page-card .page-box {
		height: 28px;
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

	.page-card .page-box .btn1 {
		width: 105px;
		height: 28px;
		background: #e4013e;
		border-radius: 5px;
		font-weight: 400;
		font-size: 14px;
		color: #fff;
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

	.page-card .page-box .btn2 {
		width: 105px;
		height: 28px;
		border-radius: 5px;
		border: 1px solid #e4013e;
		font-weight: 500;
		font-size: 14px;
		color: #e4013e;
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

	.page-foot {
		background: #fff;
		margin-top: 20px
	}

	.page-foot .list {
		height: 38px;
		border-bottom: 1px solid #ebebeb;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		padding: 0 15px
	}

	.page-foot .list .list-txt {
		height: 37px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-weight: 400;
		font-size: 14px;
		color: #e4013e
	}

	.page-foot .list .list-txt img {
		width: 19px;
		height: 18px;
		object-fit: contain;
		margin-right: 15px
	}

	.page-foot .list .list-arrow {
		width: 26px;
		height: 26px
	}
</style>