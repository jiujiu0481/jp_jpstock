<template>
	<view style="display: flex;align-items: center;padding-top: 8px;">
		<view style="flex:auto;">
			<view style="display: flex;align-items: center;">
				<view style="flex:1;">
					<u-slider v-model="sliderVal" min="0" :max="max" :showValue="true" @change="changeSlider"
						:activeColor="$theme.PRIMARY" :blockColor="$theme.PRIMARY" :blockSize="12"></u-slider>
				</view>
				<view style="padding:0 2px;">%</view>
				<view :style="{color:$theme.PRIMARY,
				borderBottom:`1px dashed ${$theme.PRIMARY}`}" @click="sliderValMax()">Max</view>
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<block v-for="(v,k) in list" :key="k">
					<view style="text-align: center;" :style="{color:v==curVal?$theme.PRIMARY:`#AAA`}"
						@click="chooseVal(v)">{{v}}%</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Percent",
		props: {
			list: {
				type: Array,
				default: []
			},
		},
		data() {
			return {
				sliderVal: 0, // 滑动条值
				curVal: -1, // 当前值
				// 滑动条最大值
				max: this.list[this.list.length - 1],
			}
		},
		methods: {
			// 滑块滑动值变更
			changeSlider(e) {
				// console.log(`e:`, e);
				// console.log(`e:`, this.sliderVal);
				this.chooseVal(this.sliderVal);
			},
			// 滑块一键最大值
			sliderValMax() {
				this.sliderVal = this.max;
				this.chooseVal(this.sliderVal);
			},
			// 预置值 数值切换
			chooseVal(val) {
				console.log(val);
				this.curVal = val;
				this.sliderVal = this.curVal;
				// 通知上级
				this.$emit('action', this.sliderVal);
			},
		}
	}
</script>

<style lang="scss" scoped>
	/deep/uni-slider {
		margin: 2px 3px;
		margin-right: 0;

		.uni-slider-value {
			width: max-content !important;
		}
	}
</style>