<!-- 关于我们 -->
<template>
	<view class="page_bg">
		<CustomHeader />
		<!-- <view class="block">
			<view class="head">
				<img :src="$icon.laba" class="head-ring" @click="$u.route({url:'/pages/notification'});">
				<view class="head-search" @click="$u.route({url:'/pages/search/index'});">
					<img :src="$icon.sousuo" >
				</view>
				<img :src="$icon.chilun" class="head-setting" @click="$u.route({url:'/pages/account/center'});">
			</view>
		</view> -->
		<img src="/static/img/7.7349b6f4.png" class="banner" style="width: 100%;"
			@click="$u.route({url:'/pages/market/overview'});">

		<view class="list" v-for="(item,index) in news" @click="open(item.url)">
			<view class="list-line"></view>
			<view class="list-info">
				<view class="list-title">{{item.title}}</view>
				<view class="list-date">{{item.updated_at}}</view>
				<!-- <view >
							<image :src="item.pic" mode="aspectFit"  :style="$theme.setImageSize(30)"></image>
						</view> -->
			</view>
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
				info: {},
				news: {}
			};
		},
		computed: {},
		onLoad() {
			this.getNews()
		},
		onShow() {
			this.isAnimat = true;
		},
		onHide() {
			this.isAnimat = false;
		},
		methods: {
			open(url) {
				window.open(url)
			},
			async getNews() {
				// uni.showLoading({
				// 	title: this.$lang.REQUEST_DATA,
				// });
				const result = await this.$http.post(`api/goods/get_news`, {
					limit: 100
				})
				console.log(result);
				this.news = !result || result.length <= 0 ? [] : result.map(item => {
					return {
						title: item.title,
						url: item.url,
						updated_at: item.updated_at,
						pic: item.pic,
						created_at: item.created_at
					}
				});
			},

		},
	}
</script>
<style type="text/css">
	@charset "UTF-8";

	/* uni.scss */
	.page {
		padding-bottom: 65px
	}

	.banner {
		height: 74px
	}

	.list {
		height: 59px;
		border-bottom: 1px solid #ebebeb;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 0 7px
	}

	.list .list-line {
		width: 3px;
		height: 42px;
		background: #f24639;
		margin-right: 4px
	}

	.list .list-info {
		width: calc(100% - 8px);
		height: 58px;
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

	.list .list-title {
		height: 28px;
		font-weight: 400;
		font-size: 12px;
		color: #535353;
		line-height: 14px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		-webkit-line-clamp: 2
	}

	.list .list-date {
		font-weight: 400;
		font-size: 11px;
		color: #999;
		line-height: 14px;
		margin-top: 4px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		justify-content: flex-end
	}
</style>