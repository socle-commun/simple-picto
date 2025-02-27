import { type ForwardedRef, forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utilities/cn";

export interface SpanProps extends HTMLAttributes<HTMLSpanElement> {
	className?: string;
	children?: ReactNode;
}

const Span = forwardRef<HTMLSpanElement, SpanProps>(
	({ className, children, ...rest }: SpanProps, ref: ForwardedRef<HTMLSpanElement>) => {
		const _props: SpanProps = {
			className: cn(className),
			children: children
		};
		return (
			<span ref={ref} className={cn(_props.className)} {...rest}>
				{_props.children}
			</span>
		);
	}
);

export default Span;
