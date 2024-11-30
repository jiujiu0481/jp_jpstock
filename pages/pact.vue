<template>
	<view :class="isAnimat?'fade_in':'fade_out'">
		<HeaderSecond :title="info.title" color="#000"></HeaderSecond>

		<view style="padding: 40rpx;background-color: #fff;width: 85%;border-radius: 10px;margin-left: 10px;">
			<template v-if="info.content && info.content.length>0">
				<view v-html="info.content" style="color:#333333"></view>
			</template>
			<template v-else>
				<view style="color:#333333;text-align: center;">{{$lang.API_EMPTY_CONTENT}}</view>
			</template>
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
			};
		},
		computed: {},
		onLoad() {
			this.getData();
		},
		onShow() {
			this.isAnimat = true;
		},
		onHide() {
			this.isAnimat = false;
		},
		methods: {
			// 获取数据
			async getData() {
				uni.showLoading({
					title: this.$lang.REQUEST_DATA,
				});
				const result = await this.$http.get(`api/article/privacy`);
				console.log('result:', result);
				if (!result) return false;
				this.info = {
					title: result.title || this.$lang.PRVITE_PACT_TITLE,
					content: result.content,
				}
			}
		}
	}
</script>