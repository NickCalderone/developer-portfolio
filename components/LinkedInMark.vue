<script>
export default {
	props: ["titleId", "descId"]
}
</script>
<template>
	<svg :aria-labelledby='titleId + " " + descId' class="linkedin-icon" viewBox="0 0 75 75"
		style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
		<title :id="titleId">A LinkedIn Icon</title>
		<desc :id="descId">A Icon that links to Nick Calderone's LinkedIn</desc>
		<g transform="matrix(4.16667,0,0,4.16667,0,0)">
			<path
				d="M15.341,15.342L12.635,15.342L12.635,10.646C12.635,9.261 12.046,8.834 11.286,8.834C10.484,8.834 9.696,9.438 9.696,10.68L9.696,15.342L6.99,15.342L6.99,6.745L9.593,6.745L9.593,7.936L9.627,7.936C9.889,7.407 10.803,6.503 12.2,6.503C13.709,6.503 15.341,7.399 15.341,10.025L15.341,15.342ZM4.011,5.547C3.15,5.547 2.451,4.891 2.451,3.994C2.451,3.096 3.15,2.44 4.011,2.44C4.873,2.44 5.572,3.096 5.572,3.994C5.572,4.891 4.873,5.547 4.011,5.547ZM5.365,15.335L2.658,15.335L2.658,6.738L5.365,6.738L5.365,15.335ZM16.671,0L1.328,0C0.594,0 0,0.595 0,1.329L0,16.672C0,17.405 0.594,18 1.328,18L16.671,18C17.405,18 18,17.405 18,16.672L18,1.329C18,0.595 17.405,0 16.671,0Z"
				style="fill:#fff;fill-rule:nonzero;" />
		</g>
	</svg>
</template>

<style>.linkedin-icon path {
	fill: white;
}</style>