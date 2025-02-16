import { NavLink, Outlet } from "react-router";

export default function RootLayout() {
	return (
		<>
			<header>
				<nav>
					<NavLink to="/">Home</NavLink>
					<NavLink to="/settings">Settings</NavLink>
					<NavLink to="/error">Error</NavLink>
				</nav>
			</header>

			<Outlet />
		</>
	)
}