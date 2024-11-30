<template>
	<view class="page">
		<view class="page" >
			<view class="header" style="background-image: url(/static/topbackground.jpg);">
				<view class="header-left">
						<img src="/static/img/logo.png" class="header-img">
				<!-- 	<img :src="$icon.laba" class="header-ring" @click="$u.route({url:'/pages/notification'});"> -->
				</view>
			<!-- 	<img src="/static/img/logo.png" class="header-img"> -->
				<view class="header-right">
					<img :src="$icon.sousuo" @click="$u.route({url:'/pages/search/index'});" class="header-search" style="margin-right: 20px;">
					<img :src="$icon.laba" class="header-ring" @click="$u.route({url:'/pages/notification'});">
					<img :src="$icon.chilun" @click="$u.route({url:'/pages/account/center'});" class="header-setting">

				</view>
			</view>
			<view style="display: flex;align-items: center;justify-content: center; ">
				<img src="/static/img/7.7349b6f4.png" class="banner"
					@click="$u.route({url:'/pages/market/overview'});">
			</view>

			<!-- 	<view class="title">機能</view> -->
			<view class="menu" style="background-color: #FFFFFF;">
				<view class="menu-item"     @click="$u.route({url:'/pages/trade/ipo/index'});">
					<image src="/static/btn_0.png" mode="aspectFit" :style="$theme.setImageSize(52)"></image>
				<view style="margin-top: 6px;">	IPO申し込み </view>
				</view>

				<view class="menu-item" @click="$u.route({url:'/pages/trade/day/index'});">
					<image src="/static/btn_1.png" mode="aspectFit" :style="$theme.setImageSize(52)"></image>
				<view style="margin-top: 6px;">	デイトレード</view>
				</view>
				<view class="menu-item" @click="$u.route({url:'/pages/trade/large/index'});">
					<image src="/static/btn_2.png" mode="aspectFit" :style="$theme.setImageSize(52)"></image>
				<view style="margin-top: 6px;">		大口取引</view>
				</view>

				<view class="menu-item" @click="$u.route({url:'/pages/trade/ea/index'});">
					<image src="/static/btn_3.png" mode="aspectFit" :style="$theme.setImageSize(52)"></image>
				<view style="margin-top: 6px;">		クオンツ取引</view>
				</view>

				<view class="menu-item" @click="$u.route({url:'/pages/trade/panqian/index'});">
					<image src="/static/btn_4.png" mode="aspectFit" :style="$theme.setImageSize(52)"></image>
					<view style="margin-top: 6px;">	市場前取引</view>
				</view>
				<view class="menu-item" @click="$u.route({url:'/pages/trade/dividend'});">
					<image src="/static/btn_5.png" mode="aspectFit" :style="$theme.setImageSize(52)"></image>
					<view style="margin-top: 6px;">	じかん外取引</view>
				</view>
				<view class="menu-item" @click="$u.route({url:'/pages/trade/otc'});">
					<image src="/static/btn_6.png" mode="aspectFit" :style="$theme.setImageSize(52)"></image>
				<view style="margin-top: 6px;">	OTC</view>
				</view>
				<view class="menu-item">
					<image src="/static/btn_7.png" mode="aspectFit" :style="$theme.setImageSize(52)"></image>
					<view style="margin-top: 6px;">お問合わせ</view>
				</view>
			</view>





			<u-picker :show="zhibiao_show" :columns="columns" @close="zhibiao_show=false" @cancel="zhibiao_show=false"
				cancelText="キャンセル" confirmText="確認する" @confirm="zhibiao_click"></u-picker>


			<view class="title">マーケット情報</view>

			<view class="top">
				<view class="top-foot">
					<view class="top-foot-item" v-for="(item,index) in top3_list">
						<view class="top-foot-box">
							<view class="top-foot-name">{{item.name}}</view>
							<view class="top-foot-price" :class="item.returnOfToday>=0?'red':'green'">{{item.price}}
								<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAgCAMAAABemGpIAAAAAXNSR0IArs4c6QAAAQhQTFRFAAAA/wAA/wAA/wBV/wBAzAAz2wBJ4wA56ABG6wA73wBA4QA85gBA6QBD4gA74wBC5QA+6AA+4gBC5QA74QA74gBA5AA85ABA4gBA4gA/5AA/4gA+5AA/4gA95AA95AA84wA/4wA+5QA+5AA+5QA/5AA+5QA94wA/5AA+5QA+5AA94wI+4wI95QI+4wI95AI+5AI+5AI95QI/4wI+5AI95AI/5AE/5AE+5AE+5QE95AE95AE+5AE+5AE+5AE+5AE+5AE+4wE+5AE+5AE+5AE+5AE+5AE+5AE+5QE+5AE+5AE+5AE+5AE+5AE+5AE+5AE+5AE+5AE+5AE+5AE+5AE+5AE+5AE+5AE+y48RSQAAAFd0Uk5TAAECAwQFBwkLDRARFBcaGx0hIycrLC8wNDU5PkFHS0xRUldeYWdsbnN0eYCBiImQlZabnaKnq7G2t7u8wMbIzdLV1tna3eHj5+nq7O3v8vP19/n6/P3+hOYpNgAAANhJREFUGBmVwYk2QmEYBdATUSKzEgmZp4oKCSlkHoqc93+T6q66q9v9h8/eUDpOQGy19RCGUKRO5iFUZMcmRLbY9T4DgblPOsoBWI3esOcAVkfsa8ZhsfJLVy0Eo4lHDjiFUYEe6zBI0+s1Cq3ZDw4pQWfkmj570DikX2MJSss/VLgbh0L4nkpZKJxR7W8NPhvUeZ7CkOk3al3AK3BFgx147NPkewEDYk0aVcbgClVpkYErR5tWEj0p2j1NwhF9ocA5HJcU2UbHLmW+5oHFBoVugzgpiaXwH221L+MJdLkO8AAAAABJRU5ErkJggg=="
									v-if="item.returnOfToday>=0">

								<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAgCAMAAABemGpIAAAAAXNSR0IArs4c6QAAARRQTFRFAAAAAP8AAICAVapVQICAM5lmKoCASZJtOY5xM5mAQJWAN5KAM5l3PJZ4OY6AM4yAPZJ5N5B6O5OAN5KAOI+AOpJ8OZWANJB8OZOANZR9NY+AN5F9OJB9N5F7NpJ9N5F+NpN8N5J8OZF8NpR8N5F+NpN+OJJ+OJJ9N5N+N5F9NpN9OJF8N5J8NpN9N5N8N5F+N5J9NpJ+N5J+N5J9N5F9N5J+N5J9NpJ8OJF9OJJ9N5F9N5J9NpJ9N5J9OJJ9N5J9N5J9N5N9N5J+N5J8NpJ9N5J8N5N9N5J9NpJ9N5J9N5J9N5J9N5N9N5J9NpJ9N5J9N5J9N5J9N5J9N5J9N5J9N5J9N5J9N5J9N5J9N5J9N5J9N5J9tDxDXAAAAFt0Uk5TAAECAwQFBgcJCgwODxESFBUXGhwgIyQnKCswMzc8PUFCRkhMT1VbYGFmaG1zdn2Cg4iKj5WYn6Slqqywsra8v8TIyc3O0dbY3N/g4+Tm6u3u8fP19/n6+/z9/h0cC3YAAADaSURBVBgZpcGFVgJRFAXQo6KgYmGCHdhF2QoGYGEMFpz//w9RwpnhxV3LvXFIsRX031EoA2D2iyLFXtTsUeJjGj8ClxTYQd24Q6tsJxrWaPMyipZjWsTxZ+CBRgdwm6/Q4LYPHgnqfc7Aq/uaWrvwmyxTI9eFNhtUex2DwimVVqEyVKLCEdQWq2xzH4ZGin6VOegE8/TZh170jR5XARhs0c2ZgNE5XdZhNvLElhPYLLPpcRBWadZVF2AXKvBXEhKxd9bc9EBkm2R5CjIdF+QmpCLPZ5BbGsa/fQMQlu7RIddlYAAAAABJRU5ErkJggg=="
									v-else>
							</view>
							<view class="top-foot-num" :class="item.returnOfToday>=0?'red':'green'">
								{{item.changeOfToday}}({{(item.returnOfToday*100).toFixed(2)}}%)
							</view>
						</view>
					</view>

				</view>


				<view class="top-header">
					<view class="top-one">
						<view class="top-select" @click="zhibiao_show=true"><span>{{zhibiao_name}}</span>
							<img
								src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAiCAMAAAAwC5qWAAAAAXNSR0IArs4c6QAAAG9QTFRFAAAA/wAA/wAA4QA86AA64wBC5gA84QA84QA75QA95QA+5gA/4gA+5AA95QA94wA/5AA+4wI+5AI+5AE+4wE+5AE95AE+5AE+5QE/4wE+5AE+5AE+5AE+5AE+5AE+5AE+5AE+5AE+5AE+5AE+5AE+29Nq0gAAACR0Uk5TAAECERYbHiIrMjo9PktPbXuAj7K5w8bI1NXZ5uz09fj5+vv8lkMaAAAAALdJREFUSMedy1cSwjAQA1ATSmih9xbK3v+MrAEPTuLYq9WXNKNnDCczijjUX5fnOYpH++epsKWzI84K05Mrm/uQW04E+48mWnIdEOx/mhZ2bFDv9C23q3fAvNOP2Xdjvq4x39SID2m5D2upb9My364lPqbTfhrVKZ/ScZ/WMS/R7V6m2R9DXqrDXq5DHtFNj+m6R3XV49r3Gu35l0Z7XqWrHte+1+i/12nntZr9luhSGHWycdGNHt51REGZflzGSwAAAABJRU5ErkJggg==">
						</view>
						<view class="top-right" :class="kline_data.rate>=0?'red':'green'">
							{{kline_data.rate_num}}({{kline_data.rate}}%)<span>{{kline_data.close}}</span>
							<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAgCAMAAABemGpIAAAAAXNSR0IArs4c6QAAAQhQTFRFAAAA/wAA/wAA/wBV/wBAzAAz2wBJ4wA56ABG6wA73wBA4QA85gBA6QBD4gA74wBC5QA+6AA+4gBC5QA74QA74gBA5AA85ABA4gBA4gA/5AA/4gA+5AA/4gA95AA95AA84wA/4wA+5QA+5AA+5QA/5AA+5QA94wA/5AA+5QA+5AA94wI+4wI95QI+4wI95AI+5AI+5AI95QI/4wI+5AI95AI/5AE/5AE+5AE+5QE95AE95AE+5AE+5AE+5AE+5AE+5AE+4wE+5AE+5AE+5AE+5AE+5AE+5AE+5QE+5AE+5AE+5AE+5AE+5AE+5AE+5AE+5AE+5AE+5AE+5AE+5AE+5AE+5AE+5AE+y48RSQAAAFd0Uk5TAAECAwQFBwkLDRARFBcaGx0hIycrLC8wNDU5PkFHS0xRUldeYWdsbnN0eYCBiImQlZabnaKnq7G2t7u8wMbIzdLV1tna3eHj5+nq7O3v8vP19/n6/P3+hOYpNgAAANhJREFUGBmVwYk2QmEYBdATUSKzEgmZp4oKCSlkHoqc93+T6q66q9v9h8/eUDpOQGy19RCGUKRO5iFUZMcmRLbY9T4DgblPOsoBWI3esOcAVkfsa8ZhsfJLVy0Eo4lHDjiFUYEe6zBI0+s1Cq3ZDw4pQWfkmj570DikX2MJSss/VLgbh0L4nkpZKJxR7W8NPhvUeZ7CkOk3al3AK3BFgx147NPkewEDYk0aVcbgClVpkYErR5tWEj0p2j1NwhF9ocA5HJcU2UbHLmW+5oHFBoVugzgpiaXwH221L+MJdLkO8AAAAABJRU5ErkJggg=="
								v-if="kline_data.rate>=0">

							<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAgCAMAAABemGpIAAAAAXNSR0IArs4c6QAAARRQTFRFAAAAAP8AAICAVapVQICAM5lmKoCASZJtOY5xM5mAQJWAN5KAM5l3PJZ4OY6AM4yAPZJ5N5B6O5OAN5KAOI+AOpJ8OZWANJB8OZOANZR9NY+AN5F9OJB9N5F7NpJ9N5F+NpN8N5J8OZF8NpR8N5F+NpN+OJJ+OJJ9N5N+N5F9NpN9OJF8N5J8NpN9N5N8N5F+N5J9NpJ+N5J+N5J9N5F9N5J+N5J9NpJ8OJF9OJJ9N5F9N5J9NpJ9N5J9OJJ9N5J9N5J9N5N9N5J+N5J8NpJ9N5J8N5N9N5J9NpJ9N5J9N5J9N5J9N5N9N5J9NpJ9N5J9N5J9N5J9N5J9N5J9N5J9N5J9N5J9N5J9N5J9N5J9N5J9N5J9tDxDXAAAAFt0Uk5TAAECAwQFBgcJCgwODxESFBUXGhwgIyQnKCswMzc8PUFCRkhMT1VbYGFmaG1zdn2Cg4iKj5WYn6Slqqywsra8v8TIyc3O0dbY3N/g4+Tm6u3u8fP19/n6+/z9/h0cC3YAAADaSURBVBgZpcGFVgJRFAXQo6KgYmGCHdhF2QoGYGEMFpz//w9RwpnhxV3LvXFIsRX031EoA2D2iyLFXtTsUeJjGj8ClxTYQd24Q6tsJxrWaPMyipZjWsTxZ+CBRgdwm6/Q4LYPHgnqfc7Aq/uaWrvwmyxTI9eFNhtUex2DwimVVqEyVKLCEdQWq2xzH4ZGin6VOegE8/TZh170jR5XARhs0c2ZgNE5XdZhNvLElhPYLLPpcRBWadZVF2AXKvBXEhKxd9bc9EBkm2R5CjIdF+QmpCLPZ5BbGsa/fQMQlu7RIddlYAAAAABJRU5ErkJggg=="
								v-else>
						</view>
					</view>
					<view class="top-two">
						<span>高値：{{kline_data.high}}</span><span>安値：{{kline_data.low}}</span><span>始値：{{kline_data.open}}</span><span>終値：{{kline_data.close_end}}</span>
					</view>
				</view>
				<view id="chart" class="top-middle">
					<view class="chart" id="chart-type-k-line" style="width: 100%;height: 134px;">
					</view>
				</view>


			
			</view>

			<view class="title">人気株</view>
			<view class="box" style="margin: 0 10px;"><!----><!----><!---->
				<view class="box-item" v-for="(item,index) in list" @click="link(item.code)">
					<view class="item-title">
						<img :src="item.is_collected==1?$icon.ysc:$icon.sc" @click.stop="handleUnFollow(item.code)">

						<view class="name-title">{{item.name}}<span
								style="font-size: 12px;color: #e33262;">{{item.code}}</span></view>
					</view>
					<view class="item-price">{{item.close}}
						<img :src="item.rate>=0?$icon.up:$icon.down">
					</view>
					<view class="item-num" :class="item.rate>=0?'red':'green'">
						{{item.rate_num}}<span>{{item.rate}}%</span>
					</view>
				</view>
			</view>
			<view class="title">東証33業種トレンド </view>
			<view class="foot">
				<view class="foot-left">
					<view class="foot-left-title">上昇{{dz33.zhang}}<span>下落{{dz33.die}}</span></view>
					<!---->
					<view class="foot-box" v-if="!dz33_show">
						<view class="foot-item" :style="'width:'+dz33.zhang/33*100+'%'">
							<view class="foot-redBox">
								<span class="foot-redBox-line" v-for="(item,index) in dz33.zhang_list"
									v-if="item.returnOfToday>=0"
									:style="getdz_style(dz33.zhang,item.returnOfToday)"></span>

							</view>
							<view class="foot-redTxt">
								<span class="foot-redTxt-txt" v-for="(item,index) in dz33.zhang_list"
									v-if="item.returnOfToday>0&&index<=8&&index%2==0">{{item.name}}</span>
							</view>
						</view>
						<view class="foot-item" :style="'width:'+dz33.die/33*100+'%'">
							<view class="foot-greenTxt">
								<span class="foot-greenTxt-txt" v-for="(item,index) in dz33.die_list"
									v-if="item.returnOfToday<0&&index%2==0&&(index>=dz33.die_list.length-10)">{{item.name}}</span>
							</view>
							<view class="foot-greenBox">
								<span class="foot-greenBox-line" v-for="(item,index) in dz33.die_list"
									v-if="item.returnOfToday<0"
									:style="getdz_style(dz33.die,item.returnOfToday*-1)"></span>

							</view>
						</view>
					</view>
					<view class="foot-box" v-if="dz33_show">
						<view class="foot-item" :style="'width:100%'">
							<view class="foot-redBox">
								<span class="foot-redBox-line" v-for="(item,index) in dz33.zhang_list"
									v-if="item.returnOfToday>=0"
									:style="getdz_style(dz33.zhang,item.returnOfToday)"></span>

							</view>
							<view class="foot-redTxt">
								<span class="foot-redTxt-txt" v-for="(item,index) in dz33.zhang_list"
									v-if="item.returnOfToday>0&&index<=8&&index%2==0">{{item.name}}</span>
							</view>
						</view>

					</view>
				</view>
				<view class="foot-right">
					<view class="foot-right-item" @click="dz33_show_click">上下10桁</view>
					<view class="foot-right-item foot-right-on" @click="dz33_show_click">あらゆる業種</view>
				</view>
			</view>
			<view class="title">人気の情報</view>
			<view class="news">
				<view class="list" v-for="(item,index) in news" @click="open(item.url)">
					<view class="list-line"></view>
					<view class="list-info">
						<view class="list-title">{{item.title}}</view>
						<view class="list-date">{{item.updated_at}}</view>
					</view>
				</view>

				<!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!---->
				<view class="more" @click="$u.route({type:'switchTab',url:'/pages/news'});">もっとニュースを見る<img
						src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAsCAYAAAB/nHhDAAAAAXNSR0IArs4c6QAAA8NJREFUWEetl01oVFcUx/9nxg9qk7gQwVJbBCMUdBHeeUkI0Xagia0GJVgVF4pFsQv7YbordtFuWulGS0sp9MONFFHxGylFI2n9QDLv3kwH3disoqAtSKdBG4aZ945zhxd5uc4kb3hzdzPz7u/HPfe8c86Q67obROQHACIiQ1rrM2jiIma+B2B5yAyI6D3P835ulsMWGK4AGFJKfdMMCbmuu1lETgOYFwWKyKda6y+TSsgAHMfZRESnACy0gIeUUgeTSKoCszo7O/uCIDgH4EUL+K1S6kAYuoZdzwRmp+u6vSJyCcBiK1xHtdb7AASNGmYIwnAxEf0GYEkURkQnWlpado6MjJQbkTwnCMO1OgiCKwCWWZKLhUJh2/j4eDGupKYgPEk7EQ0DeNUK15VyuTyYz+efxJHUFZjNzGzg5iSrLNgNAANKqf/mkswqCMO1LAiCywDWWDCVTqffGh0dfTSbZE6B2dzV1bXE931z8WzB7gDoV0o9qCeJJTCbu7u728rlsknhtRZsHMCbSqmJWpLYgvBOFgEwL2O/BZvwfb8vl8v9ZUsaEpjN7e3tC9va2k4S0WYL9pCI+j3Puz0jtefKglq/ZzKZeZOTk8eIaIf1+6MgCN4eGxvzpr9v+AQRYIqZTaPaa0kmwxS+br5PIqjuZ+avAXxkSf4nokHP8y4nFVS5rut+ISJ2WS+KyMamCMIM+6TSTw5ZJ7nVTMGHAOw225wQOY7zLhEdte60AOD1xCdwHGcLEZ0EkI6E50kqlVqfzWZvJhIw8/pKfboIYEEEXiSiTSaDEqUpM5uaZAqgKR/TyxeRbVrrs4leNGZ2KvG9avVuIaLdnucdS1QqmPk1AH8AWBoFicgHWuvvEhW7jo6OFel02pSAly3QQaWU/Q5UH4l9ycz8UqXuXwOw0oJ/pZQyL1nNFUsQdrTfAay2KN8rpfbXg8c6QW9vb+vU1NQwEXVaoF+UUrvmmvhmPUFPT88LxWLxVyJ6w4Kfb21t3RpnCKsrYOb5YXvcOCPtiIYLhcJA3OGrnsA0k+MAttvVsVQq9cUduureATP/VKNT/en7fiaXy5kiFnvVGn4PE9HHFuFuqVRal8/n/4lNDh+cIXAc5zMi+tyCTKRSqbXZbNb8l2t4PRM4jjNEREcswt++76+rNe/ENVUFruvuERET9+iJ/hWRjNY6HxdW6zkzFQwCMH8CU5EHHotIv9b6VhJ4NYuY2cyUr0RA1WlAa23KceJlBPcj1bFMRO94nnchMXk6i5h5oCL40XwWkfej3agZkqe8IVmNFCHaMwAAAABJRU5ErkJggg==">
				</view>
			</view>
		</view>
		<!-- <HeaderPrimary isSearch :title="$lang.TABBAR_HOME" color="#FFFFFF"> </HeaderPrimary> -->



		<!-- <TrackList></TrackList> -->

		<!-- <MarketNews></MarketNews> -->



		<!-- <view>
			<view style="padding:0 20rpx;">
			</view>

			<MarketHot ref="hot"></MarketHot>
		</view> -->

		<!-- IPO申购成功弹层 -->
		<!-- <IPOSuccessAlert></IPOSuccessAlert> -->

	</view>
