<script>
export default {

	props: ["mobileDevice"],

	data() {

		return {

			lastScrollPosition: 0,
			mobileMenuOpen: false,
			mobileMenuItems: undefined,
			mobileMenuFirst: undefined,
			mobileMenuLast: undefined,
			contentFocusable: undefined,
			header: undefined,
			menu: undefined,
			background: undefined,
			button: undefined,
			modal: undefined,
			body: undefined

		}

	},

	mounted() {
		let focusable = document.querySelectorAll(".js-mobile-menu-focusable")
		let menuLinks = document.querySelectorAll(".logo-anchor, .menu-wrapper a, .js-mobile-button");

		//set up variables
		this.lastScrollPosition = window.pageYOffset;
		this.header = document.querySelector(".header");
		this.menu = document.querySelector(".js-mobile-menu-wrapper");
		this.mobileMenuItems = document.querySelectorAll(".mobile-menu a");
		this.mobileMenuFirst = focusable[0];
		this.mobileMenuLast = focusable[focusable.length - 1];
		this.background = document.querySelector(".js-layout-wrapper");
		this.button = document.querySelector(".mobile-menu-button");
		this.modal = document.querySelector(".mobile-menu-wrapper");
		this.body = document.body;

		// handle focus while mobile menu is open
		this.mobileMenuFirst.addEventListener("keydown", this.focusBottom);
		this.mobileMenuLast.addEventListener("keydown", this.focusTop);

		// handle header on scroll event listener
		window.addEventListener("scroll", this.headerScrollHandler);

		// handle navbar when shift+tabbing into it after scrolling down
		menuLinks.forEach(e => { e.addEventListener("focus", this.tabHeaderHandler)});

		// handle menu on resize event listener
		window.addEventListener("resize", () => {

			// if resizing while mobile menu is open, close it and reset the button animation
			if (!this.mobileDevice && this.mobileMenuOpen) {
				this.resetMenu();
			}

		});

	},

	methods: {

		resetMenu() {

			// if the mobile menu is open, close it and reset the menu button animation
			if (this.mobileMenuOpen) {

				this.closeMenu(this.menu, this.body, this.background);
				this.animateSVG();

			}

		},

		headerScrollHandler() {

			// set up variables
			let myHeader = this.header;
			let currentScrollPosition = window.pageYOffset;

			// if at the top of the page, increase header height
			if (currentScrollPosition < 50) {

				myHeader.classList.remove('js-header-hidden');
				myHeader.classList.remove('js-header-scrolled');
				myHeader.classList.add('js-header-top');

			}

			// if scrolling down, hide the header
			else if (currentScrollPosition > this.lastScrollPosition) {

				myHeader.classList.remove('js-header-top');
				myHeader.classList.add('js-header-hidden');
				myHeader.classList.add('js-header-scrolled');

			}

			// if scrolling up show the header
			else {

				myHeader.classList.remove('js-header-hidden');
				myHeader.classList.add('js-header-scrolled');

			}

			// update scroll position state
			this.lastScrollPosition = currentScrollPosition;

		},

		tabHeaderHandler() {

			// set up variables
			let myHeader = this.header;
			let currentScrollPosition = window.pageYOffset;

			// if at the top of the page, show top header 
			if ( currentScrollPosition < 50 ) {

				myHeader.classList.remove('js-header-hidden');
				myHeader.classList.remove('js-header-scrolled');
				myHeader.classList.add('js-header-top');

			}

			// show scrolled header
			else {

				myHeader.classList.remove('js-header-hidden');
				myHeader.classList.add('js-header-scrolled');

			}

		},

		doorman() {

			// set up variables
			let menu = this.menu;
			let body = this.body;
			let background = this.background;

			// if the mobile menu is not open, open it
			if (!this.mobileMenuOpen) {

				this.openMenu(menu, body, background);

			}

			// if the menu is open, close it
			else {

				this.closeMenu(menu, body, background);

			}

		},

		openMenu(menu, body, background) {

			// add menu opened classes
			menu.classList.add('js-open');
			body.classList.add('js-frozen');
			background.classList.add('js-frozen');

			// allow focusing
			this.mobileMenuItems.forEach(node => {
				node.tabIndex = 0;
			})

			// update state
			this.mobileMenuOpen = true;

			// add listener that will close and reset the menu if clicked off of the menu
			body.addEventListener("click", this.modalControl);

		},

		closeMenu(menu, body, background) {

			// remove menu opened classes
			menu.classList.remove('js-open');
			body.classList.remove('js-frozen');
			background.classList.remove('js-frozen');

			// prevent focusing
			this.mobileMenuItems.forEach(node => {
				node.tabIndex = -1;
			})

			//update state
			this.mobileMenuOpen = false;

			// remove the exit mobile menu listener 
			body.removeEventListener("click", this.modalControl);

		},

		menuHandler() {

			// open or close the mobile menu
			this.doorman();

			// check menu state and update hamburger to match
			this.animateSVG();

		},

		animateSVG() {

			// set up variables
			let myButton = this.button;

			// if the menu is open, add class
			if (this.mobileMenuOpen) {
				myButton.classList.add('opened');
			}

			//if the menu is closed, remove class
			else {
				myButton.classList.remove('opened');
			}

			// set the aria attribute accordingly
			myButton.setAttribute('aria-expanded', myButton.classList.contains('opened'))

		},

		modalControl(e) {

			// set up variables
			let myButton = this.button;
			let myModal = this.modal;

			if (
				// if not clicking inside mobile menu container
				!myModal.contains(e.target) &&

				// if not clicking the menu button
				e.target != myButton

				// if not clicking the menu button svg
				&& !myButton.contains(e.target)) {

				// exit menu and update state
				this.menuHandler();
			}
		},

		focusBottom(e){
			
			// if menu is open and shift+tab is pressed
			if( this.mobileMenuOpen && e.key == "Tab" && e.shiftKey ){
				
				e.preventDefault();

				// move focus to the last menu item
				this.mobileMenuLast.focus();
			}

		},

		focusTop(e){

			// if menu is open and tab is pressed
			if( this.mobileMenuOpen && e.key == "Tab" && !e.shiftKey ){

				e.preventDefault();

				// move focus to the first item
				this.mobileMenuFirst.focus();

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
							<a class="menu-github-anchor" @click="resetMenu" href="https://github.com/NickCalderone"
								aria-label="See Nick Calderone's GitHub profile" target="_blank"
								rel="noreferrer noopener">
								<GithubMark class="github-icon-desktop" title-id="desktop-github-title"
									desc-id="desktop-github-desc" />
							</a>
						</li>
						<li class="menu-separator">
							<p>/</p>
						</li>
						<li class="menu-item">
							<a class="menu-anchor" href="#work">Work</a>
						</li>
						<li class="menu-separator">
							<p>/</p>
						</li>
						<li class="menu-item">
							<a class="menu-anchor" href="#about">About</a>
						</li>
						<li class="menu-separator">
							<p>/</p>
						</li>
						<li class="menu-item">
							<a class="menu-anchor" href="#contact">Contact</a>
						</li>
						<li class="menu-item">
							<a class="resume" href="/NickCalderone202302-8.pdf" target="_blank">
								<span class="resume-text">Resume</span>
								<NewTabResume title-id="desktop-new-tab-icon-title" desc-id="desktop-new-tab-icon-description" class="resume-new-tab" />
							</a>
						</li>
					</ul>
				</nav>
			</div>
			<Hamburger :menu-handler="menuHandler" class="hamburger-wrapper js-mobile-button js-mobile-menu-focusable" />
			<nav class="mobile-menu-wrapper js-mobile-menu-wrapper">
				<ul class="mobile-menu">
					<li class="mobile-menu-item">
						<a class="mobile-menu-anchor js-mobile-menu-focusable" tabindex="-1" @click="resetMenu" href="https://github.com/NickCalderone"
							aria-label="See Nick Calderone's GitHub profile" target="_blank" rel="noreferrer noopener">
							<GithubMark class="github-icon-mobile" title-id="mobile-github-title"
								desc-id="mobile-github-desc" />
						</a>
					</li>
					<li class="mobile-menu-item">
						<a class="mobile-menu-anchor js-mobile-menu-focusable" tabindex="-1" @click="resetMenu" href="#work">Work</a>
					</li>
					<li class="mobile-menu-item">
						<a class="mobile-menu-anchor js-mobile-menu-focusable" tabindex="-1" @click="resetMenu" href="#about">About</a>
					</li>
					<li class="mobile-menu-item">
						<a class="mobile-menu-anchor js-mobile-menu-focusable" tabindex="-1" @click="resetMenu" href="#contact">Contact</a>
					</li>
					<li class="mobile-menu-item">
						<a class="resume-mobile js-mobile-menu-focusable" tabindex="-1" href="/NickCalderone202302-8.pdf" target="_blank">
							<span class="resume-mobile-text">Resume</span>
							<NewTabResume title-id="mobile-new-tab-icon-title" desc-id="mobile-new-tab-icon-description" class="resume-new-tab" />
						</a>
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
	line-height: 0;
}

.menu li .menu-anchor {
	text-decoration: none;
	color: var(--color-quaternary);
	font-family: var(--font-family-primary);
	transition: color .3s ease-in-out;
}

.menu li p {
	cursor: default;
}

.menu .menu-anchor:hover {
	color: var(--color-quinary);
}

.github-icon-desktop path {
	transition: fill .3s ease-in-out;
}

.menu-github-anchor:hover .github-icon-desktop path {
	fill: var(--color-quinary);
}

.github-icon-desktop {
	height: 22px;
}

.resume {
	display: flex;
	align-items: center;
	border-style: solid;
	border-width: 2px;
	border-color: var(--color-quaternary);
	border-radius: 8px;
	padding: 12px 14px;
	font-family: var(--font-family-primary);
	text-decoration: none;
	margin-left: 30px;
	transition: background-color .3s ease-in-out;
}

.resume-text {
	font-family: inherit;
	font-size: inherit;
	padding-bottom: 1px;
	color: var(--color-quaternary);
	cursor: pointer;
}

.resume:hover {
	background-color: rgba(168, 218, 220, .1);
}

.resume-new-tab {
	height: 18px;
	width: 18px;
	margin-left: 10px;
}

@media only screen and (max-width: 800px) {

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
		align-items: center;
		gap: 60px;
	}

	.mobile-menu li {
		list-style: none;
		color: var(--color-quaternary);
		font-size: 30px;
	}

	.mobile-menu li .mobile-menu-anchor {
		text-decoration: none;
		padding: 15px;
		color: var(--color-quaternary);
		font-family: var(--font-family-primary);
		transition: color .3s ease-in-out;
	}

	.github-icon-mobile {
		height: 30px;
	}

	.resume-mobile {
		display: flex;
		align-items: center;
		border-style: solid;
		border-width: 2px;
		border-color: var(--color-quaternary);
		border-radius: 12px;
		padding: 6px 12px;
		font-family: var(--font-family-primary);
		text-decoration: none;
	}

	.resume-mobile-text {
		font-family: inherit;
		font-size: inherit;
		padding-bottom: 1px;
		color: var(--color-quaternary);
		cursor: pointer;
	}

	.resume-new-tab {
		height: 18px;
		width: 18px;
		margin-left: 10px;
	}

}
</style>