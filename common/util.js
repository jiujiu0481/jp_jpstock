import Vue from 'vue';

/**
 * @function 获取客服链接
 * @description API返回链接 ,或者默认客服链接 （开发完成向客户索取）
 */
export const getServiceURL = async () => {
	// 默认客服链接。用于无token时。（开发完成向客户索取）
	let url = ``;
	if (!uni.getStorageSync(`token`) || uni.getStorageSync('token') == '') {
		return url;
	} else {
		const result = await http.get(`api/app/config`);
		if (!result) return url;
		const temp = result.reduce((map, item) => {
			map.set(item.key, item.value);
			return map;
		}, new Map());
		return !temp.get('CustomerLink') ? url : temp.get('CustomerLink');
	}
}

// 客服跳转 读取系统配置客服url，外部打开。用于上架
const linkService = async () => {
	// 获取客服链接
	const url = await getServiceURL();
	if (window.android) {
		window.open(url)
		// window.android.callAndroid("open," + url)
		return false;
	}
	if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers
		.nativeExt) {
		window.webkit.messageHandlers.nativeExt.postMessage({
			msg: 'open,' + url
		})
		return false;
	}
	let u = navigator.userAgent;
	let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if (isiOS) {
		window.location.href = url;
		return false;
	}
	window.open(url)
}

/*
跳转到客服：
	上架模式：[`line`|`第三方`] 弹出提示框，联系客户经理
	正常模式：`line`(跳轉到外鏈頁面)，`第三方`(跳轉内頁)
*/
const linkCustomerService = () => {
	// 上架模式：[`line`|`第三方`] 弹出提示框，联系客户经理
	// uni.showToast({
	// 	title: Vue.prototype.$lang.SERVICE_CONTACT_MANAGER,
	// 	icon: 'none'
	// });

	// 正常模式：`line`(跳轉到外鏈頁面)
	linkService();

	// 正常模式：`第三方`(跳轉内頁)
	// uni.navigateTo({
	// 	url: Vue.prototype.$paths.SERVICE
	// });
}


// 切换底部导航文字多语言
const switchTabBar = () => {
	// 为兼容RTL模式，改为数组对象，直接定义。
	const TABBAR = [{
			text: Vue.prototype.$lang.TABBAR_HOME,
			iconPath: `/static/tarbar0.png`,
			selectedIconPath: `/static/tarbar0_act.png`,
			pagePath: `pages/home`,
		},
		// {
		// 	text: Vue.prototype.$lang.TABBAR_MARKET,
		// 	iconPath: `static/tarba.png`,
		// 	selectedIconPath: `static/tarbar1_act.png`,
		// 	pagePath: `pages/market/index`,
		// },
		{
			text: Vue.prototype.$lang.TABBAR_FOLLOW,
			iconPath: `/static/tarbar1.png`,
			selectedIconPath: `/static/tarbar1_act.png`,
			pagePath: `pages/market/overview`,
		},
		{
			text: Vue.prototype.$lang.TABBAR_TRADE,
			iconPath: `/static/tarbar2.png`,
			selectedIconPath: `/static/tarbar2_act.png`,
			pagePath: `pages/account/trade`,
		},
		// {
		// 	text: Vue.prototype.$lang.TABBAR_MARKET_OVERVIEW,
		// 	iconPath: `static/tarbar2.png`,
		// 	selectedIconPath: `static/tarbar2_act.png`,
		// 	pagePath: `pages/market/overview`,
		// },
		{
			text: Vue.prototype.$lang.TABBAR_ACCOUNT,
			iconPath: `/static/tarbar3.png`,
			selectedIconPath: `/static/tarbar3_act.png`,
			pagePath: `pages/account/trade`,
		},
		{
			text: Vue.prototype.$lang.TABBAR_MARKET,
			iconPath: `/static/tarbar4.png`,
			selectedIconPath: `/static/tarbar4_act.png`,
			pagePath: `pages/account/center`,
		},
	];

	TABBAR.forEach((item, index) => {
		uni.setTabBarItem({
			index: index,
			...item,
		})
	});
};

// 是否为小数
const hasDecimalPoint = (val) => {
	return val % 1 !== 0;
};

// 数量值 格式化
const formatNumber = (val, decimal = 2) => {
	// 处理为规范化数字类型
	val = isNaN(val) ? 0 : Number(val);
	return decimal <= 0 ? val : val.toFixed(decimal) * 1;
};

// 金额值格式化(参数：金额，小数位数)
const formatMoney = (amount, decimal = 2) => {
	// 处理传入值为数字类型
	amount = isNaN(amount) ? 0 : Number(amount);
	// console.log(amount);
	const curLocale = 'ja-JP';
	const result = new Intl.NumberFormat(curLocale, {
		style: 'decimal', // 不包含货币符号。currency:包含货币符号
		// 如果传入数字包含小数。则启用小数位数
		minimumFractionDigits: hasDecimalPoint(amount) ? decimal : 2, // 小数位数
		maximumFractionDigits: hasDecimalPoint(amount) ? decimal : 2, // 小数位数
		currency: Vue.prototype.$CURRENCY
	}).format(amount);
	// console.log('格式化：', result);
	return result;
}

