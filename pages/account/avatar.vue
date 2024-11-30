<template>
	<view :class="isAnimat?'fade_in':'fade_out'">
		<HeaderSecond :title="$lang.AVATAR_TITLE" color="#CBCBCF"></HeaderSecond>

		<view style="display: flex;align-items: center;justify-content: center;border-radius:100%;">
			<view style="position: relative;">
				<image :src="imgUrl" @click="selectImg()" mode="scaleToFill"
					style="width: 240px;height: 240px;background-image: linear-gradient(90deg, rgb(255, 176, 68), rgb(255, 45, 48));border-radius: 100%;">
				</image>
				<image src="/static/avatar_edit.png" mode="aspectFit"
					style="position: absolute;bottom: 0;left: 50%;width: 32px;height: 32px;transform: translateX(-50%);"
					@click="modAvatar()">
				</image>
			</view>
		</view>

		<view style="margin:80rpx;">
			<view class="common_input_wrapper" style="margin-bottom: 60rpx;">
				<image mode="aspectFit" src="/static/user.png" :style="$theme.setImageSize(28)">
				</image>
				<input v-model="nick_name" type="text" :placeholder="$lang.AVATAR_TIP_NICK_NAME"
					:placeholder-style="$theme.setPlaceholder()" style="width: 90%;"></input>
			</view>
		</view>
		<view class="common_btn" @click="submit_list">
			{{$lang.BTN_CONFIRM}}
		</view>
	</view>
</template>

<script>
	import {
		pathToBase64
	} from '@/common/js_sdk.js';
	import HeaderSecond from '@/components/header/HeaderSecond.vue';
	export default {
		components: {
			HeaderSecond,
		},
		data() {
			return {
				isAnimat: false, // 页面动画
				avatarUrl: '', // 用于提交
				imgUrl: '', // 用于显示
				nick_name: "", // 昵称
			};
		},
		onLoad() {},
		onShow() {
			this.getAccountInfo()
			this.isAnimat = true;
		},
		onHide() {
			this.isAnimat = false;
		},
		methods: {
			modAvatar() {
				this.selectImg();
			},

			// 点击上传
			async selectImg() {
				const result = await uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
				});
				console.log('result:', result);
				const imageFile = result[1].tempFilePaths[0];
				console.log('imageFile:', imageFile);
				// this.upimg(1, imageFile.path)
				const tempBase64 = await pathToBase64(imageFile);
				console.log('base64:', tempBase64);
				this.avatarUrl = tempBase64;
				this.imgUrl = tempBase64;
			},

			async submit_list() {
				const result = await this.$http.post(`api/user/updateAvatar`, {
					avatar: this.avatarUrl,
					nickname: this.nick_name,
				})
				if (!result) return false;
				uni.showToast({
					title: this.$lang.API_POST_SUCCESS,
					icon: 'success'
				});
			},
			// 回调参数为包含columnIndex、value、values
			//用户信息
			async getAccountInfo() {
				uni.showLoading({
					title: this.$lang.API_GET_ACCOUNT_INFO
				});
				const result = await this.$http.get(`api/user/fastInfo`);
				if (!result) return false;
				this.imgUrl = result.avatar ? result.avatar : `/static/avatar.png`;
				this.nick_name = result.real_name ?
					result.real_name : result.nick_name ?
					result.nick_name : ''
			},
		},
	}
</script>