import { type ForwardedRef, forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/utilities/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, ...rest }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
		const _props: InputProps = {
			className: cn(className)
		};
		return (
			<input ref={ref} className={cn(_props.className)} {...rest} />
		);
	}
);

export default Input;
