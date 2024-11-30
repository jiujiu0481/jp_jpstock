<!-- 用户基本信息 -->
<template>
	<view style="display: flex;align-items: center; padding:0 0rpx;">
		<view style="background-color: transparent;">
			<image style="border-radius: 100px;" mode="scaleToFill" :src="avatar" :style="$theme.setImageSize(120)">
			</image>
		</view>

		<view>
			<!-- <view style="display: flex;align-items: center;justify-content: center; padding:20rpx;"
				@click="handleLink()">
				<view style="font-size: 36rpx;text-align: left;color:#FFFFFF;padding-right: 30rpx;">
					{{showName}}
				</view>
			</view> -->

			<view style="display: flex;align-items: center;justify-content: center; padding:0 20rpx;">
				<view style="font-size: 40rpx;text-align: left;color:#000;padding-right: 30rpx;">
					{{info.p_mobile}}
				</view>
			</view>
		</view>
		<!-- <view class="arrow rotate_45" style="border-color: #CBCBCF;" :style="$theme.setImageSize(12)"></view> -->
	</view>
</template>

<script>
	export default {
		name: "Profile",
		props: {
			info: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {};
		},
		computed: {
			// 处理显示姓名或昵称
			showName() {
				return this.info.real_name ?
					this.info.real_name : this.info.nick_name ?
					this.info.nick_name : ''
			},
			// 处理显示头像
			avatar() {
				// return this.info.avatar ? this.info.avatar : '/static/avatar.png';
				return '/static/avatar.png';
			},
		},

		methods: {
			// 进入信息修改页面
			handleLink() {
				// uni.navigateTo({
				// 	url: this.$paths.ACCOUNT_AVATAR,
				// })
			},
		}
	}
</script>

<style>

</style>