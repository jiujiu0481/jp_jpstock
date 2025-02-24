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
						両替記録
					</view>
				</view>
			</header>
		</view>
		<template v-if="!list || list.length<=0">
			<EmptyData img="search"></EmptyData>
		</template>
		<template v-else>
			<view v-for="(item,index) in list" :key="index">
				<view
					style="padding: 10px 16px;margin: 14px 16px  0   16px;border-radius: 10px; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;">
					<view
						style="display: flex;align-items: center;justify-content: center;line-height: 2;font-weight: 700;">
						{{ item.type === 1 ? 'USDT TO JPY' : item.type === 2 ? 'JPY TO USDT' : '' }}
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;line-height: 2;">
						<view> 注文番号</view>
						<view>{{ item.ordersn }}</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;line-height: 2;">
						<view> 換算量</view>
						<view>{{ item.num }} {{ item.type === 1 ? 'USDT' : item.type === 2 ? 'JPY' : '' }}</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;line-height: 2;">
						<view>数量を取得する</view>
						<view>{{ item.newnum }} {{ item.type === 2 ? 'USDT' : item.type === 1 ? 'JPY' : '' }}</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;line-height: 2;">
						<view>注文時間</view>
						<view>{{ item.huazhuanat }}</view>
					</view>
				</view>
			</view>
		</template>

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
				list: "",
			}
		},

		onShow() {
			this.isAnimat = true;
			this.getAccountInfo();
			this.getList()
		},
		onHide() {
			this.isAnimat = false;
		},
		methods: {



			async getAccountInfo() {
				uni.showLoading({
					title: this.$lang.API_GET_ACCOUNT_INFO
				});
				const result = await this.$http.get(`api/user/fastInfo`);
				if (!result) return false;
				this.userInfo = result;

			},
			async getList() {

				const result = await this.$http.get(`api/user/huazhuan_log`)

				// if (!result || result.length <= 0) return false;
				// console.log(`result111`, result);
				// 检查返回的数据
				if (!result || result.length <= 0) {
					uni.showToast({
						title: '没有数据',
						icon: 'none'
					});
					this.list = []; // 确保list为一个空数组
					return false;
				}
				// 将获取到的数据赋值给 list
				this.list = result; // 假设 result 是一个数组
				console.log('请求结果:', result); // 打印请求结果
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