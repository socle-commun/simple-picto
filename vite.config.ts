import { defineConfig } from "vite";

import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					"dexie": ["dexie", "dexie-react-hooks"],
					"i18-next": ["i18next", "react-i18next", "i18next-http-backend", "i18next-browser-languagedetector"],
					"react": ["react", "react-dom"],
					"react-router": ["react-router"],
					"recoil": ["recoil"],
				}
			}
		},
		minify: process.env.NODE_ENV === "production" ? "terser" : false,
		terserOptions: {
			compress: {
				passes: 2
			},
			mangle: true,
			format: {
				comments: false
			}
		}
	},
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		}
	}
});
