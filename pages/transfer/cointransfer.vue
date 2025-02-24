<template>
	<view>
		<view :class="isAnimat?'fade_in':'fade_out'" style="background-image: url(/static/trade_head.png);
	background-position: 0 0;
	background-size: 100% ;
	background-repeat: no-repeat;padding-bottom:-330px; background-color:#ededed ;">
			<header style="display: flex;align-items: center;padding: 24px 28rpx;">
				<view style="margin-right: auto;">
					<image src="/static/arrow_left.png" @click="$util.goBack()" mode="aspectFit"
						style="width: 16px;height: 16px;"></image>
				</view>
				<view style=" flex:60%">
					<view style="height: 56rpx;line-height: 56rpx;text-align: center;color:#FCFCFC;font-size: 28rpx;">
						両替
					</view>
				</view>
			</header>

			<view style="background-color: #fff;border-radius: 10px;padding: 20px 10px;">
				<view @click="linktorecord()"
					style="display: flex;align-items: right;text-align: right;justify-content: right;padding-right: 20px;">
					<image src="/static/transfer_record.svg" mode="aspectFit" :style="$theme.setImageSize(60)"></image>
				</view>
				<view class="bold" style="padding:10px 20px;margin-top: 20px;">支払い先口座</view>
				<view style="background-color: #f7f9ff;height: 50px; border-radius: 10px;text-align: center;">
					<u-picker :show="show1" :columns="columns1" cancelText="キャンセル" confirmText="確認する"
						@cancel="show1=false" @confirm="duihuanClick1">{{duihuan1}} </u-picker>
					<view style="padding-top: 16px;" @click="show1 = true">
						<view>{{duihuan1}}</view>
					</view>
				</view>

				<view class="bold" style="padding:10px 20px;margin-top: 20px;">振り込み先口座</view>

				<view style="background-color: #f7f9ff;height: 50px; border-radius: 10px;text-align: center;">
					<u-picker :show="show2" :columns="columns2" cancelText="キャンセル" confirmText="確認する"
						@cancel="show2=false" @confirm="duihuanClick2"></u-picker>
					<view style="padding-top: 16px;" @click="show2 = true">
						<view>{{duihuan2}}</view>
					</view>
				</view>

				<view class="bold" style="padding:10px 20px;margin-top: 20px;">払込金額</view>

				<view style="" v-if="userInfo">
					<view class="" style="padding:0px 20px; justify-content: space-between;">
						<input placeholder="金額を入力してください。"
							style="background-color: #f7f9ff;padding: 10px;width: 95%;border-radius: 10PX;"
							v-model="num"></input>
						<view class="flex">
							<view style="padding: 10px 0px;">利用可能残高</view>
							<view v-if="duihuan1=='JPY'" class="flex">
								<view class="bold" style="padding: 5px 0px;margin-left: 5px;">{{userInfo.money}}</view>
								<view class="bold" style="padding: 5px 0px;margin-left: 5px;">JPY</view>
							</view>
							<view v-if="duihuan1=='USDT'" class="flex">
								<view class="bold" style="padding: 5px 0px;margin-left: 5px;">{{userInfo.usd}}</view>
								<view class="bold" style="padding: 5px 0px;margin-left: 5px;">USDT</view>
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
					['USDT', 'JPY']
				],
				columns2: [
					['JPY', 'USDT']
				],
				duihuan1: "JPY",
				duihuan2: "USDT",
				userInfo: "",
				num: "",
				coin: "",
				amount: "",
				type: "",

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
						this.duihuan2 = "USDT"
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
						this.duihuan1 = "USDT"
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
				// 显示加载提示
				uni.showLoading({
					title: this.$lang.API_GET_ACCOUNT_INFO
				});

				// 根据 duihuan1 的值动态设置请求参数
				let coinValue, typeValue;

				if (this.duihuan1 === 'JPY') {
					coinValue = 'JO'; // 当 duihuan1 为 JPY 时设置 coin
					typeValue = '2'; // 当 duihuan1 为 JPY 时设置 type 为 2
				} else if (this.duihuan1 === 'USDT') {
					coinValue = 'USDT'; // 当 duihuan1 为 USDT 时设置 coin
					typeValue = '1'; // 当 duihuan1 为 USDT 时设置 type 为 1
				} else {
					uni.showToast({
						title: '不支持的转换类型',
						icon: 'none'
					});
					uni.hideLoading();
					return; // 如果 duihuan1 不符合预期，提前返回
				}

				try {
					// 发送 POST 请求
					const result = await this.$http.post('api/user/huazhuan', {
						coin: coinValue,
						num: this.num, // 从用户输入或状态中获取数量
						type: typeValue // 使用动态设置的 type
					});

					if (!result) return false;

					console.log('请求结果:', result);

					// 显示成功提示
					uni.showToast({
						title: '引き换えが成功しました',
						icon: 'success'
					});

					// 定时获取账户信息
					setTimeout(() => {
						this.getAccountInfo(); // 刷新账户信息
					}, 1000);

				} catch (error) {
					// 处理请求错误
					uni.showToast({
						title: '请求失败: ' + (error.message || '未知错误'),
						icon: 'none'
					});
					console.error('请求错误:', error);
				} finally {
					// 隐藏加载提示
					uni.hideLoading();
				}
			},
			linktorecord() {
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: '/pages/transfer/record'
				});
			},
			async getList1() {
				// uni.showLoading({
				// 	title: this.$lang.REQUEST_DATA,
				// });
				const result = await this.$http.get(`api/user/huazhuan_log`)

				if (!result || result.length <= 0) return false;
				this.list = result
				console.log(this.list1)
				// this.connect(); // 启动 websocket链接
			},
			fanhui() {
				uni.navigateBack({
					delta: 1,
				})
			},
			dingdan() {
				uni.navigateTo({
					url: '/pages/transfer/cointransfer'
				})
			},
		}

	}
</script>

<style>
</style>