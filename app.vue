<script>
export default {
	data() {
		return {
			lastScrollPosition: 0
		}
	},
	mounted() {
		this.lastScrollPosition = window.pageYOffset;
		window.addEventListener("scroll", this.headerScrollHandler);

		if (this.lastScrollPosition != 0) {
			let myHeader = document.querySelector(".header");
			myHeader.classList.remove('header-top');
		}
	},
	methods: {
		headerScrollHandler(event) {
			let myHeader = document.querySelector(".header");
			let currentScrollPosition = window.pageYOffset;

			// if at the top of the page
			if (currentScrollPosition == 0) {
				myHeader.classList.remove('header-hidden');
				myHeader.classList.remove('header-scrolled');
				myHeader.classList.add('header-top');
			}
			// if scrolling down 
			else if (currentScrollPosition > this.lastScrollPosition) {
				console.log('scrolling');
				myHeader.classList.remove('header-top');
				myHeader.classList.add('header-hidden');
				myHeader.classList.add('header-scrolled');
			} 
			// if scrolling up 
			else {
				myHeader.classList.remove('header-hidden');
				myHeader.classList.add('header-scrolled');
			}

			this.lastScrollPosition = currentScrollPosition;
		}
	}
}
</script>

<template>
	<header class="header header-top">
		<div class="logo-wrapper">
			<p class="logo"><span class="logo-n">N</span><span class="logo-c">C</span></p>
		</div>
		<div vlass="menu-wrapper">
			<ul class="menu">
				<li><a href="#work">Work</a></li>
				<li><p>/</p></li>
				<li><a href="#about">About</a></li>
				<li><p>/</p></li>
				<li><a href="#contact">Contact</a></li>
			</ul>
		</div>
	</header>
	<NuxtPage />
</template>

<style>
.header {
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	background-color: var(--color-stripe-medium);
	box-shadow: 0 10px 30px -10px var(--header-shadow);
	position: fixed;
	opacity: .95;
	padding: 0px 50px;
	transition: transform .4s ease-in-out, height .3s ease-in-out, box-shadow .3s ease-in-out;
	z-index: 100;
}

.header-top {
	height: var(--header-height-top);
}

.header-scrolled {
	height: var(--header-height);
}

.header-hidden {
	transform: translateY(calc(var(--header-height) * -1));
	box-shadow: none;
}

.logo {
	font-size: 60px;
	font-family: var(--font-family-primary);
}

.logo-n {
	color: var(--color-secondary);
}

.logo-c {
	color: var(--color-quaternary);
}

.menu {
	display: flex;
	gap: 20px;
	align-items: center;
}

.menu li {
	list-style: none;
	color: var(--color-quaternary);
	font-size: 22px;
}

.menu li a {
	text-decoration: none;
	color: var(--color-quaternary);
	font-family: var(--font-family-primary);
	transition: color .3s ease-in-out;
}

.menu li p {
	cursor: default;
}

.menu li a:hover {
	color: var(--color-quinary);
}
</style>