import React, { forwardRef } from "react";
import { cn } from "@/utilities/cn";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
	({ className, ...rest }: SelectProps, ref: React.ForwardedRef<HTMLSelectElement>) => {
		const _props: SelectProps = {
			className: cn(className),
			...rest
		};
		return (
			<select ref={ref} className={cn(_props.className)} {...rest} />
		);
	}
);

export default Select;
