<script>
export default {
	data() {
		return {
			heroHeight: this.getScreenHeight()
		}
	},
	methods: {
		getScreenHeight() {
			let heroHeight = window.innerHeight > 750 ? window.innerHeight : 750;
			// console.log(heroHeight+"px");
			return heroHeight + "px";
		}
	}
}
</script>

<template>
	<div class="layout-wrapper">
		<Hero class="layout-hero" :hero-height="getScreenHeight()" />
		<Background class="layout-background" colorL="var(--color-primary)" colorM="var(--color-stripe-medium)" colorR="var(--color-primary)">
			<div class="content">
				<Work />
				<About />
				<Contact />
			</div>
		</Background>
		<MountainsTop class="layout-mountains-top" />
		<MountainsBottom class="layout-mountains-bottom" />
		<Footer class="layout-footer" />
	</div>
</template>

<style>
.layout-wrapper {
	display: grid;
	grid-template-rows: auto auto auto auto;
	grid-template-columns: auto;
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
}

.content {
	max-width: 1000px;
	margin: 15% auto;
	display: flex;
	flex-direction: column;
	gap: var(--content-gap);
}
</style>