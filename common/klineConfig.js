import Vue from 'vue';
// kline Config

// 图标网格设置
export const klineGird = {
	show: true,
	horizontal: {
		show: true,
		size: 1,
		color: '#302F313A',
		style: 'dashed',
		dashedValue: [2, 2], // 虚线时的紧密程度
	},
	vertical: {
		show: true,
		size: 1,
		color: '#302F313A',
		style: 'dashed',
		dashedValue: [2, 2], // 虚线时的紧密程度
	}
};

// 面积图设置
export const klineArea = {
	type: "area",
	tooltip: {
		showRule: "none",
	},
	// 面积图，只有当type为'area'时，当有效
	area: {
		lineSize: 2,
		lineColor: Vue.prototype.$theme.PRIMARY,
		value: 'close',
		backgroundColor: [{
			offset: 0, //下半区颜色
			color: 'rgba(33, 150, 243, 0.01)'
		}, {
			offset: 1, //上半区颜色
			color: 'rgba(33, 150, 243, 0.2)'
		}],
		point: {
			show: true,
			color: Vue.prototype.$theme.RISE,
			radius: 4,
			rippleColor: 'rgba(255,255,255,0.5)',
			rippleRadius: 8,
			animation: true,
			animationDuration: 1000
		}
	},
};

// 蜡烛图设置
export const klineCandle = {
	type: "candle_solid",
	tooltip: {
		showRule: "none",
	},
	bar: {
		upColor: '#00aa99',
		downColor: '#F92855',
		noChangeColor: '#888888',
		upBorderColor: '#00aa99',
		downBorderColor: '#F92855',
		noChangeBorderColor: '#888888',
		upWickColor: '#00aa99',
		downWickColor: '#F92855',
		noChangeWickColor: '#888888'
	},
};