</template>

<script>
	// import HeaderPrimary from '@/components/header/HeaderPrimary.vue';
	import ButtonGroup from './components/ButtonGroup.vue';
	import TitleSecond from '@/components/title/TitleSecond.vue';
	import TrackList from './components/TrackList.vue';
	// import MarketNews from './components/MarketNews.vue';
	// import MarketHot from './components/MarketHot.vue';
	// import IPOSuccessAlert from './components/IPOSuccessAlert.vue';

	import {
		init,
		registerLocale,
		dispose
	} from '@/common/klinecharts.min.js';

	export default {
		components: {
			// HeaderPrimary,
			ButtonGroup,
			TitleSecond,
			TrackList,
			// MarketNews,
			// MarketHot,
			// IPOSuccessAlert,
		},
		data() {
			return {
				isAnimat: false, // 页面动画	
				yan_show: true,
				userInfo: {},
				zhibiao_show: false,
				kLineChart: null, // Kline实例化
				lishi: [], // k綫數據
				list: '',
				kline_data: "",
				top3_list: "",
				dz33: "",
				zhibiao_name: '日経225',
				columns: [
					['日経225', '東証株価指数', 'TOPIX 100 Index',
						'TOPIX 500 Index', 'TOPIX 1000 Index', 'TOPIX Large 70 Index', 'TOPIX Mid 400 Index',
						'TOPIX Small Index', 'USD/JPY'
					]
				],
				dz33_show: false,
				news: "",
				timer: null,
			}
		},
		computed: {
			// 今日
			setToday() {
				return this.$util.formatToday(new Date());
			}
		},

		onLoad() {
			setTimeout(() => {
				if (!this.kLineChart) {
					this.kLineChart = init('chart-type-k-line');
					this.kLineInit(); // 初始化Kline
				}
				this.genKLineData(); // 获取并生成KLine数据	
			}, 50);
			this.getNews()

		},
		onShow() {
			this.getAccountInfo()
			this.getToplishi()
			this.getList()
			this.top3()
			this.onSetTimeout()
			this.isAnimat = true;
		},
		onReady() {},
		onHide() {
			this.isAnimat = false;
			this.closeAll();
			if (this.timer) this.clearTimer();

		},
		onUnload() {
			this.closeAll();
			if (this.timer) this.clearTimer();
		},
		deactivated() {
			this.closeAll();
			if (this.timer) this.clearTimer();
		},

		methods: {
			onSetTimeout() {
				this.timer = setInterval(() => {
					console.log("setInterval");
					this.getToplishi()
					this.getList()
					this.top3()
				}, 5000);
			},
			clearTimer() {
				if (this.timer) {
					clearInterval(this.timer);
					this.timer = null;
					console.log('clearTimer', this.timer);
				}
			},
			open(url) {
				window.open(url)
			},
			dz33_show_click() {
				this.dz33_show = !this.dz33_show
				this.$forceUpdate()
			},
			async getNews() {
				// uni.showLoading({
				// 	title: this.$lang.REQUEST_DATA,
				// });
				const result = await this.$http.post(`api/goods/get_news`, {
					current: 1
				})
				console.log(result);
				this.news = !result || result.length <= 0 ? [] : result.map(item => {
					return {
						title: item.title,
						url: item.url,
						updated_at: item.updated_at,
						pic: item.pic,
						created_at: item.created_at
					}
				});
			},
			getdz_style(zhang_num, returnOfToday) {
				let bfb = 100 / zhang_num;
				return 'width: calc(' + bfb + '% - 4px);height: ' + returnOfToday * 100 * 15 + '%;'
			},
			async top3() {
				// uni.showLoading({
				// 	title: this.$lang.REQUEST_DATA,
				// });
				const result = await this.$http.get(`api/goods/top3`, {
					current: this.curTab
				})
				console.log(`top3:`, result);
				this.top3_list = result.top3
				this.dz33 = result.dz33
			},
			async getList() {
				// uni.showLoading({
				// 	title: this.$lang.REQUEST_DATA,
				// });
				const result = await this.$http.get(`api/goods/top2`, {
					current: 2
				})
				console.log(`hot:`, result);
				this.list = result
			},
			setStyle(val) {
				return {
					...val ? this.$theme.LG_PRIMARY : this.$theme.LG_SECOND,
					color: val ? '#FFFFFF' : this.$theme.PRIMARY,
					borderRadius: `44rpx`,
					border: `1px solid ${val? this.$theme.TRANSPARENT:'#5A5A5A'}`,
				}
			},
			zhibiao_click(e) {
				console.log(e)
				this.zhibiao_name = e.value[0]
				this.zhibiao_show = false
				this.getToplishi()
			},
			// 关闭子組件 websocket 及定時器
			closeAll() {
				if (this.$refs.hot) this.$refs.hot.disconnect();
			},
			async getAccountInfo() {
				// uni.showLoading({
				// 	title: this.$lang.API_GET_ACCOUNT_INFO
				// });
				const result = await this.$http.get(`api/user/info`);
				if (!result) return false;
				this.userInfo = result;
				this.cardData = {
					value1: this.userInfo.totalZichan || 0,
					value2: this.userInfo.money || 0,
					value3: this.userInfo.freeze || 0,
				};
			},
			async getToplishi() {

				const result = await this.$http.post(`api/Product/lishis`, {
					name: this.zhibiao_name
				});
				if (!result) return false;



				console.log(`kline:`, result);
				this.lishi = result.kline;
				this.kLineChart.setPriceVolumePrecision(2, 0)
				this.kLineChart.applyNewData(result.kline);
				this.kline_data = result.data
			},
			kLineInit() {
				this.kLineChart.setStyles({
					"candle": {
						"type": "candle_solid",
						"tooltip": {
							"showRule": "none",
						},
						area: {
							lineSize: 2,
							lineColor: this.$theme.PRIMARY,
							value: 'close',
							backgroundColor: [{
								offset: 0,
								color: '#ffbfb919'
							}, {
								offset: 1,
								color: this.$theme.PRIMARY,
							}]
						},
						bar: {
							downColor: '#17b780',
							upColor: '#ea4445',
							noChangeColor: '#ffbfb9',
							downBorderColor: '#17b780',
							upBorderColor: '#ea4445',
							noChangeBorderColor: '#ffbfb9',
							upWickColor: '#ea4445',
							downWickColor: '#17b780',
							noChangeWickColor: '#ffbfb9'
						},
					},
				});
				// this.kLineChart.createIndicator('MA', false);
			},
			async handleUnFollow(code) {
				const result = await this.$http.post(`api/user/collect_edit`, {
					code: code,
				});
				this.getList();
			},
			// 跳转到股票详情
			link(code) {
				if (!code || code == '') return false;
				uni.navigateTo({
					url: `${this.$paths.STOCK_OVERVIEW}?code=${code}`
				});
			},
			zichan() {
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: '/pages/transaction/index'
				});
			},
			shouye() {
				uni.navigateTo({
					url: '/pages/search/index'
				})
			},
			kefu() {
				uni.navigateTo({
					url: '/pages/service'
				})
			},
			linkDeposit() {
				uni.navigateTo({
					url: this.$paths.ACCOUNT_DEPOSIT
				})
			},
			linkWithdraw() {
				uni.navigateTo({
					url: this.$paths.ACCOUNT_WITHDRAW
				})
			},
			linkAuth() {
				uni.navigateTo({
					url: this.$paths.ACCOUNT_AUTH
				})
			},
			linkService() {
				this.$util.linkCustomerService();
			},

			// 跳转到市场的热门股票
			linkAllList() {
				uni.reLaunch({
					url: this.$paths.MARKET_OVERVIEW + `?type=1`,
				})
			},
		},
	}
