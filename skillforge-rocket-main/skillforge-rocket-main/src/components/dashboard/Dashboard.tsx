import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { StatCard } from "@/components/ui/StatCard";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { useAuth } from "@/hooks/useAuth"; // <--- ADDED THIS IMPORT
import { 
  TrendingUp, 
  Target, 
  Trophy, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Zap,
  BarChart3,
  Users
} from "lucide-react";

// Mock data
const weeklyProgress = [
  { week: "Week 1", score: 23 },
  { week: "Week 2", score: 38 },
  { week: "Week 3", score: 54 },
  { week: "Week 4", score: 78 },
];

const survivalRates = [
  { round: "Aptitude", rate: 89, color: "success" as const },
  { round: "Tech1", rate: 67, color: "primary" as const },
  { round: "Tech2", rate: 41, color: "warning" as const },
  { round: "HR", rate: 85, color: "secondary" as const },
];

const pendingTopics = [
  "SQL Window Functions",
  "System Design Basics",
  "Graph Algorithms",
  "Behavioral Questions",
];

const completedTasks = 12;
const totalTasks = 21;

export const Dashboard = () => {
  const { user } = useAuth(); // <--- GET USER DATA

  // Helper to get a display name safely
  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Aspiring Engineer";

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
            {/* UPDATED DYNAMIC NAME */}
            Welcome back, {displayName} 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Your placement readiness journey continues
          </p>
        </div>
        <div className="flex items-center gap-4">
          <NeonBadge variant="success" size="lg" animate>
            <span className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
            Day 18 of 21
          </NeonBadge>
        </div>
      </motion.div>

      {/* Main Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          icon={TrendingUp}
          label="Readiness Score"
          value="78%"
          sublabel="Up from 23% in Week 1"
          trend={{ value: 55, isPositive: true }}
          color="primary"
          delay={0.1}
        />
        <StatCard
          icon={Trophy}
          label="Batch Rank"
          value="#7"
          sublabel="Out of 247 students"
          trend={{ value: 12, isPositive: true }}
          color="secondary"
          delay={0.2}
        />
        <StatCard
          icon={Target}
          label="Tasks Completed"
          value={`${completedTasks}/${totalTasks}`}
          sublabel="9 tasks remaining"
          color="success"
          delay={0.3}
        />
        <StatCard
          icon={Clock}
          label="Avg Response Time"
          value="2.1s"
          sublabel="Batch avg: 3.2s"
          trend={{ value: 34, isPositive: true }}
          color="warning"
          delay={0.4}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Progress Chart */}
        <GlassCard className="col-span-8" delay={0.2}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold font-display">Week-over-Week Progress</h2>
              <p className="text-sm text-muted-foreground">Your readiness improvement journey</p>
            </div>
            <NeonBadge variant="success">+55% Growth</NeonBadge>
          </div>
          
          {/* Custom Progress Chart */}
          <div className="relative h-48">
            <div className="absolute inset-0 flex items-end justify-around gap-4 px-4">
              {weeklyProgress.map((week, index) => (
                <motion.div
                  key={week.week}
                  className="flex-1 flex flex-col items-center gap-2"
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  style={{ originY: 1 }}
                >
                  <motion.div
                    className="w-full rounded-t-lg relative overflow-hidden"
                    style={{ height: `${week.score * 1.8}px` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${week.score * 1.8}px` }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-secondary/80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10" />
                  </motion.div>
                  <span className="text-xs text-muted-foreground">{week.week}</span>
                  <span className="text-sm font-bold text-primary">{week.score}%</span>
                </motion.div>
              ))}
            </div>
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[100, 75, 50, 25].map((val) => (
                <div key={val} className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground w-8">{val}%</span>
                  <div className="flex-1 border-b border-dashed border-border/50" />
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Survival Rates */}
        <GlassCard className="col-span-4" delay={0.3}>
          <h2 className="text-lg font-semibold font-display mb-4">Survival by Round</h2>
          <div className="space-y-4">
            {survivalRates.map((item, index) => (
              <motion.div
                key={item.round}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-20 text-sm text-muted-foreground">{item.round}</div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      item.color === "success" ? "bg-success" :
                      item.color === "primary" ? "bg-primary" :
                      item.color === "warning" ? "bg-warning" :
                      "bg-secondary"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.rate}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  />
                </div>
                <span className="w-12 text-right text-sm font-semibold">{item.rate}%</span>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Readiness Score Ring */}
        <GlassCard className="col-span-4" delay={0.4}>
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold font-display mb-4">Overall Readiness</h2>
            <ProgressRing 
              value={78} 
              size={160} 
              strokeWidth={12}
              label="Ready"
              sublabel="Target: 85%"
              color="primary"
            />
            <div className="mt-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">7% to target</span>
            </div>
          </div>
        </GlassCard>

        {/* Pending Topics */}
        <GlassCard className="col-span-4" delay={0.5}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold font-display">Pending Topics</h2>
            <AlertCircle className="w-5 h-5 text-warning" />
          </div>
          <div className="space-y-3">
            {pendingTopics.map((topic, index) => (
              <motion.div
                key={topic}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/30 transition-colors cursor-pointer"
              >
                <div className="w-2 h-2 rounded-full bg-warning" />
                <span className="text-sm">{topic}</span>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Completed Tasks Preview */}
        <GlassCard className="col-span-4" delay={0.6}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold font-display">Recent Completions</h2>
            <CheckCircle2 className="w-5 h-5 text-success" />
          </div>
          <div className="space-y-3">
            {["Array Patterns", "SQL Basics", "Resume ATS Fix", "Communication Test"].map((task, index) => (
              <motion.div
                key={task}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20"
              >
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span className="text-sm">{task}</span>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Bottom Quick Actions */}
      <div className="grid grid-cols-3 gap-4">
        <GlassCard className="flex items-center gap-4 cursor-pointer group" delay={0.7} glow>
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors">
            <Target className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold font-display">Start Day-0 Simulation</h3>
            <p className="text-sm text-muted-foreground">TCS Digital pattern ready</p>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center gap-4 cursor-pointer group" delay={0.8}>
          <div className="p-4 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/20 group-hover:from-secondary/30 group-hover:to-primary/30 transition-colors">
            <BarChart3 className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <h3 className="font-semibold font-display">View Company Patterns</h3>
            <p className="text-sm text-muted-foreground">15 companies analyzed</p>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center gap-4 cursor-pointer group" delay={0.9}>
          <div className="p-4 rounded-xl bg-gradient-to-br from-success/20 to-primary/20 group-hover:from-success/30 group-hover:to-primary/30 transition-colors">
            <Users className="w-6 h-6 text-success" />
          </div>
          <div>
            <h3 className="font-semibold font-display">Compare with Peers</h3>
            <p className="text-sm text-muted-foreground">Beat batch average</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};