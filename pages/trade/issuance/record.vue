<template>
	<view class="page_bg_sec">
		<CustomHeaderSecond title=" 記録" />

		<view
			style="padding:20rpx 32rpx; background-color: #FFFFFF;min-height: 96vh;width: 85%;border-radius: 10px;margin-left: 10px;">
			<TabsThird :tabs="tabs" @action="changeTab" :acitve="curTab"></TabsThird>

			<template v-if="curTab==0">
				<ApplyRecord></ApplyRecord>
			</template>
			<template v-else>
				<SuccessRecord></SuccessRecord>
			</template>
		</view>
	</view>
</template>

<script>
	import HeaderSecond from '@/components/header/HeaderSecond.vue';
	import TabsThird from '@/components/tabs/TabsThird.vue';
	import ApplyRecord from './components/ApplyRecord.vue';
	import SuccessRecord from './components/SuccessRecord.vue';
	export default {
		components: {
			HeaderSecond,
			TabsThird,
			ApplyRecord,
			SuccessRecord,
		},
		data() {
			return {
				isAnimat: false, // 页面动画
				curTab: 0,
			}
		},
		computed: {
			tabs() {
				return [this.$lang.TRADE_IPO_RECORD, this.$lang.TRADE_IPO_SUCCESS]
			}
		},
		onLoad(op) {
			if (op.curTab) {
				this.curTab = op.curTab;
			}
		},
		onShow() {
			this.isAnimat = true;
		},
		onHide() {
			this.isAnimat = false;
		},
		methods: {
			// 切换 tab
			changeTab(val) {
				this.curTab = val;
			},
		},
	}
</script>

<style>
</style>