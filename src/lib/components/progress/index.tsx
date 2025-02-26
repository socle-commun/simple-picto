import { type ForwardedRef, forwardRef, type ProgressHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utilities/cn";

export interface ProgressProps extends ProgressHTMLAttributes<HTMLProgressElement> {
	className?: string;
	children?: ReactNode;
}

const Progress = forwardRef<HTMLProgressElement, ProgressProps>(
	({ className, children, ...rest }: ProgressProps, ref: ForwardedRef<HTMLProgressElement>) => {
		const _props: ProgressProps = {
			className: cn(className),
			children: children
		};
		return (
			<progress ref={ref} className={cn(_props.className)} {...rest}>
				{_props.children}
			</progress>
		);
	}
);

export default Progress;
