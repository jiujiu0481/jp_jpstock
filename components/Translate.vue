<template>
	<view style="display: inline-block;">
		<image :src="`/static/lang/${curIcon}.png`" :style="$theme.setImageSize(64,58)" @click="isShow=true"></image>

		<template v-if="isShow">
			<view class="common_mask" @click="isShow=false"></view>
			<view class="common_popup">
				<view class="popup_header" style="color:#FFFFFF;" :style="{backgroundColor:$theme.PRIMARY}">
					{{$lang.TRANSLATE_TITLE}}

					<image src="/static/close_light.png" mode="aspectFit" :style="$theme.setImageSize(40)"
						style="position: absolute;top:50%;right: 30px;transform: translateY(-50%);"
						@click="handleClose()"></image>
				</view>

				<view style="display: flex;align-items: center;flex-wrap: wrap;padding-top: 20px;">
					<block v-for="(item,index) in langList" :key="index">
						<view style="flex:33%;text-align: center;" @click="handleSelected(item,index)">
							<image :src="`/static/lang/${item.icon}.png`" :style="$theme.setImageSize(160)">
							</image>
							<view style="text-align: center;">{{item.name}}</view>
						</view>
					</block>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	import languages from '@/locale/index.js';
	export default {
		name: "Translate",
		data() {
			return {
				isShow: false,
				curIcon: '',
			};
		},

		computed: {
			langList() {
				// 根据项目需求，保留需要显示的语言
				return [{
					lang: 'en-US',
					name: 'English',
					icon: 'usa-80'
				}, {
					lang: 'zh-HK',
					name: '中文繁体',
					icon: 'hongkong-80'
				}, {
					lang: 'ja-JP',
					name: '日本語',
					icon: 'japan-80'
				}, ];
			}
		},

		created() {
			this.calcCurLang();
		},

		methods: {
			handleClose() {
				this.isShow = false;
			},

			// 当前语言标志
			calcCurLang() {
				const temp = uni.getStorageSync('lang') || this.$LANGCODE;
				console.log(temp);
				this.curIcon = this.langList.filter(item => item.lang == temp)[0].icon;
				console.log(this.curIcon)
			},

			handleSelected(val, index) {
				console.log(index, val);
				this.isShow = false;
				uni.setStorageSync('lang', val.lang);
				this.$lang = languages[val.lang];
				this.calcCurLang();
				console.log(this.$lang);
				uni.setStorageSync('lang', val.lang);
				console.log(uni.getStorageSync('lang'));
				// 每次切换语言后，都调用setTabbar将底部导航重新排序
				this.$util.switchTabBar();
				uni.reLaunch({
					url: this.$paths.LAUNCH,
				})
			},
		}
	}
</script>

<style>

</style>