<script>
export default {
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

		async function wave() {
			console.log('in async function');
			hand.classList.add("wave");
			await setTimeout(() => { hand.classList.remove("wave"), 2100 }, false);
		}
	}
}
</script>
<template>
	<div class="hero">
		<div class="hero-inner">
			<img id="hand" src="~/assets/img/wave.png" />
			<div class="hero-header">
				<h1>Hello, my<br />name is Nick</h1><span class="period">.</span>
			</div>
			<p class="hero-sub-header">I'm a Front-end developer based<br />in Carbondale, Co.</p>
		</div>
	</div>
</template>

<style>
.hero {
	max-width: 1000px;
	margin: 0 auto;
	height: 70%;
	display: flex;
	justify-content: left;
	align-items: center;
}

.hero-inner {
	display: grid;
	grid-template-areas:
		'wave header'
		'. sub-header';
	z-index: 1000;
}

.hero-header {
	grid-area: header;
}

.hero-header h1 {
	display: inline;
	line-height: .95;
	margin: 0px;
}

.period {
	color: var(--color-secondary);
	font-size: 60px;
}

.hero-sub-header {
	color: var(--color-quaternary);
	font-size: 25px;
	font-family: 'Varela', sans-serif;
	grid-area: sub-header;
	margin: 0px;
	line-height: 1.2;
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
</style>