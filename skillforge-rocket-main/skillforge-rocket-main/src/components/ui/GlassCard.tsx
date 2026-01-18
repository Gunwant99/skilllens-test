import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  delay?: number;
}

export const GlassCard = ({ 
  children, 
  className, 
  hover = true, 
  glow = false,
  delay = 0,
  ...props 
}: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={hover ? { 
        scale: 1.02,
        transition: { duration: 0.2 }
      } : undefined}
      className={cn(
        "glass-card p-6",
        hover && "glass-card-hover cursor-pointer",
        glow && "neon-glow",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};