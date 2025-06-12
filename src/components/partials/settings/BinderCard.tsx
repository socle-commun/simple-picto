import { type ReactNode } from "react";

import Div from "@/lib/components/div";

import { cn } from "@/utilities/cn";

export interface BinderCardProps {
	children?: ReactNode;
	className?: string;
}

export default function BinderCard({ children, className }: BinderCardProps) {
	return (
		<Div className={cn("flex flex-col px-4 pt-6 pb-2 gap-2 border border-zinc-600 dark:border-zinc-400 overflow-hidden rounded-md", className)}>
			{children}
		</Div>
	);
}