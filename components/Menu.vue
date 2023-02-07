<script>
export default {
	props: ["mobileDevice"],
	data() {
		return {
			lastScrollPosition: 0,
			mobileMenuOpen: false,
			header: undefined,
			menu: undefined,
			background: undefined,
			button: undefined,
			modal: undefined,
			body: undefined
		}
	},
	mounted() {
		//set up variables
		this.lastScrollPosition = window.pageYOffset;
		this.header = document.querySelector(".header");
		this.menu = document.querySelector(".js-mobile-menu-wrapper");
		this.background = document.querySelector(".js-layout-wrapper");
		this.button = document.querySelector(".mobile-menu-button");
		this.modal = document.querySelector(".mobile-menu-wrapper");
		this.body = document.body;

		window.addEventListener("scroll", this.headerScrollHandler);
		window.addEventListener("resize", () => {

			// if resizing while mobile menu is open, close it and reset the button animation
			if (!this.mobileDevice && this.mobileMenuOpen) {
				this.resetMenu();
			}
		});
	},
	methods: {
		resetMenu() {

			let opened = this.mobileMenuOpen;

			if (opened) {

				let menu = this.menu;
				let body = this.body;
				let background = this.background;

				this.closeMenu(menu, body, background);

				this.animateSVG();

			}
		},
		headerScrollHandler() {
			let myHeader = this.header;
			let currentScrollPosition = window.pageYOffset;

			// if at the top of the page
			if (currentScrollPosition < 50) {

				myHeader.classList.remove('js-header-hidden');
				myHeader.classList.remove('js-header-scrolled');
				myHeader.classList.add('js-header-top');

			}
			// if scrolling down 
			else if (currentScrollPosition > this.lastScrollPosition) {

				myHeader.classList.remove('js-header-top');
				myHeader.classList.add('js-header-hidden');
				myHeader.classList.add('js-header-scrolled');

			}
			// if scrolling up 
			else {

				myHeader.classList.remove('js-header-hidden');
				myHeader.classList.add('js-header-scrolled');

			}

			// update scroll position
			this.lastScrollPosition = currentScrollPosition;
		},
		freezeHandler() {

			let opened = this.mobileMenuOpen;
			let menu = this.menu;
			let body = this.body;
			let background = this.background;

			// open menu
			if (!opened) {

				this.openMenu(menu, body, background);

				// close menu
			} else {

				this.closeMenu(menu, body, background);

			}
		},
		openMenu(menu, body, background) {

			menu.classList.add('js-open');
			body.classList.add('js-frozen');
			background.classList.add('js-frozen');

			// update mobile menu
			this.mobileMenuOpen = true;

			// freeze the rest of the app while the menu is open
			body.addEventListener("click", this.modalControl);

		},
		closeMenu(menu, body, background) {

			menu.classList.remove('js-open');
			body.classList.remove('js-frozen');
			background.classList.remove('js-frozen');

			//update mobile menu
			this.mobileMenuOpen = false;

			// remove app freeze listener
			body.removeEventListener("click", this.modalControl);

		},
		menuHandler() {
			console.log("hey");

			this.freezeHandler();
			this.animateSVG();

		},
		animateSVG() {
			let myButton = this.button;
			myButton.classList.toggle('opened');
			myButton.setAttribute('aria-expanded', myButton.classList.contains('opened'))
		},
		modalControl(e) {
			let myButton = this.button;
			let myModal = this.modal;

			// if not clicking inside menu, not clicking the menu button, not clicking the svg inside the button...
			if (!myModal.contains(e.target) && e.target != myButton && !myButton.contains(e.target)) {

				this.menuHandler();
			}
		}
	}
}
</script>
<template>
	<header>
		<div class="header js-header js-header-top">
			<div class="header-inner">
				<a class="logo-anchor" href="#top" @click="resetMenu">
					<div class="logo-wrapper">
						<p class="logo"><span class="logo-n">N</span><span class="logo-c">C</span></p>
					</div>
				</a>
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
			<Hamburger :menu-handler="menuHandler" class="hamburger-wrapper js-mobile-button" />
			<nav class="mobile-menu-wrapper js-mobile-menu-wrapper">
				<ul class="mobile-menu">
					<li class="mobile-menu-item">
						<a @click="resetMenu" href="#work">Work</a>
					</li>
					<li class="mobile-menu-separator">
						<p>/</p>
					</li>
					<li class="mobile-menu-item">
						<a @click="resetMenu" href="#about">About</a>
					</li>
					<li class="mobile-menu-separator">
						<p>/</p>
					</li>
					<li class="mobile-menu-item">
						<a @click="resetMenu" href="#contact">Contact</a>
					</li>
				</ul>
			</nav>
		</div>
	</header>
</template>

<style>
header .js-header-top {
	height: var(--header-height-top);
}

header .js-header-scrolled {
	height: var(--header-height);
}

.header {
	position: fixed;
	/* height: var(--header-height-top); */
	width: 100%;
	z-index: 15;
	top: 0;
	box-shadow: 0 10px 30px -10px var(--header-shadow);
	transition: box-shadow .3s ease-in-out, transform .3s ease-in-out, height .3s ease-in-out;
}

.mobile-menu-wrapper {
	display: none;
}

.js-header-hidden {
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

.logo-anchor {
	text-decoration: none;
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

@media only screen and (max-width: 700px) {
	.mobile-menu-wrapper {
		padding: 30px 30px;
		min-width: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--color-primary);
		box-shadow: none;
		opacity: .98;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
	}

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

	.js-mobile-menu-wrapper {
		transform: translateX(100%);
		transition: .25s transform ease-in-out, .25s box-shadow ease-in-out;
	}

	.js-mobile-menu-wrapper.js-open {
		transform: translateX(0%);
		box-shadow: 0 10px 30px -10px var(--header-shadow);
	}

	.mobile-menu {
		padding-left: 0;
		display: flex;
		flex-direction: column;
		gap: 60px;
	}

	.mobile-menu li {
		list-style: none;
		color: var(--color-quaternary);
		font-size: 30px;
	}

	.mobile-menu li a {
		text-decoration: none;
		padding: 15px;
		color: var(--color-quaternary);
		font-family: var(--font-family-primary);
		transition: color .3s ease-in-out;
	}

	.mobile-menu-separator {
		display: none;
	}

}
</style>