import { type ForwardedRef, forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utilities/cn";

export interface ArticleProps extends HTMLAttributes<HTMLElement> {
	children?: ReactNode;
	className?: string;
}

const Article = forwardRef<HTMLElement, ArticleProps>(
	({ className, children, ...rest }: ArticleProps, ref: ForwardedRef<HTMLElement>) => {
		const _props: ArticleProps = {
			className: cn(className),
			children: children
		};
		return (
			<article ref={ref} className={cn(_props.className)} {...rest}>
				{_props.children}
			</article>
		);
	}
);

export default Article;
