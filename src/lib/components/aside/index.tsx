import React, { forwardRef } from "react";
import { cn } from "@/utilities/cn";

export interface AsideProps extends React.HTMLAttributes<HTMLElement> {
}

const Aside = forwardRef<HTMLElement, AsideProps>(
  (props: AsideProps, ref: React.ForwardedRef<HTMLElement>) => {
    const _props: AsideProps = {
      className: cn(props.className)
    };
    return (
      <aside ref={ref} className={cn(_props.className)} />
    );
  }
);

export default Aside;
