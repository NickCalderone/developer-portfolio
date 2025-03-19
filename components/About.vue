<script>
export default {

	data()
	{

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

	mounted()
	{

		// set up canvas state variables
		this.canvas = document.querySelector("#about-canvas");
		this.color = getComputedStyle(document.documentElement).getPropertyValue("--color-secondary");
		this.breakpoint = getComputedStyle(document.documentElement).getPropertyValue("--breakpoint");
		this.parent = document.querySelector(".about-canvas-wrapper");

		// set up canvas context
		this.ctx = this.canvas.getContext("2d");
		this.ctx.lineCap = "round";

		// set up drawing variables
		let rect = this.parent.getBoundingClientRect();
		let w = rect.width;
		let h = rect.height;

		this.draw(w, h);

		// redraw on resize with new drawing variables
		const observer = new ResizeObserver(entries =>
		{

			let w = entries[0].contentRect.width;
			let h = entries[0].contentRect.height;

			this.draw(w, h);
		});

		observer.observe(this.parent);

	},

	methods: {

		draw(w, h)
		{

			// choose what device layout to draw
			if (window.matchMedia("(max-width:" + this.breakpoint + ")").matches)
			{

				this.drawMobile(w, h);

			} else
			{

				this.drawDesktop(w, h);

			}

		},

		setContext(w, h, lineWidth, radius)
		{

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

		drawDesktop(w, h)
		{

			// set canvas context
			let context = this.setContext(w, h, 5, 12);

			// set drawing variables
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

		drawMobile(w, h)
		{
			// set canvas context
			let context = this.setContext(w, h, 5, 12);

			// set drawing variables
			let width = this.canvas.width;
			let height = this.canvas.height;
			let offset = this.lineWidth / 2;
			let radius = this.radius;
			let spacingVariable = getComputedStyle(document.documentElement).getPropertyValue("--spacing")

			// change spacing css variable into a number
			let spacing = Number(spacingVariable.slice(0, -2));

			// draw directions
			context.beginPath();
			context.moveTo(width - spacing, offset);
			context.lineTo(offset + radius, offset);
			context.arcTo(offset, offset, offset, radius + offset, radius);
			context.lineTo(offset, height - offset - radius);
			context.arcTo(offset, height - offset, offset + radius, height - offset, radius);
			context.lineTo(width - spacing, height - offset);

			// draw
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
			<h3 class="about-subheader">Nick Calderone</h3>
			<p class="about-subheader-tag">Solving human problems with technology</p>
			<br>
			<p>
				I am a web developer who specializes in building scalable, accessible, and user-friendly web solutions for
				government agencies, municipalities, and businesses. My work has delivers critical digital services to
				the public and has earning recognition from the U.S. Center for Digital Government Awards.
			</p>
			<br>
			<p>
				I run my business remotely from beautiful Carbondale, Colorado. While not coding, I can be found
				climbing rock cliffs near and far.
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
	position: relative;
}

#about-canvas {
	max-height: 105%;
	width: 100%;
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
	margin-bottom: -60px;
	width: 100%;
}

.about-subheader {
	color: var(--color-quinary);
	line-height: 2;
	margin-top: 0;
	font-size: 2.2rem;
	margin-bottom: 0px;
	font-family: var(--font-family-primary)
}

.about-subheader-tag {
	font-size: 1.4rem;
	font-family: var(--font-family-primary)
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
	}

	.about-img {
		grid-row: 3 / 6;
		grid-column: 1;
		align-self: end;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 5% 5% 0px 5%;
	}

	.about-img svg {
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