<script>
export default {

	props: ['colorL', 'colorM', 'colorR'],

};
</script>

<template>
	<div class="background">
		<div class="content">
			<slot />
		</div>
	</div>
</template>

<style scoped>
.background {
	background: rgb(36,34,0);
	background: linear-gradient(90deg, v-bind(colorL), v-bind(colorL) 58%, v-bind(colorM) 58%, v-bind(colorM) 72.5%, v-bind(colorR) 72.5%, v-bind(colorR) 100%); 
}

.content {
	max-width: 1000px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: var(--content-gap);
}
</style>