<template>
	<view class="header">
		<view class="header-left">
			<img src="/static/logo2.jpg" class="header-img">
		</view>
		<view style=" flex:60%">
			<view
				style="background-color: rgba(255,255,255,0.4);height: 56rpx;line-height: 56rpx;text-align: center; border-radius: 24rpx;"
				@click="$u.route({url:'/pages/search/index'});">
				<text style="color:#FCFCFC;font-size: 11px;">株名またはコードを入力</text>
			</view>
		</view>
		<view class="header-right">
			<!-- <img src="/static/search_icon.png" @click="$u.route({url:'/pages/search/index'});" class="header-search"> -->
			<!-- <img src="/static/search_icon1.png" @click="$u.route({url:'/pages/notify/index'});" class="header-setting"> -->
			<image v-if="look=== 0" src="/static/search_icon1.png" mode="widthFix" style="width: 20px;height: 20px;margin-right: 20px;" @click="$u.route({url:'/pages/notify/index'});"></image>
			
			<image v-if="look=== 1" src="/static/search_icon.png" mode="widthFix" style="width: 20px;height: 20px;margin-right: 20px;" @click="$u.route({url:'/pages/notify/index'});"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "CustomHeader",
		data() {
			return {
			
			};
		}
	}
</script>

<style>

</style>