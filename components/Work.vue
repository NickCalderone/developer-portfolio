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

		// set up canvas state variables
		this.canvas = document.querySelector("#work-canvas");
		this.color = getComputedStyle(document.documentElement).getPropertyValue("--color-secondary");
		this.breakpoint = getComputedStyle(document.documentElement).getPropertyValue("--breakpoint");
		this.parent = document.querySelector(".work-canvas-wrapper");

		// set up canvas context
		this.ctx = this.canvas.getContext("2d");
		this.ctx.lineCap = "round";

		// set up drawing variables
		let rect = this.parent.getBoundingClientRect();
		let w = rect.width;
		let h = rect.height;

		this.draw(w, h);

		// redraw on resize with new drawing variables
		const observer = new ResizeObserver(entries => {

			let w = entries[0].contentRect.width;
			let h = entries[0].contentRect.height;

			this.draw(w, h);
		});

		observer.observe(this.parent);

	},

	methods: {

		draw(w, h) {

			// choose what device layout to draw
			if (window.matchMedia("(max-width:" + this.breakpoint + ")").matches) {

				this.drawMobile(w, h);

			} else {

				this.drawDesktop(w, h);

			}

		},

		setContext(w, h, lineWidth, radius) {

			// setup canvas context
			this.canvas.width = w;
			this.canvas.height = h;
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
			let context = this.setContext(w, h, 5, 12);

			// get drawing variables
			let width = this.canvas.width;
			let height = this.canvas.height;
			let offset = this.lineWidth / 2;
			let radius = this.radius;

			// draw directions
			context.beginPath();
			context.moveTo(width / 5 * 3 , offset);
			context.lineTo(radius + offset, offset);
			context.arcTo(offset, offset, offset, radius + offset, radius);
			context.lineTo(offset, height - (radius + offset));
			context.arcTo(offset, height - offset, radius + offset, height - offset, radius);
			context.lineTo(Math.round(width * .84), height - offset);

			// draw
			context.stroke();

		},
		drawMobile(w, h) {
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
			context.moveTo(width - offset, offset);
			context.lineTo(width * .15 + radius + offset, offset);
			context.arcTo(width * .15 + offset, offset, width * .15 + offset, offset + radius, radius);
			context.lineTo(width * .15 + offset, height - offset - 20);

			// draw
			context.stroke();

		}

	}
}

</script>

<template>
	<section>
		<div class="work-header-wrapper">
			<h2 id="work">Projects</h2>
		</div>
		<div class="work-wrapper">
			<div class="work-canvas-wrapper">
				<canvas id="work-canvas">
					Red line used for flair
				</canvas>
			</div>
			<div class="work-subheader">
				<h3>A selection...</h3>
			</div>
			<Example class="example-1" img-name="sba" img-src="sba-700.webp" alt="Small Business Administration Business Search website"
				imgLink="https://search.certifications.sba.gov/" img-width="700" img-height="467" />
			<Example class="example-2" img-name="telecoms" img-src="telecoms-700.webp"
				alt="Pitkin County Telecoms Department website" imgLink="https://telecoms.pitkincounty.com/" img-width="700"
				img-height="467" />
			<Example class="example-3" img-name="emergency" img-src="emergency-700.webp" alt="Pitkin Emergency website"
				imgLink="https://www.pitkinemergency.org/" img-width="700" img-height="467" />
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
	position: relative;
}

#work-canvas {
	display: block;
	height: 100%;
	max-width: 100%;
	position: absolute;
}

.work-subheader {
	display: flex;
	align-items: center;
	justify-content: right;
	grid-row: 1;
	grid-column: 2 / 7;
	text-align: right;
	margin-top: 15px;
	margin-bottom: 10px;
	z-index: 11;
}

.example-1 {
	grid-row: 2 / 5;
	grid-column: 2;
	position: relative;
}

.example-2 {
	grid-row: 2 / 5;
	grid-column: 4;
	position: relative;
}

.example-3 {
	grid-row: 2 / 5;
	grid-column: 6;
	position: relative;
}

.work-tools {
	grid-row: 5;
	grid-column: 1 / 7;
}

@media only screen and (max-width: 700px) {
	.work-header-wrapper {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto;
	}

	.work-header-wrapper h2 {
		grid-row: 1;
		grid-column: 1;
		margin-left: 15%;
	}

	.work-wrapper {
		grid-template-rows: auto 250px 40px 250px 40px 250px auto;
		grid-template-columns: 1fr;
	}

	.work-canvas-wrapper {
		grid-column: 1;
		grid-row: 1 / 7;
	}

	.work-subheader {
		grid-column: 1;
		grid-row: 1;
	}

	.example-1 {
		grid-column: 1;
		grid-row: 2;
	}

	.example-2 {
		grid-column: 1;
		grid-row: 4;
	}

	.example-3 {
		grid-column: 1;
		grid-row: 6;
	}

	.work-tools {
		grid-column: 1;
		grid-row: 7;
	}
}

@media only screen and (max-width: 550px) {
	.work-subheader h3 {
		font-size: 1.3rem;
	}
}
</style>