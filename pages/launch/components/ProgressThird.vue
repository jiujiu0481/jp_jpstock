<template>
	<view>
		<!-- <view
			style="position:relative;margin:30rpx 120rpx; background-color:rgba(255,255,255,0);border: 1px solid #ACD4FF;height:12rpx;border-radius: 20rpx;padding:0 3px;">
			<view :style="setStyle"></view>
			<view :style="imgMove"> </view>
		</view>
		<view style="text-align: center;color: #595857;font-size: 32rpx;margin-top: 30rpx;">
			プログラムバージョンを確認中... {{`${percentage} %`}}
		</view> -->
		<view data-v-48330e9d="" class="foot">
			<img data-v-48330e9d="" src="/static/img/loading.ba9faa74.png">
			<view data-v-48330e9d="" class="foot-right">{{percentage==100?'読み込みが完了しました...(100%)':'プログラムバージョンを確認中...('+percentage+ '%)'}}
			

			
				<view data-v-48330e9d="" class="foot-right-line">
					<span data-v-48330e9d="" class="foot-right-long" :style="'width: '+percentage*2+'%;'"></span>
					<span data-v-48330e9d="" class="foot-right-short" :style="'width: '+percentage+'%;'"></span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// desc:带有一个小火煎/圆球的进度条
	export default {
		name: 'ProgressThird',
		data() {
			return {
				percentage: 1, // 进度条初始值
				timer: null,
			}
		},

		computed: {
			setStyle() {
				const temp = {
					position: 'absolute',
					bottom: 0,
					left: 0,
					height: '12rpx',
					width: `${this.percentage}%`,
					backgroundImage: `linear-gradient(90deg,#9d7ef8 ,#6258fa,#9d7ef8)`,
					borderRadius: '20rpx',
				};
				return temp;
			},
			// 小火箭的位移
			imgMove() {
				const temp = {
					backgroundImage: `url('/static/launch_loading_icon.png')`,
					backgroundRepeat: 'no-repeat',
					backgroundPosition: `${this.percentage}% 2px`,
					backgroundSize: '6%',
					width: ' 100%',
					height: '40rpx',
					position: 'absolute',
					left: 0,
					right: 0,
					top: '-14rpx',
					bottom: 0,
					zIndex: 99,
				};
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
						}, 3000);
					}
					// console.log(this.percentage);
				}, 10);
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

<style type="text/css">
	@charset "UTF-8";


	.logo[data-v-48330e9d] {
		width: 303px;
		height: 105px;
		object-fit: contain
	}

	.foot[data-v-48330e9d] {
		width: 100%;
		box-sizing: border-box;
		height: 64px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 0 13px
	}

	.foot img[data-v-48330e9d] {
		width: 23px;
		height: 24px;
		margin-right: 6px;
		-webkit-animation: loading-data-v-48330e9d 1.5s linear infinite;
		animation: loading-data-v-48330e9d 1.5s linear infinite
	}

	.foot .foot-right[data-v-48330e9d] {
		width: calc(100% - 30px);
		height: 64px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-size: 11px;
		font-weight: 400;
		color: #fff;
		line-height: 15px;
		letter-spacing: 0.5px
	}

	.foot .foot-right .foot-right-line[data-v-48330e9d] {
		width: 100%;
		height: 7px;
		background: #f5f5f5;
		border-radius: 3px;
		margin-top: 3px;
		overflow: hidden;
		position: relative
	}

	.foot .foot-right .foot-right-long[data-v-48330e9d] {
		height: 7px;
		border-radius: 3px;
		background: #ff9fb9;
		position: absolute;
		display: block;
		left: 0;
		top: 0;
		z-index: 1;
		-webkit-transition-duration: 1.5s;
		-moz-transition-duration: 1.5s;
		-o-transition-duration: 1.5s
	}

	.foot .foot-right .foot-right-short[data-v-48330e9d] {
		height: 7px;
		border-radius: 3px;
		background: #e4013e;
		position: absolute;
		display: block;
		left: 0;
		top: 0;
		z-index: 2;
		-webkit-transition-duration: 2s;
		-moz-transition-duration: 2s;
		-o-transition-duration: 2s
	}

	@keyframes loading-data-v-48330e9d {
		0% {
			-webkit-transform: rotate(0);
			transform: rotate(0)
		}

		50% {
			-webkit-transform: rotate(180deg);
			transform: rotate(180deg)
		}

		100% {
			-webkit-transform: rotate(1turn);
			transform: rotate(1turn)
		}
	}

	@-moz-keyframes loading-data-v-48330e9d {
		0% {
			transform: rotate(0)
		}

		50% {
			transform: rotate(180deg)
		}

		100% {
			transform: rotate(1turn)
		}
	}

	@-webkit-keyframes loading-data-v-48330e9d {
		0% {
			-webkit-transform: rotate(0);
			transform: rotate(0)
		}

		50% {
			-webkit-transform: rotate(180deg);
			transform: rotate(180deg)
		}

		100% {
			-webkit-transform: rotate(1turn);
			transform: rotate(1turn)
		}
	}

	@-o-keyframes loading-data-v-48330e9d {
		0% {
			transform: rotate(0)
		}

		50% {
			transform: rotate(180deg)
		}

		100% {
			transform: rotate(1turn)
		}
	}
</style>