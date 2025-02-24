<template>
	<view :class="isAnimat?'fade_in':'fade_out'" class="page_bg">
		<CustomHeaderSecond title="情報"></CustomHeaderSecond>

		<img src="/static/img/7.7349b6f4.png" class="banner" style="width: 100%;">

		<template v-if="!list ||list.length<=0">

		</template>
		<template v-else>
			<block v-for="(v,k) in list" :key="k">
				<view style="padding:16px;margin-bottom: 10px;border-bottom: 0.5px solid #9797979A;"
					@click="linkToDetail(v.id)">
					<view>{{v.biaoti}}</view>
					<view style="text-align: right;">{{v.updated_at}}</view>
				</view>
			</block>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isAnimat: false, // 页面动画
				list: null,
			}
		},
		onShow() {
			this.isAnimat = true;
			this.getList();
		},
		onHide() {
			this.isAnimat = false;
		},
		onPullDownRefresh() {
			this.getList();
			uni.stopPullDownRefresh();
		},
		methods: {
			async getList() {
				const result = await this.$http.get(`api/app/gglist`);
				if (!result) return false;
				this.list = result;
			},
			linkToDetail(val) {
				uni.navigateTo({
					url: `/pages/notify/detail?id=${val}`
				})
			}
		}
	}
</script>

<style>
</style>