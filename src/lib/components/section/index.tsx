import { type ForwardedRef, forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utilities/cn";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
	className?: string;
	children?: ReactNode;
}

const Section = forwardRef<HTMLElement, SectionProps>(
	({ className, children, ...rest }: SectionProps, ref: ForwardedRef<HTMLElement>) => {
		const _props: SectionProps = {
			className: cn(className),
			children: children
		};
		return (
			<section ref={ref} className={cn(_props.className)} {...rest}>
				{_props.children}
			</section>
		);
	}
);

export default Section;
