<template>
	<view style="padding:10px;padding-top: 0;">
		<!-- <view style="display: flex;align-items: center;padding: 10px;border-bottom: 1px solid #A0A0A0;">
			<block v-for="(item,index) in $util.setStockListThead()" :key="index">
				<view style="font-size: 32rpx;" :style="{color:$theme.LABEL,flex:item.width,textAlign:item.align}">
					{{item.label}}
				</view>
			</block>
		</view> -->
		<ListPrimary :list="list"></ListPrimary>

	</view>
</template>

<script>
	import ListPrimary from '@/components/list/ListPrimary.vue';
	export default {
		name: "GoodsList",
		components: {
			ListPrimary,
		},
		data() {
			return {
				list: [],
				gpIndex: 0,
				curPage: 1, // 当前页码
				timer: null,
			};
		},
		// computed: {
		// 	best() {
		// 		console.log('best');
		// 		// 取最高三条数据为顶部块状展示
		// 		return this.list.sort((a, b) => b.rate - a.rate).slice(0, 3);
		// 	}
		// },
		created() {
			console.log('child created', this.timer);
			this.getData();
		},
		mounted() {
			console.log('child mounted', this.timer);
			this.onSetTimeout();
		},
		deactivated() {
			console.log('child deactivated', this.timer);
			this.clearTimer();
		},
		methods: {
			onSetTimeout() {
				this.timer = setInterval(() => {
					console.log("setInterval");
					this.getData();
				}, 3000);
			},
			clearTimer() {
				// clearTime
				if (this.timer) {
					clearInterval(this.timer);
					this.timer = null;
					console.log('clearTimer', this.timer);
				}
			},

			async getData() {
				this.list = [];
				uni.showLoading({
					title: this.$lang.LOADING_FOLLOW_GET_DATA
				});
				const result = await this.$http.get(`api/goods/list`, {
					page: this.curPage,
					gp_index: this.gpIndex
				});
				uni.hideLoading();
				console.log(result);
				console.log(result.data);
				if (result.code == 0) {
					if (!result.data || result.data.length <= 0) return false;

					// this.list = result.data.map(item => {
					// 	return {
					// 		id: item.gid,
					// 		logo: item.logo,
					// 		name: item.ko_name,
					// 		code: item.code,
					// 		price: item.close,
					// 		rate: item.returns,
					// 	}
					// });

					this.list = result.data.map(item => {
						if (item.gid && item.gid > 0) {
							return {
								id: item.gid,
								logo: item.logo || '',
								name: item.name || '',
								code: item.code || '',
								price: item.close || 0,
								rate: item.returns || 0,
								type_id: item.project_type_id || 0,
							}
						}
					});
					console.log('search result:', this.list)

				} else {
					uni.showToast({
						title: result.message || this.$lang.API_HTTP_ERROR,
						icon: 'none'
					})
				}
			},
		}
	}
</script>