<template>
<<<<<<< HEAD
	<view class="page_bg">
		<CustomHeaderSecond title=" 記録" />
		<view >	
=======
	<view class="page_bg_sec">
		<CustomHeaderSecond :title="tabs[curTab]" />
		<view >
			
>>>>>>> e0e038695daddae3de796d5b9a7ee826e37c6889
			<!-- <view class="head">
				<img @click="$u.route({type:'navigateBack'});" :src="$icon.zjt" class="back">
				<view class="title left_in" style="margin-left: 0px;">{{tabs[curTab]}}</view>
				<view class="back"></view>
			</view> -->	
			<view class="short"></view>
<<<<<<< HEAD
		</view>	
		<view>
=======
		</view>
		
		<view style="padding-bottom: 60px;">
>>>>>>> e0e038695daddae3de796d5b9a7ee826e37c6889
			<!-- <TabsThird :tabs="tabs" @action="changeTab" :acitve="curTab" ></TabsThird> -->
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
				return ['申し込み履歴', '当選履歴']
			}
		},
		onLoad(op) {
			if(op.curTab){
				this.curTab=op.curTab;
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