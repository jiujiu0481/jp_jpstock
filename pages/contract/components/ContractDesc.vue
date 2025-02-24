<template>
	<view>
		<view class="mask" @click="isShow=false"></view>
		<view class="modal_wrapper">
			<view style="background-color: #FFFFFF;border-radius: 24rpx;padding-top:20rpx;width:80%;">
				<view style="text-align: center;font-size: 32rpx;font-weight: 700;">
					'契約説明
				</view>
				<view style="padding: 40rpx;line-height: 1.6;">
					<block v-for="(item,index) in $lang.CONTRACT_DESC_CONTENT" :key="index">
						<view style="font-size: 28rpx;">{{`${index+1}. `+ item}}</view>
					</block>
				</view>
				<view style="border-top: 1px Solid #E8EAF3;text-align: center;line-height: 2.4;color:#6D41FF;"
					@tap="handleClose()">
					OK
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ContractDesc',
		data() {
			return {
				isShow: false,
			}
		},
		methods: {
			handleClose() {
				this.isShow = false;
				this.$emit('action', 1);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 1111;
		background-color: rgba(0, 0, 0, 0.6);
		cursor: pointer;
	}

	.modal_wrapper {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 11113;
		background-color: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>