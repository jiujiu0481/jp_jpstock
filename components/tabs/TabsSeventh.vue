<template>
	<view class="tabs_wrapper">
		<block v-for="(item,index) in tabs" :key='index'>
			<view :class="setClass(acitve==index)" @click="changeTab(index)">
				<view style="position: relative;height: 100rpx;padding: 0 20px;border-radius: 10px 10px 0px 0px;">
					<template v-if="acitve==index">
						<!-- <view
							style="position: absolute;bottom: 0rpx;left: 0;right: 0;height: 7rpx;width: 50%;background-color: #eecda5; border-radius: 16rpx;margin:0 auto;">
						</view> -->
					</template>
					<view
						style="position: absolute;top:20rpx;font-size: 28rpx;font-weight: 800;text-align: center;border-radius: 6px;padding: 4px 10px;"
						:style="setStyle(acitve ==index)">
						{{item}}
					</view>
				</view>

			</view>
		</block>
	</view>
</template>

<script>
	export default {
		name: 'TabsSeventh',
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
			setClass(val) {
				return `item ${val?'item_act':''}`
			},
			setStyle(val, w = 120) {
							const temp = this.acitve == 0 ? '#eeb98e' : '#000';
							return {
								minWidth: `${w}rpx`,
								// margin: '16rpx',
								// padding: `5rpx 0rpx`,
								borderRadius: `16rpx`,
								textAlign: 'center',
								backgroundColor: val ? '#E82D28' : '#b2abab',
								color: val ? '#fff' : '#fff',
								borderRadius: `44rpx`,
							}
						},

		}
	}
</script>
<style lang="scss" scoped>
	.tabs_wrapper {
		border-radius: 16rpx 16rpx 0 0;
	    // background-color: #fff;
		background-repeat: no-repeat;
		background-position: 0 0;
		background-size: 100% 100%;
		width: 95%;
		margin-left: 10px;
		height: 100rpx;
		display: flex;
		align-items: center;

		.item {
			flex: 1;
			border-radius: 16rpx;
			// padding: 20rpx 0;
			text-align: center;
			font-size: 32rpx;
			line-height: 1.8;
			color: #898996;
		}

		.item_act {
			// background-image: linear-gradient( #FFFFFF);
			background-repeat: no-repeat;
			background-position: 0 0;
			background-size: 100% 100%;
			width: 100%;
			height: 100%;
			color: #121212;
		}
	}
</style>