import { type ReactNode } from "react";

import { cn } from "@/utilities/cn";

interface AppProvidersProps {
	children: ReactNode;
}

export default function FilterSideBar({ children }: AppProvidersProps) {
	return (
		<aside role="complementary" className={cn("w-16 md:w-3xs px-2 sm:px-6 lg:px-8 py-4 flex flex-col gap-2 bg-zinc-200 dark:bg-zinc-800")}>
			{children}
		</aside>
	)
}