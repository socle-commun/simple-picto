import React, { forwardRef } from "react";
import { cn } from "@/utilities/cn";

export interface LegendProps extends React.HTMLAttributes<HTMLLegendElement> {
}

const Legend = forwardRef<HTMLLegendElement, LegendProps>(
  (props: LegendProps, ref: React.ForwardedRef<HTMLLegendElement>) => {
    const _props: LegendProps = {
      className: cn(props.className)
    };
    return (
      <legend ref={ref} className={cn(_props.className)} />
    );
  }
);

export default Legend;
