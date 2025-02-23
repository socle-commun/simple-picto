import { Link, Outlet } from "react-router";

import SideNav from "@/partials/settings/SideNav";

export default function SettingsLayout() {
	return (
		<>
			<SideNav>
				<nav>
					<ul className="flex flex-col gap-2">
						<li>
							<Link to="profile">Profile</Link>
						</li>
						<li>
							<Link to="account">Account</Link>
						</li>
						<li>
							<Link to="notifications">Notifications</Link>
						</li>
					</ul>
				</nav>
			</SideNav>

			<main>
				<Outlet />
			</main>
		</>
	)
}