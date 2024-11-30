<template>
	<header class="common_header" style="justify-content: space-between;">
		<!-- <template v-if="title==''">
			<view>
				<image :src="`/static/logo_name_ltr.png`" mode="aspectFit"
					:style="$theme.setImageSize(256,72)">
				</image>
			</view>
		</template> -->
		<template v-if="title!=''">
			<view style="font-weight: 500;font-size: 36rpx;display: inline-block;" :style="{color:color}">{{title}}
			</view>
		</template>
		<view style="display: flex;align-items: center;">
			<template v-if="isService">
				<image mode="aspectFit" src="/static/service.png" :style="$theme.setImageSize(40)"
					@click="linkService()" style="padding:0 30rpx;"></image>
			</template>
			<template v-if="isNotify">
				<image mode="aspectFit" src="/static/notify.png" :style="$theme.setImageSize(40)" @click="linkNotify()"
					style="padding:0 30rpx;"></image>
			</template>
			<template v-if="isSearch">
				<image mode="aspectFit" :src="`/static/${icon}.png`" :style="$theme.setImageSize(40)"
					@click="linkSearch()" style="padding:0 30rpx;">
				</image>
			</template>
			<template v-if="isLang">
				<!-- <Translate></Translate> -->
			</template>
		</view>
	</header>
</template>

<script>
	// import Translate from '@/components/Translate.vue';
	export default {
		name: 'HeaderPrimary',
		components: {
			// Translate
		},
		props: {
			// 标题
			title: {
				type: String,
				default: ''
			},
			// 标题文字颜色
			color: {
				type: String,
				default: '#333333'
			},
			// 是否需要搜索
			isSearch: {
				type: Boolean,
				default: false,
			},
			// 搜索的icon
			icon: {
				type: String,
				default: 'search',
			},
			// 是否需要客服
			isService: {
				type: Boolean,
				default: false,
			},
			// 是否需要语言
			isLang: {
				type: Boolean,
				default: false,
			},
			// 是否需要通知
			isNotify: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {};
		},
		computed: {},
		methods: {
			// 跳转到通知页面
			linkNotify() {
				uni.navigateTo({
					url: this.$paths.NOTIFICATION
				})
			},

			// 跳转到客服
			linkService() {
				this.$util.linkCustomerService();
			},
			// 跳转到查询页面
			linkSearch() {
				uni.navigateTo({
					url: this.$paths.SEARCH
				})
			}
		}
	}
</script>

<style>
	.common_header {
		padding: 60rpx 40rpx 20rpx 40rpx;
		display: flex;
		align-items: center;
	}
</style>