<!-- 公司简介 -->
<template>
	<view>
		<CustomTitle :title="$lang.STOCK_COMPANY">
			<!-- <view style="font-size: 13px;" @click="changeCompanyInfo()" :style="{color:$theme.PRIMARY}">
				{{fullCompanyInfo? $lang.BRIEF:$lang.MORE }}
				<image src="/static/arrow_down.png" mode="aspectFit" style="padding:0 20rpx;"
					:style="{transform:`rotate(${fullCompanyInfo==true?180:0}deg)`,...$theme.setImageSize(28) }">
				</image>
			</view> -->
		</CustomTitle>
		<view style="height: 1px;background-color: #E5E5E5;margin:0 40rpx;"></view>

		<view class="about" style="padding: 4px 28rpx;">
			<view class="txt" :class="fullCompanyInfo?'':'show'" style="white-space:pre-wrap;margin-top: 0;"
				:style="{color:$theme.LOG_VALUE}">
				{{info.description}}
			</view>
			<view
				style="text-align: center;border-radius: 44rpx;border:1px solid #E5E5E5;width: max-content;padding:10rpx 60rpx;margin:0 auto"
				:style="{color:$theme.PRIMARY}" @click="changeCompanyInfo()">
				{{fullCompanyInfo? $lang.BRIEF:$lang.MORE }}
				<!-- <image src="/static/arrow_down.png" mode="aspectFit" style="width: 30rpx;height: 30rpx;"
					:style="{transform:`rotate(${fullCompanyInfo==true?180:0}deg)` }"></image> -->
			</view>
		</view>
	</view>
</template>

<script>
	import CustomTitle from '@/components/CustomTitle.vue';
	export default {
		name: "CompanyProfile",
		components: {
			CustomTitle,
		},
		props: {
			info: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				fullCompanyInfo: false,
			};
		},

		methods: {
			// 公司简介
			changeCompanyInfo() {
				this.fullCompanyInfo = !this.fullCompanyInfo;
			},
		}
	}
</script>

<style lang="scss">
	.about {
		.txt {
			margin-top: 16px;
			color: #333;
			line-height: 26px;
		}

		.txt.show {
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}
	}
</style>