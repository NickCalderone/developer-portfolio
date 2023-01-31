<script>
export default {
	props: ['imgSrc', 'alt', 'imgLink'],
}
</script>
<template>
	<a :href="imgLink" rel="noreferrer noopener" target="_blank">
		<div class="example">
			<img v-bind:src="imgSrc" v-bind:alt="alt" />
			<div class="example-overlay">
				<NewTab />
			</div>
		</div>
	</a>
</template>

<style>
.example {
	border-radius: 12px;
	height: 100%;
	width: 100%;
	background-color: var(--color-quaternary);
	position: relative;
	border: solid var(--color-quaternary) 5px;
	overflow: hidden;
}

.example::before {
	content: '';
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	position: absolute;
	background-color: var(--color-primary);
	opacity: 20%;
	transition: .25s opacity ease-in-out;
}

.example:hover::before {
	opacity: 0%;
}

.example-overlay {
	left: 50%;
	top: 100%;
	width: 75px;
	height: 75px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: var(--color-quaternary);
	border-radius: 500px;
	transform: translate(-50%, -50%);
	position: absolute;
	font-family: var(--font-family-secondary);
	color: var(--color-quaternary);
	font-weight: 700;
	font-size: 1.5rem;
	transform: translate(-50%, -50%) scale(0%);
	transition: transform .2s ease-in-out, top .2s ease-in-out, color .2s ease-in-out, background-color .2s ease-in-out;
}

.example:hover .example-overlay {
	color: var(--color-primary);
	background-color: var(--color-quaternary);
	top: 50%;
	transform: translate(-50%, -50%) scale(100%);
}

.example img {
	object-fit: cover;
	object-position: 50% 0%;
	max-width: inherit;
	max-height: inherit;
	height: inherit;
	width: inherit;
}

@media only screen and (max-width: 700px) {

	.example::before {
		transition-property: none;
	}

	.example-overlay {
		top: 50%;
		color: var(--color-primary);
		transform: translate(-50%, -50%) scale(100%);
		transition-property: none
	}

	.example:hover::before {
		opacity: 20%;
	}

}
</style>