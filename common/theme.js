/* 将一些常用的放在这里，每个项目，注释掉未使用的那些常量及函数 */
const PRIMARY = '#eb3933'; // 通常为主要配色
const SECOND = '#292C31';
const THIRD = '#FF2D30';
const RISE = '#ff3636'; // 涨/跌
const FALL = '#37927d'; // 跌/涨 
// uni.showModal 弹层cancelColor取消按钮的样式 
const MODAL_CANCEL = '#999999';

const TRANSPARENT = 'transparent'; // 使用父级元素颜色

const PLACEHOLDER = '#CBCBCB'; // 输入框占位符

const LOG_LABEL = '#999999'; // 一些记录的明文颜色
const LOG_VALUE = '#333333'; // 一些记录的数据颜色

const CHART_TEXT_COLOR = '#999999'; // 图表相关的字色



// 渐变设置
const linerGradient = (deg, from, to) => {
	return {
		backgroundImage: `linear-gradient(${deg}deg, ${from} ,${to})`
	}
};

// 渐变值 按照當前項目所需排序。
const LG_PRIMARY = linerGradient(90, '#f2bd8f', '#f2bd8f');

const LG_SECOND = linerGradient(90, TRANSPARENT, TRANSPARENT);
const LG_THIRD = linerGradient(90, '#FF2D30', '#FE7FD3');
const LG_FOURTH = linerGradient(90, '#12F6C0', '#FFB044');
const LG_FIFTH = linerGradient(90, '#eb3933', '#eb3933');
// 进度条渐变
const LAUNCH_PROGRESS = linerGradient(90, '#FFFFFF', '#FFFFFF');


// 设置页面背景,返回style对象，动态替换页面背景图
const setBGCover = (url) => {
	return {
		backgroundImage: `url(/static/${url}.png)`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: '0 0',
		backgroundSize: 'cover',
		width: '100%',
		height: '100vh',
	}
};

// 另外一种，使用渐变，动态改变background-size的值。
// val:外部设置该值，可以改变背景的size。 
const setBGSize = (val, url = '') => {
	return {
		// ...linerGradient(180, '#2D54AB', '#2D54AB00'),
		backgroundImage: `url(/static/${url}.png)`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: '0 0',
		backgroundSize: `100% ${val}`,
		width: '100%',
		minHeight: '100vh',
	}
};

// 涨跌值样式设置
const setStockRiseFall = (val, isbg = false) => {
	return {
		color: isbg ? '#FFFFFF' : val ? RISE : FALL,
		backgroundColor: !isbg ? TRANSPARENT : val ? RISE : FALL,
	}
};

const setStockRiseFallBG = (val, isbg = false) => {
	return {
		color: '#FFFFFF',
		backgroundColor:  val ? RISE : FALL,
	}
};
const setCoinRiseFall = (val, isbg = false) => {
	return {
		color:  '#FFFFFF',
		backgroundColor: val ? FALL : RISE,
	}
};
const setCoinRiseFallB = (val, isbg = false) => {
	return {
		color: isbg ? '#FFFFFF' : val ? FALL : RISE,
		backgroundColor: !isbg ? TRANSPARENT : val ? RISE : FALL,
	}
};

// 资金变动相关 交易额 字色
const setTradeAmount = (val) => {
	return {
		color: val ? PRIMARY : PRIMARY
	}
};

// Coin Depth bg
const depathAsksBG = (val, max, dir = 'right') => {
	const temp = RGBConvertToRGBA(FALL, 20);
	// 當前最大值為100%,
	const tempVal = val / max * 100;
	// console.log(val, max, tempVal);
	const style = {
		...linerGradient(180, temp, temp),
		backgroundRepeat: 'no-repeat',
		backgroundPosition: `right 0`,
		backgroundSize: `${tempVal}% 100%`,
		width: '100%',
		minHeight: `100%`,
	}
	return style;
};
const depathBidsBG = (val, max, dir = '0') => {
	const temp = RGBConvertToRGBA(RISE, 20);
	// 當前最大值為100%,
	const tempVal = val / max * 100;
	// console.log(val, max, tempVal);
	const style = {
		...linerGradient(180, temp, temp),
		backgroundRepeat: 'no-repeat',
		backgroundPosition: `${dir} 0`,
		backgroundSize: `${tempVal}% 100%`,
		width: '100%',
		minHeight: `100%`,
	}
	return style;
};

// 设置input的placeholder样式
const setPlaceholder = (color = '', fontsize = '') => {
	return `color:${color == '' ? PLACEHOLDER : color};font-size:${fontsize==''?24:fontsize}rpx`;
};

// 设置图片尺寸（自定义size）
const setImageSize = (w = 0, h = 0) => {
	const _w = w > 0 ? w : 20;
	const _h = h > 0 ? h : _w;
	return {
		width: `${_w}rpx`,
		// 若为设置h值，则视为高=宽
		height: `${_h}rpx`,
	};
};

// 交易记录 数据状态
const setStatusPrimary = (val) => {
	// 渐变的背景
	const temp = [LG_PRIMARY, LG_SECOND, LG_THIRD, LG_THIRD];
	// 文字的颜色
	// const colors = ['#FF6700', '#00B45A', '#00A9DE', '#f56a6a'];

	let style = {
		borderRadius: '4rpx',
		fontSize: '24rpx',
		padding: '4rpx 12rpx',
		color: '#14102B',
		width: 'max-content',
		...temp[val],
	};
	return style;
}

// 计算设计图上带有透明度的值输出为RGBA
const RGBConvertToRGBA = (hexColor, opacity) => {
	// console.log(hexColor);
	const r = parseInt(hexColor.slice(1, 3), 16);
	const g = parseInt(hexColor.slice(3, 5), 16);
	const b = parseInt(hexColor.slice(5, 7), 16);
	const a = opacity / 100;
	return `rgba(${r},${g},${b},${a})`;
};


// 统一处理当前页面布局模式(以当前语言为准)
const setDirection = (val) => {
	return {
		direction: val ? 'rtl' : 'ltr'
	}
};

// 统一处理flex布局的row镜像
const setFlexRowReverse = (val) => {
	return {
		flexDirection: val ? 'row-reverse' : 'row'
	}
};

// 主题，一些通用的颜色值 硬编码
export default {
	setStockRiseFallBG,
	PRIMARY,
	setCoinRiseFallB,
	SECOND,
	THIRD,
	RISE,
	FALL,
	TRANSPARENT,
	MODAL_CANCEL,
	LOG_LABEL,
	LOG_VALUE,
	LAUNCH_PROGRESS,
	LG_PRIMARY,
	LG_SECOND,
	LG_THIRD,
	LG_FOURTH,
	LG_FIFTH,
	depathAsksBG,
	depathBidsBG,
	linerGradient,
	setStatusPrimary,
	setBGCover,
	setBGSize,
	setStockRiseFall,
	setTradeAmount,
	setPlaceholder,
	setImageSize,
	setDirection,
	setFlexRowReverse,
	RGBConvertToRGBA,
	setCoinRiseFall,
};