<script>
export default {
	props: ['colorL', 'colorM', 'colorR'],
};
</script>

<template>
	<div class="background-grid">
		<slot />
	</div>
</template>

<style scoped>

.background-grid {
	background: rgb(36,34,0);
	background: linear-gradient(90deg, v-bind(colorL), v-bind(colorL) 58%, v-bind(colorM) 58%, v-bind(colorM) 72.5%, v-bind(colorR) 72.5%, v-bind(colorR) 100%); 
}

</style>