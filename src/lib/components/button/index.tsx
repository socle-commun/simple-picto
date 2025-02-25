import React, { forwardRef } from "react";
import { cn } from "@/utilities/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const _props: ButtonProps = {
      className: cn(props.className)
    };
    return (
      <button ref={ref} className={cn(_props.className)} />
    );
  }
);

export default Button;
