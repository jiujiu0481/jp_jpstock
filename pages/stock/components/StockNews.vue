<template>
	<view style="padding: 10px;font-size: 14px;">
		<block v-for="(item,index) in list" :key="index">
			<view @click="open(item.url)" :class="index<list.length-1?'line':''"
				style="display: flex;align-items: center;margin-bottom: 10px;padding-bottom: 10px;">
				<view style="flex:60%;padding-right: 10px;">
					<view :style="{color:$theme.LOG_VALUE}">{{item.title}}</view>
					<view style="margin:6px;padding: 4px 0;text-align: right;" :style="{color:$theme.LOG_LABEL}">
						{{item.published_at}}
					</view>
				</view>
				
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		name: "StockNews",
		props: ['code', 'id'],
		data() {
			return {
				list: [],
			}
		},
		created() {
			this.getList()
		},
		methods: {
			open(url) {
				window.open("https://minkabu.jp"+url)
			},
			async getList() {
				// uni.showLoading({
				// 	title: this.$lang.REQUEST_DATA,
				// });
				const result = await this.$http.get(`api/product/news`, {
					code: this.code,
					time_index: this.curKLine
				});
				if (!result) return false;
				this.list = result;
			},
		},
	}
</script>