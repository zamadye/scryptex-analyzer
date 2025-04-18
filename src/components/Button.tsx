
import { forwardRef } from "react";
import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ButtonProps as ShadcnButtonProps } from "@/components/ui/button";

// Re-export the Button from our UI components
export const Button = forwardRef<HTMLButtonElement, ShadcnButtonProps>(
  (props, ref) => {
    return <ShadcnButton ref={ref} {...props} />;
  }
);

Button.displayName = "Button";
