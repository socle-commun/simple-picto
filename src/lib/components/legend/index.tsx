import { type ForwardedRef, forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utilities/cn";

export interface LegendProps extends HTMLAttributes<HTMLLegendElement> {
	children?: ReactNode;
	className?: string;
}

const Legend = forwardRef<HTMLLegendElement, LegendProps>(
	({ className, children, ...rest }: LegendProps, ref: ForwardedRef<HTMLLegendElement>) => {
		const _props: LegendProps = {
			className: cn(className),
			children: children
		};
		return (
			<legend ref={ref} className={cn(_props.className)} {...rest}>
				{_props.children}
			</legend>
		);
	}
);

export default Legend;
