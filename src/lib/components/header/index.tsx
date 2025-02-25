import React, { forwardRef } from "react";
import { cn } from "@/utilities/cn";

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
}

const Header = forwardRef<HTMLElement, HeaderProps>(
  (props: HeaderProps, ref: React.ForwardedRef<HTMLElement>) => {
    const _props: HeaderProps = {
      className: cn(props.className)
    };
    return (
      <header ref={ref} className={cn(_props.className)} />
    );
  }
);

export default Header;
