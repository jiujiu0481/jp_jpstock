<template>
	<view class="page_bg_sec">
		<CustomHeaderSecond title="取引履歴" />
		<!-- <view class="block">
			<view class="head">
				<img @click="$util.goBack()" :src="$icon.zjt" class="back">
				<view class="title left_in" style="margin-left: 0px;">{{$lang.TRADE_DAY_RECORD}}</view>
				<view class="back"></view>
			</view>
		</view> -->
		

       <view style="background-color: #fff;width: 95%;border-radius: 10px;margin-left: 10px;">
		 <TabsThird :tabs="tabs" @action="changeTab" :acitve="curTab"></TabsThird>
		 
		 <template v-if="curTab==0">
		 	<ApplyRecord></ApplyRecord>
		 </template>
		 <template v-else>
		 	<ApprovalRecord></ApprovalRecord>
		 </template>  
	   </view>
		
		
	</view>
</template>

<script>
	import HeaderSecond from '@/components/header/HeaderSecond.vue';
	import TabsThird from '@/components/tabs/TabsThird.vue';
	import ApplyRecord from './components/ApplyRecord.vue';
	import ApprovalRecord from './components/ApprovalRecord.vue';
	export default {
		components: {
			HeaderSecond,
			TabsThird,
			ApplyRecord,
			ApprovalRecord,
		},
		data() {
			return {
				isAnimat: false, // 页面动画
				curTab: 0,
			}
		},
		computed: {
			tabs() {
				return [this.$lang.TRADE_DAY_RECORD, this.$lang.TRADE_DAY_APPLY]
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