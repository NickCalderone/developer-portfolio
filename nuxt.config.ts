// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	css: ["~/assets/css/style.css"],
	app: {
		head: {
			title: "Nick Calderone's Developer Portfolio",
			meta: [
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ charset: "utf-8" },
				{ "http-equiv": "X-UA-Compatible", content: "IE=edge"}
			],
			link: [],
			style: [], 
			script: [], 
			noscript: []
		}
		// title: "Nick Calderone's Developer Portfolio"
	}
})
