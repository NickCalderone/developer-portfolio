<script>
export default {
	mounted() {
		this.canvas = document.querySelector("#about-canvas");
		this.context = this.canvas.getContext("2d");
		this.parent = document.querySelector(".about-canvas-wrapper");
		this.rect = this.parent.getBoundingClientRect();
		this.drawMobile();

		window.addEventListener("resize", this.drawDesktop);
	},
	methods: {
		drawDesktop() {
			// make canvas the same size as container
			this.rect = this.parent.getBoundingClientRect();
			this.canvas.width = this.rect.width;
			this.canvas.height = this.rect.height;

			let width = this.rect.width;
			let height = this.rect.height;

			let offset = 2.5;
			let radius = 12;

			this.context.lineWidth = 5;
			this.context.lineCap = "round";
			this.context.beginPath();
			this.context.moveTo(width * .40, offset);
			this.context.lineTo(width - offset - radius, offset);
			this.context.arcTo(width - offset, offset, width - offset, offset + radius, radius);
			this.context.lineTo(width - offset, height - offset - radius);
			this.context.arcTo(width - offset, height - offset, width - offset - radius, height - offset, radius);
			this.context.lineTo(offset, height - offset);

			let secondaryColor = getComputedStyle(document.documentElement).getPropertyValue("--color-secondary");
			this.context.strokeStyle = secondaryColor;

			this.context.stroke();
			console.log('about drew');
		},
		drawMobile() {
			this.rect = this.parent.getBoundingClientRect();
			this.canvas.width = this.rect.width;
			this.canvas.height = this.rect.height;

			let width = this.rect.width;
			let height = this.rect.height;

			let offset = 2.5;
			let radius = 12;

			this.context.lineWidth = 5;
			this.context.lineCap = "round";
			this.context.beginPath();
			this.context.moveTo(width - offset, offset);
			this.context.lineTo(offset + radius, offset);
			this.context.arcTo(offset, offset, offset, radius + offset, radius);
			this.context.lineTo(offset, height - offset - radius);
			this.context.arcTo(offset, height - offset, offset + radius, height - offset, radius);
			this.context.lineTo(width / 2, height - offset);

			let secondaryColor = getComputedStyle(document.documentElement).getPropertyValue("--color-secondary");
			this.context.strokeStyle = secondaryColor;

			this.context.stroke();
		}
	}
}
</script>
<template>
	<section class="about-wrapper">
		<h2 id="about" class="about-header">About</h2>
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
	/* prevent the canvas from growing exponentially when the resize handler fires */
	line-height: 0;
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
	transform: scalex(-.92);
	margin-bottom: -60px;
}

.about-text {
	grid-column: 2;
	grid-row: 2;
	padding: var(--spacing);
	z-index: 20;
}

@media only screen and (max-width: 820px) {
	.about-wrapper {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto auto 1fr 5px 1fr;
	}

	.about-header {
		grid-row: 1;
		grid-column: 1;
		margin-left: var(--spacing)
	}

	.about-canvas-wrapper {
		grid-row: 2 / 5;
		grid-column: 1;
		z-index: 10;
		/* prevent the canvas from growing exponentially when the resize handler fires */
		line-height: 0;
	}

	.about-img {
		grid-row: 3 / 6;
		grid-column: 1;
		align-self: end;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--color-stripe-medium);
		border-radius: 1000px;
		padding: 20px;
		margin: 0px 20px;
		z-index: 11;
	}

	.about-img svg {
		transform: scalex(.92);
		width: 80%;
	}

	.about-text {
		grid-column: 1;
		grid-row: 2;
		padding: var(--spacing);
		z-index: 20;
	}
}
</style>