<template>
	<view>
		<view style="margin-top: 10px;">

		<!-- <scroll-view :scroll-x="true" style="white-space: nowrap;width: 96%;padding:0 10px 0 0;" @touchmove.stop>
			<block v-for="(item,index) in $lang.MARKET_HOT_TABS" :key='index'>
				<view :class="setClass(curTab==index)" @click="changeTab(index)">
					<view style="position: relative;height: 80rpx;padding: 0 20px;color: transparent;">
						{{item}}
						<template v-if="curTab==index">
							<view
								style="position: absolute;bottom: 20rpx;left: 0;right: 0;height: 12rpx;width: 32%; background-image:linear-gradient(90deg,#6f62de,#6f62de);border-radius: 16rpx;margin:0 auto;">
							</view>
						</template>
						<view
							style="position: absolute;top:16rpx;left: 0;right: 0;font-size: 32rpx;font-weight: 800;width: 100%;text-align: center;"
							:style="{color:curTab==index?$theme.SECOND:'#898996'}">
							{{item}}
						</view>
					</view>
				</view>
			</block>
		</scroll-view> -->


		<template v-if="list.length<=0">
			<EmptyData></EmptyData>
		</template>
		<template v-else>

			<view style="background-color: #fff;width: 90%;padding: 10px;border-radius:10px;margin-left: 10px;">
				<view class="flex">
					<view class="flex-1 bold" style="margin-left: auto;font-size: 18px;">人気株</view>
					<view style="font-size: 16px;margin-left: auto;" @click="linkAllList()"
						:style="{color:$theme.SECOND}">
						{{$lang.MORE}}
						<view class="arrow rotate_45" :style="$theme.setImageSize(12)"></view>
					</view>
				</view>
				
				<view class="flex flex-wrap text-center" style="margin: 2.5px;">
					<view v-for="(item,index) in setList" :key="index" v-if="index<=5"
						style="flex: 1 0 25%;min-width: 25%;background-color: #fefaf5; border-radius: 10px;margin: 2.5px;padding: 10px;" @click="link(item.code)">
						<view style=" width: 95px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
							{{setText(item.name)}}</view>
						<view style="padding: 10px 0px;" :style="$theme.setStockRiseFall(item.rate*1>0)">{{item.price}}
						</view>
						<view class="flex">
							<image :src="`/static/arrow_${item.rate*1>0?'rise':'fall'}.png`" mode="aspectFit"
								:style="$theme.setImageSize(16)" style="margin-left: 10px;"></image>
							<view :class="item.change_ratio>0?'NavyBlue':'red'" style="margin-left: 5px;">
								{{$util.formatNumber($util.formatMathABS(item.rate),2)}}%</view>
						</view>
						<image :src="`/static/line_${item.rate*1>0?'rise':'fall'}.png`" mode="scaleToFill"
							:style="$theme.setImageSize(150,80)" style="margin-top: 10px;"></image>
					</view>
				</view>
			</view>



			<!-- <view style="display: flex;align-items: center;">
				<block v-for="(item,index) in best" :key="index" v-if="index<=11">
					<view style="flex:1 0 30%; margin:10rpx;border-radius: 20rpx;"
						:style="{backgroundColor:index==1?'#FEF4F8':'#FFF8F6'}" @click="link(item.code)">
						<view style="width: 0;height: 0;position: relative;">
							<view style="position: absolute;left: 0;top: 0;">
								<image :src="`/static/tag${index}.png`" mode="scaleToFill"
									:style="$theme.setImageSize(40)"></image>
							</view>
							<view style="position:absolute;left: 8rpx;top: 4rpx;color:#FFFFFF;font-size: 20rpx;">
								{{index+1}}
							</view>
						</view>
						<view
							style="display: flex;align-items: center;justify-content: center;padding-top: 10rpx;transform: scale(0.75);">
							<CustomLogo :logo="item.logo" :name="item.name"></CustomLogo>
						</view>
						<view :style="{color:$theme.SECOND}"
							style="font-size: 28rpx;line-height: 1.6;text-align: center;">
							{{setText(item.name)}}
						</view>
						<view style="font-size: 32rpx;text-align: center;"
							:style="$theme.setStockRiseFall(item.rate*1>0)">
							{{item.price}}
						</view>
						<view style="text-align: center;" :style="$theme.setStockRiseFall(item.rate*1>0)">
							<image :src="`/static/arrow_${item.rate*1>0?'rise':'fall'}.png`" mode="aspectFit"
								:style="$theme.setImageSize(16)" style="padding-right: 12rpx;"></image>
							{{$util.formatNumber($util.formatMathABS(item.rate),2)}}%
						</view>
						<view style="text-align: center;">
							<image :src="`/static/line_${item.rate*1>0?'rise':'fall'}.png`" mode="scaleToFill"
								:style="$theme.setImageSize(100,40)"></image>
						</view>
					</view>
				</block>
			</view> -->



			<!-- <view style="flex:1 0 86%;">
						
						<view style="display: flex;align-items: center;">
							<view style=" width: 95px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{setText(item.name)}}00</view>
							<view style="flex:1 0 20%; font-size: 28rpx;" :style="{color:$theme.LOG_LABEL}">
								{{item.code}}
							</view>
							<view style="flex:1 0 20%;">
								<image :src="`/static/line_${item.rate*1>0?'rise':'fall'}.png`" mode="scaleToFill"
									:style="$theme.setImageSize(100,40)"></image>
							</view>
							<view style="flex:1 0 30%; font-size: 32rpx;text-align: center;"
								:style="$theme.setStockRiseFall(item.rate*1>0)">
								{{item.price}}
							</view>
							<view style="margin-left: auto;" :style="$theme.setStockRiseFall(item.rate*1>0)">
								<image :src="`/static/arrow_${item.rate*1>0?'rise':'fall'}.png`" mode="aspectFit"
									:style="$theme.setImageSize(16)" style="padding-right: 12rpx;"></image>
								{{$util.formatNumber($util.formatMathABS(item.rate),2)}}%
							</view>
						</view>
					</view> -->

			</block>
		</template>


		<!-- <view style="text-align: center;color: #999;line-height: 1.8;">{{$lang.MARKET_NEWS_TIP}}</view> -->
	</view>
	<view style="background-color: #fff;width: 90%;padding: 10px;border-radius: 10px;margin-left: 10px;margin-top: 10px;">
		<view class="flex">
			<view class="flex-1 bold" style="font-size: 18px;">ランキング</view>
			<view class="flex" @click="jiantou()">
				<view>すべて見る</view>
				<view class="arrow rotate_45" :style="$theme.setImageSize(12)"></view>
			</view>
			
		</view>
		
		
		<block v-for="(item,index) in setList" :key="index"  >
					<view style="align-items: center;padding: 10px;border-radius: 10px;margin-top: 8px;"
						@click="link(item.code)">
						<view style="text-align: center;padding-right: 20rpx;">
							<!-- <CustomLogo :logo="item.logo" :name="item.name"></CustomLogo> -->
						</view>
				
				      <view class="flex">
						  <view class="flex-1" > 
							  <view style=" width: 95px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{setText(item.name)}}</view>
							  <view style=" font-size: 28rpx;" :style="{color:$theme.LOG_LABEL}">
							  	{{item.code}}
							  </view>
						  </view>
						  
						  <view class="flex-1">
							  <image :src="`/static/line_${item.rate*1>0?'rise':'fall'}.png`" mode="scaleToFill"
							  	:style="$theme.setImageSize(180,60)"></image>
						  </view>
						  
						  <view >
							  <view style=" font-size: 32rpx;text-align: center;"
							  	:style="$theme.setStockRiseFall(item.rate*1>0)">
							  	{{item.price}}
							  </view>
							  <view style="text-align: center;" :style="$theme.setStockRiseFall(item.rate*1>0)">
							  	<image :src="`/static/arrow_${item.rate*1>0?'rise':'fall'}.png`" mode="aspectFit"
							  		:style="$theme.setImageSize(16)" style="padding-right: 12rpx;"></image>
							  	{{$util.formatNumber($util.formatMathABS(item.rate),2)}}%
							  </view>
						  </view>
						  
						  <!-- <view>
						  <image src="/static/xing.png" mode="widthFix" style="width: 15px;"></image>
						  </view> -->
						  
					  </view>
				 </view>
		</block>
	</view>
	
	</view>

