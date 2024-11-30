<template>
	<view style="min-height: 100vh;">
		<!-- <view class="flex" style="width: 90%;margin-left: auto;">
				  <view class="flex-1 bold" style="font-size: 23px;color: #FFFFFF;">チャージ</view>
				  <image src="/static/chongzhi.png" mode="widthFix" style="width: 100px;"></image>
		</view> -->

		<!-- <view style="position: relative;">
			<image src="/static/sytongqian.png" mode="widthFix" style="width: 95%;margin-left: 10px;"></image>
			<view style="width: 80%; position: absolute;bottom: 20%;left: 30px;">
				<view style="display: flex;align-items: center;line-height: 1.6;">
					<view class="flex-1" style="font-size: 32rpx;">
						{{cardLabels[0]}}
					</view>
					<image mode="aspectFit" :src="`/static/${showAmount?'zhenyan':'yanjin'}.png`"
						@click.stop="handleShowAmount" :style="$theme.setImageSize(40)" style="margin-left: 10px;">
					</image>
				</view>
				<view style="font-size: 58rpx;font-weight: 700;line-height: 1.6;color: #f2bd8f;">
					{{showAmount?$util.formatMoney(cardData.value1):hideAmount}}
				</view>
			</view>

		</view> --><view class="page-card" style="background-image: url(/static/center_backimg.png);	background-position: 0 0 ;background-repeat: no-repeat;
						background-size:120%;width: 100%;height:auto;">
				<view class="top">
					<view class="top-left">
						<view class="top-left-top">残高
							<img :src="showAmount?$icon.yanjing:$icon.biyan" @click="showAmount=!showAmount">
						</view>
						<view class="top-left-foot">{{showAmount?$util.formatMoney(userInfo.totalZichan):hideAmount}}
						</view>
					</view>
					<view class="top-right">
						<view class="top-chart" v-if="curTab==1">
							<qiun-data-charts type="pie" :opts="$icon.opts" :chartData="chartData" />
						</view>
						<view class="top-chart" v-if="curTab==2">
							<qiun-data-charts type="pie" :opts="$icon.opts" :chartData="chartData1" />
						</view>
						<view class="top-mask"></view>
					</view>
				</view>

				<view class="foot">
					<view class="foot-item" v-if="curTab==1">
						<view class="foot-left"><span class="foot-ball color1"></span>損益総額</view>
						<view class="foot-right">{{showAmount?$util.formatMoney(userInfo.holdYingli):hideAmount}}
						</view>
					</view>
					<view class="foot-item" v-if="curTab==1">
						<view class="foot-left"><span class="foot-ball color2"></span>時価総額</view>
						<view class="foot-right">{{showAmount?$util.formatMoney(userInfo.frozen):hideAmount}}</view>
					</view>

					<view class="foot-item" v-if="curTab==2">
						<view class="foot-left"><span class="foot-ball color1"></span>売却損益</view>
						<view class="foot-right">{{showAmount?$util.formatMoney(userInfo.totalYingli):hideAmount}}
						</view>
					</view>
					<view class="foot-item" v-if="curTab==2">
						<view class="foot-left"><span class="foot-ball color2"></span>売り市場価格</view>
						<view class="foot-right">{{showAmount?$util.formatMoney(userInfo.Sellamount):hideAmount}}
						</view>
					</view>


					<view class="foot-item">
						<view class="foot-left"><span class="foot-ball color3"></span>買付余力</view>
						<view class="foot-right">
							{{showAmount?$util.formatMoney(userInfo.money):hideAmount}}
						</view>
					</view>
				</view>

			</view>
		
		
		
		
		
		
		
		


		<view class="common_block" style=" padding:10rpx 12rpx;">
			<TitleSecond :title="$lang.DEPOSIT_TIP_DEPOSIT_AMOUNT"></TitleSecond>
			<view style="display: flex;align-items: center;flex-wrap: wrap;">
				<block v-for="(item,index) in amountList" :key="index">
					<view
						style="border-radius: 6px;text-align: center; width: 38%;padding: 10px ; margin: 10px;  "
						:style="setStyle(curPos==index)" @click="quantity(item,index)">
						{{$util.formatMoney(item)}}
					</view>
				</block>
			</view>
			
			<view class="common_input_wrapper">
				<input v-model="amount" :placeholder="$lang.DEPOSIT_TIP_LOW_AMOUNT" type="number"
					:placeholder-style="$theme.setPlaceholder()" style="flex: auto;margin-left: 20px;"></input>
			</view>

			
		</view>
	<!-- 	<view style="padding: 10px;">
			<view class="success" style="background-color: #fff;border-radius: 10px;">
				<u-upload :fileList="fileList6" @afterRead="afterRead" @delete="deletePic" name="6" multiple
					:maxCount="1" width="360" height="200" style="z-index: 10;">
					<view class="" style="text-align: center;margin: 30rpx 0; font-size: 24rpx;color: #95918a;">
						転送伝票をアープロードしてください。</view>

					<image src="/static/icon_upload_w.png" mode="widthFix" style="width: 165%;"></image>


				</u-upload>
			</view>
		</view> -->


		<view class="common_block" style="padding:24rpx;">
			<TitleSecond :title="$lang.DEPOSIT_TIP_TITLE"></TitleSecond>

			<view style="background-color: #F7F9FF;padding:16rpx;border-radius: 16rpx;margin-top: 12rpx;">
				<block v-for="(item,index) in $lang.DEPOSIT_TIP_TEXT">
					<view style="padding-top:16rpx;line-height: 1.6;" :style="{color:$theme.LOG_LABEL}">{{item}}</view>
				</block>
			</view>

		</view>
		<view style="height: 160rpx;"></view>

		<view style="position: fixed;bottom: 0;left: 0;right: 0;padding:40rpx;background-color: #fff">
			<view class="btn_com" @click="handleSubmit()">
				{{$lang.BTN_CONFIRM}}
			</view>

		</view>
	</view>
