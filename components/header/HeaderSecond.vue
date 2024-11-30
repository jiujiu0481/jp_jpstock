<template>
	<header class="common_header">
		<!-- <template v-if="!isRtl"> -->
		<view class="custom_header_left" @click="actionEvent()">
			<view class="arrow rotate_225" :style="arrowStyle"></view>
		</view>
		<!-- 	</template> -->
		<text class="custom_header_center" :style="{color:color}">{{title}}</text>
		<!-- <template v-if="isRtl">
			<view class="custom_header_right" @click="actionEvent()">
				<view class="arrow rotate_45" :style="arrowStyle"></view>
			</view>
		</template> -->
	</header>
</template>

<script>
	export default {
		name: 'HeaderSecond',
		props: {
			// 标题
			title: {
				type: String,
				default: ''
			},
			// 标题文字颜色
			color: {
				type: String,
				default: '#333333'
			},
		},
		data() {
			return {};
		},
		computed: {
			// // 当前是否镜像
			// isRtl() {
			// 	return this.$util.isRtl();
			// },
			// 设置回退箭头的样式
			arrowStyle() {
				return {
					...this.$theme.setImageSize(20),
					// 通常与标题文字同色
					borderColor: this.color
				}
			}
		},
		methods: {
			actionEvent() {
				// 默认回退一级
				uni.navigateBack({
					delta: 1,
					// animationType: 'fade-in-out',
					// animationDuration: 200
				})
				// 特殊回退，外部使用该事件
				this.$emit('action', '');
			}
		}
	}
</script>

<style>
	.common_header {
		padding: 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 30px;
		/* background-image: linear-gradient(180deg, #F5B71C, transparent); */
	}

	.custom_header_left {
		margin-right: auto;
	}

	.custom_header_left>image {
		width: 24px;
		height: 24px;
	}

	.custom_header_center {
		color: #333333;
		font-size: 32rpx;
		flex: 70%;
		text-align: center;
		font-weight: 100;
	}

	.custom_header_right {
	}
</style>