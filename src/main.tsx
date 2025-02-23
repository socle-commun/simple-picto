import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "@/features/i18n";

import App from "@/App.tsx"

import "@/style/index.css"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
)
