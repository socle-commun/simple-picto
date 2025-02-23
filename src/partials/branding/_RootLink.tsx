import { ReactNode } from "react";
import { NavLink } from "react-router";

interface RootLinkProps {
	children: ReactNode;
}

export default function RootLink({ children }: RootLinkProps) {
	return (
		<NavLink to="/" className="flex items-center gap-1 font-black text-xl bg-gradient-to-br from-[#ff0066] from-0% to-[#bd34fe] to-75% bg-clip-text text-transparent">
			{children}
		</NavLink>
	)
}