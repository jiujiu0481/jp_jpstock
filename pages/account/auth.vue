<template>
	<view :class="isAnimat?'fade_in':'fade_out'" class="page_bg_sec">
		<CustomHeaderSecond title="本人確認"></CustomHeaderSecond>
		<view class="page view-bandCard-day">
			<!-- <view class="block">
				<view class="head">
					<img @click="$util.goBack()" :src="$icon.zjt" class="back">
					<view class="title left_in" style="margin-left: 0px;">本人確認</view>
					<view class="back"></view>
				</view>

				<view class="short"></view>
			</view> -->
			<view class="info-box"><img
					:src="userInfo.is_check>-1?'/static/img/6.eb24ab02.png':'/static/img/5.969a5c11.png'"
					class="info-img">

				<span
					v-if="userInfo.is_check>-1">{{userInfo.is_check==1?'もう実名だよ':(userInfo.is_check==-1?'未提出':(userInfo.is_check==2?'拒否する':'審査中'))}}</span>


				<view class="info-name">名前:</view>
				<view class="input-item">
					<input v-model="realName" type="text" placeholder="名前を入力してください"></input>
				</view>
				<view class="info-name">マイナンバーカード:</view>
				<view class="input-item">

					<input v-model="cardNo" type="text" placeholder="マイナンバーカード番号を入力してください"></input>
				</view>
				<view class="info-name">マイナンバーカード表と裏をアップロードしてください</view>
				<view class="upload">
					<view class="upload-box">
						<view class="upload-info" v-if="!formData.obverseUrl">
							<img :src="$icon.xiangji"
								@click="selectImg('obverse')" >
						</view>
						<view v-else>
							<img :src="formData.obverseUrl" @click="selectImg('obverse')" class="upload-img">
						</view>
						
						<span>マイナンバーカード表面</span>
					</view>
					<view class="upload-box">
						
						<view class="upload-info" v-if="!formData.reverseUrl">
							<img :src="$icon.xiangji"
								@click="selectImg('reverse')" >
						</view>
						<view v-else>
							<img :src="formData.reverseUrl" @click="selectImg('reverse')" class="upload-img">
						</view>
						
						<span>マイナンバーカードの裏面</span>
					</view>
				</view>
				<view  style="position: fixed;bottom: 0;left: 0;right: 0;background-color: #FFFFFF;padding:10px;z-index: 9999;">
				<view class="btn_com" @click="gain_aouonym()">送信</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import md5 from '@/common/md5.min.js';
	import HeaderSecond from '@/components/header/HeaderSecond.vue';
	import TitleSecond from '@/components/title/TitleSecond.vue';
	import {
		BASE_URL,
	} from '@/common/http';
	export default {
		components: {
			HeaderSecond,
			TitleSecond,
		},
		data() {
			return {
				isAnimat: false, // 页面动画
				realName: '', // 姓名 이정현
				cardNo: '', // 证件号码
				showPwd: false, // 是否显示完整证件号
				fullCardNo: '', // 证件号码完整值

				obverseUrl: '',
				reverseUrl: '',
				// 上传图片
				// 表单
				formData: {
					// 正面
					obverseUrl: '',
					// 反面
					reverseUrl: ''
				},
				userInfo: {},
			};
		},
		computed: {
			// 实名认证状态明文
			statusLabels() {
				return [
					this.$lang.AUTH_RESULT_REVIEW,
					this.$lang.AUTH_RESULT_PASS,
					this.$lang.AUTH_RESULT_REPOST,
				]
			},
		},
		onLoad() {
			this.getAccountInfo();
		},
		onShow() {
			this.isAnimat = true;
		},
		onHide() {
			this.isAnimat = false;
			this.setStorageData();
		},

		methods: {
			// 设置页面缓存信息
			setStorageData() {
				uni.setStorageSync('realName', this.realName);
				uni.setStorageSync('cardNo', this.cardNo);
				console.log(`111`, this.formData);
				uni.setStorageSync('obverseUrl', this.formData.obverseUrl);
				uni.setStorageSync('reverseUrl', this.formData.reverseUrl);
			},
			// 获取页面缓存信息
			getStorageData() {
				this.realName = this.realName.length > 0 ? this.realName : (uni.getStorageSync('realName') || '');
				this.cardNo = this.cardNo.length > 0 ? this.cardNo : (uni.getStorageSync('cardNo') || '');
				this.formData.obverseUrl = this.formData.obverseUrl.length > 0 ?
					this.formData.obverseUrl : (uni.getStorageSync('obverseUrl') || '');
				this.formData.reverseUrl = this.formData.reverseUrl.length > 0 ?
					this.formData.reverseUrl : (uni.getStorageSync('reverseUrl') || '');
			},
			fanhui() {
				uni.switchTab({
					url: '/pages/home/index'
				})
			},

			// ID号显隐
			handleShowPwd() {
				this.showPwd = !this.showPwd;
			},

			// 点击上传
			async selectImg(name) {
				const result = await uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
				});
				console.log('result:', result);
				const imageFile = result[1].tempFiles[0];
				console.log('imageFile:', imageFile);

				if (name == "obverse") {
					this.upimg(1, imageFile.path)

				} else if (name == "reverse") {
					this.upimg(2, imageFile.path)
				}
			},
			// 上传图片
			async upimg(type, tempFilePath) {
				uni.showLoading({
					title: this.$lang.STATUS_UPLOAD,
				})
				let Request = "Qwd3N5yp"
				let time = parseInt(new Date().getTime() / 1000)
				let str_url = ("/api/app/upload").toLowerCase()

				let mdd = md5("XPFXMedS" + Request + str_url + time);

				const result = await uni.uploadFile({
					url: BASE_URL + '/api/app/upload?t=' + time + "&sign=" + mdd,
					filePath: tempFilePath,
					name: 'file',
				});

				console.log('result:', result);
				uni.hideLoading();
				if (result[1].statusCode == 200) {
					const temp = JSON.parse(result[1].data);
					console.log('temp:', temp);
					if (type == 1) {
						this.formData.obverseUrl = temp[0].url;
					} else {
						this.formData.reverseUrl = temp[0].url;
					}
				}
				this.setStorageData();
			},

			// 认证
			async gain_aouonym() {
				if (this.realName == '') {
					uni.showToast({
						title: this.$lang.TIP_REAL_NAME,
						icon: 'none'
					});
					return false;
				}
				if (this.cardNo == '') {
					uni.showToast({
						title: this.$lang.AUTH_TIP_ID_CARD,
						icon: 'none'
					});
					return false;
				}

				uni.showLoading({
					title: this.$lang.API_DATA_SUBMIT
				});
				const tempCardNo = this.cardNo;
				const result = await this.$http.post(`api/user/real-auth1`, {
					real_name: this.realName,
					// sex: this.calcSex,
					idno: tempCardNo,
					front_image: this.formData.obverseUrl,
					back_image: this.formData.reverseUrl,
				});
				if (result) {
					uni.showToast({
						title: result,
						icon: 'none'
					});
					setTimeout(() => {
						uni.switchTab({
							url: this.$paths.HOME
						});
					}, 1000);
				}
			},

			async getAccountInfo() {
				uni.showLoading({
					title: this.$lang.API_GET_ACCOUNT_INFO
				});
				const result = await this.$http.get(`api/user/fastInfo`);
				if (!result) return false;
				this.userInfo = result;
				this.realName = this.userInfo.real_name || '';
				this.cardNo = this.userInfo.idno || '';
				this.formData.obverseUrl = this.userInfo.front_image || '';
				this.formData.reverseUrl = this.userInfo.back_image || '';
				this.getStorageData();
			},
		},
	};
