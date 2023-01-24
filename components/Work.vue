<script>
export default {
	mounted() {
		let canvas = document.querySelector("#work-canvas");
		let context = canvas.getContext("2d");

		// make canvas the same size as container
		var rect = canvas.parentNode.getBoundingClientRect();
		canvas.width = rect.width;
		canvas.height = rect.height;

		let width = rect.width;
		let height = rect.height;

		let offset = 2.5;
		let radius = 12;

		context.lineWidth = 5;
		context.lineCap = "round";

		context.beginPath();
		context.moveTo(width / 2, offset);
		context.lineTo(radius + offset, offset);
		context.arcTo(offset, offset, offset, radius + offset, radius);
		context.lineTo(offset, height - (radius + offset));
		context.arcTo(offset, height - offset, radius + offset, height - offset, radius);
		context.lineTo(Math.round(width * .84), height - offset);

		let secondaryColor = getComputedStyle(document.documentElement).getPropertyValue("--color-secondary");
		context.strokeStyle = secondaryColor;

		context.stroke();
	}
}

</script>

<template>
	<section>
		<div class="work-header-wrapper">
			<h2 id="work">Work</h2>
		</div>
		<div class="work-wrapper">
			<div class="work-canvas-wrapper">
				<canvas id="work-canvas">
					Red line used for flair
				</canvas>
			</div>
			<div class="work-subheader">
				<h3>A selection of projects</h3>
			</div>
			<div class="example-1">
				<Example />
			</div>
			<div class="example-2">
				<Example />
			</div>
			<div class="example-3">
				<Example />
			</div>
			<Tools class="work-tools" />
		</div>
	</section>
</template>

<style>
.work-header-wrapper {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: auto;
}

.work-header-wrapper h2 {
	grid-row: 1;
	grid-column: 1;
	margin-left: var(--spacing);
}

.work-wrapper {
	display: grid;
	grid-template-rows: auto 100px var(--canvas-stroke-width) 100px auto;
	grid-template-columns: var(--spacing) 1fr 30px 1fr 30px 1fr;
}

.work-canvas-wrapper {
	grid-row: 1 / span 3;
	grid-column: 1 / 7;
	/* prevent the canvas from growing exponentially when the resize handler fires */
	line-height: 0;
}

#work-canvas {
	display: block;
	height: 100%;
	max-width: 100%;
}

.work-subheader {
	display: flex;
	align-items: center;
	justify-content: right;
	grid-row: 1;
	grid-column: 2 / 7;
	text-align: right;
	margin-top: 10px;
	margin-bottom: 10px;
}

.example-1 {
	grid-row: 2 / 5;
	grid-column: 2;
}

.example-2 {
	grid-row: 2 / 5;
	grid-column: 4;
}

.example-3 {
	grid-row: 2 / 5;
	grid-column: 6;
}

.work-tools {
	grid-row: 5;
	grid-column: 1 / 7;
}
</style>