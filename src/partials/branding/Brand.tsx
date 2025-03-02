import Logo from "./_Logo";
import RootLink from "./_RootLink";

import { cn } from "@/utilities/cn";

export default function Brand() {
	return (
		<RootLink>
			<Logo className={cn("size-12")} />
			<span>SimplePicto</span>
			<span className={cn("px-2 text-sm self-end font-medium bg-gradient-to-br from-[#ff0066] from-0% to-[#bd34fe] to-75% text-white rounded-full")}>{__APP_VERSION__}</span>
		</RootLink>
	)
}