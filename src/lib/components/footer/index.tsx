import React, { forwardRef } from "react";
import { cn } from "@/utilities/cn";

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
}

const Footer = forwardRef<HTMLElement, FooterProps>(
  (props: FooterProps, ref: React.ForwardedRef<HTMLElement>) => {
    const _props: FooterProps = {
      className: cn(props.className)
    };
    return (
      <footer ref={ref} className={cn(_props.className)} />
    );
  }
);

export default Footer;
