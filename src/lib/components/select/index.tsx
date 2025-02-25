import React, { forwardRef } from "react";
import { cn } from "@/utilities/cn";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (props: SelectProps, ref: React.ForwardedRef<HTMLSelectElement>) => {
    const _props: SelectProps = {
      className: cn(props.className)
    };
    return (
      <select ref={ref} className={cn(_props.className)} />
    );
  }
);

export default Select;
