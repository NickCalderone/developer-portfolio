<script>
export default {
	data() {
		return {
			tools: [
				"React", 
				"TypeScript",
				"Node",
				"Express", 
				"Vue",
				"Nuxt",
				"Next",
				"Sass",
				"Styled Components",
				"Meilisearch JS",
				"Figma", 
				"Git", 
			]
		}
	}
}
</script>

<template>
	<div class="tools-wrapper">
		<h3>Some tools and skills</h3>
		<div class="tools">
			<div v-for="tool in tools" class="tool">
				<p>
					{{ tool }}
				</p>
			</div>
		</div>
	</div>
</template>

<style>

.tools-wrapper {
	padding-left: var(--spacing);
}

.tools-wrapper h3 {
	margin-top: 60px;
	margin-bottom: 20px;
}

.tools {
	display: flex;
	gap: 20px;
	flex-wrap: wrap;
}

.tool {
	background-color: var(--color-tertiary);
	padding: 10px 20px 10px 15px;
	border-left: solid var(--color-secondary) 12px;
	display: inline-block;
	border-radius: 12px;
	font-family: var(--font-family-secondary);
}

.tool p {
	color: var(--color-quinary);
	font-size: 18px;
}

@media only screen and (max-width: 1020px) {

	.tools {
		gap: 16px;
	}

	.tool {
		padding: 8px 12px 8px 9px;
	}

	.tool p {
		font-size: 16px;
	}

}

@media only screen and (max-width: 700px) {

	.tools-wrapper {
		padding-left: 0;
	}

	.tools {
		gap: 15px;
	}


	.tool {
		padding: 5px 12px 5px 7px;
	}

}

@media only screen and (max-width: 550px) {

	.tools {
		gap: 5px;
	}

	.tools-wrapper h3 {
		font-size: 1.4rem;
	}

}

</style>