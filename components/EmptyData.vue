<template>
	<view style="padding: 40rpx;text-align: center;margin-top: 50px;">
		<image :src="`/static/empty_${img}.png`" mode="aspectFit" :style="$theme.setImageSize(400)"></image>
		<view style="font-size: 32rpx;" >データがありません</view>
	</view>
</template>

<script>
	export default {
		name: "EmptyData",
		props: {
			color: {
				type: String,
				default: '#CBCBCF',
			},
			// 空数据时，显示的图片
			img: {
				type: String,
				default: 'data'
			},
		},
		data() {
			return {

			};
		}
	}
</script>

<style>

</style>