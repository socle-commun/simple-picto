import { BrowserRouter, Route, Routes } from "react-router";

import AppProviders from "@/partials/AppProviders";

import RootLayout from "@/routes/Layout";
import RootError from "@/routes/Error";
import RootPage from "@/routes/Page";

import SettingsLayout from "@/routes/settings/Layout";
import SettingsPage from "@/routes/settings/Page";

function App() {
	return (
		<AppProviders>
			<BrowserRouter>
				<Routes>

					<Route path="" element={<RootLayout />}>
						<Route index element={<RootPage />} />

						<Route path="settings" element={<SettingsLayout />}>
							<Route index element={<SettingsPage />} />
						</Route>

						<Route path="*" element={<RootError />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AppProviders>
	)
}

export default App
