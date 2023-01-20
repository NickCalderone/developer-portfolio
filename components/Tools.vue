<script>
export default {
	data() {
		return {
			tools: ["Vue", "Svelte", "React", "WordPress", "Drupal", "Accessible", "Responsive", "Figma", "Git/Github", "Google Analytics"]
		}
	}
}
</script>

<template>
	<div class="tools-wrapper">
		<h3>Some of my tools and skills</h3>
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
	margin-top: 30px;
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
</style>