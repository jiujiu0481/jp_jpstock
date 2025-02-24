<template>
	<view style="padding: 0 36rpx;display: flex;align-items: center;">
		<block v-for="(item,index) in tabs" :key="index">
			<view class="item" :style="setStyle(active ==index)" @click="handleChange(index)">
				{{item}}
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		name: 'ContractTabs',
		props: {
			// tab项数组
			tabs: {
				type: Array,
				default: [],
			},
			// 当前激活项
			active: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				current: this.active,
			};
		},
		methods: {
			handleChange(val) {
				this.current = val;
				this.$emit('action', this.current);
			},
			setStyle(val) {
				return {
					color: val ? '#2c6aff' : this.$theme.LOG_LABEL,
					borderBottom: `2px Solid ${val?this.$theme.SECOND:this.$theme.TRANSPARENT}`
				}
			},
		}
	}
</script>

<style>
	.item {
		font-size: 30rpx;
		font-weight: 700;
		margin-right: 40rpx;
		padding-bottom: 6rpx;
	}
</style>