import React, { forwardRef } from "react";
import { cn } from "@/utilities/cn";

export interface ProgressProps extends React.ProgressHTMLAttributes<HTMLProgressElement> {
}

const Progress = forwardRef<HTMLProgressElement, ProgressProps>(
  (props: ProgressProps, ref: React.ForwardedRef<HTMLProgressElement>) => {
    const _props: ProgressProps = {
      className: cn(props.className)
    };
    return (
      <progress ref={ref} className={cn(_props.className)} />
    );
  }
);

export default Progress;
