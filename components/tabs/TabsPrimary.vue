<template>
	<view style="display: flex;align-items: center;margin:0 10px;padding: 10px;">
		<block v-for="(item,index) in tabs" :key='index'>
			<view @click="changeTab(index)"
				style="margin:0 8rpx;padding: 4px 10px; width:20%; text-align: center;border-radius: 8px;font-size: 28rpx;line-height: 1.8;"
				:style="setStyle(acitve ==index)">{{item}}</view>
		</block>
	</view>
</template>

<script>
	export default {
		name: 'TabsPrimary',
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
		computed: {},
		methods: {
			changeTab(val) {
				this.current = val;
				this.$emit('action', this.current);
			},
			setStyle(val) {
				return {
					backgroundColor: val ? '#f24a3d': 'transparent',
					color: val ? '#FFFFFF' : '#A8A8A8',
					borderRadius: `44rpx`,
					// border: `1px solid ${val? this.$theme.PRIMARY:'#F1F1F1'}`
				}
			},
		}
	}
</script>