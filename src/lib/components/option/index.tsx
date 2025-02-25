import React, { forwardRef } from "react";
import { cn } from "@/utilities/cn";

export interface OptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
}

const Option = forwardRef<HTMLOptionElement, OptionProps>(
  (props: OptionProps, ref: React.ForwardedRef<HTMLOptionElement>) => {
    const _props: OptionProps = {
      className: cn(props.className)
    };
    return (
      <option ref={ref} className={cn(_props.className)} />
    );
  }
);

export default Option;
