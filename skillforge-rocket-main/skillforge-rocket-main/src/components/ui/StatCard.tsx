import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  sublabel?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "primary" | "secondary" | "success" | "warning";
  delay?: number;
}

const colorStyles = {
  primary: "text-primary",
  secondary: "text-secondary",
  success: "text-success",
  warning: "text-warning",
};

const bgStyles = {
  primary: "bg-primary/10",
  secondary: "bg-secondary/10",
  success: "bg-success/10",
  warning: "bg-warning/10",
};

export const StatCard = ({
  icon: Icon,
  label,
  value,
  sublabel,
  trend,
  color = "primary",
  delay = 0,
}: StatCardProps) => {
  return (
    <GlassCard delay={delay} className="flex items-start gap-4">
      <div className={cn("p-3 rounded-lg", bgStyles[color])}>
        <Icon className={cn("w-5 h-5", colorStyles[color])} />
      </div>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="flex items-baseline gap-2 mt-1">
          <motion.span
            className={cn("text-2xl font-bold font-display", colorStyles[color])}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.2, type: "spring" }}
          >
            {value}
          </motion.span>
          {trend && (
            <span className={cn(
              "text-xs font-medium",
              trend.isPositive ? "text-success" : "text-destructive"
            )}>
              {trend.isPositive ? "+" : ""}{trend.value}%
            </span>
          )}
        </div>
        {sublabel && (
          <p className="text-xs text-muted-foreground mt-1">{sublabel}</p>
        )}
      </div>
    </GlassCard>
  );
};