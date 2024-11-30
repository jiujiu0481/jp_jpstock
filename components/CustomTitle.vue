<template>
	<view
		style="padding:0 10px;display: flex;align-items: center;justify-content: space-between; height:80rpx;">

		<!-- 绝对定位需要父容器宽高值，此处使用title字符串的宽度作为元素最大宽度，并将文字设为透明 -->
		<view style="position: relative;height: 80rpx;padding: 0 20px;color: transparent;width: max-content;">
			{{title}}
			<!-- <view
				style="position: absolute;bottom: 20rpx;left: 0;right: 0;height: 16rpx;width: 100%; background-image:linear-gradient(90deg,#FF2D303A,#2D54AB3A);border-radius: 16rpx;">
			</view> -->
			<view
				style="position: absolute;top:16rpx;left: 0;right: 0;font-size: 32rpx;font-weight: 800;width: 100%;text-align: center;"
				:style="{color:$theme.SECOND}">
				{{title}}
			</view>
		</view>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: 'CustomTitle',
		props: {
			title: {
				type: String,
				default: 'TITLE'
			},
			// 左边图标url。有值视为需要
			img: {
				type: String,
				default: '',
			}
		},
	}
</script>

<style>
</style>