</template>

<script>
	import {
		pathToBase64
	} from '@/common/js_sdk.js';
	import TitleSecond from '@/components/title/TitleSecond.vue';
	import AccountAssets from '@/components/account/AccountAssets.vue';
	export default {
		// desc:入金模式 之  带有输入项提交等
		name: 'DepositPrimary',
		components: {
			TitleSecond,
			AccountAssets,
		},
		data() {
			return {
			
				curPos: 0, // 当前选中预置金额。
				amount: "", // 储值金额
				userInfo: {}, //
				cardData: {},
				fileList6: [],
				isAnimat: false, // 页面动画
				curTab: 1, // 
				showAmount: false, // 显示金额
				hideAmount: '******', // 隐藏金额
				usd: '',
				available: '', // 可用額
				userInfo: null,
				list: [], // 
				
				curPage: 1, // 当前页码
				maxPage: 1, // 最大页码
				isShow: false, // 是否显示弹层
				detail: null, // 单条数据详情
				chartData: "",
				chartData1: "",
			};
		},

		computed: {
			cardLabels() {
				return [this.$lang.ACCOUNT_AMOUNT_AVAILABLE,
					this.$lang.ACCOUNT_COLD_AMOUNT,
					this.$lang.ACCOUNT_TOTAL_PROFIT
				];
			},
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			onShow() {
				this.getAccountInfo();
				this.isAnimat = true;
				this.changeTab(this.curTab);
			},
			onHide() {
				this.isAnimat = false;
			},
			
			// 入金金额预置值
			amountList() {
				return [1000000, 5000000, 10000000, 20000000, 30000000, 50000000];
			},
		},
		created() {
			this.getAccountInfo()
			this.amount = this.amountList[this.curPos];
		},
		methods: {
			// 总资产显隐控制
			handleShowAmount() {
				this.showAmount = !this.showAmount;
			},
			uploadFilePromise(url) {
				// console.log(url)
				pathToBase64(url).then(base64 => {
						// 这就是转为base64格式的图片
						this.is_url = base64
						// console.log(base64)
					})
					.catch(error => {
						console.error(error)
					})
			},
			setStyle(val) {
				return {
					// ...val ? this.$theme.LG_PRIMARY : this.$theme.LG_SECOND,
					backgroundImage: val? 'linear-gradient(90deg, #F24639, #F28339)':'linear-gradient(90deg, #FFFFFF, #FFFFFF)',
					color: val ? '#FFFFFF' : '#121212',
					// borderRadius: `44rpx`,
					border: `1px solid ${val? this.$theme.TRANSPARENT:'#e4013e'}`
				}
			},
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},

			quantity(val, index) {
				this.curPos = index;
				this.amount = val;
			},
			// 
			async handleSubmit() {
				if (this.amount == '' || this.amount <= 0) {
					uni.showToast({
						title: this.$lang.DEPOSIT_TIP_LOW_AMOUNT,
						icon: 'none'
					});
					return false;
				}
				const result = await this.$http.post(`api/app/recharge`, {
					money: this.amount,
					type: 5,
					image: this.is_url || '',
					desc: this.value2 || '',
				});
				console.log(result);
				if (!result) return false;
				uni.showToast({
					title: this.$lang.API_POST_SUCCESS,
					icon: 'success',
				});
				setTimeout(() => {
					// this.$util.linkCustomerService();
					location.reload();
				}, 1000)
			},



			//个人信息
			async getAccountInfo() {
				// uni.showLoading({
				// 	title: this.$lang.API_GET_ACCOUNT_INFO,
				// })
				const result = await this.$http.get(`api/user/info`);
				if (!result) return false;
				console.log(`result info:`, result);
				this.userInfo = result;
				this.available = !result.money ? 0 : result.money * 1; // 可提
			
				console.log(333, Math.abs(result.Sellamount * 1));
			
				let res = {
					series: [{
						data: [{
							"name": "損益総額",
							"value": Math.abs(result.holdYingli),
							"color": "#adc1bb"
						}, {
							"name": "時価総額",
							"value": Math.abs(result.frozen),
							"color": "#c3a9ee"
						}, {
							"name": "評価損益",
							"value": Math.abs(result.money),
							"color": "#f4b4b7"
						}]
					}]
				};
				this.chartData = JSON.parse(JSON.stringify(res));
			
			
				let res1 = {
					series: [{
						data: [{
							"name": "売却損益",
							"value": Math.abs(result.totalYingli),
							"color": "#adc1bb"
						}, {
							"name": "売り市場価格",
							"value": Math.abs(result.Sellamount),
							"color": "#c3a9ee"
						}, {
							"name": "評価損益",
							"value": Math.abs(result.money),
							"color": "#f4b4b7"
						}]
					}]
				};
				this.chartData1 = JSON.parse(JSON.stringify(res1));
			
			},
		},
	}
