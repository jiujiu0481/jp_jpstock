import Vue from 'vue';
import md5 from '@/common/md5.min.js';

// export const HOST = `api.btcloud.shop`; // api.pimkrco.top
// export const HOST = `api.bnktop.top`;
// export const HOST = `api.sosastock.top`; // 用于调整AI页面
// export const HOST = `api.mopwplus.top`; // INDIA 印度
// export const HOST = `api.mbkkrx.top`; // KOREA EA交易
// export const HOST = `api.ydcsym.in`; // INIDA 
export const HOST = `api.jpstock.top`;
// export const HOST = `api.jpmdapp.com`;
// export const HOST = `api.ekbstock.top`;
// export const HOST = `api.kpsstock.top`;
export const WssUrl = 'wss://'+HOST+'/ws'

export const BASE_URL = `https://${HOST}`;

export const WS_COIN_URL = `wss://${HOST}/ws`; // coin

export const WS_Zonghe_URL = `wss://${HOST}/zonghe`; // 币



const CODE = "Qwd3N5yp";

// 统一处理网络状态 在onShow 及 api请求时调用
export const checkNetwork = async () => {
	try {
		const result = await uni.getNetworkType();
		// 返回：[null,{errMsg: 'getNetworkType:ok', networkType: 'unknown'}]
		let [err, res] = result;
		if (!res || res.networkType === 'none') return false;

		return true;
	} catch (err) {
		throw err
	}
}

async function http(url, params = {}) {
	// 发送请求前，检查网络状态
	const result = await checkNetwork();

	if (!result) {
		return {
			message: Vue.prototype.$lang.TIP_NETWORK_TYPE_NONE
		};
	} else {
		const token = uni.getStorageSync("token") || '';
		const headers = {
			"Content-Type": "application/x-www-form-urlencoded",
			// 处理携带token
			"Authorization": token == '' ? token : `Bearer ${uni.getStorageSync("token")}`,
			"language": uni.getStorageSync('lang') || 'en', // 'zh-Hans'
		};
		const time = parseInt(new Date().getTime() / 1000);
		const str_url = `/${url}`.toLowerCase();
		const mdd = md5(`XPFXMedS${CODE + str_url + time}`);

		const fmtAPIURL = url.includes('http') ? url : `${BASE_URL}/${url}`;

		try {
			const response = await uni.request({
				url: `${fmtAPIURL}?sign=${mdd}&t=${time}`,
				method: params.method || 'GET',
				data: params.data || {},
				header: headers
			});
			uni.hideLoading();
			const [err, res] = response;

			if (res && res.statusCode == 200) {
				if (res.data.code === 999) {
					uni.clearStorageSync();
					setTimeout(() => {
						uni.navigateTo({
							url: Vue.prototype.$paths.ACCOUNT_ACCESS
						});
					}, 1000);
					return null;
					// return {
					// 	message: Vue.prototype.$lang.API_TOKEN_EXPIRES
					// };
				}
				if (res.data && res.data.code == 0) {
					return res.data.data || null;
				}
				if (!res.data.code) {
					uni.showToast({
						title: `status code is undefined`,
						icon: 'none'
					});
				} else {
					uni.showToast({
						title: res.data.message || Vue.prototype.$lang.API_HTTP_ERROR,
						icon: 'none'
					});
					return null;
				}
			} else {
				uni.showToast({
					title: res.message || Vue.prototype.$lang.API_HTTP_ERROR,
					icon: 'none'
				})
			}
		} catch (error) {
			throw error;
		}
	}
};

// 外部调用，模拟整理前写法。
const get = (url, data = {}) => {
	const params = {
		method: 'GET',
		data,
	}
	return http(url, params)
}

const post = (url, data = {}) => {
	const params = {
		method: 'POST',
		data,
	}
	return http(url, params)
}

export default {
	BASE_URL,
	WS_COIN_URL,
	WS_Zonghe_URL,
	http,
	get,
	post,
	checkNetwork,
	WssUrl
};

uni.addInterceptor('request', {
	config(requestConfig) {
	}
})


// 一些未用到的API，从一些未知页面整理，备用。
/* 
tradingShares.vue
//상하이市
async topTenshang() {
	let list = await this.$http.get('api/stock-api/BaseTop10Active', {
		exchange_kind: 1
	})
	this.shangHai = list.data.data
	// console.log(this.shangHai, '1111111111');

},
//깊은市
async topTenshen() {
	let list = await this.$http.get('api/stock-api/BaseTop10Active', {
		exchange_kind: 3
	})
	this.deep = list.data.data
	// console.log(this.deep, '222222222');
},

 stopResumeTrading.vue
get('api/stock-api/BaseSuspensionList', {})

dragonTiger.vue
// 列表 
async tigerList() {
	let list = await this.$http.get('api/stock-api/BaseDragonTiger', {})
	this.dragon = list.data.data
},
// 弹窗详情 
async popNotification(item) {
	let list = await this.$http.get('api/stock-api/BaseDragonTigerInfo', {secu_code: item.secu_code})
	this.detailed = list.data.data
},

dailyLimit.vue
get('api/stock-api/PoolZT', {})

ration/ration.vue
get('api/goodsscramble/userApplyLog', {})

placeOrder.vue
let list = await this.$http.post('api/product/buy_vip_scramble', {
	num: this.quantity * 100,
	id: this.objData.id,
})

offlinePlacement.vue
async scrambleForFunds(id) {
	let list = await this.$http.get('api/goods-scramble/detail', {id: this.id})
	this.scrambleFor = list.data.data
},
async placeOrder(id) {
	let list = await this.$http.post('api/goods-scramble/doOrder', {
		num: this.quantity,
		id: id,
		price: this.scrambleFor.price,
		double: 1
	})
	
duihuan.vue

版本更新
async edition() {
	let list = await this.$http.get('api/version/detail', {
		// language: this.$i18n.locale
	})
	this.agreement = list.data.data
},
*/