<template>
	<view
		style="display: flex;align-items: center;justify-content: space-around;margin:0 20px;padding:10px 10px 0 10px;border-bottom: 1px solid #E8EAF3;">
		<block v-for="(item,index) in tabs" :key='index'>
			<view @click="handleChange(index)"
				style="padding: 4px 10px; width: 25%;text-align: center;border-radius: 8px;font-size: 32rpx;font-weight: 700;"
				:style="setActiveStyle(acitve ==index)">{{item}}
				<!-- <span
					style="display: block; width: 60rpx;height: 9rpx;margin:auto;margin-top: 6px;border-radius: 10px; "
					:style="{backgroundColor:acitve==index?'#F5B71C':'transparent'}"></span> -->
			</view>
			<template v-if="index<tabs.length-1">
				<view style="width: 1px;height: 20px;background-color: #E8EAF3;"></view>
			</template>
		</block>
	</view>
</template>

<script>
	export default {
		name: 'TabsFourth',
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
					// backgroundColor: val ? theme.PRIMARY : 'transparent',
					fontWeight: val ? '900' : '500',
					color: val ? this.$theme.PRIMARY : this.$theme.LOG_VALUE,
				}
			},
		}
	}
</script>

<style>
</style>