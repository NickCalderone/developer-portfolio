<script>
export default {
	props: ['heroHeight'],
	mounted() {
		function delay(ms) {
			return new Promise(resolve => setTimeout(resolve, ms))

		}
		async function handleWave() {
			if (!hand.classList.contains("wave")) {
				await hand.classList.add("wave");
				await delay(1800);
				await hand.classList.remove("wave");
			}
		}

		let hand = document.querySelector("#hand");
		hand.addEventListener("mouseover", handleWave);

		console.log(this.heroHeight);
	}
}
</script>
<template>
	<Content colorL="var(--color-primary)" colorM="var(--color-secondary)" colorR="var(--color-quaternary)">
		<div class="hero">
			<div class="hero-inner">
				<img id="hand" src="~/assets/img/wave.png" />
				<div class="hero-header-wrapper">
					<h1>Hello, <br class="h1-br" />my name<br />is Nick<span class="period">.</span></h1>
				</div>
				<div class="hero-sub-header-wrapper">
					<p class="hero-sub-header">I'm a Front-end developer based in Carbondale, Co.</p>
				</div>
			</div>
		</div>
	</Content>
</template>

<style>
.hero {
	max-width: 1000px;
	height: v-bind(heroHeight);
	display: flex;
	align-items: center;
}

.hero-inner {
	display: grid;
	width: 57%;
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

.h1-br {
	display: none;
}

.period {
	color: var(--color-secondary);
	font-size: 45px;
	margin-left: 10px
}

.hero-sub-header-wrapper {
	grid-area: sub-header;
}

.hero-sub-header {
	color: var(--color-quaternary);
	font-size: 25px;
	font-family: 'Varela', sans-serif;
	line-height: 1.25;
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
			'. wave'
			'. header'
			'. sub-header';
	}

	#hand {
		margin-bottom: 10px;
		height: 70px;
	}

	.h1-br {
		display: block;
	}

	#hand {
		justify-self: right;
	}

	.hero-header-wrapper {
		text-align: right;
	}

	.hero-sub-header-wrapper {
		max-width: 50%;
		justify-self: right;
		text-align: right;
	}

}

@media only screen and (max-width: 900px) {
	.hero-sub-header-wrapper {
		max-width: 60%;
	}
}

@media only screen and (max-width: 700px) {
	.hero-header-wrapper h1 {
		font-size: 3rem;
	}

	.hero-sub-header {
		font-size: 22px;
		line-height: 1.5;
	}

	.hero-sub-header-wrapper {
		max-width: 70%;
	}
}

@media only screen and (max-width: 550px) {

	.hero-header-wrapper h1 {
		font-size: 2.5rem;
	}

	.hero-sub-header-wrapper {
		max-width: 85%;
	}

	.hero-sub-header {
		font-size: 20px;
	}

}

@media only screen and (max-width: 430px) {

	.hero-sub-header-wrapper {
		max-width: 100%;
	}

}
</style>
