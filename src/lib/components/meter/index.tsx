import React, { forwardRef } from "react";
import { cn } from "@/utilities/cn";

export interface MeterProps extends React.HTMLAttributes<HTMLMeterElement> {
}

const Meter = forwardRef<HTMLMeterElement, MeterProps>(
  (props: MeterProps, ref: React.ForwardedRef<HTMLMeterElement>) => {
    const _props: MeterProps = {
      className: cn(props.className)
    };
    return (
      <meter ref={ref} className={cn(_props.className)} />
    );
  }
);

export default Meter;
