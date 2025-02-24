<template>
	<view :class="isAnimat?'fade_in':'fade_out' " style="background-image: url(/static/com_head.png);
	background-position: 0 0;
	background-size: 100% 70px ;
	background-repeat: no-repeat; background-color:#ededed ;" v-if="isUpdate">
		<header style="display: flex;align-items: center;padding: 24px 28rpx;">
			<view style="margin-right: auto;">
				<image src="/static/arrow_left.png" @click="$util.goBack()" mode="aspectFit"
					style="width: 16px;height: 16px;"></image>
			</view>
			<view style=" flex:60%">
				<view style="height: 56rpx;line-height: 56rpx;text-align: center;color:#FCFCFC;font-size: 28rpx;">
					大口取引
				</view>
			</view>

		</header>
		<template v-if="info">
			<view class="common_header"
				style="margin-top: -10px;display: flex;align-items: center;justify-content: space-between;">
				<view class="center" style="padding-left: 0;">
					<text :style="{color:$theme.SECOND}">{{info.name}}</text>
					<image src="/static/coin_choose.png" mode="aspectFit" style="padding-left: 20rpx;"
						:style="$theme.setImageSize(24)" @tap="chooseCoin()"></image>
				</view>
				<view class="right">
					<view style="display: flex;align-items: right;">
						<text style="font-size: 16px;"
							:style="$theme.setCoinRiseFallB(info.rate>0)">{{$util.formatCoin(info.current_price)}}</text>
						<text style="font-size: 16px;padding-left: 20px"
							:style="$theme.setCoinRiseFallB(info.rate>0)">{{info.rate}}%</text>
					</view>
				</view>
				<!-- <view class="right">
					<view @click="linkCoinInfo()">
						<image src="/static/cantract_detail.png" mode="aspectFit" style="padding-right: 30rpx;"
							:style="$theme.setImageSize(32)">
						</image>
					</view>
				</view>
				<view class="right">
					<view @click="handleUnFollow(info.gid)">
						<image :src="`/static/${info && info.is_collected==1?'stock_follow':'stock_unfollow'}.png`"
							:style="$theme.setImageSize(32)"></image>
					</view>
				</view> -->
			</view>
		</template>

		<view
			style="border-radius: 24rpx;margin: 20rpx;padding:20rpx;display: flex;align-items: center;padding-top: 0;">
			<view style="width:60%;">
				<u-radio-group v-model=" radiovalue1" placement="row" @change="groupChange">
					<u-radio :customStyle="{marginRight: '24rpx'}" v-for="(item, index) in radioList" :key="index"
						:label="item.name" :name="item.name" @change="radioChange"
						:activeColor="curTab==0?$theme.RISE:$theme.FALL" labelSize="28rpx"
						:labelColor="item.name==radiovalue1?$theme.RISE:'#CFCFCF' ">
					</u-radio>
				</u-radio-group>
				<view style="display: flex;align-items: center; padding: 20rpx 20rpx 20rpx 0;">
					<view style="padding-right: 12rpx;font-size: 12px;" :style="{color:$theme.LOG_LABEL}"> レバー
					</view>
					<block v-for="(v,k) in leverList" :key="k">
						<view style="text-align: center;padding-right: 24rpx;font-size: 24rpx;"
							:style="{color:v==curLever?'#6D41FF':'#303133'}" @click="changeLever(v)">{{v}}X</view>
					</block>
					<!-- <view style="width: 60%;">
						<view @tap="handleChooseLever()"
							style="background-color:#F5F6FB;border-radius: 8rpx;height: 40rpx;line-height: 40rpx;display: flex;align-items: center;justify-content: space-around;padding:6rpx 0;">
							<view>{{curLever+` X`}}</view>
							<image src="/static/arrow_down_Solid.png" mode="aspectFit" :style="$theme.setImageSize(16)">
							</image>
						</view>
					</view> -->
				</view>

				<!-- 限价模式，输入金额 -->
				<template v-if="isShowAmountInput">
					<view class="common_input_wrapper"
						style="background-color:#F5F6FB;border-radius: 8rpx;height: 32rpx;padding-left: 20rpx;margin:0 20rpx 20rpx 0;">
						<input v-model="amount" type="digit" :placeholder="'金額を入力してください'"
							:placeholder-style="$theme.setPlaceholder()"></input>
					</view>
				</template>
				<template v-else>
					<template v-if="info">
						<view class="common_input_wrapper"
							style="background-color:#F5F6FB;border-radius: 8rpx;height: 32rpx;padding-left: 20rpx;margin:0 20rpx 20rpx 0;"
							:style="{color:$theme.LOG_LABEL}">
							{{$util.formatCurrency(info.current_price)}}
						</view>
					</template>
				</template>

				<view class="common_input_wrapper"
					style="background-color:#F5F6FB;border-radius: 8rpx;height: 32rpx;padding-left: 20rpx;margin:20rpx 20rpx 20rpx 0;">
					<input v-model="quantity" type="digit" :placeholder="'数量を入力してください'"
						:placeholder-style="$theme.setPlaceholder()" style="width: 80%;"></input>
					<view style="margin-left: auto;padding-right: 12rpx;" :style="{color:$theme.LOG_LABEL}">Lot</view>
				</view>
				<!-- <view style="font-size: 24rpx;" :style="{color:$theme.LOG_LABEL}">
					{{$lang.CONTRACT_PROFIT_LOSS_SET}}
				</view>
				<view style="display: flex;align-items: center;">
					<view style="width: 50%;">
						<view class="common_input_wrapper"
							style="background-color:#F5F6FB;border-radius: 8rpx;height: 32rpx;padding-left: 20rpx;margin:20rpx 20rpx 20rpx 0;">
							<input v-model="profitAmount" type="digit" :placeholder="$lang.CONTRACT_PROFIT"
								:placeholder-style="$theme.setPlaceholder()"></input>
						</view>
					</view>
					<view style="width: 50%;">
						<view class="common_input_wrapper"
							style="background-color:#F5F6FB;border-radius: 8rpx;height: 32rpx;padding-left: 20rpx;margin:20rpx 20rpx 20rpx 0;">
							<input v-model="lossAmount" type="digit" :placeholder="$lang.CONTRACT_LOSS"
								:placeholder-style="$theme.setPlaceholder()"></input>
						</view>
					</view>
				</view> -->
				<view style="margin-right: 20rpx;background-color: #F5F6FB;">
					<view style="border-radius: 12rpx;display: flex;align-items: center;">
						<view style="flex:1;">
							<u-slider v-model="sliderVal" min="0" max="100" :showValue="true" @change="changeSlider"
								:activeColor="$theme.PRIMARY" :blockColor="$theme.PRIMARY"></u-slider>
						</view>
						<view style="padding-right: 8rpx;">%</view>
						<view style="padding-right: 8rpx;color:#6D41FF;" @click="sliderValMax()">Max</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;padding:0 12rpx;">
						<block v-for="(v,k) in percentOpt" :key="k">
							<view style="text-align: center;" :style="{color:v==curPercent?'#6D41FF':'#303133'}"
								@click="changePercent(v)">{{v}}%</view>
						</block>
					</view>
				</view>
				<template v-if="userInfo">
					<view style="text-align: right;font-size: 24rpx;padding-right: 20rpx;line-height: 1.8;"
						:style="{color:$theme.LOG_LABEL}">
						残高{{`: ${$util.formatCurrency($util.formatNumber(userInfo.usd,4))} USDT`}}
					</view>
				</template>

				<view style="text-align: right;font-size: 24rpx;padding-right: 20rpx;line-height: 1.6;"
					:style="{color:$theme.LOG_LABEL}">
					<!-- {{$lang.COIN_BUY_MAX_QTY}} {{`: ${$util.formatNumber(curMaxQTY,4)} ${info.number_code}`}} -->
					最大数量{{`: ${$util.formatCurrency($util.formatNumber(curMaxQTY,4))} Lot`}}
				</view>

				<view
					style="display: flex;align-items: center;justify-content: space-between;margin:4rpx 20rpx;line-height:1.6;">
					<view style="font-size: 24rpx;" :style="{color:$theme.LOG_LABEL}">
						合計
					</view>
					<view style="font-size: 24rpx;" :style="{color:$theme.LOG_VALUE}">
						{{$util.formatCurrency(totalAmount)+` USDT`}}
					</view>
				</view>
				<!-- <view style="font-size: 24rpx;" :style="{color:$theme.LOG_LABEL}">1Lot =1,000USDT</view> -->

				<view style="display: flex;align-items: center;justify-content: space-between;padding-right: 20rpx;">
					<view :style="setStyle(true)" @tap="handleSubmit(0)">
						買い
					</view>
					<view :style="setStyle(false)" @tap="handleSubmit(1)">
						売り
					</view>
				</view>

			</view>
			<view style="width:40%;">
				<view>
					<template v-if="asks && asks.length>0">
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<view style="font-size: 24rpx;" :style="{color:$theme.LOG_LABEL}">
								価格
							</view>
							<view style="font-size: 24rpx;" :style="{color:$theme.LOG_LABEL}">
								数量
							</view>
						</view>
						<BidList :list="bids" :max="bidsMax" dir="right"></BidList>
						<template v-if="info">
							<view style="display: flex;align-items: center;">
								<text style="font-size: 38rpx;"
									:style="$theme.setCoinRiseFallB(info.rate>0)">{{$util.formatCurrency($util.formatNumber(info.current_price))}}</text>
								<text style="font-size: 26rpx;padding:0 10rpx;"
									:style="$theme.setCoinRiseFallB(info.rate>0)">{{info.rate}}%</text>
								<image src="/static/contract_desc.png" mode="aspectFit" style="padding-left: 20rpx;"
									:style="$theme.setImageSize(24)" @tap="showDesc()"></image>
							</view>
						</template>
						<AskList :list="asks" :max="asksMax"></AskList>

					</template>
				</view>
			</view>
		</view>

		<!-- 當前委托 持有倉位 历史记录 -->
		<ContractTabs :tabs="setTabs" @action="changeTab" :active="curTab1"></ContractTabs>

		<!-- 		<template v-if="curTab1==0">
			<CurrentRecord :code="code" ref="current"></CurrentRecord>
		</template>
		<template v-else-if="curTab1==1">
			<HoldRecord :list="holdList" @action="handleHoldList"></HoldRecord>
		</template> -->
		<template v-if="curTab1==0">
			<HoldRecord :list="holdList" @action="handleHoldList"></HoldRecord>
		</template>
		<template v-else>
			<HistoryRecord :list="historyList" ref="history" @action="toggleCoin"></HistoryRecord>
		</template>

		<!-- 顯示合約説明 -->
		<template v-if="isShowDesc">
			<ContractDesc @action="handleClose"></ContractDesc>
		</template>

		<!-- 杠桿選擇器 -->
		<!-- <u-picker :show="isShowLever" :columns="[leverList]" @change="changeLever" @cancel="isShowLever=false"
			@confirm="confirmLever" :cancelText="$lang.COMMON_CANCEL" :confirmText=" '確認' " 
			:cancelColor="$theme.MODAL_CANCEL" :confirmColor="$theme.PRIMARY"></u-picker> -->

		<!-- Coin  選擇器 -->
		<!-- <u-picker :show="isShowCoinList" :columns="[coinList]" @change="changeCoin" @cancel="isShowCoinList=false"
			@confirm="confirmCoin" :cancelText="$lang.COMMON_CANCEL" :confirmText="$lang.COMMON_CONFIRM"
			:cancelColor="$theme.MODAL_CANCEL" :confirmColor="$theme.PRIMARY" keyName="label"
			visibleItemCount="9"></u-picker> -->

		<!-- 侧入 Coin 选择器 -->
		<u-popup :show="isShowCoinList" mode="left" @close="handleCloseCoin" @open="chooseCoin" :closeable="true">
			<view style="padding:80rpx 40rpx;">
				<view class="common_input_wrapper"
					style="background-color:#F5F6FB;border-radius: 16rpx;height: 32rpx;padding-left: 20rpx;">
					<input v-model="keyword" type="text" :placeholder="'数量を入力してください'"
						:placeholder-style="$theme.setPlaceholder()"></input>
				</view>
				<view style="padding-top: 20rpx;height: 560px;overflow-y: auto;padding-bottom: 100rpx;">
					<block v-for="(item,index) in setCoinList" :key="index">
						<view @click="confirmCoin(item)"
							style="display: flex;align-items: center;justify-content: space-between;line-height: 2.4;border-bottom: 1px Solid #ECECEC;">
							<view style="font-size: 28rpx;font-weight: 700;">{{item.name}}</view>
							<view style="margin-left: auto;" :style="$theme.setCoinRiseFallB(item.rate>0)">
								{{$util.formatCurrency(item.current_price)}}
							</view>
						</view>
					</block>
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import HeaderSecond from '@/components/header/HeaderSecond.vue';
	import TitleSecond from '@/components/title/TitleSecond.vue';
	import ContractTabs from './components/ContractTabs.vue';
	// import CurrentRecord from './components/CurrentRecord.vue';
	import HistoryRecord from './components/HistoryRecord.vue';
	import AskList from './components/AskList.vue';
	import BidList from './components/BidList.vue';
	import HoldRecord from './components/HoldRecord.vue';
	import ContractDesc from './components/ContractDesc.vue';
	export default {
		components: {
			HeaderSecond,
			TitleSecond,
			ContractTabs,
			// CurrentRecord,
			HistoryRecord,
			HoldRecord,
			AskList,
			BidList,
			ContractDesc,
		},
		data() {
			return {
				isAnimat: false, // 页面动画
				code: '', // url ?code=
				curTab: 0, // 当前显示的tab buy or sell
				curTab1: 0, // 列表区域
				isShowDesc: false, // 是否顯示合約説明
				isShowCoinList: false, // 是否顯示 coin選擇器
				coinList: null, // coin 選項組
				leverList: null, // 杠桿選項組				
				asks: [],
				bids: [],
				asksMax: 0, // asks 當前最大數量
				bidsMax: 0, // bids 當前最大數量
				socket: null,
				isConnected: false, // 是否链接socket
				isShowLever: false, // 是否顯示杠桿選擇器
				curLever: 1, // 当前选中杠杆值
				quantity: '', // 数量输入框 
				sliderVal: 0, // 滑块滑动值
				show: false,
				info: null,
				userInfo: {},
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				radiovalue1: '市場',
				amount: '', // 限价模式 输入金额
				holdList: [], // 持有列表
				isShowCurCoin: true, // 是否仅显示当前coin				
				historyList: [], // 历史记录数据
				keyword: '', // 弹层选项组关键字
				// danjia: 1000,
				isUpdate: true, // 强刷
				curPercent: -1,
			};
		},
		computed: {
			// 侧入列表过滤 keyword
			setCoinList() {
				if (this.coinList) {
					console.log(Object.values(this.coinList), 888888);
					console.log("keyword===" + this.keyword)
					if (this.keyword == '') return Object.values(this.coinList);

					return Object.values(this.coinList).filter(item => item.name.includes(this.keyword) || item.name
						.toLowerCase().includes(this.keyword));
				}
			},


			percentOpt() {
				return [25, 50, 75, 100]
			},

			setTabs() {
				return [
					// this.$lang.CONTRACT_RECORD_CURRENT,
					// this.$lang.CONTRACT_RECORD_HOLD, 
					// this.$lang.CONTRACT_RECORD_HISTORY 
					'保有',
					'履歴'
				]
			},
			// 单选项的选项组
			radioList() {
				return [{
					name: '市場',
					disabled: false
				}, {
					name: '指値',
					disabled: false
				}];
			},
			// 当前交易模式
			isShowAmountInput() {
				return this.radiovalue1 == this.radioList[1].name;
			},
			// 當前最大可買或可買數量
			curMaxQTY() {
				// 市價模式： 餘額/單價。 限價模式：餘額/輸入值
				if (this.info && this.userInfo) {
					// 市價或限價模式下的單價
					const temp = this.isShowAmountInput ? this.amount : this.info.current_price;
					// console.log(`curMaxQty:`, temp);
					// return temp * 1 > 0 ? this.$util.formatNumber(this.userInfo.money * this.curLever / temp, 4) : '';
					// let shou_price = this.danjia / this.curLever;

					return temp * 1 > 0 ? this.$util.formatNumber(this.userInfo.usd / (temp / this.curLever), 4) : '';
				}
			},
			// 计算总价
			totalAmount() {
				if (!this.info) return 0;

				// console.log(this.info.current_price);
				const temp = this.isShowAmountInput ? this.amount : this.info.current_price;
				// 價格*數量/杠桿
				// const temmTotal = temp * 1 * this.quantity * 1 / this.curLever;

				// let shou_price = this.danjia / this.curLever;
				const temmTotal = this.quantity * 1 * (temp / this.curLever);

				return this.$util.formatNumber(temmTotal, 4);
			},
		},
		onLoad(opt) {
			console.log(opt);
			this.code = opt.code || 'btcusdt'; // 默認 btcusdt
			// this.curTab = opt.tag || 0; // buy(long) or sell(short)
		},
		onShow() {
			this.isAnimat = true;
			this.$util.checkToken();
			if (this.socket) this.disconnect();
			this.getData();
			this.getAccountInfo();
			this.changeTab(this.curTab1);
		},
		onHide() {
			this.isAnimat = false;
			if (this.socket) this.disconnect();
		},
		onUnload() {
			if (this.socket) this.disconnect();
		},
		deactivated() {
			if (this.socket) this.disconnect();
		},
		methods: {

			// 强刷的方案。
			refreshPage() {
				this.isUpdate = false;
				this.$nextTick(() => {
					this.isUpdate = true;
				})
			},
			handleCloseCoin() {
				this.isShowCoinList = false;
			},
			// quantity 值计算
			calculateQTY() {
				// 市價或限價模式下的單價
				const temp = this.isShowAmountInput ? this.amount : this.info.current_price;
				// console.log(`curMaxQty:`, temp);
				// 数量*单价
				let shou_price = this.danjia / this.curLever;
				console.log(2222, shou_price)
				// this.quantity = temp * 1 > 0 ?this.$util.formatNumber(this.userInfo.money * this.curLever / temp * curPercent, 4) : '';
				this.quantity = this.$util.formatNumber(this.userInfo.usd / shou_price * (this.sliderVal * 0.01), 4);
			},

			// 百分数值切换
			changePercent(val) {
				console.log(val);
				this.curPercent = val;
				this.sliderVal = this.curPercent;
				this.calculateQTY();
			},
			// 滑块一键最大值
			sliderValMax() {
				this.sliderVal = 100;
				this.changePercent(this.sliderVal);
				this.calculateQTY();
			},
			// 滑块滑动值变更
			changeSlider(e) {
				console.log(`e:`, e);
				console.log(`e:`, this.sliderVal);
				this.changePercent(this.sliderVal);
				this.calculateQTY();
			},

			setStyleType(val) {
				return {
					minWidth: `120rpx`,
					margin: '16rpx',
					padding: `12rpx 20rpx`,
					borderRadius: `16rpx`,
					textAlign: 'center',
					backgroundColor: val ? this.$theme.PRIMARY : '#fff',
					color: this.$theme.SECOND,
					borderRadius: `20rpx`,
				}
			},
			linkHome() {
				uni.switchTab({
					url: this.$paths.HOME
				})
			},
			linkCoin() {
				uni.switchTab({
					url: this.$paths.COIN_INDEX
				})
			},
			linkContract() {
				uni.navigateTo({
					url: this.$paths.CONTRACT_INDEX
				})
			},
			changeTab(val) {
				console.log(`val111:`, val);
				this.curTab1 = val;
				if (this.curTab1 == 0) this.getHoldList();
				if (this.curTab1 == 1) this.getHistoryList();
			},
			// 是否只显示当前数据 
			toggleCoin(val) {
				console.log(`Only current coin data:`, val);
				this.isShowCurCoin = val;
				this.changeTab(this.curTab1);
			},
			// 
			async getHistoryList() {
				let formData = {
					status: 2, // 1持仓，2历史
				}
				if (this.isShowCurCoin) {
					formData.code = this.code;
				}
				uni.showLoading({
					title: 'データをリクエスト中',
				});
				const result = await this.$http.post(`api/user/heyueorder`, formData);
				if (!result) return false;
				console.log(`result:`, result);
				const temp = !Array.isArray(result) || result.length < 0 ? [] :
					result.filter(item => item.goods_info && item.goods_info.gid > 0 && item.gid > 0);
				this.historyList = temp.length <= 0 ? [] : temp.map(item => {
					// // 收益率： 买涨公式： (卖出价-买入价)/买入价
					// const tempBuyRate = ((item.price * 1 - (item.order_buy
					// 	.price * 1)) / (item.order_buy.price * 1) * 100).toFixed(4) * 1;
					// // 收益率： 买跌公式： (买入价-卖出价)/买入价
					// const tempSellRate = ((item.order_buy
					// 		.price * 1 - item.price * 1) / (item.order_buy.price * 1) *
					// 	100).toFixed(4) * 1;
					// 客户需求 收益率=利润/保证金 /by 2024.12.01
					const tempPL = ((item.interest * 1) / (item.order_buy.amount * 1)).toFixed(4) * 100;
					return {
						id: item.id,
						name: item.goods_info.name,
						// fx   1市价 2限价
						fx: item.order_buy.fx,
						fxText: item.fx == 1 ? '市場' : '指値',
						direct: item.order_buy.direct,
						// direct   1:买涨 买入；2：买跌 卖出
						// directText: item.direct == 1 ? this.$lang.COIN_VIEW_BTN_BUY : this.$lang
						// 	.COIN_VIEW_BTN_SELL,
						directText: item.order_buy.direct == 1 ? '買い' : '売り',
						price: item.price,
						buyprice: item.order_buy.price,
						baozhengjin: item.order_buy.amount,
						quantity: item.num,
						total: item.amount,
						created_at: item.created_at,
						fee: item.order_buy.buy_fee,
						lever: item.order_buy.double,
						interest: item.interest,
						buyProfitRate: tempPL > 0 || Math.abs(tempPL) > 0 ? tempPL : '--',
						sellProfitRate: tempPL > 0 || Math.abs(tempPL) > 0 ? tempPL : '--',
					}
				});
				console.log(this.historyList[0]);
			},

			// 選擇杠桿 Lever
			// handleChooseLever() {
			// 	this.isShowLever = true;
			// },
			changeLever(val) {
				this.curLever = val;
			},
			// confirmLever(e) {
			// 	console.log(`confirmMode e:`, e);
			// 	this.curLever = e.value[0];
			// 	this.isShowLever = false;
			// },

			// 合約交易説明
			showDesc() {
				this.isShowDesc = true;
				uni.hideTabBar(); // 隐藏tabBar
			},
			handleClose(val) {
				console.log('val:', val);
				this.isShowDesc = false;
				uni.showTabBar(); // 显示tabBar
			},

			// 選擇一種coin
			chooseCoin() {
				// 請求數據。
				this.getCoinList();
			},
			// coin選擇器確認事件
			confirmCoin(val) {
				console.log(`confirmMode val:`, val);
				this.code = val.locate;
				this.isShowCoinList = false;
				// 重置一些值
				this.quantity = '';
				this.keyword = '';
				this.getData();
			},

			// 在切換coin時，需請求列表，製作coin選擇器數組
			async getCoinList() {
				uni.showLoading({
					title: 'データをリクエスト中',
					icon: 'loading'
				});
				const result = await this.$http.get(`api/goods/topbi`);
				if (!result) return false;
				this.list = result
				// 对数据按 current_price 从高到低排序
				this.list.sort((a, b) => {
					return b.current_price - a.current_price; // 从高到低排序
				});
				console.log(result);
				this.coinList = result;
				// 獲取數據之後，顯示選擇器
				this.isShowCoinList = true;
			},

			// 跳轉到 詳情頁面
			linkCoinInfo() {
				uni.navigateTo({
					url: this.$paths.COIN_DETAIL + `?code=${this.info.locate}&tag=contract`
				});
			},

			// 設置百分比的選中樣式
			setStylePercent(val) {
				return {
					width: `50%`,
					textAlign: `center`,
					backgroundColor: val ? this.$theme.RGBConvertToRGBA(this.$theme.RISE, 20) : this.$theme.TRANSPARENT,
					color: val ? this.$theme.RISE : this.$theme.LOG_VALUE
				}
			},

			// 设置样式
			setStyle(val) {
				const temp = this.curTab == 0 ? this.$theme.RISE : this.$theme.FALL;
				return {
					width: `40%`,
					margin: '0',
					padding: `12rpx`,
					textAlign: 'center',
					backgroundColor: val ? temp : this.$theme.FALL,
					color: '#FFFFFF',
					borderRadius: `20rpx`,
				}
			},


			// 选择杠杆
			chooseLever(val) {
				this.curLever = val;
			},
			groupChange(n) {
				console.log('groupChange', n);
				this.radiovalue1 = n;
			},
			radioChange(n) {
				console.log('radioChange', n);
				this.radiovalue1 = n;
			},

			// 产品详情
			async getData() {
				if (this.socket) this.disconnect();
				uni.showLoading({
					title: 'データをリクエスト中',
					icon: 'loading'
				});
				const result = await this.$http.post(`api/product/info`, {
					code: this.code,
				});
				if (!result) return false;
				this.info = result[0];
				this.getDepthList();
				this.getAccountAssets();
				this.connect();
				this.amount = this.info.current_price;
				this.changeTab(this.curTab1);
				this.refreshPage();
			},

			checkFrom() {
				if (this.quantity == '' || this.quantity <= 0) {
					uni.showToast({
						title: '数量を入力してください',
						icon: 'none'
					});
					return false;
				}
				if (!this.$util.checkInputNumber(this.quantity)) return false;

				if (this.isShowAmountInput) {
					if (this.amount == '' || this.amount <= 0) {
						uni.showToast({
							title: '金額を入力してください',
							icon: 'none'
						});
						return false;
					}
				}
				return true;
			},

			// 買賣  
			async handleSubmit(val) {
				if (this.checkFrom()) {
					const result = await uni.showModal({
						title: '',
						content: `${this.info.name} Quantity ${this.quantity}`,
						cancelText: 'キャンセル',
						confirmText: '確認',
						showCancel: true, // 是否显示取消按钮，默认为 true
						confirmColor: this.$theme.SECOND,
						cancelColor: this.$theme.MODAL_CANCEL,
					});
					if (result[1].confirm) {
						if (val == 0) {
							this.buy();
						} else if (val == 1) {
							this.sell();
						}
					}
				}
			},
			async buy(val) {
				let formData = {
					num: this.quantity,
					gid: this.info.gid,
					fx: this.isShowAmountInput ? 2 : 1, // 1市价 2限价
					direct: 1, // direct   1买多    2卖少
					ganggan: this.curLever, // 杠桿
				}
				if (this.isShowAmountInput) {
					formData.price = this.amount;
				}
				uni.showLoading({
					title: '送信中',
				});
				const result = await this.$http.post(`api/product/bipurchase`, formData);
				if (!result) return false;
				console.log(`buy result:`, result);
				if (result.message == "no") {
					this.no_buy_show = true
					return
				}
				uni.showToast({
					title: result.message,
					icon: 'success'
				});
				// 刷新当前激活的列表
				this.changeTab(this.curTab1);
				this.getAccountAssets()
			},

			async sell() {
				let formData = {
					num: this.quantity,
					gid: this.info.gid,
					fx: this.isShowAmountInput ? 2 : 1, // 1市价 2限价
					direct: 2, // direct   1买多    2卖少
					ganggan: this.curLever, // 杠桿
				}
				if (this.isShowAmountInput) {
					formData.price = this.amount;
				}
				uni.showLoading({
					title: '送信中',
				});
				const result = await this.$http.post(`api/product/bipurchase`, formData);
				if (!result) return false;
				if (result.message == "no") {
					this.no_buy_show = true
					return
				}

				uni.showToast({
					title: result.message,
					icon: 'success'
				});
				// 刷新当前激活的列表
				this.changeTab(this.curTab1);
				this.getAccountAssets()
			},


			// 获取账户 資產 信息 (每次切換買賣時，都調用一次該函數)
			async getAccountAssets() {
				// const result = await this.$http.post(`api/user/assets`, {
				// 	type: 1, // 合約賬戶
				// 	name: 'USDT',
				// });
				// 单钱包模式
				const result = await this.$http.post(`api/user/assets`, {
					type: 2, // 合約賬戶
					name: 'USDT',
				});
				console.log(`assets111:`, result);
				if (!result) return false;
				this.userInfo = result;
				this.changeSlider(1);
			},
			mounted() {
				this.getAccountAssets(); // 在组件加载时调用
			},

			async getAccountInfo() {
				uni.showLoading({
					title: 'アカウント情報を取得',
				});
				const result = await this.$http.get(`api/user/assets`);
				if (!result) return false;
				// 处理杠杆，后端数据返回不一致。
				this.leverList = this.$util.leverList(result.ganggan);
				console.log(77777, this.leverList);
				this.curLever = this.leverList.filter(item => item == 100)[0];
				console.log('leverList:', this.leverList);
			},

			async getDepthList() {
				const response = await uni.request({
					url: `https://api.huobi.pro/market/depth`,
					method: 'GET',
					data: {
						symbol: this.info.locate,
						depth: 5,
						type: 'step0'
					},
				});
				const [err, res] = response;
				console.log('err:', err, 'res:', res);
				if (res && res.data.status == 'ok') {
					const temp = res.data;
					this.asks = res.data.tick.asks;
					this.bids = res.data.tick.bids;
					// 當前數組中，數量最大值， *1.01(餘量，避免求出100%)
					this.asksMax = Math.max(...this.asks.map(item => item[1])) * 1.01;
					// 當前數組中，數量最大值， *1.01(餘量，避免求出100%)
					this.bidsMax = Math.max(...this.bids.map(item => item[1])) * 1.01;
				}
				console.log('asks:', this.asks);
				console.log('bids:', this.bids);
			},

			// websocket 断线重连
			reconnectWebSocket() {
				// 连接中，并且非手动关闭
				if (this.isConnected) return;
				console.log(`reconnect!`, this.isConnected);
				this.socket = null;
				console.log(`reconnect! socket:`, this.socket);
				this.connect();
			},
			// websocket链接
			connect() {
				//创建webSocket
				this.socket = uni.connectSocket({
					url: this.$http.WS_COIN_URL,
					header: {
						'content-type': 'application/json'
					},
					success(res) {
						console.info(`success res:`, res);
					},
					fail: (res) => {
						console.info(`fail res:`, res);
					}
				});
				console.log(`socket:`, this.socket);
				if (this.socket) {
					this.isConnected = true; // 已连接
					this.socket.onOpen((res) => {
						console.info("socket onOpen:", res)
					});
					this.socket.onClose((res) => {
						// code:1000(手动关闭) 1006(异常关闭) 
						console.log(`onClose:`, res);
						this.isConnected = false;
						if (res.code !== 1000) {
							this.reconnectWebSocket();
						}
					});

					this.socket.onError((err) => {
						console.log(`onError:`, err);
						this.isConnected = false;
						this.reconnectWebSocket();
					});
					this.socket.onMessage((res) => {
						const data = JSON.parse(res.data);
						if (this.coinList) {
							if (this.coinList[data.market] && data.market && data.lastPrice > 0) {
								this.coinList[data.market].current_price = data.lastPrice;
								// this.coinList[data.market].rate = data.rate || 0;
								// this.coinList[data.market].vol = data.vol || 0;
							}
						}
						if (this.info.code == data.market && data.lastPrice > 0) {
							// console.log('data:', data);
							this.info.current_price = data.lastPrice || 0;
							this.info.rate = data.rate || 0;
							// this.info.rate_num = data.rate_num || 0;
							// this.info.vol = data.vol || 0;
						}
						// 當前買賣盤的數據
						if (this.info.code == data.market && data.type == "depth") {
							// 直接提取前五條，替換數據		
							const tempAsk = data.ask.slice(0, 5);
							const tempBid = data.bid.slice(0, 5);
							// console.log('data depth:', data);
							this.asks = tempAsk.map(item => [item.price, item.quantity]);
							this.bids = tempBid.map(item => [item.price, item.quantity]);
							// 當前數組中，數量最大值， *1.01(餘量，避免求出100%)
							this.asksMax = Math.max(...this.asks.map(item => item[1])) * 1.01;
							// 當前數組中，數量最大值， *1.01(餘量，避免求出100%)
							this.bidsMax = Math.max(...this.bids.map(item => item[1])) * 1.01;
						}

						// 匹配hold列表的每条数据。计算对应数据的floatPL值
						this.holdList.forEach(item => {
							if (item.code == data.market && data.lastPrice > 0) {
								item.curPrice = data.lastPrice;
								console.log(1111,data.lastPrice)
								if (item.direct == 1) {
									// 买多的计算公式: (当前价-买入价-手续费)*数量*杠杆
									item.floatPLBuy = this.$util.formatNumber(item.quantity * 1000 * (data
											.lastPrice * 1 - item.price * 1) / data.lastPrice * 1 *
										item.lever, 4);

									item.profitLossBuy = this.$util.formatNumber(item.quantity * 1000 * (
											data.lastPrice * 1 - item.price * 1) / data.lastPrice * 1 -
										item.fee, 4);

								}
								if (item.direct == 2) {
									// 卖少的计算公式: (买入价-当前价-手续费)*数量*杠杆
									item.floatPLSell = this.$util.formatNumber(item.quantity * 1000 * (item
											.price * 1 - data.lastPrice * 1) / data.lastPrice * 1 *
										item.lever, 4);

									item.profitLossSell = this.$util.formatNumber(item.quantity * 1000 * (
											item.price * 1 - data.lastPrice * 1) / data.lastPrice * 1 -
										item.fee, 4);
								}
							}
						});
					});
				}
			},
			// 关闭 websocket链接
			disconnect() {
				if (this.socket) {
					const result = this.socket.close();
					console.log('disconnect result:', result);
					this.socket = null;
				}
			},
			// 子组件改变checkbox的状态
			handleHoldList(val) {
				console.log(`val:`, val);
				this.isShowCurCoin = val;
				this.getHoldList();
			},
			async getHoldList() {
				let formData = {
					status: 1, // 1持仓，2历史
				}
				if (this.isShowCurCoin) {
					formData.code = this.code;
				}
				uni.showLoading({
					title: 'データをリクエスト中',
				});
				const result = await this.$http.post(`api/user/heyueorder`, formData);
				if (!result) return false;
				console.log(`hold result:`, result);
				const temp = !Array.isArray(result) || result.length < 0 ? [] :
					result.filter(item => item.goods_info && item.goods_info.gid > 0 && item.order_buy && item
						.order_buy.gid > 0);
				console.log(`hold result temp:`, temp);
				this.holdList = temp.length <= 0 ? [] : temp.map(item => {
					return {
						id: item.id, 
						code: item.goods_info.code,
						name: item.goods_info.name,
						// fx   1市价 2限价
						fx: item.order_buy.fx,
						fxText: item.order_buy.fx == 1 ? '市場' : '指値',
						direct: item.order_buy.direct,
						// direct   1:买涨 买入 买多；2：买跌 卖出 卖少
						directText: item.order_buy.direct == 1 ? '買い（ロング）' : '売り（ショート）',
						price: item.order_buy.price,
						quantity: item.order_buy.num,
						amount: item.order_buy.amount,
						total: item.order_buy.user_pay,
						sn: item.order_sn,
						created_at: item.order_buy.created_at,
						lever: item.order_buy.double,
						profit: item.order_buy.zhiying || '--',
						loss: item.order_buy.zhisun || '--',
						curPrice: item.goods_info.current_price, // 最新价
						// 万分之5 因为1lot=1000USDT，手续费是万5% 就是0.0005或者0.05%，10手的手续费 10 lot*1000=10万，手续费就是5USDT了
						fee: item.order_buy.buy_fee,
						profitLossBuy: (item.order_buy.yingkui * 1).toFixed(4) || 0, // 1买多 盈亏
						profitLossSell: (item.order_buy.yingkui * 1).toFixed(4) || 0, // 2 卖少 盈亏
						floatPLBuy: (item.order_buy.float_yingkui * 1).toFixed(4) || 0, // 1买多 浮动盈亏
						floatPLSell: (item.order_buy.float_yingkui * 1).toFixed(4) || 0, // 2 卖少 浮动盈亏

					}
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	/deep/uni-slider {
		margin-right: 0;

		.uni-slider-value {
			width: max-content !important;
		}
	}

	// /deep/.u-subsection--button {
	// 	background-color: #FFF !important;
	// }

	.common_header {
		padding: 40rpx;
		display: flex;
		align-items: center;
		padding-top: 30px;

		.left {
			flex: 0 0 auto;
		}

		.right {
			flex: 0 0 auto;
		}

		.common_input_wrapper {
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			margin: 10px 0;
			padding: 10px 0px;
			border-radius: 16rpx;
			height: 54rpx;
			line-height: 54rpx;
			/* border: 1px solid #E8EAF3; */
			background-color: #F5F5F5;
		}

		.common_input_wrapper>input {
			color: #121212;
		}

		.common_input_wrapper>image {
			padding: 0 16px;
		}

		.center {
			color: #FFFFFF;
			font-size: 36rpx;
			font-weight: 500;
			padding-left: 40rpx;
			flex: 1 1 auto;
			text-align: left;
		}
	}
</style>