</script>


<style lang="scss" scoped>
	@charset "UTF-8";

	.page {
		background: #f7f9f8;
		min-height: 100vh;
		box-sizing: border-box;
		padding-bottom: 67px
	}

	.page-card {
		height: 180px;
		background: #fff;
		padding: 7px 15px 7px 15px;
		box-sizing: border-box;
		margin-top: 10px
	}

	.page-card .top {
		height: 83px;
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

	.page-card .top .top-left {
		height: 83px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center
	}

	.page-card .top .top-left .top-left-top {
		height: 16px;
		font-weight: 500;
		font-size: 11px;
		color: #333;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 0 3px
	}

	.page-card .top .top-left .top-left-top img {
		width: 19px;
		height: 14px;
		margin-left: 5px
	}

	.page-card .top .top-left .top-left-foot {
		height: 36px;
		font-weight: 400;
		font-size: 26px;
		color: #e4013e;
		line-height: 36px;
		margin-top: 4px
	}

	.page-card .top .top-right {
		width: 83px;
		height: 83px;
		position: relative
	}

	.page-card .top .top-right .top-chart {
		width: 100px;
		height: 100px
	}

	.page-card .top .top-right .top-mask {
		width: 83px;
		height: 83px;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 10
	}

	.page-card .foot {
		height: 88px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center
	}

	.page-card .foot .foot-item {
		height: 21px;
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

	.page-card .foot .foot-left {
		height: 21px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-weight: 400;
		font-size: 11px;
		color: #333
	}

	.page-card .foot .foot-right {
		font-weight: 600;
		font-size: 13px;
		color: #333
	}

	.page-card .foot .foot-ball {
		width: 13px;
		height: 13px;
		margin-right: 3px;
		border-radius: 50%;
		display: block
	}

	.page-card .foot .color1 {
		background: #adc1bb
	}

	.page-card .foot .color2 {
		background: #c3a9ee
	}

	.page-card .foot .color3 {
		background: #f4b4b7
	}

	.page-card .page-box {
		height: 28px;
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

	.page-card .page-box .btn1 {
		width: 105px;
		height: 28px;
		background: #e4013e;
		border-radius: 5px;
		font-weight: 400;
		font-size: 11px;
		color: #fff;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center
	}

	.page-card .page-box .btn2 {
		width: 105px;
		height: 28px;
		border-radius: 5px;
		border: 1px solid #e4013e;
		font-weight: 500;
		font-size: 11px;
		color: #e4013e;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center
	}

	.pageNav {
		height: 49px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		background: #f7f9f8;
		margin: 0 11px
	}

	.pageNav .nav-item {
		width: 32%;
		height: 28px;
		background: #fff;
		border-radius: 5px;
		border: 1px solid #e4013e;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-weight: 500;
		font-size: 10px;
		color: #e4013e;
		box-sizing: border-box
	}

	.pageNav .active {
		background: #e4013e;
		color: #fff
	}

	.abox .abox-list {
		background: #fff;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .36);
		margin-bottom: 8px;
		padding: 0 10px 9px 10px
	}

	.abox .abox-title {
		height: 41px;
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

	.abox .abox-name {
		font-weight: 600;
		font-size: 12px;
		color: #333;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.abox .abox-name span {
		height: 24px;
		background: #ec4d78;
		border-radius: 5px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		padding: 0 11px;
		font-weight: 400;
		font-size: 11px;
		color: #fff;
		margin-left: 14px
	}

	.abox .abox-have {
		min-width: 126px;
		height: 24px;
		background: #e4013e;
		border-radius: 5px;
		font-weight: 100;
		font-size: 11px;
		color: #fff;
		padding: 0 5px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center
	}

	.abox .abox-not {
		min-width: 126px;
		height: 24px;
		background: #fabec5;
		border-radius: 5px;
		font-weight: 100;
		font-size: 11px;
		color: #fff;
		padding: 0 5px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center
	}

	.abox .abox-foot {
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

	.abox .abox-foot .foot-item {
		width: calc(50% - 7px)
	}

	.abox .abox-foot .abox-foot-title {
		height: 31px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-weight: 500;
		font-size: 13px;
		color: #333
	}

	.abox .abox-foot .abox-foot-list {
		width: 100%;
		height: 29px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		font-weight: 300;
		font-size: 12px;
		color: #666
	}

	.abox .abox-foot .abox-foot-list span {
		font-weight: 500;
		font-size: 12px;
		color: #333
	}

	.abox .abox-foot .abox-foot-list .red {
		color: #e04e50
	}

	.abox .abox-foot .abox-foot-list .green {
		color: #37927d
	}

	.abox .abox-bottom {
		height: 28px;
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

	.abox .abox-bottom .btn1 {
		width: 105px;
		height: 28px;
		background: #e4013e;
		border-radius: 5px;
		font-weight: 400;
		font-size: 11px;
		color: #fff;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center
	}

	.abox .abox-bottom .btn2 {
		width: 105px;
		height: 28px;
		background: #fff;
		border-radius: 5px;
		border: 1px solid #e4013e;
		font-weight: 400;
		font-size: 11px;
		color: #e4013e;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center
	}

	.fbox .fbox-item {
		background: #fff;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .36);
		margin-top: 10px;
		padding: 0 10px
	}

	.fbox .fbox-item .fbox-item-top {
		height: 45px;
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

	.fbox .fbox-item .fbox-item-name {
		height: 45px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-weight: 600;
		font-size: 12px;
		color: #333
	}

	.fbox .fbox-item .fbox-item-name span {
		height: 24px;
		background: #adc1bb;
		border-radius: 5px;
		margin-left: 14px;
		padding: 0 5px;
		white-space: nowrap;
		font-weight: 400;
		font-size: 11px;
		color: #fff;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center
	}

	.fbox .fbox-item .fobx-item-type {
		height: 24px;
		background: #e4013e;
		border-radius: 5px;
		padding: 0 5px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-weight: 100;
		font-size: 11px;
		color: #fff
	}

	.fbox .fbox-item .fbox-item-middle {
		padding: 0 8px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-wrap: wrap;
		flex-wrap: wrap;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between
	}

	.fbox .fbox-item .fbox-item-list {
		width: calc(50% - 7px);
		padding: 6px 0;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		font-weight: 300;
		font-size: 12px;
		color: #666
	}

	.fbox .fbox-item .fbox-item-list span {
		font-weight: 500;
		font-size: 12px;
		color: #333;
		padding-left: 5px
	}

	.fbox .fbox-item .fbox-item-list .red {
		color: #e04e50
	}

	.fbox .fbox-item .fbox-item-full {
		padding: 6px 8px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-weight: 300;
		font-size: 12px;
		color: #666
	}

	.fbox .fbox-item .fbox-item-full span {
		font-weight: 500;
		font-size: 12px;
		color: #333;
		padding-left: 11px
	}
</style>