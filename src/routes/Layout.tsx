import { Outlet } from "react-router";

import Navigation from "@/partials/layout/TopBar";

export default function RootLayout() {
	return (
		<>
			<Navigation />
			<Outlet />
		</>
	)
}