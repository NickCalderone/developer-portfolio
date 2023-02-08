<script>
export default {

	data() {
		
		return {
			
			breakpoint: undefined,
			mobileDevice: undefined

		}

	},

	mounted() {

		// get mobile breakpoint from css variable
		this.breakpoint = getComputedStyle(document.documentElement).getPropertyValue("--breakpoint");

		// set device state
		this.setDevice(this.breakpoint);

 		// update device state when window resizes
		window.addEventListener("resize", () => this.setDevice(this.breakpoint));

	},

	methods: {

		setDevice(breakpoint) {

			// set device state based on mobile breakpoint
			this.mobileDevice = window.matchMedia("(max-width:" + breakpoint + ")").matches ? true : false;

		}

	}
}
</script>

<template>
	<SiteMenu :mobile-device="mobileDevice" />
	<main id="top" class="layout-wrapper js-layout-wrapper">
		<Hero class="layout-hero" />
		<Content class="layout-background" colorL="var(--color-primary)" colorM="var(--color-stripe-medium)"
			colorR="var(--color-primary)">
			<Work />
			<About />
			<Contact />
		</Content>
		<MountainsTop class="layout-mountains-top" />
		<MountainsBottom class="layout-mountains-bottom" />
	</main>
	<SiteFooter />
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