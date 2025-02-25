import React, { forwardRef } from "react";
import { cn } from "@/utilities/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const _props: InputProps = {
      className: cn(props.className)
    };
    return (
      <input ref={ref} className={cn(_props.className)} />
    );
  }
);

export default Input;
