<template>
	<view class="page">
		<view class="block">
			<view class="head">
				<img @click="$util.goBack()" :src="$icon.zjt" class="back">
				<view class="title left_in" style="margin-left: 0px;">検索</view>
				<view class="back"></view>
			</view>
		</view>
		<view class="search">
			<img :src="$icon.sousuo">

			<input placeholder="銘柄コードを入力して検索" v-model="keyword" @input="searchButton" />
		</view>



		<u-picker :show="show1" :columns="[columns1]" cancelText="キャンセル" confirmText="確認する" @cancel="show1=false"
			@confirm="changeType"></u-picker>

		<view style="padding:10px 20rpx 0 20rpx;">
			<TitleSecond :title="$lang.SEARCH_HISTORY">
				<image mode="aspectFit" src="/static/delete.png" :style="$theme.setImageSize(40)"
					style="margin-left: auto;" @click="clearKeywords()"></image>
			</TitleSecond>
		</view>

		<view style="display: flex;align-items: center;margin:0 10px;flex-wrap: wrap;">
			<template v-if="keywords.length>0">
				<block v-for="(item,index) in keywords" :key="index">
					<view
						style="padding:6px 30px;border-radius: 5px;background-color:#ec4e78;color:#fff;font-size: 11px;margin-top: 10px;"
						@click="selectedItem(item)">{{item.value}}</view>
				</block>
			</template>
		</view>

		<view style="padding-bottom: 40rpx;">
			<SearchList :list="list"></SearchList>
		</view>

		

	</view>
</template>
<script>
	import HeaderSecond from '@/components/header/HeaderSecond.vue';
	import TitleSecond from '@/components/title/TitleSecond.vue';
	import SearchList from './components/SearchList.vue';
	export default {
		components: {
			HeaderSecond,
			TitleSecond,
			SearchList,
		},
		data() {
			return {
				isAnimat: false, // 页面动画
				keyword: "", // 当前关键词
				keywords: [], // 搜索词条组
				list: [], // 搜索结果
				curPage: 1,
				limit: 20,
				show1: false,
				curType: '国内', // 当前搜索类型
				columns1: ['国内', '米国株'],
				// guonei: "国内",
				// meiguo: "米国株",
			};
		},
		onLoad() {},
		onShow() {
			this.isAnimat = true;
			this.keywords = uni.getStorageSync("keywords") || [];
		},
		onHide() {
			this.isAnimat = false;
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.searchButton();
			uni.stopPullDownRefresh();
		},
		methods: {
			actionEvent() {
				uni.navigateBack({
					delta: 1,
				})
			},
			changeType(e) {
				this.curType = e.value[0];
				this.show1 = false;
			},

			// duihuanClick1(e) {
			// 	console.log(e);
			// 	this.guonei = e.value[0]
			// 	if (this.guonei == this.meiguo) {
			// 		if (this.guonei == "JPY") {
			// 			this.meiguo = "USD"
			// 		} else {
			// 			this.meiguo = "JPY"
			// 		}
			// 	}
			// 	this.show1 = false
			// },
			// 点击查看股票详情
			handleStockInfo(code) {
				uni.navigateTo({
					url: `${this.$paths.STOCK_OVERVIEW}?code=${code}`,
				})
			},
			// 清空搜索记录
			clearKeywords() {
				uni.clearStorageSync("keywords");
				this.keywords = []; // 手动清理缓存数据
				this.list = []; // 查询结果重置
			},

			// 选中一项搜索历史词条 
			selectedItem(item) {
				// this.keyword = item;
				this.curType = item.key;
				this.keyword = item.value;
				this.searchButton();
			},

			//搜索
			async searchButton() {
				if (this.keyword == '' || this.keyword.length < 3) {

					return false;
				}

				const result = await this.$http.post(`api/product/list`, {
					key: this.keyword,
					page: this.curPage,
					limit: this.limit,
					// 国内就是gp_index传1   美国就是传2
					gp_index: 1,
				})
				if (!result || result.length <= 0) return false;
				console.log(result);
				this.list = result.map(item => {
					if (item.gid && item.gid > 0) {
						return {
							id: item.gid,
							logo: item.logo || '',
							name: item.name || '',
							code: item.code || '',
							price: item.current_price || 0,
							rate: item.rate || 0,
							type_id: item.project_type_id || 0,
						}
					}
				});
				console.log('search result:', this.list);
				const temp = this.keywords.filter(item => item.value == this.keyword);
				console.log(`temp:`, temp);
				if (temp.length <= 0) {
					this.keywords.push({
						key: this.curType, // 用于区分国内还是美股
						value: this.keyword
					});
					uni.setStorageSync("keywords", this.keywords)
				}

				// if (this.keywords.indexOf(this.keyword) < 0) {
				// 	this.keywords.push(this.keyword);
				// 	uni.setStorageSync("keywords", this.keywords)
				// }
			},
		}
	}
</script>

<style type="text/css">
	@charset "UTF-8";

	/* uni.scss */
	.search {
		height: 28px;
		border-radius: 5px;
		border: 1px solid #e4013e;
		padding: 0 11px;
		box-sizing: border-box;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		margin: 10px 11px 0 11px
	}

	.search img {
		width: 19px;
		height: 19px;
		margin-right: 6px
	}

	.search uni-input {
		width: 100%;
		font-size: 13px;
		font-weight: 400;
		color: #333;
		background: transparent;
		border: 0;
		height: 26px;
		line-height: 26px
	}

	.title {
		height: 39px;
		padding: 0 11px;
		font-weight: 600;
		font-size: 13px;
		color: #212121;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.keyword {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-flow: wrap;
		flex-flow: wrap;
		padding: 0 9px
	}

	.keyword div {
		margin: 0 2px 5px 2px;
		width: calc(25% - 5px);
		height: 26px;
		background: #ec4e78;
		border-radius: 5px;
		font-weight: 400;
		font-size: 11px;
		color: #fff;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center
	}

	

	.uni-input-input {
		font-size: 13px;
		font-weight: 400;
		color: #333
	}
</style>