import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Pause,
  CheckCircle2, 
  XCircle,
  Timer,
  Brain,
  Code,
  MessageSquare,
  Users,
  ChevronRight,
  Zap,
  AlertTriangle
} from "lucide-react";
import { useState } from "react";

type Round = "aptitude" | "tech1" | "tech2" | "hr";
type RoundStatus = "pending" | "active" | "passed" | "eliminated";

interface RoundData {
  id: Round;
  name: string;
  icon: React.ElementType;
  duration: string;
  questions: number;
  survivalRate: number;
  status: RoundStatus;
}

const rounds: RoundData[] = [
  { id: "aptitude", name: "Aptitude Round", icon: Brain, duration: "30 min", questions: 20, survivalRate: 89, status: "passed" },
  { id: "tech1", name: "Technical Round 1", icon: Code, duration: "45 min", questions: 3, survivalRate: 67, status: "active" },
  { id: "tech2", name: "Technical Round 2", icon: Code, duration: "45 min", questions: 2, survivalRate: 41, status: "pending" },
  { id: "hr", name: "HR Interview", icon: MessageSquare, duration: "20 min", questions: 8, survivalRate: 85, status: "pending" },
];

const currentQuestion = {
  type: "coding",
  title: "Two Sum Problem",
  description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  difficulty: "Medium",
  timeLimit: "15:00",
  company: "TCS Digital",
};

const aiInterviewer = {
  name: "Priya Sharma",
  role: "Senior Technical Lead",
  personality: "Friendly but thorough",
  avatar: "👩‍💼",
};

export const Simulator = () => {
  const [isSimulating, setIsSimulating] = useState(true);
  const [currentRound, setCurrentRound] = useState<Round>("tech1");
  const [timeRemaining, setTimeRemaining] = useState("12:34");
  const [eliminatedCount, setEliminatedCount] = useState(78);
  const [totalParticipants] = useState(247);

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
            Day-0 Placement Simulator
          </h1>
          <p className="text-muted-foreground mt-1">
            Experience real placement pressure with AI interviewers
          </p>
        </div>
        <div className="flex items-center gap-4">
          <NeonBadge variant="destructive" size="lg" animate>
            <span className="w-2 h-2 bg-destructive rounded-full mr-2 animate-pulse" />
            LIVE Simulation
          </NeonBadge>
          <Button
            onClick={() => setIsSimulating(!isSimulating)}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            {isSimulating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isSimulating ? "Pause" : "Resume"}
          </Button>
        </div>
      </motion.div>

      {/* Rounds Pipeline */}
      <GlassCard delay={0.1}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold font-display">4-Round Pipeline</h2>
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              <span className="text-foreground font-bold">{totalParticipants - eliminatedCount}</span> / {totalParticipants} remaining
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {rounds.map((round, index) => (
            <motion.div
              key={round.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="flex-1 relative"
            >
              <div className={`p-4 rounded-xl border-2 transition-all ${
                round.status === "active" 
                  ? "border-primary bg-primary/10 neon-glow" 
                  : round.status === "passed"
                  ? "border-success bg-success/10"
                  : round.status === "eliminated"
                  ? "border-destructive bg-destructive/10"
                  : "border-border bg-muted/30"
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${
                    round.status === "active" ? "bg-primary/20" :
                    round.status === "passed" ? "bg-success/20" :
                    "bg-muted"
                  }`}>
                    <round.icon className={`w-5 h-5 ${
                      round.status === "active" ? "text-primary" :
                      round.status === "passed" ? "text-success" :
                      "text-muted-foreground"
                    }`} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{round.name}</p>
                    <p className="text-xs text-muted-foreground">{round.duration} • {round.questions} Q</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Survival Rate</span>
                  <span className={`text-sm font-bold ${
                    round.survivalRate >= 70 ? "text-success" :
                    round.survivalRate >= 50 ? "text-warning" :
                    "text-destructive"
                  }`}>{round.survivalRate}%</span>
                </div>
                
                {/* Status indicator */}
                <div className="absolute -top-2 -right-2">
                  {round.status === "passed" && (
                    <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-success-foreground" />
                    </div>
                  )}
                  {round.status === "active" && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center animate-pulse">
                      <Zap className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Connector */}
              {index < rounds.length - 1 && (
                <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ChevronRight className={`w-6 h-6 ${
                    rounds[index + 1].status !== "pending" ? "text-success" : "text-muted-foreground"
                  }`} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </GlassCard>

      <div className="grid grid-cols-12 gap-6">
        {/* Current Question */}
        <GlassCard className="col-span-8" delay={0.2}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <NeonBadge variant="default">{currentQuestion.company}</NeonBadge>
              <NeonBadge variant="warning">{currentQuestion.difficulty}</NeonBadge>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/20 border border-destructive/30">
              <Timer className="w-4 h-4 text-destructive" />
              <span className="font-mono font-bold text-destructive">{timeRemaining}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold font-display mb-3">{currentQuestion.title}</h3>
          <p className="text-muted-foreground mb-6">{currentQuestion.description}</p>

          {/* Code Editor Placeholder */}
          <div className="rounded-lg bg-background/80 border border-border p-4 font-mono text-sm">
            <div className="flex items-center gap-2 mb-4 text-muted-foreground">
              <span className="text-primary">function</span>
              <span className="text-foreground">twoSum</span>
              <span>(nums: number[], target: number): number[] {"{"}</span>
            </div>
            <div className="pl-4 text-muted-foreground">
              <span className="text-secondary">// Your solution here...</span>
            </div>
            <div className="mt-4 text-muted-foreground">{"}"}</div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button className="flex-1 bg-muted hover:bg-muted/80">
              Run Tests
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              Submit Solution
            </Button>
          </div>
        </GlassCard>

        {/* AI Interviewer */}
        <div className="col-span-4 space-y-4">
          <GlassCard delay={0.3} glow>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-3xl">
                {aiInterviewer.avatar}
              </div>
              <div>
                <p className="font-semibold font-display">{aiInterviewer.name}</p>
                <p className="text-sm text-muted-foreground">{aiInterviewer.role}</p>
                <NeonBadge size="sm" variant="secondary" className="mt-1">
                  AI Interviewer
                </NeonBadge>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <p className="text-sm italic text-muted-foreground">
                "Interesting approach. Can you walk me through the time complexity of your solution? What happens when the array is very large?"
              </p>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-xs text-muted-foreground">Personality: {aiInterviewer.personality}</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs text-success">Listening to your response...</span>
              </div>
            </div>
          </GlassCard>

          {/* Live Elimination Feed */}
          <GlassCard delay={0.4}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold font-display">Live Elimination</h3>
              <AlertTriangle className="w-4 h-4 text-destructive" />
            </div>
            
            <div className="space-y-2">
              {[
                { name: "Candidate #156", reason: "Time exceeded", time: "2m ago" },
                { name: "Candidate #089", reason: "Wrong approach", time: "3m ago" },
                { name: "Candidate #201", reason: "Incomplete solution", time: "5m ago" },
              ].map((elimination, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3 p-2 rounded-lg bg-destructive/10 border border-destructive/20"
                >
                  <XCircle className="w-4 h-4 text-destructive" />
                  <div className="flex-1">
                    <p className="text-xs font-medium">{elimination.name}</p>
                    <p className="text-[10px] text-muted-foreground">{elimination.reason}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{elimination.time}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-sm text-center">
                <span className="font-bold text-destructive">{eliminatedCount}</span>
                <span className="text-muted-foreground"> eliminated so far</span>
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};