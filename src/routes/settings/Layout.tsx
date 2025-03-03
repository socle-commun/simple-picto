import { Outlet } from "react-router";

import Div from "@/lib/components/div";
import Main from "@/lib/components/main";

import { cn } from "@/utilities/cn";

export default function SettingsLayout() {
	return (
		<>
			<Main role="main" className={cn("p-2 sm:p-4 lg:p-8")}>
				<Div className={cn("flex flex-col gap-4 lg:w-3xl lg:mx-auto ")}>
					<Outlet />
				</Div>
			</Main>
		</>
	)
}