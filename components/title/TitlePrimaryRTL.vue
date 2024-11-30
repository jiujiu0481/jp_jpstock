<template>
	<view style="display: flex;flex-wrap: nowrap;align-items: center;">
		<view style="margin-right: auto;">
			<slot></slot>
		</view>
		<view style="font-size: 28rpx;font-weight: 800;" :style="{color:color}">
			{{title}}
		</view>
		<template v-if="img!=''">
			<image mode="aspectFit" :src="`/static/${img}.png`" :style="$util.setImageSize(40)"
				style="padding-right: 10px;"></image>
		</template>
	</view>
</template>

<script>
	export default {
		// RTL模式
		name: 'TitlePrimaryRTL',
		props: {
			title: {
				type: String,
				default: ''
			},
			// 标题颜色
			color: {
				type: String,
				default: '#121212',
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