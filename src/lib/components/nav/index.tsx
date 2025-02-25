import React, { forwardRef } from "react";
import { cn } from "@/utilities/cn";

export interface NavProps extends React.HTMLAttributes<HTMLElement> {
}

const Nav = forwardRef<HTMLElement, NavProps>(
  (props: NavProps, ref: React.ForwardedRef<HTMLElement>) => {
    const _props: NavProps = {
      className: cn(props.className)
    };
    return (
      <nav ref={ref} className={cn(_props.className)} />
    );
  }
);

export default Nav;
