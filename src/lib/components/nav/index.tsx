import { type ForwardedRef, forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utilities/cn";

export interface NavProps extends HTMLAttributes<HTMLElement> {
	children?: ReactNode;
	className?: string;
}

const Nav = forwardRef<HTMLElement, NavProps>(
	({ className, children, ...rest }: NavProps, ref: ForwardedRef<HTMLElement>) => {
		const _props: NavProps = {
			className: cn(className),
			children: children
		};
		return (
			<nav ref={ref} className={cn(_props.className)} {...rest}>
				{_props.children}
			</nav>
		);
	}
);

export default Nav;
