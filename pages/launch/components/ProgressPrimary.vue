<template>
	<view :style="setStyle"></view>
</template>

<script>
	export default {
		name: 'ProgressPrimary',
		data() {
			return {
				percentage: 1, // 进度条初始值
				timer: null,
			}
		},
		computed: {
			setStyle() {
				const temp = {
					position: 'fixed',
					width: '10px',
					height: `${this.percentage}vh`,
					right: 0,
					bottom: 0,
					...this.$theme.linerGradient(180, this.$theme.PROGRESS_FROM, this.$theme.PROGRESS_TO),
				};
				return this.$theme.progress(temp);
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
						uni.$u.sleep(1500).then(() => {
							uni.switchTab({
								url: this.$paths.HOME,
							})
						})
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