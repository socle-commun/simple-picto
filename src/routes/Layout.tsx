import { Outlet } from "react-router";

import TopBar from "@/partials/layout/TopBar";

export default function RootLayout() {
	return (
		<>
			<TopBar />
			<Outlet />
		</>
	)
}