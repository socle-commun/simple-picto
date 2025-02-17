import { ReactNode } from "react";
import { NavLink } from "react-router";

interface BrandNameProps {
	children: ReactNode;
	className?: string;
	to: string;
}

export default function BrandName({ children, to, className = "" }: BrandNameProps) {
	return (
		<NavLink to={to} className={`nav-icon-button${className ? ` ${className}` : ""}`}>
			{children}
		</NavLink>
	)
}