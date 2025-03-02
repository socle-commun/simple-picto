import { Outlet } from "react-router";

import { cn } from "@/utilities/cn";

export default function SettingsLayout() {
	return (
		<>
			<main role="main" className={cn("p-2 sm:p-4 lg:p-8")}>
				<div className={cn("flex flex-col gap-4")}>
					<Outlet />
				</div>
			</main>
		</>
	)
}