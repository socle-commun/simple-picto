import Logo from "./_Logo";
import RootLink from "./_RootLink";

import { cn } from "@/utilities/cn";

export default function Brand() {
	return (
		<RootLink>
			<Logo className={cn("size-12")} />
			<span className={cn("hidden md:block")}>SimplePicto</span>
		</RootLink>
	)
}