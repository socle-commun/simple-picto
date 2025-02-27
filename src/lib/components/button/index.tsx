import { type ButtonHTMLAttributes, type ForwardedRef, forwardRef, type ReactNode } from "react";
import { cn } from "@/utilities/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode;
	className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, children, ...rest }: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
		const _props: ButtonProps = {
			className: cn(className),
			children: children
		};
		return (
			<button ref={ref} className={cn(_props.className)} {...rest}>
				{_props.children}
			</button>
		);
	}
);

export default Button;
