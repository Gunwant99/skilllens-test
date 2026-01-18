import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "destructive" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  animate?: boolean;
}

const variantStyles = {
  default: "bg-primary/20 text-primary border-primary/30",
  success: "bg-success/20 text-success border-success/30",
  warning: "bg-warning/20 text-warning border-warning/30",
  destructive: "bg-destructive/20 text-destructive border-destructive/30",
  secondary: "bg-secondary/20 text-secondary border-secondary/30",
  outline: "bg-transparent text-muted-foreground border-border",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-xs",
  lg: "px-3 py-1.5 text-sm",
};

export const NeonBadge = ({
  children,
  variant = "default",
  size = "md",
  className,
  animate = false,
}: BadgeProps) => {
  const Component = animate ? motion.span : "span";
  
  return (
    <Component
      className={cn(
        "inline-flex items-center font-medium rounded-full border",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...(animate ? {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: { type: "spring", stiffness: 500, damping: 30 }
      } : {})}
    >
      {children}
    </Component>
  );
};