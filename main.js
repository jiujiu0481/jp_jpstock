import App from './App'
import util from '@/common/util.js';
import languages from '@/locale/index.js';
import theme from '@/common/theme.js';
import http from '@/common/http.js';
import * as paths from '@/common/paths.js';
import * as icon from '@/common/icon.js';

import uView from "@/node_modules/uview-ui";
// import '@/common/icon.css';

// #ifndef VUE3
import Vue from 'vue'
Vue.use(uView);
Vue.config.productionTip = false;

// App Name
Vue.prototype.$APPNAME = 'SCHWSCC',
	// set default lang code
	Vue.prototype.$LANGCODE = 'ja-JP';
/*
当前货币代码(国标货币代码) 金额值不受地域代码影响，每个项目的此处直接硬编码地域代码。
货币代码：['USD', 'HKD', 'CNY', 'KRW', 'JPY', 'INR', 'SAR']
货币符号：['$', '¥', '₩', '¥', '₹', 'ريال']
*/
Vue.prototype.$CURRENCY = 'SAR'; // 
Vue.prototype.$CURRENCY_SYMBOL = '$' // 
Vue.prototype.$USD = 3.75; // USD to SAR

// console.log(`Vue:`, Vue.prototype);

if (!uni.getStorageSync('lang')) {
	uni.setStorageSync('lang', Vue.prototype.$LANGCODE);
}




Vue.prototype.$lang = languages[uni.getStorageSync('lang')];
Vue.prototype.$util = util;
Vue.prototype.$theme = theme;
Vue.prototype.$http = http;
Vue.prototype.$paths = paths;
Vue.prototype.$icon = icon;

App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif

util.switchTabBar(); // 切换底部多语言

// 白名单 将无需用户登录也可查看的页面写在这里。默认是启动页、登录页、隐私协议
const whiteList = [paths.LAUNCH, paths.ACCOUNT_ACCESS,
	paths.ACCOUNT_PRVITE_PACT, paths.MARKET_INDEX, '/pages/account/login', '/pages/account/register'
];
// uniapp 跳转行为
const list = ["navigateTo", "reLaunch", "switchTab"]
// 目标url是否需要权限
function hasPermission(url) {
	console.log(url, uni.getStorageSync("token"));
	// 在白名单中或有token，直接跳转
	if (whiteList.indexOf(url) !== -1 || uni.getStorageSync("token")) {
		return true;
	}
	return false;
}

list.forEach((item) => {
	// 路由拦截
	uni.addInterceptor(item, {
		// 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转
		invoke(e) {
			if (!hasPermission(e.url)) {
				// 将用户的目标路径保存下来 这样可以实现 用户登录之后，直接跳转到目标页面
				// uni.setStorageSync("URL", e.url)
				uni.navigateTo({
					url: paths.ACCOUNT_ACCESS,
				});
				return false;
			}
			return true;
		}
	});
})