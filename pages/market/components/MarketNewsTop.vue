<template>
	<scroll-view :scroll-x="true" style="white-space: nowrap;" scroll-left="10" @touchmove.stop>
		<template v-if="article && article.length>0">
			<block v-for="(item,index) in article" :key="index">
				<view
					style="display: inline-block;height:260rpx;width: 280rpx;margin-left: 10px;background-color: #FFFFFF;border-radius: 32rpx;"
					@click="open(item.url)">
					<view style="text-align: center;">
						<image :src="item.pic" mode="scaleToFill" style="border-radius:  32rpx 32rpx 0 0;"
							:style="$theme.setImageSize(280,160)">
						</image>
					</view>
					<view style="width:340rpx;white-space: break-spaces;padding-left: 10px;"
						:style="{color:$theme.SECOND}">
						{{setText(item.title)}}
					</view>
					<view style="padding-right: 10px;color:#999;text-align: right;">
						{{item.created_at}}
					</view>
				</view>
			</block>
		</template>
	</scroll-view>
</template>

<script>
	export default {
		name: 'MarketNewsTop',
		data() {
			return {
				article: []
			}
		},
		created() {
			this.getData();
		},
		methods: {
			open(url) {
				window.open(url)
			},
			// 文字超出一行。转换为...
			setText(val) {
				let temp = '';
				return temp = val.length <= 13 ? val : val.slice(0, 10) + '...'
			},

			async getData() {
				const result = await this.$http.get(`api/goods/top1`);
				this.article = result.article || [];
			},
		}
	}
</script>