import { ReactNode } from "react";
import { NavLink } from "react-router";

interface BrandNameProps {
	children: ReactNode;
}

export default function BrandName({ children }: BrandNameProps) {
	return (
		<NavLink to="/" className="brand">
			{children}
		</NavLink>
	)
}