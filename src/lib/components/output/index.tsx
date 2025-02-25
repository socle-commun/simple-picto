import React, { forwardRef } from "react";
import { cn } from "@/utilities/cn";

export interface OutputProps extends React.HTMLAttributes<HTMLElement> {
}

const Output = forwardRef<HTMLElement, OutputProps>(
  (props: OutputProps, ref: React.ForwardedRef<HTMLElement>) => {
    const _props: OutputProps = {
      className: cn(props.className)
    };
    return (
      <output ref={ref} className={cn(_props.className)} />
    );
  }
);

export default Output;
