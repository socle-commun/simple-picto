import { type ForwardedRef, forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utilities/cn";

export interface MeterProps extends HTMLAttributes<HTMLMeterElement> {
	children?: ReactNode;
	className?: string;
}

const Meter = forwardRef<HTMLMeterElement, MeterProps>(
	({ className, children, ...rest }: MeterProps, ref: ForwardedRef<HTMLMeterElement>) => {
		const _props: MeterProps = {
			className: cn(className),
			children: children
		};
		return (
			<meter ref={ref} className={cn(_props.className)} {...rest}>
				{_props.children}
			</meter>
		);
	}
);

export default Meter;
