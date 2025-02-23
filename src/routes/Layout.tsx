import { Outlet } from "react-router";

// import TopBar from "@/partials/layout/TopBar";
import Nav from "@/components/nav/Nav";

export default function RootLayout() {
	return (
		<>
			{/* <TopBar /> */}
			<Nav />
			<Outlet />
		</>
	)
}