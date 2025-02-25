import React, { forwardRef } from "react";
import { cn } from "@/utilities/cn";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (props: LabelProps, ref: React.ForwardedRef<HTMLLabelElement>) => {
    const _props: LabelProps = {
      className: cn(props.className)
    };
    return (
      <label ref={ref} className={cn(_props.className)} />
    );
  }
);

export default Label;
