import { type ForwardedRef, forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utilities/cn";

export interface AsideProps extends HTMLAttributes<HTMLElement> {
	children?: ReactNode;
	className?: string;
}

const Aside = forwardRef<HTMLElement, AsideProps>(
	({ className, children, ...rest }: AsideProps, ref: ForwardedRef<HTMLElement>) => {
		const _props: AsideProps = {
			className: cn(className),
			children: children
		};
		return (
			<aside ref={ref} className={cn(_props.className)} {...rest}>
				{_props.children}
			</aside>
		);
	}
);

export default Aside;
