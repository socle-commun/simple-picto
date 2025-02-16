import { Outlet } from "react-router";

export default function RootLayout() {
	return (
		<>
			<aside></aside>

			<main>
				<Outlet />
			</main>
		</>
	)
}