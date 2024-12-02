<template>
	<view>
		<view class="nav-box">
			<block v-for="(item,index) in tabs" :key='index'>
				<view class="nav-item" :class="setClass(acitve==index)" @click="changeTab(index)">{{item}}<span></span>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		// 單行，激活項的文字帶有絕對定位的底邊
		name: "TabsThird",
		props: {
			// tab项数组
			tabs: {
				type: Array,
				default: [],
			},
			// 当前激活项
			acitve: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				current: this.acitve,
			};
		},
		methods: {
			changeTab(val) {
				this.current = val;
				this.$emit('action', this.current);
			},
			setClass(val) {
				return `${val?'active':''}`
			},
		}
	}
</script>
<style lang="scss" scoped>
	@charset "UTF-8";

	/* uni.scss */
	.page {
		background: #f7f9f8;
		height: 100vh;
		box-sizing: border-box;
		padding-bottom: 67px
	}

	.no-data {
		background: #fff;
		color: #666;
		font-size: 15px;
		text-align: center;
		line-height: 5rem
	}

	.nav-box {
		height: 49px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		// position: fixed;
		width: 100%;
		// left: 0;
		// top: 54px;
		background: #f7f9f8;
		// box-sizing: border-box;
		z-index: 10
	}

	.nav-box .nav-item {
		width: calc(33.3333333333% - 22px);
		margin: 0 11px;
		height: 28px;
		background: #fff;
		border-radius: 5px;
		border: 1px solid #f24639;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-weight: 500;
		font-size: 11px;
		color: #f24639
	}

	.nav-box .active {
		background: #f24639;
		color: #fff
	}

	.record-box {
		padding-top: 49px
	}

	.record-box .record-item {
		border-top: 1px solid #ebebeb;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		background: #fff;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .36);
		padding: 0 10px 4px 10px;
		margin-bottom: 7px
	}

	.record-box .record-item .item-top {
		min-height: 41px;
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

	.record-box .record-item .item-top .item-top-left {
		height: 41px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-weight: 600;
		font-size: 12px;
		color: #333;
		margin-right: 15px
	}

	.record-box .record-item .item-top .item-top-left span {
		min-height: 24px;
		background: #f24639;
		border-radius: 5px;
		padding: 0 11px;
		font-weight: 400;
		font-size: 11px;
		color: #fff;
		margin-left: 14px;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex
	}

	.record-box .record-item .item-top .item-date {
		font-weight: 500;
		font-size: 12px;
		color: #333
	}

	.record-box .record-item .item-foot {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-wrap: wrap;
		flex-wrap: wrap;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between
	}

	.record-box .record-item .item-foot .item-foot-list {
		width: calc(50% - 7px);
		min-height: 29px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		font-weight: 300;
		font-size: 12px;
		color: #666
	}

	.record-box .record-item .item-foot .item-foot-list span {
		font-weight: 500;
		font-size: 12px
	}

	.record-box .record-item .item-foot .item-foot-list .red {
		color: #e04e50
	}

	.record-box .record-item .item-foot .item-foot-list .green {
		color: #37927d
	}

	.record-box .record-item .item-name {
		min-height: 23px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		font-weight: 600;
		font-size: 12px;
		color: #333
	}

	.record-box .record-item .item-name span {
		font-weight: 600;
		font-size: 16px;
		color: #333
	}

	.record-box .record-item .item-date {
		min-height: 15px;
		font-weight: 400;
		font-size: 11px;
		color: #666;
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

	.record-box .record-item .item-date span {
		font-weight: 400;
		font-size: 11px;
		color: #666
	}

	.record-box .record-item .item-bottom {
		min-height: 24px;
		margin-top: 5px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		justify-content: flex-end
	}

	.record-box .record-item .item-bottom .item-bottom-btn {
		min-height: 24px;
		background: #adc1bb;
		border-radius: 5px;
		padding: 0 8px;
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

	.record-box .padding {
		padding-top: 11px;
		padding-bottom: 13px
	}
</style>