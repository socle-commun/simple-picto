import { type ForwardedRef, forwardRef, type LabelHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utilities/cn";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
	children?: ReactNode;
	className?: string;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
	({ className, children, ...rest }: LabelProps, ref: ForwardedRef<HTMLLabelElement>) => {
		const _props: LabelProps = {
			className: cn(className),
			children: children
		};
		return (
			<label ref={ref} className={cn(_props.className)} {...rest}>
				{_props.children}
			</label>
		);
	}
);

export default Label;