</script>
<style type="text/css">
	@charset "UTF-8";

	/* uni.scss */


	.finish {
		padding: 0 22px
	}

	.finish .finish-top {
		height: 286px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center
	}

	.finish .finish-top img {
		width: 283px;
		height: 192px
	}

	.finish .finish-top span {
		font-weight: 600;
		font-size: 12px;
		color: #080827;
		margin-top: 13px
	}

	.finish .finish-list {
		height: 35px;
		border-radius: 3px;
		border: 1px solid #bcbcbc;
		padding: 0 9px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-weight: 400;
		font-size: 12px;
		color: #bcbcbc;
		margin-bottom: 10px
	}

	.info-box {
		padding: 21px 22px 0 22px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.info-img {
		width: 299px;
		height: 224px
	}

	.info-name {
		width: 100%;
		height: 37px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-weight: 600;
		font-size: 12px;
		color: #080827;
		letter-spacing: 0.5px;
		padding: 0 3px
	}

	.input-item {
		width: 100%;
		height: 35px;
		border-radius: 3px;
		border: 1px solid #bcbcbc;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 0 9px;
		box-sizing: border-box
	}

	.input-item uni-input {
		width: 100%;
		height: 33px;
		line-height: 33px;
		background: transparent;
		border: 0;
		font-size: 12px;
		font-weight: 400;
		color: #333
	}

	.input-item img {
		width: 16px;
		height: 12px;
		margin-left: 7px
	}

	.upload {
		width: 100%;
		height: 149px;
		padding: 0 5px;
		box-sizing: border-box;
		border-radius: 3px;
		border: 1px solid #bcbcbc;
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

	.upload .upload-box {
		width: calc(50% - 16px);
		height: 149px;
		margin: 0 8px;
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

	.upload .upload-box .upload-info {
		width: 100%;
		height: 99px;
		background: #ececec;
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

	.upload .upload-box .upload-info img {
		width: 21px;
		height: 19px
	}

	.upload .upload-box .upload-img {
		width: 100%;
		height: 99px;
		object-fit: cover
	}

	.upload .upload-box span {
		width: 100%;
		height: 33px;
		font-weight: 400;
		font-size: 12px;
		color: #bcbcbc;
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

	.btn-big {
		width: 100%;
		height: 39px;
		background: #e4013e;
		border-radius: 6px;
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
		font-size: 13px;
		color: #fff;
		margin-top: 26px
	}

	.uni-input-input {
		font-size: 12px;
		font-weight: 400;
		color: #333
	}
</style>