import React, { forwardRef } from "react";
import { cn } from "@/utilities/cn";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props: TextareaProps, ref: React.ForwardedRef<HTMLTextAreaElement>) => {
    const _props: TextareaProps = {
      className: cn(props.className)
    };
    return (
      <textarea ref={ref} className={cn(_props.className)} />
    );
  }
);

export default Textarea;
