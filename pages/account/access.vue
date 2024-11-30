<template>

	<view>
		<view class="page">
			<view class="title" style="margin-left: 0px;">
				<span>
					<!-- PORT -->
				</span>
			</view>
			<view class="middle">
				<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAACKCAYAAAAAJqyCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LjE2NDY0OCwgMjAyMS8wMS8xMi0xNTo1MjoyOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjIgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQwRDA2RTM4Q0YxQTExRUVCMDA2QkM4MDlEODEwQTIyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQwRDA2RTM5Q0YxQTExRUVCMDA2QkM4MDlEODEwQTIyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDBEMDZFMzZDRjFBMTFFRUIwMDZCQzgwOUQ4MTBBMjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDBEMDZFMzdDRjFBMTFFRUIwMDZCQzgwOUQ4MTBBMjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4lRo4yAAAKyUlEQVR42uydDXBU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"
					class="middle-left" @click="bian(-1)">
				<view class="middle-img">
					<view class="middle-box" style="left: 0px;">
						<view class="middle-list" v-if="inv==0"><img src="/static/img/1.a18018c0.png"></view>
						<view class="middle-list" v-if="inv==1"><img src="/static/img/2.2d13f31b.png"></view>
						<view class="middle-list" v-if="inv==2"><img src="/static/img/3.9698c7ef.png"></view>
						<view class="middle-list" v-if="inv==3"><img src="/static/img/5.969a5c11.png"></view>
						<view class="middle-list" v-if="inv==4"><img src="/static/img/6.eb24ab02.png"></view>
					</view>
				</view><img
					src="data:image/png;base64,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"
					class="middle-right" @click="bian(1)">
			</view>
			<view class="dot">
				<span class="dot-item" :class="inv==0?'dot-on':''"></span>
				<span class="dot-item" :class="inv==1?'dot-on':''"></span>
				<span class="dot-item" :class="inv==2?'dot-on':''"></span>
				<span class="dot-item" :class="inv==3?'dot-on':''"></span>
				<span class="dot-item" :class="inv==4?'dot-on':''"></span>
			</view>
			<view class="login" style="margin-left: 0px;" @click="$u.route({url:'/pages/account/login'});">ログイン</view>
			<view class="register" style="margin-left: 0px;" @click="$u.route({url:'/pages/account/register'});">口座開設
			</view>
		</view>
		<view style="position: fixed;right:3vw;top:3vh;z-index: 11115;">
			<!-- <Translate></Translate> -->
		</view>
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
				this.inv += num
				if (this.inv < 0) {
					this.inv = 4;
				} else if (this.inv > 4) {
					this.inv = 0;
				}
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
		border: 4px solid #e4013e
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