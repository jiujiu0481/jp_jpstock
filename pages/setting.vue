<!-- 关于我们 -->
<template>
	<view class="page">
		<view class="block">
			<view class="head">
				<img @click="$u.route({type:'navigateBack'});" :src="$icon.zjt" class="back">
				<view class="title left_in" style="margin-left: 0px;">設定</view>
				<view class="back"></view>
			</view>
			<view class="short"></view>
		</view>
		<view class="box">
			<view class="list-item">名前<span>{{userInfo.real_name}}</span></view>
			<view class="list-item">電話番号<span>{{userInfo.mobile}}</span></view>
			
			<view class="list-item" @click="$u.route({url:'/pages/account/password'});" >ログインパスワード
				<img :src="$icon.yjt1">
			</view>
			<view class="list-item" @click="$u.route({url:'/pages/account/password?role=pay'});" >取引パスワード
				<img :src="$icon.yjt1">
			</view>
			<view class="btn-big" @click="handleSignOut">アカウントからログアウト</view>
		</view>
	</view>
</template>

<script>
	import HeaderSecond from '@/components/header/HeaderSecond.vue';
	export default {
		components: {
			HeaderSecond,
		},
		data() {
			return {
				isAnimat: false, // 页面动画
				userInfo: {},
				news: {},
				
			};
		},
		computed: {},
		onLoad() {
			this.getAccountInfo()
		},
		onShow() {
			this.isAnimat = true;
		},
		onHide() {
			this.isAnimat = false;
		},
		methods: {
			// 登出
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
			open(url) {
				window.open(url)
			},
			async getAccountInfo() {
				uni.showLoading({
					title: this.$lang.API_GET_ACCOUNT_INFO
				});
				const result = await this.$http.get(`api/user/fastInfo`);
				if (!result) return false;
				this.userInfo = result;
				
			},

		},
	}
</script>
<style type="text/css">
	@charset "UTF-8";


	.page {
		background: #f7f9f8;
		min-height: 100vh
	}

	.box {
		background: #fff;
		margin-top: 10px;
		padding-bottom: 26px
	}

	.list-item {
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
		padding: 0 12px;
		font-weight: 400;
		font-size: 11px;
		color: #666
	}

	.list-item span {
		font-weight: 400;
		font-size: 11px;
		color: #e4013e
	}

	.list-item img {
		width: 26px;
		height: 26px
	}

	.btn-big {
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
		margin: 26px 22px 0 22px
	}
</style>