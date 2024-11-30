<template>
	<view style="margin-top:0;">
		<template v-if="isShow">
			<CustomTitle :title="$lang.STOCK_FOLLOW">
				<view style="font-size: 14px;margin-left: auto;" @click="linkFollow()" :style="{color:$theme.PRIMARY}">
					{{$lang.MORE}}
				</view>
			</CustomTitle>
		</template>
		<ListSecond :list="list"></ListSecond>
	</view>
</template>

<script>
	import EmptyData from '@/components/EmptyData.vue';
	import ListSecond from '@/components/list/ListSecond.vue';
	import CustomTitle from '@/components/CustomTitle.vue';
	export default {
		name: "FollowList",
		components: {
			EmptyData,
			ListSecond,
			CustomTitle,
		},
		data() {
			return {
				list: [],
				timer: null,
				isShow: false, //是否显示关注列表
			};
		},

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
			linkFollow() {
				uni.switchTab({
					url: this.$paths.STOCK_FOLLOW
				})
			},
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
				const result = await this.$http.get(`api/user/collect_list`);
				if (result.code == 0) {
					if (result.data.list.length > 0) {
						this.isShow = true;
						this.list = result.data.list.map(item => {
							return {
								logo: item.goods.logo,
								name: item.goods.name,
								code: item.goods.code,
								price: item.goods.current_price,
								rate: item.goods.rate
							}
						});
					}
				} else {
					uni.$u.toast(result.message || this.$lang.API_HTTP_ERROR);
				}
			},
		}
	}
</script>

<style>

</style>