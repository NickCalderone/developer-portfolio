// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	css: ["~/assets/css/style.css"],
	app: {
		head: {
			title: "Nick Calderone's Developer Portfolio",
			meta: [
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ charset: "utf-8" },
				{ "http-equiv": "X-UA-Compatible", content: "IE=edge" },
				{ name: "description", content: "Nick Calderone is a front-end developer who builds intuitive, engaging, & accessible interfaces for the web." }
			],
			link: [
				{ rel: "icon", type: "image/svg", sizes: "any", href: "logo-icon.svg" }
			],
			style: [],
			script: [],
			noscript: []
		}
	}
})
