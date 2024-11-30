<template>
	<view style="display: flex;justify-content: space-between;margin:0 30rpx;border-radius: 44rpx;padding-right: 6rpx;"
		:style="{border:`2px solid ${$theme.PRIMARY}`}">
		<block v-for="(item,index) in tabs" :key='index'>
			<view :style="setStyle(acitve ==index,index==tabs.length-1)" @click="handleChange(index)">
				<!-- <image src="/static/center_left.png" mode="aspectFit" :style="$theme.setImageSize(28)"
					style="padding-right: 20px;"></image> -->
				{{item}}
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		name: 'TabsSixth',
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
			handleChange(val) {
				this.current = val;
				this.$emit('action', this.current);
			},

			// 设置样式
			setStyle(val) {
				return {
					backgroundColor: val ? '#14102B' : '#CBCBCF',
					color: val ? this.$theme.PRIMARY : '#121212',
				}
			},
		}
	}
</script>

<style>
</style>