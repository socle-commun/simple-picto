import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	base: '/simple-picto/',
	title: "SimplePicto Documentation",
	description: "The SimplePicto documentation website",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Documentation utilisateur', link: '/users' },
			{ text: 'Documentation développeur', link: '/developers' }
		],

		sidebar: [
			// {
			// 	text: 'Examples',
			// 	items: [
			// 		{ text: 'Markdown Examples', link: '/markdown-examples' },
			// 		{ text: 'Runtime API Examples', link: '/api-examples' }
			// 	],
			// }
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }
		]
	}
})
