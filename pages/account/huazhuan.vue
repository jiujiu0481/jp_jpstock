<template>
	<view>
		<view :class="isAnimat?'fade_in':'fade_out'" :style="$theme.setBGSize(`240rpx`,`bg_1`)">
		<view class="flex" style="justify-content: space-between;width: 90%;padding: 20px;">
			<image src="/static/arrow_left.png" mode="widthFix" style="width: 10px;" @click="fanhui()"></image>
			<view class="bold" style="font-size: 16px;">划转记录</view>
			<view style="color: #f76148;">.</view>
		</view>
		 
		 <view style="background-color: #fff;width: 95%;margin-left: 10px;border-radius: 10px;padding: 30px 0px;">
		<view style="background-color: #f7f9ff;width: 95%;border-radius: 10px;margin-left: 10px;">
			<view class="flex" style="padding: 10px; justify-content: space-between;">
				<view >USD</view>
				<view class="flex">
					<view class="bold" style="margin-right: 10px;color: #f45741;">审核中</view>
				</view>
			</view>
			<view class="flex" style="padding: 10px; justify-content: space-between;">
				<view >数量</view>
				<view class="flex">
					<view class="bold" style="margin-right: 10px;">22000</view>
				</view>
				</view>
				
			<view class="flex" style="padding: 10px; justify-content: space-between;">
				<view >时间</view>
				<view class="flex">
					<view class="bold" style="margin-right: 10px;">2024-06-07 18:40:16</view>
				</view>
				</view>
				
			<view class="flex" style="padding: 10px; justify-content: space-between;">
				<view >途径</view>
				<view class="flex">
					<view class="bold" style="margin-right: 10px;">资金账户>法币账户</view>
				</view>
				</view>
		</view>
		
		
		
		</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
	
		data() {
			return {
				isAnimat: false, // 页面动画
			
			}
		},
		
		onShow() {
			this.isAnimat = true;
		},
		onHide() {
			this.isAnimat = false;
		},
		methods:{
			fanhui(){
				uni.navigateBack({
					delta:1,
				})
			}
		}
		
	}
</script>

<style>
</style>