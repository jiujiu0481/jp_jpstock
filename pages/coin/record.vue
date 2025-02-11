<template>
	<view :class="isAnimat?'fade_in':'fade_out' " style="min-height: 100vh;">
		<view>
			<HeaderSecond :title="$lang.COIN_RECORD_TITLE"></HeaderSecond>
			<TabsFourth :tabs="setTabs" @action="changeTab" :acitve="curTab"></TabsFourth>
		</view>

		<view style="margin:20rpx 8rpx;">
			<template v-if="curTab==0">
				<CurrentRecord :code="code" ref="current"></CurrentRecord>
			</template>
			<template v-else>
				<HistoryRecord :code="code" ref="history"></HistoryRecord>
			</template>
			<!-- <template v-else>
				<SuccessRecord></SuccessRecord>
			</template> -->
		</view>
	</view>
</template>

<script>
	import HeaderSecond from '@/components/header/HeaderSecond.vue';
	import TabsFourth from '@/components/tabs/TabsFourth.vue';
	import CurrentRecord from './components/CurrentRecord.vue';
	import HistoryRecord from './components/HistoryRecord.vue';
	// import SuccessRecord from './components/SuccessRecord.vue';
	export default {
		components: {
			HeaderSecond,
			TabsFourth,
			CurrentRecord,
			HistoryRecord,
			// SuccessRecord,
		},
		data() {
			return {
				isAnimat: false, // 页面动画
				curTab: 1, // 
				list: [], // 列表數據
				code: '', // url ?code=
			}
		},
		computed: {
			setTabs() {
				return [
					this.$lang.COIN_RECORD_CURRENT,
					this.$lang.COIN_RECORD_HISTORY,
					// this.$lang.COIN_RECORD_SUCCESS,
				]
			}
		},
		onLoad(opt) {
			console.log(opt);
			this.curTab = opt.tag || this.curTab;
			this.code = opt.code || '';
		},
		onShow() {
			this.isAnimat = true;
			if (this.curTab == 0 && this.$refs.current) this.$refs.current.getList();
			if (this.curTab == 1 && this.$refs.history) this.$refs.history.getList();
		},
		onHide() {
			this.isAnimat = false;
		},
		methods: {
			changeTab(val) {
				this.curTab = val;
			},
		},
	}
</script>

<style>
</style>