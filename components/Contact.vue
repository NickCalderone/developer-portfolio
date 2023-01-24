<script>
export default {
	mounted() {
		// set up canvas variables
		this.canvas = document.querySelector("#contact-canvas");
		this.context = this.canvas.getContext("2d");
		this.parent = document.querySelector(".contact-canvas-wrapper");
		this.rect = this.parent.getBoundingClientRect();

		this.draw();
		window.addEventListener("resize", this.draw);

	},
	methods: {
		draw() {
			this.rect = this.parent.getBoundingClientRect();
			// make canvas the same size as container
			this.canvas.width = this.rect.width;
			this.canvas.height = this.rect.height;

			let width = this.rect.width;
			let height = this.rect.height;

			let offset = 2.5;
			let radius = 12;

			this.context.lineWidth = 5;
			// context.lineCap = "round";
			this.context.beginPath();
			this.context.moveTo(width * .5, offset);
			this.context.lineTo(width - offset - radius, offset);
			this.context.arcTo(width - offset, offset, width - offset, offset + radius, radius);
			this.context.lineTo(width - offset, height - offset - radius);
			this.context.arcTo(width - offset, height - offset, width - offset - radius, height - offset, radius);
			this.context.lineTo(offset + radius, height - offset);
			this.context.arcTo(offset, height - offset, offset, height - offset - radius, radius);
			this.context.lineTo(offset, radius + offset);
			this.context.arcTo(offset, offset, offset + radius, offset, radius);
			this.context.closePath();

			let secondaryColor = getComputedStyle(document.documentElement).getPropertyValue("--color-secondary");
			this.context.strokeStyle = secondaryColor;

			this.context.stroke();
		},
		redraw() {
			let canvas = document.querySelector("#contact-canvas");
			let context = canvas.getContext("2d");
			let parent = document.querySelector(".contact-canvas-wrapper");

			// make canvas the same size as container
			let rect = parent.getBoundingClientRect();
			let width = rect.width;
			let height = rect.height;

			context.clearRect(0, 0, width, height);
			this.draw();
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
			<p class="contact-text">
				Lets talk about your goals and how I could help. I’m available for freelance projects or to hear about
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
	padding: var(--spacing);
}

.contact-canvas-wrapper {
	grid-row: 2 / 5;
	grid-column: 1;
}

#contact-canvas {
	height: 100%;
	max-width: 100%;
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
	/* background-color: var(--color-tertiary); */
	background-color: var(--color-quinary);
	/* background-color: var(--color-primary-loud); */
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
</style>