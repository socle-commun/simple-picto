import { type ForwardedRef, forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utilities/cn";

export interface OutputProps extends HTMLAttributes<HTMLOutputElement> {
	className?: string;
	children?: ReactNode;
}

const Output = forwardRef<HTMLOutputElement, OutputProps>(
	({ className, children, ...rest }: OutputProps, ref: ForwardedRef<HTMLOutputElement>) => {
		const _props: OutputProps = {
			className: cn(className),
			children: children
		};
		return (
			<output ref={ref} className={cn(_props.className)} {...rest}>
				{_props.children}
			</output>
		);
	}
);

export default Output;
