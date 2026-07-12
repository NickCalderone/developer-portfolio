// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2026-04-24',
	css: ["~/assets/css/style.css"],
	app: {
		head: {
			title: "Nick Calderone | Full-Stack Web Developer",
			meta: [
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ charset: "utf-8" },
				{ "http-equiv": "X-UA-Compatible", content: "IE=edge" },
				{ name: "description", content: "Nick Calderone | Full-stack web developer based in Carbondale, Colorado | Building intuitive, engaging, accessible interfaces for businesses and municipalities" },
				{ property: "og:type", content: "website" },
				{ property: "og:url", content: "https://nickcalderone.dev/" },
				{ property: "og:site_name", content: "Nick Calderone's Developer Portfolio" },
				{ property: "og:title", content: "Nick Calderone | Full-Stack Web Developer" },
				{ property: "og:description", content: "Full-stack web developer based in Carbondale, Colorado, available for contract and full-time roles." },
				{ property: "og:image", content: "https://nickcalderone.dev/og-image.png" },
				{ property: "og:image:width", content: "1200" },
				{ property: "og:image:height", content: "630" },
				{ property: "og:image:type", content: "image/png" },
				{ name: "twitter:card", content: "summary_large_image" },
				{ name: "twitter:title", content: "Nick Calderone | Full-Stack Web Developer" },
				{ name: "twitter:description", content: "Full-stack web developer based in Carbondale, Colorado, available for contract and full-time roles." },
				{ name: "twitter:image", content: "https://nickcalderone.dev/og-image.png" }
			],
			link: [
				{ rel: "icon", type: "image/svg", sizes: "any", href: "logo-icon.svg" },
				{ rel: "canonical", href: "https://nickcalderone.dev/" }
			],
			style: [],
			script: [],
			noscript: []
		}
	}
})
