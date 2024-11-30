<template>
	<view>
		<template v-if="logo && logo != ''">
			<image :src="setLogo" mode="aspectFit" :style="$theme.setImageSize(70)" style="border-radius:100%;"></image>
		</template>
		<template v-else>
			<view :style="$theme.setImageSize(70)"
				style="background-color:#f2bb8f;text-align: center;line-height: 70rpx;color: #FFFFFF;border-radius: 100%;font-size: 16px;">
				{{setLogo}}
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		name: 'CustomLogo',
		props: {
			logo: {
				type: String,
				default: '',
			},
			// 股票名字，用于切出第一个字符作为LOGO
			name: {
				type: String,
				default: '',
			}
		},
		computed: {
			setLogo() {
				if (this.logo && this.logo != '') {
					return this.$util.setLogo(this.logo);
				} else {
					return this.name && this.name.length > 0 ? this.name[3] : '';
				}
			},
		}
	}
</script>

<style>
</style>