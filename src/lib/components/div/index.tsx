import React, { forwardRef } from "react";
import { cn } from "@/utilities/cn";

export interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
}

const Div = forwardRef<HTMLDivElement, DivProps>(
  (props: DivProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const _props: DivProps = {
      className: cn(props.className)
    };
    return (
      <div ref={ref} className={cn(_props.className)} />
    );
  }
);

export default Div;
