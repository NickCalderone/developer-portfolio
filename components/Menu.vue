<script>
export default {
	data() {
		return {
			lastScrollPosition: 0,
			mobileMenuOpen: false
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
		},
		mobileMenuHandler() {
			console.log(!this.mobileMenuOpen);
			if (!this.mobileMenuOpen) {
				this.freeze();
			} else {
				this.unFreeze();
			}
		},
		freeze() {
			let menu = document.querySelector(".js-mobile-menu-wrapper")
			let body = document.body;
			let background = document.querySelector(".layout-wrapper");

			menu.classList.add('js-open');
			this.mobileMenuOpen = true;
			body.classList.add('js-frozen');
			background.classList.add('js-frozen')

			// add handler for clicking outside of the mobile menu
			document.body.addEventListener("click", this.modalControl);
		},
		unFreeze() {
			let menu = document.querySelector(".js-mobile-menu-wrapper")
			let body = document.body;
			let background = document.querySelector(".layout-wrapper");

			menu.classList.remove('js-open');
			this.mobileMenuOpen = false;
			body.classList.remove('js-frozen');
			background.classList.remove('js-frozen')

			document.body.removeEventListener("click", this.modalControl);
		},
		linkHandler() {

			//copied fro unFreeze()
			let menu = document.querySelector(".js-mobile-menu-wrapper")
			let body = document.body;
			let background = document.querySelector(".layout-wrapper");

			menu.classList.remove('js-open');
			this.mobileMenuOpen = false;
			body.classList.remove('js-frozen');
			background.classList.remove('js-frozen')

			//copied from clickHandler in Hamburger.vue
			let myButton = document.querySelector(".mobile-menu-button");
			myButton.classList.toggle('opened');
			myButton.setAttribute('aria-expanded', myButton.classList.contains('opened'))
			
			document.body.removeEventListener("click", this.modalControl);
		},
		modalControl(e) {
			let myButton = document.querySelector(".mobile-menu-button");
			let myModal = document.querySelector(".mobile-menu-wrapper");
			console.log(e.target);
			console.log(myButton);

			// if not clicking inside menu, not clicking the menu button, not clicking the svg inside the button...
			if (!myModal.contains(e.target) && e.target != myButton && !myButton.contains(e.target)) {
				this.mobileMenuHandler();

				//copied from Hamburger.vue
				let myButton = document.querySelector(".mobile-menu-button");
				myButton.classList.toggle('opened');
				myButton.setAttribute('aria-expanded', myButton.classList.contains('opened'))
			}
		}
	}
}
</script>
<template>
	<header class="header header-top js-header">
		<div class="header-inner">
			<div class="logo-wrapper">
				<p class="logo"><span class="logo-n">N</span><span class="logo-c">C</span></p>
			</div>
			<nav class="menu-wrapper">
				<ul class="menu">
					<li class="menu-item">
						<a href="#work">Work</a>
					</li>
					<li class="menu-separator">
						<p>/</p>
					</li>
					<li class="menu-item">
						<a href="#about">About</a>
					</li>
					<li class="menu-separator">
						<p>/</p>
					</li>
					<li class="menu-item">
						<a href="#contact">Contact</a>
					</li>
				</ul>
			</nav>
		</div>
		<Hamburger @click="mobileMenuHandler" class="hamburger-wrapper js-mobile-button" />
		<nav class="mobile-menu-wrapper js-mobile-menu-wrapper">
			<ul class="mobile-menu">
				<li class="mobile-menu-item">
					<a @click="linkHandler" href="#work">Work</a>
				</li>
				<li class="mobile-menu-separator">
					<p>/</p>
				</li>
				<li class="mobile-menu-item">
					<a @click="linkHandler" href="#about">About</a>
				</li>
				<li class="mobile-menu-separator">
					<p>/</p>
				</li>
				<li class="mobile-menu-item">
					<a @click="linkHandler" href="#contact">Contact</a>
				</li>
			</ul>
		</nav>
	</header>
</template>

<style>
.header {
	position: fixed;
	width: 100%;
	z-index: 15;
	top: 0;
	box-shadow: 0 10px 30px -10px var(--header-shadow);
	transition: box-shadow .3s ease-in-out, transform .4s ease-in-out, height .3s ease-in-out;
}

.header-hidden {
	box-shadow: none;
	transform: translateY(calc(var(--header-height) * -1));
}

.header-inner {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	background-color: var(--color-stripe-medium);
	opacity: .95;
	padding: 0px 50px;
	height: 100%;
}

.hamburger-wrapper {
	display: none;
}

.header-top {
	height: var(--header-height-top);
}

.header-scrolled {
	height: var(--header-height);
}

.logo {
	font-size: 60px;
	font-family: var(--font-family-primary);
	line-height: 1;
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

.mobile-menu-wrapper {
	display: none;
}

@media only screen and (max-width: 700px) {
	body.js-frozen {
		overflow: hidden;
	}

	.layout-wrapper {
		transition: filter var(--transition-length) ease-in-out;
	}

	.layout-wrapper.js-frozen {
		filter: blur(10px);
		pointer-events: none;
	}

	body {
		background-color: var(--color-primary);
	}

	.header-inner {
		padding-left: 25px;
		padding: 0 0 0 15px;
		opacity: .98;
	}

	.hamburger-wrapper {
		display: block;
		padding: 0px 5px 0px 0px;
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 20;
	}

	.menu-wrapper {
		display: none;
	}

	.mobile-menu-wrapper {
		padding: 30px 30px;
		min-width: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--color-tertiary);
		opacity: .98;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
	}

	.js-mobile-menu-wrapper {
		transform: translateX(100%);
		transition: .25s transform ease-in-out;
	}

	.js-mobile-menu-wrapper.js-open {
		transform: translateX(0%);
	}

	.mobile-menu {
		padding-left: 0;
		flex-direction: column
	}

	.mobile-menu li {
		list-style: none;
		color: var(--color-quaternary);
		font-size: 30px;
	}

	.mobile-menu li a {
		text-decoration: none;
		color: var(--color-quaternary);
		font-family: var(--font-family-primary);
		transition: color .3s ease-in-out;
	}

	.mobile-menu-separator {
		display: none;
	}

	.js-resize-animation-stopper {
		animation: none !important;
		transition: none !important;
	}

}
</style>