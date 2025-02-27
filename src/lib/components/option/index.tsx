import { type ForwardedRef, forwardRef, type OptionHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utilities/cn";

export interface OptionProps extends OptionHTMLAttributes<HTMLOptionElement> {
	children?: ReactNode;
	className?: string;
}

const Option = forwardRef<HTMLOptionElement, OptionProps>(
	({ className, children, ...rest }: OptionProps, ref: ForwardedRef<HTMLOptionElement>) => {
		const _props: OptionProps = {
			className: cn(className),
			children
		};
		return (
			<option ref={ref} className={cn(_props.className)} {...rest}>
				{_props.children}
			</option>
		);
	}
);

export default Option;
