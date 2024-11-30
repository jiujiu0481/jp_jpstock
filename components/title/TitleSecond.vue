<template>
	<view style="display: flex;flex-wrap: nowrap;align-items: center;line-height: 2;">
		<template v-if="img!=''">
			<image mode="aspectFit" :src="`/static/${img}.png`" :style="$util.setImageSize(40)"
				style="padding-right: 10px;"></image>
		</template>
		<view style="font-size:12px;font-weight: 700;" :style="{color:color}">
			{{title}}
		</view>
		<view style="margin-left: auto;">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'TitleSecond',
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