import { type FieldsetHTMLAttributes, type ForwardedRef, forwardRef, type ReactNode } from "react";
import { cn } from "@/utilities/cn";

export interface FieldsetProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
	children?: ReactNode;
	className?: string;
}

const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
	({ className, children, ...rest }: FieldsetProps, ref: ForwardedRef<HTMLFieldSetElement>) => {
		const _props: FieldsetProps = {
			className: cn(className),
			children: children
		};
		return (
			<fieldset ref={ref} className={cn(_props.className)} {...rest}>
				{_props.children}
			</fieldset>
		);
	}
);

export default Fieldset;
