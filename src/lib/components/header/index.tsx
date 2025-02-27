import { type ForwardedRef, forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utilities/cn";

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
	children?: ReactNode;
	className?: string;
}

const Header = forwardRef<HTMLElement, HeaderProps>(
	({ className, children, ...rest }: HeaderProps, ref: ForwardedRef<HTMLElement>) => {
		const _props: HeaderProps = {
			className: cn(className),
			children: children
		};
		return (
			<header ref={ref} className={cn(_props.className)} {...rest}>
				{_props.children}
			</header>
		);
	}
);

export default Header;
