<template>
	<scroll-view :scroll-x="true" style="white-space: nowrap;width: 96%;padding: 10px 10px 0 10px;" @touchmove.stop>
		<block v-for="(item,index) in tabs" :key="index">
			<view @click="handleChange(index)"
				style="display: inline-block; width:max-content;height: 20px;padding:4px 10px;margin-right:10px;border-radius: 6px;text-align: center;"
				:style="setActiveStyle(acitve === index)">
				{{item}}
			</view>
		</block>
	</scroll-view>
</template>

<script>
	export default {
		name: "TabsSecond",
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
			setActiveStyle(val) {
				return {
					color: val ? '#FFFFFF' : '#666',
					backgroundColor: val ? '#EBBD33' : '#FFFFFF',
				}
			},
		}
	}
</script>

<style>

</style>