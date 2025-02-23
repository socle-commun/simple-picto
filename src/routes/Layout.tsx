import { useState } from "react";

import { Outlet } from "react-router";

import ResponsiveTopBar from "@/components/nav/ResponsiveTopBar";

import Brand from "@/partials/branding/Brand";
import TopBarNavLink from "@/components/nav/TopBarNavLink";

export default function RootLayout() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = () => setIsOpen(!isOpen);

	return (
		<>
			<ResponsiveTopBar
				isOpen={isOpen}
				onClick={toggleOpen}
				brand={<Brand />}>
				<TopBarNavLink to="/settings">
					<span className="icon">settings</span>
					<span>Settings</span>
				</TopBarNavLink>
			</ResponsiveTopBar>


			<Outlet />
		</>
	)
}