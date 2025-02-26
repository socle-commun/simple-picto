import { type ForwardedRef, forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/utilities/cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	className?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, ...rest }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
		const _props: TextareaProps = {
			className: cn(className)
		};
		return (
			<textarea ref={ref} className={cn(_props.className)} {...rest} />
		);
	}
);

export default Textarea;
