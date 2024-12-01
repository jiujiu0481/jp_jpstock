<script>
	export default {
		onLaunch: async function() {
			console.log('App Launch');

			// 启动监听网络状态变化
			uni.onNetworkStatusChange(res => {
				console.log('res:', res.isConnected);
				console.log('res:', res.networkType);
				if (!res.isConnected || res.networkType === 'none') {
					uni.showToast({
						title: this.$lang.TIP_NETWORK_TYPE_NONE,
						icon: 'none'
					})
				}
			});
		},
		onShow: function() {
			console.log('App Show')
			console.log(this.$u.config.v);
		},
		onHide: function() {
			console.log('App Hide');
			// 停止监听网络状态
			uni.offNetworkStatusChange(res => {
				console.log('res:', res);
			});
		}
	}
</script>

<style lang="scss">
	@import "@/node_modules/uview-ui/index.scss";
	@import url("common/css/rc.css");
	@import url("common/style.css");
	
	uni-tabbar{ bottom: 0rpx !important; }
	
	
	* {
	    margin: 0;
	    -webkit-tap-highlight-color: transparent;
		font-family: Helvetica Neue, Helvetica, sans-serif;
	}

	page{
		background-color: #fff;
		width: 100%;
		height: 120vh;
	}
	
	
	
	// @media screen and (max-device-width:375px) {
	// 	page {
	// 		width: 100vw;
	// 	}
	// }

	// @media screen and (min-device-width:375px) and (max-device-width:750px) {
	// 	page {
	// 		width: 100vw;
	// 		margin: 0 auto;
	// 	}
	// }

	// @media screen and (min-device-width:751px) {
	// 	page {
	// 		width: 750px;
	// 		margin: 0 auto;
	// 	}
	// }
	
	.block {
		padding-top: 45px
	}
	
	.head {
		height: 45px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		padding: 0 21px;
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		box-sizing: border-box;
		z-index: 10;
		// background: #fff;
		border-bottom: 1px solid #ebebeb
	}
	
	.head .back {
		width: 20px;
		height: 15px;
		display: block
	}
	
	.head .title {
		font-size: 13px;
		font-weight: 600;
		color: #111;
		letter-spacing: 0.5px;
		-webkit-transition-duration: 1s;
		-moz-transition-duration: 1s;
		-o-transition-duration: 1s;
		margin-left: -208px
	}
	
	.short {
		width: 100%;
		height: 1px;
		// background: #ebebeb
	}
	// .header_bg {
	// 	background-image: url(/static/bg_1.png);
	// 	background-position: center center;
	// 	background-repeat: no-repeat;
	// 	background-size: 100% 100%;
	// 	width: 100%;
	// 	height: 160rpx;
	// }
	
	
	/* uni.scss */
	.block {
		padding-top: 54px
	}
	
	.head {
		width: 100%;
		height: 54px;
		// background: #fff;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 0 8px;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 10
	}
	
	.head .head-ring {
		width: 20px;
		height: 20px;
		margin-right: 15px
	}
	
	.head .head-setting {
		width: 21px;
		height: 21px;
		margin-left: 6px
	}
	
	.head .head-search {
		width: calc(100% - 80px);
		height: 28px;
		border-radius: 5px;
		border: 1px solid #e4013e;
		padding: 0 11px;
		box-sizing: border-box;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		justify-content: flex-end
	}
	
	.head .head-search img {
		width: 19px;
		height: 19px
	}
	.uni-tabbar {

		
		.uni-tabbar__item {

			

			.uni-tabbar__icon {
				// tabBar 图标样式
				width: 19px !important;
				height: 17px !important;
				margin-bottom: 5px;
			}

		
		}
	}

	

	//깊은북쪽상하이
	.area {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	//깊은
	.deep {
		width: 30rpx;
		height: 30rpx;
		background: #f85252;
		border-radius: 0.4rpx;
		text-align: center;
		line-height: 30rpx;
		color: #fff;
		font-size: 24rpx;
		display: inline-block;
	}

	.deep-number {
		display: inline-block;
		padding: 0 0.04rem;
		background: rgba(59, 79, 222, .1);
		border-radius: 10rpx;
		color: #f85252;
		font-size: 24rpx;
		vertical-align: middle;
	}

	//북쪽
	.north {
		width: 30rpx;
		height: 30rpx;
		background: #ea6248;
		border-radius: 0.4rpx;
		text-align: center;
		line-height: 30rpx;
		color: #fff;
		font-size: 24rpx;
		display: inline-block;
	}

	.north-number {
		display: inline-block;
		padding: 0 0.04rem;
		border-radius: 10rpx;
		font-size: 24rpx;
		vertical-align: middle;
		color: #ea6248;
		background: rgba(234, 98, 72, .1);
	}

	//상하이
	.shanghai {
		width: 30rpx;
		height: 30rpx;
		background: #aa3bde;
		border-radius: 0.4rpx;
		text-align: center;
		line-height: 30rpx;
		color: #fff;
		font-size: 24rpx;
		display: inline-block;
	}

	.shanghai-number {
		display: inline-block;
		padding: 0 0.04rem;
		border-radius: 10rpx;
		font-size: 24rpx;
		vertical-align: middle;
		color: #aa3bde;
		background: rgba(170, 59, 222, .1);
	}

	// //公共css 结束


	// 	/deep/.uni-tabbar {
	// 		width: 800rpx !important;
	// 		margin: auto;
	// 	}
	// }

	//版本更新
	.download .upgrade {
		position: relative;
		background: #fff;
		width: 468rpx;
		min-height: 238rpx;
		border-radius: 20rpx;
	}

	.download .logo image {
		width: 208rpx;
		height: 208rpx;
		position: absolute;
		top: -80rpx;
		left: 0;
		right: 0;
		margin: 0 auto;
	}

	.download .content {
		padding-top: 80rpx;
	}

	.download .content .title {
		text-align: center;
		font-size: 30rpx;
		font-weight: bold;
	}

	.download .content .container {
		color: #666;
	}

	.download .content .container .descriptions {
		padding: 0rpx 30rpx;
		text-align: center;
		font-size: 28rpx;
	}

	.download .content .container .details,
	.download .content .prpgroess {
		padding: 16rpx 46rpx;
		box-sizing: border-box;
		font-size: 24rpx;
	}

	.download .content .prpgroess {
		padding: 16rpx 22rpx;
		margin: 20rpx 0;
	}

	.download .content .btn-group {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20rpx;
	}

	.download .content .btn-group view {
		width: 200rpx;
		height: 68rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 14rpx;
		font-size: 24rpx;
		border-radius: 16rpx;
		line-height: 1.5;
	}

	.download .content .btn-group .confirm {
		background: #ef5656;
		color: #fff;
	}
</style>