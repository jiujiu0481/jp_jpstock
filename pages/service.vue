<!-- 客服 -->
<template>
	<view>
		<!-- <view class="college-content"> -->
		<!-- <web-view :fullscreen="full" class="webview" :style="webviewStyles" :webview-styles="webviewStyles"
				:src='list'></web-view> -->
		<!-- 	<web-view :style="webviewStyles" :webview-styles="webview" :fullscreen="full" :src='list'></web-view>
		</view> -->
		<template>
			<web-view :src="list"></web-view>
		</template>
		<!-- <image :src="lineimg"  mode="widthFix" style="margin-left: 20%;width: 60%;margin-top: 50px;" ></image>
		<view class="padding-20">
			<view class="text-center font-size-16">QR 코드를 통해 LINE 친구 추가</view>
					<view class="text-center font-size-14 hui">LINE 앱에서 친구 탭을 열고 친구 추가 아이콘을 탭하세요.
			오른쪽 상단에서 'QR 코드'를 선택한 다음 이 QR 코드를 스캔하세요.</view>
		</view>		 
		
		<u-button type="primary" @click="saveImg()" text="QR 코드 저장" style="width: 90%;margin-left: 5%;" size="large"></u-button>
		<u-button type="success" @click="link()" text="LINE 열기" style="width: 90%;margin-left: 5%;margin-top:20px" size="large"></u-button>
		
		<view class="padding-20">
			 <view class="text-center font-size-14 red" >"LINE 열기" 버튼 클릭후 정상적으로 연결이 안 되는 경우, "LINE 링크 복사"  버튼을 클릭하여 주소를 복사하고, 모바일 브라우저 주소란에 붙여넣기 후 열어주세요.</view>
		</view>
		
		<u-button type="error" @click="fuzhi()" text="LINE 링크 복사" style="width: 90%;margin-left: 5%;margin-top:20px" size="large"></u-button> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: "",
			};
		},
		beforeMount() {
			this.getServiceURL()
		},
		methods: {
			async getServiceURL() {
				const result = await this.$util.getServiceURL();
				this.list = result;
			}
		},
	}
</script>

<style lang="scss">
	::v-deep .uni-page-head {
		background: #007AFF !important;
		color: #fff !important;
	}

	iframe {
		width: 600px !important;
	}

	.college-content {
		width: 100%;
		height: 100%;
	}

	/deep/ .webview {
		width: 100% !important;
		height: 100% !important;
	}
</style>