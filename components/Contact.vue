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
		this.parent = document.querySelector(".contact-canvas-wrapper");
		this.canvas = document.querySelector("#contact-canvas");
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

			// set up and get canvas context
			let context = this.getContext(w, h, 5, 12);

			// get drawing variables
			let width = this.canvas.width;
			let height = this.canvas.height;

			let offset = this.lineWidth / 2;
			let radius = this.radius;

			// draw directions
			context.beginPath();
			context.moveTo(width * .5, offset);
			context.lineTo(width - offset - radius, offset);
			context.arcTo(width - offset, offset, width - offset, offset + radius, radius);
			context.lineTo(width - offset, height - offset - radius);
			context.arcTo(width - offset, height - offset, width - offset - radius, height - offset, radius);
			context.lineTo(offset + radius, height - offset);
			context.arcTo(offset, height - offset, offset, height - offset - radius, radius);
			context.lineTo(offset, radius + offset);
			context.arcTo(offset, offset, offset + radius, offset, radius);
			context.closePath();

			// draw
			context.stroke();

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

		}
	}
}
</script>

<template>
	<section class="contact-wrapper">
		<h2 id="contact" class="contact-header">
			Contact
		</h2>
		<div class="contact-canvas-wrapper">
			<canvas id="contact-canvas">Red line used for flair</canvas>
		</div>
		<div class="contact-text-wrapper">
			<NewTab />
			<p class="contact-text">
				Lets talk about your goals and how I can help. I’m available for freelance projects or to hear about
				new opportunities. Send me a message if you have a question or just to say hi!
			</p>
		</div>
		<a class="contact-mailto-a" href="mailto:calderonenick@gmail.com">
			<div class="contact-mailto">
				<div class="background-hover"></div>
				<Mailto class="mailto-icon" />
				<p>Let's Talk</p>
			</div>
		</a>
	</section>
</template>

<style>
.contact-wrapper {
	display: grid;
	grid-template-rows: auto auto 1fr var(--canvas-stroke-width) 1fr;
	grid-template-columns: auto;
	/* prevent the canvas from growing exponentially when the resize handler fires */
	line-height: 0;
}

.contact-header {
	grid-row: 1;
	grid-column: 1;
	text-align: center;
}

.contact-text-wrapper {
	grid-row: 2;
	grid-column: 1;
	padding: var(--padding);
}

.contact-canvas-wrapper {
	grid-row: 2 / 5;
	grid-column: 1;
	position: relative;
}

#contact-canvas {
	height: 100%;
	max-width: 100%;
	position: absolute;
}

.contact-mailto-a {
	box-sizing: border-box;
	grid-row: 3 / 6;
	grid-column: 1;
	margin: 0 auto;
	display: block;
	height: 100%;
	text-decoration: none;
	border: solid 5px var(--color-secondary);
	border-radius: 12px;
	overflow: hidden;
	z-index: 500000;
}

.contact-mailto {
	position: relative;
	max-width: 600px;
	background-color: var(--color-quaternary);
	display: flex;
	align-items: center;
	font-family: var(--font-family-primary);
	color: var(--color-primary);
	height: 100%;
	padding: 10px 25px;
}

.contact-mailto p {
	color: var(--color-primary);
	font-size: 1.5rem;
	z-index: 10;
	transition: color .25s ease-in-out;
}

.mailto-icon {
	z-index: 10;
	margin-right: .75rem;
}

.mailto-icon path {
	fill: var(--color-primary);
	transition: fill .25s ease-in-out;
}

.background-hover {
	position: absolute;
	height: 100%;
	width: 0%;
	top: 0;
	left: 0;
	z-index: 5;
	background-color: var(--color-quinary);
	transition: width .3s ease-in-out;
}

.contact-mailto-a:hover .background-hover {
	width: 100%;
}

.contact-mailto-a:hover p {
	/* color: var(--color-quinary); */
	color: var(--color-primary-loud);
}

.contact-mailto-a:hover .mailto-icon path {
	/* fill: var(--color-quinary); */
	fill: var(--color-primary-loud);
}

@media only screen and (max-width: 700px){
	.mailto-svg {
		height: 1.35rem;
	}

	.contact-mailto p {
		font-size: 1.35rem;
	}
}

@media only screen and (max-width: 5500px){
	.mailto-svg {
		height: 1.25rem;
	}

	.contact-mailto p {
		font-size: 1.25rem;
	}
}
</style>