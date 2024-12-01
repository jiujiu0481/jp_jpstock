<template>
	<view class="page_bg_sec">
		<CustomHeaderSecond title="注文" />

		<view style="display: flex;align-items: center;justify-content: center;">
			<image src="/static/ipobanner.png" style="width: 100%;" mode="heightFix" :style="$theme.setImageSize(340)">
			</image>
		</view>

		<view class="top">
			<view class="top-list" @click="$u.route({url:'/pages/trade/ipo/record'});">
				<view class="top-left"><img :src="$icon.ipo1">抽選申し込み履歴</view>
				<img :src="$icon.yjt1" class="top-right">
			</view>
			<view class="top-list" @click="$u.route({url:'/pages/trade/ipo/record?curTab=1'});">
				<view class="top-left"><img :src="$icon.ipo2">当選履歴</view>
				<img :src="$icon.yjt1" class="top-right">
			</view>
		</view>

		<!-- <view class="nav-box">
			<view class="nav-item" :class="inv==0?'active':''" @click="inv=0">抽選待ち</view>
			<view class="nav-item" :class="inv==1?'active':''" @click="inv=1">抽選中</view>
			<view class="nav-item" :class="inv==2?'active':''" @click="inv=2">購入申込終了</view>
		</view> -->




		<view style="margin-top: 10px;">
			<TradeIPOList ref="list"></TradeIPOList>
		</view>
	</view>


</template>

<script>
	import HeaderThird from '@/components/header/HeaderThird.vue';
	import TradeIPOList from './components/TradeIPOList.vue';
	export default {
		components: {
			HeaderThird,
			TradeIPOList,
		},
		data() {
			return {
				isAnimat: false, // 页面动画
				inv: 1,
			};
		},
		onShow() {
			this.isAnimat = true;
			if (this.$refs.list)
				this.$refs.list.getList();
		},
		onHide() {
			this.isAnimat = false;
		},
		methods: {
			linkRecord() {
				uni.navigateTo({
					url: this.$paths.TRADE_IPO_RECORD
				})
			}
		}
	}
</script>
<style type="text/css">
	@charset "UTF-8";

	/* uni.scss */
	.page {
		background: #f7f9f8;
		min-height: 100vh
	}

	.top {
		background: #fff;
		border-top: 1px solid #ebebeb;
		margin-top: 10px
	}

	.top .top-list {
		height: 39px;
		border-bottom: 1px solid #ebebeb;
		padding: 0 15px;
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

	.top .top-left {
		height: 38px;
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

	.top .top-left img {
		width: 19px;
		height: 19px;
		margin-right: 15px
	}

	.top .top-right {
		width: 26px;
		height: 26px
	}

	.nav-box {
		height: 49px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		background: #f7f9f8;
		box-sizing: border-box
	}

	.nav-box .nav-item {
		width: calc(33.3333333333% - 22px);
		margin: 0 11px;
		height: 28px;
		background: #fff;
		border-radius: 5px;
		border: 1px solid #e4013e;
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
		font-size: 11px;
		color: #e4013e
	}

	.nav-box .active {
		background: #e4013e;
		color: #fff
	}



	.pop {
		background: #fff;
		padding: 10px 10px 41px 10px
	}

	.pop .pop-title {
		height: 41px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-size: 14px;
		font-family: FZLanTingHeiT-R-GB;
		font-weight: 400;
		color: #333
	}

	.pop .pop-list {
		height: 36px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-size: 14px;
		font-family: FZLanTingHeiT-R-GB;
		font-weight: 400;
		color: #333
	}

	.pop .pop-list span {
		font-size: 14px;
		font-family: FZLanTingHeiT-R-GB;
		font-weight: 400;
		color: #333;
		padding-left: 15px
	}

	.pop .pop-num {
		height: 41px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-size: 14px;
		font-family: FZLanTingHeiT-R-GB;
		font-weight: 400;
		color: #333
	}

	.pop .pop-num uni-input {
		border: 0;
		background: #ddd;
		height: 36px;
		line-height: 36px;
		padding: 0 10px;
		margin-left: 15px
	}

	.pop .pop-blue {
		height: 45px;
		background: #e4013e;
		border-radius: 22px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-size: 16px;
		font-family: FZLanTingHeiT-R-GB;
		font-weight: 400;
		color: #fff;
		margin-top: 34px
	}

	.uni-input-input {
		font-size: 14px;
		font-family: FZLanTingHeiT-R-GB;
		font-weight: 400;
		color: #333
	}
</style>