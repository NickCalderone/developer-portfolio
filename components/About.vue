<script>
export default {
	data() {
		return {
			parent: undefined,
			canvas: undefined,
			ctx: undefined,
			lineWidth: undefined,
			radius: undefined,
			color: undefined,
			lineCap: "round"
		}
	},
	mounted() {
		this.parent = document.querySelector(".about-canvas-wrapper");
		this.canvas = document.querySelector("#about-canvas");
		this.ctx = this.canvas.getContext("2d");
		this.ctx.lineCap = "round";
		this.color = getComputedStyle(document.documentElement).getPropertyValue("--color-secondary");
		this.breakpoint = getComputedStyle(document.documentElement).getPropertyValue("--breakpoint");

		let rect = this.parent.getBoundingClientRect();
		let w = rect.width;
		let h = rect.height;


		this.draw(w, h);

		const observer = new ResizeObserver(entries => {

			let w = entries[0].contentRect.width;
			let h = entries[0].contentRect.height;

			this.draw(w, h);
		});

		observer.observe(this.parent);
	},
	methods: {
		draw(w, h) {
			if (window.matchMedia("(max-width:" + this.breakpoint + ")").matches) {
				this.drawMobile(w, h);
			} else {
				this.drawDesktop(w, h);
			}
		},
		getContext(w, h, lineWidth, radius) {

			// setup canvas context
			this.canvas.width = w;
			// prevent svg from showing below flair line by making the canvas 2px taller than section container
			this.canvas.height = h + 2;
			this.lineWidth = lineWidth;
			this.radius = radius;

			// setup stroke properties
			this.ctx.lineWidth = this.lineWidth;
			this.ctx.strokeStyle = this.color;
			this.ctx.lineCap = this.lineCap;

			return this.ctx;

		},
		drawDesktop(w, h) {

			// set up and get canvas context
			let context = this.getContext(w, h, 5, 12);

			// get drawing variables
			let width = this.canvas.width;
			let height = this.canvas.height + 2;

			let offset = this.lineWidth;
			let radius = this.radius;

			// draw directions
			context.beginPath();
			context.moveTo(width * .45, offset);
			context.lineTo(width - offset - radius, offset);
			context.arcTo(width - offset, offset, width - offset, offset + radius, radius);
			context.lineTo(width - offset, height - offset - radius);
			context.arcTo(width - offset, height - offset, width - offset - radius, height - offset, radius);
			context.lineTo(offset, height - offset);

			// draw
			context.stroke();

		},
		drawMobile(w, h) {
			// set up and get canvas context
			let context = this.getContext(w, h, 5, 12);

			// get drawing variables
			let width = this.canvas.width;
			let height = this.canvas.height;

			let offset = this.lineWidth / 2;
			let radius = this.radius;

			let spacingVariable = getComputedStyle(document.documentElement).getPropertyValue("--spacing")

			// remove units and change to a number
			let spacing = Number(spacingVariable.slice(0, -2));

			// draw directions
			context.beginPath();
			context.moveTo(width - spacing, offset);
			context.lineTo(offset + radius, offset);
			context.arcTo(offset, offset, offset, radius + offset, radius);
			context.lineTo(offset, height - offset - radius);
			context.arcTo(offset, height - offset, offset + radius, height - offset, radius);
			context.lineTo(width - spacing, height - offset);

			context.stroke();

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
			<h3 class="about-subheader">Front-end developer</h3>
			<p>
				I started building things for the web to solve problems. Problems such as how to save and share my
				favorite recipes, or how to quickly quiz myself on Spanish verb conjugations. Improving my life was a
				great starting point, but I soon found myself taking on bigger challenges. I now spend my time
				understanding the goals of businesses and organizations and building ways to reach them. It is this
				process of solving very human problems with technology that drives me as a programmer.<br><br>Is there
				something getting in the way of you reaching your goals? <a href="#contact">Let me know</a> so we can
				build the solution together.
			</p>
		</div>
		<div class="about-canvas-wrapper">
			<canvas id="about-canvas">Red line used for flair</canvas>
		</div>
	</section>
</template>

<style>
.about-wrapper {
	display: grid;
	grid-template-columns: 45% 55%;
	grid-template-rows: auto minmax(0, 1fr);
}

.about-header {
	grid-row: 1;
	grid-column: 2;
	text-align: left;
	margin-left: 20px;
}

.about-canvas-wrapper {
	max-height: 100%;
	grid-row: 2;
	grid-column: 1 / 3;
	/* prevent the canvas from growing exponentially when the resize handler fires */
	line-height: 0;
	position: relative;
}

#about-canvas {
	max-height: 105%;
	/* for some reason using width: 100% makes it at least 500px tall no matter what? */
	max-width: 100%;
	display: block;
	position: absolute;
}

.about-img {
	grid-row: 1 / 3;
	grid-column: 1;
	align-self: end;
	overflow: hidden;
	min-height: 10px;
}

.about-img svg {
	transform: scalex(-.92);
	margin-bottom: -60px;
	width: 100%;
}

.about-subheader {
	color: var(--color-quinary);
	font-family: var(--font-family-secondary);
	font-size: 1.25rem;
	line-height: 2;
	margin-bottom: 20px;
	margin-top: 10px;
}

.about-text {
	grid-column: 2;
	grid-row: 2;
	align-self: start;
	padding: 20px 20px 30px 20px;
	z-index: 10;
	min-width: 10px;
}

@media only screen and (max-width: 900px) {
	.about-wrapper {
		display: grid;
		grid-template-rows: auto minmax(0, 1fr);
	}

	.about-text {
		padding: var(--padding);
	}
}

@media only screen and (max-width: 700px) {
	.about-wrapper {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto auto 1fr 5px 1fr;
	}

	.about-header {
		grid-row: 1;
		grid-column: 1;
	}

	.about-canvas-wrapper {
		grid-row: 2 / 6;
		grid-column: 1;
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
		/* background-color: var(--color-stripe-medium);
		border-radius: 1000px; */
		padding: 5% 5% 0px 5%;
	}

	.about-img svg {
		transform: scalex(-.92);
		width: 80%;
	}

	.about-text {
		grid-column: 1;
		grid-row: 2;
		padding-right: 0px;
	}
}

@media only screen and (max-width: 550px) {
	.about-img {
		padding: 5% 0 0 0;
	}

}
</style>