<template>
	<scroll-view :scroll-x="true" style="white-space: nowrap;width: 96%;padding:0 10px 0 10px;" @touchmove.stop>
		<view style="display: flex;justify-content: space-between;margin:0 10rpx;">
			<block v-for="(item,index) in tabs" :key='index'>
				<view :style="setStyle(acitve ==index)" @click="handleChange(index)">
					{{item}}
				</view>
			</block>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name: 'TabsFifth',
		props: {
			// tab项数组
			tabs: {
				type: Array,
				default: [],
			},
			// 当前激活项
			acitve: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				current: this.acitve,
			};
		},
		methods: {
			// 设置样式
			setStyle(val, w = 80) {
				return {
					minWidth: `${w}rpx`,
					margin: '16rpx',
					padding: `12rpx 20rpx`,
					borderRadius: `16rpx`,
					textAlign: 'center',
					backgroundColor: val ? this.$theme.SECOND : this.$theme.TRANSPARENT,
					color: val ? '#FFFFFF' : this.$theme.SECOND,
					borderRadius: `44rpx`,
				}
			},
			handleChange(val) {
				this.current = val;
				this.$emit('action', this.current);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.btn_common {
		padding: 6rpx 12rpx;
		font-size: 28rpx;
		text-align: center;
		margin-right: 12rpx;
	}
</style>