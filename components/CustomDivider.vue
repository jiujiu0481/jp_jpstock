<!-- 自定义分割线组件 -->
<template>
	<view class="divider-container" :style="{width:width}">
		<view :style="{backgroundColor:lineColor,height:`${height}px`}"></view>
		<text :style="{fontSize:`${size}rpx`,color:textColor}">{{text}}</text>
		<view :style="{backgroundColor:lineColor}"></view>
	</view>
</template>

<script>
	export default {
		name: "CustomDivider",
		props: {
			text: {
				type: String,
				default: ''
			},
			size: {
				type: Number,
				default: 24
			},
			textColor: {
				type: String,
				default: '#FFFFFF'
			},
			lineColor: {
				type: String,
				default: '#FFFFFF'
			},
			width: {
				type: String,
				default: '80%'
			},
			height: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.divider-container {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 20px auto;
	}

	.divider-container>view {
		flex-grow: 1;
		height: 1px;
	}

	.divider-container>text {
		padding: 0 20px;
	}
</style>