// 模拟数据文件，有后台支撑时删除

// 生成随机数
export const genRandomNumber = (min, max, isFloat) => {
	let rand = Math.random() * (max - min) + min;
	return isFloat ? parseFloat(rand.toFixed(2)) : Math.floor(rand);
}

// 生成EA交易数据
export const genEAList = () => {
	let result = [];
	for (let i = 0; i <= 5; i++) {
		result.push({
			id: i + 1,
			code: genRandomNumber(100000, 999999, false),
			name: `구매내역_${i}`,
			rate: genRandomNumber(1, 999, true),
			price: genRandomNumber(1000, 99999, true),
			shengou_date: '2024.04.26',
			maxValue: genRandomNumber(100000, 999999, false),
			currentValue: genRandomNumber(100000, 888888, false),
		})
	}
	return result;
}

// 生成折价交易数据
export const genDiscountList = () => {
	let result = [];
	for (let i = 0; i <= 5; i++) {
		result.push({
			id: i + 1,
			goods: {
				code: genRandomNumber(100000, 999999, false),
				name: `구매내역_${i}`,
				rate: genRandomNumber(1, 999, true),
			},
			price: genRandomNumber(1000, 99999, true),
			shengou_date: '2024.04.26',
		})
	}
	return result;
}

// 生成IPO 产品列表数据
export const genIPOList = () => {
	let result = [];
	for (let i = 0; i <= 5; i++) {
		result.push({
			id: i + 1,
			goods: {
				code: genRandomNumber(10000, 99999, false),
				name: `구매내역_${i}`,
			},
			price: genRandomNumber(1000, 99999, true),
			shiying: genRandomNumber(1000, 99999, true),
			shengou_date: '2024.04.26',
		})
	}
	return result;
}


// 生成IPO订单列表数据
export const genIPOOrderList = () => {
	const temp = ['깊은', '북쪽', '상하이'];
	let result = [];
	for (let i = 0; i <= 5; i++) {
		result.push({
			id: i + 1,
			goods: {
				code: genRandomNumber(10000, 99999, false),
				name: `구매내역_${i}`,
				locate: temp[genRandomNumber(0, 2, false)]
			},
			price: genRandomNumber(1000, 99999, true),
			shiying: genRandomNumber(1000, 99999, true),
			shengou_date: '2024.04.26',
			fa_amount: genRandomNumber(1000, 99999, true),
		})
	}
	return result;
}

// 生成 IPO申购成功订单列表
export const genIPOSuccessLog = () => {
	let result = [];
	for (let i = 0; i <= 5; i++) {
		result.push({
			id: i + 1,
			status: genRandomNumber(-1, 2, false),
			goods: {
				code: genRandomNumber(10000, 99999, false),
				name: `구매내역_${i}`,
				locate: temp[genRandomNumber(0, 2, false)]
			},
			price: genRandomNumber(1000, 99999, true),
			shiying: genRandomNumber(1000, 99999, true),
			shengou_date: '2024.04.26',
			apply_amount: genRandomNumber(1000, 99999, true),
			success_num_amount: genRandomNumber(1000, 99999, true),
			success: genRandomNumber(1000, 99999, true),
			created_at: '2024.04.26',
			order_sn: `${genRandomNumber(100000, 9999999, false)}`
		})
	}
	return result;
}