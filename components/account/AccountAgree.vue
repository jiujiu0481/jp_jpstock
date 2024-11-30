<template>
</template>

<script>
	export default {
		name: 'AccountAgree',
		methods: {
			async getData() {
				const result = await this.$http.get(`api/article/user-agree`);
				console.log(result);
			}
		}
	}
</script>

<style>
</style>