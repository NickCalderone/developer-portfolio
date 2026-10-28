// Nuxt hardcodes x-powered-by on rendered pages; strip it so the framework isn't advertised
export default defineNitroPlugin((nitroApp) => {
	nitroApp.hooks.hook("render:response", (response) => {
		delete response.headers["x-powered-by"]
	})
})
