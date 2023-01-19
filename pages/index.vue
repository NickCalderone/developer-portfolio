<script>
</script>

<template>
	<div class="layout-wrapper">
		<Background class="layout-hero" colorL="var(--color-primary)" colorM="var(--color-secondary)"
			colorR="var(--color-quaternary)">
			<Hero />
		</Background>
			<Background class="layout-background" colorL="var(--color-primary)" colorM="var(--color-primary-loud)"
				colorR="var(--color-primary)">
				<div class="content">
					<Work />
					<Tools />
					<About />
				</div>
			</Background>
		<MountainsTop class="layout-mountains-top" />
		<MountainsBottom class="layout-mountains-bottom" />
	</div>
</template>

<style>
.layout-wrapper {
	display: grid;
	grid-template-rows: auto auto auto;
	grid-template-columns: auto;
}

.layout-hero {
	grid-row: 1;
	grid-column: 1;
	height: 100vh;
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
	margin: 300px auto;
	height: 100%;
}
</style>