import { ReactNode } from "react";

import { NavLink } from "react-router";

import { cn } from "@/utilities/cn";

interface TopBarNavLinkProps {
	children: ReactNode;
	className?: string;
	to: string;
}

export default function TopBarNavLink({ children, to, className = "" }: TopBarNavLinkProps) {
	return (
		<li>
			<NavLink to={to} className={cn("flex items-center gap-2 text-center", className)}>
				{children}
			</NavLink>
		</li>
	)
}