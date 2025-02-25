import React, { forwardRef } from "react";
import { cn } from "@/utilities/cn";

export interface SpanProps extends React.HTMLAttributes<HTMLSpanElement> {
}

const Span = forwardRef<HTMLSpanElement, SpanProps>(
  (props: SpanProps, ref: React.ForwardedRef<HTMLSpanElement>) => {
    const _props: SpanProps = {
      className: cn(props.className)
    };
    return (
      <span ref={ref} className={cn(_props.className)} />
    );
  }
);

export default Span;
