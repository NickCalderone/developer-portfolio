<script>
export default {
	mounted() {

		// add waving easter egg handler 
		let hand = document.querySelector("#hand");
		["mouseover", "click"].forEach(e => hand.addEventListener(e, this.handleWave, false));

	},

	methods: {

		// wait for the wave to finish
		delay(ms) {
			return new Promise(resolve => setTimeout(resolve, ms))

		},

		// make the hand wave
		async handleWave() {
			if (!hand.classList.contains("wave")) {
				await hand.classList.add("wave");
				await this.delay(1800);
				await hand.classList.remove("wave");
			}
		}

	}
}
</script>
<template>
	<Content colorL="var(--color-primary)" colorM="var(--color-secondary)" colorR="var(--color-quaternary)">
		<section class="hero">
			<div class="hero-inner">
				<Hand id="hand" />
				<div class="hero-header-wrapper">
					<h1>Hello, <br class="h1-br" />my name<br />is Nick<span class="period">.</span></h1>
				</div>
				<div class="hero-sub-header-wrapper">
					<p class="hero-sub-header">I build intuitive, engaging, & accessible interfaces for the web</p>
				</div>
			</div>
		</section>
	</Content>
</template>

<style>

.hero {
	max-width: 1000px;
	height: max(100vh, 750px);
	display: flex;
	align-items: center;
}

.hero-inner {
	display: grid;
	width: 59%;
	grid-template-areas:
		'wave header'
		'. sub-header';
	z-index: 11;
	margin-bottom: 10vw;
}

.hero-header-wrapper {
	grid-area: header;
}

.hero-header-wrapper h1 {
	display: inline;
	line-height: 1;
	font-size: 3.5rem;
	margin: 0px 0px 20px 0px;
}

.period {
	color: var(--color-secondary);
	font-size: 3.5rem;
	margin-left: 10px
}

.h1-br {
	display: none;
}

.hero-sub-header-wrapper {
	grid-area: sub-header;
}

.hero-sub-header {
	color: var(--color-quaternary);
	font-size: 25px;
	font-family: 'Varela', sans-serif;
	line-height: 1.5;
	margin-top: 20px;
}

.hero-inner br {
	margin-bottom: 10px;
}

#hand {
	height: 109px;
	margin-right: 20px;
	grid-area: wave;
}

.wave {
	animation: wave 1.75s ease-in-out 0s 1 normal none;
}

@keyframes wave {

	0%,
	100% {
		transform: rotate(0deg);
		transform-origin: 50% 50%;
	}

	10% {
		transform: rotate(8deg);
	}

	20%,
	40%,
	60% {
		transform: rotate(-10deg);
	}

	30%,
	50%,
	70% {
		transform: rotate(10deg);
	}

	80% {
		transform: rotate(-8deg);
	}

	90% {
		transform: rotate(8deg);
	}

}

@media only screen and (max-width: 1200px) {

	.hero-inner {
		grid-template-columns: 1fr auto;
		grid-template-areas:
			'wave header'
			'. sub-header';
		max-width: 58%;
	}

	#hand {
		margin-bottom: 10px;
		height: 80px;
		justify-self: right;
		margin-top: 30px;
	}

	.h1-br {
		display: block;
	}

	.hero-header-wrapper {
		text-align: left;
	}

	.hero-sub-header-wrapper {
		max-width: 260px;
		text-align: left;
		max-width: 260px;
	}

	.hero-sub-header {
		font-size: 22px;
	}

}

@media only screen and (max-width: 900px) {

	.hero-inner {
		grid-template-columns: 1fr auto;
		grid-template-areas:
			'. wave'
			'. header'
			'. sub-header';
	}

	#hand {
		height: 60px;
		margin: 0 0 10px 0;
		justify-self: center;
	}

	.hero-header-wrapper {
		text-align: center;
	}

	.hero-sub-header {
		text-align: center;
	}

}

@media only screen and (max-width: 700px) {

	.hero {
		height: max(calc(100vh - 70px), 750px);
	}

	.hero-header-wrapper h1 {
		font-size: 3rem;
	}

	.period {
		font-size: 3rem;
	}

	.hero-sub-header {
		font-size: 22px;
	}

}

@media only screen and (max-width: 550px) {

	.hero-inner {
		padding: 5px;
	}

	.hero-header-wrapper h1 {
		font-size: 2.5rem;
	}

	.period {
		font-size: 2.5rem;
	}

	.hero-sub-header {
		font-size: 20px;
	}

}

</style>
