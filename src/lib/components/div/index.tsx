import { type ForwardedRef, forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utilities/cn";

export interface DivProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
	className?: string;
}

const Div = forwardRef<HTMLDivElement, DivProps>(
	({ className, children, ...rest }: DivProps, ref: ForwardedRef<HTMLDivElement>) => {
		const _props: DivProps = {
			className: cn(className),
			children: children
		};
		return (
			<div ref={ref} className={cn(_props.className)} {...rest}>
				{_props.children}
			</div>
		);
	}
);

export default Div;
