<template>
	<view style="position: absolute;left: 0;right: 0;bottom: 5vh;">
		<view style="text-align: center;color: #FFFFFF;font-size: 32rpx;margin-top: 40rpx;">
			<!-- {{$lang.LAUNCH_PROGRESS_TITLE}} -->
			{{`${percentage} %`}}
		</view>
		<view
			style="position:relative;margin:30rpx 120rpx;background-color:rgba(255,255,255,0.15);height:10px;border-radius: 20rpx;border: 1px solid #ACD4FF;padding:0 3px;">
			<view :style="setStyle"></view>
			<view style="background-image: url('/static/launch_loading.png');
		background-repeat: no-repeat;
		background-position: center center;
		background-size: cover;width: 100%;height: 100%;position: absolute;left: 0;right: 0;top: 0;bottom: 0;z-index: 99;">
			</view>
		</view>
		<!-- <view style="text-align: center;color: #FFFFFF;font-size: 32rpx;margin-top: 40rpx;">
			{{$lang.LAUNCH_PROGRESS_TITLE}}
			{{`${percentage} %`}}
		</view> -->
	</view>
</template>

<script>
	// 横向进度条，带有蒙层，上部带有进度值
	export default {
		name: 'ProgressSecond',
		data() {
			return {
				percentage: 1, // 进度条初始值
				timer: null,
			}
		},

		computed: {
			// 设置进度条递进样式
			setStyle() {
				// 当前方向
				const _direction = 'left';
				const temp = {
					position: 'absolute',
					bottom: 0,
					[`${_direction}`]: 0, // 决定进度条的递进方向
					height: '20rpx',
					width: `${this.percentage}%`,
					...this.$theme.LAUNCH_PROGRESS,
					borderRadius: '20rpx',
				};
				// console.log('进度条递进完整样式:', temp);
				return temp;
			}
		},
		mounted() {
			console.log('child mounted', this.timer);
			this.onSetTimeout();
		},
		deactivated() {
			console.log('child deactivated', this.timer);
			this.clearTimer();
		},
		methods: {
			onSetTimeout() {
				this.timer = setInterval(() => {
					// console.log("setInterval");
					if (this.percentage < 100) {
						this.percentage++;
					} else {
						this.clearTimer();
						// 跳转到首页 缓一秒， 否则看不到进度条加满效果
						setTimeout(() => {
							uni.switchTab({
								url: this.$paths.HOME,
							})
						}, 1500);
					}
					// console.log(this.percentage);
				}, 30);
			},
			clearTimer() {
				// clearTime
				if (this.timer) {
					clearInterval(this.timer);
					this.timer = null;
					console.log('clearTimer', this.timer);
				}
			},
		}
	}
</script>

<style>
</style>