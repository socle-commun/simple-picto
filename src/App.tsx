import { useEffect } from "react";

import { BrowserRouter, Route, Routes } from "react-router";

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react";

import toggleDarkClass from "@/features/theming/toggleDarkClass";

import AppProviders from "@/partials/AppProviders";

import RootLayout from "@/routes/Layout";
import RootError from "@/routes/Error";
import RootPage from "@/routes/Page";

import SettingsLayout from "@/routes/settings/Layout";
import SettingsPage from "@/routes/settings/Page";
import BinderEditPage from "@/routes/settings/[uuid]/Page";

function App() {
	useEffect(() => {
		toggleDarkClass();
	}, []);

	return (
		<AppProviders>
			{/* Vercel tooling */}
			<Analytics />
			<SpeedInsights />

			{/* App */}
			<BrowserRouter>
				<Routes>

					<Route path="" element={<RootLayout />}>
						<Route index element={<RootPage />} />

						<Route path="settings" element={<SettingsLayout />}>
							<Route index element={<SettingsPage />} />
							<Route path=":uuid" element={<BinderEditPage />} />
						</Route>

						<Route path="*" element={<RootError />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AppProviders>
	)
};

export default App
