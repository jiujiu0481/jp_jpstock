<template>
	<header style="display: flex;align-items: center;padding: 24px 28rpx;">
		<view style="margin-right: auto;">
			<image src="/static/arrow_left.png" @click="$util.goBack()" mode="aspectFit"
				style="width: 16px;height: 16px;"></image>
		</view>
		<view style=" flex:60%">
			<view style="height: 56rpx;line-height: 56rpx;text-align: center;color:#FCFCFC;font-size: 28rpx;">
				{{title}}
			</view>
		</view>
		<view style="margin-left: auto;">
			<image src="/static/shezhi.png" mode="aspectFit" style="width: 20px;height: 20px;"
				@click="$u.route({url:'/pages/account/center'});"></image>
		</view>
	</header>
</template>

<script>
	export default {
		name: "CustomHeaderSecond",
		props: {
			title: {
				type: String,
				default: ''
			},
		},
	}
</script>

<style>

</style>