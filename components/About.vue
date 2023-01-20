<script>
export default {
	mounted() {
		let canvas = document.querySelector("#about-canvas");
		let context = canvas.getContext("2d");
		let parent = document.querySelector(".about-canvas-wrapper");

		// make canvas the same size as container
		let rect = parent.getBoundingClientRect();
		canvas.width = rect.width;
		canvas.height = rect.height;

		let width = rect.width;
		let height = rect.height;

		let offset = 2.5;
		let radius = 12;

		context.lineWidth = 5;
		context.lineCap = "round";
		context.beginPath();
		context.moveTo(width * .40, offset);
		context.lineTo(width - offset - radius, offset);
		context.arcTo(width - offset, offset, width - offset, offset + radius, radius);
		context.lineTo(width - offset, height - offset - radius);
		context.arcTo(width - offset, height - offset, width - offset - radius, height - offset, radius);
		context.lineTo(offset, height - offset);

		let secondaryColor = getComputedStyle(document.documentElement).getPropertyValue("--color-secondary");
		context.strokeStyle = secondaryColor;

		context.stroke();


	}
}
</script>
<template>
	<section class="about-wrapper">
		<h2 class="about-header">About</h2>
		<div class="about-img">
			<Face />
		</div>
		<div class="about-text">
			<p>I was introduced to programming by a web developer I met while on a climbing trip to Mexico. I was
				fascinated by its usefulness and saw coding as a clear path to helping individuals, businesses, and
				organizations achieve their goals. I have since worked with clients from small businesses to
				municipalities to define problems and build solutions using a variety of technologies.</p>
		</div>
		<div class="about-canvas-wrapper">
			<canvas id="about-canvas">Red line used for flair</canvas>
		</div>
	</section>
</template>

<style>
.about-wrapper {
	display: grid;
	grid-template-columns: 40% 60%;
	grid-template-rows: auto auto;
}

.about-header {
	grid-row: 1;
	grid-column: 2;
	text-align: left;
	margin-left: var(--spacing)
}

.about-canvas-wrapper {
	grid-row: 2;
	grid-column: 1 / 3;
	z-index: 10;
}

#about-canvas {
	height: 100%;
	/* for some reason using width: 100% makes it at least 500px tall no matter what? */
	max-width: 100%;
}

.about-canvas-wrapper canvas {
	display: block;
}

.about-img {
	grid-row: 1 / 3;
	grid-column: 1;
	align-self: end;
	overflow: hidden;
}

.about-img svg {
	transform: scalex(-.94);
	margin-bottom: -60px;
}

.about-text {
	grid-column: 2;
	grid-row: 2;
	padding: var(--spacing);
	z-index: 20;
}
</style>