</script>
<style type="text/css">
	@charset "UTF-8";

	.page {
		background: #f7f9f8;
		min-height: 100vh;
		box-sizing: border-box;
		padding-bottom: 67px
	}

	.header {
		height: 70px;
		padding: 0 8px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		background: #fff
	}

	.header .header-left {
		width: 61px;
		height: 70px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.header .header-img {
		width: 159px;
		height: 52px;
		object-fit: contain
	}

	.header .header-right {
		width: 61px;
		height: 70px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		justify-content: flex-end
	}

	.header .header-ring {
		width: 20px;
		height: 20px
	}

	.header .header-search {
		width: 19px;
		height: 19px
	}

	.header .header-setting {
		width: 21px;
		height: 21px;
		margin-left: 20px
	}

	.banner {
		height: 100px;
		width: 100%;

	}

	.title {
		height: 39px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 0 6px;
		font-weight: 600;
		font-size: 20px;
		color: #212121
	}

	.menu {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-wrap: wrap;
		flex-wrap: wrap;
		padding: 0 1px
	}

	.menu .menu-item {
		width: calc(25% - 9px);
		height: 59px;
		border-radius: 6px;
	/* 	margin: 0 4px 6px 4px; */
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-weight: 400;
		font-size: 12px;
	/* 	color: #37927d; */
			color: #e4013e;
		line-height: 16px
	}

	.menu .menu-item img {
		width: 20px;
		height: 20px;
	/* 	margin-bottom: 8px */
	}

	.top {
		background: #fff
	}

	.top .top-header {
		height: 59px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		padding: 0 8px
	}

	.top .top-header .top-one {
		height: 24px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between
	}

	.top .top-header .top-one .top-select {
		width: 125px;
		height: 24px;
		background: #fff;
		box-shadow: 0 1px 6px 0 rgba(228, 1, 62, .26);
		border-radius: 5px;
		border: 1px solid #e4013e;
		padding: 0 7px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between
	}

	.top .top-header .top-one .top-select span {
		width: 88px;
		height: 17px;
		font-weight: 400;
		font-size: 12px;
		color: #e4013e;
		line-height: 17px;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap
	}

	.top .top-header .top-one .top-select img {
		width: 16px;
		height: 8px
	}

	.top .top-header .top-one .top-right {
		font-weight: 600;
		font-size: 12px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		justify-content: flex-end
	}

	.top .top-header .top-one .top-right span {
		font-weight: 600;
		font-size: 15px;
		padding-left: 5px
	}

	.top .top-header .top-one .top-right img {
		width: 15px;
		height: 10px;
		margin-left: 7px
	}

	.top .top-header .top-one .red {
		color: #e04e50
	}

	.top .top-header .top-one .red span {
		color: #e04e50
	}

	.top .top-header .top-one .green {
		color: #37927d
	}

	.top .top-header .top-one .green span {
		color: #37927d
	}

	.top .top-header .top-two {
		height: 22px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.top .top-header .top-two span {
		font-weight: 400;
		font-size: 8px;
		color: #333;
		margin-left: 7px
	}

	.top .top-middle {
		width: 100%;
		height: 139px
	}

	.top .top-foot {
		height: 104px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		border-bottom: 1px solid #ebebeb
	}

	.top .top-foot .top-foot-item {
		width: 33.3333333333%;
		height: 104px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.top .top-foot .top-foot-box {
		width: calc(100% - 1px);
		height: 104px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 0 5px;
		box-sizing: border-box
	}

	.top .top-foot .top-foot-line {
		width: 1px;
		height: 81px;
		background: #85a39b
	}

	.top .top-foot .top-foot-name {
		font-weight: 600;
		font-size: 11px;
		color: #000;
		line-height: 15px;
		letter-spacing: 0.5px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		text-align: center
	}

	.top .top-foot .top-foot-price {
		height: 21px;
		font-weight: 400;
		font-size: 15px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		margin-top: 2px
	}

	.top .top-foot .top-foot-price img {
		width: 11px;
		height: 8px;
		margin-left: 1px
	}

	.top .top-foot .top-foot-num {
		height: 13px;
		font-weight: 400;
		font-size: 9px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		margin-top: 5px
	}

	.top .top-foot .green {
		color: #37927d
	}

	.top .top-foot .red {
		color: #e4013e
	}

	.box {
		background: #fff;
		border-top: 1px solid #ebebeb
	}

	.box .box-item {
		padding: 11px 6px;
		border-bottom: 1px solid #ebebeb;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.box .box-item .item-title {
		width: 50%;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.box .box-item .item-title img {
		width: 15px;
		height: 15px;
		margin-right: 7px
	}

	.box .box-item .item-title .name-title {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-weight: 600;
		font-size: 12px;
		color: #333;
		line-height: 17px
	}

	.box .box-item .item-title .name-title span {
		font-weight: 400;
		font-size: 7px;
		color: #333;
		line-height: 10px;
		margin-top: 1px
	}

	.box .box-item .item-price {
		width: 25%;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		justify-content: flex-end;
		font-weight: 500;
		font-size: 17px;
		color: #0f0f0f
	}

	.box .box-item .item-price img {
		width: 10px;
		height: 9px;
		margin-left: 4px
	}

	.box .box-item .item-num {
		width: 25%;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: end;
		-webkit-align-items: flex-end;
		align-items: flex-end;
		font-weight: 600;
		font-size: 11px;
		line-height: 16px
	}

	.box .box-item .item-num span {
		font-weight: 600;
		font-size: 11px
	}

	.box .box-item .green {
		color: #37927d
	}

	.box .box-item .green span {
		color: #37927d
	}

	.box .box-item .red {
		color: #e4013e
	}

	.box .box-item .red span {
		color: #e4013e
	}

	.news {
		background: #fff
	}

	.news .list {
		height: 61px;
		border-bottom: 1px solid #ebebeb;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 0 7px
	}

	.news .list .list-line {
		width: 3px;
		height: 44px;
		background: #e4013e;
		margin-right: 4px
	}

	.news .list .list-info {
		width: calc(100% - 8px);
		height: 60px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center
	}




	.page {
		background: #f7f9f8;
		min-height: 100vh;
		box-sizing: border-box;
		padding-bottom: 65px
	}

	.header {
		height: 68px;
		padding: 0 8px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		background: #fff
	}

	.header .header-left {
		width: 59px;
		height: 68px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.header .header-img {
		width: 153px;
		height: 50px;
		object-fit: contain
	}

	.header .header-right {
		width: 59px;
		height: 68px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		justify-content: flex-end
	}

	.header .header-ring {
		width: 19px;
		height: 20px
	}

	.header .header-search {
		width: 19px;
		height: 19px
	}

	.header .header-setting {
		width: 20px;
		height: 20px;
		margin-left: 19px
	}

	.banner {
		height: 74px
	}

	.title {
		height: 40px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		margin-left: 10px;
		padding: 0 6px;
		font-weight: 600;
		font-size: 14px;
		color: #212121
	}

	.menu {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-wrap: wrap;
		flex-wrap: wrap;
		padding: 0 1px
	}

	.menu .menu-item {
		width: calc(25% - 9px);
		height: 57px;
		background: #fff;
		border-radius: 3px;
		margin: 0 4px 6px 4px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-weight: 400;
		font-size: 11px;
		color: #e4013e;
		line-height: 16px
	}

	/* .menu .menu-item img {
		width: 20px;
		height: 20px;
		margin-bottom: 8px
	} */

	.top {
		background: #fff
	}

	.top .top-header {
		height: 57px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		padding: 0 8px
	}

	.top .top-header .top-one {
		height: 24px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between
	}

	.top .top-header .top-one .top-select {
		width: 121px;
		height: 24px;
		background: #fff;
		box-shadow: 0 1px 6px 0 rgba(228, 1, 62, .26);
		border-radius: 5px;
		border: 1px solid #e4013e;
		padding: 0 7px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between
	}

	.top .top-header .top-one .top-select span {
		width: 85px;
		height: 16px;
		font-weight: 400;
		font-size: 12px;
		color: #e4013e;
		line-height: 16px;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap
	}

	.top .top-header .top-one .top-select img {
		width: 15px;
		height: 8px
	}

	.top .top-header .top-one .top-right {
		font-weight: 600;
		font-size: 12px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		justify-content: flex-end
	}

	.top .top-header .top-one .top-right span {
		font-weight: 600;
		font-size: 15px;
		padding-left: 5px
	}

	.top .top-header .top-one .top-right img {
		width: 14px;
		height: 10px;
		margin-left: 7px
	}

	.top .top-header .top-one .red {
		color: #e04e50
	}

	.top .top-header .top-one .red span {
		color: #e04e50
	}

	.top .top-header .top-one .green {
		color: #37927d
	}

	.top .top-header .top-one .green span {
		color: #37927d
	}

	.top .top-header .top-two {
		height: 22px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.top .top-header .top-two span {
		font-weight: 400;
		font-size: 8px;
		color: #333;
		margin-left: 7px
	}

	.top .top-middle {
		width: 100%;
		height: 134px
	}

	.top .top-foot {
		height: 100px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		border-bottom: 1px solid #ebebeb
	}

	.top .top-foot .top-foot-item {
		width: 33.3333333333%;
		height: 100px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.top .top-foot .top-foot-box {
		width: calc(100% - 1px);
		height: 100px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 0 5px;
		box-sizing: border-box
	}

	.top .top-foot .top-foot-line {
		width: 1px;
		height: 78px;
		background: #85a39b
	}

	.top .top-foot .top-foot-name {
		font-weight: 600;
		font-size: 11px;
		color: #000;
		line-height: 15px;
		letter-spacing: 1px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		text-align: center
	}

	.top .top-foot .top-foot-price {
		height: 21px;
		font-weight: 400;
		font-size: 15px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		margin-top: 2px
	}

	.top .top-foot .top-foot-price img {
		width: 11px;
		height: 8px;
		margin-left: 1px
	}

	.top .top-foot .top-foot-num {
		height: 12px;
		font-weight: 400;
		font-size: 9px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		margin-top: 5px
	}

	.top .top-foot .green {
		color: #37927d
	}

	.top .top-foot .red {
		color: #e4013e
	}

	.box {
		background: #fff;
		border-top: 1px solid #ebebeb
	}

	.box .box-item {
		padding: 11px 6px;
		border-bottom: 1px solid #ebebeb;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.box .box-item .item-title {
		width: 50%;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.box .box-item .item-title img {
		width: 15px;
		height: 15px;
		margin-right: 7px
	}

	.box .box-item .item-title .name-title {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-weight: 600;
		font-size: 12px;
		color: #333;
		line-height: 16px
	}

	.box .box-item .item-title .name-title span {
		font-weight: 400;
		font-size: 7px;
		color: #333;
		line-height: 10px;
		margin-top: 1px
	}

	.box .box-item .item-price {
		width: 25%;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		justify-content: flex-end;
		font-weight: 500;
		font-size: 16px;
		color: #0f0f0f
	}

	.box .box-item .item-price img {
		width: 10px;
		height: 9px;
		margin-left: 4px
	}

	.box .box-item .item-num {
		width: 25%;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: end;
		-webkit-align-items: flex-end;
		align-items: flex-end;
		font-weight: 600;
		font-size: 11px;
		line-height: 16px
	}

	.box .box-item .item-num span {
		font-weight: 600;
		font-size: 11px
	}

	.box .box-item .green {
		color: #37927d
	}

	.box .box-item .green span {
		color: #37927d
	}

	.box .box-item .red {
		color: #e4013e
	}

	.box .box-item .red span {
		color: #e4013e
	}

	.news {
		background: #fff
	}

	.news .list {
		height: 59px;
		border-bottom: 1px solid #ebebeb;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 0 7px
	}

	.news .list .list-line {
		width: 3px;
		height: 42px;
		background: #e4013e;
		margin-right: 4px
	}

	.news .list .list-info {
		width: calc(100% - 8px);
		height: 58px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center
	}

	.news .list .list-title {
		height: 28px;
		font-weight: 400;
		font-size: 12px;
		color: #535353;
		line-height: 14px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		-webkit-line-clamp: 2
	}

	.news .list .list-date {
		font-weight: 400;
		font-size: 11px;
		color: #999;
		line-height: 14px;
		margin-top: 4px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		justify-content: flex-end
	}

	.news .more {
		height: 39px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		justify-content: flex-end;
		padding: 0 14px;
		font-weight: 400;
		font-size: 12px;
		color: #666
	}

	.news .more img {
		width: 6px;
		height: 11px;
		margin-left: 13px
	}

	.foot {
		height: 201px;
		background: #fff;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.foot .foot-left {
		width: calc(100% - 28px);
		height: 201px;
		position: relative
	}

	.foot .foot-left .foot-left-title {
		height: 18px;
		font-weight: 600;
		font-size: 13px;
		color: #e04e50;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		position: absolute;
		left: 5px;
		top: 1px
	}

	.foot .foot-left .foot-left-title span {
		font-weight: 600;
		font-size: 13px;
		color: #37927d;
		padding-left: 26px
	}

	.foot .foot-right {
		width: 28px;
		height: 201px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column
	}

	.foot .foot-right .foot-right-item {
		width: 28px;
		height: 100px;
		background: #9ad3c5;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-weight: 400;
		font-size: 11px;
		color: #e4013e;
		line-height: 16px;
		-webkit-writing-mode: vertical-rl;
		writing-mode: vertical-rl
	}

	.foot .foot-right .foot-right-on {
		background: #ff95b2;
		color: #37927d
	}

	.foot .foot-box {
		height: 201px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 0 6px
	}

	.foot .foot-item {
		/* 	width: 50%; */
		height: 201px
	}

	.foot .foot-redBox {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		height: 100px;
		-webkit-box-align: end;
		-webkit-align-items: flex-end;
		align-items: flex-end
	}

	.foot .foot-redBox .foot-redBox-line {

		background: #e04e50;
		border: 1px solid #000;
		margin: 0 2px;
		display: block
	}

	.foot .foot-redTxt {
		width: 100%;
		height: 100px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		padding-top: 10px;
		box-sizing: border-box
	}

	.foot .foot-redTxt .foot-redTxt-txt {
		font-weight: 400;
		font-size: 11px;
		color: #37927d;
		line-height: 11px;
		margin-right: 13px;
		-webkit-writing-mode: vertical-rl;
		writing-mode: vertical-rl
	}

	.foot .foot-greenBox {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		height: 100px;
		-webkit-box-align: start;
		-webkit-align-items: flex-start;
		align-items: flex-start;
		justify-content: flex-end;
	}

	.foot .foot-greenBox .foot-greenBox-line {

		background: #37927d;
		border: 1px solid #000;
		margin: 0 2px;
		display: block
	}

	.foot .foot-greenTxt {
		width: 100%;
		height: 100px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: end;
		-webkit-align-items: flex-end;
		align-items: flex-end;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		justify-content: flex-end;
		padding-bottom: 10px;
		box-sizing: border-box
	}

	.foot .foot-greenTxt .foot-greenTxt-txt {
		font-weight: 400;
		font-size: 11px;
		color: #e4013e;
		line-height: 11px;
		margin-left: 13px;
		-webkit-writing-mode: vertical-rl;
		writing-mode: vertical-rl
	}

	.foot .foot-long {
		width: 100%;
		height: 201px
	}

	.foot .foot-longBox {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		height: 100px;
		-webkit-box-align: end;
		-webkit-align-items: flex-end;
		align-items: flex-end
	}

	.foot .foot-longBox .foot-redBox-line {
		width: calc(10% - 4px);
		background: #e04e50;
		border: 1px solid #000;
		margin: 0 2px;
		display: block
	}

	.foot .foot-longTxt {
		width: 100%;
		height: 100px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		padding-top: 10px;
		box-sizing: border-box
	}

	.foot .foot-longTxt .foot-redTxt-txt {
		width: calc(10% - 4px);
		font-weight: 400;
		font-size: 11px;
		margin: 0 2px;
		color: #e04e50;
		line-height: 11px;
		-webkit-writing-mode: vertical-rl;
		writing-mode: vertical-rl;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.popMask {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .5);
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 11
	}

	.pop {
		background: #fff;
		width: 100%;
		padding: 10px;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 12
	}

	.pop .pop-list {
		width: 100%;
		height: 46px;
		border-bottom: 1px solid #ebebeb;
		padding: 0 10px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		font-weight: 600;
		font-size: 12px;
		color: #333
	}
</style>