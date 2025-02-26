import { type ForwardedRef, forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utilities/cn";

export interface MainProps extends HTMLAttributes<HTMLElement> {
	className?: string;
	children?: ReactNode;
}

const Main = forwardRef<HTMLElement, MainProps>(
	({ className, children, ...rest }: MainProps, ref: ForwardedRef<HTMLElement>) => {
		const _props: MainProps = {
			className: cn(className),
			children: children
		};
		return (
			<main ref={ref} className={cn(_props.className)} {...rest}>
				{_props.children}
			</main>
		);
	}
);

export default Main;
