<template>
	<header class="common_header">
		<view class="left" @click="actionEvent()">
			<image src="/static/arrow_left.png" mode="aspectFit" :style="$theme.setImageSize(24)"></image>
		</view>
		<text class="center">{{title}}</text>
		<view class="right">
			<slot></slot>
		</view>
	</header>
</template>

<script>
	export default {
		// 適用於左中右，其中右為自定義插槽
		name: 'HeaderThird',
		props: {
			// 标题
			title: {
				type: String,
				default: ''
			},
		},
		data() {
			return {};
		},
		computed: {},
		methods: {
			actionEvent() {
				// 默认回退一级
				uni.switchTab({
					url:'/pages/home/index'
				})
				// 特殊回退，外部使用该事件
				this.$emit('action', '');
			}
		}
	}
</script>


<style lang="scss" scoped>
	.common_header {
		padding: 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 30px;

		/* background-image: linear-gradient(180deg, #F5B71C, transparent); */
		.left,
		.right {
			flex: 1 0 16%;
		}

		.center {
			color: #FFFFFF;
			font-size: 36rpx;
			font-weight: 700;
			flex: 70%;
			text-align: center;
		}
	}
</style>