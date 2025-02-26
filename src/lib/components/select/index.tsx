import { type ForwardedRef, forwardRef, type ReactNode, type SelectHTMLAttributes } from "react";
import { cn } from "@/utilities/cn";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	className?: string;
	children?: ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
	({ className, children, ...rest }: SelectProps, ref: ForwardedRef<HTMLSelectElement>) => {
		const _props: SelectProps = {
			className: cn(className),
			children
		};
		return (
			<select ref={ref} className={cn(_props.className)} {...rest}>
				{_props.children}
			</select>
		);
	}
);

export default Select;
