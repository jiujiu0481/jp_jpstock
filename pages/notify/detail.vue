<template>
	<view :class="isAnimat?'fade_in':'fade_out'" class="page_bg">
		<CustomHeaderSecond title="情報"></CustomHeaderSecond>
		<img src="/static/img/7.7349b6f4.png" class="banner" style="width: 100%;">
		<template v-if="!detail">
			<EmptyData></EmptyData>
		</template>
		<template v-else>
			<view style="padding:16px;margin-bottom: 10px;">
				<view>{{detail.biaoti}}</view>
				<view style="text-align: right;">{{detail.updated_at}}</view>
				<view v-html="detail.xiangqing"></view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isAnimat: false, // 页面动画
				detail: null,
				curId: '',
			}
		},
		onLoad(opt) {
			this.curId = opt.id || this.curId;
		},
		onShow() {
			this.isAnimat = true;
			this.getDetail();
		},
		onHide() {
			this.isAnimat = false;
		},
		onPullDownRefresh() {
			this.getDetail();
			uni.stopPullDownRefresh();
		},
		methods: {
			async getDetail() {
				const result = await this.$http.get(`api/app/gginfo`, {
					id: this.curId
				});
				if (!result) return false;
				this.detail = result;
			},
		}
	}
</script>

<style>
</style>