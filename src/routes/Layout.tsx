import { NavLink, Outlet } from "react-router";

import BrandName from "@/components/branding/BrandName";
import Logo from "@/components/branding/Logo";

export default function RootLayout() {
	return (
		<>
			<header>
				<nav>
					<section>
						<BrandName>
							<Logo className="size-12" />
							<span>SimplePicto</span>
						</BrandName>
					</section>
					<section></section>
					<section>
						<NavLink to="/settings">Settings</NavLink>
					</section>
				</nav>
			</header>

			<Outlet />
		</>
	)
}