// Coin格式化，数据无损输出
const formatCoin = (coin) => {
	coin = isNaN(coin) ? 0 : Number(coin);
	const curLocale = 'en-US';
	const result = new Intl.NumberFormat(curLocale, {
		style: 'decimal', // 不包含货币符号。currency:包含货币符号
		currency: Vue.prototype.$CURRENCY
	}).format(coin);
	// console.log('格式化：', result);
	return result;
};


// 日期格式化
// this.$util.formatDate(new Date())
const formatDate = (timeString, isTime = true) => {
	// console.log('原值:', timeString);
	// const curLang = uni.getStorageSync('lang');
	const curLang = Vue.prototype.$LANGCODE;
	// console.log('当前语言', curLang);
	const dateOpt = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	}

	const timeOpt = {
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		hour12: false, // 以24小时制处理
	};

	const opt = isTime ? {
		...dateOpt,
		...timeOpt
	} : dateOpt;

	const result = new Intl.DateTimeFormat(curLang, opt).format(new Date(timeString));
	// console.log('格式化：', result);
	return result;
};
// 返回 年月日及星期几，按照当前语言返回 ,参数:是否需要时间
const formatToday = (isTime = false) => {
	const curLang = uni.getStorageSync('lang');
	console.log('当前语言', curLang);
	const tempTime = {
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		hour12: false, // 以24小时制处理
	}
	const opt = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		weekday: "long"
	};
	const result = new Intl.DateTimeFormat(curLang, opt).format(new Date());
	console.log('格式化：', result);
	return result;
};


export default {
	switchTabBar,
	getServiceURL,
	linkCustomerService,
	hasDecimalPoint,
	formatMoney,
	formatCoin,
	formatNumber,
	formatDate,
	formatToday,

	// 根据当前平台，执行回退方式
	goBack: () => {
		/*#ifdef APP-PLUS*/
		uni.navigateBack({
			delta: 1
		});
		/*#endif*/

		/*#ifdef H5*/
		history.back();
		/*#endif*/
	},



	// 对象嵌套转数组对象。当前用于市场指标返回数据，将其从对象转为数组对象
	ObjectConvertArray: (obj) => {
		return Object.values(obj);
	},
	// 负数取绝对值
	formatMathABS: (val) => {
		return Math.abs(val);
	},

	// 邮箱验证
	checkEmail: (val) => {
		const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		console.log('checkEmail:', !emailPattern.test(val))
		return emailPattern.test(val);
	},

	// 部分页面需要拼接股票完整LOGO的url
	setLogo: (url) => {
		// console.log('url:', url);
		return url.includes('http') ? url : Vue.prototype.$http.BASE_URL + url;
	},
	// 设置 Coin Logo
	setCoinLogo: (url) => {
		return url.includes('http') ? url :
			Vue.prototype.$http.BASE_URL + url;
	},

	// 设置交易记录中，每条数据状态
	setStatusPrimary: (code = 0) => {
		const temp = [{
			text: Vue.prototype.$lang.TRADE_LOG_WITHDRAW_STATUS[0],
			icon: '/static/audit.png',
		}, {
			text: Vue.prototype.$lang.TRADE_LOG_WITHDRAW_STATUS[1],
			icon: '/static/success.png',
		}, {
			text: Vue.prototype.$lang.TRADE_LOG_WITHDRAW_STATUS[2],
			icon: '/static/failed.png',
		}, {
			text: Vue.prototype.$lang.TRADE_LOG_WITHDRAW_STATUS[3],
			icon: '/static/refuse.png',
		}];
		return temp[code];
	},

	// 统一处理杠杆，后端数据返回不一致。
	leverList: (val) => {
		val = val || [];
		// 如果没有数据。就返回默认杠杆 1
		if (!val || val.length <= 0) return [1];

		console.log(val);

		// 数组对象类型 
		// ganggan: [{name: "", index: ""}] 
		// ganggan: [{name: "2", index: "2"}, {name: "4", index: "4"}, ...]
		if (val.length > 0 && typeof(val[0]) === 'object') {
			// val[0].index && val[0].index * 1 > 0
			const tempFilter = val.filter(item => item.index * 1 > 0);
			const temp = tempFilter.map(item => item.index * 1);
			console.log('lever array object:', temp);
			// 数据中，添加1倍杠杆
			return temp[0] * 1 == 1 ? temp : [1, ...temp];
		} else if (Array.isArray(val)) {
			// [1, '2', '4', '5', '10']
			console.log(1, val);
			return val.map(item => item * 1);
		}

		// 字符串类型 ganggan: "2,3,4,5,6,7,8,9,10" 
		if (typeof(val) === 'string') {
			const temp = val.split(',').map(item => item * 1);
			console.log('lever string:', temp);
			// 数据中，添加1倍杠杆
			return temp[0] * 1 == 1 ? temp : [1, ...temp];
		}

	},
}