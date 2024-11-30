# JP_1

## Fork ko_kpsstock

![LOGO](https://github.com/github1413/JP_1/raw/main/static/logo.png)


# UI
```
https://www.figma.com/design/x1aY91nD3a1G4ZytDMep0E/%E6%97%A5%E6%9C%AC?node-id=0-6860&node-type=frame&t=1dDOEgH0ZZkGdjIC-0
```

先改搜索这里，国内就是gp_index传1   美国就是传2
然后后面在优化，后面要优化的就是详情   购买页  每秒请求，然后不要有那个加载中的提示


<!-- 
 需要有ws的几个页面哈    
	首页  且可以更新价格 涨幅率      
	股票详情   且可以更新价格涨幅率  涨幅    k线实时价格（之前让你修复的那个）        
	购买页   更新价格涨幅率  涨幅
	
 最好就是一直连着，以前不是写在onshow里面  离开就自动关闭吗，现在就是还是写在onshow里，然后不自动关闭，但是要在onshow里先关闭，不过一般都是直接写在ws方法的最上面，就是先关闭在链接
 -->

# 功能列表

- ✅ launch:启动页
- ✅ pact:隐私协议
- ✅ access:登入注册
- ✅ about:关于我们
- ✅ search:搜索
- ✅ stock/overview:股票概览
- ✅ stockNews:股票新闻
- ✅ stockDetail:股票详情
- ✅ stock/buy:股票购买（websocket）
- ✅ market/index:市场 [关注、股票列表、热门、指标]
- ✅ market/overview:市场概览、热门、指标、新闻
- ✅ password:变更登入密码、变更支付密码
- ✅ bankCard:绑定银行卡。移除原状态切换逻辑，即当前页面直接修改。
- ✅ deposit:充值
- ✅ withdraw:提现 (*提現按鈕顔色未取)
- ✅ auth:认证
- ✅ tradeLog:資金變動、入金記錄、出金記錄
- ✅ notification:消息中心
- ✅ account/center:个人中心
- ✅ home:首页
- ✅ position:持仓

##  主营业务
- ✅ trade/day:日内交易
- ✅ trade/large:大宗交易 (当前项目，无需密码查看)
- ✅ trade/ipo:IPO交易

- trade/vip: VIP抢筹 未有数据，未调试
```
api/goods/zhangdie 产品列表
```
- ✅ trade/issuance:新股配售 未有数据，未调试
```
api/goods-scramble/calendar 产品列表
api/goodsscramble/userApplyLog 申请记录
api/goodsscramble/userSuccessLog 成功记录
```

# TODO
- 完全替换uview-ui。

# Update Log 2024.07.05
- Check JP API

# Update Log 2024.07.02
- auth:添加数据缓存。

# Update Log 2024.06.27
- 大宗交易，需要密码才可进入。

# Update Log 2024.06.26
- 隐藏多语言
```
弹层无法遮蔽tabbar解决方案：
uni.hideTabBar(); // 隐藏tabBar
uni.showTabBar(); // 显示tabBar
```
# Update Log 2024.06.25
- 移除 RTL模式

# Update Log 2024.06.18
- `home`页面添加根据用户权限开启多语言。(前端逻辑完成，暂无后端接口支持)。

# Update Log 2024.06.17
- 添加`ar-SA.js`阿拉伯语言，调整所有页面，兼容`RTL`模式。
- 将项目中的`金额`与`数量`分辨使用各自的格式化方案，以兼容不同币种，以及处理小数位数。
- 按照国际化定义语言导出对象key，便于处理国际化的时间及金额。
- 根据当前选择语言，格式化软件中所有日期时间格式。(后端只需要传时间戳，或将后端返回数据转为时间戳，再统一格式化)

# Update Log 2024.06.10
- 添加 `中文繁体`,并打开使用。通常不使用中文简体。

# Update Log 2024.06.09
- 注释所有页面的输入支付密码功能。(若客户需要，则开启)
- - 影响页面:`大宗`、`折价`、`短打`、`股权`、`提现`
- 隐藏修改支付密码页面。(若客户需要，则开启)
- 统一处理杠杆。影响页面：所有使用杠杆功能的页面。
- 添加网络环境状态检测，在APP启动时检测一次网络环境，并启动网络变更监听。App在onHide时，停止监听。
- 在API请求前，执行网络状态检查。
- 部分页面添加下拉刷新。

# Update Log 2024.06.04
- 定义通用动画。
- 所有页面添加`fadeIn`、`fadeOut`。
- 部分组件添加动画效果。

# Update Log 2024.06.03
- `access`页面添加账密缓存。在切换登录或注册时，以及查看用户协议时触发。完善勾选记住密码与隐私协议的逻辑。
- 将`TradeStockItem`拆解为每种交易，单独组件。便于灵活设置每种交易的产品列表不同样式

# Update Log 2024.06.02
- `api`挂载全局，使用最初方式。
- `paths`挂在全局，使用变量或硬编码。
- 将样式相关从`util.js`移动到`theme.js`。

# Update Log 2024.05.23
- 跳转到客服，分为两种模式：
- - 上架：点击按钮，直接跳转到第三方客服页面；
- - 运行：点击按钮，进入软件内客服页面。
- 以上，皆在按钮事件中调用`util.js`文件的`linkCustomerService`函数，按照提示进行注释。
 
# Update Log 2024.05.22
- 更新`auth`照片上传逻辑。
- 变更 `avatar`头像上传逻辑，移除u-upload。

# Update Log 2024.05.16
~~添加`servicePush`页面，及相关逻辑。用于上架的客服系统。(更改客服系统，只需对应启用或注释`common/paths.js`相关代码)~~

# Update Log 2024.05.15
- 在`index.html`中添加媒体查询样式，使其桌面浏览器情况下，内容居中。(未真机测试)
- uniapp内置`scroll-view`不支持桌面端鼠标移动。

# Update Log 2024.05.14
- 添加AI交易

# Update Log 2024.05.13
- auth:保留并注释严格校验韩国证件号码，以及自动计算性别。
- 默认提供正反面照片上传。

# Update Log 2024.05.12
- Launch页面，竖向加载条功能

# Update Log 2024.05.09
- 首页的页首吸顶
- 语言切换移出header容器
- 首页添加IPO中签提醒


# Update Log 2024.05.05
- 添加股权交易

# Update Log 2024.05.03
- 日内交易，添加可用金额

# Update Log 2024.05.01
- 优化`access`页面，记住密码及用户隐私协议完整逻辑。
