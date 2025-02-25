import React, { forwardRef } from "react";
import { cn } from "@/utilities/cn";

export interface FieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
}

const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  (props: FieldsetProps, ref: React.ForwardedRef<HTMLFieldSetElement>) => {
    const _props: FieldsetProps = {
      className: cn(props.className)
    };
    return (
      <fieldset ref={ref} className={cn(_props.className)} />
    );
  }
);

export default Fieldset;
