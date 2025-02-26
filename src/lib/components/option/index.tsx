import React, { forwardRef } from "react";
import { cn } from "@/utilities/cn";

export interface OptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
}

const Option = forwardRef<HTMLOptionElement, OptionProps>(
	({ className, ...rest }: OptionProps, ref: React.ForwardedRef<HTMLOptionElement>) => {
		const _props: OptionProps = {
			className: cn(className),
			...rest
		};
		return (
			<option ref={ref} className={cn(_props.className)} {...rest} />
		);
	}
);

export default Option;
