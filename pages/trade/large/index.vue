<template>


	<view :class="isAnimat?'fade_in':'fade_out'" class="page_bg_sec">
		<CustomHeaderSecond title="ブロック取引"></CustomHeaderSecond>
		<view style="display: flex;align-items: center;justify-content: center;">
			<image src="/static/large_banner.png" style="width: 90%;height: 200px;"></image>
		</view>

		<view>
			<!-- <view class="block"> -->

			<!-- <view class="head">
					<img @click="$u.route({type:'navigateBack'});" :src="$icon.zjt" class="back">
					<view class="title left_in" style="margin-left: 0px;">大口取引</view>
					<view class="back"></view>
				</view> -->



			<!-- <view class="short"></view> -->
			<!-- </view> -->
			<view class="nav-box">
				<view class="nav-item" :class="inv==0?'active':''" @click="qiehuan(0)">株式</view>
				<view class="nav-item" :class="inv==1?'active':''" @click="qiehuan(1)">申請記録</view>
			</view>

		</view>

		<TradeLargeList ref="list" v-if="inv==0"></TradeLargeList>

		<TradeLargeRecord ref="log" v-if="inv==1"></TradeLargeRecord>


	</view>
</template>

<script>
	import HeaderThird from '@/components/header/HeaderThird.vue';
	import TradeLargeList from './components/TradeLargeList.vue';
	import TradeLargeRecord from './components/TradeLargeRecord.vue';

	export default {
		components: {
			HeaderThird,
			TradeLargeList,
			TradeLargeRecord
		},
		data() {
			return {
				isAnimat: false, // 页面动画
				list: [],
				inv: 0,
			}
		},

		onShow() {
			this.isAnimat = true;
			if (this.$refs.list && inv == 0)
				this.$refs.list.getList();


			if (this.$refs.log && inv == 1)
				this.$refs.log.getList();

		},
		onHide() {
			this.isAnimat = false;
		},
		methods: {
			qiehuan(num) {
				this.inv = num;
				if (num == 0) {
					this.$refs.list.getList();
				} else {
					this.$refs.log.getList();
				}
			},

			linkRecord() {
				uni.navigateTo({
					url: this.$paths.TRADE_LARGE_RECORD
				})
			}
		},
	}
</script>
<style type="text/css">
	@charset "UTF-8";

	/* uni.scss */
	.pop {
		background: #12132d;
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
		color: #fff
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
		color: #a4a4af
	}

	.pop .pop-list span {
		font-size: 14px;
		font-family: FZLanTingHeiT-R-GB;
		font-weight: 400;
		color: #fff;
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
		color: #a4a4af
	}

	.pop .pop-num uni-input {
		width: 100%;
		border: 0;
		background: #1f2039;
		height: 36px;
		line-height: 36px;
		padding: 0 10px;
		margin-left: 15px
	}

	.pop .pop-blue {
		height: 45px;
		background: #4c3d89;
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
		width: calc(50% - 22px);
		margin: 0 11px;
		height: 28px;
		background: #fff;
		border-radius: 5px;
		border: 1px solid #f3564a;
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
		background: #f3564a;
		color: #fff
	}


	.width-100 {
		width: 100%
	}

	.width-20 {
		width: 20%
	}

	.width-33 {
		width: 33.3333333333%
	}

	.btn-blue {
		background: #f0c680;
		border-radius: 26px
	}

	.uni-input-input {
		font-size: 14px;
		font-family: FZLanTingHeiT-R-GB;
		font-weight: 400;
		color: #fff
	}
</style>