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
		this.parent = document.querySelector(".work-canvas-wrapper");
		this.canvas = document.querySelector("#work-canvas");
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
			let context = this.getContext(w, h, 5, 12);

			// get drawing variables
			let width = this.canvas.width;
			let height = this.canvas.height;

			let offset = this.lineWidth / 2;
			let radius = this.radius;

			// draw directions
			context.beginPath();
			context.moveTo(width / 2, offset);
			context.lineTo(radius + offset, offset);
			context.arcTo(offset, offset, offset, radius + offset, radius);
			context.lineTo(offset, height - (radius + offset));
			context.arcTo(offset, height - offset, radius + offset, height - offset, radius);
			context.lineTo(Math.round(width * .84), height - offset);

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
			context.moveTo(width - offset, offset);
			context.lineTo(width * .15 + radius + offset, offset);
			context.arcTo(width * .15 + offset, offset, width * .15 + offset, offset + radius, radius);
			context.lineTo(width * .15 + offset, height - offset - 20);

			context.stroke();

		}
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

@media only screen and (max-width: 700px){
	
	.work-header-wrapper h2 {
		text-align: center;
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
</style>