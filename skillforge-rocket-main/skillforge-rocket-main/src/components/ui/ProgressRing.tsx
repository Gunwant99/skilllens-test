import { motion } from "framer-motion";

interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  color?: "primary" | "secondary" | "success" | "warning" | "destructive";
}

const colorMap = {
  primary: "stroke-primary",
  secondary: "stroke-secondary",
  success: "stroke-success",
  warning: "stroke-warning",
  destructive: "stroke-destructive",
};

const glowMap = {
  primary: "drop-shadow-[0_0_8px_hsl(192,95%,55%,0.6)]",
  secondary: "drop-shadow-[0_0_8px_hsl(258,90%,66%,0.6)]",
  success: "drop-shadow-[0_0_8px_hsl(142,76%,46%,0.6)]",
  warning: "drop-shadow-[0_0_8px_hsl(38,92%,50%,0.6)]",
  destructive: "drop-shadow-[0_0_8px_hsl(0,84%,60%,0.6)]",
};

export const ProgressRing = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  label,
  sublabel,
  color = "primary",
}: ProgressRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min((value / max) * 100, 100);
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className={`-rotate-90 ${glowMap[color]}`}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className={colorMap[color]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          className="text-2xl font-bold font-display neon-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {Math.round(percentage)}%
        </motion.span>
        {label && (
          <span className="text-xs text-muted-foreground mt-1">{label}</span>
        )}
        {sublabel && (
          <span className="text-[10px] text-muted-foreground">{sublabel}</span>
        )}
      </div>
    </div>
  );
};