<script>
// export default {
// 	mounted(){
// 		// window.addEventListener('scroll', this.headerScroll);
// 	},
// 	methods: {
// 		headerScroll(e){
// 			console.log(e);
// 		},
// 		setHeroHeight(){
// 		}
// 	},
// 	computed:{
// 		getHeroHeight(){
// 			let heroHeight = window.innerHeight > 750? window.innerHeight : 750;
// 			return heroHeight + "px";
// 		}
// 	}
// }
</script>

<template>
	<div class="header">
		<div class="logo-wrapper">
			<p class="logo"><span class="logo-n">N</span><span class="logo-c">C</span></p>
		</div>
	</div>
	<NuxtPage />
</template>

<style>
.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 100px;
	width: 100%;
	background-color: var(--color-tertiary);
	position: fixed;
	opacity: .9;
	padding: 0px 50px;
}

.logo {
	font-size: 60px;
	font-family: var(--font-family-primary);
}

.logo-n {
	color: var(--color-secondary);
}

.logo-c {
	color: var(--color-quaternary);
}

</style>