</template>

<script>
	import TabsFifth from '@/components/tabs/TabsFifth.vue';
	import EmptyData from '@/components/EmptyData.vue';
	import CustomLogo from '@/components/CustomLogo.vue';
	export default {
		name: 'MarketHot',
		components: {
			EmptyData,
			CustomLogo,
		},
		data() {
			return {
				list: [],
				curTab: 0,
				socket: null, // websocket
			}
		},
		computed: {
			best() {
				if (this.list && this.list.length > 0) {
					return this.list.length <= 3 ? this.list : this.list.slice(0, 3);
				}
			},
			setList() {
				if (this.list && this.list.length > 0) {
					return this.list.length <= 3 ? [] : this.list.slice(3, this.list.length);
				}
			}
		},
		created() {
			this.getList();
		},
		deactivated() {
			this.disconnect();
		},
		methods: {
			// 文字超出一行。转换为...
			setText(val) {
				let temp = '';
				return temp = val.length <= 5 ? val : val.slice(0, 5) + '...'
			},
			// 设置样式
			setClass(val) {
				return `item ${val?'item_act':''}`
			},
			setStyle(val) {
				return {
					backgroundColor: val ? this.$theme.RISE : this.$theme.FALL,
					borderRadius: `44rpx`,
					padding: `8rpx`,
					width: `160rpx`,
					textAlign: `center`,
				}
			},
			changeTab(val) {
				this.curTab = val;
				this.disconnect();
				this.getList();
			},
			// 跳转到股票详情
			link(code) {
				if (!code || code == '') return false;
				uni.navigateTo({
					url: `${this.$paths.STOCK_OVERVIEW}?code=${code}`
				});
			},
			jiantou(){
				uni.switchTab({
					url:'/pages/market/overview',
				})
			},
			linkAllList(){
				uni.switchTab({
					url:'/pages/market/overview',
				})
			},
			// websocket链接
			connect() {
				// websocket is connect ok?
				console.log(`ws:`, this.$http.WssUrl);
				this.socket = uni.connectSocket({
					url: this.$http.WssUrl,
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
					// 监听WebSocket连接打开事件
					this.socket.onOpen((res) => {
						console.info("监听WebSocket连接打开事件", res)
					});
					// 监听WebSocket错误
					uni.onSocketError((res) => {
						console.info("监听WebSocket错误" + res)
					});
					// 接收websocket消息及处理
					this.socket.onMessage((res) => {
						const data = JSON.parse(res.data);
						// console.log(`ws data:`, data);
						this.list.forEach(item => {
							if (item.stockId === data.pid) {
								item.price = data.last;
								if (data.pcp && data.pcp.length > 0) {
									item.rate = parseFloat(data.pcp.replace("%", ''))
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
					this.socket = null;
				}
			},

			// sockets() {
			// 	//创建webSocket
			// 	this.webSocketTask = uni.connectSocket({
			// 		url: this.$http.WssUrl,
			// 		header: {
			// 			'content-type': 'application/json'
			// 		},
			// 		success(res) {},
			// 	})

			// 	// 监听WebSocket连接打开事件
			// 	this.webSocketTask.onOpen((res) => {
			// 		console.info("监听WebSocket连接打开事件", res)
			// 	});

			// 	// 监听WebSocket错误
			// 	uni.onSocketError((res) => {
			// 		console.info("监听WebSocket错误" + res)
			// 	});
			// 	var that = this;
			// 	// 接收websocket消息及处理
			// 	this.webSocketTask.onMessage((res) => {
			// 		var data = JSON.parse(res.data);
			// 		// console.log(data);

			// 		this.list.forEach(item => {
			// 			if (item.stockId === data.pid) {
			// 				item.price = data.last;
			// 				let rate = data.pcp.replace("+", '')
			// 				rate = rate.replace("%", '')

			// 				item.rate = rate;

			// 				// item.rate_num = data.pc;
			// 			}
			// 		});
			// 		// console.log(data.pid);
			// 		// that.quotation[data.market].price=data.lastPrice
			// 		// that.quotation[data.market].rate=data.rate
			// 	});
			// },
			async getList() {
				// uni.showLoading({
				// 	title: this.$lang.REQUEST_DATA,
				// });
				const result = await this.$http.get(`api/goods/top2`, {
					current: this.curTab
				})
				if (!result || result.length <= 0) return false;
				const temp = result.filter(item => item.stock_id && item.stock_id > 0);
				this.list = !temp || temp.length <= 0 ? [] : temp.map(item => {
					return {
						// logo: item.logo,
						name: item.name,
						code: item.code,
						price: item.close,
						rate: item.returns,
						follow: item.sc,
						gid: item.gid,
						close: item.close,
						stockId: item.stock_id,
					}
				});
				this.connect(); // 启动 websocket链接
			},
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		display: inline-block;
		border-radius: 16rpx;
		text-align: center;
		font-size: 32rpx;
		line-height: 1.8;
		color: #818181;
		min-width: 80rpx;
	}

	.item_act {
		color: #121212;
	}
</style>