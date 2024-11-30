<template>
	<view
		style="margin:20rpx 30rpx;border-radius: 4px;display: flex;align-items: center;background-color: #3F3384;padding:0 20px;">
		<image src="/static/horn.png" mode="aspectFit" :style="$theme.setImageSize(30)"></image>
		<u-notice-bar :text="text1" speed="80" :url="linkNotify" :color="$theme.PRIMARY" bgColor="#3F3384"
			icon=""></u-notice-bar>
		<!-- <image src="/static/close.png" mode="aspectFit" :style="$theme.setImageSize(30)" @click="actionEvent()"></image> -->
	</view>
</template>

<script>
	export default {
		name: 'NotifyPrimary',
		data() {
			return {
				// 此处可以是软件相关的通知
				text1: this.$lang.LAUNCH_TITLE,
			}
		},
		computed: {
			linkNotify() {
				return this.$paths.NOTIFICATION
			}
		},
		methods: {
			// actionEvent() {
			// 	this.$emit('action', 1);
			// }
		}
	}
</script>

<style>
</style>