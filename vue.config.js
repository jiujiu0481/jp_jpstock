module.exports = {
	transpileDependencies: ['uview-ui'],
	chainWebpack: (config) => {
		// console.log('config:', config);
		// 发行或运行时启用了压缩时会生效
		config.optimization.minimizer('terser').tap((args) => {
			const compress = args[0].terserOptions.compress
			// 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
			compress.drop_console = true
			compress.pure_funcs = [
				'__f__', // App 平台 vue 移除日志代码
				// 'console.debug' // 可移除指定的 console 方法
			]
			return args
		});

		// config.module.rule('images')
		// 	.use('url-loader')
		// 	.tap(options => ({
		// 		name: './static/[name].[hash:8].[ext]',
		// 		quality: 85,
		// 		limit: 0,
		// 		esModule: false,
		// 	}));

		// config.module.rule('images').test([/\.(png|jpg|svg)$/]).use('url-loader').loader('url-loader').tap(
		// 	options => {
		// 		options.name = 'static/[name].[hash:8].[ext]';
		// 		return options;
		// 	})
	},

	configureWebpack(config) {
		// ...blablabla  
	},

	// // 文件缓存
	// config.output: {
	// 	filename: '[name].[contenthash:8].js',
	// 	chunkFilename: '[name].[contenthash:8].js'
	// };

	// // 输出处理缓存
	// config.module: {
	// 	rules: [{
	// 		test: /\.(png|jpg|svg)$/,
	// 		use: [{
	// 			loader: 'file-loader',
	// 			options: {
	// 				name: '[name].[hash:8].[ext]',
	// 				outputPath: 'static/'
	// 			}
	// 		}]
	// 	}]
	// };
}