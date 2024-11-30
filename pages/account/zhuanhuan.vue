<template>
	<view>
		<view :class="isAnimat?'fade_in':'fade_out'" :style="$theme.setBGSize(`240rpx`,`bg_1`)">
			<view class="flex" style="width: 90%;padding: 20px;">
				<image src="/static/arrow_left.png" mode="widthFix" style="width: 10px;" @click="fanhui()"></image>
				<view class="bold" style="font-size: 16px;color: #fff;text-align: center;width: 100%;">両替</view>
				<!-- <image src="/static/about.png" mode="widthFix" style="width: 20px;" @click="dingdan()"></image> -->
			</view>

			<view style="background-color: #fff;width: 95%;margin-left: 10px;border-radius: 10px;padding: 30px 0px;">


				<view class="bold" style="padding:10px 20px;margin-top: 20px;">支払い先口座</view>

				<view style="background-color: #f7f9ff;width: 95%;border-radius: 10px;margin-left: 10px;">
					<u-picker :show="show1" :columns="columns1" cancelText="キャンセル" confirmText="確認する"
						@cancel="show1=false" @confirm="duihuanClick1"></u-picker>
					<view class="flex" style="padding: 20px; justify-content: space-between;" @click="show1 = true">
						<view>{{duihuan1}}</view>
						<image src="/static/arrow_down.png" mode="widthFix" style="width: 15px;"></image>
					</view>
				</view>

				<view class="bold" style="padding:10px 20px;margin-top: 20px;">振り込み先口座</view>

				<view style="background-color: #f7f9ff;width: 95%;border-radius: 10px;margin-left: 10px;">
					<u-picker :show="show2" :columns="columns2" cancelText="キャンセル" confirmText="確認する"
						@cancel="show2=false" @confirm="duihuanClick2"></u-picker>
					<view class="flex" style="padding: 20px; justify-content: space-between;" @click="show2 = true">
						<view>{{duihuan2}}</view>
						<image src="/static/arrow_down.png" mode="widthFix" style="width: 15px;"></image>
					</view>
				</view>

				<view class="bold" style="padding:10px 20px;margin-top: 20px;">払込金額</view>

				<view style="" v-if="userInfo">
					<view class="" style="padding:0px 20px; justify-content: space-between;">
						<input placeholder="金額を入力してください。"
							style="background-color: #f7f9ff;padding: 10px;width: 95%;border-radius: 10PX;"
							v-model="amount"></input>
						<view class="flex">

							<view style="padding: 5px 0px;">利用可能残高</view>
							<view v-if="duihuan1=='JPY'" class="flex">
								<view class="bold" style="padding: 5px 0px;margin-left: 5px;">{{userInfo.money}}</view>
								<view class="bold" style="padding: 5px 0px;margin-left: 5px;">JPY</view>
							</view>

							<view v-if="duihuan1=='USD'" class="flex">
								<view class="bold" style="padding: 5px 0px;margin-left: 5px;">{{userInfo.usd}}</view>
								<view class="bold" style="padding: 5px 0px;margin-left: 5px;">USD</view>
							</view>

						</view>
					</view>
				</view>

				<view style="position: fixed;bottom: 0;left: 0;right: 0;background-color: #FFFFFF;padding:40rpx">
					<view class="text-center"
						style="margin:0 auto;width: 80%;background-color: #f2473f;padding: 15px;font-size: 16px;color: #fff;border-radius: 30px;"
						@click="handleSubmit()">
						{{$lang.BTN_CONFIRM}}
					</view>

				</view>


			</view>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				isAnimat: false, // 页面动画
				show1: false,
				show2: false,
				columns1: [
					['USD', 'JPY']
				],
				columns2: [
					['JPY', 'USD']
				],
				duihuan1: "JPY",
				duihuan2: "USD",
				userInfo: "",
				amount: ""

			}
		},

		onShow() {
			this.isAnimat = true;
			this.getAccountInfo()
		},
		onHide() {
			this.isAnimat = false;
		},
		methods: {
			duihuanClick1(e) {
				console.log(e);
				this.duihuan1 = e.value[0]
				if (this.duihuan1 == this.duihuan2) {
					if (this.duihuan1 == "JPY") {
						this.duihuan2 = "USD"
					} else {
						this.duihuan2 = "JPY"
					}
				}
				this.show1 = false
			},
			duihuanClick2(e) {
				console.log(e);
				this.duihuan2 = e.value[0]
				this.show2 = false
				if (this.duihuan1 == this.duihuan2) {
					if (this.duihuan2 == "JPY") {
						this.duihuan1 = "USD"
					} else {
						this.duihuan1 = "JPY"
					}
				}
			},
			async getAccountInfo() {
				uni.showLoading({
					title: this.$lang.API_GET_ACCOUNT_INFO
				});
				const result = await this.$http.get(`api/user/fastInfo`);
				if (!result) return false;
				this.userInfo = result;

			},
			async handleSubmit() {
				uni.showLoading({
					title: this.$lang.API_GET_ACCOUNT_INFO
				});
				const result = await this.$http.post(`api/user/duihuan`, {
					duihuan1: this.duihuan1,
					duihuan2: this.duihuan2,
					amount: this.amount,
				});
				if (!result) return false;

				console.log(`result:`, result);
				uni.showToast({
					title: '引き換えが成功しました',
					icon: 'success'
				});

				setTimeout(() => {
					this.getAccountInfo();
				}, 1000);

			},
			fanhui() {
				uni.navigateBack({
					delta: 1,
				})
			},
			dingdan() {
				uni.navigateTo({
					url: '/pages/account/huazhuan'
				})
			},
		}

	}
</script>

<style>
</style>