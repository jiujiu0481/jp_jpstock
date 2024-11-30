<template>
	<view>
		<template v-if="!list || list.length<=0">
			<EmptyData img="search"></EmptyData>		</template>
		<template v-else>
			<block v-for="(item,index) in list" :key="index">
				<view class="list"  @click="link(item.code)">
					<view class="list-item">
						<view class="item-title"> {{item.name}}{{item.code}}<span
								class="red">{{$util.formatMoney(item.price)}}
								{{item.rate_num}}({{item.rate}}%)</span></view><img
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAAXNSR0IArs4c6QAAAOdQTFRFAAAA////////8f//8v/y9PT09fX19vb29/f3+Pj4+Pj4+Pj4+fn59Pr69vv29/v3+fn59vn59/n39/r3+Pj49/n39/n3+Pr4+Pr49vr49/j49/n5+Pn49/r49/n59/n59/n59/n39/n39/n49/n49/n49/n49/n49/n49/n49/n49/r49/n5+Pn49/n49/n49/n49/n45AE+5AVB5Q9J5hhP5h5U5ydb6DVl6UBt6kdy6khz6lF67GmM7XaW7n+c7oSg7oWh8aK3883X9Njf9dng9dvi9eDl9uns9vLz9vPz9/f29/n4ZYNm0gAAADJ0Uk5TAAUNEhMXGhwfIiMnKDA5PU9YXGBshYeOj5Kbnq68xcbIycrS2Nzf4OXm5+js7vH2+fy+1JKYAAAC1ElEQVRo3s2aaVvaQBSFLyAIWlHZ98VALJQlTIu1tUVbWy31/P/f0w8GpBXJ3Nns+Zx53meSzJ27HCJJJbL5UqPl+aMgGPleq1HKZxNkUqlc3ccW+fVcygzhsNjDDvWKh7qEvUIXkeoW9jQQ+9UppDSt7isiDmoBpBXUDhQQ8coMLM0qcS7jdAC23p6yEOkmlNRMyzNOxlDU+EQSEStDQ+WYDCPZgZY6yWhGpg9N9TNRjKMhtDU82s04nsCAJsc792GEAUx27CUzhCENX/wuyT6Mqf/CPxbrwKA6289LBUZV3hpLYFhbIkx6bBoyfh4tmzCu5rP7Axb0z/0SH9iADOI2/6yVKn/lDDM7kNlmdlGTWvJ7MZ8vlixKbSO/kst9FkIIccWiBE/5WFVuxVzwKdV1LjrlQHiU6SqDLUguWAgFSiGEnEk+v/ysQOmGtYH0guWVAuWxsijCKqVIREQ9WKX0iIhSrNOlQEkRUQ6WKTkiqsMypU5E57BM8YkS/NjKpSQoC+uULOVhnZKnEqxTStSAdUqD2rBOaZMH6xSPfGhTvkYelBG0Ke8jtjKiQB2C63ArvyKyCR3ITcj4FJWyaLyuFePiDlGvS/nDf1sxfkZHSM86Ax61rDPQUgwrHAYaagGSxUBJKdTfsBjIq1xaTAayCtcvl4EEP5FgM3x+SsRmoM5O7vgM5LhpqgIDKWbCrcLoMUsHFUZYOkgXQd9VGGERRF3Jxz+qMLrMwvSDAmNdmMqW2F+EEOLiB4uxLrFlmwX3l0Jc8vbx1CyQbXvg4fb2gcfYaHtINnAUVHPdinLSVHPTHnTS6HTTsnXTfHbSRicqm2WUX2+04WRIQ5R5Z4oxzLzu4MzNCNDNMNPNWNbNgJkophX3K7H/Z+jvyL6gaMQY8IwYjiwlbswxjmw+j4YlieHKmZZhiYiI3li3Xq1NZFtr5HNjJrJNO1x7ZYdrs+xwfwA5ft7UV4BJsQAAAABJRU5ErkJggg=="
							class="arrow">
					</view>
				</view>

			</block>
		</template>
	</view>
</template>

<script>
	import EmptyData from '@/components/EmptyData.vue';
	import CustomLogo from '@/components/CustomLogo.vue';
	export default {
		name: 'SearchList',
		components: {
			EmptyData,
			CustomLogo,
		},
		props: {
			// 列表数据
			list: {
				type: Array,
				default: []
			},
		},

		methods: {
			// 跳转到股票详情
			link(code) {
				if (!code || code == '') return false;
				uni.navigateTo({
					url: `${this.$paths.STOCK_OVERVIEW}?code=${code}`
				});
			}
		}
	}
</script>

<style>
	.list {
		padding: 0 13px;
		margin-top: 15px
	}

	.list .list-item {
		height: 68px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between
	}

	.list .list-item .item-title {
		height: 68px;
		font-weight: 600;
		font-size: 12px;
		color: #333;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center
	}

	.list .list-item .item-title span {
		font-size: 12px;
		font-weight: 400;
		margin-top: 5px
	}

	.list .list-item .arrow {
		width: 26px;
		height: 26px
	}
</style>