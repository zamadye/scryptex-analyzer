
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ActionButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  icon?: ReactNode;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
}

export const ActionButton = ({
  children,
  onClick,
  variant = "primary",
  icon,
  isLoading,
  className,
  disabled,
}: ActionButtonProps) => {
  const baseStyles = "flex items-center justify-center gap-2 font-semibold transition-all duration-200";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-blue-100 hover:bg-blue-200 text-blue-800",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        baseStyles,
        variants[variant],
        className
      )}
    >
      {isLoading ? 
        <span className="animate-spin">⏳</span> : 
        icon
      }
      {children}
    </Button>
  );
};
