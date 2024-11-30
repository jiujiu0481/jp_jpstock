<!-- 用于纵向导航，如：个人中心 -->
<template>
	<view style="padding: 6px;margin:0 10px;margin-top:10px;padding-top:10px;">
		<block v-for="(item,index) in list" :key="index">
			<view style="display: flex;align-items: center;margin:10px;padding-bottom: 10px;"
				@click="actionEvent(item,index)">
				<view style="flex: 12%;padding-left: 20px;">
					<image mode="aspectFit" :src="`/static/${item.icon}.png`" :style="$theme.setImageSize(48)"></image>
				</view>
				<text style="flex: 78%;font-weight: 700;font-size: 15px;color: #333333;">{{item.name}}</text>
				<view style="flex: 10%;">
					<view class="arrow rotate_45" :style="$theme.setImageSize(20)"></view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		name: "NavList",
		props: ['list'],
		data() {
			return {};
		},
		methods: {
			actionEvent(item, index) {
				uni.navigateTo({
					url: item.url,
				})
			},
		}
	}
</script>

<style>

</style>