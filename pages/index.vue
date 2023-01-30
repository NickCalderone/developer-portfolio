<script>
export default {
	data() {
		return {
			heroHeight: undefined,
			heroHeightNum: undefined
		}
	},
	mounted(){
		this.setAppVariables()
	},
	methods: {
		setAppVariables(){
			let heroHeight = window.innerHeight > 750 ? window.innerHeight : 750;
			this.heroHeight = heroHeight + "px";
			this.heroHeightNum = heroHeight;
		}
	}
}
</script>

<template>
	<Menu />
	<div class="layout-wrapper js-layout-wrapper">
		<Hero class="layout-hero" :hero-height="heroHeight" />
		<Content class="layout-background" colorL="var(--color-primary)" colorM="var(--color-stripe-medium)"
			colorR="var(--color-primary)">
				<Work />
				<About />
				<Contact />
		</Content>
		<MountainsTop class="layout-mountains-top" />
		<MountainsBottom class="layout-mountains-bottom" />
		<Footer />
	</div>
</template>

<style>
.layout-wrapper {
	display: grid;
	grid-template-rows: auto auto auto auto auto;
	grid-template-columns: auto;
	overflow: hidden;
}

.layout-hero {
	grid-row: 1;
	grid-column: 1;
}

.layout-mountains-top {
	grid-row: 1;
	grid-column: 1;
	align-self: end;
}

.layout-mountains-bottom {
	grid-row: 2;
	grid-column: 1;
}

.layout-background {
	grid-row: 2;
	grid-column: 1;
	padding-top: var(--content-gap);
	padding-bottom: calc(var(--content-gap) + 70px);
	padding-left: var(--content-padding);
	padding-right: var(--content-padding);
}

</style>