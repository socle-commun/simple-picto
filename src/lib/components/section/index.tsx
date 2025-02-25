import React, { forwardRef } from "react";
import { cn } from "@/utilities/cn";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (props: SectionProps, ref: React.ForwardedRef<HTMLElement>) => {
    const _props: SectionProps = {
      className: cn(props.className)
    };
    return (
      <section ref={ref} className={cn(_props.className)} />
    );
  }
);

export default Section;
