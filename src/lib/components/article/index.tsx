import React, { forwardRef } from "react";
import { cn } from "@/utilities/cn";

export interface ArticleProps extends React.HTMLAttributes<HTMLElement> {
}

const Article = forwardRef<HTMLElement, ArticleProps>(
  (props: ArticleProps, ref: React.ForwardedRef<HTMLElement>) => {
    const _props: ArticleProps = {
      className: cn(props.className)
    };
    return (
      <article ref={ref} className={cn(_props.className)} />
    );
  }
);

export default Article;
