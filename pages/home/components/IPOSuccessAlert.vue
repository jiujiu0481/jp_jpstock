<template>
	<view class="mask" @click="handleClose()" v-if="isShow">
		<view style="position:absolute;left: 50%;transform: translateX(-50%);bottom: 15vh;" @click="handleClose()">
			<image src="/static/close_light1.png" mode="widthFix" style="width: 30px;height: 30px;"></image>
		</view>
		<view style="position: fixed;top:25vh;left: 50%;transform: translateX(-50%);background-color: #fff;border-radius: 10px;">
			<view class="bg_ad">
				<view style="font-size: 32rpx;font-weight: 700;color: #121212;">
				</view>

				<view>
					<image src="/static/home_news_A.png" mode="aspectFit" :style="$theme.setImageSize(480,250)">
					</image>
				</view>
				<view
					style="width: 90%;border-radius: 6px;text-align: center;padding:10px 10px 20px 10px;margin-top: 0px;">
					<view style="font-size: 40rpx;font-weight: 700;color: #121212;padding:4px 40px;">
						{{info.name}}
					</view>
					<view style="font-size: 28rpx;font-weight: 700;color: #666;padding:4px 40px;">
						{{info.code}}
					</view>

					<view style="font-size: 12px;color:#999;padding:2px 0 10px 0;">
						{{$lang.DIALOG_IPO_SUCCESS_TIP_TEXT}}
					</view>
					<view
						style="padding: 10px 0;display: flex;align-items: center;justify-content: space-between;padding:10px 40px;">
						<view>{{$lang.DIALOG_IPO_SUCCESS_LABEL_QTY}}</view>
						<text style="font-weight: 700;color:#ff3636;font-size: 16px;">
							{{$util.formatMoney(info.success)}}</text>
					</view>
					<view
						style="padding: 10px 0;display: flex;align-items: center;justify-content: space-between;padding:10px 40px;">
						<view>{{$lang.DIALOG_IPO_SUCCESS_LABEL_TOTAL}}</view>
						<text
							style="font-weight: 700;color:#ff3636;font-size: 16px;">{{$util.formatMoney(info.total)}}</text>
					</view>
					<view
						style="padding: 10px 0;line-height: 1.5;background-color:#EBBD33;border-radius: 100px;color:#FFF;margin:20px 30px;"
						@click="linkIPOSuccessLog()">{{$lang.BTN_DETAIL_NOW}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'IPOSuccessAlert',
		data() {
			return {
				isShow: false,
				info: {}, // 
			}
		},
		created() {
			this.ipoSuccess();
		},
		methods: {
			// 弹层关闭
			handleClose() {
				this.isShow = false;
			},
			linkIPOSuccessLog() {
				uni.navigateTo({
					url: this.$paths.TRADE_IPO_RECORD + `?curTab=1`,
				})
			},

			// 获取IPO成功记录
			async ipoSuccess() {
				const result = await this.$http.get(`api/goods-shengou/tanchuang`);
				console.log(result,5555555);
				const temp = result;
				this.info = {
					code: temp.goods.code,
					name: temp.goods.name,
					success: temp.success,
					total: temp.success_num_amount,
				};
				this.isShow = true;
					
			},
		}
	}
</script>

<style>
	.mask {
		background-color: rgba(0, 0, 0, 0.35);
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 999;
	}

	.bg_ad {
		background-image: url(/static/dialog_bg_ipo_success.png);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		height: 50vh;
		width: 80vw;
		display: flex;
		flex-wrap: nowrap;
		flex-direction: column;
		align-items: center;
		border-radius: 20px;
		padding: 20px 0;
	}
</style>