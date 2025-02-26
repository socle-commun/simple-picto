import { type ForwardedRef, forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utilities/cn";

export interface FooterProps extends HTMLAttributes<HTMLElement> {
	children?: ReactNode;
	className?: string;
}

const Footer = forwardRef<HTMLElement, FooterProps>(
	({ className, children, ...rest }: FooterProps, ref: ForwardedRef<HTMLElement>) => {
		const _props: FooterProps = {
			className: cn(className),
			children: children
		};
		return (
			<footer ref={ref} className={cn(_props.className)} {...rest}>
				{_props.children}
			</footer>
		);
	}
);

export default Footer;
