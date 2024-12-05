<template>

	<view class="page_bg_sec" style="background-size: 100% 160px;">
		<view>
			<view class="title" style="margin-left: 0px;">
				<span>
					<!-- PORT -->
				</span>
			</view>
			<view class="middle" style="margin-top: 140rpx;justify-content: center;">
				<view class="middle-img">
					<view class="middle-box" style="left: 0px;">
						<view class="middle-list" v-if="inv==0"><img src="/static/img/1.a18018c0.png"></view>
						<view class="middle-list" v-if="inv==1"><img src="/static/img/2.2d13f31b.png"></view>
						<view class="middle-list" v-if="inv==2"><img src="/static/img/3.9698c7ef.png"></view>
						<view class="middle-list" v-if="inv==3"><img src="/static/img/5.969a5c11.png"></view>
						<view class="middle-list" v-if="inv==4"><img src="/static/img/6.eb24ab02.png"></view>
					</view>
				</view>
			</view>
			<view class="dot">
				<span class="dot-item" :class="inv==0?'dot-on':''" @click="bian(0)"></span>
				<span class="dot-item" :class="inv==1?'dot-on':''" @click="bian(1)"></span>
				<span class="dot-item" :class="inv==2?'dot-on':''" @click="bian(2)"></span>
				<span class="dot-item" :class="inv==3?'dot-on':''" @click="bian(3)"></span>
				<span class="dot-item" :class="inv==4?'dot-on':''" @click="bian(4)"></span>
			</view>

			<view class="btn_com" style="margin:auto; margin-top: 160rpx;width: 80%;"
				@click="$u.route({url:'/pages/account/login'});">ログイン
			</view>
			<view class="btn_com" style="margin:auto;width: 80%;margin-top: 60rpx;"
				@click="$u.route({url:'/pages/account/register'});">
				口座開設
			</view>
		</view>
		<!-- <view style="position: fixed;right:3vw;top:3vh;z-index: 11115;"> -->
			<!-- <Translate></Translate> -->
		<!-- </view> -->
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				inv: 0
			};
		},
		computed: {},

		onShow() {},
		onHide() {},
		methods: {
			bian(num) {
				this.inv = num
			},
		}
	}
</script>

<style type="text/css">
	@charset "UTF-8";

	/**
 * 这里是uni-app内置的常用样式变量
 *
 * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量
 * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App
 *
 */
	/**
 * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能
 *
 * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件
 */
	/* 颜色变量 */
	/* 行为相关颜色 */
	/* 文字基本颜色 */
	/* 背景颜色 */
	/* 边框颜色 */
	/* 尺寸变量 */
	/* 文字尺寸 */
	/* 图片尺寸 */
	/* Border Radius */
	/* 水平间距 */
	/* 垂直间距 */
	/* 透明度 */
	/* 文章场景相关 */
	/* uni.scss */
	.page {
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
		height: 100vh;
		padding: 0 12px
	}

	.title {
		width: 100%;
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
		justify-content: center;
		padding-top: 34px;
		margin-left: -400%;
		-webkit-transition-duration: 1s;
		-moz-transition-duration: 1s;
		-o-transition-duration: 1s
	}

	.title span {
		line-height: 36px;
		font-size: 23px;
		font-weight: 400;
		color: #000
	}

	.middle {
		width: 100%;
		height: 296px;
		margin-top: 13px;
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

	.middle .middle-left {
		width: 19px;
		height: 35px
	}

	.middle .middle-right {
		width: 19px;
		height: 35px
	}

	.middle .middle-img {
		width: 296px;
		height: 296px;
		overflow: hidden;
		position: relative
	}

	.middle .middle-box {
		width: 1482px;
		height: 296px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-transition-duration: .5s;
		-moz-transition-duration: .5s;
		-o-transition-duration: .5s;
		position: absolute;
		top: 0
	}

	.middle .middle-list {
		width: 296px;
		height: 296px
	}

	.middle .middle-list img {
		width: 100%;
		height: 100%;
		object-fit: contain
	}

	.dot {
		width: 100%;
		height: 19px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		margin-top: 31px
	}

	.dot .dot-item {
		width: 21px;
		height: 21px;
		background: #cdcdcd;
		border: 3px solid #fff;
		box-sizing: border-box;
		border-radius: 50%;
		margin: 0 7px;
		display: block
	}

	.dot .dot-on {
		width: 21px;
		height: 21px;
		background: #fff;
		border: 4px solid #f24739
	}

	.login {
		width: 100%;
		height: 39px;
		background: #e4013e;
		border-radius: 8px;
		margin-top: 55px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-size: 13px;
		font-weight: 500;
		color: #fff;
		margin-left: -400%;
		-webkit-transition-duration: 1s;
		-moz-transition-duration: 1s;
		-o-transition-duration: 1s
	}

	.register {
		width: 100%;
		height: 39px;
		border-radius: 8px;
		border: 1px solid #e4013e;
		box-sizing: border-box;
		font-size: 13px;
		font-weight: 500;
		color: #e4013e;
		margin-top: 6px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		margin-left: -400%;
		-webkit-transition-duration: 1s;
		-moz-transition-duration: 1s;
		-o-transition-duration: 1s
	}
</style>