import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { 
  Users, 
  TrendingUp,
  TrendingDown,
  Clock,
  MessageSquare,
  Code,
  Brain,
  Mic,
  BarChart3
} from "lucide-react";

interface ComparisonMetric {
  label: string;
  icon: React.ElementType;
  yourValue: number;
  batchAvg: number;
  unit: string;
  higherIsBetter: boolean;
}

const metrics: ComparisonMetric[] = [
  { label: "Tech2 Survival", icon: Code, yourValue: 41, batchAvg: 28, unit: "%", higherIsBetter: true },
  { label: "Communication Score", icon: MessageSquare, yourValue: 67, batchAvg: 54, unit: "%", higherIsBetter: true },
  { label: "Response Time", icon: Clock, yourValue: 2.1, batchAvg: 3.2, unit: "s", higherIsBetter: false },
  { label: "Filler Words", icon: Mic, yourValue: 8, batchAvg: 14, unit: "/min", higherIsBetter: false },
  { label: "Problem Solving", icon: Brain, yourValue: 78, batchAvg: 62, unit: "%", higherIsBetter: true },
  { label: "Code Quality", icon: Code, yourValue: 82, batchAvg: 71, unit: "%", higherIsBetter: true },
];

const detailedComparison = [
  { 
    category: "Technical Skills",
    items: [
      { label: "DSA Proficiency", you: 72, batch: 65 },
      { label: "SQL Knowledge", you: 68, batch: 58 },
      { label: "System Design", you: 45, batch: 38 },
      { label: "OOP Concepts", you: 78, batch: 70 },
    ]
  },
  {
    category: "Soft Skills",
    items: [
      { label: "Communication", you: 67, batch: 54 },
      { label: "Confidence", you: 72, batch: 61 },
      { label: "Body Language", you: 65, batch: 58 },
      { label: "Articulation", you: 70, batch: 55 },
    ]
  },
];

export const PeerInsights = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold font-display gradient-text">
            Peer Insights Comparison
          </h1>
          <p className="text-muted-foreground mt-1">
            See how you stack up against your batch
          </p>
        </div>
        <NeonBadge variant="secondary" size="lg">
          <Users className="w-4 h-4 mr-2" />
          Batch of 247
        </NeonBadge>
      </motion.div>

      {/* Quick Stats Comparison */}
      <div className="grid grid-cols-3 gap-4">
        {metrics.slice(0, 3).map((metric, index) => {
          const isAhead = metric.higherIsBetter 
            ? metric.yourValue > metric.batchAvg 
            : metric.yourValue < metric.batchAvg;
          const diff = metric.higherIsBetter
            ? ((metric.yourValue - metric.batchAvg) / metric.batchAvg * 100).toFixed(0)
            : ((metric.batchAvg - metric.yourValue) / metric.batchAvg * 100).toFixed(0);

          return (
            <GlassCard key={metric.label} delay={index * 0.1} glow={isAhead}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${isAhead ? "bg-success/20" : "bg-destructive/20"}`}>
                  <metric.icon className={`w-5 h-5 ${isAhead ? "text-success" : "text-destructive"}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <div className="flex items-center gap-2">
                    {isAhead ? (
                      <TrendingUp className="w-4 h-4 text-success" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-destructive" />
                    )}
                    <span className={`text-xs font-medium ${isAhead ? "text-success" : "text-destructive"}`}>
                      {isAhead ? "+" : ""}{diff}% vs batch
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">You</p>
                  <motion.p 
                    className="text-3xl font-bold font-display text-primary neon-text"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    {metric.yourValue}{metric.unit}
                  </motion.p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground mb-1">Batch Avg</p>
                  <p className="text-xl font-semibold text-muted-foreground">
                    {metric.batchAvg}{metric.unit}
                  </p>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Visual Comparison Chart */}
      <GlassCard delay={0.2}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold font-display">Head-to-Head Comparison</h2>
            <p className="text-sm text-muted-foreground">Your performance vs batch average</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm">You</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted-foreground" />
              <span className="text-sm">Batch Avg</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {metrics.map((metric, index) => {
            const maxValue = Math.max(metric.yourValue, metric.batchAvg) * 1.2;
            const yourWidth = (metric.yourValue / maxValue) * 100;
            const batchWidth = (metric.batchAvg / maxValue) * 100;
            const isAhead = metric.higherIsBetter 
              ? metric.yourValue > metric.batchAvg 
              : metric.yourValue < metric.batchAvg;

            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <metric.icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{metric.label}</span>
                  </div>
                  <NeonBadge size="sm" variant={isAhead ? "success" : "destructive"}>
                    {isAhead ? "Ahead" : "Behind"}
                  </NeonBadge>
                </div>
                <div className="space-y-2">
                  {/* Your bar */}
                  <div className="flex items-center gap-3">
                    <div className="w-16 text-xs text-right text-muted-foreground">You</div>
                    <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                        initial={{ width: 0 }}
                        animate={{ width: `${yourWidth}%` }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                      />
                    </div>
                    <span className="w-16 text-sm font-bold text-primary">{metric.yourValue}{metric.unit}</span>
                  </div>
                  {/* Batch bar */}
                  <div className="flex items-center gap-3">
                    <div className="w-16 text-xs text-right text-muted-foreground">Batch</div>
                    <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-muted-foreground/50"
                        initial={{ width: 0 }}
                        animate={{ width: `${batchWidth}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      />
                    </div>
                    <span className="w-16 text-sm text-muted-foreground">{metric.batchAvg}{metric.unit}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>

      {/* Detailed Category Breakdown */}
      <div className="grid grid-cols-2 gap-6">
        {detailedComparison.map((category, catIndex) => (
          <GlassCard key={category.category} delay={0.4 + catIndex * 0.1}>
            <h3 className="text-lg font-semibold font-display mb-4">{category.category}</h3>
            <div className="space-y-4">
              {category.items.map((item, index) => {
                const ahead = item.you > item.batch;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + catIndex * 0.1 + index * 0.05 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{item.label}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${ahead ? "text-success" : "text-muted-foreground"}`}>
                            {item.you}%
                          </span>
                          <span className="text-xs text-muted-foreground">vs {item.batch}%</span>
                        </div>
                      </div>
                      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="absolute h-full rounded-full bg-muted-foreground/30"
                          initial={{ width: 0 }}
                          animate={{ width: `${item.batch}%` }}
                          transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                        />
                        <motion.div
                          className={`absolute h-full rounded-full ${ahead ? "bg-gradient-to-r from-primary to-success" : "bg-primary/70"}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.you}%` }}
                          transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};